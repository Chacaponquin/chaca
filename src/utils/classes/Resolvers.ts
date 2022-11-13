import { SchemaField } from "../../schemas/SchemaField";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { IResolver, CustomField } from "../interfaces/schema.interface";

export class EnumFielResolver<C, R> implements IResolver<R> {
  constructor(public readonly array: R[]) {}

  public *resolve(field: C): Generator<R> {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver<C, R> implements IResolver<R> {
  constructor(readonly schema: SchemaField<R, any>) {}

  public *resolve(field: C): Generator<R> {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver<C, R> implements IResolver<R> {
  constructor(public readonly fun: CustomField<C, R>) {}

  public *resolve(field: C): Generator<R> {
    let retValue = undefined as R;

    try {
      retValue = this.fun.apply(this, field ? [field] : [{} as C]);
    } catch (error) {}

    return retValue || null;
  }
}
