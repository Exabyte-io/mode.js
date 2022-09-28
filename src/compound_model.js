import { InMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { setNextLinks, setUnitsHead } from "@exabyte-io/code.js/dist/utils";

import { buildModelPath } from "./utils";

export class Model extends InMemoryEntity {
    constructor(config) {
        super(config);

        this.units = [];
    }

    get name() {
        return this.prop("name");
    }

    get slug() {
        return this.prop("slug");
    }

    setNextLinks() {
        this.units = setNextLinks(this.units);
        return this;
    }

    setUnitsHead() {
        this.units = setUnitsHead(this.units);
        return this;
    }

    addUnitModel(unitModel, index = -1) {
        if (this.units.length === 0) {
            this.units = [unitModel];
        } else if (index === 0) {
            unitModel.next = this.units[0].flowchartId;
            this.units.unshift(unitModel);
        } else if (index > 0 && index < this.units.length) {
            this.units.splice(index, 0, unitModel);
            this.setNextLinks();
        } else {
            this.units.push(unitModel);
            this.setNextLinks();
        }
        this.setUnitsHead().updateModelPath();
    }

    removeUnitModelById(flowchartId) {
        this.units = this.units.filter((um) => um.flowchartId !== flowchartId);
        this.setNextLinks().setUnitsHead().updateModelPath();
    }

    removeUnitModelByIndex(index) {
        this.units.splice(index, 1);
        this.setNextLinks().setUnitsHead().updateModelPath();
    }

    get modelPath() {
        return this.prop("modelPath");
    }

    updateModelPath() {
        const modelPath = buildModelPath(this.units);
        this.setProp("modelPath", modelPath);
        return this;
    }

    get graph() {
        if (this.units.length === 0) return [];

        return this.units.map((um) => ({
            name: um.name,
            head: um.head,
            flowchartId: um.flowchartId,
            ...(um.next ? { next: um.next } : {}),
            ...(um.workflowUnitId ? { workflowUnitId: um.workflowUnitId } : {}),
        }));
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            graph: this.graph,
        };
    }
}
