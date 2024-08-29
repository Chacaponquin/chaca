import { SchemaFieldType } from "../../../schema/interfaces/schema";
import { SequenceFieldProps } from "./interfaces/sequence.interface";
import { Config } from "./value-object";

export class SequenceField extends SchemaFieldType {
  private config: Required<SequenceFieldProps>;

  constructor(config?: SequenceFieldProps) {
    super();
    this.config = new Config(config).value();
  }

  public getConfig() {
    return this.config;
  }
}

export type { SequenceFieldProps };
