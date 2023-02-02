/* eslint @typescript-eslint/no-unused-vars: off */

import { SchemaField } from "../../schemas/SchemaField.js";
import { PrivateUtils } from "../helpers/PrivateUtils.js";
import {
  IResolver,
  CustomField,
  SchemaToResolve,
  ResolverObject,
} from "../interfaces/schema.interface.js";
import { Schema } from "./schemas/Schema/Schema.js";
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
    this.document = new GeneralTree(new TreeNode("object", null));
  }

  private resolveSchemaByConfig(o: OrderSchema<K, T>): void {
    this.arrayOfKeys.push(String(o.key));

    if (o.schema.isArray) {
      // CONVERTIR EL NODO EN UN NODO_ARRAY
      this.document.searchNodeAndCreate(this.arrayOfKeys).isArray = true;

      // LIMITE DEL ARRAY
      const limit = PrivateUtils.intNumber({
        min: o.schema.isArray.min,
        max: o.schema.isArray.max,
      });

      for (let i = 1; i <= limit; i++) {
        this.arrayOfKeys.push(`${String(o.key)}${i}`);

        if (o.schema.type instanceof Schema) {
          for (const s of this.orderSchemasByPriority(
            o.schema.type.getSchemaObject(),
          )) {
            this.resolveSchemaByConfig(s);
          }
        } else {
          const value = o.schema.type.resolve(this.document.getObject());
          this.document.searchNodeAndCreate(this.arrayOfKeys).setValue(value);
        }

        this.arrayOfKeys.pop();
      }
    } else {
      if (o.schema.type instanceof Schema) {
        for (const s of this.orderSchemasByPriority(
          o.schema.type.getSchemaObject(),
        )) {
          this.resolveSchemaByConfig(s);
        }
      } else {
        this.document
          .searchNodeAndCreate(this.arrayOfKeys)
          .setValue(o.schema.type.resolve(this.document.getObject()));
      }
    }

    if (o.schema.posibleNull) {
      let porcentNull: number = o.schema.posibleNull;
      const array = new Array(100).fill(0);

      for (let i = 0; i < array.length; i++) {
        if (porcentNull > 0) {
          array[i] = true;
          porcentNull--;
        } else {
          array[i] = false;
        }
      }

      this.document.searchNodeAndCreate(this.arrayOfKeys).isNull =
        PrivateUtils.oneOfArray(array);
    }

    this.arrayOfKeys.pop();
  }

  private resolveRootSchema() {
    for (const o of this.orderSchemasByPriority(this.schemaObject)) {
      this.resolveSchemaByConfig(o);
    }
  }

  public resolve(): K {
    this.resolveRootSchema();
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

    return [...normalSchemas, ...nestedSchemas, ...customSchemas];
  }
}
