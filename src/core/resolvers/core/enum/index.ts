import { IResolver } from "../../interfaces/resolvers";

export class EnumFieldResolver<R> extends IResolver {
  constructor(readonly array: ReadonlyArray<R>) {
    super();
  }
}
