import { DatasetStore } from "../../../../dataset-store";

/**
 * Field to ref types
 */
export type FieldToRef = string;

/**
 * Function that filters the fields to reference
 */
export type RefFieldWhere<C = any, R = any> = (
  args: RefFieldWhereProps<C, R>,
) => boolean;

export type RefFieldWhereProps<C = any, R = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Reference schema document fields */
  refFields: R;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export type RefFieldConfig =
  | RefFieldWhere
  | {
      /**
       * The value to be referenced will only be taken once by this schema
       */
      unique?: boolean;
      /**
       * Function that filters the fields to reference
       */
      where?: RefFieldWhere;
    };
