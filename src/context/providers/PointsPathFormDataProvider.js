import { mix } from "mixwith";
import s from "underscore.string";
import { Made } from "@exabyte-io/made.js";
import { Application } from "@exabyte-io/ade.js";
import { math as codeJSMath } from "@exabyte-io/code.js/dist/math";
import { ApplicationContextMixinBuilder, MaterialContextMixinBuilder } from "@exabyte-io/code.js/dist/context"

import { JSONSchemaFormDataProvider } from "/imports/core_cove/providers";

const defaultPoint = "Г";
const defaultSteps = 10;

export class PointsPathFormDataProvider extends mix(JSONSchemaFormDataProvider).with(
    ApplicationContextMixinBuilder(Application),
    MaterialContextMixinBuilder(Made.Material),
) {

    constructor(config) {
        super(config);
        this.reciprocalLattice = new Made.ReciprocalLattice(this.material.lattice);
        this.symmetryPoints = this.symmetryPointsFromMaterial;
    }

    get isEditedIsSetToFalseOnMaterialUpdate() {
        return this.isMaterialUpdated || this.isMaterialCreatedDefault
    }

    get defaultData() {
        return this.reciprocalLattice.defaultKpointPath;
    }

    get symmetryPointsFromMaterial() {
        return this.reciprocalLattice.symmetryPoints;
    }

    get jsonSchema() {
        // no need to pass context to get symmetry points on client
        const points = [].concat(this.symmetryPoints).map(x => x.point);
        return {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "title": " ",
            "description": "path in reciprocal space",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "point": {
                        "type": "string",
                        "default": defaultPoint,
                        "enum": points,
                    },
                    "steps": {
                        "type": "integer",
                        "default": defaultSteps,
                    }
                }
            },
            "minItems": 1
        }
    }

    get uiSchema() {
        return {
            items: {}
        }
    }

    get uiSchemaStyled() {
        return {
            items: {
                point: this.defaultFieldStyles,
                steps: this.defaultFieldStyles
            }
        }
    }

    get fields() {
        return {
            TitleField: ({
                             title,
                             required
                         }) => this.material.getBrillouinZoneImageComponent(title)
        }
    }

    get useExplicitPath() {return this.application.name === "vasp"}

    // override yieldData to avoid storing explicit path in saved context
    yieldDataForRendering() {return this.yieldData(this.useExplicitPath)}

    transformData(path = [], useExplicitPath = false) {
        const rawData = path.map(p => {
            const point = this.symmetryPoints.find(sp => sp.point === p.point);
            return Object.assign({}, p, {coordinates: point.coordinates});
        });
        const processedData = useExplicitPath ? this._convertToExplicitPath(rawData) : rawData;
        // make coordinates into string and add formatting
        return processedData.map(p => {
            const coordinates = this.is2PIBA ? this.get2PIBACoordinates(p.coordinates) : p.coordinates;
            p.coordinates = coordinates.map(c => s.sprintf("%14.9f", c));
            return p;
        })
    }

    get2PIBACoordinates(point) {return this.reciprocalLattice.getCartesianCoordinates(point)}

    // Initially, path contains symmetry points with steps counts.
    // This function explicitly calculates each point between symmetry points by step counts.
    _convertToExplicitPath(path) {
        const points = [];
        for (let i = 0; i < path.length - 1; i++) {
            const startPoint = path[i];
            const endPoint = path[i + 1];
            const middlePoints = codeJSMath.calculateSegmentsBetweenPoints3D(startPoint.coordinates, endPoint.coordinates, startPoint.steps);
            points.push(startPoint.coordinates);
            points.push(...middlePoints);
            // Include endPoint into path for the last section, otherwise it will be included by next loop iteration
            if (path.length - 2 === i) points.push(endPoint.coordinates);
        }
        return points.map(x => {
            return {
                coordinates: x,
                steps: 1
            }
        });
    }

}

export class ExplicitPointsPathFormDataProvider extends PointsPathFormDataProvider {

    get useExplicitPath() {return true}

}

export class ExplicitPointsPath2PIBAFormDataProvider extends ExplicitPointsPathFormDataProvider {

    get is2PIBA() {return true}

}
