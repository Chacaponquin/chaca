import {
  FieldRefInputConfig,
  FieldToRef,
  RefFieldWhere,
  RefFieldWhereProps,
} from "./interfaces/ref";
import { InputRefField, Config } from "./value-object";

export interface FieldToRefObject {
  refField: string;
  unique: boolean;
  where: RefFieldWhere | null;
}

export class RefField {
  readonly refField: FieldToRefObject;

  constructor(refField: FieldToRef, config?: FieldRefInputConfig) {
    this.refField = this.validate(refField, config);
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
