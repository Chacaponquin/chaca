import { CustomField } from "../../../fields/core/custom/custom-field";
import { IResolver } from "../../interfaces/resolvers";

export class CustomFieldResolver<C = any, R = any> extends IResolver {
  constructor(readonly fun: CustomField<C, R>) {
    super();
  }
}
