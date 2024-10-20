import { useState,createContext,useMemo } from 'react';
import{ addCatalogToList,update,deleteCatalog} from './api';
import { Catalog } from '../types/catalog';
import { replace } from 'react-router-dom';



interface CatalogContextInterface {
        catalogListId: string | null;
        catalogs: Catalog[];
        addCatalog:(catalog:Catalog)=>void;
        updateCatalog:(catalog:Catalog)=>void;
        removeCatalog:(catalogId:string)=>void;
        

}

export const CatalogContext = createContext<CatalogContextInterface>({
    catalogListId: null,
    catalogs: [],
    addCatalog:(catalog:Catalog)=>undefined,
    updateCatalog:(catalog:Catalog)=>undefined,
    removeCatalog:(catalogId:string)=>undefined
});


                
export const CatalogContextProvider = ({ children }: { children?: any }) => {
    const [catalogListId, setCatalogListId] = useState<string | null>(null);
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);

    const addCatalog = async (catalog: Catalog) => {
        const res = await addCatalogToList(catalogListId,catalog)
        if (res !== null) {
            setCatalogListId(res?._id)
            setCatalogs([...res.catalogs]);
        }
        console.log("add catalog")
        console.log(res)

        
    }
    const updateCatalog = async (catalog: Catalog) => {
        const updatedCatalog = await update(catalogListId, catalog);
        
        if (updatedCatalog !== null) {
            const updatedCatalogs = catalogs.map((existingCatalog) => {
                if (existingCatalog._id === updatedCatalog._id) {
                    return updatedCatalog; 
                }
                return existingCatalog; 
            });
    
            console.log("updated catalogs", updatedCatalogs);
            setCatalogs(updatedCatalogs);
        }
    };

    const removeCatalog = async (catalogId: string) => {
        console.log("remove catalog",catalogId)
        const newList = await deleteCatalog(catalogListId, catalogId);
        
        if (newList !== null) {
            console.log("sucess")
            console.log(newList.catalogs)
            setCatalogs(newList.catalogs);
        }
    };

    const value = useMemo(() => ({
        catalogListId,
        catalogs,
        addCatalog,
        updateCatalog,
        removeCatalog
    }), [catalogListId, catalogs, addCatalog,deleteCatalog,updateCatalog,removeCatalog]);

    return (
    <CatalogContext.Provider value={value}>
    {children}
    </CatalogContext.Provider>
    );

}
