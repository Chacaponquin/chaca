import { ChacaError } from "../../../../errors/ChacaError.js";
import { IResolver } from "../../../interfaces/schema.interface.js";

export type FieldToRef = string | FieldToRefObject;

export interface FieldToRefObject {
  refField: string;
}

export class RefFieldResolver extends IResolver {
  private refField: FieldToRefObject;

  constructor(refField: FieldToRef) {
    super();
    this.refField = this.validateFieldToRef(refField);
  }

  public getRefField() {
    return this.refField;
  }

  private validateFieldToRef(refField: FieldToRef): FieldToRefObject {
    if (typeof refField === "string") {
      if (refField === "") {
        throw new ChacaError("You can't ref an empty field");
      } else {
        return { refField };
      }
    } else if (typeof refField === "object" && refField !== null) {
      const returnField: FieldToRefObject = { refField: "" };

      if (typeof refField.refField === "string" && refField.refField) {
        returnField.refField = refField.refField;

        return returnField;
      } else {
        throw new ChacaError("You can't ref an empty field");
      }
    } else {
      throw new ChacaError("You can't ref an empty field");
    }
  }
}
