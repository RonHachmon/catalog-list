import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogDto } from '../shared/dto/catalog.dto';


@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}




    @Get(':id')
    findOne(@Param('id') id: string,) {
        return this.catalogService.findOne(id);
        
    }

    @Post() // Pos /catalog
    create(@Body(ValidationPipe) catalog: CatalogDto) {
        this.catalogService.create(catalog)
        return catalog;
        
    }

    // @Patch() // Pos /catalog
    // update(@Body(ValidationPipe) updateCatalogDto: UpdateCatalogDto) {
    //     this.catalogService.update
    //     return catalog;
        
    // }



}
