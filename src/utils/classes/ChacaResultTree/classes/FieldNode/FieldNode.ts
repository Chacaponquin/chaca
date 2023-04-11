import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";

export interface FieldNodeProps {
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  protected isNull: boolean;

  constructor(public readonly nodeConfig: FieldNodeProps) {
    this.isNull = this.nullPosibility();
  }

  public abstract getValue(): unknown | Array<unknown>;

  public getRealValue() {
    return this.isNull ? null : this.getValue();
  }

  private nullPosibility(): boolean {
    const arrayValues = [] as Array<boolean>;

    let posibleNull = this.nodeConfig.isPosibleNull;

    for (let i = 0; i < 100; i++) {
      if (posibleNull > 0) {
        arrayValues.push(true);
        posibleNull--;
      } else {
        arrayValues.push(false);
      }
    }

    return PrivateUtils.oneOfArray(arrayValues);
  }
}
