// import { BaseModel, CategorizedModel } from "@exabyte-io/code.js/dist/types";
import {
    BaseModel,
    CategorizedModel,
    LegacyModelDensityFunctionalTheory,
    LegacyModelRegression,
    LegacyModelUnknown,
    ModelGeneralizedGradientApproximation,
    ModelHybridFunctional,
    ModelLocalDensityApproximation,
    ModelRegression,
} from "@exabyte-io/code.js/dist/types";

import { allModels as categorizedModelList } from "../data/model_list";
import { safelyGetSlug, stringToSlugifiedEntry } from "./slugifiedEntry";

type SimpleModel = Omit<BaseModel, "method">;
type CategorizedDftModel =
    | Omit<ModelLocalDensityApproximation, "method">
    | Omit<ModelGeneralizedGradientApproximation, "method">
    | Omit<ModelHybridFunctional, "method">;

/**
 * The model interface converts between the legacy model data structure (type, subtype, functional)
 * and the categorized model data structure (tier1, tier2, ...).
 */
export class ModelInterface {
    static convertToSimple(cm?: CategorizedModel): SimpleModel {
        if (!cm) return this.convertUnknownToSimple();

        switch (cm.categories.tier3) {
            case "dft":
                return this.convertDftToSimple(cm);
            case "ml":
                return this.convertMlToSimple();
            default:
                return this.convertUnknownToSimple();
        }
    }

    private static functionalsPerSubtype(subtype: string): string[] {
        return categorizedModelList.reduce<string[]>((accumulator, item) => {
            if (item.categories?.subtype === subtype && item.parameters.functional) {
                accumulator.push(item.parameters.functional);
            }
            return accumulator;
        }, []);
    }

    static convertDftToSimple(
        cm: CategorizedDftModel,
    ): Omit<LegacyModelDensityFunctionalTheory, "method"> {
        if (!cm.categories?.subtype) return this.convertUnknownToSimple();
        const { subtype } = cm.categories;
        const functional = cm.parameters?.functional;
        return {
            type: "dft",
            subtype,
            // @ts-ignore todo: cover undefined functional case
            functional: stringToSlugifiedEntry(functional),
        };
    }

    static convertMlToSimple(): Omit<LegacyModelRegression, "method"> {
        return {
            type: "ml",
            subtype: "re",
        };
    }

    static convertUnknownToSimple(): Omit<LegacyModelUnknown, "method"> {
        return {
            type: "unknown",
            subtype: "unknown",
        };
    }

    static convertToCategorized(sm?: SimpleModel): Omit<CategorizedModel, "method"> | undefined {
        switch (sm?.type) {
            case "dft":
                return this.convertDftToCategorized(sm as LegacyModelDensityFunctionalTheory);
            case "ml":
                return this.convertMlToCategorized();
            case "unknown":
                return undefined;
            default:
                return undefined;
        }
    }

    static convertDftToCategorized(sm: LegacyModelDensityFunctionalTheory): CategorizedDftModel {
        const { subtype, functional: functionalStringOrObject } = sm;
        let functional: string;
        if (!functionalStringOrObject) {
            [functional] = this.functionalsPerSubtype(subtype);
        } else {
            functional = safelyGetSlug(functionalStringOrObject);
        }
        // TODO: cover other parameter combinations, e.g. functional + spin-orbit
        const path = `/pb/qm/dft/ksdft/${subtype}?functional=${functional}`;
        return categorizedModelList.find((cm) => cm.path === path) as CategorizedDftModel;
    }

    static convertMlToCategorized(): Omit<ModelRegression, "method"> {
        // TODO: allow other ML types
        const path = "/st/det/ml/re/none";
        // @ts-ignore todo: adjust ESSE schemas
        return categorizedModelList.find((cm) => cm.path === path);
    }
}
