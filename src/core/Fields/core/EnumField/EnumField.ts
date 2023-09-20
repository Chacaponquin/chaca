import { SchemaFieldType } from "../../../ChacaSchema/interfaces/schema.interface.js";

export class EnumField<R = any> extends SchemaFieldType {
  constructor(public readonly valuesArray: Array<R>) {
    super();
  }
}
