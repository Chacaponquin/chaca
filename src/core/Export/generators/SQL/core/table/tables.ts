import { ChacaUtils } from "../../../../../utils";
import { TableName } from "../generators/names";
import { SQLTable } from "./table";

export class SQLTables {
  readonly tables: SQLTable[];

  constructor(private readonly utils: ChacaUtils) {
    this.tables = [];
  }

  search(name: TableName): SQLTable {
    const found = this.tables.find((t) => t.equal(name));

    if (found) {
      return found;
    } else {
      const newTable = new SQLTable(this.utils, name, true);
      this.tables.push(newTable);

      return newTable;
    }
  }

  add(table: SQLTable): SQLTable {
    const found = this.tables.find((t) => t.equal(table._name));

    if (!found) {
      this.tables.push(table);
      return table;
    } else {
      return found;
    }
  }

  find(search: TableName): SQLTable | null {
    const found = this.tables.find((t) => t.equal(search));

    return found ? found : null;
  }
}
