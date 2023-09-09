import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import { EnumField, RefField } from "../../Fields/core/index.js";
import {
  CustomFieldResolver,
  MixedFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
} from "../../Resolvers/core/index.js";
import { IResolver } from "../../Resolvers/interfaces/resolvers.interface.js";
import { ChacaSchema } from "../ChacaSchema.js";
import { FieldTypeInput } from "../interfaces/schema.interface.js";
import { InputEnumField } from "./Enum.js";

export class InputFieldType {
  private _resolver: IResolver;

  constructor(key: string, type: FieldTypeInput) {
    this._resolver = this.validate(key, type);
  }

  public resolver() {
    return this._resolver;
  }

  private validate(key: string, type: FieldTypeInput): IResolver {
    if (type instanceof ChacaSchema) {
      return new MixedFieldResolver(type);
    } else if (type instanceof RefField) {
      return new RefFieldResolver(type.getRefField());
    } else if (type instanceof SchemaField) {
      return new SchemaFieldResolver(type);
    } else if (type instanceof EnumField) {
      return new InputEnumField({ key: key, enumField: type }).resolver();
    } else if (typeof type === "function") {
      return new CustomFieldResolver(type);
    } else {
      throw new ChacaError(`Invalid type for key ${key}`);
    }
  }
}
