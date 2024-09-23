import { DatasetStore } from "../../../dataset-store";

export interface PickFieldProps<V = any> {
  values: V[];
  count: PickCount;
}

export type PickCount = number;

export type PickCountLimits = { min?: number; max?: number };

export type PickCountFunction = (
  props: PickCountFunctionProps,
) => number | PickCountLimits;

export type PickCountFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export class PickField<V = any> {
  constructor(readonly values: PickFieldProps<V>) {}
}
