import { expect } from "chai";

import {
    getDFTApproximations,
    getDFTFunctionalsByApproximation,
    getPseudopotentialTypes,
} from "../src/tree";

describe("tree", () => {
    it("can get a list of available DFT functionals", () => {
        const approximations = getDFTApproximations();
        const supportedApproximations = ["lda", "gga", "hybrid"];
        expect(approximations).to.have.members(supportedApproximations);
    });

    it("can get a list of functions by approximation", () => {
        const ldaFunctionals = getDFTFunctionalsByApproximation("lda");
        expect(ldaFunctionals).to.include("pz");
        const ggaFunctionals = getDFTFunctionalsByApproximation("gga");
        expect(ggaFunctionals).to.include("pbe");
        const hybridFunctionals = getDFTFunctionalsByApproximation("hybrid");
        expect(hybridFunctionals).to.include("hse06");
    });

    it("can get a list of pseudopotential types", () => {
        const ppTypes = getPseudopotentialTypes();
        const supportedPseudoTypes = ["paw", "us", "nc", "any"];
        expect(ppTypes).to.have.members(supportedPseudoTypes);
    });
});
