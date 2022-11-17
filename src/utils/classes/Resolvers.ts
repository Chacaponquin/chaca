/* eslint @typescript-eslint/no-unused-vars: off */

import { SchemaField } from "../../schemas/SchemaField.js";
import { PrivateUtils } from "../helpers/PrivateUtils.js";
import {
  IResolver,
  CustomField,
  SchemaToResolve,
  ResolverObject,
} from "../interfaces/schema.interface.js";
import { Schema } from "./Schema.js";
import { GeneralTree, TreeNode } from "./GeneralTree.js";

export class EnumFielResolver<C, R> implements IResolver<C, R> {
  constructor(public readonly array: R[]) {}

  public resolve(field: C): R {
    return PrivateUtils.oneOfArray(this.array);
  }
}

export class SchemaFieldResolver<C, R> implements IResolver<C, R> {
  constructor(readonly schema: SchemaField<R, any>) {}

  public resolve(field: C): R {
    return this.schema.getValue();
  }
}

export class CustomFieldResolver<C, R> implements IResolver<C, R> {
  constructor(public readonly fun: CustomField<C, R>) {}

  public resolve(field: C): R {
    let retValue = undefined as R;
    retValue = this.fun(field);

    const val = retValue !== undefined ? retValue : null;
    return val as R;
  }
}

type OrderSchema<C, T> = {
  key: keyof T;
  schema: ResolverObject<C, T[keyof T]>;
};

export class SchemaResolver<K, T> {
  private document: GeneralTree<K>;
  private arrayOfKeys: Array<string> = [];

  constructor(private readonly schemaObject: SchemaToResolve<K, T>) {
    this.document = new GeneralTree(new TreeNode("object"));
  }

  private resolveSchemaByConfig(schemaConfig: OrderSchema<K, T>) {
    let retValue;

    if (schemaConfig.schema.isArray) {
      retValue = [];

      const limit = PrivateUtils.intNumber({
        min: schemaConfig.schema.isArray.min,
        max: schemaConfig.schema.isArray.max,
      });

      for (let i = 1; i <= limit; i++) {
        retValue.push(this.resolveSchema(schemaConfig));
      }
    } else {
      retValue = this.resolveSchema(schemaConfig);
    }

    if (schemaConfig.schema.posibleNull) {
      let porcentNull: number = schemaConfig.schema.posibleNull;
      const array = new Array(100).fill(0);

      for (let i = 0; i < array.length; i++) {
        if (porcentNull > 0) {
          array.push(null);
          porcentNull--;
        } else {
          array.push(retValue);
        }
      }
    }
  }

  private resolveSchema(rObj: OrderSchema<K, T>) {
    this.arrayOfKeys.push(rObj.key as string);

    if (rObj.schema.type instanceof Schema) {
      for (const o of this.orderSchemasByPriority(
        rObj.schema.type.getSchemaObject(),
      )) {
        this.resolveSchema(o);
      }
    } else {
      const node = new TreeNode(rObj.key as string);
      node.setValue(this.resolveSchemaByConfig(rObj));
      this.document.setNode(this.arrayOfKeys, node);
    }

    this.arrayOfKeys.pop();
  }

  private resolveRootSchema(schema: SchemaToResolve<K, T>) {
    for (const o of this.orderSchemasByPriority(schema)) {
      this.arrayOfKeys.push(o.key as string);
      this.resolveSchema(o);
      this.arrayOfKeys = [];
    }
  }

  public resolve(): K {
    this.resolveRootSchema(this.schemaObject);
    return this.document.getObject();
  }

  private orderSchemasByPriority(
    schemaObject: SchemaToResolve<K, T>,
  ): Array<OrderSchema<K, T>> {
    const customSchemas: Array<OrderSchema<K, T>> = [];
    const normalSchemas: Array<OrderSchema<K, T>> = [];
    const nestedSchemas: Array<OrderSchema<K, T>> = [];

    for (const k of Object.keys(schemaObject)) {
      const key = k as keyof T;
      const schema = schemaObject[key] as ResolverObject<K, T[keyof T]>;
      if (schema.type instanceof CustomFieldResolver) {
        customSchemas.push({ key, schema });
      } else if (schema.type instanceof Schema) {
        nestedSchemas.push({ key, schema });
      } else {
        normalSchemas.push({ key, schema });
      }
    }

    return [...normalSchemas, ...customSchemas, ...nestedSchemas];
  }
}
