import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument  } from 'mongoose';


// Document interface for Catalog
export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {
  @Prop({
    required: true,
    match: /^[A-Za-z]+$/, 
  })
  name: string;

  @Prop({
    required: true,
    enum: ['general', 'home', 'fashion'], 
  })
  vertical: string;

  @Prop({
    type: [String], 
  })
  locales : string[];

  @Prop({
    type: Date, 
    default: null, 
  })
  indexedAt: Date | null;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
