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
