import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("Sqlite", () => {
  it("array of objects. should enable foreign keys, create the table and insert one row per object", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto", admin: true, score: 5.5 },
        { id: 2, name: "Carolina", admin: false, score: 8.25 },
      ],
      { filename: "data", format: "sqlite" },
    );

    expect(file.filename).toBe("data.sql");
    expect(file.content).toBe(
      [
        `PRAGMA foreign_keys = ON;`,
        ``,
        `CREATE TABLE Schema (`,
        `   id_1 INTEGER PRIMARY KEY,`,
        `   id INTEGER NOT NULL,`,
        `   name TEXT NOT NULL,`,
        `   admin BOOLEAN NOT NULL,`,
        `   score REAL NOT NULL`,
        `);`,
        ``,
        `INSERT INTO Schema (id_1, id, name, admin, score)`,
        `VALUES`,
        `   (1, 1, 'Alberto', TRUE, 5.5),`,
        `   (2, 2, 'Carolina', FALSE, 8.25);`,
        ``,
        ``,
      ].join("\n"),
    );
  });

  it("nested objects. should create one table per object type linked by a foreign key", () => {
    const [file] = chaca.transform(
      [{ username: "ana", address: { city: "Madrid", zip: 28001 } }],
      { filename: "data", format: "sqlite" },
    );

    expect(file.content).toBe(
      [
        `PRAGMA foreign_keys = ON;`,
        ``,
        `CREATE TABLE Schema (`,
        `   id INTEGER PRIMARY KEY,`,
        `   username TEXT NOT NULL`,
        `);`,
        ``,
        `CREATE TABLE SchemaAddress (`,
        `   id INTEGER PRIMARY KEY,`,
        `   city TEXT NOT NULL,`,
        `   zip INTEGER NOT NULL,`,
        `   schema_id INTEGER NOT NULL REFERENCES Schema(id)`,
        `);`,
        ``,
        `INSERT INTO Schema (id, username)`,
        `VALUES`,
        `   (1, 'ana');`,
        ``,
        `INSERT INTO SchemaAddress (id, city, zip, schema_id)`,
        `VALUES`,
        `   (1, 'Madrid', 28001, 1);`,
        ``,
        ``,
      ].join("\n"),
    );
  });

  it("special values. null columns fall back to TEXT, dates become TEXT with the ISO value, bigints become INTEGER", () => {
    const [file] = chaca.transform(
      [
        {
          n: null,
          d: new Date("2020-01-01T00:00:00.000Z"),
          big: BigInt("9007199254740993"),
        },
      ],
      { filename: "data", format: "sqlite" },
    );

    expect(file.content).toContain(`n TEXT,`);
    expect(file.content).toContain(`d TEXT NOT NULL,`);
    expect(file.content).toContain(`big INTEGER NOT NULL`);
    expect(file.content).toContain(
      `(1, NULL, '2020-01-01T00:00:00.000Z', 9007199254740993)`,
    );
  });

  it("float special values. Infinity uses the 9e999 literal and NaN is stored as the string 'NaN'", () => {
    const [file] = chaca.transform([{ a: NaN, b: Infinity, c: -Infinity }], {
      filename: "data",
      format: "sqlite",
    });

    expect(file.content).toContain(`a REAL NOT NULL,`);
    expect(file.content).toContain(`'NaN'`);
    expect(file.content).toContain(`9e999`);
    expect(file.content).toContain(`-9e999`);
  });

  it("string values. should escape single quotes by doubling them", () => {
    const [file] = chaca.transform([{ v: `l'agua "doble"` }], {
      filename: "data",
      format: "sqlite",
    });

    expect(file.content).toContain(`'l''agua "doble"'`);
  });

  it("columns named like sql reserved words. should be double quoted", () => {
    const [file] = chaca.transform([{ select: 1, user: 2 }], {
      filename: "data",
      format: "sqlite",
    });

    expect(file.content).toContain(`"select" INTEGER NOT NULL,`);
    expect(file.content).toContain(`"user" INTEGER NOT NULL`);
    expect(file.content).toContain(`INSERT INTO Schema (id, "select", "user")`);
  });

  describe("format arguments", () => {
    it("keys = ['id']. should use the column as primary key without adding a serial id", () => {
      const [file] = chaca.transform([{ id: 1, code: "x" }], {
        filename: "data",
        format: { ext: "sqlite", keys: ["id"] },
      });

      expect(file.content).toContain(`id INTEGER PRIMARY KEY,`);
      expect(file.content).not.toContain(`id_1`);
    });

    it("uniques = ['code']. should mark the column as UNIQUE", () => {
      const [file] = chaca.transform([{ id: 1, code: "x" }], {
        filename: "data",
        format: { ext: "sqlite", uniques: ["code"] },
      });

      expect(file.content).toContain(`code TEXT UNIQUE NOT NULL`);
    });

    it("declarationOnly = true. should generate only the create statements", () => {
      const [file] = chaca.transform([{ id: 1 }], {
        filename: "data",
        format: { ext: "sqlite", declarationOnly: true },
      });

      expect(file.content).toContain(`CREATE TABLE Schema (`);
      expect(file.content).not.toContain(`INSERT INTO`);
    });
  });

  describe("invalid inputs", () => {
    it("a function value. should throw an error", () => {
      expect(() =>
        chaca.transform([{ fn: () => 1 }], {
          filename: "data",
          format: "sqlite",
        }),
      ).toThrow(ChacaError);
    });

    it("a primitive. should throw an error", () => {
      expect(() =>
        chaca.transform("foo", { filename: "data", format: "sqlite" }),
      ).toThrow(ChacaError);
    });
  });
});
