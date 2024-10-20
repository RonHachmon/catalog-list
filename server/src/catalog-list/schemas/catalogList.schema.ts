import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Types  } from 'mongoose';
import { Catalog } from '../../catalog/schemas/catalog.schema'; // Import the Catalog schema
import * as mongoose from 'mongoose';
// Document interface for CatalogList
export type CatalogListDocument = HydratedDocument<CatalogList>;

@Schema()
export class CatalogList {


@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Catalog' }] })
  catalogs: Catalog[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Catalog',
  })
  primeCatalogId: Types.ObjectId;
}

export const CatalogListSchema = SchemaFactory.createForClass(CatalogList);