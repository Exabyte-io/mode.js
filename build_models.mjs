import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";
import { JSONSchemasInterface } from "@exabyte-io/code.js/dist/JSONSchemasInterface";

/**
 * Render name template based on config.
 * Use substitution map to replace a config value with a more readable variant.
 * @param {string} template - Template for the name property
 * @param {Object} data - Entity config
 * @param {Object} substitutionMap - Maps object value to human-readable string
 * @return {string}
 */
function generateName(template, data, substitutionMap = {}) {
    // Regular expression to match the template variables, e.g `$job.workflow`
    const regex = /\$(\w+(\.\w+)*)/g;

    return template.replace(regex, (match, objPath) => {
        const value = lodash.get(data, objPath)

        if (substitutionMap[value]) {
            return substitutionMap[value];
        }

        return value || "";
    });
}


try {
    const testContent = fs.readFileSync("./assets/test.yml", "utf-8");
    const parsed = yaml.load(testContent, {schema: allYAMLSchemas});

    // Assume either array of configs or object with array of configs as values
    let configs = lodash.isPlainObject(parsed) ? Object.values(parsed).flat() : parsed;
    configs.forEach((config) => {
        config.name = generateName(config.name?.template, config, config.name?.substitutions);
    });


    configs.forEach((config) => {
         const validate = JSONSchemasInterface.resolveJsonValidator(config.schemaId, {
             allErrors: true,
             verbose: true,
         });
         console.log(`${config.schemaId}: ${validate(config)}`);
         console.error(validate.errors);
    });

    console.log(JSON.stringify(configs, null, 4));
} catch (e) {
    console.error("Error parsing YAML:", e);
}
