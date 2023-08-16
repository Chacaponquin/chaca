import { ChacaError } from "../../../../../errors/ChacaError.js";
import { SequenceFieldProps } from "../interfaces/sequence.interface.js";

export class Config {
  private _config: Required<SequenceFieldProps> = {
    starsWith: 1,
    step: 1,
  };

  constructor(config?: SequenceFieldProps) {
    if (typeof config === "object") {
      if (typeof config.starsWith === "number") {
        this._config.starsWith = config.starsWith;
      }

      if (typeof config.step === "number") {
        if (config.step > 0) {
          this._config.step = config.step;
        } else {
          throw new ChacaError(`The sequence step must be an positive number`);
        }
      }
    }
  }

  public value() {
    return this._config;
  }
}
