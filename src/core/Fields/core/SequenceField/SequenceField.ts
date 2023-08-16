import { SequenceFieldProps } from "./interfaces/sequence.interface.js";
import { Config } from "./value-object/index.js";

export class SequenceField {
  private config: Required<SequenceFieldProps>;

  constructor(config?: SequenceFieldProps) {
    this.config = new Config(config).value();
  }

  public getConfig() {
    return this.config;
  }
}

export type { SequenceFieldProps };
