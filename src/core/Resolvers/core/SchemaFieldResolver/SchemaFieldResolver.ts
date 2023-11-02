import { SchemaField } from "../../../../schemas/SchemaField";
import { IResolver } from "../../interfaces/resolvers";

export class SchemaFieldResolver extends IResolver {
  constructor(public readonly schema: SchemaField) {
    super();
  }
}
