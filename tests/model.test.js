import { expect } from "chai";

import { Model } from "../src/compound_model";
import { UnitModel } from "../src/unit_model";

const MODEL_CONFIG_BARE = {
    name: "Test model",
    slug: "test_model",
};

const UNIT_MODEL_CONFIG = {
    categories: { tier1: "pb", tier2: "qm", tier3: "dft" },
    type: "ksdft",
    subtype: "lda",
    functional: "svwn",
    method: {
        type: "unknown",
        subtype: "unknown",
    },
    references: [{ doi: "10.0000/0000" }],
    tags: ["generic"],
};

const UNIT_MODEL_CONFIG_2 = {
    categories: { tier1: "pb", tier2: "qm", tier3: "abin" },
    type: "gw",
    method: {
        type: "unknown",
        subtype: "unknown",
    },
    tags: ["perturbation-theory"],
};

const MODEL_CONFIG_SIMPLE = {
    ...MODEL_CONFIG_BARE,
    units: [UNIT_MODEL_CONFIG],
};

const MODEL_CONFIG_MULTI = {
    ...MODEL_CONFIG_BARE,
    units: [UNIT_MODEL_CONFIG, UNIT_MODEL_CONFIG_2],
};

describe("Model", () => {
    it("can be created", () => {
        const model = new Model(MODEL_CONFIG_BARE);
        expect(model.name).to.equal(MODEL_CONFIG_BARE.name);
    });

    it("can be created with unit models", () => {
        const model = new Model(MODEL_CONFIG_SIMPLE);
        expect(model.units).to.be.an("array");
        model.units.forEach((m) => {
            expect(m).to.be.an.instanceof(UnitModel);
        });
    });

    it("can add a unit model", () => {
        const model = new Model();
        const unitModel = new UnitModel(UNIT_MODEL_CONFIG);

        // add first unit model
        model.addUnitModel(unitModel);
        expect(model.units).to.be.an("array").that.has.lengthOf(1);
        expect(model.units[0].head).to.be.true;

        // add second unit model
        model.addUnitModel(new UnitModel(UNIT_MODEL_CONFIG_2));
        expect(model.units).to.be.an("array").that.has.lengthOf(2);
        expect(model.units[0].next).to.be.equal(model.units[1].flowchartId);
        expect(model.units[1].head).to.be.false;
    });

    it("can remove unit models by flowchartId", () => {
        const model = new Model(MODEL_CONFIG_MULTI);
        const lengthBefore = MODEL_CONFIG_MULTI.units.length;
        expect(model.units).to.be.an("array").that.has.lengthOf(lengthBefore);
        const { flowchartId } = model.units[0];
        model.removeUnitModelById(flowchartId);
        expect(model.units).to.have.lengthOf(lengthBefore - 1);
        expect(model.units[0].head).to.be.true;
    });

    it("can remove unit models by index", () => {
        const model = new Model(MODEL_CONFIG_MULTI);
        const lengthBefore = MODEL_CONFIG_MULTI.units.length;
        expect(model.units).to.be.an("array").that.has.lengthOf(lengthBefore);
        const index = 0;
        model.removeUnitModelByIndex(index);
        expect(model.units).to.have.lengthOf(lengthBefore - 1);
        expect(model.units[0].head).to.be.true;
    });

    it("has model graph", () => {
        const model = new Model(MODEL_CONFIG_MULTI);
        const graph = model.buildGraph();
        expect(graph).to.be.an("array");
        graph.forEach((g) => {
            expect(g).to.include.all.keys("head", "name", "flowchartId");
        });
        expect(graph[0].next).to.be.equal(graph[1].flowchartId);
    });

    // TODO: tests for updateUnitModel, syncToProps
});
