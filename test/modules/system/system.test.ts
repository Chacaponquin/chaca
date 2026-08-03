import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("system modules", () => {
  it("system.fileExt", () => {
    const value = modules.system.fileExt();
    expect(
      Object.values(modules.system.constants.fileExtensions).flat(),
    ).include(value);
  });

  it("system.mimeType", () => {
    const value = modules.system.mimeType();

    expect(modules.system.constants.mimeTypes).include(value);
  });

  it("system.semver", () => {
    const value = modules.system.semver();

    expect(value).toMatch(/^\d\.\d\.\d$/);
  });

  it("system.directoryPath", () => {
    const value = modules.system.directoryPath();

    const array = value.split("/");

    expect(array.length).toBeGreaterThanOrEqual(1);
    expect(array.length).toBeLessThanOrEqual(5);

    for (const name of array) {
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it("system.filePath", () => {
    const value = modules.system.filePath();

    const array = value.split("/");

    expect(array.length).toBeGreaterThanOrEqual(2);

    const filename = array[array.length - 1];
    const extension = filename.slice(filename.lastIndexOf("."));

    expect(
      Object.values(modules.system.constants.fileExtensions).flat(),
    ).include(extension);
  });
});
