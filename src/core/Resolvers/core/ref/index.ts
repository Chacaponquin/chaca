import { IResolver } from "../../interfaces/resolvers";
import { FieldToRefObject } from "../../../fields/core/ref";

export class RefFieldResolver extends IResolver {
  constructor(readonly refField: FieldToRefObject) {
    super();
  }
}
