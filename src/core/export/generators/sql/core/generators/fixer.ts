import {
  InputTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../../../../input-tree/core";
import { ChacaUtils } from "../../../../../utils";
import { SQLTables } from "../table/tables";
import { ColumnName, TableName } from "./names";
import { Route } from "./route";
import { Searcher } from "./searcher";

interface Props {
  refs: RefValueNode[];
  nulls: InputTreeNode[];
  keys: KeyValueNode[];
}

export class TablesFixer {
  private readonly refs: RefValueNode[];
  private readonly nulls: InputTreeNode[];
  private readonly keys: KeyValueNode[];

  constructor(
    private readonly utils: ChacaUtils,
    { keys, nulls, refs }: Props,
  ) {
    this.keys = keys;
    this.refs = refs;
    this.nulls = nulls;
  }

  fixRefFields(tables: SQLTables): void {
    const searcher = new Searcher(tables);

    for (const ref of this.refs) {
      const name = ref.getName();

      const refNode = ref.getRefFieldRoute();
      const refName = refNode.name();

      const tableName = new TableName(
        this.utils,
        new Route(ref.getFieldRoute().parent().array()),
      );
      const refTableName = new TableName(
        this.utils,
        new Route(refNode.parent().array()),
      );

      searcher.column({
        search: { table: refTableName, column: refName },
        action(refColumn, refTable) {
          searcher.column({
            search: { column: name, table: tableName },
            action(column) {
              if (ref.isUnique()) {
                column.setUnique(true);
              }

              column.setRef({ column: refColumn, table: refTable });
            },
          });
        },
      });
    }
  }

  fixColumnNames(tables: SQLTables): void {
    for (const table of tables.tables) {
      for (const column of table.columns()) {
        let stop = false;

        while (!stop) {
          const found = table
            .columns()
            .find((c) => c !== column && c.equal(column._name));

          if (found) {
            const name = new ColumnName(this.utils, `${column.name()}_1`, 0);
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
      const n = new ColumnName(this.utils, k.getName(), 0);
      const t = new TableName(
        this.utils,
        new Route(k.getFieldRoute().parent().array()),
      );

      return n.equal(name) && t.equal(table);
    });
  }

  isNull(table: TableName, name: ColumnName): boolean {
    return this.nulls.some((k) => {
      const n = new ColumnName(this.utils, k.getName(), 0);
      const t = new TableName(
        this.utils,
        new Route(k.getFieldRoute().parent().array()),
      );

      return n.equal(name) && t.equal(table);
    });
  }
}
