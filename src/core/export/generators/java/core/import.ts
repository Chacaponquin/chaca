export class Import {
  from: string[];

  constructor(from: string[]) {
    this.from = from;
  }

  equal(other: Import): boolean {
    return other.from.join(".") === this.from.join(".");
  }
}

export class Imports {
  imports: Import[];

  constructor() {
    this.imports = [];
  }

  add(...imp: Import[]): void {
    for (const i of imp) {
      const found = this.imports.find((si) => si.equal(i));

      if (!found) {
        this.imports.push(i);
      }
    }
  }

  string(): string {
    let code = ``;

    code += this.imports
      .map((i) => {
        return `import ${i.from.join(".")};`;
      })
      .join("\n");

    return code;
  }
}
