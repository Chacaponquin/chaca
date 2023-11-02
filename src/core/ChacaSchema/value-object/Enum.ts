import { EnumField } from "../../Fields/core/EnumField/EnumField.js";
import { EnumFieldResolver } from "../../Resolvers/core/index.js";

interface EnumProps<R> {
  enumField: EnumField<R>;
}

export class InputEnumField<R> {
  private _resolver: EnumFieldResolver<R>;

  constructor({ enumField }: EnumProps<R>) {
    this._resolver = new EnumFieldResolver(enumField.valuesArray);
  }

  public resolver() {
    return this._resolver;
  }
}
