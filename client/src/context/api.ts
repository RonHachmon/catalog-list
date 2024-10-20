import axios from "axios";
import { Catalog } from "../types/catalog"
const BASE_URL = 'http://localhost:3000/api';


type method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface options {
  method: method;
  url: string;
  params?: Record<any, any>;
  data?: Record<any, any>;

}

export const getCatalogList = async (catalogListId: string) => {
    console.log("getting catalog list")
    const options: options = {
        method: 'GET',
        url: BASE_URL + '/catalog-list',
        params: { catalogListId } 
    };
    const { data } = await axios.request(options);
    return data;
}


export const addCatalogToList = async (catalogListId: string|null,catalog: Catalog) => {

    const catalogAndCatalogListDto = { catalogListId : catalogListId, catalogDto: catalog,isPrime:catalog.isPrime} ;
    const options: options = {
        method: 'POST',
        url: BASE_URL + '/catalog-list',
        data: catalogAndCatalogListDto
    };

    try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
    } catch (error) {
        console.log(error);
    }

    return null;
}
export const update = async (catalogListId: string|null,catalog: Catalog) => {

    const updateCatalogDto = { 
        catalogListId : catalogListId,
         catalogDto: catalog,
         isPrime:catalog.isPrime,
         catalogId:catalog._id
        } ;
    const options: options = {
        method: 'PUT',
        url: BASE_URL + '/catalog-list/update',
        data: updateCatalogDto
    };

    try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
    } catch (error) {
        console.log(error);
    }

    return null;
}
export const deleteCatalog = async (catalogListId: string|null,catalogId: string) => {

    const deleteCatalogFromListDto = { 
        catalogListId : catalogListId,
        catalogId: catalogId,

        } ;
    const options: options = {
        method: 'DELETE',
        url: BASE_URL + '/catalog-list',
        data: deleteCatalogFromListDto
    };
    const { data } = await axios.request(options);
    return data;
}

