import { expect } from "chai";

import { getAvailableDFTFunctionals, getPseudopotentialTypes } from "../src/tree";

describe("tree", () => {
    it("can get a list of available DFT functionals", () => {
        const functionals = getAvailableDFTFunctionals();
        const supportedFunctionals = ["pbe", "hse06", "b3lyp", "pz"];
        expect(functionals).to.have.members(supportedFunctionals);
    });

    it("can get a list of pseudopotential types", () => {
        const ppTypes = getPseudopotentialTypes();
        const supportedPseudoTypes = ["paw", "us", "nc", "any"];
        expect(ppTypes).to.have.members(supportedPseudoTypes);
    });
});
