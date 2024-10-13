import { ChacaUtils } from "../../../../utils";
import { PythonClasses } from "./classes";
import { Imports } from "./import";
import { VariableName } from "./names";
import { Parent } from "./parent";
import { SpaceIndex } from "./space-index";
import { PythonDatatype } from "./type";

interface Props {
  data: any;
  name: string;
}

export class PythonCodeCreator {
  constructor(private readonly utils: ChacaUtils) {}

  execute({ data, name }: Props): string {
    const imports = new Imports();
    const classes = new PythonClasses(imports);
    const preventName = new VariableName(this.utils, { name: name });
    const index = new SpaceIndex();

    const parent = new Parent();

    const datatype = PythonDatatype.create(
      this.utils,
      imports,
      parent,
      classes,
      index,
      {
        preventName: preventName,
        value: data,
      },
    );

    let code = `${imports.string()}\n`;

    code += `${classes.string()}\n`;

    code += `data: ${datatype.declaration()} = ${datatype.string()}\n`;

    return code;
  }
}
