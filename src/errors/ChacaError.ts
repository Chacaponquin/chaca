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

export class TryRefARefFieldError extends ChacaError {
  constructor(fieldName: string) {
    super(
      `The field '${fieldName}' is a reference field, so you can't reference this one`,
    );
  }
}
