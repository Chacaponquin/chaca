import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";
import { ARRAY_OBJECTS } from "./core/array-objects";
import { MATRIX } from "./core/matrix";
import { SIMPLE_ARRAY } from "./core/simple-array";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Csv", () => {
  describe("array of objects", () => {
    it("uniform objects. should return one file with headers and one row per object", () => {
      const [file] = chaca.transform(
        [
          { id: 1, name: "Alberto", admin: true },
          { id: 2, name: "Carolina", admin: false },
        ],
        { filename: "data", format: "csv" },
      );

      expect(file.filename).toBe("data.csv");
      expect(file.content).toBe(
        ["id,name,admin", "1,Alberto,true", "2,Carolina,false"].join("\n"),
      );
    });

    it("objects with nested objects and different keys. should unwind nested fields into dotted columns", () => {
      const [file] = chaca.transform(ARRAY_OBJECTS, {
        filename: "data",
        format: "csv",
      });

      expect(file.content).toBe(
        [
          `name,age,address.street,address.city,address.country,department,salary,jobTitle,yearsOfService,email,phoneNumber,loyaltyProgramStatus,purchaseHistory`,
          `John Doe,35,123 Main St,New York,USA,IT,75000,Senior Developer,5,,,,`,
          `Jane Smith,28,456 Elm St,Los Angeles,USA,,,,,jane.smith@email.com,555-123-4567,Gold,"[{""date"":""2023-01-15T00:00:00.000Z"",""amount"":100.99,""items"":[""Laptop"",""Mouse""]},{""date"":""2023-03-22T00:00:00.000Z"",""amount"":50.75,""items"":[""Printer"",""Ink Cartridges""]}]"`,
          `Bob Johnson,42,789 Oak Ave,Chicago,USA,Sales,65000,Account Manager,8,,,,`,
          `Alice Brown,32,901 Maple St,Houston,USA,,,,,alice.brown@email.com,555-987-6543,Silver,"[{""date"":""2023-02-10T00:00:00.000Z"",""amount"":200.5,""items"":[""Tablet"",""Keyboard""]}]"`,
        ].join("\n"),
      );
    });
  });

  describe("matrix", () => {
    it("should use the column indexes as headers and one row per inner array", () => {
      const [file] = chaca.transform(MATRIX, {
        filename: "data",
        format: "csv",
      });

      expect(file.content).toBe(
        [
          "0,1,2,3,4,5,6,7,8,9,10,11,12,13",
          "14,73,28,41,19,85,32,46,67,51,24,98,11,76",
          "82,39,65,21,48,13,90,56,29,74,38,62,49,17",
          "31,58,44,69,26,81,35,92,15,53,88,42,70,59",
          "68,23,95,50,84,36,61,27,89,43,72,16,79,34",
          "52,87,64,22,75,47,93,55,80,33,66,94,18,60",
          "45,71,86,54,63,77,40,97,83,25,91,37,96,12",
        ].join("\n"),
      );
    });
  });

  it("empty array. should return an empty csv", () => {
    const [file] = chaca.transform([], { filename: "data", format: "csv" });

    expect(file.content).toBe("\n");
  });

  describe("format arguments", () => {
    const ROWS = [
      { id: 1, name: "  Alberto  ", meta: { city: "Madrid" } },
      { id: 2, name: "  Carolina  ", meta: { city: "Habana" } },
    ];

    it("delimiter.field = ';'. should separate fields with ';'", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", delimiter: { field: ";" } },
      });

      expect(file.content).toBe(
        [
          `id;name;meta.city`,
          `1;  Alberto  ;Madrid`,
          `2;  Carolina  ;Habana`,
        ].join("\n"),
      );
    });

    it("delimiter.eol = '\\r\\n'. should separate rows with '\\r\\n'", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", delimiter: { eol: "\r\n" } },
      });

      expect(file.content).toBe(
        [
          `id,name,meta.city`,
          `1,  Alberto  ,Madrid`,
          `2,  Carolina  ,Habana`,
        ].join("\r\n"),
      );
    });

    it("delimiter.wrap = single quote. should wrap values that contain the field delimiter", () => {
      const [file] = chaca.transform([{ note: "a,b" }], {
        filename: "data",
        format: { ext: "csv", delimiter: { wrap: "'" } },
      });

      expect(file.content).toBe(`note\n'a,b'`);
    });

    it("trim.field = true. should trim field values", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", trim: { field: true } },
      });

      expect(file.content).toBe(
        [`id,name,meta.city`, `1,Alberto,Madrid`, `2,Carolina,Habana`].join(
          "\n",
        ),
      );
    });

    it("trim.header = true. should trim header names", () => {
      const [file] = chaca.transform([{ " name ": 1 }], {
        filename: "data",
        format: { ext: "csv", trim: { header: true } },
      });

      expect(file.content).toBe(`name\n1`);
    });

    it("excludeKeys. should omit the excluded columns", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", excludeKeys: ["meta.city"] },
      });

      expect(file.content).toBe(
        [`id,name`, `1,  Alberto  `, `2,  Carolina  `].join("\n"),
      );
    });

    it("keys. should only include the given fields with their custom titles", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", keys: [{ field: "id", title: "ID" }] },
      });

      expect(file.content).toBe(`ID\n1\n2`);
    });

    it("sortHeader = true. should sort the columns alphabetically", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", sortHeader: true },
      });

      expect(file.content).toBe(
        [
          `id,meta.city,name`,
          `1,Madrid,  Alberto  `,
          `2,Habana,  Carolina  `,
        ].join("\n"),
      );
    });

    it("parseValue. should use the custom value parser", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: {
          ext: "csv",
          parseValue: (v, def) => (typeof v === "number" ? `N${v}` : def(v)),
        },
      });

      expect(file.content).toBe(
        [
          `id,name,meta.city`,
          `N1,  Alberto  ,Madrid`,
          `N2,  Carolina  ,Habana`,
        ].join("\n"),
      );
    });

    it("unwindArrays = true. should create one row per array element", () => {
      const [file] = chaca.transform([{ id: 1, tags: ["a", "b"] }], {
        filename: "data",
        format: { ext: "csv", unwindArrays: true },
      });

      expect(file.content).toBe([`id,tags`, `1,a`, `1,b`].join("\n"));
    });

    it("expandArrayObjects = true. should expand objects inside arrays into columns", () => {
      const [file] = chaca.transform([{ id: 1, items: [{ sku: "x" }] }], {
        filename: "data",
        format: { ext: "csv", expandArrayObjects: true },
      });

      expect(file.content).toBe([`id,items.sku`, `1,x`].join("\n"));
    });

    it("expandNestedObjects = false. should serialize nested objects as json strings", () => {
      const [file] = chaca.transform(ROWS, {
        filename: "data",
        format: { ext: "csv", expandNestedObjects: false },
      });

      expect(file.content).toBe(
        [
          `id,name,meta`,
          `1,  Alberto  ,"{""city"":""Madrid""}"`,
          `2,  Carolina  ,"{""city"":""Habana""}"`,
        ].join("\n"),
      );
    });
  });

  describe("invalid inputs", () => {
    it.each([
      ["simple object", SIMPLE_OBJECT],
      ["mixed array", SIMPLE_ARRAY],
      ["string", "foo"],
      ["int", 5],
      ["float", 5.55],
      ["boolean", true],
      ["date", new Date()],
      ["null", null],
      ["undefined", undefined],
      ["NaN", NaN],
      ["bigint", BigInt(99999)],
    ])("%s. should throw an error", (_, value) => {
      expect(() =>
        chaca.transform(value, { filename: "data", format: "csv" }),
      ).toThrow(ChacaError);
      expect(() =>
        chaca.transform(value, { filename: "data", format: "csv" }),
      ).toThrow(
        `In the case of the 'csv' format, only an array of objects can be exported.`,
      );
    });
  });
});
