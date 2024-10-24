import { DatasetStore } from "../../../dataset-store";

export type Chance = number | ChanceFunction;

export type ChanceFunction = (props: ChanceFunctionProps) => number;

export type ChanceFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export interface ProbabilityOption<T = any> {
  /**
   * Probability of being chosen
   * - `number` Value between 0 and 1
   * - `function` Function that returns a probability value between 0 and 1. Receive 'currentFields' and 'store' as parameters
   */
  chance: Chance;
  /**
   * Option value
   */
  value: T;
}

export class ProbabilityField<T = any> {
  readonly values: ProbabilityOption<T>[] = [];

  constructor(values: ProbabilityOption<T>[]) {
    if (Array.isArray(values)) {
      this.values = values;
    }
  }
}
