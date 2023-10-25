import { filterEntityList } from "@exabyte-io/code.js/dist/utils";

import { MethodFactory } from "../methods/factory";
import { Model } from "../model";
import { safelyGetSlug, stringToSlugifiedEntry } from "../utils/slugifiedEntry";

export class DFTModel extends Model {
    constructor(config) {
        super(config);
        this._MethodFactory = config.MethodFactory || MethodFactory;
    }

    /**
     * @summary Build slug string based on model information
     * @returns {string}
     */
    get groupSlug() {
        return [
            this._application.shortName,
            this.type,
            this.subtype,
            this.functional.slug,
            this.refiners.map((o) => o.slug).join("+"),
            this.modifiers.map((o) => o.slug).join("+"),
        ]
            .join(":")
            .replace("::", ":")
            .replace(/:$/, "");
    }

    get defaultFunctional() {
        const functional = safelyGetSlug(this.defaultConfig?.functional) || "pbe";
        return stringToSlugifiedEntry(functional);
    }

    // eslint-disable-next-line class-methods-use-this
    get defaultRefiners() {
        return [];
    }

    // eslint-disable-next-line class-methods-use-this
    get defaultModifiers() {
        return [];
    }

    get functional() {
        return this.prop("functional", this.defaultFunctional);
    }

    get refiners() {
        return this.prop("refiners", this.defaultRefiners);
    }

    get modifiers() {
        return this.prop("modifiers", this.defaultModifiers);
    }

    getDefaultCategorizedModel() {
        const subtype = this.subtype || "gga";
        const filterObj = {
            regex: "\\/pb\\/qm\\/dft\\/ksdft\\/" + subtype + "\\?functional=([A-Za-z0-9_-]+)",
        };
        const filtered = filterEntityList({
            entitiesOrPaths: this.getCategorizedModels(),
            filterObjects: [filterObj],
        });
        return filtered[0];
    }

    setSubtype(subtype) {
        this.setProp("subtype", subtype);
        this.setFunctional(this.defaultFunctional);
    }

    setFunctional(functional) {
        this.setProp("functional", stringToSlugifiedEntry(functional));
        this.setMethod(this._MethodFactory.create(this.defaultMethodConfig));
    }

    _setArrayProp(name, data) {
        // eslint-disable-next-line no-param-reassign, no-undef
        data = safeMakeArray(data).map((r) => stringToSlugifiedEntry(r));
        this.setProp(name, data);
        this[`_${name}`] = data;
    }

    setRefiners(refiners) {
        this._setArrayProp("refiners", refiners);
    }

    setModifiers(modifiers) {
        this._setArrayProp("modifiers", modifiers);
    }

    toJSON() {
        const functional = safelyGetSlug(this.functional);
        return {
            ...super.toJSON(),
            functional,
            refiners: this.refiners,
            modifiers: this.modifiers,
        };
    }
}
