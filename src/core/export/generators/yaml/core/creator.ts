import yaml from "js-yaml";
import { SpaceIndex } from "../../../core/space-index";

interface Props {
  sortKeys: boolean | ((a: any, b: any) => number) | undefined;
  lineWidth: number | undefined;
  quotingType: "'" | '"' | undefined;
  indent: SpaceIndex;
}

export class YamlCodeCreator {
  constructor(private readonly config: Props) {}

  execute(data: any): string {
    return yaml.dump(data, {
      skipInvalid: true,
      indent: this.config.indent.step(),
      sortKeys: this.config.sortKeys,
      lineWidth: this.config.lineWidth,
      quotingType: this.config.quotingType,
    });
  }
}
