import { InMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { setNextLinks, setUnitsHead } from "@exabyte-io/code.js/dist/utils";

import { UnitModel } from "./unit_model";
import { UnitModelFactory } from "./unit_model_factory";
import { buildModelPath } from "./utils";

export class Model extends InMemoryEntity {
    static UnitModelFactory = UnitModelFactory;

    static UnitModelCls = UnitModel;

    constructor({ ...config } = {}) {
        super(config);
        this._units = Model.instantiateUnits(config.units);
        this.setNextLinks().setUnitsHead().syncToProp();
    }

    get name() {
        return this.prop("name");
    }

    get slug() {
        return this.prop("slug");
    }

    static isUnitModelArray(unitInstances) {
        return (
            Array.isArray(unitInstances) &&
            unitInstances.every((u) => u instanceof Model.UnitModelCls)
        );
    }

    static instantiateUnits(unitConfigs) {
        if (!Array.isArray(unitConfigs) || !unitConfigs) return [];
        return unitConfigs.map((config) => Model.UnitModelFactory.create(config));
    }

    /**
     *  Get list of unit model _instances_
     */
    get units() {
        return this._units;
    }

    /**
     *  Set units and update `this._json`.
     */
    set units(unitInstances) {
        const valid = Model.isUnitModelArray(unitInstances) || !unitInstances.length;
        if (valid) {
            this._units = unitInstances;
            this.setNextLinks().setUnitsHead().syncToProp();
        }
    }

    setUnitModels(unitInstances) {
        this.units = unitInstances;
        return this;
    }

    setNextLinks() {
        if (this._units.length > 0) {
            this._units = setNextLinks(this._units);
        }
        return this;
    }

    setUnitsHead() {
        if (this._units.length > 0) {
            this._units = setUnitsHead(this._units);
        }
        return this;
    }

    addUnitModel(unitModel, index = -1) {
        if (this._units.length === 0) {
            this._units = [unitModel];
        } else if (index === 0) {
            unitModel.next = this._units[0].flowchartId;
            this._units.unshift(unitModel);
        } else if (index > 0 && index < this._units.length) {
            this._units.splice(index, 0, unitModel);
            this.setNextLinks();
        } else {
            this._units.push(unitModel);
            this.setNextLinks();
        }
        return this.setUnitsHead().syncToProp();
    }

    updateUnitModelByIndex(unitModel, index) {
        this._units[index] = unitModel;
        return this.setNextLinks().setUnitsHead().syncToProp();
    }

    updateUnitModelById(unitModel, flowchartId) {
        const idx = this.units.findIndex((um) => um.flowchartId === flowchartId);
        if (idx) {
            this.updateUnitModelByIndex(unitModel, idx);
        }
        return this;
    }

    removeUnitModelById(flowchartId) {
        this.units = this.units.filter((um) => um.flowchartId !== flowchartId);
        return this;
    }

    removeUnitModelByIndex(index) {
        this._units.splice(index, 1);
        return this.setNextLinks().setUnitsHead().syncToProp();
    }

    get modelPath() {
        return this.prop("modelPath");
    }

    syncModelPath() {
        this.setProp("modelPath", buildModelPath(this.units));
        return this;
    }

    syncUnitModels() {
        this.setProp(
            "units",
            this.units.map((um) => um.toJSON()),
        );
        return this;
    }

    syncGraph() {
        this.setProp("graph", this.buildGraph);
        return this;
    }

    syncToProp() {
        this.syncModelPath().syncUnitModels().syncGraph();
        return this;
    }

    buildGraph() {
        if (this.units.length === 0) return [];

        return this.units.map((um) => ({
            name: um.name,
            head: um.head,
            flowchartId: um.flowchartId,
            ...(um.next ? { next: um.next } : {}),
            ...(um.workflowUnitId ? { workflowUnitId: um.workflowUnitId } : {}),
        }));
    }

    get graph() {
        return this.prop("graph");
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            graph: this.graph,
        };
    }
}
