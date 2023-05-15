import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";
import Ajv from "ajv";
import nunjucks from "nunjucks"

/**
 * Render name template based on config.
 * Use substitution map to replace a config value with a more readable variant.
 * @param {string} template - Template for the name property
 * @param {Object} data - Entity config
 * @param {Object} substitutionMap - Maps object value to human-readable string
 * @return {string}
 * @example
 * generateName(
 *     "Hello {{user}}!",
 *     {user: "user001"},
 *     {user001: "John Doe"}
 * ); // "Hello John Doe!"
 */
function generateName(template, data, substitutionMap = {}) {
    // Create a copy of data to avoid modifying the original
    const renderData = lodash.cloneDeep(data);

    // Helper function for recursive substitution
    function substituteNested(obj) {
        lodash.forIn(obj, (value, key) => {
            if (lodash.isPlainObject(value)) {
                // If value is an object, recurse
                substituteNested(value);
            } else if (substitutionMap[value]) {
                // If value is in substitution map, replace it
                obj[key] = substitutionMap[value];
            }
        });
    }

    substituteNested(renderData);
    return nunjucks.renderString(template, renderData);
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
         const ajv = new Ajv({ allErrors: true, verbose: true });
         const validate = ajv.compile(config.schema);
         console.log(`${config.schema.schemaId}: ${validate(config)}`);
         console.error(validate.errors);
         delete config.schema;
    });

    console.log(JSON.stringify(configs, null, 4));
} catch (e) {
    console.error("Error parsing YAML:", e);
}
