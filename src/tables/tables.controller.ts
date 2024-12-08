import { Controller, Get, Put, Body, Param, Patch, Post, Delete } from "@nestjs/common";
import { TablesService } from './tables.service';
/*const Tables_Names={
  siding:"siding_measurements",
  items:"itemsRows",
  windows:"windows",
  doors:"doors",
}*/
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}
  @Get()
  async getAllTables() {
    return this.tablesService.getAllTables();
  }
  @Get('allRows/:type')
  async getTableOne(@Param('type') type: string) {
    return this.tablesService.getAllRowsByType(type);
  }
  @Delete(':tableId')
  async deleteTableById(@Param('tableId') tableId: number) {
    return await this.tablesService.deleteTableById(Number(tableId));
  }
  @Get('test/:type')
  async getTable2(@Param('type') type: string) {
    return this.tablesService.getTablesByType(type);
  }
  @Get(':type')
  async getTable(@Param('type') type: string) {
    return this.tablesService.getTablesByType(type);
  }

  @Put(':id')
  async updateItemRow(@Param('id') id: number, @Body() updateData: Record<string, any>) {
    return this.tablesService.updateCells(+id, updateData);
  }
  @Post("createTable")
  async createTable(@Body() tableData:any){
    return this.tablesService.createTableWithDetails(tableData)
  }
  @Patch(`updateCells/:id`)
  async updateCells(@Param('id') id: number, @Body() updateData:any) {
    return this.tablesService.updateCells(id, updateData);
  }
  @Patch('multiplies')
  async updateMultipliesRows(@Body() updateData: any[]) {
    return this.tablesService.updateTotalMathBatch(updateData);
  }
  @Patch(':id')
  async updateItemRow2(@Param('id') id: number, @Body() updateData: Record<string, any>) {
    return this.tablesService.updateItemRow2(+id, updateData);
  }
}
