import { SchemaFieldType } from "../../../ChacaSchema/interfaces/schema.interface.js";
import {
  FieldRefInputConfig,
  FieldToRef,
  RefFieldWhere,
  RefFieldWhereProps,
} from "./interfaces/ref.interface.js";
import { InputRefField, Config } from "./value-object/index.js";

export interface FieldToRefObject {
  refField: string;
  unique: boolean;
  where: RefFieldWhere | null;
}

export class RefField extends SchemaFieldType {
  private refField: FieldToRefObject;

  constructor(refField: FieldToRef, config?: FieldRefInputConfig) {
    super();
    this.refField = this.validate(refField, config);
  }

  public getRefField() {
    return this.refField;
  }

  private validate(
    refField: FieldToRef,
    inputConfig?: FieldRefInputConfig,
  ): FieldToRefObject {
    const config = new Config(inputConfig);

    const saveConfig: FieldToRefObject = {
      refField: new InputRefField(refField).value(),
      unique: config.unique(),
      where: config.where(),
    };

    return saveConfig;
  }
}

export type {
  FieldRefInputConfig,
  FieldToRef,
  RefFieldWhere,
  RefFieldWhereProps,
};
