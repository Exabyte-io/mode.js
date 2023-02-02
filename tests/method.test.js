import { expect } from "chai";

import { Method, MethodFactory } from "../src";

const UNKNOWN_METHOD_CONFIG = {
    type: "unknown",
    subtype: "unknown",
};

const PSEUDO_METHOD_CONFIG = {
    type: "pseudopotential",
    subtype: "us",
};

describe("Method", () => {
    it("can be created", () => {
        const unknownMethod = new Method(UNKNOWN_METHOD_CONFIG);
        expect(unknownMethod.type).to.equal("unknown");
        expect(unknownMethod.subtype).to.equal("unknown");
    });

    it("can be created with MethodFactory", () => {
        const method = MethodFactory.create(PSEUDO_METHOD_CONFIG);
        expect(method.type).to.equal("pseudopotential");
        expect(method.subtype).to.equal("us");
    });

    it("MethodFactory returns null if no config is provided", () => {
        const method = MethodFactory.create();
        // eslint-disable-next-line no-unused-expressions
        expect(method).to.be.null;
    });
});
