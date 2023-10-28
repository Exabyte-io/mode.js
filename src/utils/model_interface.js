import { filterModelsByApplicationParameters } from "@exabyte-io/application-flavors.js/lib/js/models";

import { allModels as categorizedModelList } from "../data/model_list";
import { safelyGetSlug, stringToSlugifiedEntry } from "./slugifiedEntry";

/**
 * The model interface converts between the legacy model data structure (type, subtype, functional)
 * and the categorized model data structure (tier1, tier2, ...).
 */
export class ModelInterface {
    static convertToSimple(cm) {
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

    static functionalsPerSubtype(subtype) {
        return categorizedModelList.reduce((accumulator, item) => {
            if (item.categories?.subtype === subtype && item.parameters.functional) {
                accumulator.push(item.parameters.functional);
            }
            return accumulator;
        }, []);
    }

    static convertDftToSimple(cm) {
        if (!cm.categories?.subtype) return this.convertUnknownToSimple();
        const { subtype } = cm.categories;
        const functional = cm.parameters?.functional;
        return {
            type: "dft",
            subtype,
            functional: stringToSlugifiedEntry(functional),
        };
    }

    static convertMlToSimple() {
        return {
            type: "ml",
            subtype: "re",
        };
    }

    static convertUnknownToSimple() {
        return {
            type: "unknown",
            subtype: "unknown",
        };
    }

    static convertToCategorized(sm) {
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

    static convertDftToCategorized(sm) {
        const { subtype, functional: functionalStringOrObject } = sm;
        let functional;
        if (!functionalStringOrObject) {
            [functional] = this.functionalsPerSubtype(subtype);
        } else {
            functional = safelyGetSlug(functionalStringOrObject);
        }
        // TODO: cover other parameter combinations, e.g. functional + spin-orbit
        const path = `/pb/qm/dft/ksdft/${subtype}?functional=${functional}`;
        return categorizedModelList.find((cm) => cm.path === path);
    }

    static convertMlToCategorized() {
        // TODO: allow other ML types
        const path = "/st/det/ml/re/none";
        return categorizedModelList.find((cm) => cm.path === path);
    }

    static filterCategorizedModels(application) {
        if (!application) return categorizedModelList;
        const filteredModels = filterModelsByApplicationParameters({
            modelList: categorizedModelList,
            appName: application?.name,
            version: application?.version,
            build: application?.build,
        });

        return filteredModels;
    }
}
