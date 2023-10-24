import { expect } from "chai";

import { DFTModel } from "../src/models/dft";

describe("DFTModel", () => {
    it("should have a default functional", () => {
        const config = { type: "dft", subtype: "lda" };
        const model = new DFTModel(config);
        expect(model.defaultFunctional.slug).to.be.equal("pz");
    });
});
