module.exports = {
    label: "root",
    children: [
        {
            parent: "root",
            label: "dft",
            data: { type: { slug: "dft", name: "Density Functional Theory", default: "dft" } },
            children: [
                {
                    parent: "dft",
                    label: "gga",
                    data: {
                        default: true,
                        subtype: {
                            slug: "gga",
                            name: "Generalized Gradient Approximation",
                            default: "gga",
                        },
                    },
                    children: [
                        [
                            {
                                label: "pbe",
                                data: {
                                    default: true,
                                    functional: {
                                        name: "PBE",
                                        slug: "pbe",
                                        components: [
                                            { slug: "pbe-x", fraction: 1 },
                                            { slug: "pbe-c", fraction: 1 },
                                        ],
                                    },
                                },
                                parent: "dft",
                            },
                            {
                                label: "pbesol",
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
                                parent: "dft",
                            },
                            {
                                label: "pw91",
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
                                parent: "dft",
                            },
                        ],
                    ],
                },
                {
                    parent: "dft",
                    label: "lda",
                    data: { subtype: { slug: "lda", name: "Local Density Approximation" } },
                    children: [
                        [
                            {
                                label: "spw92",
                                data: {
                                    name: "Slater-PW92",
                                    slug: "spw92",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "pw92", fraction: 1 },
                                    ],
                                },
                                parent: "dft",
                            },
                            {
                                label: "spz",
                                data: {
                                    name: "Slater-PZ",
                                    slug: "spz",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "pz81", fraction: 1 },
                                    ],
                                },
                                parent: "dft",
                            },
                            {
                                label: "svwn",
                                data: {
                                    name: "Slater-VWN",
                                    slug: "svwn",
                                    components: [
                                        { slug: "slater", fraction: 1 },
                                        { slug: "vwn5", fraction: 1 },
                                    ],
                                },
                                parent: "dft",
                            },
                        ],
                    ],
                },
            ],
        },
        {
            parent: "root",
            label: "ml",
            data: { type: { name: "Machine Learning", slug: "ml", default: "ml" } },
            children: [
                {
                    parent: "ml",
                    label: "re",
                    data: { subtype: { name: "Regression", slug: "re", default: "re" } },
                    children: [],
                },
            ],
        },
    ],
};
