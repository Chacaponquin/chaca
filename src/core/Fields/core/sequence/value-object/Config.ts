import { SequenceFieldProps } from "../interfaces/sequence.interface";

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
        this._config.step = config.step;
      }
    }
  }

  public value() {
    return this._config;
  }
}
