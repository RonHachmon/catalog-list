import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogDto } from '../shared/dto/catalog.dto';
import { Catalog } from './schemas/catalog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class CatalogService {

    constructor(@InjectModel(Catalog.name) private readonly catalogModel: Model<Catalog>) {}

    async findOne(id: string)  {
        const catalog = await this.catalogModel.findById(id);
        return catalog;
    }
    async create(catalog:CatalogDto) {
        console.log("creating catalog")
        console.log(catalog)
        let newCatalog = new this.catalogModel({
            name: catalog.name,
            vertical: catalog.vertical,
            locales: catalog.locales,
            indextedAt: null
        });
        newCatalog =await newCatalog.save();
        return newCatalog
    }
    async delete(id: string) {
        const deleted = await this.catalogModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new NotFoundException();
        }
    }


    async update(id: string, catalog: CatalogDto) {

        const updated = await this.catalogModel.findByIdAndUpdate(id, catalog, { new: true });
        if (!updated) {
            throw new NotFoundException();
        }
        return updated;
    }
    async runIndexing(id: string) {
        const catalog = await this.findOne(id);
        if (!catalog) {
            throw new NotFoundException();
        }
        
        catalog.indexedAt = new Date();
        await catalog.save();
        
    }
    
}
