import { IResolver } from "../../interfaces/resolvers";
import { ChacaSchema } from "../../../ChacaSchema/ChacaSchema";

export class MixedFieldResolver extends IResolver {
  constructor(public readonly schema: ChacaSchema) {
    super();
  }
}
