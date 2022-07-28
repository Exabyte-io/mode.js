import { mix } from "mixwith";
import { ApplicationContextMixinBuilder, ContextProvider } from "@exabyte-io/code.js/dist/context"
import { Application } from "@exabyte-io/ade.js";

export class MLSettingsContextProvider extends mix(ContextProvider).with(ApplicationContextMixinBuilder(Application)) {

    constructor(config) {
        super(config);
    }

    get uiSchema() {
        return {
            target_column_name: {},
            problem_category: {},
        }
    }

    get defaultData() {
        return {
            target_column_name: "target",
            problem_category: "regression",
        };
    }

    get jsonSchema() {
        return {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "title": " ",
            "description": "Settings important to machine learning runs.",
            "type": "object",
            "properties": {
                "target_column_name": {
                    "type": "string",
                    "default": this.defaultData.target_column_name,
                },
                "problem_category": {
                    "type": "string",
                    "default": this.defaultData.problem_category,
                    "enum": [
                        "regression",
                        "classification",
                        "clustering"
                    ]
                },
            },
        }
    }

}
