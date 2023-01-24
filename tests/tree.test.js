import { expect } from "chai";
import t from "t";

import MODEL_TREE from "../model_tree";
import { filterTree } from "../src/tree";

describe("Model tree", () => {
    const paths = ["/pb", "/pb/qm", "/pb/qm/dft"];
    const pathData = [
        {
            path: "/pb/qm/dft",
            data: {
                additionalAttribute: "test",
                tier3: {
                    title: "DFT modified",
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
        const modified = t.find(tree, (node) => node.path === "/pb/qm/dft");
        expect(modified.data).to.have.property("additionalAttribute", "test");
        expect(modified.data.tier3.title).to.be.equal("DFT modified");
    });
});
