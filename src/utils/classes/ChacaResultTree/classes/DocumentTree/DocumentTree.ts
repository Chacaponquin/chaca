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

  public getValueByNodeRoute(fieldTreeRoute: Array<string>): unknown {
    let returnValue = undefined;

    for (let i = 0; i < this.nodes.length && returnValue === undefined; i++) {
      if (this.nodes[i].nodeConfig.name === fieldTreeRoute[0]) {
        returnValue = this.nodes[i].getValueByNodeRoute(
          fieldTreeRoute.slice(1),
        );
      }
    }

    return returnValue;
  }
}
