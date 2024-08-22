import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalculationDocument, Calculation } from './schemas/calculation.schema';
import { entryPointDto } from './dto/calculation.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Calculation.name)
    private itemModel: Model<CalculationDocument>,
  ) {}
  async calculate(data: entryPointDto) {
    const L = +data.L;
    const O = +data.O;
    const D = +data.D;
    //Flasing Quanity;
    //const J= L / 10
    //Downspout Section Quantity
    const M1 = O * D;
    const M2 = Math.round(M1);
    const M = M2 / 10;
    //Downspout Bracket Quantity
    const B = Math.round(M * 2.2);
    //Downspout Fastener Quantity
    const T = B * 4;
    //Gutter Bracket Quantity
    const GBQ = L / 1.3;
    // Downspout Extension Quantity
    const DEQ = Math.round((O * 2) / 10);
    //Zip Screw Quantity
    const ZSQ = M * 12 + L + T;
    const createdItem = new this.itemModel({
      ZSQ,
      DEQ,
      GBQ,
      DFQ: T,
      DBQ: B,
      DSQ: M,
    });
    return createdItem.save();
  }
  /*async create(calculation: CreateCalculationDto) {
    const createdItem = new this.itemModel(calculation);
    return createdItem.save();
  }*/
  async getItems() {
    return this.itemModel.find().exec();
  }
}
