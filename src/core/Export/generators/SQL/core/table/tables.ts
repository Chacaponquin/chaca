import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";
import { SQLTable } from "./table";

export class SQLTables {
  readonly tables: SQLTable[];

  constructor(private readonly utils: ChacaUtils) {
    this.tables = [];
  }

  mergeTable(table: SQLTable) {
    const found = this.tables.find((t) => t.equal(table._name));

    if (found) {
      found.merge(table);
    } else {
      this.tables.push(table);
    }
  }

  add(table: SQLTable) {
    this.tables.push(table);
  }

  find(search: string): SQLTable | null {
    const name = new VariableName(this.utils, { name: search });
    const found = this.tables.find((t) => t.equal(name));

    return found ? found : null;
  }
}
