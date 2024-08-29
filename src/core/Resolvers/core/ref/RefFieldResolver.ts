import { IResolver } from "../../interfaces/resolvers";
import { FieldToRefObject } from "../../../fields/core/ref/RefField";

export class RefFieldResolver extends IResolver {
  constructor(public readonly refField: FieldToRefObject) {
    super();
  }
}
