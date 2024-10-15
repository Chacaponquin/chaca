import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";
import { SQLArray, SQLClass, SQLDatatype } from "../sql-types";
import { SQLColumn } from "./column";
import { SQLTable } from "./table";

export class SQLTables {
  readonly tables: SQLTable[];

  constructor(private readonly utils: ChacaUtils) {
    this.tables = [];
  }

  add(table: SQLTable) {
    this.tables.push(table);
  }

  find(search: string): SQLTable | null {
    const name = new VariableName(this.utils, { name: search });
    const found = this.tables.find((t) => t.equal(name));

    return found ? found : null;
  }

  addArray(a: SQLArray): SQLDatatype[] {
    const name = new VariableName(this.utils, {
      name: a.parent.string() + "Array",
    });
    const save = new SQLTable(this.utils, name, a.parent, true);

    for (let i = 0; i < a.values.length; i++) {
      const tuple = a.values[i];

      for (let j = 0; j < tuple.length; j++) {
        const name = new VariableName(this.utils, {
          name: j === 0 ? "value" : `value_${j}`,
        });
        const column = new SQLColumn(name, tuple[j], false);

        save.add(column);
      }
    }

    return this.mergeTable(save);
  }

  private mergeTable(save: SQLTable) {
    let found: SQLTable | undefined = undefined;

    for (const table of this.tables) {
      if (table.parent.equal(save.parent)) {
        table.merge(save);

        found = table;
      }
    }

    if (!found) {
      this.tables.push(save);
      return save.lastKeys();
    } else {
      return found.lastKeys();
    }
  }

  addClass(c: SQLClass): SQLDatatype[] {
    const save = new SQLTable(this.utils, c._name, c.parent, false);

    for (const field of c.fields) {
      for (let i = 0; i < field.datatype.length; i++) {
        const datatype = field.datatype[i];

        const column = new SQLColumn(field._name, datatype, false);
        save.add(column);
      }
    }

    return this.mergeTable(save);
  }
}
