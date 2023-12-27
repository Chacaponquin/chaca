import fs from "fs";

export function checkFile(route: string): boolean {
  return fs.existsSync(route);
}
