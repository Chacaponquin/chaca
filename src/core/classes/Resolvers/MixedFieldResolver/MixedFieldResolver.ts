import { IResolver } from "../../../interfaces/schema.interface.js";
import { ChacaSchema } from "../../ChacaSchema/ChacaSchema.js";

export class MixedFieldResolver extends IResolver {
  constructor(public readonly schema: ChacaSchema) {
    super();
  }
}