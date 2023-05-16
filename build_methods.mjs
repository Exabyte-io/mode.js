import fs from "fs";
import yaml from "js-yaml";
import { allYAMLSchemas, generateName } from "@exabyte-io/code.js/dist/utils";
import Ajv from "ajv";

function combineUnits(obj) {
    // Get all keys
    const keys = Object.keys(obj);

    // Function to generate combinations
    function* combineHelper(index) {
        if (index >= keys.length) {
            // If we've processed all keys, yield an empty array
            yield [];
        } else {
            // Otherwise, for each item in the current array
            for (let item of obj[keys[index]]) {
                // Generate combinations for the remaining arrays
                for (let rest of combineHelper(index + 1)) {
                    // And prepend the current item to these combinations
                    yield [item, ...rest];
                }
            }
        }
    }

    // Start combining from the first array
    return Array.from(combineHelper(0));
}

function createUnitConfigs(assetPath) {
    try {
        const testContent = fs.readFileSync(assetPath, "utf-8");
        const parsed = yaml.load(testContent, {schema: allYAMLSchemas});

        // Iterate over groups of configs and set config-based values
        const configGroups = Object.keys(parsed);
        configGroups.map((group) => {
            parsed[group].forEach((config) => {
                const ajv = new Ajv({allErrors: true, verbose: true});
                const validate = ajv.compile(config.schema);
                console.log(`${config.schema.schemaId}: ${validate(config)}`);
                console.error(validate.errors);
                delete config.schema;
            });
        });

        // console.log(JSON.stringify(parsed, null, 4));
        return parsed;
    } catch (e) {
        console.error("Error parsing YAML:", e);
    }
}

function createMethodConfigs(assetPath) {
    const unitGroups = createUnitConfigs(assetPath);
    const unitCombinations = combineUnits(unitGroups);

    const methodConfigs = unitCombinations.map((units) => {
        const tags = [...new Set(units.flatMap((u) => u.tags))];
        const name = "TBA";
        return { name, units, tags };
    })
    console.log(JSON.stringify(methodConfigs, null, 4));
}


// createUnitConfigs("./assets/method_test.yml")
createMethodConfigs("./assets/method_test.yml")
