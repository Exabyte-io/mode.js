import { expect } from "chai";

import { Model } from "../src/model";
import { ModelFactory } from "../src/models/factory";

describe("Model", () => {
    const obj = { type: "dft" };

    it("can be created", () => {
        const app = new Model(obj);
        expect(app.type).to.equal("dft");
    });
});

const vaspModel = {
    application: { name: "vasp", shortName: "vasp", version: "5.3.5" },
    type: "dft",
};

describe("ModelFactory", () => {
    it("should create a DFTModel for VASP with PAW method", () => {
        const model = ModelFactory.create(vaspModel);
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("gga");
        expect(model.method.subtype).to.be.equal("paw");
    });
});
