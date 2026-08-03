import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Typescript", () => {
  it("array of objects. should generate an interface and a typed const declaration", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto" },
        { id: 2, name: "Carolina" },
      ],
      { filename: "data", format: "typescript" },
    );

    expect(file.filename).toBe("data.ts");
    expect(file.content).toBe(
      [
        `interface Data {`,
        `   id: number`,
        `   name: string`,
        `}`,
        ``,
        `export const data: Array<Data> = [`,
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

  it("simple object. should generate one interface per nested object and type every value", () => {
    const [file] = chaca.transform(SIMPLE_OBJECT, {
      filename: "data",
      format: "typescript",
    });

    expect(file.content).toBe(
      [
        `interface DataObjectLiteral {`,
        `   propiedad: string`,
        `}`,
        ``,
        `interface DataEnum {`,
        `   value: string`,
        `}`,
        ``,
        `interface Data {`,
        `   string: string`,
        `   number: number`,
        `   boolean: boolean`,
        `   nullValue: null`,
        `   undefinedValue?: undefined`,
        `   bigint: bigint`,
        `   array: Array<string>`,
        `   tuple: Array<string | number>`,
        `   enum: DataEnum`,
        `   objectLiteral: DataObjectLiteral`,
        `}`,
        ``,
        `export const data: Data = {`,
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

  it("mixed array. should type the array as a union", () => {
    const [file] = chaca.transform([1, "a", true], {
      filename: "data",
      format: "typescript",
    });

    expect(file.content).toBe(
      [
        ``,
        `export const data: Array<number | string | boolean> = [`,
        `   1,`,
        `   "a",`,
        `   true`,
        `]`,
      ].join("\n"),
    );
  });

  it("special values. should keep javascript literals and type them as a union", () => {
    const [file] = chaca.transform(
      [
        undefined,
        NaN,
        Infinity,
        BigInt(100),
        new Date("2020-01-01T00:00:00.000Z"),
        null,
      ],
      { filename: "data", format: "typescript" },
    );

    expect(file.content).toBe(
      [
        ``,
        `export const data: Array<undefined | number | bigint | Date | null> = [`,
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

  describe("declarationOnly argument", () => {
    it("declarationOnly = true. should generate only the interfaces", () => {
      const [file] = chaca.transform([{ id: 1, name: "Alberto" }], {
        filename: "data",
        format: { ext: "typescript", declarationOnly: true },
      });

      expect(file.content).toBe(
        [
          `interface Data {`,
          `   id: number`,
          `   name: string`,
          `}`,
          ``,
          ``,
        ].join("\n"),
      );
    });
  });

  describe("indent argument", () => {
    it("indent = 5. should use 5 spaces", () => {
      const [file] = chaca.transform(
        { a: { b: 1 } },
        { filename: "data", format: { ext: "typescript", indent: 5 } },
      );

      expect(file.content).toBe(
        [
          `interface DataA {`,
          `     b: number`,
          `}`,
          ``,
          `interface Data {`,
          `     a: DataA`,
          `}`,
          ``,
          `export const data: Data = {`,
          `     a: {`,
          `          b: 1`,
          `     }`,
          `}`,
        ].join("\n"),
      );
    });
  });

  describe("skipInvalid argument", () => {
    it("skipInvalid = false (default). a function value should throw an error", () => {
      expect(() =>
        chaca.transform(
          { fn: () => 1 },
          { filename: "data", format: "typescript" },
        ),
      ).toThrow(ChacaError);
    });

    it("skipInvalid = true. a function value should be omitted", () => {
      const [file] = chaca.transform(
        { fn: () => 1 },
        { filename: "data", format: { ext: "typescript", skipInvalid: true } },
      );

      expect(file.content).toBe(
        [`interface Data {`, `}`, ``, `export const data: Data = {}`].join(
          "\n",
        ),
      );
    });
  });

  describe("separate argument", () => {
    it("separate = true. should return one ts file per schema with the interface named after it", async () => {
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
        format: { ext: "typescript", separate: true },
      });

      expect(files.map((f) => f.filename)).toEqual(["users.ts", "posts.ts"]);

      expect(files[0].content).toBe(
        [
          `interface Users {`,
          `   id: number`,
          `}`,
          ``,
          `export const data: Array<Users> = [`,
          `   {`,
          `      id: 1`,
          `   },`,
          `   {`,
          `      id: 2`,
          `   }`,
          `]`,
        ].join("\n"),
      );
    });
  });

  describe("primitive values", () => {
    it.each([
      ["string", "foo", `\nexport const data: string = "foo"`],
      ["int", 5, `\nexport const data: number = 5`],
      ["float", 5.55, `\nexport const data: number = 5.55`],
      ["boolean", true, `\nexport const data: boolean = true`],
      ["null", null, `\nexport const data: null = null`],
    ])("%s. should return a typed declaration", (_, value, expected) => {
      const [file] = chaca.transform(value, {
        filename: "data",
        format: "typescript",
      });

      expect(file.content).toBe(expected);
    });
  });
});
