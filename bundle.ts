import { buildSync } from "esbuild";
import { sync as glob } from "glob";

buildSync({
  entryPoints: glob("./src/**/*.ts"),
  outdir: "./lib/cjs",
  bundle: false,
  sourcemap: false,
  minify: true,
  format: "cjs",
  platform: "node",
  target: ["ES2019"],
});

buildSync({
  entryPoints: glob("./src/**/*.ts"),
  outdir: "./lib/esm",
  splitting: true,
  minify: true,
  format: "esm",
  sourcemap: false,
  outExtension: { ".js": ".mjs" },
  bundle: true,
  target: ["ES2019"],
  platform: "node",
});
