import { BadRequestException, Injectable } from "@nestjs/common";
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class TablesService {
  private supabase =
    createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  async getTablesNames(name:string){
    const { data: tables, error: tablesError } = await this.supabase
      .from('tables')
      .select('id, name')
      .eq('type', name);
    if (tablesError) throw new BadRequestException(tablesError.message);
    return tables
  }
  async getAllTables(type="item",tableName="itemsRows") {
   const tables=await this.getTablesNames(type)
    const result = await Promise.all(
      tables.map(async (table) => {
        const { data: rows, error: rowsError } = await this.supabase
          .from(tableName)
          .select('*')
          .eq('table_id', table.id)
          .order('id', { ascending: true });
        if (rowsError) throw new Error(rowsError.message);
        return {
          name: table.name,
          rows: rows,
        };
      }),
    );
    return result;
  }
  async updateItemRow(id: number, updateData: Record<string, any>,databaseType:string) {
    console.log('tableName:',databaseType);
    updateData.databaseType=undefined
    const { data, error } = await this.supabase.from(databaseType).update(updateData).eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return data;
  }
  async updateItemRow2(id: number, updateData: Record<string, any>)
  {
    const { data, error } =
      await this.supabase.from('cells')
        .update(updateData).eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return data;
  }
  async createTableWithDetails(data: any) {
    const { name, group, columns, rows } = data;
    console.log('group:',group);
    const { data: tableData, error: tableError } = await this.supabase
      .from('tables')
      .insert({ name, type: group })
      .select();

    if (tableError) {
      throw new Error(`Failed to create table: ${tableError.message}`);
    }
    const tableId = tableData[0].id;

    // Step 2: Insert columns for the table
    const columnsData = columns.map((field: string) => ({
      field,
      table_id: tableId,
    }));

    const { data: columnData, error: columnError } = await this.supabase
      .from('columns')
      .insert(columnsData)
      .select();

    if (columnError) {
      throw new Error(`Failed to create columns: ${columnError.message}`);
    }

    // Map column fields to their IDs for easy lookup
    const columnIdMap = columnData.reduce((map, col) => {
      map[col.field] = col.id;
      return map;
    }, {});

    // Step 3: Insert rows and cells
    for (const row of rows) {
      const { data: rowData, error: rowError } = await this.supabase
        .from('rows')
        .insert({ table_id: tableId })
        .select();

      if (rowError) {
        throw new Error(`Failed to create row: ${rowError.message}`);
      }
      const rowId = rowData[0].id;

      // Step 4: Insert cells for each column in the row
      const cellsData = Object.entries(row).map(([field, value]) => ({
        row_id: rowId,
        column_id: columnIdMap[field],
        value,
      }));

      const { error: cellsError } = await this.supabase
        .from('cells')
        .insert(cellsData);

      if (cellsError) {
        throw new Error(`Failed to create cells: ${cellsError.message}`);
      }
    }

    return { tableId, message: 'Table created successfully with columns, rows, and cells.' };
  }
  async updateCells(id:number,data:any){
    console.log('id:',id);
    const { data:row } = await this.supabase
      .from('rows')  // Specify your table name
      .select('*')         // Select all columns, or specify specific columns if needed
      .eq('id', id)        // Filter where id matches
      .single();
    if(!row) throw new BadRequestException(`Row with id ${id}  this doesn't exist!`)
    const fields=Object.keys(data);
    const { data:cells } = await this.supabase
      .from('cells')
      .select('*')
      .eq('row_id', row.id);
    for (const cell of cells) {
     const {data:column  }:{data:any}= await this.supabase
        .from('columns')
        .select('*')
        .eq('id', cell.column_id).single();
        if(fields.includes(column.field)){
          const newValue=data[column.field]
          const  {error}= await this.supabase
            .from('cells')  // Specify the table name
            .update({value:newValue})          // Provide the updated data as an object
            .eq('id', cell.id).single();
          if(error) throw new BadRequestException(`Some error occurred! on ${column.field}`)
        }
    }
    return {message:"Updates applied!"}
  }
  async getTablesByType(type: string): Promise<any> {
    const tables =await this.getTablesNames(type)
    const result = await Promise.all(
      tables.map(async (table) => {
        // Fetch rows for each table
        const { data: rows, error: rowError } = await this.supabase
          .from('rows')
          .select('*')
          .eq('table_id', table.id);

        if (rowError) {
          throw new BadRequestException(` error on rows${rowError.message}`);
        }

        // Fetch values for each row
        const rowsWithItems = await Promise.all(
          rows.map(async (row) => {
            const { data: items, error: itemError } = await this.supabase
              .from('cells')
              .select('*')
              .eq('row_id', row.id);
            if (itemError) {
              throw new BadRequestException(`error on cells ${itemError.message}`);
            }
            // Map items to include the field from the column table
            const obj={}
            await Promise.all(
              items.map(async (item) => {
                const { data: columns, error: columnError } = await this.supabase
                  .from('columns') // Adjust this table name to match your schema
                  .select('field')
                  .eq('id', item.column_id) // Assuming `column_id` is the correct reference
                  .single(); // Get a single column since we're filtering by id
                if (columnError) {
                  console.log('error:',columnError);
                  throw new BadRequestException(`error on column ${columnError.message}`);
                }
                const parsedValue=+item.value
                obj[columns.field]=item.value!==null ? isNaN(parsedValue) ? item.value:parsedValue:null
              }),
            );
            return {
              ...row,
              ...obj,
              table_id:undefined
            };
          }),
        );

        return {
          tableName: table.name,
          rows: rowsWithItems,
        };
      }),
    );
    return result;
  }
  async getAllRowsByType(type:string){
    const result=await this.getTablesByType(type);
    const array=[]
    result.forEach(r=>{
      r.rows.forEach(r=>array.push(r));
    })
    return array;
  }
  async updateTotalMathBatch(updates:any[]): Promise<any[]> {
    const updatePromises = updates.map(async (update) => {
      const { id, value } = update;
      const { error } = await this.supabase
        .from('totalMath')
        .update({ value })
        .eq('id', id);
      if (error) throw new Error(`Failed to update row with id ${id}: ${error.message}`);
      return { id, status: 'updated' };
    });

    // Wait for all updates to complete
    return await Promise.all(updatePromises);
  }
  async deleteTableById(tableId: number) {
    // Step 1: Delete cells for rows associated with this table
    const { data: rowIds, error: rowIdsError } = await this.supabase
      .from('rows')
      .select('id')
      .eq('table_id', tableId);

    if (rowIdsError) {
      throw new Error(`Failed to fetch rows: ${rowIdsError.message}`);
    }

    const rowIdList = rowIds.map(row => row.id);

    if (rowIdList.length > 0) {
      const { error: cellsError } = await this.supabase
        .from('cells')
        .delete()
        .in('row_id', rowIdList);

      if (cellsError) {
        throw new Error(`Failed to delete cells: ${cellsError.message}`);
      }
    }

    // Step 2: Delete rows associated with this table
    const { error: rowsError } = await this.supabase
      .from('rows')
      .delete()
      .eq('table_id', tableId);

    if (rowsError) {
      throw new Error(`Failed to delete rows: ${rowsError.message}`);
    }

    // Step 3: Delete columns associated with this table
    const { error: columnsError } = await this.supabase
      .from('columns')
      .delete()
      .eq('table_id', tableId);

    if (columnsError) {
      throw new Error(`Failed to delete columns: ${columnsError.message}`);
    }

    // Step 4: Delete the table itself
    const { error: tableError } = await this.supabase
      .from('tables')
      .delete()
      .eq('id', tableId);

    if (tableError) {
      throw new Error(`Failed to delete table: ${tableError.message}`);
    }

    return { message: `Table with ID ${tableId} and all related data have been deleted.` };
  }
}

