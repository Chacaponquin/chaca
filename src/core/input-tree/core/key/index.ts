import { ChacaError } from "../../../../errors";
import { GenerateProps, InputTreeNode } from "../node";
import { CustomValueNode } from "../custom";
import { RefValueNode } from "../ref";
import { SequenceValueNode } from "../sequence";
import { NotNull } from "../possible-null";
import { NotArray } from "../is-array";
import { FieldNode } from "../../../result-tree/classes";
import { NodeRoute } from "../node/value-object/route";

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

  generate(props: GenerateProps): FieldNode {
    const node = this.fieldNode.generate(props);

    if (node.getRealValue() === null) {
      throw new ChacaError(
        `The key value ${this.getRouteString()} can not be null`,
      );
    }

    return node;
  }
}
