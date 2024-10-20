import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogListModule } from './catalog-list/catalog-list.module';

@Module({
  imports: [
            MongooseModule.forRoot('mongodb://syte:password@mongodb:27017/nestdb?authSource=admin'),
            CatalogModule,
            CatalogListModule
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
