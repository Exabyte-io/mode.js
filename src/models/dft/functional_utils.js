import { FC_TYPES, FUNCTIONAL_COMPONENTS } from "./functional_components";
import { FUNCTIONALS } from "./functional_lookup_table";

/* FUNCTIONAL COMPONENTS */

export function findFunctionalComponent(slug) {
    // eslint-disable-next-line no-restricted-syntax
    for (const rung of Object.keys(FUNCTIONAL_COMPONENTS)) {
        const component = FUNCTIONAL_COMPONENTS[rung].find((c) => c.slug === slug);
        if (component) {
            return component;
        }
    }
}

/**
 *  Get component category (e.g. lda) from slug.
 */
export function componentCategory(slug) {
    // eslint-disable-next-line no-restricted-syntax
    for (const cat of Object.keys(FUNCTIONAL_COMPONENTS)) {
        const slugs = FUNCTIONAL_COMPONENTS[cat].map((c) => c.slug);
        if (slugs.includes(slug)) {
            return cat;
        }
    }
}

/**
 *  Check whether slug corresponds to *any* exchange component, i.e.
 *  including exact exchange.
 */
export function isExchange(slug) {
    const component = findFunctionalComponent(slug);
    return component.type === FC_TYPES.exchange;
}

/**
 *  Check whether slug corresponds to a pure exchange density functional component, i.e.
 *  excluding exact exchange.
 */
export function isPureExchange(slug) {
    return isExchange(slug) && slug !== "exact-exchange";
}

/**
 *  Check whether slug corresponds to *any* correlation component.
 */
export function isCorrelation(slug) {
    const component = findFunctionalComponent(slug);
    return component.type === FC_TYPES.correlation;
}

/**
 *  Check whether slug corresponds to a correlation density functional component.
 */
export function isPureCorrelation(slug) {
    const component = findFunctionalComponent(slug);
    return component.type === FC_TYPES.correlation && !component.subtype;
}

/**
 *  Check whether slug corresponds to a non-local correlation component.
 */
export function isNonLocalCorrelation(slug) {
    const component = findFunctionalComponent(slug);
    return component.type === FC_TYPES.nonLocalCorrelation;
}

/* FUNCTIONALS */

export function findFunctionalConfig(slug) {
    // eslint-disable-next-line no-restricted-syntax
    for (const rung of Object.keys(FUNCTIONALS)) {
        if (slug in FUNCTIONALS[rung]) {
            return FUNCTIONALS[rung][slug];
        }
    }
    return {};
}

export function isValidFunctionalSlug(slug) {
    const allSlugs = Object.keys(FUNCTIONALS).flatMap((r) => Object.keys(FUNCTIONALS[r]));
    return allSlugs.includes(slug);
}

export function rungFromSlug(slug) {
    // eslint-disable-next-line no-restricted-syntax
    for (const rung of Object.keys(FUNCTIONALS)) {
        if (slug in FUNCTIONALS[rung]) {
            return rung;
        }
    }
}

export function findComponent(components, slug, range, subtype) {
    if (range) {
        return components.find((c) => c.slug === slug && c.range === range);
    }
    if (subtype) {
        return components.find((c) => c.slug === slug && c.subtype === subtype);
    }
    return components.find((c) => c.slug === slug);
}

export function findComponentIndex(components, slug, range, subtype) {
    if (range) {
        return components.findIndex((c) => c.slug === slug && c.range === range);
    }
    if (subtype) {
        return components.findIndex((c) => c.slug === slug && c.subtype === subtype);
    }
    return components.findIndex((c) => c.slug === slug);
}

// eslint-disable-next-line no-unused-vars
function hasExchangeAndCorrelation(components, onlyPure = false) {
    let { exch, corr } = {};
    if (onlyPure) {
        exch = components.some((c) => isPureExchange(c.slug));
        corr = components.some((c) => isPureCorrelation(c.slug));
    } else {
        exch = components.some((c) => isExchange(c.slug));
        corr = components.some((c) => isCorrelation(c.slug));
    }
    return exch && corr;
}

function hasOneExchangeAndOneCorrelation(components, onlyPure = false) {
    let { oneX, oneC } = {};
    if (onlyPure) {
        oneX = components.filter((c) => isPureExchange(c.slug));
        oneC = components.filter((c) => isPureCorrelation(c.slug));
    } else {
        oneX = components.filter((c) => isExchange(c.slug));
        oneC = components.filter((c) => isCorrelation(c.slug));
    }
    return oneX.length === 1 && oneC.length === 1;
}

export function hasNonLocalCorrelation(components) {
    const nlc = components.filter((c) => isNonLocalCorrelation(c.slug));
    return nlc.length === 1;
}

export function hasRangeSeparation(components) {
    return components.some((c) => c.range !== undefined);
}

export function isLDAfromComponents(components) {
    const oneXoneC = hasOneExchangeAndOneCorrelation(components, true);
    const ldaAll = components.every((c) => componentCategory(c.slug) === "lda");
    return oneXoneC && ldaAll;
}

export function isGGAfromComponents(components) {
    const oneXoneC = hasOneExchangeAndOneCorrelation(components, true);
    const hasGradient = components.some((c) => componentCategory(c.slug) === "gga");
    const validExtra = components.length > 2 ? hasNonLocalCorrelation(components) : true;
    return oneXoneC && hasGradient && validExtra;
}

// TODO: add boolean function for higher rungs
