import { CustomField } from "../../../fields/core/custom";
import { IResolver } from "../../interfaces/resolvers";

export class CustomFieldResolver<C, R> extends IResolver {
  constructor(readonly fun: CustomField<C, R>) {
    super();
  }
}
