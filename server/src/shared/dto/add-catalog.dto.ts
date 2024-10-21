import {IsNotEmpty,IsString,IsOptional } from "class-validator";
import {CatalogDto} from "./catalog.dto";

export class AddCatalogToListDto {
    @IsString()
    @IsOptional()
    catalogListId: string | null;

    catalogDto : CatalogDto;

    @IsNotEmpty()
    isPrime: boolean;
}