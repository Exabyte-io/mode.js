import { filterMethodsByApplicationParameters } from "@exabyte-io/application-flavors.js/lib/js/methods";
import {
    ApplicationSchemaBase,
    BaseMethod,
    CategorizedMethod,
    CategorizedModel,
    LegacyMethodLocalorbital,
    LegacyMethodPseudopotential,
    LegacyMethodRegression,
    LegacyMethodUnknown,
    UnitMethodPseudopotential,
    UnitMethodRegression,
} from "@exabyte-io/code.js/dist/types";

import { allMethods as categorizedMethodList } from "../data/method_list";
import { LocalOrbitalMethodConfig, UnknownMethodConfig } from "../default_methods";
import { filterMethodsByModel } from "../filter";
import { safelyGetSlug } from "./slugifiedEntry";

/**
 * The method interface converts between the legacy method data structure (type, subtype)
 * and the categorized method data structure (units with tier1, tier2, ...).
 */
export class MethodInterface {
    static convertToSimple(cm: CategorizedMethod | undefined): BaseMethod {
        if (!cm) return this.convertUnknownToSimple();
        const pspUnits = cm.units.filter((u) => u.categories.type === "psp");
        const aoUnit = cm.units.find((u) => u.categories.type === "ao");
        const reUnit = cm.units.find(
            (u) => u.name && u.name.includes("regression"),
        ) as UnitMethodRegression;
        if (pspUnits.length) return this.convertPspUnitsToSimple(pspUnits);
        if (aoUnit) return this.convertAoUnitToSimple();
        if (reUnit) return this.convertRegressionUnitToSimple(reUnit);
        return this.convertRegressionUnitToSimple(reUnit);
    }

    static convertUnknownToSimple(): LegacyMethodUnknown {
        // @ts-ignore todo: move default_methods to TS
        return UnknownMethodConfig;
    }

    static convertPspUnitsToSimple(
        cm: UnitMethodPseudopotential[],
    ): LegacyMethodUnknown | LegacyMethodPseudopotential {
        const [firstUnit, ...otherUnits] = cm;
        if (!firstUnit || !firstUnit.categories?.subtype) return this.convertUnknownToSimple();
        const subtype = otherUnits?.length ? "any" : firstUnit.categories.subtype;
        return {
            type: "pseudopotential",
            subtype,
        } as LegacyMethodPseudopotential;
    }

    static convertAoUnitToSimple(): LegacyMethodLocalorbital {
        // @ts-ignore todo: move default_methods to TS
        return LocalOrbitalMethodConfig;
    }

    static convertRegressionUnitToSimple(cm: UnitMethodRegression): LegacyMethodRegression {
        const type = cm.categories.type || "linear";
        const subtype = cm.categories.subtype || "least_squares";
        return {
            type: safelyGetSlug(type) as "linear" | "kernel_ridge",
            subtype: safelyGetSlug(subtype) as "least_squares" | "ridge",
            data: cm.data,
            precision: cm.precision,
        };
    }

    static convertToCategorized(sm?: BaseMethod): CategorizedMethod | undefined {
        switch (sm?.type) {
            case "pseudopotential":
                return this.convertPspToCategorized(sm as LegacyMethodPseudopotential);
            case "localorbital":
                return this.convertAoToCategorized();
            case "linear":
                return this.convertRegressionToCategorized(sm as LegacyMethodRegression);
            case "kernel_ridge":
                return this.convertRegressionToCategorized(sm as LegacyMethodRegression);
            default:
                return undefined;
        }
    }

    static convertPspToCategorized(sm: LegacyMethodPseudopotential): CategorizedMethod {
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
        }) as CategorizedMethod;
    }

    static convertAoToCategorized(): CategorizedMethod {
        // TODO: support other localorbital methods
        const path = "/qm/wf/none/ao/pople?basisSlug=6-31G";
        return categorizedMethodList.find((cm) => cm.path === path) as CategorizedMethod;
    }

    static convertRegressionToCategorized(sm: LegacyMethodRegression): CategorizedMethod {
        const type = safelyGetSlug(sm.type);
        const subtype = safelyGetSlug(sm.subtype);
        const { precision, data } = sm;
        const path = `/none/none/none/${type}/${subtype}`;
        const method = categorizedMethodList.find((cm) => cm.path === path) as CategorizedMethod;
        Object.assign(method.units[0], { precision, data });
        return method;
    }

    static filterCategorizedMethods({
        model,
        application,
    }: {
        model?: CategorizedModel;
        application?: ApplicationSchemaBase;
    }): CategorizedMethod[] {
        let filteredMethods = categorizedMethodList;
        if (model) {
            // @ts-ignore todo: sort out types of filter function
            filteredMethods = filterMethodsByModel({
                // @ts-ignore
                methodList: filteredMethods,
                model,
            });
        }
        if (application) {
            // @ts-ignore todo: sort out types of filter function
            filteredMethods = filterMethodsByApplicationParameters({
                methodList: filteredMethods,
                appName: application?.name,
                version: application?.version,
                build: application?.build,
            });
        }
        return filteredMethods;
    }

    static filterLegacyMethods({
        model,
        application,
    }: {
        model?: CategorizedModel;
        application?: ApplicationSchemaBase;
    }): BaseMethod[] {
        const categorizedMethods = this.filterCategorizedMethods({ application, model });
        return categorizedMethods.map((cm) => this.convertToSimple(cm));
    }
}
