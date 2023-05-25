import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";
import Ajv from "ajv";
import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import path from "path";

const MODEL_ASSETS_PATH = "assets/models"
const METHOD_ASSETS_PATH = "assets/methods"
const LOG_VALIDATION = true;
const LOG_CONFIG_NAMES = true;
const METHOD_PATH_SEPARATOR = "::";

/** Get list of paths for asset files in a directory.
 * @param {string} currentPath - Path to current directory, i.e. $PWD
 * @param {string} assetExtension - File extension for asset files
 * @param {boolean} resolvePath - whether to resolve the paths of asset files
 */
function getAssetFiles(currentPath, assetExtension = ".yml", resolvePath = true) {
    const fileNames = fs
        .readdirSync(currentPath)
        .filter((dirItem) => path.extname(dirItem) === assetExtension);
    if (resolvePath) return fileNames.map((fileName) => path.resolve(currentPath, fileName));
    return fileNames;
}

/**
 * Validate a config containing its schema.
 * @param {Object} config - Config containing schema (`config.schema`)
 * @param {boolean} debug - Whether to log validation output
 */
function validateConfig(config, debug = false) {
    const ajv = new Ajv({allErrors: true, verbose: true});
    const validate = ajv.compile(config.schema);
    if (debug) console.log(`Validating config for ${config.schema.schemaId}: ...${validate(config) ? "OK" : "ERROR"}`);

    if (validate.errors) {
        console.error("Validation errors:", validate.errors);
        throw new Error(`Validation failed for ${config.schema.schemaId}`)
    }
}

/**
 * Generates URL path based categories and parameters.
 * @param {Object} data - model or unit method config
 * @return {string} - entity path
 */
function encodeDataAsURLPath(data) {
    const placeholder = 'unknown';

    const path = ['tier1', 'tier2', 'tier3', 'type', 'subtype'].map(key => {
        return lodash.get(data.categories, key, placeholder);
    }).join('/');

    const params = new URLSearchParams();
    for (let key in data.parameters) {
        if (lodash.isObject(data.parameters[key])) {
            params.append(key, JSON.stringify(data.parameters[key]));
        } else {
            params.append(key, data.parameters[key]);
        }
    }

    return params.toString() ? `/${path}?${params.toString()}` : `/${path}`;
}

/**
 * Generates one or more model configs from asset and validates against corresponding schema.
 * @param {string} assetPath - Path to asset file
 * @param {boolean} debug - Whether to log model config name.
 * @return {Object[]} - Array of model configs
 */
function createModelConfigs(assetPath, debug = false) {
    const testContent = fs.readFileSync(assetPath, "utf-8");
    const parsed = yaml.load(testContent, {schema: allYAMLSchemas});

    // Assume either array of configs or object with array of configs as values
    let configs = lodash.isPlainObject(parsed) ? Object.values(parsed).flat() : parsed.flat();

    configs.forEach((config) => {
        config.path = encodeDataAsURLPath(config);
        validateConfig(config, LOG_VALIDATION);
        delete config.schema;
    });

    if (debug) configs.forEach((c) => console.log(`Creating model config: ${c.name}`));
    return configs;
}

/**
 * Generates one of more method configs and validates against corresponding schema.
 * @param {string} assetPath - Path to asset file
 * @param {boolean} debug - Whether to log model config name.
 * @return {Object[]} - Array of method configs
 */
function createMethodConfigs(assetPath, debug = false) {
    const testContent = fs.readFileSync(assetPath, "utf-8");
    const parsed = yaml.load(testContent, { schema: allYAMLSchemas });

    // Iterate over groups of configs and set config-based values
    parsed.forEach((config) => {
        config.units.forEach((u) => {
            u.path = encodeDataAsURLPath(u);
            validateConfig(u, LOG_VALIDATION);
            delete u.schema;
        });
        config.path = config.units.map((u) => u.path).join(METHOD_PATH_SEPARATOR);
        validateConfig(config, LOG_VALIDATION);
        delete config.schema;
    });

    if (debug) parsed.forEach((c) => console.log(`Creating method config: ${c.name}`));
    return parsed;
}

// Build and write MODEL configs
try {
    const modelAssetFiles = getAssetFiles(MODEL_ASSETS_PATH, ".yml");
    const modelConfigs = modelAssetFiles.flatMap((asset) => createModelConfigs(asset, LOG_CONFIG_NAMES));
    fs.writeFileSync("./model_list.js", `module.exports = ${JSON.stringify(modelConfigs)}`, "utf8");
} catch (e) {
    console.error(e);
}

// Build and write METHOD configs
try {
    const methodAssetFiles = getAssetFiles(METHOD_ASSETS_PATH, ".yml");
    const methodConfigs = methodAssetFiles.flatMap((asset) => createMethodConfigs(asset, LOG_CONFIG_NAMES));
    fs.writeFileSync("./method_list.js", `module.exports = ${JSON.stringify(methodConfigs)}`, "utf8");
} catch (e) {
    console.error(e);
}
