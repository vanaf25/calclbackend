import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  async getAllTables() {
    return this.tablesService.getAllTables();
  }

  @Put(':id')
  async updateItemRow(@Param('id') id: number, @Body() updateData: Record<string, any>) {
    console.log('id:',id);
    return this.tablesService.updateItemRow(+id, updateData);
  }
}
