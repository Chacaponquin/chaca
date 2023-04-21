import { FieldNode } from "../FieldNode/FieldNode.js";

export class MixedFieldNode extends FieldNode {
  public nodes: Array<FieldNode> = [];

  public insertNode(node: FieldNode): void {
    this.nodes.push(node);
  }

  public getValue(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.nodeConfig.name]: n.getRealValue() };
    });

    return resultObject;
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
