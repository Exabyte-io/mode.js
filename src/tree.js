import lodash from "lodash";
import { deepClone } from "@exabyte-io/code.js/dist/utils";
// TODO: migrate to use manifest instead

const methods = {
    pseudopotential: [
        'paw',
        'nc',
        'us',
    ],
    // TODO: Add additional basis set options, once user choice of specific (i.e 3-21G vs cc-pVDZ) is implemented.
    localorbital: [
        'pople',
    ],
    unknown: [
        "unknown",
    ]
};

export const getPseudopotentialTypesFromTree = () => methods.pseudopotential;

// DFT-specific

const DFTModelRefiners = [
    'hse',
    'g0w0'
];
const DFTModelModifiers = [
    'soc',
    'magn',
];

const DFTModelTree = {
    gga: {
        refiners: DFTModelRefiners,
        modifiers: DFTModelModifiers,
        methods,
        functionals: [
            'pbe',
            'pbesol',
            'pw91',
            'other',
        ],
    },
    lda: {
        refiners: DFTModelRefiners,
        modifiers: DFTModelModifiers,
        methods,
        functionals: [
            'pz',
            'pw',
            'vwn',
            'other',
        ],
    },
    other: {
        methods,
        functionals: ['other'],
    },

};

const LocalOrbitalMethodTree = {
    // TODO: Migrate basis set lists to ESSE.
    pople: {
        basis: [
            '3-21G',
            '6-31G',
            '6-311G',
        ],
    },
    dunning: {
        basis: [
            'cc-pvdz',
            'cc-pvtz',
            'cc-pvqz',
        ],
    },
}

export const getDFTFunctionalsFromTree = () => Object.keys(DFTModelTree);

export const getDFTFunctionalsByApproximation = (approximation) => {
    const branch = DFTModelTree[approximation];
    return branch && branch.functionals;
};

// GENERAL

export const MODEL_TREE = {
    dft: DFTModelTree,
    ml: {
        re: {
            methods: {
                'linear': [
                    'least_squares',
                    'ridge',
                ],
                'kernel_ridge': [
                    'least_squares'
                ]
            }
        }
    },
    unknown: {
        unknown: {
            methods: {
                unknown: [
                    'unknown'
                ]
            }
        }
    }
};

export const treeSlugToNamedObject = (modelSlug) => {
    return {
        slug: modelSlug,
        name: lodash.get(MODEL_NAMES, modelSlug, modelSlug)
    }
};

export const MODEL_NAMES = {
    dft: 'density functional theory',
    lda: 'local density approximation',
    gga: 'generalized gradient approximation',
    ml: 'machine learning',
    re: 'regression'
};

// TODO: find a better way to handle application-specific model-method combination
// must be a subset of the MODEL_TREE above
// demonstrate how tree can be modified
// VASP_MODELS_TREE.gga.functionals = _.omit(VASP_MODELS_TREE.gga.functionals);

let VASP_MODELS_TREE = deepClone(_.pick(MODEL_TREE, 'dft'));
let ESPRESSO_MODELS_TREE = deepClone(_.pick(MODEL_TREE, 'dft'));
let NWCHEM_MODELS_TREE = deepClone(_.pick(MODEL_TREE, 'dft'));

['gga', 'lda'].forEach(approximation => {

    // pick "paw" for vasp
    VASP_MODELS_TREE.dft[approximation].methods.pseudopotential =
        VASP_MODELS_TREE.dft[approximation].methods.pseudopotential.splice(0, 1);

    // assert "us" is the first option
    ESPRESSO_MODELS_TREE.dft[approximation].methods.pseudopotential =
        ESPRESSO_MODELS_TREE.dft[approximation].methods.pseudopotential.reverse();

    NWCHEM_MODELS_TREE.dft[approximation].methods.localorbital =
        NWCHEM_MODELS_TREE.dft[approximation].methods.localorbital;
});

let UNKNOWN_MODELS_TREE = _.pick(MODEL_TREE, 'unknown');
let ML_MODELS_TREE = _.pick(MODEL_TREE, 'ml');

const MODELS_TREE_CONFIGS_BY_APPLICATION_NAME_VERSION = [
    {
        "name": "vasp",
        "tree": VASP_MODELS_TREE,
    },
    {
        "name": "espresso",
        "tree": ESPRESSO_MODELS_TREE,
    },
    {
        "name": "python",
        "tree": UNKNOWN_MODELS_TREE,
    },
    {
        "name": "shell",
        "tree": UNKNOWN_MODELS_TREE,
    },
    {
        "name": "exabyteml",
        "tree": ML_MODELS_TREE,
    },
    {
        "name": "jupyterLab",
        "tree": UNKNOWN_MODELS_TREE,
    },
    {
        "name": "nwchem",
        "tree": NWCHEM_MODELS_TREE,
    }
]

export const getTreeByApplicationNameAndVersion = ({
                                                       name,
                                                       version
                                                   }) => {
    // TODO: add logic to filter by version when necessary
    const cfgs = MODELS_TREE_CONFIGS_BY_APPLICATION_NAME_VERSION.filter(cfg => (cfg.name === name)).map(x => x.tree);
    return Object.assign({}, ...cfgs);
}

export const getDefaultModelTypeForApplication = (application) => {
    return Object.keys(getTreeByApplicationNameAndVersion(application))[0];
}
