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

      if (nodeValue === null) console.log("Is null", nodeName);

      returnObject = { ...returnObject, [nodeName]: nodeValue };
    }

    return returnObject;
  }
}
