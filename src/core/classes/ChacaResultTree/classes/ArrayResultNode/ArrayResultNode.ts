import { ChacaError } from "../../../../../errors/ChacaError.js";
import { ChacaTreeNode } from "../../../ChacaInputTree/classes/index.js";
import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";
import { SingleResultNode } from "../SingleResultNode/SingleResultNode.js";

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

  public getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  public getRefValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
    if (fieldTreeRoute.length === 0) {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
