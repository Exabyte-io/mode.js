import { expect } from "chai";

import { filterMethodsByModel } from "../src/tree";

describe("model-method filter", () => {
    it("can filter a list of method by model parameters", () => {
        const methodConfigs = [
            {
                path: "/qm/wf/undefined/smearing/gaussian::/opt/diff/ordern/cg/undefined::/qm/wf/undefined/psp/us::/qm/wf/undefined/pw/undefined",
                name: "mock method A",
            },
            {
                path: "/linalg/diag/undefined/davidson/undefined::/qm/wf/undefined/psp/paw::/qm/wf/undefined/pw/undefined",
                name: "mock method B",
            },
            {
                path: "/some/unsupported/method/path::/qm/wf/undefined/pw/undefined",
                name: "mock method C",
            },
        ];
        const modelConfig = {
            categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        };
        const filteredConfigs = filterMethodsByModel({
            methodList: methodConfigs,
            model: modelConfig,
        });
        expect(filteredConfigs).to.have.length(2);
        expect(filteredConfigs).not.to.have.deep.members([
            {
                path: "/some/unsupported/method/path::/qm/wf/undefined/pw/undefined",
                name: "mock method C",
            },
        ]);
    });
});
