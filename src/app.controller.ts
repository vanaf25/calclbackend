import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { entryPointDto } from './dto/calculation.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  create(@Body() createItemDto: entryPointDto) {
    return this.appService.calculate(createItemDto);
  }
  @Get()
  get() {
    return this.appService.getItems();
  }
}
