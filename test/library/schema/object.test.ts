import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../src";

describe("Schema object generation", () => {
  it("generate an empty schema. should return an empty object", async () => {
    const schema = chaca.schema({});

    expect(await schema.object()).toEqual({});
  });

  it("define a schema with id, name fields. should return a define schema object with id and name fields", async () => {
    const schema = chaca.schema({
      id: { type: () => modules.id.uuid() },
      name: { type: () => modules.person.firstName() },
    });

    const doc = await schema.object();

    expect(doc).toHaveProperty("id");
    expect(doc).toHaveProperty("name");
  });

  it("field defined as a direct function (shorthand). should use the function as generator", async () => {
    const schema = chaca.schema({
      greeting: () => "hello",
    });

    const doc = await schema.object();

    expect(doc.greeting).toBe("hello");
  });

  it("field values come from their generators", async () => {
    const schema = chaca.schema({
      fixed: { type: () => 42 },
    });

    const doc = await schema.object();

    expect(doc.fixed).toBe(42);
  });

  describe("invalid field definitions", () => {
    it("field defined as a string. should throw an error", async () => {
      const schema = chaca.schema({
        name: "hola" as never,
      });

      await expect(schema.object()).rejects.toThrow(ChacaError);
    });

    it("field defined as a number. should throw an error", async () => {
      const schema = chaca.schema({
        name: 10 as never,
      });

      await expect(schema.object()).rejects.toThrow(ChacaError);
    });

    it("field defined as null. should throw an error", async () => {
      const schema = chaca.schema({
        name: null as never,
      });

      await expect(schema.object()).rejects.toThrow(ChacaError);
    });
  });
});
