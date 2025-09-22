import { describe, expect, it } from "vitest";
import { chaca, modules } from "../../../src";

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
});
