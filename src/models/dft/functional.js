import { FUNCTIONALS } from "./functional_lookup_table";
import {
    findComponent,
    findComponentIndex,
    findFunctionalConfig,
    hasNonLocalCorrelation,
    hasRangeSeparation,
    isGGAfromComponents,
    isLDAfromComponents,
} from "./functional_utils";

export class Functional {
    constructor({ slug, components, attenuation } = {}) {
        this.slug = slug || "custom";
        this.components = components || [];
        this.attenuation = attenuation || 0;
    }

    static create({ slug, ...config }) {
        if (slug) {
            const _config = findFunctionalConfig(slug);
            return new Functional({ slug, ..._config });
        }
        return new Functional({ ...config });
    }

    findComponent({ slug, range, subtype }) {
        return findComponent(this.components, slug, range, subtype);
    }

    findComponentIndex({ slug, range, subtype }) {
        return findComponentIndex(this.components, slug, range, subtype);
    }

    addComponent(component) {
        if (component.slug === undefined) return this;
        const safeComponent = { fraction: 1, ...component };

        const existingIdx = this.findComponentIndex(component);
        if (existingIdx > 0) {
            this.components[existingIdx] = safeComponent;
        } else {
            this.components.push(safeComponent);
        }
        return this;
    }

    removeComponent({ slug, ...other }) {
        const idx = this.findComponentIndex({ slug, ...other });
        this.components.splice(idx, 1);
    }

    setAttenuation(attValue) {
        this.attenuation = attValue;
        return this;
    }

    get hasRangeSeparation() {
        return hasRangeSeparation(this.components);
    }

    get hasNonLocalCorrelation() {
        return hasNonLocalCorrelation(this.components);
    }

    get isLDA() {
        return (
            Object.keys(FUNCTIONALS.lda).includes(this.slug) || isLDAfromComponents(this.components)
        );
    }

    get isGGA() {
        return (
            Object.keys(FUNCTIONALS.gga).includes(this.slug) || isGGAfromComponents(this.components)
        );
    }
}
