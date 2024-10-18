import { SQLTables } from "../table/tables";
import { SQLExtensionGenerator } from "./base";

export class PostgreSQL extends SQLExtensionGenerator {
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
        const v = row.map((v) => v.string()).join(", ");
        const rowCode = `   (${v})`;
        values.push(rowCode);
      });

      code += `${values.join(",\n")}\n\n`;
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

          code += `   ${column.name()} ${column.definition()}`;

          if (column.isKey()) {
            code += ` PRIMARY KEY`;
          }

          if (!column.isNull() && !column.isKey()) {
            code += ` NOT NULL`;
          }

          const ref = column.ref();
          if (ref !== null) {
            const table = ref.table.name();
            const col = ref.column.name();

            code += ` REFERENCES ${table}(${col})`;
          }

          return code;
        })
        .join(",\n");

      code += `${columns}` + "\n";

      code += `)\n\n`;
    }

    return code;
  }
}
