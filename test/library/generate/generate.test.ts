import { ChacaError, chaca, modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Schema generate tests", () => {
  const schema = chaca.schema({
    id: { type: () => modules.id.uuid() },
    image: { type: () => modules.image.film() },
    name: { type: () => modules.person.firstName({ language: "es" }) },
  });

  const doc = schema.object();

  it("Should return a define schema object with image, id and name fields", () => {
    expect(doc).toHaveProperty("id");
    expect(doc).toHaveProperty("image");
    expect(doc).toHaveProperty("name");
  });

  it("Generate negative number documents. Should throw an error", () => {
    expect(() => schema.array(-10)).toThrow(ChacaError);
  });
});
