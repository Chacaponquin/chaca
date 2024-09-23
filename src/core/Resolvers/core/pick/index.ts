import { PickFieldProps } from "../../../fields/core/pick";
import { IResolver } from "../../interfaces/resolvers";

export class PickFieldResolver extends IResolver {
  constructor(readonly values: PickFieldProps) {
    super();
  }
}
