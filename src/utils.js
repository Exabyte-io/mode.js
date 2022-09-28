import path from "path";

export function buildUnitModelPath({ tier1, tier2, tier3, type, subtype, extra = {} }) {
    const extraAttributes = new URLSearchParams(extra).toString();
    const modelPath = path.join(tier1, tier2, tier3, type, subtype);
    return `um:/${modelPath}?${extraAttributes}`;
}

export function basename(unitModelPath) {
    const splitPath = unitModelPath.split("?")[0];
    return path.basename(splitPath);
}

export function buildModelPath(unitModels) {
    const [first, ...tail] = unitModels;
    let modelPath = `m:${first.modelPath}`;
    if (tail.length > 0) {
        const slugs = tail.map((um) => basename(um.modelPath)).join(",");
        modelPath = `${modelPath}&slugs=[${slugs}]`;
    }
    return modelPath;
}
