import { IResolver } from "../../../interfaces/schema.interface.js";
import { Schema } from "../../schemas/Schema/Schema.js";

export class MixedFieldResolver extends IResolver {
  constructor(public readonly schema: Schema) {
    super();
  }
}
