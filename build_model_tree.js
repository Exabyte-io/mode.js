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
 * Check whether asset file is an auxiliary file.
 * @param {string} fileName - asset file name
 * @param {string} extension - asset file extension
 * @returns {boolean}
 */
const isAuxiliaryFile = (fileName, extension = ".yml") => {
    return Boolean(path.extname(path.basename(fileName, extension)));
};

/**
 * Check whether asset file contains data of several nodes.
 * @param {string} fileName - asset file name
 * @param {string} extension - asset file extension
 * @returns {boolean}
 */
const isNodeDataFile = (fileName, extension = ".yml") => {
    return path.extname(path.basename(fileName, extension)) === ".nodes";
};

const createNodesFromDataFile = (filePath, parent) => {
    const nodeData = loadAssetFile(filePath);
    return Object.entries(nodeData).map(([label, data]) => ({ label, data, parent }));
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
 * @returns {{parent, data: *, children: *[], label: *}}
 */
const createNode = (pathToAsset, parent, assetExtension = ".yml") => {
    const currPath = path.dirname(pathToAsset);
    const label = path.basename(pathToAsset, assetExtension);
    console.log(`creating node [${label}]`);
    const childrenDir = getDirectories(currPath).find((dirName) => dirName === label);
    const data = loadAssetFile(pathToAsset);
    let children = [];

    // set children
    if (childrenDir) {
        const childrenPath = path.resolve(currPath, label);
        const childrenAssetFiles = getAssetFiles(childrenPath);
        const dataFiles = childrenAssetFiles.filter((asset) => isNodeDataFile(asset));
        children = childrenAssetFiles
            .filter((asset) => !isAuxiliaryFile(asset))
            .map((asset) => createNode(path.resolve(childrenPath, asset), label));
        children = children.concat(
            dataFiles.map((dataFile) =>
                createNodesFromDataFile(path.resolve(childrenPath, dataFile), parent),
            ),
        );
    }
    return {
        parent,
        label,
        data,
        children,
    };
};

/**
 * Build tree from a directory containing assets.
 * @param {string} rootPath - path to tree root directory
 * @param {string} rootLabel - label of root node
 * @returns {{parent: undefined, data: undefined, children: *, label: string}}
 */
const build_tree = (rootPath, rootLabel = "root") => {
    const assetFiles = getAssetFiles(rootPath);
    const children = assetFiles.map((asset) =>
        createNode(path.resolve(rootPath, asset), rootLabel),
    );
    return {
        parent: undefined,
        label: rootLabel,
        data: undefined,
        children,
    };
};

const modelTree = build_tree(ASSET_PATH);

fs.writeFileSync("./model_tree.js", `module.exports = ${JSON.stringify(modelTree)}`, "utf8");
