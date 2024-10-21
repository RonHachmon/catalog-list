import { BadRequestException, Injectable,NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CatalogList, CatalogListDocument } from './schemas/catalogList.schema';
import {CatalogService} from "../catalog/catalog.service";
import {AddCatalogToListDto} from "../shared/dto/add-catalog.dto";
import { DeleteCatalogFromListDto } from 'src/shared/dto/delete-catalog-from-list.dto';
import { UpdateCatalogDto } from 'src/shared/dto/update-catalog.dto'


@Injectable()
export class CatalogListService {
  constructor(
    @InjectModel(CatalogList.name) private readonly catalogListModel: Model<CatalogList>,
    private readonly catalogService: CatalogService,
  ) {}



  async findOne(id: string): Promise<CatalogListDocument | null> {
    return await this.catalogListModel.findById(id).populate('catalogs').exec();
  }

  async create(): Promise<CatalogListDocument> {
    const newCatalogList = new this.catalogListModel({
      catalogs : [],
      primeCatalogId : null
    }
    );
    return await newCatalogList.save();
  }

  async addCatalogToList(addCatalogToListDto: AddCatalogToListDto): Promise<CatalogListDocument | null> {
    let catalogList: CatalogListDocument | null =null
    if (!addCatalogToListDto.catalogListId) {
      catalogList = await this.create();
    }
    else
    {
      catalogList = await this.findOne(addCatalogToListDto.catalogListId);
    }
    
    if (catalogList===null) {
      throw new NotFoundException('catalog list id not Found')
    }
    const nameExists = catalogList.catalogs.find((catalog) => catalog.name === addCatalogToListDto.catalogDto.name);
    if (nameExists) {
      throw new BadRequestException('name already used')
    }

    const catalog = await this.catalogService.create(addCatalogToListDto.catalogDto);
    if(addCatalogToListDto.isPrime) {
      catalogList.primeCatalogId = catalog._id;
    }

    catalogList.catalogs.push(catalog);
    await catalogList.save();
    return catalogList;
  }

  async deleteCatalogFromList(deleteCatalogFromListDto: DeleteCatalogFromListDto): Promise<CatalogListDocument | null> {
    const catalogList = await this.findOne(deleteCatalogFromListDto.catalogListId);
    if (!catalogList) {
      throw new NotFoundException('catalog list id not Found')
    }
    const catalogToDelete =await this.catalogService.findOne(deleteCatalogFromListDto.catalogId);

    if (!catalogToDelete) {
      throw new NotFoundException('catalog id not Found')
    }

    const index = catalogList.catalogs.findIndex((catalog) => catalog.name === catalogToDelete.name);
    if (index === -1) {
      throw new BadRequestException("catalog isn't not part of catalog lost" )
    }

    catalogList.catalogs.splice(index, 1);
    this.catalogService.delete(deleteCatalogFromListDto.catalogId);
    await catalogList.save();
    return catalogList;
  }


  async updateCatalogInList(updateCatalogInListDto: UpdateCatalogDto) {
    const catalogList = await this.findOne(updateCatalogInListDto.catalogListId);
    if (!catalogList) {
      throw new NotFoundException('User Role Not Found')
    }
    const updatedCatalog = await this.catalogService.update(updateCatalogInListDto.catalogId, updateCatalogInListDto.catalogDto);

    if (updateCatalogInListDto.isPrime)
      if (catalogList.primeCatalogId===null || catalogList.primeCatalogId.toString() !== updateCatalogInListDto.catalogId) {
      this.updatePrimeCatalog(updateCatalogInListDto.catalogListId, catalogList);
      
    }
    return updatedCatalog; 
  }
  async updatePrimeCatalog(primeCatalogId: string,catalogList:CatalogListDocument) {
    catalogList.primeCatalogId = new Types.ObjectId(primeCatalogId);
    await catalogList.save();

  }


}