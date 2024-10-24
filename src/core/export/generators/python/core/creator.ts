import { ChacaUtils } from "../../../../utils";
import { SkipInvalid } from "../../../core/skip-invalid";
import { SpaceIndex } from "../../../core/space-index";
import { PythonClasses } from "./classes";
import { Imports } from "./import";
import { Route } from "./route";
import { ValueCreator } from "./value-creator";

interface Props {
  data: any;
  name: string;
}

export class PythonCodeCreator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly skipInvalid: SkipInvalid,
    private readonly indent: SpaceIndex,
  ) {}

  execute({ data, name }: Props): string {
    const imports = new Imports();
    const classes = new PythonClasses();
    const route = new Route([name]);
    const creator = new ValueCreator(this.utils, classes, this.skipInvalid);

    const datatype = creator.execute({ route: route, value: data });

    const classesDef = classes.definition(this.indent, imports);

    if (datatype) {
      const declaration = datatype.declaration(imports);
      const content = datatype.string(this.indent, imports);
      const imp = imports.string();

      let code = ``;

      if (imp !== "") code += `${imports.string()}\n`;

      code += `${classesDef}\n`;

      code += `data: ${declaration} = ${content}\n`;

      return code;
    } else {
      return ``;
    }
  }
}
