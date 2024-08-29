import { ChacaError } from "../../../../../errors";
import { ProbabilityOption } from "../../../../fields/core/probability/ProbabilityField";
import { InputChance } from "./InputChance";
import { InputValue } from "./InputValue";

interface Props {
  options: Array<ProbabilityOption>;
  route: string;
}

export class Input {
  private route: string;
  private options: Array<ProbabilityOption> = [];

  constructor({ options, route }: Props) {
    this.options = options;
    this.route = route;
    this.validate();
  }

  private validate() {
    if (this.options.length > 0) {
      for (const option of this.options) {
        if (typeof option === "object" && option !== null) {
          option.chance = new InputChance({
            value: option.chance,
            route: this.route,
          }).value();

          option.value = new InputValue(option.value).value();
        } else {
          throw new ChacaError(
            `In ${this.route} the 'chance' and 'value' parameters must be specified for each value in the array`,
          );
        }
      }
    } else {
      throw new ChacaError(
        `There are no values for the enum field '${this.route}'`,
      );
    }
  }

  public value() {
    return this.options;
  }
}
