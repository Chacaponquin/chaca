import { ChacaError } from "../../../errors/ChacaError.js";
import { EnumField } from "../../Fields/core/EnumField/EnumField.js";
import { EnumFieldResolver } from "../../Resolvers/core/index.js";

interface EnumProps<R> {
  key?: string;
  enumField: EnumField<R>;
}

export class InputEnumField<R> {
  private _resolver: EnumFieldResolver<R>;

  constructor({ enumField, key }: EnumProps<R>) {
    if (Array.isArray(enumField.valuesArray)) {
      if (enumField.valuesArray.length > 0) {
        this._resolver = new EnumFieldResolver(enumField.valuesArray);
      } else
        throw new ChacaError(
          `For the field ${key} you must provide some values to choce`,
        );
    } else {
      throw new ChacaError(
        `If the field ${key} is a enum type so this one muste be an array of values`,
      );
    }
  }

  public resolver() {
    return this._resolver;
  }
}
