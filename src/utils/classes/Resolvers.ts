import { SchemaField } from "../../schemas/SchemaField";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { IResolver, CustomField } from "../interfaces/schema.interface";

export class EnumFielResolver implements IResolver {
  constructor(public readonly array: unknown[]) {}

  public *resolve(field: any): Generator<unknown> {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver implements IResolver {
  constructor(readonly schema: SchemaField) {}

  public *resolve(field: any): Generator<unknown> {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver implements IResolver {
  constructor(public readonly fun: CustomField) {}

  public *resolve(field: any): Generator<unknown> {
    let retValue = null;

    try {
      retValue = this.fun.apply(this, field ? [field] : [{}]) || null;
    } catch (error) {
      retValue = null;
    }

    return retValue;
  }
}
