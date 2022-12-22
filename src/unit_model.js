import { InMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { getUUID } from "@exabyte-io/code.js/dist/utils";

import { MethodFactory } from "./methods/factory";
import { buildUnitModelPath } from "./utils";

export class UnitModel extends InMemoryEntity {
    static MethodFactory = MethodFactory;

    constructor({ application, ...config }) {
        const defaults = { flowchartId: UnitModel.defaultFlowchartId() };
        super({ ...defaults, ...config });
    }

    get categories() {
        return this.prop("categories");
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
    get method() {
        if (!this._method) {
            const methodConfig = this.prop("method");
            this._method = this.constructor.MethodFactory.create(methodConfig);
        }
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    get methodConfig() {
        return this.prop("method");
    }

    get flowchartId() {
        return this.prop("flowchartId");
    }

    static defaultFlowchartId() {
        return getUUID();
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
        const { tier1, tier2, tier3 } = this.categories;
        return buildUnitModelPath({
            tier1,
            tier2,
            tier3,
            type: this.type,
            ...(this.subtype ? { subtype: this.subtype } : {}),
            extra: this._extraPropsForModelPath(),
        });
    }

    /**
     *  Create group slug (used in `property.save()`)
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
