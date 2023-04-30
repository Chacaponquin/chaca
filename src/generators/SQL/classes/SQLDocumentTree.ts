import { ChacaError } from "../../../errors/ChacaError.js";
import { SQLNode } from "./SQLNode.js";
import { SQLTable } from "./SQLTable.js";

export class SQLDocumentTree {
  private nodes: Array<SQLNode> = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public insertNode(node: SQLNode): void {
    this.nodes.push(node);
  }

  public createSQLTables(tables: Array<SQLTable>): void {
    const newTable = new SQLTable(this.name);

    this.nodes.forEach((n) => {
      n.createTableColumn(newTable, tables);
    });

    tables.push(newTable);
  }

  public compareWithFirstObject(documentToCompare: SQLDocumentTree): void {
    this.nodes.forEach((subField) => {
      documentToCompare.searchAndPushValue(subField);
    });
  }

  public searchAndPushValue(node: SQLNode): void {
    let found: SQLNode | null = null;

    console.log(this.nodes);

    for (let i = 0; i < this.nodes.length && !found; i++) {
      found = this.nodes[i].foundNode(node.getFieldRoute());
    }

    if (found) {
      const areEqual = found.equal(node);

      if (areEqual) {
        found.insertValue(node.getFirstValue());
      } else {
        throw new ChacaError(
          `The field ${node.getFieldRoute()} has different types`,
        );
      }
    } else {
      throw new ChacaError(`The field ${node.getFieldRoute()} does not exists`);
    }
  }
}
