import { SequentialFieldConfig } from "../../../fields/core/sequential/SequentialField";
import { IResolver } from "../../interfaces/resolvers";

export class SequentialFieldResolver<K = any> extends IResolver {
  constructor(
    public readonly valuesArray: Array<K>,
    public readonly config: Required<SequentialFieldConfig>,
  ) {
    super();
  }
}
