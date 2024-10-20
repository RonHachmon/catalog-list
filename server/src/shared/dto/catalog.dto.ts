import { IsAlpha, IsEnum,IsNotEmpty,IsString } from "class-validator";

export class CatalogDto {
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsEnum(['fashion','home','general'],
        {message: 'Vertical must be one of the following: fashion, home, general'})
    vertical: 'fashion'|'home'|'general';

    locales: string[];
}