import { ChacaUtils } from "../../../../../utils";
import { Route } from "./route";

const POSTGRES_RESERVED_WORDS = [
  "all",
  "analyse",
  "analyze",
  "and",
  "any",
  "array",
  "as",
  "asc",
  "asymmetric",
  "both",
  "case",
  "cast",
  "check",
  "collate",
  "column",
  "constraint",
  "create",
  "current_catalog",
  "current_date",
  "current_role",
  "current_time",
  "current_timestamp",
  "current_user",
  "default",
  "deferrable",
  "desc",
  "distinct",
  "do",
  "else",
  "end",
  "except",
  "false",
  "fetch",
  "for",
  "foreign",
  "from",
  "grant",
  "group",
  "having",
  "in",
  "initially",
  "intersect",
  "into",
  "lateral",
  "leading",
  "limit",
  "localtime",
  "localtimestamp",
  "not",
  "null",
  "offset",
  "on",
  "only",
  "or",
  "order",
  "placing",
  "primary",
  "references",
  "returning",
  "select",
  "session_user",
  "some",
  "symmetric",
  "table",
  "then",
  "to",
  "trailing",
  "true",
  "union",
  "unique",
  "user",
  "using",
  "variadic",
  "when",
  "where",
  "window",
  "with",
];

function quoteReserved(name: string): string {
  if (POSTGRES_RESERVED_WORDS.includes(name.toLowerCase())) {
    return `"${name}"`;
  }

  return name;
}

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
    return quoteReserved(this.utils.pascalCase(this.route.string()));
  }
}

export class ColumnName {
  private readonly name: string;

  constructor(
    private readonly utils: ChacaUtils,
    name: string,
  ) {
    this.name = `${name}`;
  }

  equal(c: ColumnName) {
    return c.name === this.name;
  }

  value() {
    return quoteReserved(this.utils.snakeCase(this.name));
  }
}
