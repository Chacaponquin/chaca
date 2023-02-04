export interface FieldNodeProps {
  name: string;
  isPosibleNull: number;
}

export abstract class FieldNode {
  constructor(public readonly nodeConfig: FieldNodeProps) {}

  public abstract getValue(): unknown | Array<unknown>;
}
