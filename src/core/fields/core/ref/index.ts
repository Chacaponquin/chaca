import { DatasetStore } from "../../../dataset-store";
import { NullOnEmpty } from "./value-object/null-empty";
import { InputRefField } from "./value-object/ref-field";
import { Unique } from "./value-object/unique";
import { Where } from "./value-object/where";

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

export type RefFieldConfig = {
  /**
   * The value to be referenced will only be taken once by this schema. Default `false`
   */
  unique?: boolean;
  /**
   * Function that filters the fields to reference
   */
  where?: RefFieldWhere;
  /**
   * When there are no more documents to reference, the generated value will be null. Default `false`
   */
  nullOnEmpty?: boolean;
};

export interface FieldToRefObject {
  refField: string;
  unique: boolean;
  where: RefFieldWhere | null;
  nullOnEmpty: boolean;
}

export class RefField {
  readonly refField: FieldToRefObject;

  constructor(refField: FieldToRef, config?: RefFieldConfig) {
    this.refField = this.validate(refField, config);
  }

  private validate(
    refField: FieldToRef,
    config?: RefFieldConfig,
  ): FieldToRefObject {
    const saveConfig: FieldToRefObject = {
      refField: new InputRefField(refField).value(),
      unique: new Unique(config?.unique).value(),
      where: new Where(config?.where).value(),
      nullOnEmpty: new NullOnEmpty(config?.nullOnEmpty).value(),
    };

    return saveConfig;
  }
}
