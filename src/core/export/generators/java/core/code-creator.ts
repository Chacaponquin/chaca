import { SpaceIndex } from "../../../core/space-index";
import { Package } from "../value-object/package";
import { JavaClasses } from "./classes";
import { Import, Imports } from "./import";

interface Props {
  indent: SpaceIndex;
  package: Package;
}

export interface CodeResult {
  filename: string;
  content: string;
}

export class JavaCodeCreator {
  constructor(private readonly config: Props) {}

  execute(classes: JavaClasses): CodeResult[] {
    const codes: CodeResult[] = [];

    for (const c of classes.classes) {
      const imports = new Imports();

      const definition = c.definition(this.config.indent, imports);
      const imp = imports.string();

      let content = this.config.package.string();

      if (imp !== "") {
        content += imp + "\n\n";
      }

      content += definition;

      codes.push({ content: content, filename: c.name() });
    }

    codes.push({ content: this.main(classes), filename: "Main" });

    return codes;
  }

  private main(classes: JavaClasses): string {
    const imports = new Imports();

    let code = this.config.package.string();

    // create content
    let content = ``;

    content += this.config.indent.create("public class Main {\n");

    this.config.indent.push();

    content += this.config.indent.create(
      `public static void main(String[] args) {\n`,
    );

    this.config.indent.push();

    content += classes.classes
      .map((c) => {
        imports.add(
          new Import(["java", "util", "List"]),
          new Import(["java", "util", "LinkedList"]),
        );

        const definition = c.name();
        const variable = c.variable();

        let code = this.config.indent.create(
          `List<${definition}> ${variable} = new LinkedList<>();\n`,
        );

        code += c.values
          .map((v) => {
            let code = this.config.indent.create(`${variable}.add(\n`);

            this.config.indent.push();

            code += v.string(this.config.indent, imports);

            this.config.indent.reverse();

            code += this.config.indent.create(")");

            return code;
          })
          .join(";\n");

        return code;
      })
      .join(";\n\n");

    this.config.indent.reverse();

    content += "\n" + this.config.indent.create(`}`);

    this.config.indent.reverse();

    content += "\n" + this.config.indent.create(`}`);

    // create code
    const imp = imports.string();

    if (imp !== "") {
      code += imp + "\n\n";
    }

    code += content;

    return code;
  }
}
