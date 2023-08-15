import { IResolver } from "../../interfaces/resolvers.interface.js";

export class EnumFieldResolver<R> extends IResolver {
  constructor(public readonly array: Array<R>) {
    super();
  }
}
