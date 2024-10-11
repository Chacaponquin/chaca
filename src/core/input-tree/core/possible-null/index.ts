import { WrongPossibleNullDefinitionError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { DocumentTree } from "../../../result-tree/classes";
import { PossibleNullFunction } from "../../../schema/interfaces/schema";
import { ChacaUtils } from "../../../utils";

interface BooleanProps {
  value: boolean;
  route: string;
}

interface AbsoluteProps {
  value: number;
  total: number;
  route: string;
}

interface ProbabilityProps {
  value: number;
  route: string;
}

interface FunctionNullProps {
  func: PossibleNullFunction;
  route: string;
}

export interface IsProps {
  index: number;
  store: DatasetStore;
  currentDocument: DocumentTree;
}

export abstract class PossibleNull {
  abstract is(props: IsProps): boolean;
  abstract can(): boolean;
}

export class BooleanNull extends PossibleNull {
  private readonly value: boolean;

  constructor({ value }: BooleanProps) {
    super();

    this.value = value;
  }

  is(): boolean {
    if (this.value) {
      return true;
    } else {
      return false;
    }
  }

  can(): boolean {
    return this.value;
  }
}

export class FunctionNull extends PossibleNull {
  private readonly route: string;
  private readonly func: PossibleNullFunction;

  constructor({ func, route }: FunctionNullProps) {
    super();

    this.func = func;
    this.route = route;
  }

  can(): boolean {
    return true;
  }

  is({ currentDocument, store, index }: IsProps): boolean {
    const result = this.func({
      currentFields: currentDocument.getDocumentObject(),
      store: store,
    });

    let type: PossibleNull;
    if (typeof result === "number") {
      type = new ProbabilityNull({ value: result, route: this.route });
    } else if (typeof result === "boolean") {
      type = new BooleanNull({ route: this.route, value: result });
    } else if (typeof result === "undefined") {
      type = new NotNull();
    } else {
      throw new WrongPossibleNullDefinitionError(
        this.route,
        `The parameter function possibleNull must return a boolean or a probability value between 0 and 1`,
      );
    }

    return type.is({
      currentDocument: currentDocument,
      index: index,
      store: store,
    });
  }
}

export class NotNull extends PossibleNull {
  constructor() {
    super();
  }

  is(): boolean {
    return false;
  }

  can(): boolean {
    return false;
  }
}

export class ProbabilityNull extends PossibleNull {
  private value: number;

  constructor({ value, route }: ProbabilityProps) {
    super();

    this.value = value;

    if (!(value >= 0 && value <= 1)) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter in case of being a float number must be in the range of 0 to 1`,
      );
    }
  }

  is(): boolean {
    return Math.random() <= this.value;
  }

  can(): boolean {
    return this.value > 0;
  }
}

export class AbsoluteNullCount extends PossibleNull {
  private readonly indexes: number[];
  private readonly value: number;

  constructor(utils: ChacaUtils, { total, value, route }: AbsoluteProps) {
    super();

    if (value < 0) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter the numeric value must be greater or equal than 0`,
      );
    }

    this.value = value;

    const all: number[] = [];

    for (let i = 0; i < total; i++) {
      all.push(i);
    }

    this.indexes = utils.pick({ values: all, count: value });
  }

  is({ index }: IsProps): boolean {
    return this.indexes.includes(index);
  }

  can(): boolean {
    return this.value > 0;
  }
}
