import { BadRequestException, Injectable } from "@nestjs/common";
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class TablesService {
  private supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  async getAllTables() {
    const { data: tables, error: tablesError } = await this.supabase.from('table_names').select('id, name');

    if (tablesError) throw new BadRequestException(tablesError.message);

    const result = await Promise.all(
      tables.map(async (table) => {
        const { data: rows, error: rowsError } = await this.supabase
          .from('itemsRows')
          .select('*')
          .eq('table_id', table.id)
          .order('item_number', { ascending: true });
        if (rowsError) throw new Error(rowsError.message);

        return {
          name: table.name,
          rows: rows,
        };
      }),
    );

    return result;
  }

  async updateItemRow(id: number, updateData: Record<string, any>) {
    console.log("updateData:",updateData);
    const { data, error } = await this.supabase.from('itemsRows').update(updateData).eq('id', id);
    if (error) throw new BadRequestException(error.message);
    console.log('good!:',data);
    return data;
  }
}
