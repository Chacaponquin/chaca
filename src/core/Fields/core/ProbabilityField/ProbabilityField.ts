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
  /**
   * Probability of being chosen
   * - `number` Value between 0 and 1
   * - `function` Function that returns a probability value between 0 and 1. Receive 'currentFields' and 'store' as parameters
   */
  chance: Chance;
  /**
   * Option value
   */
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
