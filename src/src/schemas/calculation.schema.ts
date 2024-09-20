import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CalculationDocument = HydratedDocument<Calculator>;

@Schema()
export class Calculator {
  @Prop({ required: true })
  GBQ: number;
  @Prop({ required: true })
  DEQ: number;
  @Prop({ required: true })
  ZSQ: number;
  @Prop({ required: true })
  DFQ: number;
  @Prop({ required: true })
  DSQ: number;
  @Prop({ required: true })
  DBQ: number;
}
export const calculationSchema = SchemaFactory.createForClass(Calculator);
