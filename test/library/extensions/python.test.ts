import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Python", () => {
  it("array of objects. should generate a TypedDict class and a typed data list", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto", admin: true },
        { id: 2, name: "Carolina", admin: false },
      ],
      { filename: "users", format: "python" },
    );

    expect(file.filename).toBe("users.py");
    expect(file.content).toBe(
      [
        `from typing import TypedDict, List`,
        ``,
        `class Users(TypedDict):`,
        `   id: int`,
        `   name: str`,
        `   admin: bool`,
        ``,
        `data: List[Users] = [`,
        `   Users(`,
        `      id=1,`,
        `      name="Alberto",`,
        `      admin=True`,
        `   ),`,
        `   Users(`,
        `      id=2,`,
        `      name="Carolina",`,
        `      admin=False`,
        `   )`,
        `]`,
        ``,
      ].join("\n"),
    );
  });

  it("simple object. should generate one TypedDict per nested object and type every value", () => {
    const [file] = chaca.transform(SIMPLE_OBJECT, {
      filename: "data",
      format: "python",
    });

    expect(file.content).toBe(
      [
        `from typing import TypedDict, Optional, List, Union`,
        ``,
        `class DataObjectLiteral(TypedDict):`,
        `   propiedad: str`,
        ``,
        `class DataEnum(TypedDict):`,
        `   value: str`,
        ``,
        `class Data(TypedDict):`,
        `   string: str`,
        `   number: int`,
        `   boolean: bool`,
        `   null_value: Optional[None]`,
        `   undefined_value: Optional[None]`,
        `   bigint: int`,
        `   array: List[str]`,
        `   tuple: List[Union[str, int]]`,
        `   enum: DataEnum`,
        `   object_literal: DataObjectLiteral`,
        ``,
        `data: Data = Data(`,
        `   string="Hola",`,
        `   number=42,`,
        `   boolean=True,`,
        `   null_value=None,`,
        `   undefined_value=None,`,
        `   bigint=100,`,
        `   array=[`,
        `      "uno",`,
        `      "dos",`,
        `      "tres"`,
        `   ],`,
        `   tuple=[`,
        `      "cuatro",`,
        `      5`,
        `   ],`,
        `   enum=DataEnum(`,
        `      value="seis"`,
        `   ),`,
        `   object_literal=DataObjectLiteral(`,
        `      propiedad="valor"`,
        `   )`,
        `)`,
        ``,
      ].join("\n"),
    );
  });

  it("special values. should use python literals for None, nan, inf, bigint and datetime", () => {
    const [file] = chaca.transform(
      [
        undefined,
        NaN,
        Infinity,
        -Infinity,
        BigInt(100),
        new Date("2020-01-01T00:00:00.000Z"),
        null,
      ],
      { filename: "data", format: "python" },
    );

    expect(file.content).toBe(
      [
        `from typing import List, Union`,
        `import datetime`,
        ``,
        `data: List[Union[None, float, int, datetime.datetime]] = [`,
        `   None,`,
        `   float('nan'),`,
        `   float('inf'),`,
        `   float('-inf'),`,
        `   100,`,
        `   datetime.datetime.fromisoformat("2020-01-01T00:00:00.000Z"),`,
        `   None`,
        `]`,
        ``,
      ].join("\n"),
    );
  });

  it("mixed types across documents. should type the field as a Union", () => {
    const [file] = chaca.transform([{ v: 1 }, { v: "x" }], {
      filename: "data",
      format: "python",
    });

    expect(file.content).toContain(`v: Union[int, str]`);
  });

  it("string fields. should escape quotes and line breaks", () => {
    const [file] = chaca.transform(
      { v: 'hola "mundo"\nsegunda' },
      { filename: "data", format: "python" },
    );

    expect(file.content).toContain(`v="hola \\"mundo\\"\\nsegunda"`);
  });

  it("fields named like python reserved words. should be renamed with a trailing underscore", () => {
    const [file] = chaca.transform(
      { class: 1, import: 2, from: 3, normal: 4 },
      { filename: "keyword", format: "python" },
    );

    expect(file.content).toContain(`class_: int`);
    expect(file.content).toContain(`import_: int`);
    expect(file.content).toContain(`from_: int`);
    expect(file.content).toContain(`normal: int`);
    expect(file.content).toContain(`class_=1`);
  });

  describe("declarationOnly argument", () => {
    it("declarationOnly = true. should generate only the TypedDict classes", () => {
      const [file] = chaca.transform([{ id: 1, name: "x" }], {
        filename: "data",
        format: { ext: "python", declarationOnly: true },
      });

      expect(file.content).toBe(
        [
          `from typing import TypedDict, List`,
          ``,
          `class Data(TypedDict):`,
          `   id: int`,
          `   name: str`,
          ``,
          ``,
        ].join("\n"),
      );
    });
  });

  describe("indent argument", () => {
    it("indent = 2. should use 2 spaces", () => {
      const [file] = chaca.transform(
        { a: { b: 1 } },
        { filename: "data", format: { ext: "python", indent: 2 } },
      );

      expect(file.content).toBe(
        [
          `from typing import TypedDict`,
          ``,
          `class DataA(TypedDict):`,
          `  b: int`,
          ``,
          `class Data(TypedDict):`,
          `  a: DataA`,
          ``,
          `data: Data = Data(`,
          `  a=DataA(`,
          `    b=1`,
          `  )`,
          `)`,
          ``,
        ].join("\n"),
      );
    });
  });

  describe("skipInvalid argument", () => {
    it("skipInvalid = false (default). a function value should throw an error", () => {
      expect(() =>
        chaca.transform(
          { fn: () => 1 },
          { filename: "data", format: "python" },
        ),
      ).toThrow(ChacaError);
      expect(() =>
        chaca.transform(
          { fn: () => 1 },
          { filename: "data", format: "python" },
        ),
      ).toThrow(`You can not export a function into a python file.`);
    });

    it("skipInvalid = true. a function value should be omitted", () => {
      const [file] = chaca.transform(
        { fn: () => 1, a: 1 },
        { filename: "data", format: { ext: "python", skipInvalid: true } },
      );

      expect(file.content).toContain(`a: int`);
      expect(file.content).not.toContain(`fn`);
    });
  });

  describe("separate argument", () => {
    it("separate = true. should return one python file per schema", async () => {
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
        format: { ext: "python", separate: true },
      });

      expect(files.map((f) => f.filename)).toEqual(["users.py", "posts.py"]);

      expect(files[0].content).toContain(`class Users(TypedDict):`);
      expect(files[0].content).toContain(`data: List[Users] = [`);
      expect(files[1].content).toContain(`class Posts(TypedDict):`);
    });
  });

  describe("primitive values", () => {
    it.each([
      ["string", "foo", `data: str = "foo"\n`],
      ["int", 5, `data: int = 5\n`],
      ["float", 5.55, `data: float = 5.55\n`],
      ["boolean", true, `data: bool = True\n`],
      ["null", null, `data: None = None\n`],
    ])("%s. should return a typed declaration", (_, value, expected) => {
      const [file] = chaca.transform(value, {
        filename: "data",
        format: "python",
      });

      expect(file.content).toBe(expected);
    });
  });
});
