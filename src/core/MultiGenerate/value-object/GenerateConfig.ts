import { GenerateConfig } from "../interfaces/multi-generate";

export class GenerateConfigObject {
  private _value: Required<GenerateConfig>;

  constructor(object?: GenerateConfig) {
    this._value = this.validate(object);
  }

  public value() {
    return this._value;
  }

  private validate(config?: Partial<GenerateConfig>): Required<GenerateConfig> {
    const returConfig: Required<GenerateConfig> = { verbose: true };

    if (config && typeof config === "object") {
      if (typeof config.verbose === "boolean") {
        returConfig.verbose = config.verbose;
      }
    }

    return returConfig;
  }
}
