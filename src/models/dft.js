import { UnitModel } from "../unit_model";

export class DFTModel extends UnitModel {
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

    get _extraSlugContent() {
        return [this.functional];
    }

    toJSON() {
        return {
            ...super.toJSON(),
            functional: this.functional,
        };
    }
}
