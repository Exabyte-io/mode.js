import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import lodash from "lodash";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ESSE_PATH = path.resolve(__dirname, "./node_modules/@exabyte-io/esse.js");

function combineKeys(a, b) {
    const combined = [];
    for (const objA of a) {
        for (const objB of b) {
            combined.push(lodash.merge({}, objA, objB));
        }
    }
    return combined;
}

function getValues(ref) {
    let refPath = ref.replace(/#.*$/, "");
    if (ref.startsWith("esse:")) {
        refPath = path.join(ESSE_PATH, refPath.substring(5));
    }
    const fileContent = fs.readFileSync(refPath, "utf8");
    const parsedContent = yaml.load(fileContent, {schema: ignoreUnknownSchema});

    const keyName = ref.replace(/.*#\/?/, "");
    const values = parsedContent[keyName]
    return Array.isArray(values) ? values : [values];
}

// js-yaml doesn't have an option to ignore unknown tags
const IgnoreEnumType = new yaml.Type("!enum", {
    kind: "sequence",
});
const ignoreUnknownSchema = yaml.DEFAULT_SCHEMA.extend([IgnoreEnumType]);

const parameterType = new yaml.Type('!parameter', {
    kind: 'mapping',
    construct(data) {
        const { key, values = [], ref, exclude } = data;

        try {
            let values_ = ref && !values.length ? getValues(ref) : values;
            if (exclude) {
                const regex = new RegExp(exclude);
                values_ = values_.filter((v) => !regex.test(v));
            }
            return { key, values: values_ }
        } catch (e) {
            console.error("Error resolving values from YAML", e);
            return data;
        }
    }
});

const combineType = new yaml.Type('!combine', {
    kind: 'mapping',
    construct(data) {
        const {name, forEach = [], config = {}} = data;
        let result = [{}];
        for (const item of forEach) {
            const {key, values = []} = item;
            const newCombinations = values.map((v) => lodash.set({}, key, v));
            result = combineKeys(result, newCombinations);
        }
        return result.map((r) => lodash.merge(r, {name}, config));
    },
});

const customSchema = yaml.DEFAULT_SCHEMA.extend([combineType, parameterType]);

try {
    const testContent = fs.readFileSync("./assets/test.yml", "utf-8");
    const parsed = yaml.load(testContent, { schema: customSchema });
    console.log(JSON.stringify(parsed, null, 4));
} catch (e) {
    console.error("Error parsing YAML:", e);
}
