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
  private readonly min: number;
  private readonly max: number;
  private readonly route: string;

  constructor(
    private readonly datatypeModule: DatatypeModule,
    { limits, route }: LimitsProps,
  ) {
    super();

    this.route = route;

    const min = limits.min === undefined ? 0 : limits.min;
    const max = limits.max === undefined ? min + 9 : limits.max;

    if (min < 0) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.min cannot be less than 0`,
      );
    }

    if (max < 0) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.max cannot be less than 0`,
      );
    }

    if (min > max) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.min cannot be greater than isArray.max`,
      );
    }

    this.min = min;
    this.max = max;
  }

  execute(): number {
    const limit = this.datatypeModule.int({ min: this.min, max: this.max });

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
        this.route,
        `The isArray function must return an object with the array limits or an integer number.`,
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
        route,
        `The parameter isArray cannot be less than 0`,
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
