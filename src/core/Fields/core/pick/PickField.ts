export interface PickFieldProps<V> {
  values: V[];
  count: number;
}

export class PickField<V = any> {
  constructor(readonly values: PickFieldProps<V>) {}
}
