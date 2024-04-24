import { PickFieldDefinitionError } from "../../../../../errors";

export class Values {
  readonly value: unknown[];

  constructor(route: string, value: unknown[]) {
    if (Array.isArray(value)) {
      this.value = value;
    } else {
      throw new PickFieldDefinitionError(route);
    }
  }
}

export class Count {
  readonly value: number;

  constructor(route: string, value: number) {
    if (typeof value === "number") {
      if (value >= 0) {
        this.value = value;
      } else {
        throw new PickFieldDefinitionError(route);
      }
    } else {
      throw new PickFieldDefinitionError(route);
    }
  }
}
