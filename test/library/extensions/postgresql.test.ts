import { describe, expect, it } from "vitest";
import { chaca, ChacaError, modules } from "../../../src";
import { SIMPLE_ARRAY } from "./core/simple-array";
import { SIMPLE_OBJECT } from "./core/simple-object";

describe("Postgresql", () => {
  it("array of objects. should create the table and insert one row per object", () => {
    const [file] = chaca.transform(
      [
        { id: 1, name: "Alberto", admin: true, score: 5.5 },
        { id: 2, name: "Carolina", admin: false, score: 8.25 },
      ],
      { filename: "data", format: "postgresql" },
    );

    expect(file.filename).toBe("data.sql");
    expect(file.content).toBe(
      [
        `CREATE TABLE Schema (`,
        `   id_1 SERIAL PRIMARY KEY,`,
        `   id INTEGER NOT NULL,`,
        `   name VARCHAR(255) NOT NULL,`,
        `   admin BOOLEAN NOT NULL,`,
        `   score FLOAT NOT NULL`,
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
      { filename: "data", format: "postgresql" },
    );

    expect(file.content).toBe(
      [
        `CREATE TABLE Schema (`,
        `   id SERIAL PRIMARY KEY,`,
        `   username VARCHAR(255) NOT NULL`,
        `);`,
        ``,
        `CREATE TABLE SchemaAddress (`,
        `   id SERIAL PRIMARY KEY,`,
        `   city VARCHAR(255) NOT NULL,`,
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

  it("array fields. should create a child table with one row per element", () => {
    const [file] = chaca.transform([{ id: 1, tags: ["a", "b"] }], {
      filename: "data",
      format: "postgresql",
    });

    expect(file.content).toContain(`CREATE TABLE SchemaTags (`);
    expect(file.content).toContain(
      `schema_id INTEGER NOT NULL REFERENCES Schema(id_1)`,
    );
    expect(file.content).toContain(`(1, 'a', 1),`);
    expect(file.content).toContain(`(2, 'b', 1);`);
  });

  it("special values. null columns fall back to TEXT, dates become TIMESTAMP, bigints become BIGINT", () => {
    const [file] = chaca.transform(
      [{ n: null, d: new Date("2020-01-01T00:00:00.000Z"), big: BigInt(100) }],
      { filename: "data", format: "postgresql" },
    );

    expect(file.content).toContain(`n TEXT,`);
    expect(file.content).toContain(`d TIMESTAMP NOT NULL,`);
    expect(file.content).toContain(`big BIGINT NOT NULL`);
    expect(file.content).toContain(
      `(1, NULL, '2020-01-01T00:00:00.000Z', 100)`,
    );
  });

  it("float special values. should use postgres string literals", () => {
    const [file] = chaca.transform([{ a: NaN, b: Infinity, c: 1.5 }], {
      filename: "data",
      format: "postgresql",
    });

    expect(file.content).toContain(`'NaN'`);
    expect(file.content).toContain(`'+infinity'`);
    expect(file.content).toContain(`1.5`);
  });

  it("string values. should escape single quotes by doubling them", () => {
    const [file] = chaca.transform([{ v: `l'agua "doble"` }], {
      filename: "data",
      format: "postgresql",
    });

    expect(file.content).toContain(`'l''agua "doble"'`);
  });

  it("columns named like sql reserved words. should be double quoted", () => {
    const [file] = chaca.transform([{ select: 1, table: 2, user: 3 }], {
      filename: "data",
      format: "postgresql",
    });

    expect(file.content).toContain(`"select" INTEGER NOT NULL,`);
    expect(file.content).toContain(`"table" INTEGER NOT NULL,`);
    expect(file.content).toContain(`"user" INTEGER NOT NULL`);
    expect(file.content).toContain(
      `INSERT INTO Schema (id, "select", "table", "user")`,
    );
  });

  describe("invalid inputs", () => {
    it("a function value. should throw an error", () => {
      expect(() =>
        chaca.transform([{ fn: () => 1 }], {
          filename: "data",
          format: "postgresql",
        }),
      ).toThrow(`You can not export a function into a sql file.`);
    });

    it("mixed types across documents. should throw a descriptive error", () => {
      expect(() =>
        chaca.transform([{ v: 1 }, { v: "x" }], {
          filename: "data",
          format: "postgresql",
        }),
      ).toThrow(
        `The values for column 'Schema.v' exist as values of type string and number. The data must be uniform`,
      );
    });

    it.each([
      ["simple object", SIMPLE_OBJECT],
      ["mixed array", SIMPLE_ARRAY],
      ["string", "foo"],
      ["int", 5],
      ["null", null],
      ["undefined", undefined],
    ])("%s. should throw an error", (_, value) => {
      expect(() =>
        chaca.transform(value, { filename: "data", format: "postgresql" }),
      ).toThrow(ChacaError);
    });
  });

  describe("columns config", async () => {
    const schema = chaca.schema({
      id: chaca.sequence(),
      username: () => modules.internet.username(),
    });

    const data = await schema.array(10);

    describe("keys config", () => {
      it("with nested schema keys = ['id']. should throw an error", async () => {
        const schema = chaca.schema({
          id: chaca.sequence(),
          object: chaca.schema({
            object_id: chaca.sequence(),
            ref: chaca.sequence(),
          }),
        });

        const result = chaca.transform(await schema.array(10), {
          filename: "schema",
          format: { ext: "postgresql", declarationOnly: true, keys: ["id"] },
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).include(
          "schema_id INTEGER NOT NULL REFERENCES Schema(id)",
        );
      });

      it("keys = ['id']", () => {
        const result = chaca.transform(data, {
          format: {
            ext: "postgresql",
            keys: ["id"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).include("id INTEGER PRIMARY KEY");
      });

      it("keys: []. should define an serial id for the table", () => {
        const result = chaca.transform(data, {
          format: {
            ext: "postgresql",
            keys: [],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).include("id_1 SERIAL PRIMARY KEY");
      });
    });

    describe("nulls config", () => {
      it("nulls = ['username']", () => {
        const result = chaca.transform(data, {
          format: {
            ext: "postgresql",
            keys: ["id"],
            nulls: ["username"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).not.include("username VARCHAR(255) NOT NULL");
      });
    });

    describe("uniques config", () => {
      it("uniques = ['username']", () => {
        const result = chaca.transform(data, {
          format: {
            ext: "postgresql",
            keys: ["id"],
            uniques: ["username"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).include("username VARCHAR(255) UNIQUE");
      });
    });

    describe("refs config", () => {
      it("create reference from object.ref to id", async () => {
        const schema = chaca.schema({
          id: chaca.sequence(),
          object: chaca.schema({
            object_id: chaca.sequence(),
            ref: chaca.sequence(),
          }),
        });

        const result = chaca.transform(await schema.array(10), {
          format: {
            ext: "postgresql",
            keys: ["id", "object.object_id"],
            refs: [{ column: "object.object_id", ref: "id" }],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema.sql");
        expect(result[0].content).include(
          "object_id INTEGER PRIMARY KEY REFERENCES Schema(id)",
        );
      });
    });
  });
});
