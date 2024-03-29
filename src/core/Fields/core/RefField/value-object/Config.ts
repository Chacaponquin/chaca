import {
  FieldRefInputConfig,
  RefFieldWhere,
} from "../interfaces/ref.interface";

export class Config {
  private _unique = false;
  private _where: RefFieldWhere | null = null;

  constructor(config?: FieldRefInputConfig) {
    this.validate(config);
  }

  private validate(config?: FieldRefInputConfig) {
    if (typeof config === "function") {
      this._where = config;
    } else if (config && typeof config === "object") {
      if (typeof config.unique === "boolean") {
        this._unique = config.unique;
      }

      if (typeof config.where === "function") {
        this._where = config.where;
      }
    }
  }

  public unique(): boolean {
    return this._unique;
  }

  public where() {
    return this._where;
  }
}
