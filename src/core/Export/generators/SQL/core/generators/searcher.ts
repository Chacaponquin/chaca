import { SQLColumn } from "../table/column";
import { SQLTable } from "../table/table";
import { SQLTables } from "../table/tables";
import { TableName } from "./names";

interface ColumnProps {
  action(column: SQLColumn, table: SQLTable): void;
  search: { table: TableName; column: string };
}

interface TableProps {
  action(table: SQLTable): void;
  search: TableName;
}

export class Searcher {
  constructor(private readonly tables: SQLTables) {}

  table({ action, search }: TableProps): void {
    const table = this.tables.find(search);

    if (table) {
      action(table);
    }
  }

  column({ search, action }: ColumnProps): void {
    const table = this.tables.find(search.table);

    if (table) {
      const column = table.find(search.column);

      if (column) {
        action(column, table);
      }
    }
  }
}
