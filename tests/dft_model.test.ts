import { expect } from "chai";

import { DFTModelConfig } from "../src/default_models";
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

    it("can be created from the factory given an application", () => {
        const config = {
            application: {
                name: "espresso",
                version: "6.3",
                build: "Default",
            },
            otherProperty: 42,
        };
        const model = ModelFactory.createFromApplication(config);
        expect(model).to.be.instanceof(DFTModel);
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("gga");
        // @ts-ignore
        expect(model.functional?.slug).to.be.equal("pbe");
        expect(model._json.otherProperty).to.be.equal(42);
        expect(model.method.type).to.be.equal("pseudopotential");
    });

    it("can be created from default model config", () => {
        const model = ModelFactory.create(DFTModelConfig);
        expect(model.type).to.be.equal("dft");
        expect(model.subtype).to.be.equal("gga");
        // @ts-ignore
        expect(model.functional.slug).to.be.equal("pbe");
    });

    it("creates the group slug 'qe:dft:gga:pbe' for DFT GGA", () => {
        const application = {
            name: "espresso",
            shortName: "qe",
            version: "6.3",
            build: "Default",
        };
        const model = ModelFactory.createFromApplication({ application });
        const expectedGroupSlug = "qe:dft:gga:pbe";
        expect(model.groupSlug).to.be.equal(expectedGroupSlug);
    });
});
