const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const _ = require("lodash");

const ASSET_PATH = path.resolve(__dirname, "assets");
const MODEL_DATA = {};

const loadAssetFile = (dir, fileName, assetExtension = ".yml") => {
    const fileContent = fs.readFileSync(path.resolve(dir, fileName), "utf8");
    const key = path.basename(fileName, assetExtension);
    let objectPath = path.relative(ASSET_PATH, dir).split(path.sep).join(".");
    if (path.extname(key)) {
        objectPath = ["definitions", objectPath, path.basename(key, ".aux")]
            .filter(Boolean)
            .join(".");
    } else {
        objectPath = ["model", objectPath, key].filter(Boolean).join(".");
    }
    _.set(MODEL_DATA, objectPath, yaml.load(fileContent));
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

const getAssetData = (currPath) => {
    const branches = getDirectories(currPath);
    const assetFiles = getAssetFiles(currPath);
    console.log(`current directory: ${currPath}`);
    console.log("contains assets: ");
    assetFiles.forEach((a) => console.log(a));
    console.log("-----");

    assetFiles.forEach((asset) => {
        loadAssetFile(currPath, asset);
    });
    branches.forEach((b) => {
        getAssetData(path.resolve(currPath, b));
    });
};

getAssetData(ASSET_PATH);

fs.writeFileSync("./model_data.js", `module.exports = ${JSON.stringify(MODEL_DATA)}`, "utf8");
