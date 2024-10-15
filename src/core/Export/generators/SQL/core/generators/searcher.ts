import { SQLColumn } from "../table/column";
import { SQLTable } from "../table/table";
import { SQLTables } from "../table/tables";

interface ColumnProps {
  action(column: SQLColumn): void;
  search: { table: string; column: string };
}

interface TableProps {
  action(table: SQLTable): void;
  search: string;
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
        action(column);
      }
    }
  }
}
