import { IResolver } from "../../interfaces/resolvers.interface.js";

export class SequentialFieldResolver<K = any> extends IResolver {
  constructor(public readonly valuesArray: Array<K>) {
    super();
  }
}
