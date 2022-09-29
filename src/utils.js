import path from "path";

export const REGEX = {
    unitModel: /^um:(?<path>(\/\w+){3,5})(?<query>\?(\w+=\w+&?){0,})$/,
};

export function buildUnitModelPath({ tier1, tier2, tier3, type, subtype, extra = {} }) {
    const extraAttributes = new URLSearchParams(extra).toString();
    const pathElements = [tier1, tier2, tier3, type, subtype].filter((e) => e);
    const modelPath = path.join(...pathElements);
    return `um:/${modelPath}?${extraAttributes}`;
}

export function basename(unitModelPath) {
    const splitPath = unitModelPath.split("?")[0];
    return path.basename(splitPath);
}

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
