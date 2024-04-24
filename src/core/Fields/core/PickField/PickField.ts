import { SchemaFieldType } from "../../../ChacaSchema/interfaces/schema";

export interface PickFieldProps<V> {
  values: V[];
  count: number;
}

export class PickField<V = any> extends SchemaFieldType {
  constructor(readonly values: PickFieldProps<V>) {
    super();
  }
}
