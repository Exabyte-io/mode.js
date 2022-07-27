import { JSONSchemaFormDataProvider } from "/imports/core_cove/providers";

export class NEBFormDataProvider extends JSONSchemaFormDataProvider {

    constructor(config) {
        super(config);
    }

    get defaultData() {
        return {
            nImages: 1
        };
    }

    get uiSchema() {
        return {
            nImages: {}
        }
    }

    get jsonSchema() {
        return {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "title": " ",
            "description": "Number of intermediate NEB images.",
            "type": "object",
            "properties": {
                "nImages": {
                    "type": "number",
                    "default": this.defaultData.nImages,
                }
            },
        }
    }

}
