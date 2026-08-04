import { describe, expect, it } from "vitest";
import { load } from "js-yaml";
import { chaca } from "../../../src";
import { MATRIX } from "./core/matrix";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Yaml", () => {
  it("array of objects. should return one file with a yaml list", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto" },
        { id: 2, name: "Carolina" },
      ],
      { filename: "data", format: "yaml" },
    );

    expect(file.filename).toBe("data.yaml");
    expect(file.content).toBe(
      [
        `-`,
        `   id: 1`,
        `   name: Alberto`,
        `-`,
        `   id: 2`,
        `   name: Carolina`,
        ``,
      ].join("\n"),
    );
  });

  it("simple object. undefined keys are omitted and bigints are serialized as integers", () => {
    const [file] = chaca.transform(SIMPLE_OBJECT, {
      filename: "data",
      format: "yaml",
    });

    expect(file.content).toBe(
      [
        `string: Hola`,
        `number: 42`,
        `boolean: true`,
        `nullValue: null`,
        `bigint: 100`,
        `array:`,
        `   - uno`,
        `   - dos`,
        `   - tres`,
        `tuple:`,
        `   - cuatro`,
        `   - 5`,
        `enum:`,
        `   value: seis`,
        `objectLiteral:`,
        `   propiedad: valor`,
        ``,
      ].join("\n"),
    );
  });

  it("special values. undefined becomes null, NaN becomes .nan, Infinity becomes .inf, dates become ISO timestamps", () => {
    const [file] = chaca.transform(
      [
        undefined,
        NaN,
        Infinity,
        BigInt(100),
        new Date("2020-01-01T00:00:00.000Z"),
      ],
      { filename: "data", format: "yaml" },
    );

    expect(file.content).toBe(
      [
        `- null`,
        `- .nan`,
        `- .inf`,
        `- 100`,
        `- 2020-01-01T00:00:00.000Z`,
        ``,
      ].join("\n"),
    );
  });

  it("bigints. safe values are serialized as integers, values beyond the safe integer range as decimal strings", () => {
    const [file] = chaca.transform(
      { big: BigInt(-42), nested: { huge: BigInt("9007199254740993") } },
      { filename: "data", format: "yaml" },
    );

    expect(file.content).toBe(
      [`big: -42`, `nested:`, `   huge: '9007199254740993'`, ``].join("\n"),
    );
  });

  it("nested object. should indent nested fields and lists", () => {
    const [file] = chaca.transform(
      { user: { name: "Ana", tags: ["a", "b"] } },
      { filename: "data", format: "yaml" },
    );

    expect(file.content).toBe(
      [`user:`, `   name: Ana`, `   tags:`, `      - a`, `      - b`, ``].join(
        "\n",
      ),
    );
  });

  it("matrix. the generated yaml should parse back to the original matrix", () => {
    const [file] = chaca.transform(MATRIX, {
      filename: "data",
      format: "yaml",
    });

    expect(load(file.content)).toEqual(MATRIX);
  });

  describe("sortKeys argument", () => {
    it("sortKeys = true. should sort the object keys", () => {
      const [file] = chaca.transform(
        { b: 2, a: 1, c: 3 },
        { filename: "data", format: { ext: "yaml", sortKeys: true } },
      );

      expect(file.content).toBe(`a: 1\nb: 2\nc: 3\n`);
    });
  });

  describe("indent argument", () => {
    it("indent = 5. should use 5 spaces", () => {
      const [file] = chaca.transform(
        { a: { b: 1 } },
        { filename: "data", format: { ext: "yaml", indent: 5 } },
      );

      expect(file.content).toBe(`a:\n     b: 1\n`);
    });
  });

  describe("quotingType argument", () => {
    it("quotingType = double quote. should quote strings with double quotes", () => {
      const [file] = chaca.transform(["hola mundo: foo"], {
        filename: "data",
        format: { ext: "yaml", quotingType: '"' },
      });

      expect(file.content).toBe(`- "hola mundo: foo"\n`);
    });
  });

  describe("lineWidth argument", () => {
    it("lineWidth = 20. should fold long strings into a block scalar", () => {
      const [file] = chaca.transform(
        {
          text: "uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece",
        },
        { filename: "data", format: { ext: "yaml", lineWidth: 20 } },
      );

      expect(file.content).toBe(
        [
          `text: >-`,
          `   uno dos tres cuatro`,
          `   cinco seis siete`,
          `   ocho nueve diez once`,
          `   doce trece`,
          ``,
        ].join("\n"),
      );
    });
  });

  describe("separate argument", () => {
    it("separate = true. should return one yaml file per schema", async () => {
      const dataset = chaca.dataset([
        {
          name: "users",
          documents: 2,
          schema: chaca.schema({ id: chaca.sequence() }),
        },
        {
          name: "posts",
          documents: 2,
          schema: chaca.schema({ id: chaca.sequence() }),
        },
      ]);

      const files = await dataset.transform({
        filename: "dataset",
        format: { ext: "yaml", separate: true },
      });

      expect(files.map((f) => f.filename)).toEqual([
        "users.yaml",
        "posts.yaml",
      ]);

      for (const file of files) {
        expect(file.content).toBe(
          [`-`, `   id: 1`, `-`, `   id: 2`, ``].join("\n"),
        );
      }
    });
  });

  describe("primitive values", () => {
    it.each([
      ["string", "foo", `foo\n`],
      ["int", 5, `5\n`],
      ["float", 5.55, `5.55\n`],
      ["boolean", true, `true\n`],
      ["null", null, `null\n`],
      ["undefined", undefined, ``],
    ])("%s. should return a valid yaml document", (_, value, expected) => {
      const [file] = chaca.transform(value, {
        filename: "data",
        format: "yaml",
      });

      expect(file.content).toBe(expected);
    });
  });
});
