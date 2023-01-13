import { FlowchartItemMixin, InMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { mix } from "mixwith";

import { MethodFactory } from "./methods/factory";
import { buildUnitModelPath } from "./utils";

export class UnitModel extends mix(InMemoryEntity).with(FlowchartItemMixin) {
    static MethodFactory = MethodFactory;

    get tier1() {
        return this.prop("tier1");
    }

    get tier2() {
        return this.prop("tier2");
    }

    get tier3() {
        return this.prop("tier3");
    }

    get type() {
        return this.prop("type");
    }

    get subtype() {
        return this.prop("subtype");
    }

    /**
     *  Returns instance of a Method class.
     */
    get Method() {
        if (!this._method) {
            const methodConfig = this.prop("method");
            this._method = this.constructor.MethodFactory.create(methodConfig);
        }
        return this._method;
    }

    set Method(method) {
        this._method = method;
    }

    get method() {
        return this.prop("method");
    }

    get references() {
        return this.prop("references");
    }

    get tags() {
        return this.prop("tags");
    }

    // eslint-disable-next-line class-methods-use-this
    _extraPropsForModelPath() {
        return {}; // overwrite in derived classes
    }

    get modelPath() {
        const { tier1, tier2, tier3, type } = this;
        return buildUnitModelPath({
            tier1,
            tier2,
            tier3,
            type,
            ...(this.subtype ? { subtype: this.subtype } : {}),
            extra: this._extraPropsForModelPath(),
        });
    }

    /**
     *  Create group slug
     */
    buildGroupSlug(application) {
        let groupSlug = `${application.shortName}:${this.type}`;
        if (this.subtype) {
            groupSlug = `${groupSlug}:${this.subtype}`;
        }
        return groupSlug;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type,
            subtype: this.subtype,
            method: this.method.toJSON(),
        };
    }
}
