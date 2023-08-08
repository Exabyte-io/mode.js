// eslint-disable
module.exports = [
    {
        parameters: { spinOrbitCoupling: true, dispersionCorrection: "dft-d3", functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE-D3 (SOC)",
        path: "/pb/qm/dft/ksdft/gga?spinOrbitCoupling=true&dispersionCorrection=dft-d3&functional=pbe",
    },
    {
        parameters: {
            spinPolarization: "collinear",
            dispersionCorrection: "dft-d3",
            functional: "pbe",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE-D3 (collinear)",
        path: "/pb/qm/dft/ksdft/gga?spinPolarization=collinear&dispersionCorrection=dft-d3&functional=pbe",
    },
    {
        parameters: { dispersionCorrection: "dft-d3", functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE-D3",
        path: "/pb/qm/dft/ksdft/gga?dispersionCorrection=dft-d3&functional=pbe",
    },
    {
        parameters: { hubbardType: "u", spinOrbitCoupling: true, functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE+U (SOC)",
        path: "/pb/qm/dft/ksdft/gga?hubbardType=u&spinOrbitCoupling=true&functional=pbe",
    },
    {
        parameters: { spinOrbitCoupling: true, functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE (SOC)",
        path: "/pb/qm/dft/ksdft/gga?spinOrbitCoupling=true&functional=pbe",
    },
    {
        parameters: { spinPolarization: "collinear", hubbardType: "u", functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE+U (collinear)",
        path: "/pb/qm/dft/ksdft/gga?spinPolarization=collinear&hubbardType=u&functional=pbe",
    },
    {
        parameters: { hubbardType: "u", functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE+U",
        path: "/pb/qm/dft/ksdft/gga?hubbardType=u&functional=pbe",
    },
    {
        parameters: { spinPolarization: "collinear", functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE (collinear)",
        path: "/pb/qm/dft/ksdft/gga?spinPolarization=collinear&functional=pbe",
    },
    {
        parameters: { functional: "pbe" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "gga" },
        tags: ["density functional theory"],
        name: "PBE",
        path: "/pb/qm/dft/ksdft/gga?functional=pbe",
    },
    {
        parameters: { functional: "pbe", require: "pb/qm/dft/ksdft/gga?functional=pbe" },
        categories: { subtype: "g0w0", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "G0W0@PBE",
        path: "/pb/qm/abin/gw/g0w0?functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe",
    },
    {
        parameters: { functional: "pbe", require: "pb/qm/dft/ksdft/gga?functional=pbe" },
        categories: { subtype: "evgw0", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "evGW0@PBE",
        path: "/pb/qm/abin/gw/evgw0?functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe",
    },
    {
        parameters: { functional: "pbe", require: "pb/qm/dft/ksdft/gga?functional=pbe" },
        categories: { subtype: "evgw", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "evGW@PBE",
        path: "/pb/qm/abin/gw/evgw?functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe",
    },
    {
        parameters: {
            spinOrbitCoupling: true,
            functional: "pbe",
            require: "pb/qm/dft/ksdft/gga?functional=pbe&spinOrbitCoupling=true",
        },
        categories: { subtype: "g0w0", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "G0W0@PBE (SOC)",
        path: "/pb/qm/abin/gw/g0w0?spinOrbitCoupling=true&functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe%26spinOrbitCoupling%3Dtrue",
    },
    {
        parameters: {
            spinOrbitCoupling: true,
            functional: "pbe",
            require: "pb/qm/dft/ksdft/gga?functional=pbe&spinOrbitCoupling=true",
        },
        categories: { subtype: "evgw0", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "evGW0@PBE (SOC)",
        path: "/pb/qm/abin/gw/evgw0?spinOrbitCoupling=true&functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe%26spinOrbitCoupling%3Dtrue",
    },
    {
        parameters: {
            spinOrbitCoupling: true,
            functional: "pbe",
            require: "pb/qm/dft/ksdft/gga?functional=pbe&spinOrbitCoupling=true",
        },
        categories: { subtype: "evgw", tier1: "pb", tier2: "qm", tier3: "abin", type: "gw" },
        name: "evGW@PBE (SOC)",
        path: "/pb/qm/abin/gw/evgw?spinOrbitCoupling=true&functional=pbe&require=pb%2Fqm%2Fdft%2Fksdft%2Fgga%3Ffunctional%3Dpbe%26spinOrbitCoupling%3Dtrue",
    },
    {
        parameters: {
            spinOrbitCoupling: true,
            dispersionCorrection: "dft-d3",
            functional: "hse06",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE-D3 (SOC)",
        path: "/pb/qm/dft/ksdft/hybrid?spinOrbitCoupling=true&dispersionCorrection=dft-d3&functional=hse06",
    },
    {
        parameters: {
            spinPolarization: "collinear",
            dispersionCorrection: "dft-d3",
            functional: "hse06",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE-D3 (collinear)",
        path: "/pb/qm/dft/ksdft/hybrid?spinPolarization=collinear&dispersionCorrection=dft-d3&functional=hse06",
    },
    {
        parameters: { dispersionCorrection: "dft-d3", functional: "hse06" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE-D3",
        path: "/pb/qm/dft/ksdft/hybrid?dispersionCorrection=dft-d3&functional=hse06",
    },
    {
        parameters: { spinOrbitCoupling: true, functional: "hse06" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE (SOC)",
        path: "/pb/qm/dft/ksdft/hybrid?spinOrbitCoupling=true&functional=hse06",
    },
    {
        parameters: { spinPolarization: "collinear", functional: "hse06" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE (collinear)",
        path: "/pb/qm/dft/ksdft/hybrid?spinPolarization=collinear&functional=hse06",
    },
    {
        parameters: { functional: "hse06" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "HSE",
        path: "/pb/qm/dft/ksdft/hybrid?functional=hse06",
    },
    {
        parameters: {
            spinOrbitCoupling: true,
            dispersionCorrection: "dft-d3",
            functional: "b3lyp",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP-D3 (SOC)",
        path: "/pb/qm/dft/ksdft/hybrid?spinOrbitCoupling=true&dispersionCorrection=dft-d3&functional=b3lyp",
    },
    {
        parameters: {
            spinPolarization: "collinear",
            dispersionCorrection: "dft-d3",
            functional: "b3lyp",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP-D3 (collinear)",
        path: "/pb/qm/dft/ksdft/hybrid?spinPolarization=collinear&dispersionCorrection=dft-d3&functional=b3lyp",
    },
    {
        parameters: { dispersionCorrection: "dft-d3", functional: "b3lyp" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP-D3",
        path: "/pb/qm/dft/ksdft/hybrid?dispersionCorrection=dft-d3&functional=b3lyp",
    },
    {
        parameters: { spinOrbitCoupling: true, functional: "b3lyp" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP (SOC)",
        path: "/pb/qm/dft/ksdft/hybrid?spinOrbitCoupling=true&functional=b3lyp",
    },
    {
        parameters: { spinPolarization: "collinear", functional: "b3lyp" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP (collinear)",
        path: "/pb/qm/dft/ksdft/hybrid?spinPolarization=collinear&functional=b3lyp",
    },
    {
        parameters: { functional: "b3lyp" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "hybrid" },
        tags: ["density functional theory"],
        name: "B3LYP",
        path: "/pb/qm/dft/ksdft/hybrid?functional=b3lyp",
    },
    {
        parameters: { spinOrbitCoupling: true, dispersionCorrection: "dft-d3", functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ-D3 (SOC)",
        path: "/pb/qm/dft/ksdft/lda?spinOrbitCoupling=true&dispersionCorrection=dft-d3&functional=pz",
    },
    {
        parameters: {
            spinPolarization: "collinear",
            dispersionCorrection: "dft-d3",
            functional: "pz",
        },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ-D3 (collinear)",
        path: "/pb/qm/dft/ksdft/lda?spinPolarization=collinear&dispersionCorrection=dft-d3&functional=pz",
    },
    {
        parameters: { dispersionCorrection: "dft-d3", functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ-D3",
        path: "/pb/qm/dft/ksdft/lda?dispersionCorrection=dft-d3&functional=pz",
    },
    {
        parameters: { hubbardType: "u", spinOrbitCoupling: true, functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ+U (SOC)",
        path: "/pb/qm/dft/ksdft/lda?hubbardType=u&spinOrbitCoupling=true&functional=pz",
    },
    {
        parameters: { spinOrbitCoupling: true, functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ (SOC)",
        path: "/pb/qm/dft/ksdft/lda?spinOrbitCoupling=true&functional=pz",
    },
    {
        parameters: { spinPolarization: "collinear", hubbardType: "u", functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ+U (collinear)",
        path: "/pb/qm/dft/ksdft/lda?spinPolarization=collinear&hubbardType=u&functional=pz",
    },
    {
        parameters: { hubbardType: "u", functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ+U",
        path: "/pb/qm/dft/ksdft/lda?hubbardType=u&functional=pz",
    },
    {
        parameters: { spinPolarization: "collinear", functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ (collinear)",
        path: "/pb/qm/dft/ksdft/lda?spinPolarization=collinear&functional=pz",
    },
    {
        parameters: { functional: "pz" },
        categories: { tier1: "pb", tier2: "qm", tier3: "dft", type: "ksdft", subtype: "lda" },
        tags: ["density functional theory"],
        name: "PZ",
        path: "/pb/qm/dft/ksdft/lda?functional=pz",
    },
    {
        categories: { tier1: "st", tier2: "det", tier3: "ml", type: "re" },
        name: "Regression",
        path: "/st/det/ml/re/none",
    },
];
