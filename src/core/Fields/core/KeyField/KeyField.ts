import { ChacaError } from "../../../../errors";
import { SchemaField } from "../../../../schemas/SchemaField";
import {
  CustomField,
  SchemaFieldType,
} from "../../../ChacaSchema/interfaces/schema";
import { RefField } from "../RefField/RefField";
import { SequenceField } from "../SequenceField/SequenceField";

/**
 * Posible types for key schema field
 */
export type KeyAllowDataTypes = string | number | Date;
/**
 * Posible types for key schema field
 */
export type KeyFieldProps<A, C> =
  | SchemaField<KeyAllowDataTypes, A>
  | RefField
  | SequenceField
  | CustomField<C, KeyAllowDataTypes>;

export class KeyField<A = any, C = any> extends SchemaFieldType {
  private fieldType: KeyFieldProps<A, C>;

  constructor(fieldType: KeyFieldProps<A, C>) {
    super();
    this.fieldType = this.validate(fieldType);
  }

  public getFieldType() {
    return this.fieldType;
  }

  private validate(fieldFunction: KeyFieldProps<A, C>): KeyFieldProps<A, C> {
    if (
      fieldFunction instanceof SchemaField ||
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
