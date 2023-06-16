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
    const posibleNull = this.nodeConfig.isPosibleNull;
    if (posibleNull > 0 && posibleNull < 100) {
      const randomVal = Math.floor(Math.random() * 101); // Genera un número aleatorio del 0 al 100

      if (randomVal <= posibleNull) {
        return true; // Devuelve null si el número aleatorio es menor o igual que la probabilidad
      } else {
        return false; // Devuelve una cadena vacía si el número aleatorio es mayor que la probabilidad
      }
    } else if (posibleNull === 100) {
      return true;
    } else {
      return false;
    }
  }
}
