import { ChacaUtils } from "../../../../utils";
import { JavascriptClasses } from "./classes";
import { VariableName } from "../../../core/names";
import { SpaceIndex } from "../../../core/space-index";
import { JavascriptDatatype } from "./types";
import { Parent } from "../../../core/parent";

interface Props {
  types: boolean;
  name: string;
  data: any;
}

export class JavascriptCodeCreator {
  constructor(private readonly utils: ChacaUtils) {}

  execute({ data, name, types }: Props): string {
    const classes = new JavascriptClasses();
    const preventName = new VariableName(this.utils, { name: name });
    const index = new SpaceIndex(2);
    const parent = new Parent();

    const datatype = JavascriptDatatype.create(
      this.utils,
      index,
      parent,
      classes,
      { preventName: preventName, value: data },
    );

    let code = ``;

    if (!types) {
      code += `const data = ${datatype.string()}`;
    } else {
      code += `${classes.string()}\n`;

      code += `const data: ${datatype.definition()} = ${datatype.string()}`;
    }

    return code;
  }
}
