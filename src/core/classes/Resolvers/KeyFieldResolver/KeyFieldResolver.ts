import { IResolver } from "../../../interfaces/schema.interface.js";
import { RefFieldResolver } from "../RefFieldResolver/RefFieldResolver.js";
import { SchemaFieldResolver } from "../SchemaFieldResolver/SchemaFieldResolver.js";
import { SequenceFieldResolver } from "../SequenceFieldResolver/SequenceFieldResolver.js";

export type KeyFieldResolverProps =
  | SchemaFieldResolver
  | RefFieldResolver
  | SequenceFieldResolver;

export class KeyFieldResolver extends IResolver {
  constructor(public readonly fieldType: KeyFieldResolverProps) {
    super();
  }
}
