import { mix } from "mixwith";
import { Made } from "@exabyte-io/made.js";

import { deepClone } from "@exabyte-io/code.js/dist/utils";
import { MaterialContextMixinBuilder } from "@exabyte-io/code.js/dist/context";
import { JSONSchemaFormDataProvider } from "/imports/core_cove/providers";

export class BoundaryConditionsFormDataProvider extends mix(JSONSchemaFormDataProvider).with(
    MaterialContextMixinBuilder(Made.Material)
) {

    get boundaryConditions() {return this.material.metadata.boundaryConditions || {}}

    get defaultData() {
        return {
            type: this.boundaryConditions.type || "pbc",
            offset: this.boundaryConditions.offset || 0,
            electricField: 0,
            targetFermiEnergy: 0
        };
    }

    get uiSchema() {
        return {
            type: {"ui:disabled": true},
            offset: {"ui:disabled": true},
            electricField: {},
            targetFermiEnergy: {}
        }
    }

    get humanName() {return "Boundary Conditions"}

    yieldDataForRendering() {
        const data = deepClone(this.yieldData());
        data.boundaryConditions.offset *= Made.coefficients.ANGSTROM_TO_BOHR;
        data.boundaryConditions.targetFermiEnergy *= Made.coefficients.EV_TO_RY;
        data.boundaryConditions.electricField *= Made.coefficients.EV_A_TO_RY_BOHR;
        return data;
    }

    get jsonSchema() {
        return {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "title": "Type",
                    "default": this.defaultData.type,
                },
                "offset": {
                    "type": "number",
                    "title": "Offset (A)",
                    "default": this.defaultData.offset,
                },
                "electricField": {
                    "type": "number",
                    "title": "Electric Field (eV/A)",
                    "default": this.defaultData.electricField,
                },
                "targetFermiEnergy": {
                    "type": "number",
                    "title": "Target Fermi Energy (eV)",
                    "default": this.defaultData.targetFermiEnergy,
                }

            },
        }
    }

}
