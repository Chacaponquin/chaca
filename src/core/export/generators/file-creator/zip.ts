import AdmZip from "adm-zip";
import { Route } from "./route";
import { FileCreator } from "./file-creator";

export class Zip {
  constructor(
    readonly route: string,
    private readonly instance: AdmZip,
    private readonly generator: FileCreator,
  ) {}

  add(file: Route): void {
    this.instance.addLocalFile(file.value());
    this.write();
  }

  private write(): void {
    this.instance.writeZip(this.route);
  }

  async multiple(routes: Route[]): Promise<void> {
    for (const route of routes) {
      this.add(route);
      await this.generator.deleteFile(route);
    }

    this.write();
  }
}