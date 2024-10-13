import yaml from "js-yaml";

export class YamlCodeCreator {
  execute(data: any): string {
    return yaml.dump(data, { skipInvalid: true, indent: 3 });
  }
}
