import { IResolver } from "../../interfaces/resolvers";
import { FieldToRefObject } from "../../../fields/core/ref/ref-field";

export class RefFieldResolver extends IResolver {
  constructor(readonly refField: FieldToRefObject) {
    super();
  }
}
