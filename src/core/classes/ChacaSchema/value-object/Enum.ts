import { ChacaError } from "../../../../errors/ChacaError.js";
import { EnumField } from "../../EnumField/EnumField.js";
import { EnumFieldResolver } from "../../Resolvers/index.js";

export class Enum<R> {
  private _resolver: EnumFieldResolver<R>;

  constructor(key: string, enumField: EnumField<R>) {
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
