import { UnitModel } from "../unit_model";

export class DFTModel extends UnitModel {
    /**
     * @summary Build slug string based on model information
     * @returns {string}
     */
    buildGroupSlug(application) {
        return [application.shortName, this.type, this.subtype, this.functional]
            .join(":")
            .replace("::", ":")
            .replace(/:$/, "");
    }

    get functional() {
        return this.prop("functional");
    }

    set functional(functionalSlug) {
        this.setProp("functional", functionalSlug);
    }

    setFunctional(functionalSlug) {
        this.functional = functionalSlug;
        // TODO: reactivate once new tree is finalized
        // this.setMethod(this._MethodFactory.create(this.defaultMethodConfig));
    }

    toJSON() {
        return {
            ...super.toJSON(),
            functional: this.functional,
        };
    }
}
