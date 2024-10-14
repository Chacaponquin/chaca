import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";
import { SQLArray, SQLClass } from "../sql-types";
import { SQLColumn } from "./column";
import { SQLTable } from "./table";

export class SQLTables {
  private readonly tables: SQLTable[];

  constructor(private readonly utils: ChacaUtils) {
    this.tables = [];
  }

  addArray(a: SQLArray): void {
    const name = new VariableName(this.utils, { name: a.parent.string() });
    const save = new SQLTable(name, a.parent);
  }

  addClass(c: SQLClass): void {
    const save = new SQLTable(c._name, c.parent);

    for (const field of c.fields) {
      const column = new SQLColumn(field._name, field.datatype);
      save.add(column);
    }

    let found = false;
    for (const c of this.tables) {
      if (c.parent.equal(save.parent)) {
        c.merge(save);

        found = true;
      }
    }

    if (!found) {
      this.tables.push(save);
    }
  }

  string(): string {
    return "";
  }
}
