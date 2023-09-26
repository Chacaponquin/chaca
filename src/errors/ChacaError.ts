export class ChacaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChacaError";
  }
}

export class EmptySequentialValuesError extends ChacaError {
  constructor(public readonly fieldRoute: Array<string>) {
    super(
      `There are no more sequential values for the field '${fieldRoute.join(
        ".",
      )}'`,
    );

    this.name = "ChacaError.EmptySequentialValuesError";
  }
}

export class TryRefANoKeyFieldError extends ChacaError {
  constructor(public readonly fieldRoute: Array<string>) {
    super(
      `The field '${fieldRoute.join(
        ".",
      )}' is not a key field, so you can't reference this one`,
    );

    this.name = "ChacaError.TryRefANoKeyFieldError";
  }
}

export class NotEnoughValuesForRefError extends ChacaError {
  constructor(
    public readonly refFieldRoute: Array<string>,
    public readonly keyFieldRoute: Array<string>,
  ) {
    super(
      `Not enough values of '${keyFieldRoute.join(
        ".",
      )}' for the ref field '${refFieldRoute.join(".")}'`,
    );

    this.name = "ChacaError.NotEnoughValuesForRefError";
  }
}

export class CyclicAccessDataError extends ChacaError {
  constructor(message: string) {
    super(message);
    this.name = "ChacaError.CyclicAccessDataError";
  }
}

export class NotExistFieldError extends ChacaError {
  constructor(
    public readonly fieldRoute: string,
    public readonly refFieldRoute: string,
  ) {
    super(`From ${fieldRoute}, The field ${refFieldRoute} does not exists`);
    this.name = "ChacaError.NotExistFieldError";
  }
}
