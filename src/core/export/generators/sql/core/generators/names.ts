import { ChacaUtils } from "../../../../../utils";
import { Route } from "./route";

export class TableName {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly route: Route,
  ) {}

  create(name: string): TableName {
    return new TableName(this.utils, this.route.create(name));
  }

  equal(t: TableName): boolean {
    return this.route.string() === t.route.string();
  }

  value() {
    return this.utils.pascalCase(this.route.string());
  }
}

export class ColumnName {
  private readonly name: string;

  constructor(private readonly utils: ChacaUtils, name: string) {
    this.name = `${name}`;
  }

  equal(c: ColumnName) {
    return c.name === this.name;
  }

  value() {
    return this.utils.snakeCase(this.name);
  }
}
