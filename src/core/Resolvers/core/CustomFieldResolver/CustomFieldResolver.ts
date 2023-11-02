import { CustomField } from "../../../ChacaSchema/interfaces/schema";
import { IResolver } from "../../interfaces/resolvers";

export class CustomFieldResolver<C, R> extends IResolver {
  constructor(public readonly fun: CustomField<C, R>) {
    super();
  }
}
