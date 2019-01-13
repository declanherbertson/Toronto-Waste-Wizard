export interface WasteCategory {
    body: any;
    category: string;
    keywords: string;
    title: string;
    favourite: boolean; // will be set to false when first fetched
}

export function wasteCategoryComparator (a: WasteCategory, b: WasteCategory): boolean {
    return a.body === b.body && a.title === b.title && a.category === b.category && a.keywords === b.keywords;
}
