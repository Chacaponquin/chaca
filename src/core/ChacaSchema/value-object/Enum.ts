import { ChacaError } from "../../../errors/ChacaError.js";
import { EnumField } from "../../Fields/core/EnumField/EnumField.js";
import { EnumFieldResolver } from "../../Resolvers/core/index.js";

interface EnumProps<R> {
  enumField: EnumField<R>;
}

export class InputEnumField<R> {
  private _resolver: EnumFieldResolver<R>;

  constructor({ enumField }: EnumProps<R>) {
    if (Array.isArray(enumField.valuesArray)) {
      if (enumField.valuesArray.length > 0) {
        this._resolver = new EnumFieldResolver(enumField.valuesArray);
      } else
        throw new ChacaError(
          `You must provide some values to choce in a enum field`,
        );
    } else {
      throw new ChacaError(
        `If your field is a enum so this one must be an array of values`,
      );
    }
  }

  public resolver() {
    return this._resolver;
  }
}
