import { SpaceIndex } from "../../../../core/space-index";
import { SQLTables } from "../table/tables";
import { SQLExtensionGenerator } from "./base";

export class PostgreSQL extends SQLExtensionGenerator {
  constructor(private readonly index: SpaceIndex) {
    super();
  }

  values(tables: SQLTables): string {
    let code = ``;

    for (const table of tables.tables) {
      const columns = table
        .columns()
        .map((c) => c.name())
        .join(", ");

      code += `INSERT INTO ${table.name()} (${columns})\n`;

      code += `VALUES\n`;

      const values = [] as string[];

      table.iterate((row) => {
        this.index.push();

        const v = row.map((v) => v.string()).join(", ");
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
      code += `CREATE TABLE ${table.name()} (\n`;

      const columns = table
        .columns()
        .map((column) => {
          let code = ``;

          this.index.push();

          code += this.index.create(`${column.name()} ${column.definition()}`);

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
            const table = ref.table.name();
            const col = ref.column.name();

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
