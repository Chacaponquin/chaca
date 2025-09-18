import { CustomField } from "../custom/custom-field";
import { RefField } from "../ref/ref-field";
import { SequenceField } from "../sequence/sequence-field";

/**
 * Possible types for key schema field
 */
export type KeyFieldProps<C = any> = RefField | SequenceField | CustomField<C>;

export class KeyField<C = any> {
  readonly field: KeyFieldProps<C>;

  constructor(type: KeyFieldProps<C>) {
    this.field = type;
  }
}
