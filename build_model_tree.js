const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ASSET_PATH = path.resolve(__dirname, "assets");

/**
 * Load YAML asset files and insert asset data into the MODEL_DATA object.
 * @todo expand functionality of this function if more sophisticated file loading is needed,
 *       e.g. loading and following references
 * @param {string} pathToAsset - asset file path
 */
const loadAssetFile = (pathToAsset) => {
    const fileContent = fs.readFileSync(pathToAsset, "utf8");
    const yamlObj = yaml.load(fileContent);
    // process data
    return yamlObj;
};

const getDirectories = (currentPath) => {
    return fs
        .readdirSync(currentPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
};

const getAssetFiles = (currentPath, assetExtension = ".yml") => {
    return fs
        .readdirSync(currentPath)
        .filter((dirItem) => path.extname(dirItem) === assetExtension);
};

/**
 * Check whether asset file contains data of several nodes.
 * Note: File names of form `*.nodes.yml` are expected.
 * @param {string} fileName - asset file name
 * @param {string} extension - asset file extension
 * @returns {boolean}
 */
const isNodeDataFile = (fileName, extension = ".yml") => {
    return path.extname(path.basename(fileName, extension)) === ".nodes";
};

const createNodesFromDataFile = (filePath, parent) => {
    const nodeData = loadAssetFile(filePath);
    return Object.entries(nodeData).map(([name, data]) => ({
        path: [parent, name].join("/"),
        data,
        parent,
    }));
};

/**
 * @summary Create nodes recursively by traversing the file tree.
 * In general, the following information is used to generate the nodes:
 *   - node label -> asset file base name
 *   - node children -> directory with same name as label
 *   - node data -> contents of asset file
 * Note, that nodes may also be defined via a single file (`*.nodes.yml`).
 * @param pathToAsset
 * @param parent
 * @param assetExtension
 * @returns {{parent, data: *, children: *[], path: *}}
 */
const createNode = (pathToAsset, parent, assetExtension = ".yml") => {
    const currPath = path.dirname(pathToAsset);
    const basename = path.basename(pathToAsset, assetExtension);
    const nodePath = [parent, basename].join("/");
    console.log(`creating node [${nodePath}]`);
    const childrenDir = getDirectories(currPath).find((dirName) => dirName === basename);
    const data = loadAssetFile(pathToAsset);
    let children = [];

    // set children
    if (childrenDir) {
        const childrenPath = path.resolve(currPath, basename);
        const childrenAssetFiles = getAssetFiles(childrenPath);
        const dataFiles = childrenAssetFiles.filter((asset) => isNodeDataFile(asset));
        children = childrenAssetFiles
            .filter((asset) => !isNodeDataFile(asset))
            .map((asset) => createNode(path.resolve(childrenPath, asset), nodePath));
        children = children.concat(
            dataFiles.map((dataFile) =>
                createNodesFromDataFile(path.resolve(childrenPath, dataFile), nodePath),
            ),
        );
    }
    return {
        parent,
        path: nodePath,
        data,
        children,
    };
};

/**
 * Build tree from a directory containing assets.
 * @param {string} rootDirPath - path to tree root directory
 * @param {string} rootNodePath - name of root node
 * @returns {{parent: undefined, data: undefined, children: *, path: string}}
 */
const buildTree = (rootDirPath, rootNodePath = "root") => {
    const assetFiles = getAssetFiles(rootDirPath);
    const children = assetFiles.map((asset) =>
        createNode(path.resolve(rootDirPath, asset), rootNodePath),
    );
    return {
        parent: undefined,
        path: rootNodePath,
        data: undefined,
        children,
    };
};

const modelTree = buildTree(ASSET_PATH, "");

fs.writeFileSync("./model_tree.js", `module.exports = ${JSON.stringify(modelTree)}`, "utf8");
