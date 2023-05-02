import { ChacaError } from "../../../../errors/ChacaError.js";
import { IResolver } from "../../../interfaces/schema.interface.js";

export type FieldToRef = string;

export type FieldRefInputConfig = {
  unique?: boolean;
};

export interface FieldToRefObject {
  refField: string;
  unique: boolean;
}

export class RefFieldResolver extends IResolver {
  private refField: FieldToRefObject;

  constructor(refField: FieldToRef, config?: FieldRefInputConfig) {
    super();
    this.refField = this.validateFieldToRef(refField, config);
  }

  public getRefField() {
    return this.refField;
  }

  public getFieldToRef(): string {
    return this.refField.refField;
  }

  private validateFieldToRef(
    refField: FieldToRef,
    config?: FieldRefInputConfig,
  ): FieldToRefObject {
    if (typeof refField === "string") {
      const saveConfig: FieldToRefObject = { refField: "", unique: false };

      if (refField === "") {
        throw new ChacaError("You can't ref an empty field");
      } else {
        saveConfig.refField = refField;
      }

      if (config && typeof config === "object") {
        if (typeof config.unique === "boolean") {
          saveConfig.unique = config.unique;
        }
      }

      return saveConfig;
    } else {
      throw new ChacaError("You can't ref an empty field");
    }
  }
}