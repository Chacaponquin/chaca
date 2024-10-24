import { IResolver } from "../../interfaces/resolvers";
import { CustomFieldResolver } from "../custom";
import { RefFieldResolver } from "../ref";
import { SequenceFieldResolver } from "../sequence";

export type KeyFieldResolverProps =
  | RefFieldResolver
  | SequenceFieldResolver
  | CustomFieldResolver<any, any>;

export class KeyFieldResolver extends IResolver {
  constructor(readonly type: KeyFieldResolverProps) {
    super();
  }
}
