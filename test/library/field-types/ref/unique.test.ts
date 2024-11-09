import { describe, expect, it } from "vitest";
import { chaca } from "../../../../src";

describe("ref.unique", () => {
  describe("with array field definition", () => {
    it("unique = true & isArray = 5. the array values should be unique", () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true }),
          isArray: 5,
        },
      });

      const data = chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 10, schema: schema2 },
        ])
        .generate();

      for (let index = 0; index < data.schema2.length; index++) {
        const element = data.schema2[index];

        for (const v of element.ref) {
          expect(data.schema.map((s) => s.id)).include(v);
          expect(element.ref.filter((r) => r === v)).toHaveLength(1);

          for (const oelement of data.schema2) {
            if (oelement !== element) {
              expect(oelement.ref.filter((o) => o === v)).toHaveLength(0);
            }
          }
        }
      }
    });
  });

  describe("ref own schema", () => {
    it("unique = true. all schema documents should be related and the first document ref value should be null", () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: chaca.ref("schema.id", {
          unique: true,
        }),
      });

      const data = chaca
        .dataset([{ name: "schema", documents: 30, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toBeNull();

      for (const s of data.schema.slice(1)) {
        const unique = data.schema.filter((v) => v.id === s.ref).length === 1;

        expect(unique).toBe(true);
      }
    });
  });
});
