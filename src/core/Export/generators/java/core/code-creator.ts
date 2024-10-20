import { SpaceIndex } from "../../../core/space-index";
import { JavaClasses } from "./classes";
import { Import, Imports } from "./import";

export interface CodeResult {
  filename: string;
  content: string;
}

export class JavaCodeCreator {
  constructor(
    private readonly classes: JavaClasses,
    private readonly index: SpaceIndex,
  ) {}

  execute(): CodeResult[] {
    const codes: CodeResult[] = [];

    for (const c of this.classes.classes) {
      const imports = new Imports();

      const definition = c.definition(this.index, imports);
      const imp = imports.string();

      let content = `package ip.quicktype;\n\n`;

      if (imp !== "") {
        content += imp + "\n\n";
      }

      content += definition;

      codes.push({ content: content, filename: c.name() });
    }

    codes.push({ content: this.main(), filename: "Main" });

    return codes;
  }

  private main(): string {
    const imports = new Imports();

    let code = `package io.quicktype;\n\n`;

    // create content
    let content = ``;

    content += this.index.create("public class Main {\n");

    this.index.push();

    content += this.index.create(`public static void main(String[] args) {\n`);

    this.index.push();

    content += this.classes.classes
      .map((c) => {
        imports.add(
          new Import(["java", "util", "List"]),
          new Import(["java", "util", "LinkedList"]),
        );

        const definition = c.name();
        const variable = c.variable();

        let code = this.index.create(
          `List<${definition}> ${variable} = new LinkedList<>();\n`,
        );

        code += c.values
          .map((v) => {
            let code = this.index.create(`${variable}.add(\n`);

            this.index.push();

            code += v.string(this.index, imports);

            this.index.reverse();

            code += this.index.create(")");

            return code;
          })
          .join(";\n");

        return code;
      })
      .join(";\n\n");

    this.index.reverse();

    content += "\n" + this.index.create(`}`);

    this.index.reverse();

    content += "\n" + this.index.create(`}`);

    // create code
    const imp = imports.string();

    if (imp !== "") {
      code += imp + "\n\n";
    }

    code += content;

    return code;
  }
}
