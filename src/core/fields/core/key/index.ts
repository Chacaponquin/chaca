import { CustomField } from "../custom";
import { RefField } from "../ref";
import { SequenceField } from "../sequence/SequenceField";

/**
 * Posible types for key schema field
 */
export type KeyAllowDataTypes = string | number | Date;
/**
 * Possible types for key schema field
 */
export type KeyFieldProps<C = any> =
  | RefField
  | SequenceField
  | CustomField<C, KeyAllowDataTypes>;

export class KeyField<C = any> {
  readonly field: KeyFieldProps<C>;

  constructor(type: KeyFieldProps<C>) {
    this.field = type;
  }
}
