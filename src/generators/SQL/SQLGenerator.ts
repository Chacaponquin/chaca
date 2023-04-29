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
} from "./classes/index.js";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];
  private objectDocuments: Array<SQLDocumentTree> = [];

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
        const newDocumentTree = new SQLDocumentTree();
        this.createObjectSubFields(objectData, newDocumentTree, []);

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

  private createObjectSubFields(
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

  public async generateFile(): Promise<string> {
    return "";
  }
}
