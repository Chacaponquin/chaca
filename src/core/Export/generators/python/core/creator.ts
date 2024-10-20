import { ChacaUtils } from "../../../../utils";
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
  constructor(private readonly utils: ChacaUtils) {}

  execute({ data, name }: Props): string {
    const imports = new Imports();
    const classes = new PythonClasses();
    const route = new Route([name]);
    const index = new SpaceIndex(2);
    const creator = new ValueCreator(this.utils, classes);

    const datatype = creator.execute({ route: route, value: data });

    const classesDef = classes.definition(index, imports);
    const declaration = datatype.declaration(imports);
    const content = datatype.string(index, imports);
    const imp = imports.string();

    let code = ``;

    if (imp !== "") code += `${imports.string()}\n`;

    code += `${classesDef}\n`;

    code += `data: ${declaration} = ${content}\n`;

    return code;
  }
}
