import { ChacaSchema } from "../../core/classes/ChacaSchema/ChacaSchema.js";
import {
  KeyFieldResolver,
  RefFieldResolver,
} from "../../core/classes/Resolvers/index.js";
import { SchemaResolver } from "../../core/classes/SchemaResolver.js";
import { FileConfig } from "../../core/interfaces/export.interface.js";
import { ResolverObject } from "../../core/interfaces/schema.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator.js";
import {
  SQLBoolean,
  SQLDate,
  SQLNumber,
  SQLString,
  SQLNull,
} from "./classes/sqlTypes/index.js";
import { SQLTable, SQLTableColumn } from "./classes/table/index.js";
import {
  ArrayType,
  BooleanType,
  DataType,
  DateType,
  NullType,
  NumberType,
  ObjectType,
  StringType,
} from "./classes/types/index.js";
import fs from "fs";
import { ColumnForeignKeyConfig } from "./classes/table/SQLTableColumn.js";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];

  constructor(data: any, config: FileConfig) {
    super(data, "sql", config);

    if (Array.isArray(this.data)) {
      this.sqlData = this.data;
    } else {
      this.sqlData = [this.data];
    }
  }

  private filterTypeByValue(
    parentTable: SQLTable,
    fieldName: string | null,
    value: DataType,
    sqlTables: Array<SQLTable>,
  ): void {
    if (value instanceof StringType) {
      const type = new SQLString(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
        // add new id to array table
        parentTable.addNewID();
      }
    } else if (value instanceof NumberType) {
      const type = new SQLNumber(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
        // add new id to array table
        parentTable.addNewID();
      }
    } else if (value instanceof BooleanType) {
      const type = new SQLBoolean(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
        // add new id to array table
        parentTable.addNewID();
      }
    } else if (value instanceof DateType) {
      const type = new SQLDate(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
        // add new id to array table
        parentTable.addNewID();
      }
    } else if (value instanceof NullType) {
      const type = new SQLNull();

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
        // add new id to array table
        parentTable.addNewID();
      }
    } else if (value instanceof ArrayType) {
      if (fieldName) {
        const arrayTableName = this.createTableNameByParent(
          parentTable,
          fieldName,
        );

        const arrayTable = this.createNewTable(arrayTableName, sqlTables);

        value.getValues().forEach((v) => {
          this.filterTypeByValue(arrayTable, null, v, sqlTables);
        });

        const parentIDColumnName =
          this.createArrayTableForeignKeyColumnName(parentTable);

        for (let row = 0; row < arrayTable.getTableLenght(); row++) {
          arrayTable.addColumnValue(
            parentIDColumnName,
            parentTable.getLastID(),
          );
        }

        // change column config to foreing key and primary
        arrayTable.changeColumnToForeignKey(parentIDColumnName, {
          column: parentTable.getPrimaryKeyColumn(),
          table: parentTable,
        });
      } else {
        value.getValues().forEach((v) => {
          this.filterTypeByValue(parentTable, null, v, sqlTables);
        });
      }
    } else if (value instanceof ObjectType) {
      if (fieldName) {
        const objectTableName = this.createTableNameByParent(
          parentTable,
          fieldName,
        );

        const objectTable = this.createNewTable(objectTableName, sqlTables);

        // add new id in object table
        objectTable.addNewID();

        value.getKeys().forEach((k) => {
          this.filterTypeByValue(objectTable, k.key, k.dataType, sqlTables);
        });

        // add foreign key in parent table
        parentTable.addColumnValue(fieldName, objectTable.getLastID());
        parentTable.changeColumnToForeignKey(fieldName, {
          table: objectTable,
          column: objectTable.getPrimaryKeyColumn(),
        });
      } else {
        value.getKeys().forEach((k) => {
          this.filterTypeByValue(parentTable, k.key, k.dataType, sqlTables);
        });

        // add new id to array table
        parentTable.addNewID();
      }
    }
  }

  private createNewTable(
    tableName: string,
    allTables: Array<SQLTable>,
  ): SQLTable {
    const foundTable = allTables.find((t) => t.tableName === tableName);

    if (foundTable) {
      return foundTable;
    } else {
      const newTable = new SQLTable(tableName);
      allTables.push(newTable);
      return newTable;
    }
  }

  private createArrayTableForeignKeyColumnName(parentTable: SQLTable): string {
    return `${parentTable.tableName}`;
  }

  private createTableNameByParent(
    parentTable: SQLTable,
    fieldName: string,
  ): string {
    return `${parentTable.tableName}_${fieldName}`;
  }

  private createData(tableName: string, data: any): Array<SQLTable> {
    // create sql tables
    const sqlTables: Array<SQLTable> = [];
    const objectTypes: Array<ObjectType> = [];

    // create object types
    for (let i = 0; i < data.length; i++) {
      const objectData = data[i];

      if (
        typeof objectData === "object" &&
        objectData !== null &&
        !Array.isArray(objectData)
      ) {
        const type = DataType.filterTypeByValue(objectData) as ObjectType;
        objectTypes.push(type);
      } else {
        throw new ChacaError("Your data must be an array of equal objects");
      }
    }

    // validate objects are equal
    if (objectTypes.length) {
      const firstObject = objectTypes[0];

      for (let i = 1; i < objectTypes.length; i++) {
        if (!firstObject.equal(objectTypes[i])) {
          throw new ChacaError(`Your data must be an array of equal objects`);
        }
      }
    }

    if (objectTypes.length) {
      for (let i = 0; i < objectTypes.length; i++) {
        const documentTable = this.createNewTable(tableName, sqlTables);

        // add new id to document table
        documentTable.addNewID();

        objectTypes[i].getKeys().forEach((f) => {
          this.filterTypeByValue(documentTable, f.key, f.dataType, sqlTables);
        });
      }
    }

    return sqlTables;
  }

  private findTableByName(
    tables: Array<SQLTable>,
    tableName: string,
  ): SQLTable {
    const foundTable = tables.find(
      (t) => t.tableName === tableName,
    ) as SQLTable;

    return foundTable;
  }

  public createTablesString(tables: Array<SQLTable>): string {
    let code = "";

    tables.forEach((table) => {
      const primaryKeys = [] as Array<SQLTableColumn>;
      const foreingKeys = [] as Array<SQLTableColumn>;

      code += `CREATE TABLE ${table.tableName}(\n`;

      // create all values definition
      table.getColumns().forEach((column, index) => {
        const columnType = column.getColumnType();

        if (column.isPrimaryKey()) {
          primaryKeys.push(column);
        } else if (column.isForeignKey()) {
          foreingKeys.push(column);
        }

        code += `\t${column.columnName} ${columnType.getSQLDefinition()}`;

        if (!column.posibleNull) {
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
          .map((p) => p.columnName)
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

          code += `\tFOREIGN KEY (${f.columnName}) REFERENCES ${fColumn.table.tableName} (${fColumn.column.columnName})`;

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
        data += `INSERT INTO ${table.tableName} VALUES (`;
        data += d.map((t) => t.getSQLValue()).join(", ");
        data += `);\n`;
      });
    });

    return data;
  }

  public async generateFile(): Promise<string> {
    const tables = this.createData(this.config.fileName, this.sqlData);

    await fs.promises.writeFile(
      this.route,
      this.createTablesString(tables) + this.createTableDataString(tables),
      "utf-8",
    );

    return this.route;
  }

  public async generateRelationalDataFile(
    data: any,
    resolvers: Array<SchemaResolver>,
  ): Promise<string> {
    let allTables = [] as Array<SQLTable>;

    Object.entries(data).forEach(([schemaName, dataArray]) => {
      const currentTables = this.createData(schemaName, dataArray);

      resolvers.forEach((r) => {
        if (r.getSchemaName() === schemaName) {
          const schemaToResolve = r.getSchemaToResolve();

          Object.entries<ResolverObject>(schemaToResolve).forEach(
            ([fieldName, rObj]) => {
              if (
                rObj.isArray === null &&
                !(rObj.type instanceof ChacaSchema)
              ) {
                // buscar columna con ese nombre
                const foundColumn = this.foundColumnByName(
                  currentTables,
                  schemaName,
                  fieldName,
                );

                if (foundColumn) {
                  // tipo de dato declarado en el schema
                  const fieldType = rObj.type;

                  // change if is a key field
                  if (fieldType instanceof KeyFieldResolver) {
                    // change to primary key column
                    foundColumn.changeToPrimaryKey();

                    if (fieldType.fieldType instanceof RefFieldResolver) {
                      foundColumn.changeForeignKeyConfig(
                        this.tranformRefFieldToForeignKey(
                          fieldType.fieldType.refField.refField,
                          allTables,
                        ),
                      );
                    }
                  } else if (fieldType instanceof RefFieldResolver) {
                    foundColumn.changeForeignKeyConfig(
                      this.tranformRefFieldToForeignKey(
                        fieldType.refField.refField,
                        allTables,
                      ),
                    );
                  }

                  // change if is null
                  if (rObj.posibleNull > 0) {
                    foundColumn.changeToPosibleNull();
                  }
                }
              }
            },
          );
        }
      });

      allTables = [...allTables, ...currentTables];
    });

    await fs.promises.writeFile(
      this.route,
      this.createTablesString(allTables) +
        this.createTableDataString(allTables),
      "utf-8",
    );

    return this.route;
  }

  public tranformRefFieldToForeignKey(
    refField: string,
    tables: Array<SQLTable>,
  ): ColumnForeignKeyConfig {
    const arrayLocation = refField.split(".");

    const columnToRef = arrayLocation.pop() as string;
    const tableToRef = arrayLocation.join("_");

    const foundTable = this.findTableByName(tables, tableToRef);
    const foundColumn = foundTable.findColumnByName(columnToRef);

    if (foundColumn) {
      return { table: foundTable, column: foundColumn };
    } else {
      throw new ChacaError(`Not found table '${tableToRef}'`);
    }
  }

  private foundColumnByName(
    tables: Array<SQLTable>,
    tableName: string,
    columnName: string,
  ): SQLTableColumn | null {
    let found: SQLTableColumn | null = null;

    const foundTable = tables.find((t) => t.tableName === tableName);

    if (foundTable) {
      const foundColumn = foundTable
        .getColumns()
        .find((c) => c.columnName === columnName);

      if (foundColumn) {
        found = foundColumn;
      }
    }

    return found;
  }
}
