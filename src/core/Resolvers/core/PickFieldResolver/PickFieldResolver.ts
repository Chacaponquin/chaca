import { PickFieldProps } from "../../../Fields/core/PickField/PickField";
import { IResolver } from "../../interfaces/resolvers";

export class PickFieldResolver extends IResolver {
  constructor(readonly values: PickFieldProps<unknown>) {
    super();
  }
}
