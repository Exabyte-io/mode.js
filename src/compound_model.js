import {
    FlowchartEntityMixin,
    InMemoryEntity,
    NamedEntityMixin,
} from "@exabyte-io/code.js/dist/entity";
import { setNextLinks, setUnitsHead } from "@exabyte-io/code.js/dist/utils";
import { mix } from "mixwith";

import { UnitModel } from "./unit_model";
import { UnitModelFactory } from "./unit_model_factory";
import { buildModelPath } from "./utils";

export class Model extends mix(InMemoryEntity).with(NamedEntityMixin, FlowchartEntityMixin) {
    static UnitModelFactory = UnitModelFactory;

    static UnitModelCls = UnitModel;

    constructor({ ...config } = {}) {
        super(config);
        this._units = Model.instantiateUnits(config.units);
    }

    get modelPath() {
        return this.prop("modelPath");
    }

    get graph() {
        return this.prop("graph");
    }

    static instantiateUnits(unitConfigs) {
        if (!Array.isArray(unitConfigs) || !unitConfigs) return [];
        const units = unitConfigs.map((config) => Model.UnitModelFactory.create(config));
        return setNextLinks(setUnitsHead(units));
    }

    buildModelPath() {
        return buildModelPath(this.units);
    }

    buildGraph() {
        return this.units.map((um) => ({
            name: um.name,
            head: um.head,
            flowchartId: um.flowchartId,
            ...(um.next ? { next: um.next } : {}),
            ...(um.workflowUnitId ? { workflowUnitId: um.workflowUnitId } : {}),
        }));
    }

    get types() {
        return this.units.map((unit) => unit.type);
    }

    get methods() {
        return this.units.map((unit) => unit.method);
    }

    get Methods() {
        return this.units.map((unit) => unit.Method);
    }

    get methodTypes() {
        return this.methods.map((method) => method.type);
    }

    get methodSubtypes() {
        return this.methods.map((method) => method.subtype);
    }

    /**
     * Group slugs are used in the MaterialsExplorerData to show columns with model data.
     * The model data is not taken directly from the model or method, but encoded in the group slug string and accessed
     * via the property object.
     *
     * @summary Concatenate group slugs of units.
     * @param {Object|Application} application - Application config or instance.
     * @returns {string}
     */
    buildGroupSlug(application) {
        return this.units.map((unit) => unit.buildGroupSlug(application)).join("#");
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            graph: this.graph,
            units: this.units.map((u) => u.toJSON()),
            modelPath: buildModelPath(this.units),
        };
    }
}
