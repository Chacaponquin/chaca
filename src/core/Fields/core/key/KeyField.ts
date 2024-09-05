import { ChacaError } from "../../../../errors";
import { CustomField } from "../../../schema/interfaces/schema";
import { RefField } from "../ref";
import { SequenceField } from "../sequence/SequenceField";

/**
 * Posible types for key schema field
 */
export type KeyAllowDataTypes = string | number | Date;
/**
 * Posible types for key schema field
 */
export type KeyFieldProps<C = any> =
  | RefField
  | SequenceField
  | CustomField<C, KeyAllowDataTypes>;

export class KeyField<C = any> {
  readonly field: KeyFieldProps<C>;

  constructor(type: KeyFieldProps<C>) {
    this.field = this.validate(type);
  }

  private validate(fieldFunction: KeyFieldProps<C>): KeyFieldProps<C> {
    if (
      fieldFunction instanceof RefField ||
      fieldFunction instanceof SequenceField ||
      typeof fieldFunction === "function"
    ) {
      return fieldFunction;
    } else {
      throw new ChacaError(
        `The key field must return an string, number or Date`,
      );
    }
  }
}
