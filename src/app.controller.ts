import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCalculationDto } from './dto/calculation.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  create(@Body() createItemDto: CreateCalculationDto) {
    return this.appService.create(createItemDto);
  }
  @Get()
  get() {
    return this.appService.getItems();
  }
}
