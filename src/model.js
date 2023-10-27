import { DefaultableInMemoryEntity } from "@exabyte-io/code.js/dist/entity";
import lodash from "lodash";

import { DFTModelConfig } from "./default_models";
import { Method } from "./method";
import { MethodFactory } from "./methods/factory";
import { MethodInterface } from "./utils/method_interface";
import { ModelInterface } from "./utils/model_interface";

export class Model extends DefaultableInMemoryEntity {
    constructor({ application, ...config }) {
        super(config);
        this._application = application;
        this._MethodFactory = MethodFactory;
        this._defaultCategorized = this.getDefaultCategorizedModel();
    }

    get type() {
        return this.prop("type", this.defaultType);
    }

    get subtype() {
        return this.prop("subtype", this.defaultSubtype);
    }

    setSubtype(subtype) {
        this.setProp("subtype", subtype);
        this.setMethod(this._MethodFactory.create(this.defaultMethodConfig));
    }

    get defaultType() {
        return this._defaultConfig.type;
    }

    get defaultSubtype() {
        return this._defaultConfig.subtype;
    }

    get groupSlug() {
        return `${this._application.shortName}:${this.type}:${this.subtype}`;
    }

    get method() {
        if (!this._method) {
            const method = this.prop("method") || this.defaultMethodConfig;
            this._method = this._MethodFactory.create(method);
        }
        return this._method;
    }

    setMethod(method) {
        this._method = method;
    }

    getCategorizedMethods() {
        const catModel = ModelInterface.convertToCategorized(this._json);
        return MethodInterface.filterCategorizedMethods({
            application: this._application,
            model: catModel,
        });
    }

    get defaultMethodConfig() {
        const [defaultCategorizedMethod] = this.getCategorizedMethods();
        return MethodInterface.convertToSimple(defaultCategorizedMethod);
    }

    /**
     * @returns {{ path: string }[]} - Array of categorized models
     */
    getCategorizedModels() {
        return ModelInterface.filterCategorizedModels(this._application);
    }

    getDefaultCategorizedModel() {
        if (this.type === "unknown") return undefined;
        return this.getCategorizedModels()[0];
    }

    static get defaultConfig() {
        return {
            ...DFTModelConfig,
            method: Method.defaultConfig,
        };
    }

    /**
     * Instance method for default config.
     * This is used to obtain default properties such as type/subtype.
     */
    get _defaultConfig() {
        // TODO: Add suitable method, given application/model
        const defaultModel = ModelInterface.convertToSimple(this._defaultCategorized);
        return {
            ...defaultModel,
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type,
            subtype: this.subtype,
            // TODO: use schema-based cleaning instead
            method: this.method.toJSONWithCleanData(),
        };
    }

    // to be used with extra properties
    // eslint-disable-next-line class-methods-use-this
    _stringToSlugifiedObject(slug) {
        return lodash.isString(slug) ? { slug } : slug;
    }

    get isUnknown() {
        return this.type === "unknown";
    }
}
