import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("system modules", () => {
  it("system.fileExt", () => {
    const value = modules.system.fileExt();
    expect(
      Object.values(modules.system.constants.fileExtensions).flat(),
    ).include(value);
  });

  it("system.filename", () => {
    const value = modules.system.filename();

    const array = value.split(".");
    expect(array).toHaveLength(2);
  });

  it("system.mimeType", () => {
    const value = modules.system.mimeType();

    expect(modules.system.constants.mimeTypes).include(value);
  });

  it("system.semver", () => {
    const value = modules.system.semver();

    const array = value.split(".");

    expect(array).toHaveLength(3);

    for (const v of array) {
      expect(Number(v)).toBeGreaterThanOrEqual(0);
      expect(Number(v)).toBeLessThanOrEqual(9);
    }
  });

  it("system.directoryPath", () => {
    const value = modules.system.directoryPath();

    const array = value.split("/");

    for (const name of array) {
      expect(name).not.include("/");
    }
  });
});
