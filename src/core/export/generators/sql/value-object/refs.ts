import { RefColumnParser } from "../core/generators/fixer";
import { SchemaRouteBuilder } from "./schema-route";

export class Refs {
  private readonly values: RefColumnParser[];

  constructor(builder: SchemaRouteBuilder, v: RefColumnParser[]) {
    this.values = v.map((r) => {
      return { column: builder.build(r.column), ref: builder.build(r.ref) };
    });
  }

  value() {
    return this.values;
  }
}
