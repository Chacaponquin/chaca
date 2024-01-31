import { SchemaResolver } from "../../../SchemaResolver/SchemaResolver";
import { ExportSQLFormat } from "../../interfaces/export";
import { ChacaError } from "../../../../errors";
import { Generator } from "../Generator/Generator";
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
  SQLBigint,
} from "./classes/sqlTypes";
import { SQLTable } from "./classes/table";
import {
  ArrayType,
  BigintType,
  BooleanType,
  DataType,
  DateType,
  NullType,
  NumberType,
  ObjectType,
  StringType,
} from "./classes/types";
import fs from "fs";
import {
  ChacaTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../../ChacaInputTree/classes";
import { SQLDataGenerator } from "./classes/generators";
import { MultiGenerateResolver } from "../../../MultiGenerate/MultiGenerateResolver";

interface Props {
  fileName: string;
  location: string;
  format: ExportSQLFormat;
  zip?: boolean;
}

export class SQLGenerator extends Generator {
  private schemasPrimaryKeys: Array<KeyValueNode> = [];
  private schemasForeignKeys: Array<RefValueNode> = [];
  private schemaspossibleNull: Array<ChacaTreeNode> = [];
  private allTables: Array<SQLTable> = [];
  private dataGenerator: SQLDataGenerator;

  private zip: boolean;

  private readonly NAMES_DIVISOR = "_";

  constructor(config: Props) {
    super({
      extension: "sql",
      fileName: config.fileName,
      location: config.location,
    });

    this.dataGenerator = new SQLDataGenerator(config.format, this.allTables);

    this.zip = Boolean(config.zip);
  }

  public async generateRelationalDataFile(
    resolvers: MultiGenerateResolver,
  ): Promise<string> {
    resolvers.getResolvers().forEach((r) => {
      const allKeys = r.getKeyNodes();
      allKeys.forEach((k) => this.schemasPrimaryKeys.push(k));

      const allRefs = r.getRefNodes();
      allRefs.forEach((r) => this.schemasForeignKeys.push(r));

      const allpossibleNull = r.getPossibleNullNodes();
      allpossibleNull.forEach((n) => this.schemaspossibleNull.push(n));
    });

    resolvers.getResolvers().forEach((r) => {
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

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  public async generateFile(data: any): Promise<string> {
    let sqlData: Array<any> = [];

    if (Array.isArray(data)) {
      sqlData = data;
    } else {
      sqlData = [data];
    }

    this.createData(this.fileName, sqlData);

    // change tables id columns
    this.allTables.forEach((t) => {
      t.updateIdColumnName();
    });

    await fs.promises.writeFile(
      this.route,
      this.dataGenerator.getData(),
      "utf-8",
    );

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
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
      } else if (value instanceof BigintType) {
        const type = new SQLBigint(value.value);

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
          throw new ChacaError(`Can not export data in array format in SQL.`);
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
        const fieldRoute = f.getFieldRoute();
        const fieldName = fieldRoute[fieldRoute.length - 1];
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
}
