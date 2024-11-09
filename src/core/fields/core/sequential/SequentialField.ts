import { Config } from "./value-object";

export interface SequentialFieldConfig {
  /**
   * Boolean indicating whether the values should be generated cyclically
   */
  loop?: boolean;
}

export class SequentialField<K = any> {
  readonly values: K[];
  readonly config: Required<SequentialFieldConfig>;

  constructor(values: K[], config?: SequentialFieldConfig) {
    this.values = values;
    this.config = new Config(config).value();
  }
}
