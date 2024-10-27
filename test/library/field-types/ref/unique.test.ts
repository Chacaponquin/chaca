import { describe, expect, it } from "vitest";
import { chaca } from "../../../../src";

describe("ref.unique", () => {
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
