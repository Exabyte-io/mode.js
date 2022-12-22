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

    get methods() {
        return this.units.map((unit) => unit.method);
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