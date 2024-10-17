import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";
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
      const newTable = new SQLTable(this.utils, name, false);
      this.tables.push(newTable);

      return newTable;
    }
  }

  add(table: SQLTable) {
    const found = this.tables.find((t) => t.equal(table._name));

    if (!found) {
      this.tables.push(table);
    }
  }

  find(search: string): SQLTable | null {
    const name = new VariableName(this.utils, { name: search });
    const found = this.tables.find((t) => t.equal(name));

    return found ? found : null;
  }
}
