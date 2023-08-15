import { CustomField } from "../../../ChacaSchema/interfaces/schema.interface.js";
import { IResolver } from "../../interfaces/resolvers.interface.js";

export class CustomFieldResolver<C, R> extends IResolver {
  constructor(public readonly fun: CustomField<C, R>) {
    super();
  }
}
