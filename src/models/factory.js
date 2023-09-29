import omit from "lodash/omit";

import { Model } from "../model";
import { getDefaultModelTypeForApplication } from "../tree";
import { DFTModel } from "./dft";

export class ModelFactory {
    static DFTModel = DFTModel;

    static Model = Model;

    static create(config) {
        let model;
        switch (config.type) {
            case "dft":
                model = new this.DFTModel(config);
                break;
            default:
                model = new this.Model(config);
                break;
        }
        const methodConfig = config.method || model.defaultMethodConfig;
        const method = model._MethodFactory.create({
            ...methodConfig,
            ...omit(config, ["type", "subtype"]),
        });
        model.setMethod(method);
        return model;
    }

    static createFromApplication(config) {
        const { application } = config;
        const type = application && getDefaultModelTypeForApplication(application);
        if (!type)
            throw new Error(
                `ModelFactory.createFromApplication: cannot determine model type: ${type}`,
            );
        return this.create({ ...config, type });
    }
}
