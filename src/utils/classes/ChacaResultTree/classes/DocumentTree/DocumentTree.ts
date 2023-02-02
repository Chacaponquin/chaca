import { FieldNode } from "../FieldNode/FieldNode.js";

export class DocumentTree<D> {
  private nodes: Array<FieldNode> = [];

  public getDocumentObject(): D {
    let returnObject = {} as D;

    for (const n of this.nodes) {
      returnObject = { ...returnObject, [n.name]: n.getValue() };
    }

    return returnObject;
  }
}
