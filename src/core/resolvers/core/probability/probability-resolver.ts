import { ProbabilityOption } from "../../../fields/core/probability/probability-field";
import { IResolver } from "../../interfaces/resolvers";

export class ProbabilityFieldResolver extends IResolver {
  constructor(public readonly values: ProbabilityOption[]) {
    super();
  }
}
