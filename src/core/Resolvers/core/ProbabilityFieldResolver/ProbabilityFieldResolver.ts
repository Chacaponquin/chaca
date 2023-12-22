import { ProbabilityOption } from "../../../Fields/core/ProbabilityField/ProbabilityField";
import { IResolver } from "../../interfaces/resolvers";

export class ProbabilityFieldResolver extends IResolver {
  constructor(public readonly values: Array<ProbabilityOption>) {
    super();
  }
}
