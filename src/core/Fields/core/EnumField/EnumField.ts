import { SchemaFieldType } from "../../../ChacaSchema/interfaces/schema";

export class EnumField<R = any> extends SchemaFieldType {
  constructor(public readonly valuesArray: Array<R>) {
    super();
  }
}
