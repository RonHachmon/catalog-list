import { Controller, Get, Post, Body, Param, Delete, Put,ValidationPipe  } from '@nestjs/common';
import { CatalogListService } from './catalog-list.service';
import { AddCatalogToListDto } from '../shared/dto/add-catalog.dto';
import { DeleteCatalogFromListDto } from '../shared/dto/delete-catalog-from-list.dto';
import { UpdateCatalogDto } from '../shared/dto/update-catalog.dto';


@Controller('catalog-list')
export class CatalogListController {
  constructor(private readonly catalogListService: CatalogListService) {}

  @Post()
  create(@Body(ValidationPipe) addCatalogToListDto: AddCatalogToListDto) {
    return this.catalogListService.addCatalogToList(addCatalogToListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string,)  {
    return this.catalogListService.findOne(id);
  }

  @Delete()
  delete(@Body(ValidationPipe) deleteCatalogFromListDto: DeleteCatalogFromListDto) {
    return this.catalogListService.deleteCatalogFromList(deleteCatalogFromListDto);
  }

  @Put('/update')
  setPrime(@Body(ValidationPipe) updateCatalogDto: UpdateCatalogDto) {
    return this.catalogListService.updateCatalogInList(updateCatalogDto);
  }

  



}
