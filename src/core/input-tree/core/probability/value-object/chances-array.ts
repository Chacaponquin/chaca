import { WrongProbabilityFieldDefinitionError } from "../../../../../errors";
import { DatasetStore } from "../../../../dataset-store";
import { ProbabilityOption } from "../../../../fields/core/probability";
import { DocumentTree } from "../../../../result-tree/classes";
import { ChacaUtils } from "../../../../utils";
import { Chance } from "./chance";
import { ChanceValue } from "./chance-value";

interface Props {
  options: ProbabilityOption[];
  route: string;
}

interface ValueProps {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

interface Option {
  value: ChanceValue;
  chance: Chance;
}

export class ChancesArray {
  private readonly options: Option[] = [];

  constructor(private readonly utils: ChacaUtils, { options, route }: Props) {
    if (options.length > 0) {
      for (const option of options) {
        if (typeof option === "object" && option !== null) {
          const chance = Chance.create({ route: route, value: option.chance });

          const value = new ChanceValue(option.value);

          this.options.push({ chance: chance, value: value });
        } else {
          throw new WrongProbabilityFieldDefinitionError(
            route,
            `The 'chance' and 'value' parameters must be specified for each value in the array`,
          );
        }
      }
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `There are no values for the probability field'`,
      );
    }
  }

  value({ currentDocument, store }: ValueProps): unknown {
    const values = this.options.map((o) => o.value);

    const weights: number[] = this.options.map((o) => {
      const chance = o.chance.value({
        currentDocument: currentDocument,
        store: store,
      });

      return chance;
    });

    const distribution = this.createDistribution(values, weights, 10);

    return this.utils.oneOfArray(distribution);
  }

  private createDistribution(
    array: ChanceValue[],
    weights: number[],
    size: number,
  ): unknown[] {
    const distribution = [];

    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;

    for (let i = 0; i < array.length; ++i) {
      const limit = quant * weights[i];

      for (let j = 0; j < limit; ++j) {
        distribution.push(array[i].value());
      }
    }

    return distribution;
  }
}
