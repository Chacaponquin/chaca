import { FileConfig } from "../../core/interfaces/export.interface.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { Generator } from "../Generator.js";
import {
  SQLObject,
  SQLType,
  SQLBoolean,
  SQLDate,
  SQLNumber,
  SQLString,
  SQLTableTree,
  SQLTreeNode,
  SQLNull,
} from "./classes/index.js";

export class SQLGenerator extends Generator {
  private sqlData: Array<any> = [];
  private tableTrees: Array<SQLTableTree> = [];

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
    actualRoute: Array<string>,
  ): SQLTreeNode {
    let newNode: SQLTreeNode;

    if (typeof value === "string") {
      const fieldType = new SQLString(value);
      newNode = new SQLTreeNode(fieldName, fieldType);
    } else if (typeof value === "number") {
      const fieldType = new SQLNumber(value);
      newNode = new SQLTreeNode(fieldName, fieldType);
    } else if (typeof value === "boolean") {
      const fieldType = new SQLBoolean(value);
      newNode = new SQLTreeNode(fieldName, fieldType);
    } else {
      if (value instanceof Date) {
        const fieldType = new SQLDate(value);
        newNode = new SQLTreeNode(fieldName, fieldType);
      } else if (value === null) {
        const fieldType = new SQLNull();
        newNode = new SQLTreeNode(fieldName, fieldType);
      } else {
        newNode = new SQLTreeNode(fieldName, fieldType);
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
        const newTableTree = new SQLTableTree(this.fileName, []);

        if (this.tableTrees.length === 0) {
          this.insertTableTree(newTableTree);
          this.createTreeSubFields(objectData, newTableTree);
        } else {
          const firstTree = this.getFirstTree();

          this.createTreeSubFields(objectData, newTableTree);

          firstTree.compare(newTableTree);
        }
      } else {
        throw new ChacaError("Your data must be an array of objects");
      }
    }
  }

  private createTreeSubFields(object: any, tree: SQLTableTree): void {
    const entries = Object.entries(object);

    entries.forEach(([fieldName, value]) => {
      const newNode = this.createNodeByValue(
        fieldName,
        value,
        tree.createRouteForSubFields(),
      );

      tree.insertNode(newNode);
    });
  }

  private compareWithFirstTree(newTree: SQLTableTree): boolean {
    const firstTree = this.getFirstTree();
  }

  private getFirstTree() {
    return this.tableTrees[0];
  }

  private insertTableTree(tableTree: SQLTableTree): void {
    this.tableTrees.push(tableTree);
  }

  public async generateFile(): Promise<string> {
    return "";
  }
}
