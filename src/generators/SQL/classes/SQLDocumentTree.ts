import { ChacaError } from "../../../errors/ChacaError.js";
import { SQLNode } from "./SQLNode.js";

export class SQLDocumentTree {
  private nodes: Array<SQLNode> = [];

  public insertNode(node: SQLNode): void {
    this.nodes.push(node);
  }

  public compareWithFirstObject(documentToCompare: SQLDocumentTree): void {
    this.nodes.forEach((subField) => {
      documentToCompare.searchAndPushValue(subField);
    });
  }

  public searchAndPushValue(node: SQLNode): void {
    let found: SQLNode | null = null;

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
