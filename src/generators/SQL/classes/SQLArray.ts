import { SQLNode } from "./SQLNode.js";
import { SQLNull } from "./SQLNull.js";
import { SQLType } from "./SQLType.js";

export class SQLArray extends SQLType {
  private nodes: Array<SQLNode> = [];

  constructor(value: Array<any>) {
    super(value);
  }

  public equal(otherType: SQLType): boolean {
    if (otherType instanceof SQLArray) {
      return this.getArrayType().equal(otherType.getArrayType());
    } else {
      return false;
    }
  }

  public insertNode(node: SQLNode): void {
    this.nodes.push(node);
  }

  public getArrayType(): SQLType {
    if (this.nodes[0]) {
      return this.nodes[0].getValueType();
    } else {
      return new SQLNull();
    }
  }
}
