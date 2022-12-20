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
                        subtype: {
                            slug: "gga",
                            name: "Generalized Gradient Approximation",
                            default: "gga",
                        },
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
