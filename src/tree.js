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

/**
 * Get DFT approximations from model list.
 * @returns {string[]} - Array of DFT approximations, e.g. ['lda', 'gga']
 */
export function getDFTApproximations() {
    const approximations = ModelInterface.filterCategorizedModels().reduce((accumulator, item) => {
        if (item.categories.type === "ksdft" && item.categories.subtype) {
            accumulator.push(safelyGetSlug(item.categories.subtype));
        }
        return accumulator;
    }, []);
    return [...new Set(approximations)];
}

/**
 * Get DFT functional slugs from model list for given approximation.
 * @param {string} approximation - Approximation slug, e.g. 'lda'
 * @returns {string[]} - Array of functional slugs, e.g. ['pbe']
 */
export function getDFTFunctionalsByApproximation(approximation) {
    const functionals = ModelInterface.filterCategorizedModels().reduce((accumulator, item) => {
        // @ts-ignore todo: make sure it is dft model
        if (item.categories?.subtype === approximation && item.parameters?.functional) {
            // @ts-ignore
            accumulator.push(item.parameters.functional);
        }
        return accumulator;
    }, []);
    return [...new Set(functionals)];
}

/**
 * Get pseudopotential types from method list.
 * @return {string[]} - Array of pseudopotential types, e.g. ['us', 'nc', 'paw']
 */
export function getPseudopotentialTypes() {
    const subtypes = MethodInterface.filterLegacyMethods().reduce((accumulator, item) => {
        if (item.type === METHODS.pseudopotential) {
            accumulator.push(safelyGetSlug(item.subtype));
        }
        return accumulator;
    }, []);
    return [...new Set(subtypes)];
}
