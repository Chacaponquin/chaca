import { ChacaError } from "../../../../errors";
import { Module } from "../../../../modules";
import {
  CustomField,
  SchemaFieldType,
} from "../../../schema/interfaces/schema";
import { RefField } from "../ref";
import { SequenceField } from "../sequence/SequenceField";

/**
 * Posible types for key schema field
 */
export type KeyAllowDataTypes = string | number | Date;
/**
 * Posible types for key schema field
 */
export type KeyFieldProps<A, C> =
  | Module<KeyAllowDataTypes, A>
  | RefField
  | SequenceField
  | CustomField<C, KeyAllowDataTypes>;

export class KeyField<A = any, C = any> extends SchemaFieldType {
  private field: KeyFieldProps<A, C>;

  constructor(fieldType: KeyFieldProps<A, C>) {
    super();
    this.field = this.validate(fieldType);
  }

  getFieldType() {
    return this.field;
  }

  private validate(fieldFunction: KeyFieldProps<A, C>): KeyFieldProps<A, C> {
    if (
      fieldFunction instanceof Module ||
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
