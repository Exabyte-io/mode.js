import { filterMethodsByApplicationParameters } from "@exabyte-io/application-flavors.js/lib/js/methods";

import { allMethods as categorizedMethodList } from "../data/method_list";
import { LocalOrbitalMethodConfig, UnknownMethodConfig } from "../default_methods";
import { filterMethodsByModel } from "../filter";
import { safelyGetSlug } from "./slugifiedEntry";

/**
 * The method interface converts between the legacy method data structure (type, subtype)
 * and the categorized method data structure (units with tier1, tier2, ...).
 */
export class MethodInterface {
    static convertToSimple(cm) {
        if (!cm) return this.convertUnknownToSimple();
        const pspUnits = cm.units.filter((u) => u.categories.type === "psp");
        const aoUnit = cm.units.find((u) => u.categories.type === "ao");
        const reUnit = cm.units.find((u) => u.name && u.name.includes("regression"));
        if (pspUnits.length) return this.convertPspUnitsToSimple(pspUnits);
        if (aoUnit) return this.convertAoUnitToSimple();
        if (reUnit) return this.convertRegressionUnitToSimple(reUnit);
        return this.convertRegressionUnitToSimple(reUnit);
    }

    static convertUnknownToSimple() {
        return UnknownMethodConfig;
    }

    static convertPspUnitsToSimple(cm) {
        const [firstUnit, ...otherUnits] = cm;
        if (!firstUnit || !firstUnit.categories?.subtype) return this.convertUnknownToSimple();
        const subtype = otherUnits?.length ? "any" : firstUnit.categories.subtype;
        return {
            type: "pseudopotential",
            subtype,
        };
    }

    static convertAoUnitToSimple() {
        return LocalOrbitalMethodConfig;
    }

    static convertRegressionUnitToSimple(cm) {
        const type = cm.categories.type || "linear";
        const subtype = cm.categories.subtype || "least_squares";
        return {
            type: safelyGetSlug(type),
            subtype: safelyGetSlug(subtype),
            data: cm.data,
            precision: cm.precision,
        };
    }

    static convertToCategorized(sm) {
        switch (sm?.type) {
            case "pseudopotential":
                return this.convertPspToCategorized(sm);
            case "localorbital":
                return this.convertAoToCategorized();
            case "linear":
                return this.convertRegressionToCategorized(sm);
            case "kernel_ridge":
                return this.convertRegressionToCategorized(sm);
            default:
                return undefined;
        }
    }

    static convertPspToCategorized(sm) {
        // TODO: support other PSP methods, e.g. PSP + conjugate gradient
        const subtype = safelyGetSlug(sm.subtype);
        // the "any" subtype is equivalent to the method representing all planewave-pseudopotential
        // methods. All other subtypes are equivalent to using a specific PW-PSP method.
        const path =
            subtype === "any"
                ? "/qm/wf/none/psp/us::/qm/wf/none/psp/nc::/qm/wf/none/psp/paw::/qm/wf/none/pw/none"
                : `/qm/wf/none/smearing/gaussian::/linalg/diag/none/davidson/none::/qm/wf/none/psp/${subtype}::/qm/wf/none/pw/none`;

        return categorizedMethodList.find((catMethod) => {
            return catMethod.path === path;
        });
    }

    static convertAoToCategorized() {
        // TODO: support other localorbital methods
        const path = "/qm/wf/none/ao/pople?basisSlug=6-31G";
        return categorizedMethodList.find((cm) => cm.path === path);
    }

    static convertRegressionToCategorized(sm) {
        const type = safelyGetSlug(sm.type);
        const subtype = safelyGetSlug(sm.subtype);
        const { precision, data } = sm;
        const path = `/none/none/none/${type}/${subtype}`;
        const method = categorizedMethodList.find((cm) => cm.path === path);
        Object.assign(method.units[0], { precision, data });
        return method;
    }

    /**
     * Filter categorized methods by application and model (if applicable).
     * @params {object} params
     * @params {CategorizedModel | undefined} params.model - Categorized model
     * @params {Application | undefined} application - Application
     * @returns {import("@exabyte-io/code.js/dist/types").CategorizedMethod} - Array of categorized methods
     */
    static filterCategorizedMethods(params) {
        let filteredMethods = categorizedMethodList;
        if (!params) return filteredMethods;
        const { model, application } = params;
        if (model) {
            filteredMethods = filterMethodsByModel({
                methodList: filteredMethods,
                model,
            });
        }
        if (application) {
            filteredMethods = filterMethodsByApplicationParameters({
                methodList: filteredMethods,
                appName: application?.name,
                version: application?.version,
                build: application?.build,
            });
        }
        return filteredMethods;
    }

    /**
     * Filter legacy methods by application and model (if applicable).
     * @params {object} params
     * @params {CategorizedModel | undefined} params.model - Categorized model
     * @params {Application | undefined} application - Application
     * @returns {import("@exabyte-io/code.js/dist/types").BaseMethod} - Array of legacy methods
     */
    static filterLegacyMethods(params) {
        const _params = params || {};
        const categorizedMethods = this.filterCategorizedMethods(_params);
        return categorizedMethods.map((cm) => this.convertToSimple(cm));
    }
}
