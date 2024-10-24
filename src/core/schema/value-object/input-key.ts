import { ChacaError } from "../../../errors";
import { KeyField, RefField, SequenceField } from "../../fields/core";
import { KeyFieldResolverProps } from "../../resolvers/core/key";
import {
  CustomFieldResolver,
  KeyFieldResolver,
  RefFieldResolver,
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
    const fieldType = schema.field;

    let type: KeyFieldResolverProps;
    if (fieldType instanceof RefField) {
      type = new RefFieldResolver(fieldType.refField);
    } else if (fieldType instanceof SequenceField) {
      type = new SequenceFieldResolver(fieldType.config);
    } else if (typeof fieldType === "function") {
      type = new CustomFieldResolver(fieldType);
    } else {
      throw new ChacaError(`Incorrect type for the key schema`);
    }

    return new KeyFieldResolver(type);
  }
}
