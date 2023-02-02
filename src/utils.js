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
export function buildUnitModelPath({ tier1, tier2, tier3, type, subtype, extra = {} }) {
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
export function buildModelPath(unitModels) {
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

export const NODE_DATA_SELECTORS = [
    {
        pathRegex: /^\/\w+$/,
        dataSelector: {
            key: "tier1",
            value: "data.tier1.slug",
            name: "data.tier1.name",
            type: "string",
        },
    },
    {
        pathRegex: /^(\/\w+){2}$/,
        dataSelector: {
            key: "tier2",
            value: "data.tier2.slug",
            name: "data.tier2.name",
            type: "string",
        },
    },
    {
        pathRegex: /^(\/\w+){3}$/,
        dataSelector: {
            key: "tier3",
            value: "data.tier3.slug",
            name: "data.tier3.name",
            type: "string",
        },
    },
    {
        pathRegex: /^(\/\w+){4}$/,
        dataSelector: {
            key: "type",
            value: "data.type.slug",
            name: "data.type.name",
            type: "string",
        },
    },
    {
        pathRegex: /^(\/\w+){5}$/,
        dataSelector: {
            key: "subtype",
            value: "data.subtype.slug",
            name: "data.subtype.name",
            type: "string",
        },
    },
    {
        pathRegex: /^\/pb\/qm\/dft\/ksdft(\/\w+){2}$/,
        dataSelector: {
            key: "functional",
            value: "data.functional.slug",
            name: "data.functional.name",
            type: "object",
        },
    },
];

function getDataSelector(nodePath) {
    return NODE_DATA_SELECTORS.reduce((accumulator, { pathRegex, dataSelector }) => {
        if (pathRegex.test(nodePath)) {
            Object.assign(accumulator, dataSelector);
        }
        return accumulator;
    }, {});
}

export function pickNodeData(node) {
    const dataSelector = getDataSelector(node.path);
    if (dataSelector.type === "string") {
        return {
            [dataSelector.key]: lodash.get(node, dataSelector.value),
        };
    }
    return node.data;
}
