import { ChacaUtils } from "../../../../utils";
import { Parent } from "./parent";

const JAVA_RESERVED_WORDS = [
  "abstract",
  "assert",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extends",
  "final",
  "finally",
  "float",
  "for",
  "goto",
  "if",
  "implements",
  "import",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "strictfp",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "try",
  "void",
  "volatile",
  "while",
  "true",
  "false",
  "null",
  "var",
  "record",
  "yield",
];

export class JavaClassFieldName {
  private _name: string;

  constructor(
    private readonly utils: ChacaUtils,
    name: string,
  ) {
    this._name = name;
  }

  getter(): string {
    return `${this.utils.camelCase(`get_${this.string()}`)}`;
  }

  setter(): string {
    return `${this.utils.camelCase(`set_${this.string()}`)}`;
  }

  equal(other: JavaClassFieldName): boolean {
    return this._name === other._name;
  }

  name(): string {
    return this._name;
  }

  string() {
    const name = this.utils.camelCase(this._name);

    if (JAVA_RESERVED_WORDS.includes(name)) {
      return `${name}Value`;
    }

    return name;
  }
}

export class JavaClassName {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly parent: Parent,
  ) {}

  variable() {
    return this.utils.camelCase(this.parent.string());
  }

  name(): string {
    return this.parent.string();
  }

  equal(other: JavaClassName): boolean {
    return this.parent.equal(other.parent);
  }

  string() {
    return this.utils.pascalCase(this.parent.string());
  }
}
