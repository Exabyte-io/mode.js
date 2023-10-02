import { safeMakeArray } from "@exabyte-io/code.js/dist/utils";
import { Pseudopotential } from "@exabyte-io/prode.js/dist/include/meta_properties/pseudopotential";
import sortBy from "lodash/sortBy";

import { Method } from "../method";

export class PseudopotentialMethod extends Method {
    constructor(config) {
        super(config);
        this.PseudopotentialCls = Pseudopotential;
        this.initialize(config.extraConfig);
    }

    // "Unique" or "selected" pseudopotentials - one per element
    get pseudo() {
        return this.prop("data.pseudo", []);
    }

    // "All" or "non-unique" pseudopotentials available for a choice
    get allPseudo() {
        return this.prop("data.allPseudo", []);
    }

    get pseudopotentials() {
        return this.pseudo.map((x) => new this.PseudopotentialCls(x));
    }

    get allPseudopotentials() {
        return this.allPseudo.map((x) => new this.PseudopotentialCls(x));
    }

    static extractExchangeCorrelationFromSubworkflow(subworkflow) {
        const { model } = subworkflow;
        const approximation = model.subtype;
        const functional = model.functional ? model.functional.slug || model.functional : "";
        return {
            approximation,
            functional,
        };
    }

    hasPseudopotentialFor(element) {
        return Boolean(this.pseudopotentials.find((x) => x.element === element));
    }

    /**
     * @summary Sets one pseudopotential per element. Subsequent applications will override previous.
     * @param pseudo {Pseudopotential}
     */
    setPseudopotentialPerElement(pseudo) {
        if (!pseudo) {
            this.setPseudopotentials([]);
            return;
        }
        const arr = this.pseudopotentials.filter((x) => x.element !== pseudo.element);
        arr.push(pseudo);
        this.setPseudopotentials(arr);
    }

    // add new pseudopotentials to the list of all pseudopotentials
    addToAllPseudos(pseudos) {
        // eslint-disable-next-line no-param-reassign
        pseudos = safeMakeArray(pseudos);
        const allPseudos = this.allPseudopotentials;
        allPseudos.push(...pseudos);
        this.setAllPseudopotentials(allPseudos);
    }

    /**
     * @param pseudopotentials {Pseudopotential[]}
     */
    setPseudopotentials(pseudopotentials) {
        // sort by alphabetical order to ensure elements order consistency in VASP POSCAR/POTCAR
        this.setData({
            ...this.data,
            pseudo: sortBy(pseudopotentials, "element").map((x) => x.toJSON()),
        });
    }

    /**
     * @param pseudopotentials {Pseudopotential[]}
     */
    setAllPseudopotentials(pseudopotentials) {
        // sort by alphabetical order to ensure elements order consistency in VASP POSCAR/POTCAR
        this.setData({
            ...this.data,
            allPseudo: sortBy(pseudopotentials, "element").map((x) => x.toJSON()),
        });
    }

    // override default `toJSONWithCleanData` method to avoid saving `allPseudo` inside the workflow
    // TODO: revise after implementing Pseudopotential Sets
    toJSONWithCleanData(exclude = []) {
        return super.toJSONWithCleanData(
            exclude.concat([
                "allPseudo",
                // 'pseudo' - not cleaning the field to save it in `Job.workflow`
            ]),
        );
    }

    /**
     * Filters an array of pseudopotentials according to its dependencies (application, model, method, material).
     * @param {Pseudopotential[]} pseudopotentials
     * @param {Application} application
     * @param {DFTModel} model
     * @param {string[]} elements - Array of unique elements.
     * @returns {Pseudopotential[]} - Filtered list of unique pseudopotentials sorted w.r.t. custom hierarchy.
     */
    filterPseudopotentials(pseudopotentials, application, model, elements) {
        const exchangeCorrelation = {
            approximation: model.subtype || "",
            functional: model.functional?.slug || model.functional || "",
        };
        const pseudoType = this.subtype || "any";

        const pseudos = this.PseudopotentialCls.applyPseudoFilters(pseudopotentials, {
            elements,
            appName: application.name,
            exchangeCorrelation,
            searchText: this.searchText,
            type: pseudoType,
        });
        return this.PseudopotentialCls.filterUnique(pseudos);
    }

    sortPseudopotentials(pseudopotentials) {
        // sorting pseudos, this is very hacky! TODO: find better approach for default pseudos per application
        const pseudos = this.PseudopotentialCls.sortPseudosByPattern(pseudopotentials, "/gbrv/");
        return this.PseudopotentialCls.sortByPathVASP(pseudos);
    }

    /**
     * @param {{ metaProperties: Pseudopotential[], application, model, elements: string[] }} extraConfig - Config with dependencies
     */
    initializeData(extraConfig = {}) {
        const { metaProperties: pseudopotentials, application, model, elements } = extraConfig;
        if (
            !pseudopotentials ||
            pseudopotentials.length === 0 ||
            !elements ||
            elements.length === 0
        ) {
            return;
        }

        let pseudos = this.filterPseudopotentials(pseudopotentials, application, model, elements);
        pseudos = this.sortPseudopotentials(pseudos);
        const pseudosPerElement = elements.map((e) => pseudos.find((p) => p.element === e));

        this.setPseudopotentials(pseudosPerElement);
        this.setAllPseudopotentials(pseudos);
    }
}
