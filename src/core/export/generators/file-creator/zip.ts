import AdmZip from "adm-zip";
import { Route } from "./route";
import { FileCreator } from "./file-creator";

export class Zip {
  constructor(
    readonly route: string,
    private readonly instance: AdmZip,
    private readonly generator: FileCreator,
  ) {}

  private write(): void {
    this.instance.writeZip(this.route);
  }

  async multiple(routes: Route[]): Promise<void> {
    for (const route of routes) {
      this.instance.addLocalFile(route.value());
    }

    this.write();

    for (const route of routes) {
      await this.generator.deleteFile(route);
    }
  }
}
