/**
 *  A list of "canned" functionals organized by rung, i.e.
 *  lda, gga, mgga, hybrid, doubleHybrid
 */
export const FUNCTIONALS = {
    lda: {
        spw92: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "pw92",
                    fraction: 1,
                },
            ],
        },
        spw92rpa: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "pw92rpa",
                    fraction: 1,
                },
            ],
        },
        svwn1: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn1",
                    fraction: 1,
                },
            ],
        },
        svwn1rpa: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn1rpa",
                    fraction: 1,
                },
            ],
        },
        svwn2: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn2",
                    fraction: 1,
                },
            ],
        },
        svwn3: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn3",
                    fraction: 1,
                },
            ],
        },
        svwn4: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn4",
                    fraction: 1,
                },
            ],
        },
        svwn5: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "vwn5",
                    fraction: 1,
                },
            ],
        },
        spk09: {
            components: [
                {
                    slug: "slater",
                    fraction: 1,
                },
                {
                    slug: "pk09",
                    fraction: 1,
                },
            ],
        },
    },
    gga: {
        pbe: {
            components: [
                {
                    slug: "pbe-x",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        revpbe: {
            components: [
                {
                    slug: "revpbe-x",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        pbesol: {
            components: [
                {
                    slug: "pbesol-x",
                    fraction: 1,
                },
                {
                    slug: "pbesol-c",
                    fraction: 1,
                },
            ],
        },
        rpbe: {
            components: [
                {
                    slug: "rpbe-x",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        pbeop: {
            components: [
                {
                    slug: "pbe-x",
                    fraction: 1,
                },
                {
                    slug: "pbeop-c",
                    fraction: 1,
                },
            ],
        },
        blyp: {
            components: [
                {
                    slug: "b88",
                    fraction: 1,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        bp86: {
            components: [
                {
                    slug: "b88",
                    fraction: 1,
                },
                {
                    slug: "p86",
                    fraction: 1,
                },
            ],
        },
        bp86vwn: {
            components: [
                {
                    slug: "b88",
                    fraction: 1,
                },
                {
                    slug: "p86vwn5",
                    fraction: 1,
                },
            ],
        },
        bpbe: {
            components: [
                {
                    slug: "b88",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        pw91: {
            components: [
                {
                    slug: "pw91-x",
                    fraction: 1,
                },
                {
                    slug: "pw91-c",
                    fraction: 1,
                },
            ],
        },
        mpw91: {
            components: [
                {
                    slug: "mpw91",
                    fraction: 1,
                },
                {
                    slug: "pw91-c",
                    fraction: 1,
                },
            ],
        },
        olyp: {
            components: [
                {
                    slug: "optx",
                    fraction: 1,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        sogga: {
            components: [
                {
                    slug: "sogga",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        vv10: {
            components: [
                {
                    slug: "rpw86",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
                {
                    slug: "vv10",
                    fraction: 1,
                },
            ],
        },
        rvv10: {
            components: [
                {
                    slug: "rpw86",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
                {
                    slug: "rvv10",
                    fraction: 1,
                },
            ],
        },
    },
    mgga: {
        tpss: {
            components: [
                {
                    slug: "tpss-x",
                    fraction: 1,
                },
                {
                    slug: "tpss-c",
                    fraction: 1,
                },
            ],
        },
        revtpss: {
            components: [
                {
                    slug: "revtpss-x",
                    fraction: 1,
                },
                {
                    slug: "revtpss-c",
                    fraction: 1,
                },
            ],
        },
        otpss: {
            components: [
                {
                    slug: "otpss-x",
                    fraction: 1,
                },
                {
                    slug: "otpss-c",
                    fraction: 1,
                },
            ],
        },
        bloc: {
            components: [
                {
                    slug: "bloc",
                    fraction: 1,
                },
                {
                    slug: "tpssloc",
                    fraction: 1,
                },
            ],
        },
        pkzb: {
            components: [
                {
                    slug: "pkzb-x",
                    fraction: 1,
                },
                {
                    slug: "pkzb-c",
                    fraction: 1,
                },
            ],
        },
        scan: {
            components: [
                {
                    slug: "scan-x",
                    fraction: 1,
                },
                {
                    slug: "scan-c",
                    fraction: 1,
                },
            ],
        },
        tm: {
            components: [
                {
                    slug: "tm-x",
                    fraction: 1,
                },
                {
                    slug: "tm-c",
                    fraction: 1,
                },
            ],
        },
    },
    hybrid: {
        b97: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.1943,
                },
                {
                    slug: "b97-x",
                    fraction: 1,
                },
                {
                    slug: "b97-c",
                    fraction: 1,
                },
            ],
        },
        b3lyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.2,
                },
                {
                    slug: "slater",
                    fraction: 0.08,
                },
                {
                    slug: "b88",
                    fraction: 0.72,
                },
                {
                    slug: "vwn1rpa",
                    fraction: 0.19,
                },
                {
                    slug: "lyp",
                    fraction: 0.81,
                },
            ],
        },
        b3lyp5: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.2,
                },
                {
                    slug: "slater",
                    fraction: 0.08,
                },
                {
                    slug: "b88",
                    fraction: 0.72,
                },
                {
                    slug: "vwn5",
                    fraction: 0.19,
                },
                {
                    slug: "lyp",
                    fraction: 0.81,
                },
            ],
        },
        b3p86: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.2,
                },
                {
                    slug: "slater",
                    fraction: 0.08,
                },
                {
                    slug: "b88",
                    fraction: 0.72,
                },
                {
                    slug: "vwn1rpa",
                    fraction: 0.19,
                },
                {
                    slug: "p86",
                    fraction: 0.81,
                },
            ],
        },
        b3pw91: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.2,
                },
                {
                    slug: "slater",
                    fraction: 0.08,
                },
                {
                    slug: "b88",
                    fraction: 0.72,
                },
                {
                    slug: "pw92",
                    fraction: 0.19,
                },
                {
                    slug: "pw91-c",
                    fraction: 0.81,
                },
            ],
        },
        o3lyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.1161,
                },
                {
                    slug: "slater",
                    fraction: 0.0706,
                },
                {
                    slug: "optx",
                    fraction: 0.8133,
                },
                {
                    slug: "vwn5",
                    fraction: 0.19,
                },
                {
                    slug: "lyp",
                    fraction: 0.81,
                },
            ],
        },
        b1lyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "b88",
                    fraction: 0.75,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        b1pw91: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "b88",
                    fraction: 0.75,
                },
                {
                    slug: "pw91-c",
                    fraction: 1,
                },
            ],
        },
        b5050lyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.5,
                },
                {
                    slug: "slater",
                    fraction: 0.08,
                },
                {
                    slug: "b88",
                    fraction: 0.42,
                },
                {
                    slug: "vwn5",
                    fraction: 0.19,
                },
                {
                    slug: "lyp",
                    fraction: 0.81,
                },
            ],
        },
        bhhlyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.5,
                },
                {
                    slug: "b88",
                    fraction: 0.5,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        hflyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 1,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        pbe0: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "pbe-x",
                    fraction: 0.75,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        revpbe0: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "revpbe-x",
                    fraction: 0.75,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        pbe50: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.5,
                },
                {
                    slug: "pbe-x",
                    fraction: 0.5,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        mpw1k: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.428,
                },
                {
                    slug: "mpw91",
                    fraction: 0.572,
                },
                {
                    slug: "pw91-c",
                    fraction: 1,
                },
            ],
        },
        mpw1lyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "mpw91",
                    fraction: 0.75,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        mpw1pbe: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "mpw91",
                    fraction: 0.75,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        mpw1pw91: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "mpw91",
                    fraction: 0.75,
                },
                {
                    slug: "pw91-c",
                    fraction: 1,
                },
            ],
        },
        tpssh: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.1,
                },
                {
                    slug: "tpss-x",
                    fraction: 0.9,
                },
                {
                    slug: "tpss-c",
                    fraction: 1,
                },
            ],
        },
        tpss0: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "tpss-x",
                    fraction: 0.75,
                },
                {
                    slug: "tpss-c",
                    fraction: 1,
                },
            ],
        },
        revtpssh: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.1,
                },
                {
                    slug: "revtpss-x",
                    fraction: 0.9,
                },
                {
                    slug: "revtpss-c",
                    fraction: 1,
                },
            ],
        },
        b1b95: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.28,
                },
                {
                    slug: "b88",
                    fraction: 0.72,
                },
                {
                    slug: "b95",
                    fraction: 1,
                },
            ],
        },
        b3tlap: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.1713,
                },
                {
                    slug: "slater",
                    fraction: 0.0966,
                },
                {
                    slug: "b88",
                    fraction: 0.726,
                },
                {
                    slug: "pk06",
                    fraction: 1,
                },
            ],
        },
        bb1k: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.42,
                },
                {
                    slug: "b88",
                    fraction: 0.58,
                },
                {
                    slug: "b95",
                    fraction: 1,
                },
            ],
        },
        mpw1b95: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.31,
                },
                {
                    slug: "mpw91",
                    fraction: 0.69,
                },
                {
                    slug: "b95",
                    fraction: 1,
                },
            ],
        },
        mpwb1k: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.44,
                },
                {
                    slug: "mpw91",
                    fraction: 0.56,
                },
                {
                    slug: "b95",
                    fraction: 1,
                },
            ],
        },
        scan0: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.25,
                },
                {
                    slug: "scan-x",
                    fraction: 0.75,
                },
                {
                    slug: "scan-c",
                    fraction: 1,
                },
            ],
        },
        camb3lyp: {
            attenuation: 0.33,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0.19,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 0.65,
                },
                {
                    slug: "b88",
                    range: "short-range",
                    fraction: 0.81,
                },
                {
                    slug: "b88",
                    range: "long-range",
                    fraction: 0.35,
                },
                {
                    slug: "vwn5",
                    fraction: 0.19,
                },
                {
                    slug: "lyp",
                    fraction: 0.81,
                },
            ],
        },
        lc_blyp: {
            attenuation: 0.33,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "b88",
                    range: "short-range",
                    fraction: 1,
                },
                {
                    slug: "b88",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "lyp",
                    fraction: 1,
                },
            ],
        },
        lc_wpbe08: {
            attenuation: 0.45,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "wpbe-x",
                    range: "short-range",
                    fraction: 1,
                },
                {
                    slug: "wpbe-x",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        lrc_wpbe: {
            attenuation: 0.3,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "wpbe-x",
                    range: "short-range",
                    fraction: 1,
                },
                {
                    slug: "wpbe-x",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        lrc_wpbeh: {
            attenuation: 0.2,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0.2,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "wpbe-x",
                    range: "short-range",
                    fraction: 0.8,
                },
                {
                    slug: "wpbe-x",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
        lrc_bop: {
            attenuation: 0.47,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "mub88",
                    range: "short-range",
                    fraction: 1,
                },
                {
                    slug: "mub88",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "bop-c",
                    fraction: 1,
                },
            ],
        },
        wb97: {
            attenuation: 0.4,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 1,
                },
                {
                    slug: "srb97",
                    range: "short-range",
                    fraction: 1,
                },
                {
                    slug: "srb97",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "b97-c",
                    fraction: 1,
                },
            ],
        },
        hse06: {
            attenuation: 0.11,
            components: [
                {
                    slug: "exact-exchange",
                    range: "short-range",
                    fraction: 0.25,
                },
                {
                    slug: "exact-exchange",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "wpbe-x",
                    range: "short-range",
                    fraction: -0.25,
                },
                {
                    slug: "wpbe-x",
                    range: "long-range",
                    fraction: 0,
                },
                {
                    slug: "pbe-x",
                    fraction: 1,
                },
                {
                    slug: "pbe-c",
                    fraction: 1,
                },
            ],
        },
    },
    doubleHybrid: {
        b2plyp: {
            components: [
                {
                    slug: "exact-exchange",
                    fraction: 0.53,
                },
                {
                    slug: "b88",
                    fraction: 0.47,
                },
                {
                    slug: "lyp",
                    fraction: 0.73,
                },
                {
                    slug: "mp2",
                    subtype: "all-spin",
                    fraction: 0.27,
                },
            ],
        },
    },
};
