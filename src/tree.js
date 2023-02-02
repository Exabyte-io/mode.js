import { deepClone, findTree } from "@exabyte-io/code.js/dist/utils";
import lodash from "lodash";
import _ from "underscore";

import { pickNodeData } from "./utils";
// TODO: migrate to use manifest instead

const methods = {
    pseudopotential: ["paw", "nc", "us"],
    // TODO: Add additional basis set options, once user choice of specific (i.e 3-21G vs cc-pVDZ) is implemented.
    localorbital: ["pople"],
    unknown: ["unknown"],
};

export const getPseudopotentialTypesFromTree = () => methods.pseudopotential;

// DFT-specific

const DFTModelRefiners = ["hse", "g0w0"];
const DFTModelModifiers = ["soc", "magn"];

const DFTModelTree = {
    gga: {
        refiners: DFTModelRefiners,
        modifiers: DFTModelModifiers,
        methods,
        functionals: ["pbe", "pbesol", "pw91", "other"],
    },
    lda: {
        refiners: DFTModelRefiners,
        modifiers: DFTModelModifiers,
        methods,
        functionals: ["pz", "pw", "vwn", "other"],
    },
    other: {
        methods,
        functionals: ["other"],
    },
};

export const getDFTFunctionalsFromTree = () => Object.keys(DFTModelTree);

export const getDFTFunctionalsByApproximation = (approximation) => {
    const branch = DFTModelTree[approximation];
    return branch && branch.functionals;
};

// GENERAL

export const MODEL_TREE = {
    dft: DFTModelTree,
    ml: {
        re: {
            methods: {
                linear: ["least_squares", "ridge"],
                kernel_ridge: ["least_squares"],
            },
        },
    },
    unknown: {
        unknown: {
            methods: {
                unknown: ["unknown"],
            },
        },
    },
};

export const MODEL_NAMES = {
    dft: "density functional theory",
    lda: "local density approximation",
    gga: "generalized gradient approximation",
    ml: "machine learning",
    re: "regression",
};

export const treeSlugToNamedObject = (modelSlug) => {
    return {
        slug: modelSlug,
        name: lodash.get(MODEL_NAMES, modelSlug, modelSlug),
    };
};

// TODO: find a better way to handle application-specific model-method combination
// must be a subset of the MODEL_TREE above
// demonstrate how tree can be modified
// VASP_MODELS_TREE.gga.functionals = _.omit(VASP_MODELS_TREE.gga.functionals);

const VASP_MODELS_TREE = deepClone(_.pick(MODEL_TREE, "dft"));
const ESPRESSO_MODELS_TREE = deepClone(_.pick(MODEL_TREE, "dft"));
const NWCHEM_MODELS_TREE = deepClone(_.pick(MODEL_TREE, "dft"));

["gga", "lda"].forEach((approximation) => {
    // pick "paw" for vasp
    VASP_MODELS_TREE.dft[approximation].methods.pseudopotential = VASP_MODELS_TREE.dft[
        approximation
    ].methods.pseudopotential.splice(0, 1);

    // assert "us" is the first option
    ESPRESSO_MODELS_TREE.dft[approximation].methods.pseudopotential =
        ESPRESSO_MODELS_TREE.dft[approximation].methods.pseudopotential.reverse();

    // NWCHEM_MODELS_TREE.dft[approximation].methods.localorbital =
    //     NWCHEM_MODELS_TREE.dft[approximation].methods.localorbital;
});

const UNKNOWN_MODELS_TREE = _.pick(MODEL_TREE, "unknown");
const ML_MODELS_TREE = _.pick(MODEL_TREE, "ml");

const MODELS_TREE_CONFIGS_BY_APPLICATION_NAME_VERSION = [
    {
        name: "vasp",
        tree: VASP_MODELS_TREE,
    },
    {
        name: "espresso",
        tree: ESPRESSO_MODELS_TREE,
    },
    {
        name: "python",
        tree: UNKNOWN_MODELS_TREE,
    },
    {
        name: "shell",
        tree: UNKNOWN_MODELS_TREE,
    },
    {
        name: "exabyteml",
        tree: ML_MODELS_TREE,
    },
    {
        name: "jupyterLab",
        tree: UNKNOWN_MODELS_TREE,
    },
    {
        name: "nwchem",
        tree: NWCHEM_MODELS_TREE,
    },
];

export const getTreeByApplicationNameAndVersion = ({
    name,
    // eslint-disable-next-line no-unused-vars
    version,
}) => {
    // TODO: add logic to filter by version when necessary
    const cfgs = MODELS_TREE_CONFIGS_BY_APPLICATION_NAME_VERSION.filter(
        (cfg) => cfg.name === name,
    ).map((x) => x.tree);
    return Object.assign({}, ...cfgs);
};

export const getDefaultModelTypeForApplication = (application) => {
    return Object.keys(getTreeByApplicationNameAndVersion(application))[0];
};

/**
 * Filter nodes from the model tree based on path and modify node data.
 * A node of the model tree is defined in mode.js and has a form such as the following:
 * ```
 * {
 *     path: "/dft/gga",
 *     data: {
 *         subtype: {
 *             slug: "gga",
 *             name: "Generalized Gradient Approximation",
 *         },
 *     },
 *     children: [
 *         // array of child nodes
 *     ],
 * }
 * ```
 * @param {Array} nodes - Array of nodes to be filtered.
 * @param {string[]} paths - Array of node paths
 * @param {Object[]} pathData - Array of objects containing path and node config.
 * @returns {Object[]} - The filtered tree (with possibly modified data).
 * @todo rename, e.g. filterMergeTree, filterModelTree,
 */
export function filterTree(nodes, paths, pathData = null) {
    return nodes.reduce((accumulator, node) => {
        if (paths.includes(node.path) || node.path === "") {
            let modified = {};
            const config = pathData && pathData.find((item) => item.path === node.path)?.config;
            if (config) {
                modified = lodash.merge({}, node, config);
            }
            if (node.children?.length) {
                const children = filterTree(node.children, paths, pathData);
                if (children.length) modified = { ...node, ...modified, children };
            }
            // eslint-disable-next-line no-unused-expressions
            lodash.isEmpty(modified) ? accumulator.push(node) : accumulator.push(modified);
        }
        return accumulator;
    }, []);
}

export function getUnitModelConfigByPath({ tree, path }) {
    if (!path) return undefined;
    const nodePaths = path
        .split("/")
        .filter(Boolean)
        .reduce((accumulator, value, index) => {
            if (index === 0) {
                accumulator.push(`/${value}`);
            } else {
                accumulator.push([accumulator[index - 1], value].join("/"));
            }
            return accumulator;
        }, []);
    const nodeData = nodePaths
        .map((nodePath) => findTree(tree, (n) => n.path === nodePath))
        .map((node) => pickNodeData(node));
    return lodash.merge({}, ...nodeData);
}

export function getDefaultMethodConfig({ modelPath }) {
    if (/^\/pb\/qm\/dft\/ksdft(\/\w+){2}$/.test(modelPath)) {
        return {
            type: "pseudopotential",
            subtype: "us",
        };
    }
    return undefined;
}

export function getDefaultModelConfig({ tree, subTreePath = null }) {
    const workingTree = subTreePath ? findTree(tree, (n) => n.path === subTreePath) : tree;
    const defaultPath = findTree(workingTree, (node) => node.data?.isDefault)?.path;
    const defaultConfig = getUnitModelConfigByPath({ tree: workingTree, path: defaultPath });
    return {
        units: [defaultConfig],
        method: getDefaultMethodConfig({ modelPath: defaultPath }),
    };
}
