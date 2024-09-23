import { IResolver } from "../../interfaces/resolvers";
import { Schema } from "../../../schema";

export class MixedFieldResolver extends IResolver {
  constructor(readonly schema: Schema) {
    super();
  }
}
