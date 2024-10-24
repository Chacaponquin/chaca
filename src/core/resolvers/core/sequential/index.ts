import { SequentialFieldConfig } from "../../../fields/core/sequential/SequentialField";
import { IResolver } from "../../interfaces/resolvers";

export class SequentialFieldResolver<K = any> extends IResolver {
  constructor(
    readonly valuesArray: K[],
    readonly config: Required<SequentialFieldConfig>,
  ) {
    super();
  }
}
