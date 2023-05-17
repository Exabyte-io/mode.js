import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";
import Ajv from "ajv";
import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import path from "path";

const MODEL_ASSETS_PATH = "assets/models"

function getAssetFiles(currentPath, assetExtension = ".yml", resolvePath = true) {
    const fileNames = fs
        .readdirSync(currentPath)
        .filter((dirItem) => path.extname(dirItem) === assetExtension);
    if (resolvePath) return fileNames.map((fileName) => path.resolve(currentPath, fileName));
    return fileNames;
}

function validateConfig(config, debug = false) {
    const ajv = new Ajv({allErrors: true, verbose: true});
    const validate = ajv.compile(config.schema);
    if (debug) console.log(`${config.schema.schemaId}: ${validate(config)}`);

    if (validate.errors) {
        console.error("Validation errors:", validate.errors);
        throw new Error(`Validation failed for ${config.schema.schemaId}`)
    }
}

function createModelConfigs(assetPath, debug = false) {
    const testContent = fs.readFileSync(assetPath, "utf-8");
    const parsed = yaml.load(testContent, {schema: allYAMLSchemas});

    // Assume either array of configs or object with array of configs as values
    let configs = lodash.isPlainObject(parsed) ? Object.values(parsed).flat() : parsed.flat();

    configs.forEach((config) => {
        validateConfig(config, false);
        delete config.schema;
    });

    if (debug) configs.forEach((c) => console.log(`Creating config: ${c.name}`));
    return configs;


}

// Build and write model configs
try {
    const modelAssetFiles = getAssetFiles(MODEL_ASSETS_PATH, ".yml");
    const modelConfigs = modelAssetFiles.flatMap((asset) => createModelConfigs(asset, true));
    fs.writeFileSync("./model_list.js", `module.exports = ${JSON.stringify(modelConfigs)}`, "utf8");
} catch (e) {
    console.error(e);
}

