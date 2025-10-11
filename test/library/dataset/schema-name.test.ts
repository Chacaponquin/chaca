import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("Dataset generation (schema name)", () => {
  it("trying generate a dataset with two schemas named 'schema'. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({});

    const dataset = chaca.dataset([
      { name: "schema", documents: 10, schema: schema },
      { name: "schema", documents: 10, schema: schema2 },
    ]);

    expect(async () => await dataset.generate()).rejects.toThrow(ChacaError);
  });

  it("trying export a schema with name = ''. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({});

    const dataset = chaca.dataset([
      { name: "", documents: 10, schema: schema },
      { name: "schema", documents: 10, schema: schema2 },
    ]);

    expect(async () => await dataset.generate()).rejects.toThrow(ChacaError);
  });

  it("trying export a schema with name = '   '. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({});

    const dataset = chaca.dataset([
      { name: "     ", documents: 10, schema: schema },
      { name: "schema", documents: 10, schema: schema2 },
    ]);

    expect(async () => await dataset.generate()).rejects.toThrow(ChacaError);
  });
});
