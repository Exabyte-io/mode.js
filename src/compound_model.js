import {
    FlowchartEntityMixin,
    InMemoryEntity,
    NamedEntityMixin,
} from "@exabyte-io/code.js/dist/entity";
import { setNextLinks, setUnitsHead } from "@exabyte-io/code.js/dist/utils";
import lodash from "lodash";
import { mix } from "mixwith";

import MODEL_TREE from "../model_tree";
import { MethodFactory } from "./methods/factory";
import { getDefaultModelConfig } from "./tree";
import { UnitModel } from "./unit_model";
import { UnitModelFactory } from "./unit_model_factory";
import { buildModelPath } from "./utils";

export class Model extends mix(InMemoryEntity).with(NamedEntityMixin, FlowchartEntityMixin) {
    static UnitModelFactory = UnitModelFactory;

    static MethodFactory = MethodFactory;

    static UnitModelCls = UnitModel;

    constructor({ ...config } = {}) {
        super(config);
        this._units = Model.instantiateUnits(config.units);

        // in order to support the old config using `method` attribute
        if (!lodash.isEmpty(config.method) && this.units.length) {
            const methodInstance = this.constructor.MethodFactory.create(config.method);
            this.setMethod(methodInstance);
        }
    }

    get modelPath() {
        return this.prop("modelPath");
    }

    get graph() {
        return this.prop("graph");
    }

    static instantiateUnits(unitConfigs) {
        if (!Array.isArray(unitConfigs) || !unitConfigs) return [];
        const units = unitConfigs.map((config) => Model.UnitModelFactory.create(config));
        return setNextLinks(setUnitsHead(units));
    }

    buildModelPath() {
        return buildModelPath(this.units);
    }

    buildGraph() {
        return this.units.map((um) => ({
            name: um.name,
            head: um.head,
            flowchartId: um.flowchartId,
            ...(um.next ? { next: um.next } : {}),
            ...(um.workflowUnitId ? { workflowUnitId: um.workflowUnitId } : {}),
        }));
    }

    get methods() {
        return this.units.map((unit) => unit.method);
    }

    get Methods() {
        return this.units.map((unit) => unit.Method);
    }

    /**
     * Legacy function to support `model.method` getter.
     * @todo remove this function
     * @returns {Method}
     */
    get method() {
        const [firstUnit] = this.units;
        return firstUnit ? firstUnit?.Method : {};
    }

    /**
     * Legacy setter to support `model.method` setter.
     * @todo remove this function
     * @param {Method} method - Method instance
     */
    set method(method) {
        const [firstUnit] = this.units;
        if (firstUnit) {
            firstUnit.Method = method;
        }
    }

    /**
     * Legacy function to support `model.setMethod` calls.
     * @todo remove this function
     * @param {Method} method - Method instance
     */
    setMethod(method) {
        this.method = method;
    }

    /**
     * Legacy function to support `model.isUnknown`.
     * @returns {Boolean}
     */
    get isUnknown() {
        return !this.units.length || this.units.every((u) => u.type === "unknown");
    }

    /**
     * Group slugs are used in the MaterialsExplorerData to show columns with model data.
     * The model data is not taken directly from the model or method, but encoded in the group slug string and accessed
     * via the property object.
     *
     * @summary Concatenate group slugs of units.
     * @param {Object|Application} application - Application config or instance.
     * @returns {string}
     */
    buildGroupSlug(application) {
        return this.units.map((unit) => unit.buildGroupSlug(application)).join("#");
    }

    static get defaultConfig() {
        return getDefaultModelConfig({ tree: MODEL_TREE });
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            graph: this.graph,
            units: this.units.map((u) => u.toJSON()),
            modelPath: buildModelPath(this.units),
        };
    }
}
