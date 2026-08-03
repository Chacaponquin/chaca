import { SpaceIndex } from "../../../../core/space-index";
import { SQLTables } from "../table/tables";
import { SQLExtensionGenerator } from "./base";

export class MySQL extends SQLExtensionGenerator {
  constructor(private readonly index: SpaceIndex) {
    super();
  }

  values(tables: SQLTables): string {
    let code = ``;

    for (const table of tables.tables) {
      const columns = table
        .columns()
        .filter((c) => !c.disabled())
        .map((c) => c.name().mysql)
        .join(", ");

      code += `INSERT INTO ${table.name().mysql} (${columns})\n`;

      code += `VALUES\n`;

      const values = [] as string[];

      table.iterate((row) => {
        this.index.push();

        const v = row.map((v) => v.string().mysql).join(", ");
        const rowCode = this.index.create(`(${v})`);
        values.push(rowCode);

        this.index.reverse();
      });

      code += `${values.join(",\n")};\n\n`;
    }

    return code;
  }

  tables(tables: SQLTables): string {
    let code = ``;

    for (const table of tables.tables) {
      code += `CREATE TABLE ${table.name().mysql} (\n`;

      const activeColumns = table.columns().filter((c) => !c.disabled());

      const lines = activeColumns.map((column) => {
        let code = ``;

        this.index.push();

        code += this.index.create(
          `${column.name().mysql} ${column.definition().mysql}`,
        );

        if (column.isKey()) {
          code += ` PRIMARY KEY`;
        } else {
          if (column.isUnique()) {
            code += ` UNIQUE`;
          }

          if (!column.isNull()) {
            code += ` NOT NULL`;
          }
        }

        this.index.reverse();

        return code;
      });

      // innodb ignores inline column REFERENCES clauses, so foreign keys
      // must be declared as table-level constraints
      for (const column of activeColumns) {
        const ref = column.ref();

        if (ref !== null) {
          this.index.push();

          const table = ref.table.name().mysql;
          const col = ref.column.name().mysql;

          lines.push(
            this.index.create(
              `FOREIGN KEY (${column.name().mysql}) REFERENCES ${table}(${col})`,
            ),
          );

          this.index.reverse();
        }
      }

      code += `${lines.join(",\n")}` + "\n";

      code += `);\n\n`;
    }

    return code;
  }
}
