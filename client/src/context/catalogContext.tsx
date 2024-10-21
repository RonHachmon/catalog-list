import { useState,createContext,useMemo } from 'react';
import{ addCatalogToList,update,deleteCatalog} from './api';
import { Catalog } from '../types/catalog';




interface CatalogContextInterface {
        catalogListId: string | null;
        primeCatalogId: string | null;
        catalogs: Catalog[];
        addCatalog:(catalog:Catalog)=>void;
        updateCatalog:(catalog:Catalog)=>void;
        removeCatalog:(catalogId:string)=>void;
        

}

export const CatalogContext = createContext<CatalogContextInterface>({
    catalogListId: null,
    primeCatalogId: null,
    catalogs: [],
    addCatalog:(catalog:Catalog)=>undefined,
    updateCatalog:(catalog:Catalog)=>undefined,
    removeCatalog:(catalogId:string)=>undefined
});


                
export const CatalogContextProvider = ({ children }: { children?: any }) => {
    const [catalogListId, setCatalogListId] = useState<string | null>(null);
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [primeCatalogId, setPrimeCatalogId] = useState<string | null>(null);



    const setPrime = (primeId:string,isPrime?:boolean) => {
        if(isPrime) {
            setPrimeCatalogId(primeId)
        }
        else{
            if(primeCatalogId!=null && primeCatalogId === primeId) {
                setPrimeCatalogId(null)
            }
        }       
    }

    const addCatalog = async (catalog: Catalog) => {
        const res = await addCatalogToList(catalogListId,catalog)
        if (res !== null) {
            setCatalogListId(res?._id)
            setCatalogs([...res.catalogs]);
            if(res.primeCatalogId) {
                setPrime(res.primeCatalogId,catalog.isPrime)
            }
        }        
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
            
            setPrime(catalog._id,catalog.isPrime)
            
    
            // console.log("updated catalogs", updatedCatalogs);
            setCatalogs(updatedCatalogs);
        }
    };

    const removeCatalog = async (catalogId: string) => {
        console.log("remove catalog",catalogId)
        const newList = await deleteCatalog(catalogListId, catalogId);
        
        if (newList !== null) {
            // console.log("sucess")
            // console.log(newList.catalogs)
            setCatalogs(newList.catalogs);
            setPrime(catalogId,false)
        }
    };

    const value = useMemo(() => ({
        catalogListId,
        catalogs,
        addCatalog,
        updateCatalog,
        removeCatalog,
        primeCatalogId
    }), [catalogListId, catalogs, addCatalog,deleteCatalog,updateCatalog,removeCatalog]);

    return (
    <CatalogContext.Provider value={value}>
    {children}
    </CatalogContext.Provider>
    );

}
