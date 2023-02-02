import { FieldNode } from "../FieldNode/FieldNode.js";

export class MixedFieldNode extends FieldNode {
  public nodes: Array<FieldNode> = [];

  public insertNode(node: FieldNode): void {
    this.nodes.push(node);
  }

  public getValue(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.name]: n.getValue() };
    });

    return resultObject;
  }
}
