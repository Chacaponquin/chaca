import { ChacaUtils } from "../../../../utils";
import { PythonClasses } from "./classes";
import { Imports } from "./import";
import { VariableName } from "./names";
import { Parent } from "./parent";
import { PythonDatatype } from "./type";

interface Props {
  data: any;
  name: string;
}

export class PythonCodeCreator {
  constructor(
    private readonly imports: Imports,
    private readonly classes: PythonClasses,
  ) {}

  execute(utils: ChacaUtils, { data, name }: Props): string {
    const preventName = new VariableName(utils, { name: name });

    const parent = new Parent();

    const datatype = PythonDatatype.create(
      utils,
      this.imports,
      parent,
      this.classes,
      {
        preventName: preventName,
        value: data,
      },
    );

    let code = `${this.imports.string()}\n`;

    code += `${this.classes.string()}\n`;

    code += `data: ${datatype.declaration()} = ${datatype.string()}\n`;

    return code;
  }
}
