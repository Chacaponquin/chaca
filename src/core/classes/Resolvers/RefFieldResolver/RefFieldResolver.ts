import { IResolver } from "../../../interfaces/schema.interface.js";
import { FieldToRefObject } from "../../RefField/RefField.js";

export class RefFieldResolver extends IResolver {
  constructor(public readonly refField: FieldToRefObject) {
    super();
  }
}
