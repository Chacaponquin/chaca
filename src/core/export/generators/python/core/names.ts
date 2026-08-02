import { ChacaUtils } from "../../../../utils";
import { Route } from "./route";

const PYTHON_RESERVED_WORDS = [
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
];

export class PythonClassName {
  constructor(
    private readonly utils: ChacaUtils,
    private route: Route,
  ) {}

  equal(other: PythonClassName): boolean {
    return other.route.equal(this.route);
  }

  string() {
    return this.utils.pascalCase(this.route.string());
  }
}

export class PythonClassFieldName {
  constructor(
    private readonly utils: ChacaUtils,
    private _name: string,
  ) {}

  equal(other: PythonClassFieldName): boolean {
    return other._name === this._name;
  }

  string() {
    const name = this.utils.snakeCase(this._name);

    if (PYTHON_RESERVED_WORDS.includes(name)) {
      return `${name}_`;
    }

    return name;
  }
}
