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
});
