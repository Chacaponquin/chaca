import { PickFieldDefinitionError } from "../../../../../errors";
import { DatatypeModule } from "../../../../../modules/datatype";
import { DatasetStore } from "../../../../dataset-store";
import {
  PickCount,
  PickCountFunction,
  PickCountLimits,
} from "../../../../fields/core/pick";
import { DocumentTree } from "../../../../result-tree/classes";
import { Values } from "./values";

interface Props {
  count: PickCount;
  route: string;
  options: Values;
}

interface LimitProps {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

interface ObjectProps {
  route: string;
  value: PickCountLimits;
  options: Values;
}

interface IntegerProps {
  value: number;
  route: string;
  options: Values;
}

interface FunctionProps {
  func: PickCountFunction;
  route: string;
  options: Values;
}

export abstract class Count {
  static create(
    datatypeModule: DatatypeModule,
    { count, route, options }: Props,
  ): Count {
    let type: Count;

    if (typeof count === "number") {
      type = new IntegerCount({ value: count, route: route, options: options });
    } else if (typeof count === "function") {
      type = new FunctionCount(datatypeModule, {
        route: route,
        func: count,
        options: options,
      });
    } else if (typeof count === "object" && count !== null) {
      type = new LimitCount(datatypeModule, {
        options: options,
        route: route,
        value: count,
      });
    } else {
      throw new PickFieldDefinitionError(
        route,
        `The number of items to choose on a pick field must be a number, an object with the range of items to choose from, or a function that returns one of the above options.`,
      );
    }

    return type;
  }

  abstract limit(props: LimitProps): number;
}

export class IntegerCount extends Count {
  private value: number;

  constructor({ route, value, options }: IntegerProps) {
    super();

    if (value < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The number of items to select cannot be less than 0`,
      );
    }

    if (value > options.length()) {
      throw new PickFieldDefinitionError(
        route,
        `A pick field should must have a number of options to choose greater than or equal to the 'count' property`,
      );
    }

    this.value = value;
  }

  limit(): number {
    return this.value;
  }
}

export class FunctionCount extends Count {
  private readonly func: PickCountFunction;
  private readonly route: string;
  private readonly options: Values;

  constructor(
    private readonly datatypeModule: DatatypeModule,
    { func, route, options }: FunctionProps,
  ) {
    super();

    this.func = func;
    this.route = route;
    this.options = options;
  }

  limit({ currentDocument, store }: LimitProps): number {
    const result = this.func({
      currentFields: currentDocument.getDocumentObject(),
      store: store,
    });

    let type: Count;
    if (typeof result === "number") {
      type = new IntegerCount({
        route: this.route,
        value: result,
        options: this.options,
      });
    } else if (typeof result === "object" && result !== null) {
      type = new LimitCount(this.datatypeModule, {
        value: result,
        route: this.route,
        options: this.options,
      });
    } else {
      throw new PickFieldDefinitionError(
        this.route,
        `The number of items to choose on a pick field must be a number, an object with the range of items to choose from, or a function that returns one of the above options.`,
      );
    }

    return type.limit({ currentDocument: currentDocument, store: store });
  }
}

export class LimitCount extends Count {
  private readonly min: number;
  private readonly max: number;

  constructor(
    private readonly datatypeModule: DatatypeModule,
    { route, value, options }: ObjectProps,
  ) {
    super();

    const min = value.min === undefined ? 0 : value.min;
    const max = value.max === undefined ? min + 9 : value.max;

    if (min < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.min cannot be less than 0`,
      );
    }

    if (max < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.max cannot be less than 0`,
      );
    }

    if (min > max) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.min cannot be greater than count.max`,
      );
    }

    if (max > options.length()) {
      throw new PickFieldDefinitionError(
        route,
        `A pick field should must have a number of options to choose greater than or equal to the 'count' property`,
      );
    }

    this.min = min;
    this.max = max;
  }

  limit(): number {
    const limit = this.datatypeModule.int({ min: this.min, max: this.max });

    return limit;
  }
}
