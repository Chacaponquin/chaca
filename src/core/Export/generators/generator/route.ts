import path from "path";
import { Filename } from "./name";

export class Route {
  constructor(
    private readonly name: Filename,
    private readonly base: string,
    private readonly ext: string,
  ) {}

  value() {
    return `${path.join(this.base, `${this.name.value()}.${this.ext}`)}`;
  }
}
