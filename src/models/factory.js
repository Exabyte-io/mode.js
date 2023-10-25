import { filterModelsByApplicationParameters } from "@exabyte-io/application-flavors.js/lib/js/models";

import { allModels as categorizedModelList } from "../data/model_list";
import { Model } from "../model";
import { ModelInterface } from "../utils/model_interface";
import { DFTModel } from "./dft";

export class ModelFactory {
    static DFTModel = DFTModel;

    static Model = Model;

    static create(config) {
        switch (config.type) {
            case "dft":
                return new this.DFTModel(config);
            default:
                return new this.Model(config);
        }
    }

    static getDefaultModelForApplication(application) {
        if (!application) return categorizedModelList[0];
        const filteredModels = filterModelsByApplicationParameters({
            modelList: categorizedModelList,
            appName: application?.name,
            version: application?.version,
            build: application?.build,
        });
        return ModelInterface.convertToSimple(filteredModels[0]);
    }

    static createFromApplication(config) {
        const { application } = config;
        const defaultModel = this.getDefaultModelForApplication(application);
        return this.create({ ...config, ...defaultModel });
    }
}
