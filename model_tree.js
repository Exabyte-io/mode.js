module.exports = {
    path: "",
    children: [
        {
            parentPath: "",
            path: "/dft",
            data: { type: { slug: "dft", name: "Density Functional Theory", default: "dft" } },
            children: [
                {
                    parentPath: "/dft",
                    path: "/dft/gga",
                    data: {
                        isDefault: true,
                        subtype: { slug: "gga", name: "Generalized Gradient Approximation" },
                    },
                    children: [
                        [
                            {
                                path: "/dft/gga/pbe",
                                data: {
                                    isDefault: true,
                                    functional: {
                                        name: "PBE",
                                        slug: "pbe",
                                        components: [
                                            { slug: "pbe-x", fraction: 1 },
                                            { slug: "pbe-c", fraction: 1 },
                                        ],
                                    },
                                },
                                parentPath: "/dft/gga",
                            },
                            {
                                path: "/dft/gga/pbesol",
                                data: {
                                    functional: {
                                        name: "PBEsol",
                                        slug: "pbesol",
                                        components: [
                                            { slug: "pbesol-x", fraction: 1 },
                                            { slug: "pbesol-c", fraction: 1 },
                                        ],
                                    },
                                },
                                parentPath: "/dft/gga",
                            },
                            {
                                path: "/dft/gga/pw91",
                                data: {
                                    functional: {
                                        name: "PW91",
                                        slug: "pw91",
                                        components: [
                                            { slug: "pw91-x", fraction: 1 },
                                            { slug: "pw91-c", fraction: 1 },
                                        ],
                                    },
                                },
                                parentPath: "/dft/gga",
                            },
                        ],
                    ],
                },
                {
                    parentPath: "/dft",
                    path: "/dft/hybrid",
                    data: { subtype: { slug: "hybrid", name: "Hybrid Functional" } },
                    children: [
                        [
                            {
                                path: "/dft/hybrid/b3lyp",
                                data: {
                                    name: "B3LYP",
                                    slug: "b3lyp",
                                    components: [
                                        { slug: "exact-exchange", fraction: 0.2 },
                                        {
                                            slug: "slater",
                                            fraction: 0.08,
                                        },
                                        { slug: "b88", fraction: 0.72 },
                                        { slug: "vwn1rpa", fraction: 0.19 },
                                        {
                                            slug: "lyp",
                                            fraction: 0.81,
                                        },
                                    ],
                                },
                                parentPath: "/dft/hybrid",
                            },
                            {
                                path: "/dft/hybrid/pbe0",
                                data: {
                                    name: "PBE0",
                                    slug: "pbe0",
                                    components: [
                                        { slug: "exact-exchange", fraction: 0.25 },
                                        {
                                            slug: "pbe-x",
                                            fraction: 0.75,
                                        },
                                        { slug: "pbe-c", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/hybrid",
                            },
                            {
                                path: "/dft/hybrid/hse06",
                                data: {
                                    name: "HSE06",
                                    slug: "hse06",
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
                                        { slug: "wpbe-x", range: "long-range", fraction: 0 },
                                        {
                                            slug: "pbe-x",
                                            fraction: 1,
                                        },
                                        { slug: "pbe-c", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/hybrid",
                            },
                        ],
                    ],
                },
                {
                    parentPath: "/dft",
                    path: "/dft/lda",
                    data: { subtype: { slug: "lda", name: "Local Density Approximation" } },
                    children: [
                        [
                            {
                                path: "/dft/lda/spw92",
                                data: {
                                    name: "Slater-PW92",
                                    slug: "spw92",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "pw92", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/lda",
                            },
                            {
                                path: "/dft/lda/spz",
                                data: {
                                    name: "Slater-PZ",
                                    slug: "spz",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "pz81", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/lda",
                            },
                            {
                                path: "/dft/lda/svwn",
                                data: {
                                    name: "Slater-VWN",
                                    slug: "svwn",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "vwn5", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/lda",
                            },
                        ],
                    ],
                },
                {
                    parentPath: "/dft",
                    path: "/dft/mgga",
                    data: {
                        subtype: { slug: "mgga", name: "Meta Generalized Gradient Approximation" },
                    },
                    children: [
                        [
                            {
                                path: "/dft/mgga/scan",
                                data: {
                                    name: "SCAN",
                                    slug: "scan",
                                    components: [
                                        { slug: "scan-x", fraction: 1 },
                                        { slug: "scan-c", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/mgga",
                            },
                            {
                                path: "/dft/mgga/tpss",
                                data: {
                                    name: "TPSS",
                                    slug: "tpss",
                                    components: [
                                        { slug: "tpss-x", fraction: 1 },
                                        { slug: "tpss-c", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/mgga",
                            },
                            {
                                path: "/dft/mgga/m06l",
                                data: {
                                    name: "M06-L",
                                    slug: "m06-l",
                                    components: [
                                        { slug: "m06-l-x", fraction: 1 },
                                        { slug: "m06-l-c", fraction: 1 },
                                    ],
                                },
                                parentPath: "/dft/mgga",
                            },
                        ],
                    ],
                },
            ],
        },
        {
            parentPath: "",
            path: "/ml",
            data: { type: { name: "Machine Learning", slug: "ml", default: "ml" } },
            children: [
                {
                    parentPath: "/ml",
                    path: "/ml/re",
                    data: { subtype: { name: "Regression", slug: "re", default: "re" } },
                    children: [],
                },
            ],
        },
    ],
};
