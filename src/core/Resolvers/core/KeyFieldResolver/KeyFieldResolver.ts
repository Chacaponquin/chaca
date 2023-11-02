import { IResolver } from "../../interfaces/resolvers";
import { CustomFieldResolver } from "../CustomFieldResolver/CustomFieldResolver";
import { RefFieldResolver } from "../RefFieldResolver/RefFieldResolver";
import { SchemaFieldResolver } from "../SchemaFieldResolver/SchemaFieldResolver";
import { SequenceFieldResolver } from "../SequenceFieldResolver/SequenceFieldResolver";

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
