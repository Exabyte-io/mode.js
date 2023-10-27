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

export function getDFTApproximations(): string[] {
    const approximations = ModelInterface.filterCategorizedModels().reduce<string[]>(
        (accumulator, item) => {
            if (item.categories.type === "ksdft" && item.categories.subtype) {
                accumulator.push(safelyGetSlug(item.categories.subtype));
            }
            return accumulator;
        },
        [],
    );
    return [...new Set(approximations)];
}

export function getDFTFunctionalsByApproximation(approximation: string): string[] {
    const functionals = ModelInterface.filterCategorizedModels().reduce<string[]>(
        (accumulator, item) => {
            // @ts-ignore todo: make sure it is dft model
            if (item.categories?.subtype === approximation && item.parameters?.functional) {
                // @ts-ignore
                accumulator.push(item.parameters.functional);
            }
            return accumulator;
        },
        [],
    );
    return [...new Set(functionals)];
}

export function getPseudopotentialTypes(): string[] {
    const subtypes = MethodInterface.filterLegacyMethods().reduce<string[]>((accumulator, item) => {
        if (item.type === METHODS.pseudopotential) {
            accumulator.push(safelyGetSlug(item.subtype));
        }
        return accumulator;
    }, []);
    return [...new Set(subtypes)];
}
