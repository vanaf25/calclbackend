import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Calculation } from '../../schemas/calculation.schema';

export type ProductDocument = HydratedDocument<Calculation>;
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
}
export const productSchema = SchemaFactory.createForClass(Product);
