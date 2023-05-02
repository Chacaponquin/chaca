export class ChacaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChacaError";
  }
}

export class EmptySequentialValuesError extends ChacaError {
  constructor(key: string) {
    super(`There are no more sequential values for the field ${key}`);
  }
}

export class TryRefANoKeyFieldError extends ChacaError {
  constructor(fieldName: string) {
    super(
      `The field '${fieldName}' is not a key field, so you can't reference this one`,
    );
  }
}

export class NotEnoughValuesForRefError extends ChacaError {
  constructor(refFieldName: string) {
    super(`Not enough values for the ref field ${refFieldName}`);
  }
}
