import { SchemaField } from "../../schemas/SchemaField";
import { CHDataUtils } from "../CHDataUtils";
import { CustomSchema } from "../CustomSchema";

export type SchemaConfig =
  | SchemaInput
  | SchemaField
  | CustomField
  | CustomSchema;

export type SchemaInput = {
  type?: SchemaField | CustomSchema;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  custom?: CustomField;
  enum?: unknown[];
};

export interface SchemaToResolve extends CommonSchema {
  type: IResolveSchema;
}

export type CustomField<T = any> = (docFields: T) => any;

export interface CommonSchema {
  isArray: { min: number; max: number } | null;
  posibleNull: number;
}

export interface IResolveSchema {
  resolve(field: any): unknown;
}

export class EnumFieldSchema implements IResolveSchema {
  constructor(public readonly array: unknown[]) {}

  public resolve(field: any): unknown {
    return CHDataUtils.oneOfArray(this.array);
  }
}

export class SchemaResolver implements IResolveSchema {
  constructor(readonly schema: SchemaField) {}

  public resolve(field: any): unknown {
    return this.schema.getValue();
  }
}

export class CustomFieldSchema implements IResolveSchema {
  constructor(public readonly fun: CustomField) {}

  public resolve(field: any): unknown {
    let retValue = null;

    try {
      retValue = this.fun.apply(this, field ? [field] : [{}]) || null;
    } catch (error) {
      retValue = null;
    }

    return retValue;
  }
}

export interface SchemaObject<T> {
  [path: string]: T;
}
