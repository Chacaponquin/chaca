import { ChacaUtils } from "../../../../utils";
import { JavascriptClasses } from "./classes";
import { SpaceIndex } from "../../../core/space-index";
import { ValueCreator } from "./value-creator";
import { Route } from "./route";

interface Props {
  name: string;
  data: any;
}

export class JavascriptCodeCreator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly indent: SpaceIndex,
    private readonly types: boolean,
  ) {}

  execute({ data, name }: Props): string {
    const classes = new JavascriptClasses();
    const route = new Route([name]);
    const creator = new ValueCreator(classes, this.utils);

    const datatype = creator.execute({ route: route, value: data });

    let code = ``;

    if (!this.types) {
      code += `const data = ${datatype.string(this.indent)}`;
    } else {
      code += `${classes.string()}`;

      code += `export const data: ${datatype.definition()} = ${datatype.string(
        this.indent,
      )}`;
    }

    return code;
  }
}
