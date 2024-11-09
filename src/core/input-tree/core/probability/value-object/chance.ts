import { WrongProbabilityFieldDefinitionError } from "../../../../../errors";
import { DatasetStore } from "../../../../dataset-store";
import {
  ChanceFunction,
  Chance as IChance,
} from "../../../../fields/core/probability";
import { DocumentTree } from "../../../../result-tree/classes";

interface Props {
  value: IChance;
  route: string;
}

interface ProbabilityProps {
  value: number;
  route: string;
}

interface FunctionProps {
  func: ChanceFunction;
  route: string;
}

interface ValueProps {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

export abstract class Chance {
  static create({ value, route }: Props): Chance {
    let type: Chance;

    if (typeof value === "number") {
      type = new ProbabilityChance({ value: value, route: route });
    } else if (typeof value === "function") {
      type = new FunctionChance({ func: value, route: route });
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `The 'chance' parameter must be a number between 0 and 1 or a function that returns a value in that range`,
      );
    }

    return type;
  }

  abstract value(props: ValueProps): number;
}

export class ProbabilityChance extends Chance {
  private readonly prob: number;

  constructor({ value, route }: ProbabilityProps) {
    super();

    let save: number;

    if (value <= 1 && value >= 0) {
      save = value;
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `The probability that a value is chosen must be a number between 0 and 1.`,
      );
    }

    this.prob = save;
  }

  value(): number {
    return this.prob;
  }
}

export class FunctionChance extends Chance {
  private readonly route: string;
  private readonly func: ChanceFunction;

  constructor({ func, route }: FunctionProps) {
    super();

    this.func = func;
    this.route = route;
  }

  value({ currentDocument, store }: ValueProps): number {
    const result = this.func({
      store: store,
      currentFields: currentDocument.getDocumentObject(),
    });

    let type: Chance;
    if (typeof result === "number") {
      type = new ProbabilityChance({ value: result, route: this.route });
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        this.route,
        `The chance function must return a number that indicate the value probability.`,
      );
    }

    return type.value({ currentDocument: currentDocument, store: store });
  }
}
