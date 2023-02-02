import { FieldNode, FieldNodeProps } from "../FieldNode/FieldNode.js";

export class SingleResultNode extends FieldNode {
  private value: unknown;

  constructor(config: FieldNodeProps, value: unknown) {
    super(config);
    this.value = value;
  }

  public getValue(): unknown {
    return this.value;
  }
}
