import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import fs from "fs";
import { Imports } from "./core/import";
import { PythonCodeCreator } from "./core/creator";
import { PythonClasses } from "./core/classes";

export interface PythonProps {
  zip?: boolean;
  separate?: boolean;
}

export class PythonGenerator extends Generator {
  private zip: boolean;

  constructor(filename: string, location: string, config: PythonProps) {
    super({
      extension: "py",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
  }

  async createFile(data: any): Promise<string> {
    const imports = new Imports();

    const classes = new PythonClasses(imports);
    const creator = new PythonCodeCreator(imports, classes);

    const code = creator.execute(this.utils, {
      data: data,
      name: this.filename,
    });

    await fs.promises.writeFile(this.route, code, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string> {
    const imports = new Imports();
    const classes = new PythonClasses(imports);
    const creator = new PythonCodeCreator(imports, classes);
    const data = resolver.resolve();

    const code = creator.execute(this.utils, {
      data: data,
      name: this.filename,
    });

    await fs.promises.writeFile(this.route, code, "utf-8");

    if (this.zip) {
      return await this.createFileZip();
    } else {
      return this.route;
    }
  }
}
