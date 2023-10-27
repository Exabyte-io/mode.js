import {
    LegacyModelDensityFunctionalTheory,
    LegacyModelUnknown,
} from "@exabyte-io/code.js/dist/types";

export const DFTModelConfig: Omit<LegacyModelDensityFunctionalTheory, "method"> = {
    type: "dft",
    subtype: "gga",
};

export const UnknownModelConfig: Omit<LegacyModelUnknown, "method"> = {
    type: "unknown",
    subtype: "unknown",
};
