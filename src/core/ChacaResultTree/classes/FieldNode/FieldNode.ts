import { SingleResultNode } from "../SingleResultNode/SingleResultNode.js";

export interface FieldNodeProps {
  name: string;
  isPossibleNull: number;
}

export abstract class FieldNode {
  protected isNull: boolean;

  constructor(public readonly nodeConfig: FieldNodeProps) {
    this.isNull = this.nullPosibility();
  }

  protected abstract getValue(): unknown | Array<unknown>;
  public abstract getNodeByRoute(fieldTreeRoute: Array<string>): FieldNode;

  protected abstract getRefValueByNodeRoute(
    fieldTreeRoute: Array<string>,
  ): SingleResultNode;

  public getRefValueByRoute(fieldTreeRoute: Array<string>): SingleResultNode {
    const value = this.getRefValueByNodeRoute(fieldTreeRoute);
    return value;
  }

  public getRealValue() {
    return this.isNull ? null : this.getValue();
  }

  private nullPosibility(): boolean {
    const possibleNull = this.nodeConfig.isPossibleNull;
    if (possibleNull > 0 && possibleNull < 100) {
      const randomVal = Math.floor(Math.random() * 101); // Genera un número aleatorio del 0 al 100

      if (randomVal <= possibleNull) {
        return true; // Devuelve null si el número aleatorio es menor o igual que la probabilidad
      } else {
        return false;
      }
    } else if (possibleNull === 100) {
      return true;
    } else {
      return false;
    }
  }
}
