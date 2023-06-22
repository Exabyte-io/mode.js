import { expect } from "chai";

import { filterMethodsByModel } from "../src/tree";

describe("model-method filter", () => {
    it("can filter a list of method by model parameters", () => {
        const methodConfigs = [
            {
                path: "/qm/wf/none/smearing/gaussian::/opt/diff/ordern/cg/none::/qm/wf/none/psp/us::/qm/wf/none/pw/none",
                name: "mock method A",
            },
            {
                path: "/linalg/diag/none/davidson/none::/qm/wf/none/psp/paw::/qm/wf/none/pw/none",
                name: "mock method B",
            },
            {
                path: "/some/unsupported/method/path::/qm/wf/none/pw/none",
                name: "mock method C",
            },
        ];
        const modelConfig = {
            categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        };
        const filteredConfigs = filterMethodsByModel({
            methodList: methodConfigs,
            model: modelConfig,
        });
        expect(filteredConfigs).to.have.length(2);
        expect(filteredConfigs).not.to.have.deep.members([
            {
                path: "/some/unsupported/method/path::/qm/wf/none/pw/none",
                name: "mock method C",
            },
        ]);
    });
});
