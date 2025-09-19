import { describe, expect, it } from "vitest";
import { chaca } from "../../../../src";

describe("ref.unique", () => {
  describe("with array field definition", () => {
    it("unique = true & isArray = 5. the array values should be unique", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
      });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true }),
          isArray: 5,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 10, schema: schema2 },
        ])
        .generate();

      for (let index = 0; index < data.schema2.length; index++) {
        const element = data.schema2[index];

        for (const v of element.ref) {
          expect(data.schema.map((s: { id: string }) => s.id)).include(v);
          expect(element.ref.filter((r: string) => r === v)).toHaveLength(1);

          for (const oelement of data.schema2) {
            if (oelement !== element) {
              expect(oelement.ref.filter((o: string) => o === v)).toHaveLength(
                0,
              );
            }
          }
        }
      }
    });
  });

  describe("ref own schema", () => {
    it("unique = true. all schema documents should be related and the first document ref value should be null", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: chaca.ref("schema.id", {
          unique: true,
        }),
      });

      const data = await chaca
        .dataset([{ name: "schema", documents: 30, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toBeNull();

      for (const s of data.schema.slice(1)) {
        const unique = data.schema.filter(
          (v: { id: string }) => v.id === s.ref,
        );

        expect(unique.length === 1).toBe(true);
      }
    });
  });
});
