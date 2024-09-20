import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { calculationSchema, Calculator } from './schemas/calculation.schema';

const uri =
  'mongodb+srv://vanayfefilov777:P27qqg60oh@cluster0.nddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      { name: Calculator.name, schema: calculationSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
