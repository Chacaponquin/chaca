import { ChacaError } from "../../../../errors/ChacaError.js";
import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";

/**
 * Field to ref types
 */
export type FieldToRef = string;

/**
 * Function that filters the fields to reference
 */
export type RefFieldWhere<C = any, R = any> = (args: {
  /** Current schema document fields */
  currentFields: C;
  /** Reference schema document fields */
  refFields: R;
  /** Store to interact with all datasets */
  store: DatasetStore;
}) => boolean;

export type FieldRefInputConfig =
  | RefFieldWhere
  | {
      /**
       * The value to be referenced will only be taken once by this schema
       */
      unique?: boolean;
      /**
       * Function that filters the fields to reference
       */
      where?: RefFieldWhere;
    };

export interface FieldToRefObject {
  refField: string;
  unique: boolean;
  where: RefFieldWhere | null;
}

export class RefField {
  private refField: FieldToRefObject;

  constructor(refField: FieldToRef, config?: FieldRefInputConfig) {
    this.refField = this.validateFieldToRef(refField, config);
  }

  public getRefField() {
    return this.refField;
  }

  private validateFieldToRef(
    refField: FieldToRef,
    config?: FieldRefInputConfig,
  ): FieldToRefObject {
    if (typeof refField === "string") {
      const saveConfig: FieldToRefObject = {
        refField: "",
        unique: false,
        where: null,
      };

      if (refField === "") {
        throw new ChacaError("You can't ref an empty field");
      } else {
        saveConfig.refField = refField;
      }

      if (typeof config === "function") {
        saveConfig.where = config;
      } else if (config && typeof config === "object") {
        if (typeof config.unique === "boolean") {
          saveConfig.unique = config.unique;
        }

        if (typeof config.where === "function") {
          saveConfig.where = config.where;
        }
      }

      return saveConfig;
    } else {
      throw new ChacaError("You can't ref an empty field");
    }
  }
}
