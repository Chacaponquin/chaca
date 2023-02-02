export interface FieldNodeProps {
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  constructor(protected readonly nodeConfig: FieldNodeProps) {}

  get isPosibleNull() {
    return this.nodeConfig.isPosibleNull;
  }

  get name() {
    return this.nodeConfig.name;
  }

  public abstract getValue(): unknown | Array<unknown>;
}
