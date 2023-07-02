import { SequenceFieldProps } from "../../SequenceField/SequenceField.js";
import { IResolver } from "../../../interfaces/schema.interface.js";

export class SequenceFieldResolver extends IResolver {
  constructor(private readonly config: Required<SequenceFieldProps>) {
    super();
  }

  public getConfig() {
    return this.config;
  }
}
