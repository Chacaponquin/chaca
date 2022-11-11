import { SchemaField } from "../../schemas/SchemaField";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { IResolver, CustomField } from "../interfaces/schema.interface";

export class EnumFielResolver<T> implements IResolver<T> {
  constructor(public readonly array: unknown[]) {}

  public *resolve(field: T): Generator<unknown> {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver<T> implements IResolver<T> {
  constructor(readonly schema: SchemaField) {}

  public *resolve(field: T): Generator<unknown> {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver<T, K> implements IResolver<T> {
  constructor(public readonly fun: CustomField<T, K>) {}

  public *resolve(field: T): Generator<unknown> {
    let retValue = null;

    try {
      retValue = this.fun.apply(this, field ? [field] : [{}]) || null;
    } catch (error) {
      retValue = null;
    }

    return retValue;
  }
}
