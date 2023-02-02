import { IResolver } from "../../../interfaces/schema.interface.js";

export class EnumFieldResolver<R> extends IResolver {
  constructor(public readonly array: Array<R>) {
    super();
  }
}
