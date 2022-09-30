import { DFTModel } from "./models/dft";
import { getDefaultModelTypeForApplication } from "./tree";
import { UnitModel } from "./unit_model";

export class UnitModelFactory {
    static DFTModel = DFTModel;

    static UnitModel = UnitModel;

    static create(config) {
        switch (config.type) {
            case "ksdft":
                return new this.DFTModel(config);
            default:
                return new this.UnitModel(config);
        }
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
