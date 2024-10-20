import { Injectable } from '@nestjs/common';
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
    console.log("addCatalogToListDto")
    console.log(addCatalogToListDto)
    if (!addCatalogToListDto.catalogListId) {
      catalogList = await this.create();
      console.log("created")
    }
    else
    {
      catalogList = await this.findOne(addCatalogToListDto.catalogListId);
      console.log("n")
    }
    
    if (catalogList===null) {
      console.log(catalogList)
      throw new Error('Catalog list not found');
    }
    const nameExists = catalogList.catalogs.find((catalog) => catalog.name === addCatalogToListDto.catalogDto.name);
    if (nameExists) {
      throw new Error('Catalog name already exists');
    }


    console.log("my dto:"+ addCatalogToListDto.catalogDto)
    const catalog = await this.catalogService.create(addCatalogToListDto.catalogDto);
    console.log("created catalog"+ catalog)
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
      return null;
    }
    const catalogToDelete =await this.catalogService.findOne(deleteCatalogFromListDto.catalogId);

    if (!catalogToDelete) {
      return null;
    }

    const index = catalogList.catalogs.findIndex((catalog) => catalog.name === catalogToDelete.name);
    if (index === -1) {
      throw new Error('Catalog not found in list');
    }

    catalogList.catalogs.splice(index, 1);
    this.catalogService.delete(deleteCatalogFromListDto.catalogId);
    await catalogList.save();
    return catalogList;
  }


  async updateCatalogInList(updateCatalogInListDto: UpdateCatalogDto) {
    console.log((updateCatalogInListDto.catalogListId))
    const catalogList = await this.findOne(updateCatalogInListDto.catalogListId);
    if (!catalogList) {
      console.log("catalog list not found")
      return null;
    }
    console.log("updateCatalogInListDto.catalogDto")
    console.log(updateCatalogInListDto.catalogDto)
    const updatedCatalog = await this.catalogService.update(updateCatalogInListDto.catalogId, updateCatalogInListDto.catalogDto);

    if (updateCatalogInListDto.isPrime && catalogList.primeCatalogId.toString() !== updateCatalogInListDto.catalogId) {
      this.updatePrimeCatalog(updateCatalogInListDto.catalogListId, catalogList);
      
    }
    return updatedCatalog; 
  }
  async updatePrimeCatalog(primeCatalogId: string,catalogList:CatalogListDocument) {
    catalogList.primeCatalogId = new Types.ObjectId(primeCatalogId);
    await catalogList.save();

  }


  // async setPrime(setPrimeDto: SetPrimeDto): Promise<CatalogListDocument | null> {
  //   const catalogList = await this.findOne(setPrimeDto.catalogListId);
  //   const catalog = await this.catalogService.findOne(setPrimeDto.catalogId);
  //   if (!catalogList || !catalog) {
  //     return null;
  //   }

  //   const index = catalogList.catalogs.findIndex((catalog) => catalog.name === catalog.name);
  //   // catalog not in list
  //   if (index === -1) {
  //     return null;
  //   }

  //   catalogList.primeCatalogId =new Types.ObjectId(setPrimeDto.catalogId);

  //   await catalogList.save();
  //   return catalogList;
  // }


}