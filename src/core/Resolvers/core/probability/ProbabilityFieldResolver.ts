import { ProbabilityOption } from "../../../fields/core/probability/ProbabilityField";
import { IResolver } from "../../interfaces/resolvers";

export class ProbabilityFieldResolver extends IResolver {
  constructor(public readonly values: Array<ProbabilityOption>) {
    super();
  }
}
