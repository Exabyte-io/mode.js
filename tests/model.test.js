import { expect } from "chai";

import { Model } from "../src/model";

describe("Model", () => {
    const obj = { type: "dft" };

    it("can be created", () => {
        const app = new Model(obj);
        expect(app.type).to.equal("dft");
    });
});
