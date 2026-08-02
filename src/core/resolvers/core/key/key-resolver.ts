import { IResolver } from "../../interfaces/resolvers";
import { CustomFieldResolver } from "../custom/custom-resolver";
import { RefFieldResolver } from "../ref/ref-field-resolver";
import { SequenceFieldResolver } from "../sequence/sequence-resolver";

export type KeyFieldResolverProps =
  RefFieldResolver | SequenceFieldResolver | CustomFieldResolver;

export class KeyFieldResolver extends IResolver {
  constructor(readonly type: KeyFieldResolverProps) {
    super();
  }
}
