import { SequenceFieldProps } from "../../../fields/core/sequence/SequenceField";
import { IResolver } from "../../interfaces/resolvers";

export class SequenceFieldResolver extends IResolver {
  constructor(private readonly config: Required<SequenceFieldProps>) {
    super();
  }

  public getConfig() {
    return this.config;
  }
}
