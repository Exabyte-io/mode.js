import { expect } from "chai";

import { DFTModel } from "../src/models/dft";
import { ModelFactory } from "../src/models/factory";

describe("DFTModel", () => {
    it("should have a default functional", () => {
        const config = { type: "dft", subtype: "lda" };
        const model = new DFTModel(config);
        expect(model.defaultFunctional.slug).to.be.equal("pz");
    });

    it("can be created from the factory", () => {
        const config = { type: "dft" };
        const model = ModelFactory.create(config) as DFTModel;
        expect(model.functional?.slug).to.be.equal("pbe");
    });
});
