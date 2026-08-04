import { TryRefANoKeyFieldError } from "../../../../errors";
import { InputTreeNode } from "../node/input-tree-node";
import { NotNull, PossibleNull } from "../possible-null/possible-null";
import { NotArray } from "../is-array/is-array";
import { Step } from "./value-object/step";
import { StartsWith } from "./value-object/starts-with";
import { NodeRoute } from "../node/value-object/route";
import { SingleResultNode } from "../../../result-tree/classes/single-result";
import { FieldNode } from "../../../result-tree/classes/node/field-node";

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

  generate(): Promise<FieldNode> {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value(),
    });

    return new Promise((resolve) => resolve(result));
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  /**
   * Los elementos de un array no son campos, por lo que no llevan la
   * configuracion de nulos del campo: `possibleNull` decide si el valor del
   * campo es un array o `null`, no si cada elemento lo es.
   */
  getNoArrayNode(): InputTreeNode {
    return new SequenceValueNode(
      this.route,
      new NotNull(),
      this.startsWith,
      this.step,
    );
  }
}
