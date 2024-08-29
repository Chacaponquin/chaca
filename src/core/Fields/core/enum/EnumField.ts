import { SchemaFieldType } from "../../../schema/interfaces/schema";

export class EnumField<R = any> extends SchemaFieldType {
  constructor(public readonly values: Array<R>) {
    super();
  }
}
