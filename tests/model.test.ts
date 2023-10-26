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
});
