import { SchemaRouteBuilder } from "./schema-route";

export class Uniques {
  private readonly values: string[];

  constructor(builder: SchemaRouteBuilder, v: string[]) {
    this.values = builder.execute(v);
  }

  value(): string[] {
    return this.values;
  }
}
