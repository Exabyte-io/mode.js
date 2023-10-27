import { SlugifiedEntry } from "@exabyte-io/code.js/src/types";

export function slugifiedEntryToString(entry: SlugifiedEntry): string {
    return entry.slug;
}

export function stringToSlugifiedEntry(slug: string, name?: string): SlugifiedEntry {
    const _name = !name ? slug : name;
    return {
        name: _name,
        slug,
    };
}

export function safelyGetSlug(slugObj: SlugifiedEntry | string): string {
    return typeof slugObj === "string" ? slugObj : slugifiedEntryToString(slugObj);
}
