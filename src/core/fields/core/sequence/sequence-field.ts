import { Config } from "./value-object";

export type SequenceFieldProps = Partial<{
  /** Init value for the field. Default `1`*/
  startsWith: number;
  /**
   * Init value for the field. Default `1`
   * @deprecated Use `startsWith` instead
   */
  starsWith: number;
  /** Step between field values in schema documents. Default `1` */
  step: number;
}>;

export interface SequenceFieldConfig {
  startsWith: number;
  step: number;
}

export class SequenceField {
  readonly config: SequenceFieldConfig;

  constructor(config?: SequenceFieldProps) {
    this.config = new Config(config).value();
  }
}
