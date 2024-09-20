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
  @Post('walls')
  wallCalculator(@Body() itemDto) {
    return this.appService.wallCalculator(itemDto);
  }
  @Post('hotTubPad')
  hotTubPad(@Body() itemDto) {
    return this.appService.hotTubPad(itemDto);
  }
  @Post('laticalPanel')
  laticalPanel(@Body() itemDto) {
    return this.appService.laticalPanel(itemDto);
  }
  @Post('homeWrap')
  homeWrap(@Body() itemDto) {
    return this.appService.homeWrap(itemDto);
  }
  @Post('vinylSiding')
  vinylSiding(@Body() itemDto) {
    return this.appService.vinylSiding(itemDto);
  }
  @Post('corners')
  corners(@Body() itemDto) {
    return this.appService.corners(itemDto);
  }
  @Get()
  get() {
    return this.appService.getItems();
  }
}
