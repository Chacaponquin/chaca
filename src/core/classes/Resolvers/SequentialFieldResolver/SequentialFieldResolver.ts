import { IResolver } from "../../../interfaces/schema.interface.js";

export class SequentialFieldResolver<K = any> extends IResolver {
  constructor(public readonly valuesArray: Array<K>) {
    super();
  }
}
