const { JsYamlAllSchemas } = require("@exabyte-io/code.js/dist/utils");
const fs = require("fs");
const yaml = require("js-yaml");

const FILTER_ASSET = "assets/filters/model_method.yml";

try {
    const fileContent = fs.readFileSync(FILTER_ASSET, "utf-8");
    const modelMethodMap = yaml.load(fileContent, { schema: JsYamlAllSchemas });
    const ignore = "// eslint-disable\n";
    fs.writeFileSync(
        "./src/model_method_map.js",
        ignore + `module.exports = ${JSON.stringify(modelMethodMap)}`,
        "utf8",
    );
    console.log("Created model-method filter.");
} catch (e) {
    console.log(e);
}
