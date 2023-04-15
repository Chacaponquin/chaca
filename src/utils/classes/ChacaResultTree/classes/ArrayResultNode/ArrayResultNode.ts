import { ChacaTreeNode } from "../../../ChacaInputTree/classes/index.js";
import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";

export class ArrayResultNode extends FieldNode {
  private arrayNodes: Array<FieldNode> = [];

  constructor(
    config: FieldNodeProps,
    public readonly fieldInfo: ChacaTreeNode,
  ) {
    super(config);
  }

  public getValue(): unknown[] {
    return this.arrayNodes.map((n) => n.getRealValue());
  }

  public insertNode(n: FieldNode) {
    this.arrayNodes.push(n);
  }
}
