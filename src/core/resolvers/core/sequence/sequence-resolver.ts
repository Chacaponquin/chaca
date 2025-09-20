import { SequenceFieldProps } from "../../../fields/core/sequence/sequence-field";
import { IResolver } from "../../interfaces/resolvers";

export class SequenceFieldResolver extends IResolver {
  constructor(private readonly config: Required<SequenceFieldProps>) {
    super();
  }

  getConfig() {
    return this.config;
  }
}
