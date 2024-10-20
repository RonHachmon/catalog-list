import {IsNotEmpty,IsString } from "class-validator";
import {CatalogDto} from "./catalog.dto";

export class AddCatalogToListDto {
    @IsString()
    catalogListId: string | null;

    catalogDto : CatalogDto;

    @IsNotEmpty()
    isPrime: boolean;
}