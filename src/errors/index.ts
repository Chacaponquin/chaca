export class ChacaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChacaError";
  }
}

export class WrongArrayDefinitionError extends ChacaError {
  constructor(message: string) {
    super(message);

    this.name = "ChacaError.WrongArrayDefinitionError";
  }
}

export class WrongPossibleNullDefinitionError extends ChacaError {
  constructor(message: string) {
    super(message);

    this.name = `ChacaError.WrongPossibleNullDefinitionError`;
  }
}

export class EmptySequentialValuesError extends ChacaError {
  constructor(public readonly fieldRoute: string) {
    super(`There are no more sequential values for the field '${fieldRoute}'`);

    this.name = "ChacaError.EmptySequentialValuesError";
  }
}

export class PickFieldDefinitionError extends ChacaError {
  constructor(readonly fieldRoute: string, message: string) {
    super(`On field '${fieldRoute}'. ${message}`);

    this.name = "ChacaError.PickFieldDefinitionError";
  }
}

export class TryRefANoKeyFieldError extends ChacaError {
  constructor(public readonly fieldRoute: string) {
    super(
      `The field '${fieldRoute}' is not a key field, so you can't reference this one`,
    );

    this.name = "ChacaError.TryRefANoKeyFieldError";
  }
}

export class NotEnoughValuesForRefError extends ChacaError {
  constructor(
    public readonly refFieldRoute: string,
    public readonly keyFieldRoute: string,
  ) {
    super(
      `Not enough values of '${keyFieldRoute}' for the ref field '${refFieldRoute}'`,
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
    super(`From '${fieldRoute}', The field '${refFieldRoute}' does not exists`);
    this.name = "ChacaError.NotExistFieldError";
  }
}

export class EmptyEnumValuesError extends ChacaError {
  constructor(public readonly fieldRoute: string) {
    super(`There are no values for the enum field '${fieldRoute}'`);
    this.name = "ChacaError.EmptyEnumValuesError";
  }
}
