import { ChacaError, chaca, modules } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Key field", () => {
  describe("valid inner types", () => {
    it("key with a sequence field. should return sequential values starting at 1", async () => {
      const result = await chaca
        .schema({ id: chaca.key(chaca.sequence()) })
        .array(50);

      expect(result).toHaveLength(50);

      result.forEach((doc, index) => {
        expect(doc.id).toBe(index + 1);
      });
    });

    it("key with a custom function. should use the returned value on every document", async () => {
      const result = await chaca
        .schema({ id: chaca.key(() => modules.id.uuid()) })
        .array(50);

      const ids = result.map((d) => d.id);

      for (const id of ids) {
        expect(typeof id).toBe("string");
      }

      // uuid values must be unique across all documents
      expect(new Set(ids).size).toBe(50);
    });
  });

  describe("invalid inner type", () => {
    it("key with a non-field argument. should throw an error", () => {
      expect(() =>
        chaca.schema({ id: chaca.key("invalid" as any) }).array(10),
      ).toThrow(ChacaError);
    });
  });

  describe("invalid data", () => {
    it("return null. should throw an error", async () => {
      await expect(
        chaca.schema({ key: chaca.key(() => null) }).array(50),
      ).rejects.toThrow(ChacaError);
    });

    it("return undefined. should throw an error", async () => {
      await expect(
        chaca.schema({ key: chaca.key(() => undefined) }).array(50),
      ).rejects.toThrow(ChacaError);
    });
  });

  describe("define isArray", () => {
    it("define an array key field. should throw an error", async () => {
      await expect(
        chaca
          .schema({
            key: { type: chaca.key(chaca.sequence()), isArray: 20 },
          })
          .array(50),
      ).rejects.toThrow(ChacaError);
    });
  });

  describe("define possibleNull", () => {
    it("possibleNull = 0.1. should throw an error", async () => {
      await expect(
        chaca
          .schema({
            test: { type: chaca.key(chaca.sequence()), possibleNull: 0.1 },
          })
          .array(50),
      ).rejects.toThrow(ChacaError);
    });

    it("possibleNull = 0. should not throw an error", async () => {
      const result = await chaca
        .schema({
          test: { type: chaca.key(chaca.sequence()), possibleNull: 0 },
        })
        .array(50);

      expect(result).toHaveLength(50);

      result.forEach((doc, index) => {
        expect(doc.test).toBe(index + 1);
      });
    });
  });
});
