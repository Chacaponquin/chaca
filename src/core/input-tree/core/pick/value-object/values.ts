import { PickFieldDefinitionError } from "../../../../../errors";

interface Props {
  values: unknown[];
  route: string;
}

export class Values {
  private readonly value: unknown[];

  constructor({ route, values }: Props) {
    if (Array.isArray(values)) {
      this.value = values;
    } else {
      throw new PickFieldDefinitionError(
        route,
        `The values that can be chosen must be in an array`,
      );
    }
  }

  length(): number {
    return this.value.length;
  }

  get(index: number): unknown {
    return this.value[index];
  }

  values() {
    return this.value;
  }
}
