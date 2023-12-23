import { ChacaError } from "../../../../../errors";
import { SequenceFieldProps } from "../../../../Fields/core/SequenceField/SequenceField";

interface Props {
  config: Required<SequenceFieldProps>;
  route: string;
}

export class Config {
  private config: Required<SequenceFieldProps>;
  private route: string;

  constructor({ config, route }: Props) {
    this.config = config;
    this.route = route;

    this.validate();
  }

  private validate() {
    if (this.config.step <= 0) {
      throw new ChacaError(
        `In field ${this.route}. The sequence step must be an positive number`,
      );
    }
  }

  public value() {
    return this.config;
  }
}
