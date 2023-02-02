import { SchemaField } from "../../../../schemas/SchemaField.js";
import { IResolver } from "../../../interfaces/schema.interface.js";

export class SchemaFieldResolver extends IResolver {
  constructor(public readonly schema: SchemaField) {
    super();
  }
}
