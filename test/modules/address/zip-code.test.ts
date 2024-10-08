import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Address Zip code option", () => {
  it("Code without arguments. Should return a code with 5 numbers", () => {
    const value = modules.address.zipCode();

    expect(value).toHaveLength(5);
  });

  it("Pass ### as argument. Should return a code with 3 numbers", () => {
    const value = modules.address.zipCode({ format: "###" });
    expect(value).toHaveLength(3);
  });

  it("Pass not valid format argument. Should return a code with 5 numbers", () => {
    const value = modules.address.zipCode({ format: 5 as any });
    expect(value).toHaveLength(5);
  });
});
