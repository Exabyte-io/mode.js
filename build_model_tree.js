const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const _ = require("lodash");

const ASSET_PATH = path.resolve(__dirname, "assets");
const MODEL_DATA = {};

/**
 * Search recursively for a key name in an object.
 * @param {string} key
 * @param {Object} object
 * @returns {String[]} - List of object paths (usable with _.set / _.get)
 */
const findKeys = (key, object) => {
    const foundKeys = [];
    const iterate = (obj, level) => {
        Object.keys(obj).forEach((k) => {
            const objPath = !level ? k : [level, k].join(".");
            if (k === key) {
                foundKeys.push(objPath);
            } else if (typeof obj[k] === "object" && obj[k] !== null) {
                iterate(obj[k], objPath);
            }
        });
    };
    iterate(object);
    return foundKeys;
};

/**
 * Load file and resolve references recursively.
 * NOTE: The `include` key is used to designate a reference.
 * With a separator present, the reference may refer to a key in the object.
 * Please use with caution in order to avoid circular references!
 * @param filePath
 * @param separator
 * @returns {Object}
 */
const loadYAMLWithReferences = (filePath, separator = "#") => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const currentDir = path.dirname(filePath);
    const yamlObj = yaml.load(fileContent);
    findKeys("include", yamlObj).forEach((objPath) => {
        const reference = _.get(yamlObj, objPath);
        const parentObjPath = objPath.replace(".include", "");
        if (typeof reference === "string") {
            const [fileName, key = ""] = reference.split(separator);
            let resolved = loadYAMLWithReferences(path.resolve(currentDir, fileName));
            resolved = !key ? resolved : _.get(resolved, key);
            _.set(yamlObj, parentObjPath, resolved);
            _.set(yamlObj, objPath, undefined);
        }
        return null;
    });
    return yamlObj;
};

/**
 * Load YAML asset files and insert asset data into the MODEL_DATA object.
 * @param {string} dir - folder containing asset file
 * @param {string} fileName - asset file name
 * @param {string} assetExtension - file extension for asset
 */
const loadAssetFile = (dir, fileName, assetExtension = ".yml") => {
    const yamlObj = loadYAMLWithReferences(path.resolve(dir, fileName));
    const key = path.basename(fileName, assetExtension);
    let objectPath = path.relative(ASSET_PATH, dir).split(path.sep).join(".");
    if (path.extname(key)) {
        objectPath = ["definitions", objectPath, path.basename(key, ".aux")]
            .filter(Boolean)
            .join(".");
    } else {
        objectPath = ["model", objectPath, key].filter(Boolean).join(".");
    }
    _.set(MODEL_DATA, objectPath, yamlObj);
    console.log(`setting model data of [${fileName}] at path [${objectPath}]`);
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
 * Traverse asset folder recursively and load asset files.
 * @param currPath {string} - path to asset directory
 */
const getAssetData = (currPath) => {
    const branches = getDirectories(currPath);
    const assetFiles = getAssetFiles(currPath);
    console.log(`current directory: ${currPath}`);
    console.log("contains assets: ");
    assetFiles.forEach((a) => console.log(a));
    console.log("-----");

    assetFiles.forEach((asset) => {
        try {
            loadAssetFile(currPath, asset);
        } catch (e) {
            console.log(e);
        }
    });
    branches.forEach((b) => {
        getAssetData(path.resolve(currPath, b));
    });
};

getAssetData(ASSET_PATH);

fs.writeFileSync("./model_data.js", `module.exports = ${JSON.stringify(MODEL_DATA)}`, "utf8");
