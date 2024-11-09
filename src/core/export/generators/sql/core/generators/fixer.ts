import { ChacaUtils } from "../../../../../utils";
import { SQLTables } from "../table/tables";
import { ColumnName, TableName } from "./names";
import { Route } from "./route";
import { Searcher } from "./searcher";

export interface RefColumnParser {
  column: string;
  ref: string;
}

interface Props {
  refs: RefColumnParser[];
  nulls: string[];
  keys: string[];
  uniques: string[];
}

export class TablesFixer {
  private readonly refs: RefColumnParser[];
  private readonly nulls: string[];
  private readonly keys: string[];
  private readonly uniques: string[];

  constructor(
    private readonly utils: ChacaUtils,
    { keys, nulls, refs, uniques }: Props,
  ) {
    this.keys = keys;
    this.refs = refs;
    this.nulls = nulls;
    this.uniques = uniques;
  }

  fixRefFields(tables: SQLTables): void {
    const searcher = new Searcher(tables);

    for (const ref of this.refs) {
      const refRoute = Route.from(ref.ref);
      const route = Route.from(ref.column);

      const tableName = new TableName(this.utils, route.parent());
      const refTableName = new TableName(this.utils, refRoute.parent());

      searcher.column({
        search: { table: refTableName, column: refRoute.name() },
        action(refColumn, refTable) {
          searcher.column({
            search: { column: route.name(), table: tableName },
            action(column) {
              column.setRef({ column: refColumn, table: refTable });
            },
          });
        },
      });
    }
  }

  fixColumnNames(tables: SQLTables): void {
    for (const table of tables.tables) {
      for (const column of table.columns().filter((c) => !c.disabled())) {
        let stop = false;

        while (!stop) {
          const found = table
            .columns()
            .filter((c) => !c.disabled())
            .find((c) => c !== column && c.equal(column._name));

          if (found) {
            const name = new ColumnName(this.utils, `${column.name()}_1`);
            column.setName(name);
          } else {
            stop = true;
          }
        }
      }
    }
  }

  fixTableNames(tables: SQLTables): void {
    for (const table of tables.tables) {
      let stop = false;

      while (!stop) {
        const found = tables.tables.find(
          (t) => t !== table && t.equal(table._name),
        );

        if (found) {
          const name = table._name.create("_1");
          table.setName(name);
        } else {
          stop = true;
        }
      }
    }
  }

  isKey(table: TableName, name: ColumnName): boolean {
    return this.keys.some((k) => {
      const route = Route.from(k);

      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());

      return n.equal(name) && t.equal(table);
    });
  }

  isUnique(table: TableName, name: ColumnName): boolean {
    return this.uniques.some((k) => {
      const route = Route.from(k);

      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());

      return n.equal(name) && t.equal(table);
    });
  }

  isNull(table: TableName, name: ColumnName): boolean {
    return this.nulls.some((k) => {
      const route = Route.from(k);

      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());

      return n.equal(name) && t.equal(table);
    });
  }
}
