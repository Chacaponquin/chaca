import { chaca, ChacaError } from "../../../src";
import { describe, expect, it } from "vitest";

describe("Dataset", () => {
  it("trying generate a dataset with two schemas named 'schema'. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({});

    const dataset = chaca.dataset([
      { name: "schema", documents: 10, schema: schema },
      { name: "schema", documents: 10, schema: schema2 },
    ]);

    expect(() => dataset.generate()).toThrow(ChacaError);
  });

  it("trying generate a schema data with documents = -10. should throw an error", () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({});

    const dataset = chaca.dataset([
      { name: "schema", documents: 10, schema: schema },
      { name: "schema2", documents: -10, schema: schema2 },
    ]);

    expect(() => dataset.generate()).toThrow(ChacaError);
  });

  describe("schemas without name", () => {
    it("trying export a schema with name = ''. should throw an error", () => {
      const schema = chaca.schema({});

      const schema2 = chaca.schema({});

      const dataset = chaca.dataset([
        { name: "", documents: 10, schema: schema },
        { name: "schema", documents: 10, schema: schema2 },
      ]);

      expect(() => dataset.generate()).toThrow(ChacaError);
    });

    it("trying export a schema with name = '   '. should throw an error", () => {
      const schema = chaca.schema({});

      const schema2 = chaca.schema({});

      const dataset = chaca.dataset([
        { name: "     ", documents: 10, schema: schema },
        { name: "schema", documents: 10, schema: schema2 },
      ]);

      expect(() => dataset.generate()).toThrow(ChacaError);
    });
  });
});
