import { TryRefANoKeyFieldError } from "../../../../errors";
import { InputTreeNode } from "../node";
import { PossibleNull } from "../possible-null";
import { NotArray } from "../is-array";
import { Step } from "./value-object/step";
import { StartsWith } from "./value-object/starts-with";

interface Props {
  fieldTreeRoute: string[];
  step: Step;
  startsWith: StartsWith;
  possibleNull: PossibleNull;
}

export class SequenceValueNode extends InputTreeNode {
  private actualValue: number;
  private readonly startsWith: StartsWith;
  private readonly step: Step;

  constructor({ fieldTreeRoute, possibleNull, startsWith, step }: Props) {
    super({
      isArray: new NotArray(),
      fieldTreeRoute: fieldTreeRoute,
      possibleNull: possibleNull,
    });

    this.startsWith = startsWith;
    this.step = step;

    this.actualValue = startsWith.value();
  }

  value() {
    const returnValue = this.actualValue;
    this.actualValue += this.step.value();

    return returnValue;
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  getNoArrayNode(): InputTreeNode {
    return new SequenceValueNode({
      fieldTreeRoute: this.getFieldRoute(),
      startsWith: this.startsWith,
      step: this.step,
      possibleNull: this.getPossibleNull(),
    });
  }
}
