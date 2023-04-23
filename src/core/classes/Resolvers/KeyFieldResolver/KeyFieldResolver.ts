import { SchemaField } from "../../../../schemas/SchemaField.js";

export class KeyFieldResolver {
  constructor(public readonly fieldFiunction: SchemaField<string | number>) {}
}
