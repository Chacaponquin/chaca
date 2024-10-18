import { TryRefANoKeyFieldError } from "../../../../errors";
import { InputTreeNode } from "../node";
import { PossibleNull } from "../possible-null";
import { NotArray } from "../is-array";
import { Step } from "./value-object/step";
import { StartsWith } from "./value-object/starts-with";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";
import { NodeRoute } from "../node/value-object/route";

export class SequenceValueNode extends InputTreeNode {
  private actualValue: number;
  private readonly startsWith: StartsWith;
  private readonly step: Step;

  constructor(
    route: NodeRoute,
    possibleNull: PossibleNull,
    startsWith: StartsWith,
    step: Step,
  ) {
    super(route, new NotArray(), possibleNull);

    this.startsWith = startsWith;
    this.step = step;

    this.actualValue = startsWith.value();
  }

  private value() {
    const returnValue = this.actualValue;
    this.actualValue += this.step.value();

    return returnValue;
  }

  generate(): FieldNode {
    return new SingleResultNode({
      name: this.getNodeName(),
      value: this.value(),
    });
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  getNoArrayNode(): InputTreeNode {
    return new SequenceValueNode(
      this.route,
      this.possibleNull,
      this.startsWith,
      this.step,
    );
  }
}
