export class ChacaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChacaError";
  }
}

export class EmptySequentialValuesError extends ChacaError {
  constructor(fieldRoute: Array<string>) {
    super(
      `There are no more sequential values for the field '${fieldRoute.join(
        ".",
      )}'`,
    );
  }
}

export class TryRefANoKeyFieldError extends ChacaError {
  constructor(fieldRoute: Array<string>) {
    super(
      `The field '${fieldRoute.join(
        ".",
      )}' is not a key field, so you can't reference this one`,
    );
  }
}

export class NotEnoughValuesForRefError extends ChacaError {
  constructor(refFieldRoute: Array<string>, keyFieldRoute: Array<string>) {
    super(
      `Not enough values of '${keyFieldRoute.join(
        ".",
      )}' for the ref field '${refFieldRoute.join(".")}'`,
    );
  }
}

export class CyclicAccessDataError extends ChacaError {}
