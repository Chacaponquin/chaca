import { IResolver } from "../../interfaces/resolvers";
import { ChacaSchema } from "../../../schema";

export class MixedFieldResolver extends IResolver {
  constructor(readonly schema: ChacaSchema) {
    super();
  }
}
