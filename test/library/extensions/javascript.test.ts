import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Javascript", () => {
  it("array of objects. should return a const declaration with the serialized array", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto" },
        { id: 2, name: "Carolina" },
      ],
      { filename: "data", format: "javascript" },
    );

    expect(file.filename).toBe("data.js");
    expect(file.content).toBe(
      [
        `const data = [`,
        `   {`,
        `      id: 1,`,
        `      name: "Alberto"`,
        `   },`,
        `   {`,
        `      id: 2,`,
        `      name: "Carolina"`,
        `   }`,
        `]`,
      ].join("\n"),
    );
  });

  it("simple object. should serialize every value type", () => {
    const [file] = chaca.transform(SIMPLE_OBJECT, {
      filename: "data",
      format: "javascript",
    });

    expect(file.content).toBe(
      [
        `const data = {`,
        `   string: "Hola",`,
        `   number: 42,`,
        `   boolean: true,`,
        `   nullValue: null,`,
        `   undefinedValue: undefined,`,
        `   bigint: 100n,`,
        `   array: [`,
        `      "uno",`,
        `      "dos",`,
        `      "tres"`,
        `   ],`,
        `   tuple: [`,
        `      "cuatro",`,
        `      5`,
        `   ],`,
        `   enum: {`,
        `      value: "seis"`,
        `   },`,
        `   objectLiteral: {`,
        `      propiedad: "valor"`,
        `   }`,
        `}`,
      ].join("\n"),
    );
  });

  it("special values. should keep undefined, NaN, Infinity, bigint and Date as javascript literals", () => {
    const [file] = chaca.transform(
      [
        undefined,
        NaN,
        Infinity,
        BigInt(100),
        new Date("2020-01-01T00:00:00.000Z"),
        null,
      ],
      { filename: "data", format: "javascript" },
    );

    expect(file.content).toBe(
      [
        `const data = [`,
        `   undefined,`,
        `   NaN,`,
        `   Infinity,`,
        `   100n,`,
        `   new Date("2020-01-01T00:00:00.000Z"),`,
        `   null`,
        `]`,
      ].join("\n"),
    );
  });

  describe("indent argument", () => {
    it("indent = 5. should use 5 spaces", () => {
      const [file] = chaca.transform(
        { a: { b: 1 } },
        { filename: "data", format: { ext: "javascript", indent: 5 } },
      );

      expect(file.content).toBe(
        [`const data = {`, `     a: {`, `          b: 1`, `     }`, `}`].join(
          "\n",
        ),
      );
    });
  });

  describe("skipInvalid argument", () => {
    it("skipInvalid = false (default). a function value should throw an error", () => {
      expect(() =>
        chaca.transform(
          { fn: () => 1 },
          { filename: "data", format: "javascript" },
        ),
      ).toThrow(ChacaError);
      expect(() =>
        chaca.transform(
          { fn: () => 1 },
          { filename: "data", format: "javascript" },
        ),
      ).toThrow(`You can not export a function to a javascript file.`);
    });

    it("skipInvalid = true. a function value should be omitted", () => {
      const [file] = chaca.transform(
        { fn: () => 1 },
        { filename: "data", format: { ext: "javascript", skipInvalid: true } },
      );

      expect(file.content).toBe(`const data = {}`);
    });
  });

  describe("separate argument", () => {
    it("separate = true. should return one js file per schema", async () => {
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
        format: { ext: "javascript", separate: true },
      });

      expect(files.map((f) => f.filename)).toEqual(["users.js", "posts.js"]);

      for (const file of files) {
        expect(file.content).toBe(
          [
            `const data = [`,
            `   {`,
            `      id: 1`,
            `   },`,
            `   {`,
            `      id: 2`,
            `   }`,
            `]`,
          ].join("\n"),
        );
      }
    });
  });

  describe("primitive values", () => {
    it.each([
      ["string", "foo", `const data = "foo"`],
      ["int", 5, `const data = 5`],
      ["float", 5.55, `const data = 5.55`],
      ["boolean", true, `const data = true`],
      ["null", null, `const data = null`],
    ])("%s. should return a valid declaration", (_, value, expected) => {
      const [file] = chaca.transform(value, {
        filename: "data",
        format: "javascript",
      });

      expect(file.content).toBe(expected);
    });
  });
});
