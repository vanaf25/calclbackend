import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const createdItem = new this.productModel(createProductDto);
    return createdItem.save();
  }
  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    console.log('!!');
    const item = await this.productModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedItem = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return updatedItem;
  }

  async remove(id: string) {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
  }
}
