import { ChacaError } from "../../../../../errors";
import { SpaceIndex } from "../../../core/space-index";
import { SaveJavaClass, SaveJavaClassField } from "./classes";
import { Import, Imports } from "./import";
import { Parent } from "./parent";

export abstract class JavaDatatype {
  abstract equal(other: JavaDatatype): boolean;
  abstract definition(imports: Imports): string;
  abstract string(index: SpaceIndex, imports: Imports): string;
  protected abstract similar(other: JavaDatatype): boolean;
  protected abstract greaterThan(other: JavaDatatype): boolean;

  greater(other: JavaDatatype): JavaDatatype {
    return this.greaterThan(other) ? this : other;
  }

  isSimilar(other: JavaDatatype): boolean {
    return (
      this.equal(other) ||
      this.similar(other) ||
      this instanceof JavaNull ||
      other instanceof JavaNull
    );
  }
}

export class JavaString extends JavaDatatype {
  constructor(private readonly value: string) {
    super();
  }

  protected similar(): boolean {
    return false;
  }

  greaterThan(): boolean {
    return false;
  }

  definition(): string {
    return "String";
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaString;
  }

  string(): string {
    return `${JSON.stringify(this.value)}`;
  }
}

abstract class JavaNumber extends JavaDatatype {
  protected similar(other: JavaDatatype): boolean {
    return other instanceof JavaNumber;
  }
}

export class JavaFloat extends JavaNumber {
  constructor(private readonly value: number) {
    super();
  }

  greaterThan(other: JavaDatatype): boolean {
    return other instanceof JavaInt;
  }

  definition(): string {
    return `Float`;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaFloat;
  }

  string(): string {
    if (this.value === Infinity) {
      return "Float.POSITIVE_INFINITY";
    } else if (this.value === -Infinity) {
      return "Float.NEGATIVE_INFINITY";
    } else if (Number.isNaN(this.value)) {
      return "Float.NaN";
    } else {
      return `${this.value}`;
    }
  }
}

export class JavaInt extends JavaNumber {
  constructor(private readonly value: number) {
    super();
  }

  greaterThan(): boolean {
    return false;
  }

  string(): string {
    return `${this.value}`;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaInt;
  }

  definition(): string {
    return "Integer";
  }
}

export class JavaBoolean extends JavaDatatype {
  constructor(private readonly value: boolean) {
    super();
  }

  protected similar(): boolean {
    return false;
  }

  greaterThan(): boolean {
    return false;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaBoolean;
  }

  definition(): string {
    return "boolean";
  }

  string(): string {
    return this.value ? "true" : "false";
  }
}

export class JavaBigint extends JavaDatatype {
  constructor(private readonly value: bigint) {
    super();
  }

  protected similar(): boolean {
    return false;
  }

  greaterThan(): boolean {
    return false;
  }

  string(): string {
    return `BigInteger`;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaBigint;
  }

  definition(): string {
    return `BigInteger.valueOf(${Number(this.value)})`;
  }
}

export class JavaDate extends JavaDatatype {
  constructor(private readonly value: Date) {
    super();
  }

  protected similar(): boolean {
    return false;
  }

  greaterThan(): boolean {
    return false;
  }

  string(_: SpaceIndex, imports: Imports): string {
    imports.add(new Import(["java", "time", "LocalDateTime"]));

    return `LocalDateTime.parse("${this.value.toISOString()}");`;
  }

  definition(imports: Imports): string {
    imports.add(new Import(["java", "time", "LocalDateTime"]));

    return "LocalDateTime";
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaDate;
  }
}

export class JavaRegexp extends JavaDatatype {
  constructor(private readonly value: RegExp) {
    super();
  }

  greaterThan(): boolean {
    return false;
  }

  protected similar(): boolean {
    return false;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaRegexp;
  }

  string(_: SpaceIndex, imports: Imports): string {
    imports.add(new Import(["java", "util", "regex", "Pattern"]));

    return `Patter.compile("${String(this.value)}")`;
  }

  definition(imports: Imports): string {
    imports.add(new Import(["java", "util", "regex", "Pattern"]));

    return "Pattern";
  }
}

export class JavaNull extends JavaDatatype {
  string(): string {
    return "null";
  }

  protected similar(): boolean {
    return true;
  }

  greaterThan(): boolean {
    return false;
  }

  definition(): string {
    return "Object";
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaNull;
  }
}

export class JavaClass extends JavaDatatype {
  readonly fields: JavaClassField[];
  readonly save: SaveJavaClass;
  readonly parent: Parent;

  constructor(save: SaveJavaClass, parent: Parent) {
    super();

    this.save = save;
    this.fields = [];
    this.parent = parent;
  }

  greaterThan(): boolean {
    return false;
  }

  protected similar(other: JavaDatatype): boolean {
    return other instanceof JavaClass;
  }

  name() {
    return this.save.name();
  }

  string(index: SpaceIndex, imports: Imports): string {
    let code = index.create(`new ${this.name()}(\n`);

    index.push();

    code += this.save.fields
      .map((f) => {
        const found = this.fields.find((sf) => sf.save === f);

        if (found) {
          return index.create(`${found.string(index, imports)}`);
        } else {
          return `null`;
        }
      })
      .join(",\n");

    index.reverse();

    code += "\n" + index.create(")\n");

    return code;
  }

  equal(other: JavaDatatype): boolean {
    if (other instanceof JavaClass) {
      return true;
    }

    return false;
  }

  definition(): string {
    return this.name();
  }

  setField(field: JavaClassField): void {
    this.fields.push(field);
  }
}

export class JavaClassField {
  readonly datatype: JavaDatatype;
  readonly save: SaveJavaClassField;

  constructor(datatype: JavaDatatype, save: SaveJavaClassField) {
    this.datatype = datatype;
    this.save = save;
  }

  name() {
    return this.save.name();
  }

  string(index: SpaceIndex, imports: Imports) {
    return this.datatype.string(index, imports);
  }

  definition(imports: Imports): string {
    return this.datatype.definition(imports);
  }
}

export class JavaArray extends JavaDatatype {
  private values: JavaDatatype[];
  private datatype: JavaDatatype | null;

  constructor() {
    super();

    this.values = [];
    this.datatype = null;
  }

  protected similar(): boolean {
    return false;
  }

  protected greaterThan(): boolean {
    return false;
  }

  definition(imports: Imports): string {
    imports.add(new Import(["java", "util", "List"]));

    if (this.datatype) {
      return `List<${this.datatype.definition(imports)}>`;
    } else {
      return `List<Object>`;
    }
  }

  string(index: SpaceIndex, imports: Imports): string {
    imports.add(
      new Import(["java", "util", "List"]),
      new Import(["java", "util", "Arrays"]),
    );

    if (this.values.length === 0) {
      return `Arrays.asList()`;
    }

    let code = `Arrays.asList(\n`;

    index.push();

    code += this.values
      .map((v) => {
        return index.create(`${v.string(index, imports)}`);
      })
      .join(",\n");

    index.reverse();

    code += "\n" + index.create(")");

    return code;
  }

  equal(other: JavaDatatype): boolean {
    return other instanceof JavaArray;
  }

  add(value: JavaDatatype): void {
    if (this.datatype) {
      if (this.datatype.isSimilar(value)) {
        this.datatype = this.datatype.greater(value);
      } else {
        throw new ChacaError(``);
      }
    } else {
      this.datatype = value;
    }

    this.values.push(value);
  }
}
