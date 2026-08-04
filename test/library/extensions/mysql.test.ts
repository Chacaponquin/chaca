import { describe, expect, it } from "vitest";
import { chaca, ChacaError } from "../../../src";

describe("Mysql", () => {
  it("array of objects. should create the table and insert one row per object", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto", admin: true, score: 5.5 },
        { id: 2, name: "Carolina", admin: false, score: 8.25 },
      ],
      { filename: "data", format: "mysql" },
    );

    expect(file.filename).toBe("data.sql");
    expect(file.content).toBe(
      [
        "CREATE TABLE `Schema` (",
        `   id_1 INT AUTO_INCREMENT PRIMARY KEY,`,
        `   id INTEGER NOT NULL,`,
        `   name VARCHAR(255) NOT NULL,`,
        `   admin BOOLEAN NOT NULL,`,
        `   score DOUBLE NOT NULL`,
        `);`,
        ``,
        "INSERT INTO `Schema` (id_1, id, name, admin, score)",
        `VALUES`,
        `   (1, 1, 'Alberto', TRUE, 5.5),`,
        `   (2, 2, 'Carolina', FALSE, 8.25);`,
        ``,
        ``,
      ].join("\n"),
    );
  });

  it("nested objects. should declare the foreign key as a table-level constraint", () => {
    const [file] = chaca.transform(
      [{ username: "ana", address: { city: "Madrid", zip: 28001 } }],
      { filename: "data", format: "mysql" },
    );

    expect(file.content).toBe(
      [
        "CREATE TABLE `Schema` (",
        `   id INT AUTO_INCREMENT PRIMARY KEY,`,
        `   username VARCHAR(255) NOT NULL`,
        `);`,
        ``,
        `CREATE TABLE SchemaAddress (`,
        `   id INT AUTO_INCREMENT PRIMARY KEY,`,
        `   city VARCHAR(255) NOT NULL,`,
        `   zip INTEGER NOT NULL,`,
        `   schema_id INTEGER NOT NULL,`,
        "   FOREIGN KEY (schema_id) REFERENCES `Schema`(id)",
        `);`,
        ``,
        "INSERT INTO `Schema` (id, username)",
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

  it("special values. null columns fall back to TEXT, dates become DATETIME(3) without the zulu marker, bigints become BIGINT", () => {
    const [file] = chaca.transform(
      [
        {
          n: null,
          d: new Date("2020-01-01T00:00:00.000Z"),
          big: BigInt("9007199254740993"),
        },
      ],
      { filename: "data", format: "mysql" },
    );

    expect(file.content).toContain(`n TEXT,`);
    expect(file.content).toContain(`d DATETIME(3) NOT NULL,`);
    expect(file.content).toContain(`big BIGINT NOT NULL`);
    expect(file.content).toContain(
      `(1, NULL, '2020-01-01T00:00:00.000', 9007199254740993)`,
    );
  });

  it("float special values. infinities are clamped to the DOUBLE range and NaN falls back to NULL", () => {
    const [file] = chaca.transform([{ a: NaN, b: Infinity, c: -Infinity }], {
      filename: "data",
      format: { ext: "mysql", nulls: ["a"] },
    });

    expect(file.content).toContain(`a DOUBLE,`);
    expect(file.content).toContain(
      `(1, NULL, 1.7976931348623157e+308, -1.7976931348623157e+308)`,
    );
  });

  it("string values. should double single quotes and escape backslashes", () => {
    const [file] = chaca.transform([{ v: `l'agua "doble" C:\\temp` }], {
      filename: "data",
      format: "mysql",
    });

    expect(file.content).toContain(`'l''agua "doble" C:\\\\temp'`);
  });

  it("names matching mysql reserved words. should be quoted with backticks", () => {
    const [file] = chaca.transform([{ select: 1, user: 2, order: 3 }], {
      filename: "data",
      format: "mysql",
    });

    // 'user' is not a reserved word in mysql, so it stays unquoted
    expect(file.content).toContain(
      "   `select` INTEGER NOT NULL,\n   user INTEGER NOT NULL,\n   `order` INTEGER NOT NULL",
    );
    expect(file.content).toContain(
      "INSERT INTO `Schema` (id, `select`, user, `order`)",
    );
  });

  describe("format arguments", () => {
    it("keys = ['id']. should use the column as primary key without adding a serial id", () => {
      const [file] = chaca.transform([{ id: 1, code: "x" }], {
        filename: "data",
        format: { ext: "mysql", keys: ["id"] },
      });

      expect(file.content).toContain(`id INTEGER PRIMARY KEY,`);
      expect(file.content).not.toContain(`id_1`);
    });

    it("uniques = ['code']. should mark the column as UNIQUE", () => {
      const [file] = chaca.transform([{ id: 1, code: "x" }], {
        filename: "data",
        format: { ext: "mysql", uniques: ["code"] },
      });

      expect(file.content).toContain(`code VARCHAR(255) UNIQUE NOT NULL`);
    });

    it("declarationOnly = true. should generate only the create statements", () => {
      const [file] = chaca.transform([{ id: 1 }], {
        filename: "data",
        format: { ext: "mysql", declarationOnly: true },
      });

      expect(file.content).toContain("CREATE TABLE `Schema` (");
      expect(file.content).not.toContain(`INSERT INTO`);
    });
  });

  describe("invalid inputs", () => {
    it("a function value. should throw an error", () => {
      expect(() =>
        chaca.transform([{ fn: () => 1 }], {
          filename: "data",
          format: "mysql",
        }),
      ).toThrow(ChacaError);
    });

    it("a primitive. should throw an error", () => {
      expect(() =>
        chaca.transform("foo", { filename: "data", format: "mysql" }),
      ).toThrow(ChacaError);
    });
  });
});
