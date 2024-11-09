import { ChacaError } from "../../../errors";
import { KeyField, RefField, SequenceField } from "../../fields/core";
import { KeyFieldResolverProps } from "../../resolvers/core/key";
import {
  CustomFieldResolver,
  KeyFieldResolver,
  RefFieldResolver,
  SequenceFieldResolver,
} from "../../resolvers/core";
import { NodeRoute } from "../../input-tree/core/node/value-object/route";

export class InputKeyField {
  private _resolver: KeyFieldResolver;

  constructor(route: NodeRoute, schema: KeyField) {
    let type: KeyFieldResolverProps;
    if (schema.field instanceof RefField) {
      type = new RefFieldResolver(schema.field.refField);
    } else if (schema.field instanceof SequenceField) {
      type = new SequenceFieldResolver(schema.field.config);
    } else if (typeof schema.field === "function") {
      type = new CustomFieldResolver(schema.field);
    } else {
      throw new ChacaError(
        `The field '${route.string()}' has a incorrect type for key definition`,
      );
    }

    this._resolver = new KeyFieldResolver(type);
  }

  resolver() {
    return this._resolver;
  }
}
