import { ChacaError } from "../../../../errors";
import { GenerateProps, InputTreeNode } from "../node/input-tree-node";
import { CustomValueNode } from "../custom/custom-value-node";
import { RefValueNode } from "../ref/ref-value-node";
import { SequenceValueNode } from "../sequence/sequence-value-node";
import { NotNull } from "../possible-null/possible-null";
import { NotArray } from "../is-array/is-array";
import { NodeRoute } from "../node/value-object/route";
import { FieldNode } from "../../../result-tree/classes/node/field-node";

export type KeyFieldProps = RefValueNode | SequenceValueNode | CustomValueNode;

export class KeyValueNode extends InputTreeNode {
  constructor(route: NodeRoute, private readonly fieldNode: KeyFieldProps) {
    super(route, new NotArray(), new NotNull());
  }

  getNoArrayNode(): InputTreeNode {
    return new KeyValueNode(this.route, this.fieldNode);
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    return fieldTreeRoute.length === 0;
  }

  async generate(props: GenerateProps): Promise<FieldNode> {
    const node = await this.fieldNode.generate(props);

    const value = node.value();

    if (value === null || value === undefined) {
      throw new ChacaError(
        `The key value ${this.getRouteString()} can not be null or undefined`,
      );
    }

    return node;
  }
}
