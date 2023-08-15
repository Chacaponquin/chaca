import { IResolver } from "../../interfaces/resolvers.interface.js";
import { FieldToRefObject } from "../../../Fields/core/RefField/RefField.js";

export class RefFieldResolver extends IResolver {
  constructor(public readonly refField: FieldToRefObject) {
    super();
  }
}
