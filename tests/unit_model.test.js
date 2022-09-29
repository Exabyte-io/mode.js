import { expect } from "chai";

import { Method } from "../src/method";
import { UnitModel } from "../src/unit_model";
import { REGEX } from "../src/utils";

const SVWN_CONFIG = {
    categories: { tier1: "pb", tier2: "qm", tier3: "dft" },
    type: "ksdft",
    subtype: "lda",
    functional: "svwn",
    method: {
        type: "unknown",
        subtype: "unknown",
    },
    flowchartId: "abc123",
    references: [{ doi: "10.0000/0000" }],
    tags: ["generic"],
};

describe("Unit model", () => {
    const unitModel = new UnitModel(SVWN_CONFIG);
    it("can be created", () => {
        expect(unitModel).to.be.instanceof(UnitModel);
        expect(unitModel.type).to.be.equal(SVWN_CONFIG.type);
    });

    it("has attributes", () => {
        expect(unitModel.type).to.be.equal(SVWN_CONFIG.type);
        expect(unitModel.subtype).to.be.equal(SVWN_CONFIG.subtype);
        expect(unitModel.method).to.be.instanceof(Method);
        expect(unitModel.methodConfig).to.have.keys("type", "subtype");
        expect(unitModel.flowchartId).to.be.equal(SVWN_CONFIG.flowchartId);
        expect(unitModel.references).to.be.an("array");
        expect(unitModel.tags).to.be.an("array");
    });

    it("creates a flowchartId when none is given", () => {
        const { flowchartId, ...otherConfig } = SVWN_CONFIG;
        const otherModel = new UnitModel(otherConfig);
        expect(otherModel.flowchartId).to.be.a("string").that.is.not.empty;
    });

    it("creates model path", () => {
        expect(unitModel.modelPath).to.match(REGEX.unitModel);
    });
    // TODO: test toJSON with schema
});
