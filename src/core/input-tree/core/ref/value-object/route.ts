import { ChacaError } from "../../../../../errors";
import { NodeRoute } from "../../node/value-object/route";

interface Props {
  ref: string;
  route: NodeRoute;
}

export class RefRoute {
  private _value: string[];

  constructor({ ref, route }: Props) {
    const saveRoute = ref.split(".");

    if (saveRoute.length === 0) {
      throw new ChacaError(
        `In '${route.string()}'. You can't ref an empty field"`,
      );
    } else {
      this._value = saveRoute;
    }
  }

  value(): string[] {
    return this._value;
  }
}
