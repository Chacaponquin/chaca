import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import { RefField } from "../RefField/RefField.js";

export type KeyFieldProps<A> = SchemaField<string | number, A> | RefField;

export class KeyField<A = any> {
  private fieldType: KeyFieldProps<A>;

  constructor(fieldType: KeyFieldProps<A>) {
    this.fieldType = this.validateFieldFunction(fieldType);
  }

  public getFieldType() {
    return this.fieldType;
  }

  private validateFieldFunction(
    fieldFunction: KeyFieldProps<A>,
  ): KeyFieldProps<A> {
    if (
      fieldFunction instanceof SchemaField ||
      fieldFunction instanceof RefField
    ) {
      return fieldFunction;
    } else {
      throw new ChacaError(
        `The key field must be SchemaField that return an string or a number`,
      );
    }
  }
}
