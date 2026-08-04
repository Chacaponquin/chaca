import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";
import { ARRAY_OBJECTS } from "./core/array-objects";
import { MATRIX } from "./core/matrix";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Json", () => {
  it("array of objects. should return one file with the serialized array", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto" },
        { id: 2, name: "Carolina" },
      ],
      { filename: "data", format: "json" },
    );

    expect(file.filename).toBe("data.json");
    expect(file.content).toBe(
      [
        `[`,
        `   {`,
        `      "id": 1,`,
        `      "name": "Alberto"`,
        `   },`,
        `   {`,
        `      "id": 2,`,
        `      "name": "Carolina"`,
        `   }`,
        `]`,
      ].join("\n"),
    );
  });

  it("simple object. should serialize every value type", () => {
    const [file] = chaca.transform(SIMPLE_OBJECT, {
      filename: "data",
      format: "json",
    });

    expect(file.content).toBe(
      [
        `{`,
        `   "string": "Hola",`,
        `   "number": 42,`,
        `   "boolean": true,`,
        `   "nullValue": null,`,
        `   "undefinedValue": "undefined",`,
        `   "bigint": "100",`,
        `   "array": [`,
        `      "uno",`,
        `      "dos",`,
        `      "tres"`,
        `   ],`,
        `   "tuple": [`,
        `      "cuatro",`,
        `      5`,
        `   ],`,
        `   "enum": {`,
        `      "value": "seis"`,
        `   },`,
        `   "objectLiteral": {`,
        `      "propiedad": "valor"`,
        `   }`,
        `}`,
      ].join("\n"),
    );
  });

  it("special values. undefined becomes a string, NaN and Infinity become null, bigint becomes a string, dates become ISO strings", () => {
    const [file] = chaca.transform(
      [
        undefined,
        NaN,
        Infinity,
        BigInt(100),
        new Date("2020-01-01T00:00:00.000Z"),
      ],
      { filename: "data", format: "json" },
    );

    expect(file.content).toBe(
      [
        `[`,
        `   "undefined",`,
        `   null,`,
        `   null,`,
        `   "100",`,
        `   "2020-01-01T00:00:00.000Z"`,
        `]`,
      ].join("\n"),
    );
  });

  it("matrix. the generated json should parse back to the original matrix", () => {
    const [file] = chaca.transform(MATRIX, {
      filename: "data",
      format: "json",
    });

    expect(JSON.parse(file.content)).toEqual(MATRIX);
  });

  it("array of objects with nested values. the generated json should be parseable and keep the structure", () => {
    const [file] = chaca.transform(ARRAY_OBJECTS, {
      filename: "data",
      format: "json",
    });

    const parsed = JSON.parse(file.content);

    expect(parsed).toHaveLength(ARRAY_OBJECTS.length);
    expect(parsed[0].name).toBe("John Doe");
    expect(parsed[0].address).toEqual(ARRAY_OBJECTS[0].address);
    expect(parsed[1].purchaseHistory[0].date).toBe("2023-01-15T00:00:00.000Z");
  });

  describe("indent argument", () => {
    it("indent = 5. should use 5 spaces", () => {
      const [file] = chaca.transform(
        { a: 1 },
        { filename: "data", format: { ext: "json", indent: 5 } },
      );

      expect(file.content).toBe(`{\n     "a": 1\n}`);
    });
  });

  describe("separate argument", () => {
    function dataset() {
      return chaca.dataset([
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
    }

    it("separate = false. should return a single file with every schema", async () => {
      const files = await dataset().transform({
        filename: "dataset",
        format: { ext: "json", separate: false },
      });

      expect(files).toHaveLength(1);
      expect(files[0].filename).toBe("dataset.json");
      expect(JSON.parse(files[0].content)).toEqual({
        users: [{ id: 1 }, { id: 2 }],
        posts: [{ id: 1 }, { id: 2 }],
      });
    });

    it("separate = true. should return one file per schema named after it", async () => {
      const files = await dataset().transform({
        filename: "dataset",
        format: { ext: "json", separate: true },
      });

      expect(files.map((f) => f.filename)).toEqual([
        "users.json",
        "posts.json",
      ]);

      for (const file of files) {
        expect(JSON.parse(file.content)).toEqual([{ id: 1 }, { id: 2 }]);
      }
    });
  });

  describe("zip argument", () => {
    it("zip = true. transform ignores it and returns the plain file", () => {
      const files = chaca.transform(
        { a: 1 },
        { filename: "data", format: { ext: "json", zip: true } },
      );

      expect(files).toHaveLength(1);
      expect(files[0].filename).toBe("data.json");
      expect(files[0].content).toBe(`{\n   "a": 1\n}`);
    });
  });

  describe("primitive values", () => {
    it.each([
      ["string", "foo", `"foo"`],
      ["int", 5, `5`],
      ["float", 5.55, `5.55`],
      ["boolean", true, `true`],
      ["null", null, `null`],
    ])("%s. should return a valid json document", (_, value, expected) => {
      const [file] = chaca.transform(value, {
        filename: "data",
        format: "json",
      });

      expect(file.content).toBe(expected);
    });
  });
});
