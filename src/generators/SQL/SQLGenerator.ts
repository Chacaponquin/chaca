import { ChacaSchema } from "../../core/classes/ChacaSchema/ChacaSchema.js";
import {
  KeyFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
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
import { SQLNode } from "./classes/sqlTypes/SQLNode.js";
import fs from "fs";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];

  private readonly VALUE_ARRAY_COLUMN_NAME = "value";

  constructor(data: any, config: FileConfig) {
    super(data, "sql", config);

    if (Array.isArray(this.data)) {
      this.sqlData = this.data;
    } else {
      this.sqlData = [this.data];
    }
  }

  private filterTypeByValue(
    documentNode: SQLNode,
    parentTable: SQLTable,
    fieldName: string | null,
    value: DataType,
  ): void {
    if (value instanceof StringType) {
      const type = new SQLString(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
      }
    } else if (value instanceof NumberType) {
      const type = new SQLNumber(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
      }
    } else if (value instanceof BooleanType) {
      const type = new SQLBoolean(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
      }
    } else if (value instanceof DateType) {
      const type = new SQLDate(value.value);

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
      }
    } else if (value instanceof NullType) {
      const type = new SQLNull();

      if (fieldName) {
        parentTable.addColumnValue(fieldName, type);
      } else {
        parentTable.addColumnValue(parentTable.tableName, type);
      }
    } else if (value instanceof ArrayType) {
      if (fieldName) {
        const arrayTable = new SQLTable(
          this.createTableNameByParent(parentTable, fieldName),
        );
        documentNode.addTable(arrayTable);

        value.getValues().forEach((v) => {
          this.filterTypeByValue(documentNode, arrayTable, null, v);
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
        arrayTable.changeColumnToForeignKey(parentIDColumnName);
      } else {
        value.getValues().forEach((v) => {
          this.filterTypeByValue(documentNode, parentTable, null, v);
        });
      }
    } else if (value instanceof ObjectType) {
      if (fieldName) {
        const newTable = new SQLTable(
          this.createTableNameByParent(parentTable, fieldName),
        );
        documentNode.addTable(newTable);

        value.getKeys().forEach((k) => {
          this.filterTypeByValue(documentNode, parentTable, k.key, k.dataType);
        });

        parentTable.addColumn(fieldName);
        parentTable.addColumnValue(fieldName, newTable.getLastID());
      } else {
        value.getKeys().forEach((k) => {
          this.filterTypeByValue(documentNode, parentTable, k.key, k.dataType);
        });
      }
    }
  }

  private createArrayTableForeignKeyColumnName(parentTable: SQLTable): string {
    return `${parentTable.tableName}_id`;
  }

  private createTableNameByParent(
    parentTable: SQLTable,
    fieldName: string,
  ): string {
    return `${parentTable.tableName}_${fieldName}`;
  }

  private createData(tableName: string, data: any): Array<SQLNode> {
    const dataNodes: Array<SQLNode> = [];
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

    for (let i = 0; i < objectTypes.length; i++) {
      const documentNode = new SQLNode();
      const documentTable = new SQLTable(tableName);
      documentNode.addTable(documentTable);

      objectTypes[i].getKeys().forEach((f) => {
        this.filterTypeByValue(documentNode, documentTable, f.key, f.dataType);
      });

      dataNodes.push(documentNode);
    }

    // concat tables
    if (dataNodes.length) {
      const firstNode = dataNodes[0];

      for (let i = 1; i < dataNodes.length; i++) {
        firstNode.concatTables(dataNodes[i]);
      }
    }

    return dataNodes;
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

        if (column.getConfig().isPrimaryKey) {
          primaryKeys.push(column);
        } else if (column.getConfig().isForeignKey) {
          foreingKeys.push(column);
        }

        code += `\t${column.columnName} ${columnType.getSQLDefinition()}`;

        if (!column.getConfig().posibleNull) {
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
          const [tableRef, columnRef] = (
            f.getColumnType() as SQLForiegnKeyDefinition
          ).refersTo.split(".");

          code += `\tFOREIGN KEY (${f.columnName}) REFERENCES ${tableRef} (${columnRef})`;

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
      const tablesData = table.getColumnsData();

      tablesData.forEach((d) => {
        data += `INSERT INTO ${table.tableName} VALUES (`;
        data += d.join(", ");
        data += `);\n`;
      });
    });

    return data;
  }

  public async generateFile(): Promise<string> {
    const documentTree = this.createData(
      this.config.fileName,
      this.sqlData,
      true,
    );

    const tables = this.createSQLTables(documentTree);

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

    Object.entries(data).forEach(([tableName, dataArray]) => {
      const documentTree = this.createData(tableName, dataArray, false);

      // tablas pertenecientes a este schema
      const tables = this.createSQLTables(documentTree);

      resolvers.forEach((r) => {
        if (r.getSchemaName() === tableName) {
          const schemaToResolve = r.getSchemaToResolve();

          Object.entries<ResolverObject>(schemaToResolve).forEach(
            ([fieldName, rObj]) => {
              if (
                rObj.isArray === null &&
                !(rObj.type instanceof ChacaSchema)
              ) {
                // buscar columna con ese nombre
                const foundColumn = this.foundColumnByName(
                  tables,
                  tableName,
                  fieldName,
                );

                if (foundColumn) {
                  // tipo de dato declarado en el schema
                  const fieldType = rObj.type;

                  // change if is a key field
                  if (fieldType instanceof KeyFieldResolver) {
                    if (fieldType.fieldType instanceof SchemaFieldResolver) {
                      const newType = new SQLPrimaryKeyDefinition(
                        foundColumn.getColumnType(),
                      );

                      foundColumn.changeColumnType(newType);
                    } else if (
                      fieldType.fieldType instanceof RefFieldResolver
                    ) {
                      const foreignKeyType = new SQLForiegnKeyDefinition(
                        foundColumn.getColumnType(),
                        fieldType.fieldType.refField.refField,
                      );

                      const newType = new SQLPrimaryKeyDefinition(
                        foreignKeyType,
                      );

                      foundColumn.changeColumnType(newType);
                    }
                  } else if (fieldType instanceof RefFieldResolver) {
                    const foreignKeyType = new SQLForiegnKeyDefinition(
                      foundColumn.getColumnType(),
                      fieldType.refField.refField,
                    );

                    foundColumn.changeColumnType(foreignKeyType);
                  }

                  // change if is null
                  if (rObj.posibleNull > 0) {
                    foundColumn.changeIsNull();
                  }
                }
              }
            },
          );
        }
      });

      allTables = [...allTables, ...tables];
    });

    await fs.promises.writeFile(
      this.route,
      this.createTablesString(allTables) +
        this.createTableDataString(allTables),
      "utf-8",
    );

    return this.route;
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
