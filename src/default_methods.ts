import {
    LegacyMethodLocalorbital,
    LegacyMethodPseudopotential,
    LegacyMethodUnknown,
} from "@exabyte-io/code.js/dist/types";

export const PseudopotentialMethodConfig: LegacyMethodPseudopotential = {
    type: "pseudopotential",
    subtype: "us",
};

export const LocalOrbitalMethodConfig: LegacyMethodLocalorbital = {
    type: "localorbital",
    subtype: "pople",
};

export const UnknownMethodConfig: LegacyMethodUnknown = {
    type: "unknown",
    subtype: "unknown",
};
