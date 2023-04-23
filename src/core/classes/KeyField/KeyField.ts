import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";

export class KeyField<A = any> {
  private fieldFiunction: SchemaField<string | number, A>;

  constructor(fieldFiunction: SchemaField<string | number, A>) {
    this.fieldFiunction = this.validateFieldFunction(fieldFiunction);
  }

  private validateFieldFunction(
    fieldFunction: SchemaField<string | number, A>,
  ): SchemaField<string | number, A> {
    if (fieldFunction instanceof SchemaField) {
      return fieldFunction;
    } else {
      throw new ChacaError(
        `The key field must be SchemaField that return an string or a number`,
      );
    }
  }
}
