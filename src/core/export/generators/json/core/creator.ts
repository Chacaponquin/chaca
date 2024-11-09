import { SpaceIndex } from "../../../core/space-index";

export class JsonCodeCreator {
  constructor(private readonly indent: SpaceIndex) {}

  execute(data: any): string {
    return JSON.stringify(
      data,
      (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        } else if (typeof value === "undefined") {
          return "undefined";
        }

        return value;
      },
      this.indent.step(),
    );
  }
}
