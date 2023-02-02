import { SchemaToResolve } from "../../interfaces/schema.interface.js";

export class ChacaInputTree<K, T> {
  constructor(private readonly schemaInputObject: SchemaToResolve<K, T>) {}

  private nodes: Array<Node> = [];
}
