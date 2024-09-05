import { Config } from "./value-object";

export type SequenceFieldProps = Partial<{
  /** Init value for the field. Default `1`*/
  starsWith: number;
  /** Step between field values in schema documents. Default `1` */
  step: number;
}>;

export class SequenceField {
  private config: Required<SequenceFieldProps>;

  constructor(config?: SequenceFieldProps) {
    this.config = new Config(config).value();
  }

  public getConfig() {
    return this.config;
  }
}
