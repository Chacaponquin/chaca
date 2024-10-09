import { WrongArrayDefinitionError } from "../../../../errors";
import { DatatypeModule } from "../../../../modules/datatype";
import { DatasetStore } from "../../../dataset-store";
import { DocumentTree } from "../../../result-tree/classes";
import {
  ArrayLimitObject,
  IsArrayFunction,
} from "../../../schema/interfaces/schema";

interface ValueProps {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

interface FunctionProps {
  func: IsArrayFunction;
  route: string;
}

interface IntegerProps {
  value: number;
  route: string;
}

interface LimitsProps {
  limits: ArrayLimitObject;
  route: string;
}

export abstract class IsArray {
  abstract execute(props: ValueProps): number | undefined;
}

export class LimitsArray extends IsArray {
  private readonly limits: ArrayLimitObject;
  private readonly route: string;

  constructor(
    private readonly datatypeModule: DatatypeModule,
    { limits, route }: LimitsProps,
  ) {
    super();

    this.route = route;
    this.limits = limits;
  }

  execute(): number {
    const min = this.limits.min === undefined ? 0 : this.limits.min;
    const max = this.limits.max === undefined ? min + 9 : this.limits.max;

    if (min < 0) {
      throw new WrongArrayDefinitionError(
        `In field '${this.route}'. The parameter isArray.min cannot be less than 0`,
      );
    }

    if (max < 0) {
      throw new WrongArrayDefinitionError(
        `In field '${this.route}'. The parameter isArray.max cannot be less than 0`,
      );
    }

    if (min > max) {
      throw new WrongArrayDefinitionError(
        `In field '${this.route}'. The parameter isArray.min cannot be greater than isArray.max`,
      );
    }

    const limit = this.datatypeModule.int({ min: min, max: max });

    return limit;
  }
}

export class FunctionArray extends IsArray {
  private readonly func: IsArrayFunction;
  private readonly route: string;

  constructor(
    private readonly datatypeModule: DatatypeModule,
    { func, route }: FunctionProps,
  ) {
    super();

    this.route = route;
    this.func = func;
  }

  execute({ currentDocument, store }: ValueProps): number | undefined {
    const result = this.func({
      currentFields: currentDocument.getDocumentObject(),
      store: store,
    });

    let type: IsArray;
    if (typeof result === "number") {
      type = new IntegerArray({ value: result, route: this.route });
    } else if (typeof result === "undefined") {
      type = new NotArray();
    } else if (typeof result === "object" && result !== null) {
      type = new LimitsArray(this.datatypeModule, {
        limits: result,
        route: this.route,
      });
    } else {
      throw new WrongArrayDefinitionError(
        `In the field ${this.route}. The isArray function must return an object with the array limits or an integer number.`,
      );
    }

    return type.execute({
      currentDocument: currentDocument,
      store: store,
    });
  }
}

export class IntegerArray extends IsArray {
  readonly limit: number;

  constructor({ value, route }: IntegerProps) {
    super();

    if (value < 0) {
      throw new WrongArrayDefinitionError(
        `In field '${route}'. The parameter isArray cannot be less than 0`,
      );
    }

    this.limit = value;
  }

  execute(): number {
    return this.limit;
  }
}

export class NotArray extends IsArray {
  constructor() {
    super();
  }

  execute(): undefined {
    return undefined;
  }
}
