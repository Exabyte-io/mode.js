import { MethodFactory } from "../methods/factory";
import { UnitModel } from "../unit_model";
import { Functional } from "./dft/functional";
import { FUNCTIONALS } from "./dft/functional_lookup_table";

export class DFTModel extends UnitModel {
    constructor(config) {
        super(config);
        this._MethodFactory = config.MethodFactory || MethodFactory;
        this._functional = Functional.create({ slug: config.functional });
    }

    /**
     * @summary Build slug string based on model information
     * @returns {string}
     */
    get groupSlug() {
        return [this._application.shortName, this.type, this.subtype, this.functional]
            .join(":")
            .replace("::", ":")
            .replace(/:$/, "");
    }

    get functional() {
        return this.prop("functional");
    }

    set functional(functionalSlug) {
        this.setProp("functional", functionalSlug);
        this._functional.slug = functionalSlug;
    }

    defaultFunctional() {
        // TODO: get from tree once new tree is finalized
        return this.allFunctionals[0];
    }

    setSubtype(subtype) {
        this.setProp("subtype", subtype);
        this.setFunctional(this.defaultFunctional);
        return this;
    }

    setFunctional(functionalSlug) {
        this.functional = functionalSlug;

        // TODO: reactivate once new tree is finalized
        // this.setMethod(this._MethodFactory.create(this.defaultMethodConfig));
        return this;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            functional: this._functional.slug,
        };
    }

    /**
     * Get all functionals slugs for the current model subtype (lda, gga, ...)
     * @returns {string[]} - List of functional slugs
     */
    get allFunctionals() {
        return Object.keys(FUNCTIONALS[this.subtype]);
    }

    get hasCustomFunctional() {
        return this._functional.isCustom;
    }

    get hasRangeSeparation() {
        return this._functional.hasRangeSeparation;
    }

    get hasNonLocalCorrelation() {
        return this._functional.hasNonLocalCorrelation;
    }
}
