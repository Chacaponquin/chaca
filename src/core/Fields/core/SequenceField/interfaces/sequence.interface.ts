export type SequenceFieldProps = Partial<{
  /** Init value for the field. Default `1`*/
  starsWith: number;
  /** Step between field values in schema documents. Default `1` */
  step: number;
}>;
