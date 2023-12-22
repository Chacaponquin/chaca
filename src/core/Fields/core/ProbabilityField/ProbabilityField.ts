import { SchemaFieldType } from "../../../ChacaSchema/interfaces/schema";
import { DatasetStore } from "../../../DatasetStore/DatasetStore";

export type Chance = number | ChanceFunction;

export type ChanceFunction = (props: ChanceFunctionProps) => number;

export type ChanceFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export interface ProbabilityOption {
  chance: Chance;
  value: unknown;
}

export class ProbabilityField extends SchemaFieldType {
  private values: Array<ProbabilityOption> = [];

  constructor(values: Array<ProbabilityOption>) {
    super();

    if (Array.isArray(values)) {
      this.values = values;
    }
  }

  public getValues() {
    return this.values;
  }
}
