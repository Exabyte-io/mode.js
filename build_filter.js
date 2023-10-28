const utils = require("@exabyte-io/code.js/dist/utils");

const FILTER_ASSET = "./assets/filters/model_method.yml";
const JS_OUTPUT = "./src/data/model_method_map.js";

try {
    utils.buildJsAssetFromYaml({
        assetPath: FILTER_ASSET,
        targetPath: JS_OUTPUT,
        debug: false,
    });
    console.log("Created model-method filter.");
} catch (e) {
    console.log(e);
}
