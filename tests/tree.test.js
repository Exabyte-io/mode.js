import { findTree } from "@exabyte-io/code.js/dist/utils";
import { expect } from "chai";

import MODEL_TREE from "../model_tree";
import { filterTree } from "../src/tree";

describe("Model tree", () => {
    const paths = ["/pb", "/pb/qm", "/pb/qm/dft"];
    const pathData = [
        {
            path: "/pb/qm/dft",
            config: {
                isDefault: true,
                data: {
                    additionalAttribute: "test",
                    tier3: {
                        name: "DFT modified",
                    },
                },
            },
        },
    ];
    it("can be filtered", () => {
        const filtered = filterTree(MODEL_TREE.children, paths);
        expect(filtered).to.have.length(1);
    });
    it("can be filtered and modified", () => {
        const tree = filterTree([MODEL_TREE], paths, pathData);
        const modified = findTree(tree, (node) => node.path === "/pb/qm/dft");
        expect(modified).to.have.property("isDefault", true);
        expect(modified.data).to.have.property("additionalAttribute", "test");
        expect(modified.data.tier3.name).to.be.equal("DFT modified");
    });
});
