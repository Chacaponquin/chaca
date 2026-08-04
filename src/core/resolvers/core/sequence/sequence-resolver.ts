import { SequenceFieldConfig } from "../../../fields/core/sequence/sequence-field";
import { IResolver } from "../../interfaces/resolvers";

export class SequenceFieldResolver extends IResolver {
  constructor(private readonly config: SequenceFieldConfig) {
    super();
  }

  getConfig() {
    return this.config;
  }
}
