import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("# Id modules test", () => {
  it("id.uuid", () => {
    const value = modules.id.uuid();

    expect(typeof value).toBe("string");
  });
});
