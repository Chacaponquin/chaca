import { SchemaField } from "../../../../schemas/SchemaField.js";
import { IResolver } from "../../../interfaces/schema.interface.js";

export class KeyFieldResolver extends IResolver {
  constructor(public readonly fieldFiunction: SchemaField<string | number>) {
    super();
  }
}
