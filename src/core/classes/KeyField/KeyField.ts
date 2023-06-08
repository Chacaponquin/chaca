import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import { CustomField } from "../../interfaces/schema.interface.js";
import { RefField } from "../RefField/RefField.js";
import { SequenceField } from "../SequenceField/SequenceField.js";

export type KeyAllowDataTypes = string | number | Date;
export type KeyFieldProps<A, C> =
  | SchemaField<KeyAllowDataTypes, A>
  | RefField
  | SequenceField
  | CustomField<C, KeyAllowDataTypes>;

export class KeyField<A = any, C = any> {
  private fieldType: KeyFieldProps<A, C>;

  constructor(fieldType: KeyFieldProps<A, C>) {
    this.fieldType = this.validateFieldFunction(fieldType);
  }

  public getFieldType() {
    return this.fieldType;
  }

  private validateFieldFunction(
    fieldFunction: KeyFieldProps<A, C>,
  ): KeyFieldProps<A, C> {
    if (
      fieldFunction instanceof SchemaField ||
      fieldFunction instanceof RefField ||
      fieldFunction instanceof SequenceField ||
      typeof fieldFunction === "function"
    ) {
      return fieldFunction;
    } else {
      throw new ChacaError(
        `The key field must be SchemaField that return an string or a number`,
      );
    }
  }
}
