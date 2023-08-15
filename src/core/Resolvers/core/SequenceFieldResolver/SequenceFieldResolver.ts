import { SequenceFieldProps } from "../../../Fields/core/SequenceField/SequenceField.js";
import { IResolver } from "../../interfaces/resolvers.interface.js";

export class SequenceFieldResolver extends IResolver {
  constructor(private readonly config: Required<SequenceFieldProps>) {
    super();
  }

  public getConfig() {
    return this.config;
  }
}
