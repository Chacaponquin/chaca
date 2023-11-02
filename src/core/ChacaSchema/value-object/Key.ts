import { ChacaError } from "../../../errors";
import { SchemaField } from "../../../schemas/SchemaField";
import { KeyField, RefField, SequenceField } from "../../Fields/core";
import { KeyFieldResolverProps } from "../../Resolvers/core/KeyFieldResolver/KeyFieldResolver";
import {
  CustomFieldResolver,
  KeyFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
  SequenceFieldResolver,
} from "../../Resolvers/core";

export class InputKeyField {
  private _resolver: KeyFieldResolver;

  constructor(schema: KeyField) {
    this._resolver = this.validate(schema);
  }

  public resolver() {
    return this._resolver;
  }

  private validate(schema: KeyField): KeyFieldResolver {
    const fieldType = schema.getFieldType();

    let type: KeyFieldResolverProps;
    if (fieldType instanceof SchemaField) {
      type = new SchemaFieldResolver(fieldType);
    } else if (fieldType instanceof RefField) {
      type = new RefFieldResolver(fieldType.getRefField());
    } else if (fieldType instanceof SequenceField) {
      type = new SequenceFieldResolver(fieldType.getConfig());
    } else if (typeof fieldType === "function") {
      type = new CustomFieldResolver(fieldType);
    } else {
      throw new ChacaError(`Incorrect type for the key schema`);
    }

    return new KeyFieldResolver(type);
  }
}
