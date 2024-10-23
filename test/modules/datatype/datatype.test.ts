import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("datatype modules", () => {
  it("datatype.specialCharacter", () => {
    const value = modules.datatype.specialCharacter();

    expect(modules.datatype.constants.specialCharacters).include(value);
  });

  it("datatype.boolean", () => {
    const value = modules.datatype.boolean();

    expect(typeof value).toBe("boolean");
  });
});
