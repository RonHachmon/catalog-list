


export interface Catalog {
    _id: string;
    name: string;
    vertical: string;
    locales: string[];
    isPrime: boolean;
    indexedAt: string | null;
}

export interface CatalogAndatalogList {
    catalogListId?: string;
    catalog: Catalog;
}
