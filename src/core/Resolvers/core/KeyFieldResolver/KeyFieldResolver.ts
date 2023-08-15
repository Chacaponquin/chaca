import { IResolver } from "../../interfaces/resolvers.interface.js";
import { CustomFieldResolver } from "../CustomFieldResolver/CustomFieldResolver.js";
import { RefFieldResolver } from "../RefFieldResolver/RefFieldResolver.js";
import { SchemaFieldResolver } from "../SchemaFieldResolver/SchemaFieldResolver.js";
import { SequenceFieldResolver } from "../SequenceFieldResolver/SequenceFieldResolver.js";

export type KeyFieldResolverProps =
  | SchemaFieldResolver
  | RefFieldResolver
  | SequenceFieldResolver
  | CustomFieldResolver<any, any>;

export class KeyFieldResolver extends IResolver {
  constructor(public readonly fieldType: KeyFieldResolverProps) {
    super();
  }
}
