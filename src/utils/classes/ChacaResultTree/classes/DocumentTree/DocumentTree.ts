import { FieldNode } from "../FieldNode/FieldNode.js";

export class DocumentTree<D> {
  private nodes: Array<FieldNode> = [];

  public insertField(newField: FieldNode) {
    this.nodes.push(newField);
  }

  public getDocumentObject(): D {
    let returnObject = {} as D;

    for (const n of this.nodes) {
      returnObject = { ...returnObject, [n.nodeConfig.name]: n.getValue() };
    }

    return returnObject;
  }
}
