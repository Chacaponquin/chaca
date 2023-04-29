import { FileConfig } from "../../core/interfaces/export.interface.js";
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
} from "./classes/index.js";
import { createPrimaryKeyNode } from "./utils/createPrimaryKey.js";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];
  private objectDocuments: Array<SQLDocumentTree> = [];
  private sqlTables: Array<SQLTable> = [];

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
        const arrayType = new SQLArray(value);
        this.createArrayFields(fieldRoute, parentRoute, value, arrayType);

        columnType = arrayType;
      } else {
        const newObject = new SQLObject(value);

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

  private createData(): void {
    for (let i = 0; i < this.sqlData.length; i++) {
      const objectData = this.sqlData[i];

      if (
        typeof objectData === "object" &&
        objectData !== null &&
        !Array.isArray(objectData)
      ) {
        const newDocumentTree = new SQLDocumentTree(this.fileName);
        this.createDocumentSubFields(objectData, newDocumentTree, []);

        if (this.objectDocuments.length === 0) {
          this.objectDocuments.push(newDocumentTree);
        } else {
          const firstObjectToCompare = this.objectDocuments[0];
          newDocumentTree.compareWithFirstObject(firstObjectToCompare);
        }
      } else {
        throw new ChacaError("Your data must be an array of objects");
      }
    }
  }

  private createDocumentSubFields(
    object: any,
    documentTree: SQLDocumentTree,
    parentRoute: Array<string>,
  ): void {
    const entries = Object.entries(object);

    // add primary key
    documentTree.insertNode(createPrimaryKeyNode(parentRoute));

    entries.forEach(([fieldName, value]) => {
      const fieldRoute = [...parentRoute, fieldName];

      const newNode = this.createNodeByValue(fieldName, value, fieldRoute);
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

  private createSQLTables(): void {
    this.objectDocuments[0].createSQLTables(this.sqlTables);
  }

  public async generateFile(): Promise<string> {
    return "";
  }
}
