import { AddCatalogToListDto } from "./add-catalog.dto";
import {IsNotEmpty,IsString } from "class-validator";


export class UpdateCatalogDto extends AddCatalogToListDto {

    @IsString()
    @IsNotEmpty()
    catalogId : string

}