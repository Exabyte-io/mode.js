import { expect } from "chai";
import t from "t";

import MODEL_TREE from "../model_tree";
import { filterTree } from "../src/tree";

describe("Model tree", () => {
    const paths = ["/dft", "/dft/lda"];
    const pathData = [
        {
            path: "/dft/lda",
            data: {
                additionalAttribute: "test",
                subtype: {
                    slug: "lda-modified",
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
        const modified = t.find(tree, (node) => node.path === "/dft/lda");
        expect(modified.data).to.have.property("additionalAttribute", "test");
        expect(modified.data.subtype.slug).to.be.equal("lda-modified");
    });
});
