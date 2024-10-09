import { ChacaError } from "../../../../errors";
import { InputTreeNode } from "../../../input-tree/core";
import { FieldNode } from "../FieldNode";
import { SingleResultNode } from "../SingleResultNode";

interface Props {
  name: string;
  fieldNode: InputTreeNode;
}

export class ArrayResultNode extends FieldNode {
  private arrayNodes: FieldNode[] = [];
  private fieldNode: InputTreeNode;

  constructor({ name, fieldNode }: Props) {
    super(name);

    this.fieldNode = fieldNode;
  }

  value(): unknown[] {
    return this.arrayNodes.map((n) => n.getRealValue());
  }

  insertNode(n: FieldNode) {
    this.arrayNodes.push(n);
  }

  getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  getRefValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
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

  getFieldNode() {
    return this.fieldNode;
  }
}
