import { IResolver } from "../../interfaces/resolvers";
import { CustomFieldResolver } from "../custom/CustomFieldResolver";
import { RefFieldResolver } from "../ref/RefFieldResolver";
import { ModuleResolver } from "../module";
import { SequenceFieldResolver } from "../sequence/SequenceFieldResolver";

export type KeyFieldResolverProps =
  | ModuleResolver
  | RefFieldResolver
  | SequenceFieldResolver
  | CustomFieldResolver<any, any>;

export class KeyFieldResolver extends IResolver {
  constructor(public readonly fieldType: KeyFieldResolverProps) {
    super();
  }
}
