import { SequenceFieldProps } from "../sequence-field";

interface InnerConfig {
  startsWith: number;
  step: number;
}

export class Config {
  private _config: InnerConfig = {
    startsWith: 1,
    step: 1,
  };

  constructor(config?: SequenceFieldProps) {
    if (typeof config === "object" && config !== null) {
      if (typeof config.startsWith === "number") {
        this._config.startsWith = config.startsWith;
      } else if (typeof config.starsWith === "number") {
        this._config.startsWith = config.starsWith;
      }

      if (typeof config.step === "number") {
        this._config.step = config.step;
      }
    }
  }

  value() {
    return this._config;
  }
}
