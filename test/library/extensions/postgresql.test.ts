import { describe, expect, it } from "vitest";
import { ExtensionTester } from "./core/tester";
import { chaca, modules } from "../../../src";

const tester = new ExtensionTester("postgresql");

describe("Postgresql", () => {
  tester.execute({
    arrays: { matrix: true, simple: true },
    object: { simple: true },
    primitives: {
      bigint: true,
      boolean: true,
      date: true,
      float: true,
      int: true,
      nan: true,
      null: true,
      string: true,
      undefined: true,
    },
  });

  describe("columns config", () => {
    const schema = chaca.schema({
      id: chaca.sequence(),
      username: () => modules.internet.username(),
    });

    describe("keys config", () => {
      it("with nested schema keys = ['id']. should throw an error", () => {
        const schema = chaca.schema({
          id: chaca.sequence(),
          object: chaca.schema({
            object_id: chaca.sequence(),
            ref: chaca.sequence(),
          }),
        });

        expect(() => {
          chaca.transform(schema.array(10), {
            filename: "schema",
            format: { ext: "postgresql", declarationOnly: true, keys: ["id"] },
          });
        });
      });

      it("keys = ['id']", () => {
        const result = chaca.transform(schema.array(10), {
          format: {
            ext: "postgresql",
            keys: ["id"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema");
        expect(result[0].content).include("id INTEGER PRIMARY KEY");
      });

      it("keys: []. should define an serial id for the table", () => {
        const result = chaca.transform(schema.array(10), {
          format: {
            ext: "postgresql",
            keys: [],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema");
        expect(result[0].content).include("id SERIAL PRIMARY KEY");
      });
    });

    describe("nulls config", () => {
      it("nulls = ['username']", () => {
        const result = chaca.transform(schema.array(10), {
          format: {
            ext: "postgresql",
            keys: ["id"],
            nulls: ["username"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema");
        expect(result[0].content).not.include("username VARCHAR(255) NOT NULL");
      });
    });

    describe("uniques config", () => {
      it("uniques = ['username']", () => {
        const result = chaca.transform(schema.array(10), {
          format: {
            ext: "postgresql",
            keys: ["id"],
            uniques: ["username"],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema");
        expect(result[0].content).include("username VARCHAR(255) UNIQUE");
      });
    });

    describe("refs config", () => {
      it("create reference from object.ref to id", () => {
        const schema = chaca.schema({
          id: chaca.sequence(),
          object: chaca.schema({
            object_id: chaca.sequence(),
            ref: chaca.sequence(),
          }),
        });

        const result = chaca.transform(schema.array(10), {
          format: {
            ext: "postgresql",
            keys: ["id", "object.object_id"],
            refs: [{ column: "object.object_id", ref: "id" }],
            declarationOnly: true,
          },
          filename: "schema",
        });

        expect(result).toHaveLength(1);
        expect(result[0].filename).toBe("schema");
        expect(result[0].content).include(
          "object_id INTEGER PRIMARY KEY REFERENCES Schema(id)",
        );
      });
    });
  });
});
