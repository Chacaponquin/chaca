import { IResolver } from "../../interfaces/resolvers";
import { CustomFieldResolver } from "../custom";
import { RefFieldResolver } from "../ref";
import { ModuleResolver } from "../module";
import { SequenceFieldResolver } from "../sequence";

export type KeyFieldResolverProps =
  | ModuleResolver
  | RefFieldResolver
  | SequenceFieldResolver
  | CustomFieldResolver<any, any>;

export class KeyFieldResolver extends IResolver {
  constructor(readonly fieldType: KeyFieldResolverProps) {
    super();
  }
}
