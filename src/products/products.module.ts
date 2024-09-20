import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
