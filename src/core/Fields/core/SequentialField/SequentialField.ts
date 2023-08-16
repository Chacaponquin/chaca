import { ChacaError } from "../../../../errors/ChacaError.js";
import { SequentialFieldConfig } from "./interfaces/sequential.interface.js";
import { Config } from "./value-object/index.js";

export class SequentialField<K = any> {
  private valuesArray: Array<K>;
  private config: Required<SequentialFieldConfig>;

  constructor(valuesArray: Array<K>, config?: SequentialFieldConfig) {
    if (Array.isArray(valuesArray)) {
      this.valuesArray = valuesArray;
    } else {
      throw new ChacaError("The sequential field must be an array of values.");
    }

    this.config = new Config(config).value();
  }

  public getValuesArray() {
    return this.valuesArray;
  }

  public getConfig() {
    return this.config;
  }
}

export type { SequentialFieldConfig };
