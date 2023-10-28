/**
 * @param {{ name: string, slug: string}} entry - Slugified entry.
 * @returns {string} - slug
 */
export function slugifiedEntryToString(entry) {
    return entry.slug;
}

/**
 * @param {string} slug - Slug property of slugified entry.
 * @param {string | undefined} name - Name property of slugified entry.
 * @returns {{ name: string, slug: string }}
 */
export function stringToSlugifiedEntry(slug, name) {
    const _name = !name ? slug : name;
    return {
        name: _name,
        slug,
    };
}

/**
 * @param {{ name: string, slug: string} | string} slugObj - Slugified entry or string.
 * @returns {string}
 */
export function safelyGetSlug(slugObj) {
    return typeof slugObj === "string" ? slugObj : slugifiedEntryToString(slugObj);
}
