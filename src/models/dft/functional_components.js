/**
 *  Enum for functional component types
 */
export const FC_TYPES = {
    exchange: "exchange",
    correlation: "correlation",
    nonLocalCorrelation: "non-local correlation",
};

/**
 * List of functional components
 * @todo refactor to object of objects with slugs as keys.
 */
export const FUNCTIONAL_COMPONENTS = {
    lda: [
        {
            name: "Slater",
            slug: "slater",
            type: FC_TYPES.exchange,
        },
        {
            name: "Perdew-Zunger 1981",
            slug: "pz81",
            type: FC_TYPES.correlation,
        },
        {
            name: "Perdew-Wang 1992",
            slug: "pw92",
            type: FC_TYPES.correlation,
        },
        {
            name: "PW92RPA",
            slug: "pw92rpa",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN1RPA",
            slug: "vwn1rpa",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN1",
            slug: "vwn1",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN2",
            slug: "vwn2",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN3",
            slug: "vwn3",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN4",
            slug: "vwn4",
            type: FC_TYPES.correlation,
        },
        {
            name: "VWN5",
            slug: "vwn5",
            type: FC_TYPES.correlation,
        },
        {
            name: "Liu-Parr",
            slug: "liu-parr",
            type: FC_TYPES.correlation,
        },
        {
            name: "Proynov-Kong 2009",
            slug: "pk09",
            type: FC_TYPES.correlation,
        },
        {
            name: "Wigner",
            slug: "wigner",
            type: FC_TYPES.correlation,
        },
    ],
    gga: [
        {
            name: "PBE",
            slug: "pbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "srPBE",
            slug: "srpbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "revPBE",
            slug: "revpbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "muPBE",
            slug: "mupbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "wPBE",
            slug: "wpbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "PBEsol",
            slug: "pbesol-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "RPBE",
            slug: "rpbe-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "Becke 1986",
            slug: "b86",
            type: FC_TYPES.exchange,
        },
        {
            name: "modified B86",
            slug: "mb86",
            type: FC_TYPES.exchange,
        },
        {
            name: "Becke 1988",
            slug: "b88",
            type: FC_TYPES.exchange,
        },
        {
            name: "srB88",
            slug: "mub88",
            type: FC_TYPES.exchange,
        },
        {
            name: "B88 re-fit",
            slug: "optb88",
            type: FC_TYPES.exchange,
        },
        {
            name: "AK13",
            slug: "ak13",
            type: FC_TYPES.exchange,
        },
        {
            name: "Perdew-Wang 1986",
            slug: "pw86",
            type: FC_TYPES.exchange,
        },
        {
            name: "revised PW86",
            slug: "rpw86",
            type: FC_TYPES.exchange,
        },
        {
            name: "Perdew-Wang 1991",
            slug: "pw91-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "modified PW91",
            slug: "mpw91",
            type: FC_TYPES.exchange,
        },
        {
            name: "Gill 1996",
            slug: "g96",
            type: FC_TYPES.exchange,
        },
        {
            name: "Handy-Cohen",
            slug: "optx",
            type: FC_TYPES.exchange,
        },
        {
            name: "second order GGA",
            slug: "sogga",
            type: FC_TYPES.exchange,
        },
        {
            name: "Becke 1997",
            slug: "b97-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "short range Becke 1997",
            slug: "srb97",
            type: FC_TYPES.exchange,
        },
        {
            name: "PBE",
            slug: "pbe-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "srPBE",
            slug: "srpbe-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "PBEsol",
            slug: "pbesol-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "modified PBE",
            slug: "pbeloc",
            type: FC_TYPES.correlation,
        },
        {
            name: "one-parameter progressive PBE",
            slug: "pbeop-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "one-parameter progressive B88",
            slug: "bop-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "vPBEc or regTPSS",
            slug: "vpbec",
            type: FC_TYPES.correlation,
        },
        {
            name: "LYP",
            slug: "lyp",
            type: FC_TYPES.correlation,
        },
        {
            name: "Perdew-Wang 1986",
            slug: "p86",
            type: FC_TYPES.correlation,
        },
        {
            name: "P86 from VWN5",
            slug: "p86vwn5",
            type: FC_TYPES.correlation,
        },
        {
            name: "Perdew-Wang 1991",
            slug: "pw91-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "Becke 1997",
            slug: "b97-c",
            type: FC_TYPES.correlation,
        },
    ],
    mgga: [
        {
            name: "TPSS",
            slug: "tpss-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "revised TPSS",
            slug: "revtpss-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "one-parameter TPSS",
            slug: "modtpss",
            type: FC_TYPES.exchange,
        },
        {
            name: "oTPSS",
            slug: "otpss-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "regularized TPSS",
            slug: "regtpss",
            type: FC_TYPES.exchange,
        },
        {
            name: "BLOC",
            slug: "bloc",
            type: FC_TYPES.exchange,
        },
        {
            name: "PBE-GX",
            slug: "pbegx",
            type: FC_TYPES.exchange,
        },
        {
            name: "Perdew-Kurt-Zupan-Blaha",
            slug: "pkzb-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "SCAN",
            slug: "scan-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "Tao-Mo",
            slug: "tm-x",
            type: FC_TYPES.exchange,
        },
        {
            name: "TPSS",
            slug: "tpss-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "revTPSS",
            slug: "revtpss-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "TPSSloc",
            slug: "tpssloc",
            type: FC_TYPES.correlation,
        },
        {
            name: "oTPSS",
            slug: "otpss-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "Becke 1995",
            slug: "B95",
            type: FC_TYPES.correlation,
        },
        {
            name: "Proynov-Kong 2006",
            slug: "pk06",
            type: FC_TYPES.correlation,
        },
        {
            name: "Perdew-Kurt-Zupan-Blaha",
            slug: "pkzb-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "SCAN",
            slug: "scan-c",
            type: FC_TYPES.correlation,
        },
        {
            name: "Tao-Mo",
            slug: "tm-c",
            type: FC_TYPES.correlation,
        },
    ],
    nonLocalCorrelation: [
        {
            name: "VV10",
            slug: "vv10",
            type: FC_TYPES.nonLocalCorrelation,
        },
        {
            name: "rVV10",
            slug: "rvv10",
            type: FC_TYPES.nonLocalCorrelation,
        },
    ],
    wavefunctionRelated: [
        {
            name: "exact Exchange",
            slug: "exact-exchange",
            type: FC_TYPES.exchange,
        },
        {
            name: "mp2-correction",
            slug: "mp2",
            type: FC_TYPES.correlation,
            subtype: "all-spin",
        },
        {
            name: "mp2-correction",
            slug: "mp2",
            type: FC_TYPES.correlation,
            subtype: "same-spin",
        },
        {
            name: "mp2-correction",
            slug: "mp2",
            type: FC_TYPES.correlation,
            subtype: "opposite-spin",
        },
    ],
};
