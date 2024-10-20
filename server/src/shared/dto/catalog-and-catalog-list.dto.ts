import {IsString } from "class-validator";

export class CatalogAndCatalogListDto {
    @IsString()
    catalogListId: string;

    @IsString()
    catalogId: string;
}