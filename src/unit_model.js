import { InMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import { getUUID } from "@exabyte-io/code.js/dist/utils";

import { MethodFactory } from "./methods/factory";

export class UnitModel extends InMemoryEntity {
    constructor({ application, ...config }) {
        super(config);
        this._application = application;
        this._MethodFactory = MethodFactory;
    }

    get name() {
        return this.prop("name");
    }

    get slug() {
        return this.prop("slug");
    }

    get type() {
        return this.prop("type");
    }

    get subtype() {
        return this.prop("subtype");
    }

    get method() {
        if (!this._method) {
            const methodConfig = this.prop("method") || this.defaultMethodConfig;
            this._method = this._MethodFactory.create(methodConfig);
        }
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    get flowchartId() {
        return this.prop("flowchartId");
    }

    static defaultFlowchartId() {
        return getUUID();
    }

    get reference() {
        return this.prop("reference");
    }

    get tags() {
        return this.prop("tags");
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
