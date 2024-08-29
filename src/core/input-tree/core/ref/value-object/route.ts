import { ChacaError } from "../../../../../errors";

export class RefRoute {
  private _value: string[];

  constructor(route: string) {
    const saveRoute = route.split(".");

    if (saveRoute.length === 0) {
      throw new ChacaError("You can't ref an empty field");
    } else {
      this._value = saveRoute;
    }
  }

  value(): string[] {
    return this._value;
  }
}
