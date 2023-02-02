import {
  CustomField,
  IResolver,
} from "../../../interfaces/schema.interface.js";

export class CustomFieldResolver<C, R> extends IResolver {
  constructor(public readonly fun: CustomField<C, R>) {
    super();
  }
}
