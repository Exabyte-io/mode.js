import { filterEntityList, mergeTerminalNodes } from "@exabyte-io/code.js/dist/utils";
import lodash from "lodash";

import modelMethodMap from "./data/model_method_map";

// TODO: migrate to use manifest instead

export const METHODS = {
    pseudopotential: "pseudopotential",
    localorbital: "localorbital",
    unknown: "unknown",
};

export const MODEL_NAMES = {
    dft: "density functional theory",
    lda: "local density approximation",
    gga: "generalized gradient approximation",
    hybrid: "hybrid functional",
    ml: "machine learning",
    re: "regression",
};

function safelyGet(obj, ...args) {
    return lodash.get(obj, args, undefined);
}

/**
 * Create list of filter objects based on model categories.
 * @param {Object} filterTree - filter tree constructed from assets
 * @param {string} tier1 - Level 1 tier
 * @param {string} tier2 - Level 2 tier
 * @param {string} tier3 - Level 3 tier
 * @param {string} type - Type
 * @param {string} subtype - Subtype
 * @return {*[]}
 */
function getMethodFilterObjects({ filterTree, tier1, tier2, tier3, type, subtype }) {
    let filterList;
    if (!tier1) {
        filterList = mergeTerminalNodes(filterTree);
    } else if (!tier2) {
        filterList = mergeTerminalNodes(safelyGet(filterTree, tier1));
    } else if (!tier3) {
        filterList = mergeTerminalNodes(safelyGet(filterTree, tier1, tier2));
    } else if (!type) {
        filterList = mergeTerminalNodes(safelyGet(filterTree, tier1, tier2, tier3));
    } else if (!subtype) {
        filterList = mergeTerminalNodes(safelyGet(filterTree, tier1, tier2, tier3, type));
    } else {
        filterList = safelyGet(filterTree, tier1, tier2, tier3, type, subtype);
    }
    const extractUniqueBy = (name) => {
        return lodash
            .chain(filterList)
            .filter(Boolean)
            .filter((o) => Boolean(o[name]))
            .uniqBy(name)
            .value();
    };

    return [].concat(extractUniqueBy("path"), extractUniqueBy("regex"));
}

/**
 * Filter list of method configs based on model
 * @param {Object[]} methodList - Array of method configs
 * @param {Object} model - Model config for which methods should be filtered
 * @return {Object[]}
 */
export function filterMethodsByModel({ methodList, model }) {
    if (!model) return [];
    const { categories } = model;
    const filterObjects = getMethodFilterObjects({ filterTree: modelMethodMap, ...categories });
    return filterEntityList({
        entitiesOrPaths: methodList,
        filterObjects,
        multiPathSeparator: "::",
    });
}
