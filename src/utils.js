import lodash from "lodash";
import path from "path";

export const REGEX_UNIT_MODEL = {
    unitModel: /^um:(?<path>(\/\w+){3,5})(?<query>\?(\w+=\w+&?)*)?$/,
};

/**
 * Build unit model path based on categories.
 * @param {string} tier1 - Tier 1 slug
 * @param {string} tier2 - Tier 2 slug
 * @param {string} tier3 - Tier 3 slug
 * @param {string} type - Type slug
 * @param {string} subtype - Subtype slug
 * @param {Object} extra - Extra parameters
 * @returns {string}
 */
export function generateUnitModelPath({ tier1, tier2, tier3, type, subtype, extra = {} }) {
    const extraAttributes = new URLSearchParams(extra).toString();
    const pathElements = [tier1, tier2, tier3, type, subtype].filter(Boolean);
    let modelPath = path.join(...pathElements);
    modelPath = `um:/${modelPath}`;
    if (!lodash.isEmpty(extra)) {
        modelPath = `${modelPath}?${extraAttributes}`;
    }
    return modelPath;
}

export function basename(unitModelPath) {
    const splitPath = unitModelPath.split("?")[0];
    return path.basename(splitPath);
}

/**
 * Build model path based on unit models.
 * @param {UnitModel[]} unitModels - Array of unit models
 * @returns {string}
 * @todo Add functionality for measuring "distances" between unit models.
 */
export function generateModelPath(unitModels) {
    if (!unitModels.length) {
        return "";
    }
    const [first, ...tail] = unitModels;
    let modelPath = `m:${first.modelPath}`;
    if (tail.length > 0) {
        const slugs = tail.map((um) => basename(um.modelPath)).join(",");
        modelPath = `${modelPath}&slugs=[${slugs}]`;
    }
    return modelPath;
}
