import fs from "fs";

interface Props {
  route: string;
  ext: string;
}

export function checkFile({ ext, route }: Props): boolean {
  return fs.existsSync(route) && route.endsWith(ext);
}
