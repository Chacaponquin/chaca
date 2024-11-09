import { DatasetStore } from "../../../dataset-store";

/**
 * Function that returns a value depending on the state of the current document and the dataset
 */
export type CustomField<C = any, R = any> = (args: CustomFieldProps<C>) => R;
export type CustomFieldProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};
