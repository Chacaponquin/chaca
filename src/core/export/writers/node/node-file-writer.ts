import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { FileWriter, WriteFilesProps } from "../file-writer";
import { Route } from "../../generators/file-creator/route";
import { Filename } from "../../generators/file-creator/filename";

/**
 * Node.js implementation of the `FileWriter` port.
 *
 * This is the only place in the export pipeline that touches `fs`, `path` and
 * `adm-zip`, so it must never be imported from the isomorphic core.
 */
export class NodeFileWriter implements FileWriter {
  async write({
    files,
    ext,
    location,
    zip,
    filename,
  }: WriteFilesProps): Promise<string[]> {
    if (location && !fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }

    const base = path.join("./", location);
    const routes: Route[] = [];

    for (const file of files) {
      const route = new Route(new Filename(file.filename), base, ext);

      await fs.promises.writeFile(route.value(), file.content, "utf-8");

      routes.push(route);
    }

    if (zip) {
      const instance = new AdmZip();
      const zipRoute = new Route(new Filename(filename), base, "zip");

      for (const route of routes) {
        instance.addLocalFile(route.value());
      }

      instance.writeZip(zipRoute.value());

      for (const route of routes) {
        await fs.promises.unlink(route.value());
      }

      return [zipRoute.value()];
    }

    return routes.map((r) => r.value());
  }
}
