import { categorizedModelList, tree } from "../index";

import { 
    BaseModel,
    CategorizedBaseModel as CategorizedModel } from "@exabyte-io/code.js/dist/types";

type SimpleModel = Omit<BaseModel, "method">;

export function safelyGetSlug(slugObj: { slug: string } | string): string {
    return typeof slugObj === "string" ? slugObj : slugObj.slug;
}

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

    static convertDftToSimple(cm: CategorizedModel): SimpleModel {
        if (!cm.categories?.subtype) return this.convertUnknownToSimple();
        const { subtype } = cm.categories;

        // @ts-ignore todo: adjust ESSE schemas
        const { functional } = cm.parameters;
        return {
            type: "dft",
            subtype,
            functional: tree.treeSlugToNamedObject(functional),
        };
    }

    static convertMlToSimple(): SimpleModel {
        return {
            type: "ml",
            subtype: "re",
        };
    }

    static convertUnknownToSimple(): SimpleModel {
        return {
            type: "unknown",
            subtype: "unknown",
        };
    }

    static convertToCategorized(sm?: SimpleModel): CategorizedModel | undefined {
        switch (sm?.type) {
            case "dft":
                return this.convertDftToCategorized(sm);
            case "ml":
                return this.convertMlToCategorized();
            case "unknown":
                return undefined;
            default:
                return undefined;
        }
    }

    static convertDftToCategorized(sm: SimpleModel): CategorizedModel {
        const { subtype, functional: functionalStringOrObject } = sm;
        const defaultFunctionals = { lda: "pz", gga: "pbe", hybrid: "b3lyp" };
        let functional: string;
        if (!functionalStringOrObject) {
            functional = defaultFunctionals[subtype as keyof typeof defaultFunctionals];
        } else {
            // @ts-ignore todo: adjust ESSE schemas
            functional = safelyGetSlug(functionalStringOrObject);
        }
        const path = `/pb/qm/dft/ksdft/${subtype}?functional=${functional}`;
        // @ts-ignore todo: adjust ESSE schemas
        return categorizedModelList.find((cm) => cm.path === path);
    }

    static convertMlToCategorized(): CategorizedModel {
        // TODO: allow other ML types
        const path = "/st/det/ml/re/none";
        // @ts-ignore todo: adjust ESSE schemas
        return categorizedModelList.find((cm) => cm.path === path);
    }
}
