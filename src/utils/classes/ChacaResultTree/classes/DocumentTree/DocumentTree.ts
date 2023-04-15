import { FieldNode } from "../FieldNode/FieldNode.js";

export class DocumentTree<D> {
  private nodes: Array<FieldNode> = [];

  public insertField(newField: FieldNode) {
    this.nodes.push(newField);
  }

  public getDocumentObject(): D {
    let returnObject = {} as D;

    for (const n of this.nodes) {
      const nodeName = n.nodeConfig.name;
      const nodeValue = n.getRealValue();

      returnObject = { ...returnObject, [nodeName]: nodeValue };
    }

    return returnObject;
  }
}
