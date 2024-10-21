import { ChacaUtils } from "../../../../utils";
import { JavascriptClasses } from "./classes";
import { SpaceIndex } from "../../../core/space-index";
import { ValueCreator } from "./value-creator";
import { Route } from "./route";

interface Props {
  types: boolean;
  name: string;
  data: any;
}

export class JavascriptCodeCreator {
  constructor(private readonly utils: ChacaUtils) {}

  execute({ data, name, types }: Props): string {
    const classes = new JavascriptClasses();
    const route = new Route([name]);
    const index = new SpaceIndex(2);
    const creator = new ValueCreator(classes, this.utils);

    const datatype = creator.execute({ route: route, value: data });

    let code = ``;

    if (!types) {
      code += `const data = ${datatype.string(index)}`;
    } else {
      code += `${classes.string()}`;

      code += `export const data: ${datatype.definition()} = ${datatype.string(
        index,
      )}`;
    }

    return code;
  }
}
