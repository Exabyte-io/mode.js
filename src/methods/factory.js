import { Method } from "../method";
import { PseudopotentialMethod } from "./pseudopotential";

export class MethodFactory {
    static Method = Method;

    static PseudopotentialMethod = PseudopotentialMethod;

    static create(config) {
        let method;
        switch (config.type) {
            case "pseudopotential":
                method = new this.PseudopotentialMethod(config);
                break;
            default:
                method = new this.Method(config);
                break;
        }
        method.initializeData(config);
        return method;
    }
}
