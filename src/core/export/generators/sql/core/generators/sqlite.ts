import { SpaceIndex } from "../../../../core/space-index";
import { SQLTables } from "../table/tables";
import { SQLExtensionGenerator } from "./base";

export class SQLite extends SQLExtensionGenerator {
  constructor(private readonly index: SpaceIndex) {
    super();
  }

  values(tables: SQLTables): string {
    let code = ``;

    for (const table of tables.tables) {
      const columns = table
        .columns()
        .filter((c) => !c.disabled())
        .map((c) => c.name().sqlite)
        .join(", ");

      code += `INSERT INTO ${table.name().sqlite} (${columns})\n`;

      code += `VALUES\n`;

      const values = [] as string[];

      table.iterate((row) => {
        this.index.push();

        const v = row.map((v) => v.string().sqlite).join(", ");
        const rowCode = this.index.create(`(${v})`);
        values.push(rowCode);

        this.index.reverse();
      });

      code += `${values.join(",\n")};\n\n`;
    }

    return code;
  }

  tables(tables: SQLTables): string {
    // sqlite does not enforce foreign keys unless the pragma is enabled
    let code = `PRAGMA foreign_keys = ON;\n\n`;

    for (const table of tables.tables) {
      code += `CREATE TABLE ${table.name().sqlite} (\n`;

      const columns = table
        .columns()
        .filter((c) => !c.disabled())
        .map((column) => {
          let code = ``;

          this.index.push();

          code += this.index.create(
            `${column.name().sqlite} ${column.definition().sqlite}`,
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

          const ref = column.ref();
          if (ref !== null) {
            const table = ref.table.name().sqlite;
            const col = ref.column.name().sqlite;

            code += ` REFERENCES ${table}(${col})`;
          }

          this.index.reverse();

          return code;
        })
        .join(",\n");

      code += `${columns}` + "\n";

      code += `);\n\n`;
    }

    return code;
  }
}
