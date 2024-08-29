import { ChacaError } from "../../../errors";
import { Module } from "../../../modules/";
import { KeyField, RefField, SequenceField } from "../../fields/core";
import { KeyFieldResolverProps } from "../../resolvers/core/key/KeyFieldResolver";
import {
  CustomFieldResolver,
  KeyFieldResolver,
  RefFieldResolver,
  ModuleResolver,
  SequenceFieldResolver,
} from "../../resolvers/core";

export class InputKeyField {
  private _resolver: KeyFieldResolver;

  constructor(schema: KeyField) {
    this._resolver = this.validate(schema);
  }

  resolver() {
    return this._resolver;
  }

  private validate(schema: KeyField): KeyFieldResolver {
    const fieldType = schema.getFieldType();

    let type: KeyFieldResolverProps;
    if (fieldType instanceof Module) {
      type = new ModuleResolver(fieldType);
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
