import { SchemaField } from "../../schemas/SchemaField";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { IResolver, CustomField } from "../interfaces/schema.interface";

export class EnumFielResolver<R> implements IResolver<R> {
  constructor(public readonly array: R[]) {}

  public *resolve(field: R): Generator<R> {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver<R> implements IResolver<R> {
  constructor(readonly schema: SchemaField<R, any>) {}

  public *resolve(field: R): Generator<R> {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver<C, R> implements IResolver<R> {
  constructor(public readonly fun: CustomField<C, R>) {}

  public *resolve(field: R): Generator<R> {
    let retValue = undefined as R;

    try {
      retValue = this.fun.apply(this, field ? [field] : [{}]);
    } catch (error) {}

    return retValue || null;
  }
}
