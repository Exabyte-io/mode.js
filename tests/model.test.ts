import { expect } from "chai";

import { Model } from "../src/model";
import { ModelFactory } from "../src/models/factory";

describe("Model", () => {
    const obj = { type: "dft" };

    it("can be created", () => {
        // @ts-ignore
        const model = new Model(obj);
        expect(model.type).to.equal("dft");
    });

    it("can be created from the model factory", () => {
        const model = ModelFactory.create(obj);
        expect(model.type).to.be.equal("dft");
    });

    it("should have 'unknown' model as default if type is 'unknown'", () => {
        const config = { type: "unknown" };
        const model = ModelFactory.create(config);
        expect(model.type).to.be.equal("unknown");
        expect(model.subtype).to.be.equal("unknown");
        expect(model._defaultCategorized).to.be.undefined;
    });

    it("default model for espresso is DFT PBE", () => {
        const application = { name: "espresso", version: "6.3", build: "Default" };
        const model = ModelFactory.createFromApplication({ application });
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("gga");
        // @ts-ignore
        expect(model.functional.slug).to.be.equal("pbe");
    });

    it("default model for vasp is DFT PBE", () => {
        const application = { name: "vasp", version: "5.4.4", build: "Default" };
        const model = ModelFactory.createFromApplication({ application });
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("gga");
        // @ts-ignore
        expect(model.functional.slug).to.be.equal("pbe");
    });

    it("default model for nwchem is DFT B3LYP", () => {
        const application = { name: "nwchem", version: "6.6", build: "Default" };
        const model = ModelFactory.createFromApplication({ application });
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("hybrid");
        // @ts-ignore
        expect(model.functional.slug).to.be.equal("b3lyp");
    });

    it("default model for exabyteml is regression", () => {
        const application = { name: "exabyteml", version: "0.2.0", build: "Default" };
        const model = ModelFactory.createFromApplication({ application });
        expect(model.type).to.be.equal("ml");
        expect(model.subtype).to.be.equal("re");
    });
});
