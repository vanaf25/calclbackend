import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalculationDocument, Calculation } from './schemas/calculation.schema';
import { CreateCalculationDto } from './dto/calculation.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Calculation.name)
    private itemModel: Model<CalculationDocument>,
  ) {}
  async create(calculation: CreateCalculationDto) {
    const createdItem = new this.itemModel(calculation);
    return createdItem.save();
  }
  async getItems() {
    return this.itemModel.find().exec();
  }
}
