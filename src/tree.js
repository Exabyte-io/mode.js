// TODO: migrate to use manifest instead
import { MethodInterface } from "./utils/method_interface";
import { ModelInterface } from "./utils/model_interface";
import { safelyGetSlug } from "./utils/slugifiedEntry";

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

export function getAvailableDFTFunctionals() {
    const functionals = ModelInterface.filterCategorizedModels().reduce((accumulator, item) => {
        if (item.parameters?.functional) {
            accumulator.push(item.parameters.functional);
        }
        return accumulator;
    }, []);
    return [...new Set(functionals)];
}

export function getPseudopotentialTypes() {
    const subtypes = MethodInterface.filterLegacyMethods().reduce((accumulator, item) => {
        if (item.type === METHODS.pseudopotential) {
            accumulator.push(safelyGetSlug(item.subtype));
        }
        return accumulator;
    }, []);
    return [...new Set(subtypes)];
}
