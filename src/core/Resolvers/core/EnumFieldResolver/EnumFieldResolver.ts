import { IResolver } from "../../interfaces/resolvers";

export class EnumFieldResolver<R> extends IResolver {
  constructor(public readonly array: Array<R>) {
    super();
  }
}
