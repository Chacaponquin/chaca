import { SequentialFieldConfig } from "../interfaces/sequential.interface.js";

export class Config {
  private _config: Required<SequentialFieldConfig> = { loop: false };

  constructor(config?: SequentialFieldConfig) {
    if (typeof config === "object" && config !== null) {
      if (config.loop) {
        this._config.loop = true;
      }
    }
  }

  public value() {
    return this._config;
  }
}
