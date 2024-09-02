import { PickFieldProps } from "../../../fields/core/pick/PickField";
import { IResolver } from "../../interfaces/resolvers";

export class PickFieldResolver extends IResolver {
  constructor(readonly values: PickFieldProps<unknown>) {
    super();
  }
}
