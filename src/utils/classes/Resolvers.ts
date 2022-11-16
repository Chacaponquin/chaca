/* eslint @typescript-eslint/no-unused-vars: off */

import { SchemaField } from "../../schemas/SchemaField.js";
import { PrivateUtils } from "../helpers/PrivateUtils.js";
import { IResolver, CustomField } from "../interfaces/schema.interface.js";

export class EnumFielResolver<C, R> implements IResolver<C, R> {
  constructor(public readonly array: R[]) {}

  public *resolve(field: C): Generator<R> {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver<C, R> implements IResolver<C, R> {
  constructor(readonly schema: SchemaField<R, any>) {}

  public *resolve(field: C): Generator<R> {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver<C, R> implements IResolver<C, R> {
  constructor(public readonly fun: CustomField<C, R>) {}

  public *resolve(field: C): Generator<R> {
    let retValue = undefined as R;
    retValue = this.fun(field);

    return retValue !== undefined ? retValue : null;
  }
}
