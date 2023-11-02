import { IResolver } from "../../interfaces/resolvers";
import { FieldToRefObject } from "../../../Fields/core/RefField/RefField";

export class RefFieldResolver extends IResolver {
  constructor(public readonly refField: FieldToRefObject) {
    super();
  }
}
