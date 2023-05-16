import fs from "fs";
import yaml from "js-yaml";
import lodash from "lodash";
import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";
import Ajv from "ajv";

function createModelConfigs(assetPath) {
    try {
        const testContent = fs.readFileSync(assetPath, "utf-8");
        const parsed = yaml.load(testContent, { schema: allYAMLSchemas });

        // Assume either array of configs or object with array of configs as values
        let configs = lodash.isPlainObject(parsed) ? Object.values(parsed).flat() : parsed;

        configs.forEach((config) => {
            const ajv = new Ajv({allErrors: true, verbose: true});
            const validate = ajv.compile(config.schema);
            console.log(`${config.schema.schemaId}: ${validate(config)}`);
            console.error(validate.errors);
            delete config.schema;
        });

        console.log(JSON.stringify(configs, null, 4));
    } catch (e) {
        console.error("Error parsing YAML:", e);
    }

}

createModelConfigs("./assets/test.yml")
