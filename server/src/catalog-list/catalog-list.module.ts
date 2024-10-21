import { Module } from '@nestjs/common';
import { CatalogListService } from './catalog-list.service';
import { CatalogListController } from './catalog-list.controller';
import { CatalogList, CatalogListSchema } from './schemas/catalogList.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from '../catalog/catalog.module';
import { CatalogService } from '../catalog/catalog.service';
@Module({
  imports: [
    CatalogModule,
    MongooseModule.forFeature([{ name: CatalogList.name, schema: CatalogListSchema }])
  ],
  controllers: [CatalogListController],
  providers: [CatalogListService],
})
export class CatalogListModule {}
