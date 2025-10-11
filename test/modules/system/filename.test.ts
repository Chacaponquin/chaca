import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const extensions = Object.values(
  modules.system.constants.fileExtensions,
).flat();

describe("system.filename", () => {
  it("without arguments. should return a filename with random extension", () => {
    const value = modules.system.filename();

    const array = value.split(".");
    const ext = value.split(".").at(-1);

    expect(array).toHaveLength(2);

    expect(extensions).toContain(`.${ext}`);
  });

  it("ext = 'gif'. should return a filename with extension 'gif'", () => {
    const value = modules.system.filename({ ext: "gif" });

    const ext = value.split(".").at(-1);

    expect(ext).not.toBeUndefined();

    expect(ext).toBe("gif");
  });

  it("ext = ''. should return a filename with random extension", () => {
    const value = modules.system.filename({ ext: "" });

    const ext = value.split(".").at(-1);

    expect(ext).not.toBeUndefined();
    expect(extensions).toContain(`.${ext}`);
  });

  it("ext = '   '. should return a filename with random extension", () => {
    const value = modules.system.filename({ ext: "   " });

    const ext = value.split(".").at(-1);

    expect(ext).not.toBeUndefined();
    expect(extensions).toContain(`.${ext}`);
  });
});
