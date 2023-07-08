import { ExportSQLFormat } from "../../../../core/interfaces/export.interface.js";
import { ChacaError } from "../../../../errors/ChacaError.js";
import { SQLTable } from "../table/SQLTable.js";
import {
  ColumnForeignKeyConfig,
  SQLTableColumn,
} from "../table/SQLTableColumn.js";

export class SQLDataGenerator {
  constructor(
    private readonly sqlExtension: ExportSQLFormat,
    private readonly sqlTables: Array<SQLTable>,
  ) {}

  public getData(): string {
    if (this.sqlExtension === "postgresql") {
      const generator = new PostgreSQL();

      return (
        generator.createTablesString(this.sqlTables) +
        generator.createTableDataString(this.sqlTables)
      );
    } else {
      throw new ChacaError(`Not sql extension specified`);
    }
  }
}

export abstract class SQLExtensionGenerator {
  public abstract createTableDataString(tables: Array<SQLTable>): string;
  public abstract createTablesString(tables: Array<SQLTable>): string;
}

export class PostgreSQL extends SQLExtensionGenerator {
  public createTablesString(tables: Array<SQLTable>): string {
    let code = "";

    tables.forEach((table) => {
      const primaryKeys = [] as Array<SQLTableColumn>;
      const foreingKeys = [] as Array<SQLTableColumn>;

      code += `CREATE TABLE ${table.getSQLTableName()}(\n`;

      // create all values definition
      table.getColumns().forEach((column, index) => {
        const columnType = column.getColumnType();

        if (column.isPrimaryKey()) {
          primaryKeys.push(column);
        }

        if (column.isForeignKey()) {
          foreingKeys.push(column);
        }

        code += `\t${column.getSQLColumnName()} ${columnType.getSQLDefinition()}`;

        if (!column.posibleNull()) {
          code += ` NOT NULL`;
        }

        if (
          index === table.getColumns().length - 1 &&
          primaryKeys.length === 0 &&
          foreingKeys.length === 0
        ) {
          code += "\n";
        } else {
          code += ",\n";
        }
      });

      // define primary and foreing keys
      if (primaryKeys.length) {
        code += `\tPRIMARY KEY (${primaryKeys
          .map((p) => p.getSQLColumnName())
          .join(", ")})`;

        if (foreingKeys.length === 0) {
          code += "\n";
        } else {
          code += `,\n`;
        }
      }

      // definir foreign keys
      if (foreingKeys.length) {
        foreingKeys.forEach((f, index) => {
          const fColumn = f.isForeignKey() as ColumnForeignKeyConfig;

          code += `\tFOREIGN KEY (${f.getSQLColumnName()}) REFERENCES ${
            fColumn.table.tableName
          } (${fColumn.column.getSQLColumnName()})`;

          if (index === foreingKeys.length - 1) {
            code += "\n";
          } else {
            code += ",\n";
          }
        });
      }

      code += ");\n\n";
    });

    return code;
  }

  public createTableDataString(tables: Array<SQLTable>): string {
    let data = "";

    tables.forEach((table) => {
      const tablesData = table.getTableMatrixData();

      tablesData.forEach((d) => {
        data += `INSERT INTO ${table.getSQLTableName()} VALUES (`;
        data += d.map((t) => t.getSQLValue()).join(", ");
        data += `);\n`;
      });
    });

    return data;
  }
}
