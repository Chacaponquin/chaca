import { SpaceIndex } from "../../../core/space-index";

export class JsonCodeCreator {
  constructor(private readonly indent: SpaceIndex) {}

  execute(data: any): string {
    return JSON.stringify(data, undefined, this.indent.step());
  }
}
