import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";
import { SingleResultNode } from "../SingleResultNode/SingleResultNode.js";

export interface FieldNodeProps {
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  protected isNull: boolean;

  constructor(public readonly nodeConfig: FieldNodeProps) {
    this.isNull = this.nullPosibility();
  }

  protected abstract getValue(): unknown | Array<unknown>;

  protected abstract getValueByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): SingleResultNode;

  public getRefValueByRoute(fieldTreeRoute: Array<string>): SingleResultNode {
    const value = this.getValueByNodeRoute(fieldTreeRoute);
    return value;
  }

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
