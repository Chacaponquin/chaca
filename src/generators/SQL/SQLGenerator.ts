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
  SQLObject,
  SQLBoolean,
  SQLDate,
  SQLNumber,
  SQLString,
  SQLNode,
  SQLNull,
  SQLArray,
  SQLDocumentTree,
  SQLTable,
  SQLType,
  SQLPrimaryKey,
  SQLForengKey,
  SQLTableColumn,
} from "./classes/index.js";
import { ColumnVariation } from "./interfaces/sqlTable.interface.js";
import { createPrimaryKeyNode } from "./utils/createPrimaryKey.js";
import fs from "fs";

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
    value: any,
    fieldRoute: Array<string>,
    parentRoute: Array<string>,
  ): SQLType {
    let columnType: SQLType;

    if (typeof value === "string") {
      columnType = new SQLString(value);
    } else if (typeof value === "undefined") {
      columnType = new SQLNull();
    } else if (typeof value === "number") {
      columnType = new SQLNumber(value);
    } else if (typeof value === "boolean") {
      columnType = new SQLBoolean(value);
    } else {
      if (value instanceof Date) {
        columnType = new SQLDate(value);
      } else if (value === null) {
        columnType = new SQLNull();
      } else if (Array.isArray(value)) {
        const arrayType = new SQLArray();
        this.createArrayFields(fieldRoute, parentRoute, value, arrayType);

        columnType = arrayType;
      } else {
        const newObject = new SQLObject();

        // add primary key
        newObject.insertSubField(createPrimaryKeyNode(parentRoute));

        Object.entries(value).forEach(([name, v]) => {
          const subNode = this.createNodeByValue(name, v, fieldRoute);
          newObject.insertSubField(subNode);
        });

        columnType = newObject;
      }
    }

    return columnType;
  }

  private createNodeByValue(
    fieldName: string,
    value: any,
    parentRoute: Array<string>,
  ): SQLNode {
    const fieldRoute = [...parentRoute, fieldName];
    const nodeType = this.filterTypeByValue(value, fieldRoute, parentRoute);
    const newNode = new SQLNode(fieldRoute, nodeType);

    return newNode;
  }

  private createDocumentSubFields(
    object: any,
    documentTree: SQLDocumentTree,
    generateID: boolean,
  ): void {
    const entries = Object.entries(object);

    if (generateID) {
      // add primary key
      documentTree.insertNode(createPrimaryKeyNode([]));
    }

    entries.forEach(([fieldName, value]) => {
      const newNode = this.createNodeByValue(fieldName, value, []);
      documentTree.insertNode(newNode);
    });
  }

  private createArrayFields(
    fieldRoute: Array<string>,
    parentRoute: Array<string>,
    array: Array<any>,
    arrayNode: SQLArray,
  ): void {
    for (const val of array) {
      const valueType = this.filterTypeByValue(val, fieldRoute, parentRoute);
      arrayNode.insertValue(valueType);
    }
  }

  private createSQLTables(documentTree: SQLDocumentTree): Array<SQLTable> {
    const tables = [] as Array<SQLTable>;
    documentTree.createSQLTables(tables);
    return tables;
  }

  private createData(
    tableName: string,
    data: any,
    generateID: boolean,
  ): SQLDocumentTree {
    let documentTree: SQLDocumentTree | null = null;

    for (let i = 0; i < data.length; i++) {
      const objectData = data[i];

      if (
        typeof objectData === "object" &&
        objectData !== null &&
        !Array.isArray(objectData)
      ) {
        const newDocumentTree = new SQLDocumentTree(tableName);
        this.createDocumentSubFields(objectData, newDocumentTree, generateID);

        if (documentTree === null) {
          documentTree = newDocumentTree;
        } else {
          newDocumentTree.compareWithFirstObject(documentTree);
        }
      } else {
        throw new ChacaError("Your data must be an array of objects");
      }
    }

    return documentTree as SQLDocumentTree;
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

        if (columnType instanceof SQLPrimaryKey) {
          primaryKeys.push(column);
        } else if (columnType instanceof SQLForengKey) {
          foreingKeys.push(column);
        }

        code += `\t${column.columnName} ${columnType.getSQLDefinition()}`;

        if (!column.couldBeNull()) {
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
            f.getColumnType() as SQLForengKey
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
      const tables = this.createSQLTables(documentTree);

      resolvers.forEach((r) => {
        if (r.getSchemaName() === tableName) {
          const schemaToResolve = r.getSchemaToResolve();
          const columnsToChange: Array<ColumnVariation> = [];

          Object.entries<ResolverObject>(schemaToResolve).forEach(
            ([fieldName, rObj]) => {
              if (rObj.isArray === null) {
                const fieldType = rObj.type;

                if (fieldType instanceof KeyFieldResolver) {
                  const saveColumn = {
                    isNull: false,
                    key: fieldName,
                    newType: new SQLPrimaryKey(new SQLNull()),
                  };

                  if (fieldType.fieldType instanceof RefFieldResolver) {
                    saveColumn.newType = new SQLPrimaryKey(
                      new SQLForengKey(
                        new SQLNull(),
                        fieldType.fieldType.refField.refField,
                      ),
                    );
                  }

                  if (rObj.posibleNull > 0) {
                    saveColumn.isNull = true;
                  }

                  columnsToChange.push(saveColumn);
                }

                if (fieldType instanceof RefFieldResolver) {
                  const fieldToRef = fieldType.refField.refField.split(".");

                  columnsToChange.push({
                    isNull: false,
                    key: fieldName,
                    newType: new SQLForengKey(
                      new SQLNull(),
                      fieldToRef.slice(0, 2).join("."),
                    ),
                  });
                }
              }
            },
          );

          // change columns
          tables.forEach((t) => t.changeColumnsTypes(columnsToChange));
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
}
