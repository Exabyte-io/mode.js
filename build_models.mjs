import fs from "fs";
import yaml from "js-yaml";
import { allYAMLSchemas } from "@exabyte-io/code.js/dist/utils";

try {
    const testContent = fs.readFileSync("./assets/test.yml", "utf-8");
    const parsed = yaml.load(testContent, { schema: allYAMLSchemas });
    console.log(JSON.stringify(parsed, null, 4));
} catch (e) {
    console.error("Error parsing YAML:", e);
}
