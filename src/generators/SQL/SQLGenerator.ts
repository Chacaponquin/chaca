import { SchemaResolver } from "../../core/classes/SchemaResolver.js";
import {
  ExportSQLFormat,
  FileConfig,
} from "../../core/interfaces/export.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator.js";
import {
  SQLBoolean,
  SQLDate,
  SQLNumber,
  SQLString,
  SQLNull,
  SQLTextString,
  SQLVarcharString,
  SQLFloatNumber,
  SQLIntegerNumber,
} from "./classes/sqlTypes/index.js";
import { SQLTable } from "./classes/table/index.js";
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
import {
  ChacaTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../core/classes/ChacaInputTree/classes/index.js";
import { SQLDataGenerator } from "./classes/generators/index.js";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];
  private schemasPrimaryKeys: Array<KeyValueNode> = [];
  private schemasForeignKeys: Array<RefValueNode> = [];
  private schemasPosibleNull: Array<ChacaTreeNode> = [];
  private allTables: Array<SQLTable> = [];
  private dataGenerator: SQLDataGenerator;

  private readonly NAMES_DIVISOR = "_";

  constructor(data: any, config: FileConfig, sqlExtension: ExportSQLFormat) {
    super(data, "sql", config);

    if (Array.isArray(this.data)) {
      this.sqlData = this.data;
    } else {
      this.sqlData = [this.data];
    }

    this.dataGenerator = new SQLDataGenerator(sqlExtension, this.allTables);
  }

  private filterTypeByValue(
    parentTable: SQLTable,
    fieldName: string | null,
    value: DataType,
  ): void {
    if (!parentTable.finish()) {
      if (value instanceof StringType) {
        let type: SQLString;
        if (value.value.length > 255) {
          type = new SQLTextString(value.value);
        } else {
          type = new SQLVarcharString(value.value);
        }

        if (fieldName) {
          parentTable.addColumnValue(fieldName, type);
        } else {
          parentTable.addColumnValue(parentTable.tableName, type);
          // add new id to array table
          parentTable.addNewID();
        }
      } else if (value instanceof NumberType) {
        let type: SQLNumber;
        if (Number.isInteger(value.value)) {
          type = new SQLIntegerNumber(value.value);
        } else {
          type = new SQLFloatNumber(value.value);
        }

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

          const arrayTable = this.createNewTable(arrayTableName);

          const parentIDColumnName =
            this.createArrayTableForeignKeyColumnName(parentTable);

          value.getValues().forEach((v) => {
            this.filterTypeByValue(arrayTable, null, v);

            arrayTable.addColumnValue(
              parentIDColumnName,
              parentTable.getLastID(),
            );
          });

          // change column config to foreing key and primary
          arrayTable.changeColumnToForeignKey(parentIDColumnName, {
            column: parentTable.getPrimaryKeyColumn(),
            table: parentTable,
          });
        } else {
          value.getValues().forEach((v) => {
            this.filterTypeByValue(parentTable, null, v);
          });
        }
      } else if (value instanceof ObjectType) {
        if (fieldName) {
          const objectTableName = this.createTableNameByParent(
            parentTable,
            fieldName,
          );

          const objectTable = this.createNewTable(objectTableName);

          // add new id in object table
          objectTable.addNewID();

          value.getKeys().forEach((k) => {
            this.filterTypeByValue(objectTable, k.key, k.dataType);
          });

          // add foreign key in parent table
          parentTable.addColumnValue(fieldName, objectTable.getLastID());
          parentTable.changeColumnToForeignKey(fieldName, {
            table: objectTable,
            column: objectTable.getPrimaryKeyColumn(),
          });
        } else {
          value.getKeys().forEach((k) => {
            this.filterTypeByValue(parentTable, k.key, k.dataType);
          });

          // add new id to array table
          parentTable.addNewID();
        }
      }
    }
  }

  private createNewTable(tableName: string): SQLTable {
    const foundTable = this.allTables.find((t) => t.tableName === tableName);

    if (foundTable) {
      return foundTable;
    } else {
      const newTable = new SQLTable(tableName);

      const allPrimaryKeysTable = this.schemasPrimaryKeys.filter((p) => {
        const fieldRoute = p.getFieldRoute();
        const parentTableName = fieldRoute
          .slice(0, fieldRoute.length - 1)
          .join(this.NAMES_DIVISOR);

        return parentTableName === tableName;
      });

      if (allPrimaryKeysTable.length > 0) {
        allPrimaryKeysTable.forEach((p) => {
          const fieldRoute = p.getFieldRoute();
          const fieldName = fieldRoute[fieldRoute.length - 1];

          newTable.addPrimaryColumn(fieldName);
        });
      } else {
        newTable.generateIDColumn();
      }

      // add foreign keys
      const allForeignKeysTable = this.schemasForeignKeys.filter((f) => {
        const fieldRoute = f.getFieldRoute();
        const parentTableName = fieldRoute
          .slice(0, fieldRoute.length - 1)
          .join(this.NAMES_DIVISOR);

        return parentTableName === tableName;
      });

      // create ref tables
      allForeignKeysTable.forEach((f) => {
        const schemaRef = f.getSchemaRef() as SchemaResolver;
        this.createData(schemaRef.getSchemaName(), schemaRef.resolve());
      });

      // add foreign keys columns to table
      allForeignKeysTable.forEach((f) => {
        const fieldName = f.getFieldRoute()[f.getFieldRoute().length - 1];
        const refFieldRoute = f.getRefFieldRoute();
        const parentTableName = refFieldRoute
          .slice(0, refFieldRoute.length - 1)
          .join(this.NAMES_DIVISOR);
        const refColumnName = refFieldRoute[refFieldRoute.length - 1];

        const foundTable = this.allTables.find(
          (t) => t.tableName === parentTableName,
        );
        if (foundTable) {
          const foundColumn = foundTable.findColumnByName(refColumnName);

          if (foundColumn) {
            if (!f.getIsArray()) {
              newTable.addForeignKey(fieldName, {
                column: foundColumn,
                table: foundTable,
              });
            }
          } else {
            throw new ChacaError(
              `Not exists the column '${refColumnName}' in ${foundTable.tableName}`,
            );
          }
        } else {
          throw new ChacaError(`Not exists the table ${parentTableName}`);
        }
      });

      // the table is foreign key
      const isForeignKey = this.schemasForeignKeys.find((f) => {
        return f.getFieldRoute().join(this.NAMES_DIVISOR) === tableName;
      });

      if (isForeignKey) {
        const schemaRef = isForeignKey.getSchemaRef() as SchemaResolver;

        this.createData(schemaRef.getSchemaName(), schemaRef.resolve());

        const foundRefTable = this.allTables.find(
          (t) => t.tableName === schemaRef.getSchemaName(),
        );

        if (!foundRefTable) {
          throw new ChacaError(
            `Not found the table '${schemaRef.getSchemaName()}'`,
          );
        }
      }

      this.insertTable(newTable);
      return newTable;
    }
  }

  private insertTable(table: SQLTable): void {
    const found = this.allTables.some((t) => t.tableName === table.tableName);

    if (!found) {
      this.allTables.push(table);
    }
  }

  private createArrayTableForeignKeyColumnName(parentTable: SQLTable): string {
    return `${parentTable.tableName}${this.NAMES_DIVISOR}id`;
  }

  private createTableNameByParent(
    parentTable: SQLTable,
    fieldName: string,
  ): string {
    return `${parentTable.tableName}${this.NAMES_DIVISOR}${fieldName}`;
  }

  private createData(tableName: string, data: any) {
    const foundTable = this.allTables.find((t) => t.tableName === tableName);

    if (!foundTable || !foundTable.finish()) {
      // create sql tables
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
        const documentTable = this.createNewTable(tableName);

        // add new id to document table
        documentTable.addNewID();

        objectTypes[i].getKeys().forEach((f) => {
          this.filterTypeByValue(documentTable, f.key, f.dataType);
        });

        if (i === objectTypes.length - 1) {
          documentTable.setFinishBuild();
        }
      }
    }
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

  public async generateFile(): Promise<string> {
    this.createData(this.config.fileName, this.sqlData);
    // change tables id columns
    this.allTables.forEach((t) => {
      t.updateIdColumnName();
    });

    await fs.promises.writeFile(
      this.route,
      this.dataGenerator.getData(),
      "utf-8",
    );

    return this.route;
  }

  public async generateRelationalDataFile(
    resolvers: Array<SchemaResolver>,
  ): Promise<string> {
    resolvers.forEach((r) => {
      const allKeys = r.getKeyNodes();
      allKeys.forEach((k) => this.schemasPrimaryKeys.push(k));

      const allRefs = r.getRefNodes();
      allRefs.forEach((r) => this.schemasForeignKeys.push(r));

      const allPosibleNull = r.getPosibleNullNodes();
      allPosibleNull.forEach((n) => this.schemasPosibleNull.push(n));
    });

    resolvers.forEach((r) => {
      this.createData(r.getSchemaName(), r.resolve());
    });

    // change tables id columns
    this.allTables.forEach((t) => {
      t.updateIdColumnName();
    });

    await fs.promises.writeFile(
      this.route,
      this.dataGenerator.getData(),
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
    const tableToRef = arrayLocation.join(this.NAMES_DIVISOR);

    const foundTable = this.findTableByName(tables, tableToRef);

    if (foundTable) {
      const foundColumn = foundTable.findColumnByName(columnToRef);

      if (foundColumn) {
        return { table: foundTable, column: foundColumn };
      } else {
        throw new ChacaError(
          `Not found column ${columnToRef} in table ${tableToRef}`,
        );
      }
    } else {
      throw new ChacaError(`Not found table '${tableToRef}'`);
    }
  }
}
