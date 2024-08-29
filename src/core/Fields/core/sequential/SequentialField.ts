import { SchemaFieldType } from "../../../schema/interfaces/schema";
import { SequentialFieldConfig } from "./interfaces/sequential.interface";
import { Config } from "./value-object";

export class SequentialField<K = any> extends SchemaFieldType {
  private valuesArray: Array<K>;
  private config: Required<SequentialFieldConfig>;

  constructor(valuesArray: Array<K>, config?: SequentialFieldConfig) {
    super();

    this.valuesArray = valuesArray;
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
