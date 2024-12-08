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
  @Post('sheetSiding')
  sheetSiding(@Body() itemDto) {
    return this.appService.sheetSiding(itemDto);
  }
  @Post('soffit')
  soffit(@Body() itemDto) {
    return this.appService.soffit(itemDto);
  }
  @Post('pergolaShade')
  pergolaShade(@Body() itemDto) {
    return this.appService.pergolaShade(itemDto);
  }
  @Post('friezeBoard')
  friezeBoard(@Body() itemDto) {
    return this.appService.friezeBoard(itemDto);
  }
  @Post('plankSiding')
  plankSiding(@Body() itemDto) {
    return this.appService.plankSiding(itemDto);
  }
  @Post('fascia')
  fascia(@Body() itemDto) {
    return this.appService.fascia(itemDto);
  }
  @Post('stuccoWallCovering')
  stuccoWallCovering(@Body() itemDto) {
    return this.appService.stuccoWallCovering(itemDto);
  }
  @Post('brickWallCovering')
  brickWallCovering(@Body() itemDto) {
    return this.appService.brickWallCovering(itemDto);
  }
  @Post('porchCeiling')
  porchCeiling(@Body() itemDto) {
    return this.appService.porchCeiling(itemDto);
  }
  @Post('stairFraming')
  starFraming(@Body() itemDto) {
    return this.appService.starFraming(itemDto);
  }
  @Post('fencing')
  fencing(@Body() itemDto) {
    return this.appService.fencing(itemDto);
  }
  @Get()
  get() {
    return this.appService.getItems();
  }
}
