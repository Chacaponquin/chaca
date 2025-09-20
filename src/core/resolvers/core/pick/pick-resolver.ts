import { PickFieldProps } from "../../../fields/core/pick/pick-field";
import { IResolver } from "../../interfaces/resolvers";

export class PickFieldResolver extends IResolver {
  constructor(readonly values: PickFieldProps) {
    super();
  }
}
