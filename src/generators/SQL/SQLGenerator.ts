import { FileConfig } from "../../core/interfaces/export.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator.js";
import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
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
  SQLPrimaryKey,
} from "./classes/index.js";

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

  private createNodeByValue(
    fieldName: string,
    value: any,
    parentRoute: Array<string>,
  ): SQLNode {
    let newNode: SQLNode;
    const fieldRoute = [...parentRoute, fieldName];

    if (typeof value === "string") {
      const fieldType = new SQLString(value);
      newNode = new SQLNode(fieldRoute, fieldType);
    } else if (typeof value === "undefined") {
      const fieldType = new SQLNull();
      newNode = new SQLNode(fieldRoute, fieldType);
    } else if (typeof value === "number") {
      const fieldType = new SQLNumber(value);
      newNode = new SQLNode(fieldRoute, fieldType);
    } else if (typeof value === "boolean") {
      const fieldType = new SQLBoolean(value);
      newNode = new SQLNode(fieldRoute, fieldType);
    } else {
      if (value instanceof Date) {
        const fieldType = new SQLDate(value);
        newNode = new SQLNode(fieldRoute, fieldType);
      } else if (value === null) {
        const fieldType = new SQLNull();
        newNode = new SQLNode(fieldRoute, fieldType);
      } else if (Array.isArray(value)) {
        const fieldType = new SQLArray(value);
        this.createArrayFields(fieldRoute, value, fieldType);
        newNode = new SQLNode(fieldRoute, fieldType);
      } else {
        const newObject = new SQLObject(value);

        Object.entries(value).forEach(([name, v]) => {
          const subNode = this.createNodeByValue(name, v, fieldRoute);
          newObject.insertSubField(subNode);
        });

        // add primary key
        newObject.insertSubField(this.createPrimaryKey(parentRoute));

        newNode = new SQLNode(fieldRoute, newObject);
      }
    }

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

    entries.forEach(([fieldName, value]) => {
      const fieldRoute = [...parentRoute, fieldName];

      const newNode = this.createNodeByValue(fieldName, value, fieldRoute);
      documentTree.insertNode(newNode);
    });

    // add primary key
    documentTree.insertNode(this.createPrimaryKey(parentRoute));
  }

  private createPrimaryKey(parentRoute: Array<string>): SQLNode {
    const primaryKeyRoute = [...parentRoute, `id_${PrivateUtils.id()}`];
    const fieldType = new SQLPrimaryKey(PrivateUtils.id());
    const primaryKeyNode = new SQLNode(primaryKeyRoute, fieldType);

    return primaryKeyNode;
  }

  private createArrayFields(
    fieldRoute: Array<string>,
    array: Array<any>,
    arrayNode: SQLArray,
  ): void {
    for (const val of array) {
      const newNode = this.createNodeByValue("", val, fieldRoute);
      arrayNode.insertNode(newNode);
    }
  }

  private createSQLTables(): void {
    this.objectDocuments[0].createSQLTables(this.sqlTables);
  }

  public async generateFile(): Promise<string> {
    return "";
  }
}
