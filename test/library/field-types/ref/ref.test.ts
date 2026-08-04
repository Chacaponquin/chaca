import {
  chaca,
  CyclicAccessDataError,
  modules,
  NotEnoughValuesForRefError,
  NotExistRefFieldError,
  TryRefANoKeyFieldError,
} from "../../../../src";
import { describe, expect, it } from "vitest";

describe("Ref field", () => {
  it("try ref a no key field. should throw an error", async () => {
    const schema = chaca.schema({
      name: () => modules.internet.username(),
    });

    const schema2 = chaca.schema({ ref: chaca.ref("schema.name") });

    const dataset = chaca.dataset([
      { name: "schema", schema: schema, documents: 10 },
      { name: "schema2", documents: 10, schema: schema2 },
    ]);

    // generate() may throw synchronously (ref resolution happens in the
    // DatasetResolver constructor), so wrap the call in an async function
    await expect(async () => await dataset.generate()).rejects.toThrow(
      TryRefANoKeyFieldError,
    );
  });

  describe("ref a nested schema", () => {
    it("from schema.ref reference schema2.object.id. all schema.ref values should reference one schema2.object.id value", async () => {
      const schema = chaca.schema({
        object: chaca.schema({ id: chaca.key(chaca.sequence()) }),
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.object.id") });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 50, schema: schema },
          { name: "schema2", documents: 50, schema: schema2 },
        ])
        .generate();

      for (const v of data.schema2) {
        expect(
          data.schema.map((s: { object: { id: string } }) => s.object.id),
        ).include(v.ref);
      }
    });
  });

  it("create a correct ref field", async () => {
    const schema = chaca.schema({
      id: chaca.key(() => modules.id.uuid()),
    });

    const schema2 = chaca.schema({ ref: chaca.ref("schema.id") });

    const data = await chaca
      .dataset([
        { name: "schema", documents: 30, schema: schema },
        { name: "schema2", documents: 30, schema: schema2 },
      ])
      .generate();

    for (const s2 of data.schema2) {
      const values = data.schema.map((s: { id: string }) => s.id);

      expect(values).include(s2.ref);
    }
  });

  describe("ref own schema", () => {
    it("ref own schema inside a dataset. should return first ref with null value, and rest correct", async () => {
      const schema = chaca.schema({
        id: chaca.key(chaca.sequence()),
        ref: chaca.ref("schema.id"),
      });

      const data = await chaca
        .dataset([{ name: "schema", documents: 50, schema: schema }])
        .generate();

      expect(data.schema[0].ref).toBeNull();
      expect(data.schema[1].ref).toBe(data.schema[0].id);

      for (const v of data.schema.slice(2)) {
        expect(
          data.schema
            .filter((s: { id: string }) => s.id !== v.id)
            .map((s: { id: string }) => s.id),
        ).include(v.ref);
      }
    });
  });

  it("try ref an empty string. should throw an error", async () => {
    const schema = chaca.schema({});

    const schema2 = chaca.schema({ ref: chaca.ref("") });

    const dataset = chaca.dataset([
      { name: "schema", documents: 10, schema: schema },
      { name: "schema2", documents: 10, schema: schema2 },
    ]);

    await expect(async () => await dataset.generate()).rejects.toThrow(
      NotExistRefFieldError,
    );
  });

  it("try ref a not existing field. should throw an error", async () => {
    const dataset1 = chaca.schema({
      id: chaca.key(() => modules.id.uuid()),
    });

    const dataset2 = chaca.schema({ id: chaca.ref("Dataset1.customId") });

    const dataset = chaca.dataset([
      { name: "Dataset1", documents: 30, schema: dataset1 },
      { name: "Dataset2", documents: 30, schema: dataset2 },
    ]);

    await expect(async () => await dataset.generate()).rejects.toThrow(
      NotExistRefFieldError,
    );
  });

  describe("ref a nested schema key field", () => {
    it("from schema.ref reference schema2.object.id", async () => {
      const schema = chaca.schema({
        object: chaca.schema({
          id: chaca.key(() => modules.id.ulid()),
        }),
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.object.id") });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      const result = await dataset.generate();

      for (const v of result.schema2.map((s: { ref: string }) => s.ref)) {
        expect(
          result.schema.map((s: { object: { id: string } }) => s.object.id),
        ).include(v);
      }
    });

    it("try ref an nested schema array field. should throw an error", async () => {
      const schema = chaca.schema({
        array: {
          type: chaca.schema({
            id: chaca.key(() => modules.id.ulid()),
          }),
          isArray: 20,
        },
      });

      const schema2 = chaca.schema({ ref: chaca.ref("schema.array.id") });

      const dataset = chaca.dataset([
        { name: "schema", documents: 10, schema: schema },
        { name: "schema2", documents: 10, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(NotExistRefFieldError);
    });
  });

  describe("cyclic ref between two schemas", () => {
    it("schema a refs schema b, and schema b refs schema a. should throw CyclicAccessDataError", async () => {
      const a = chaca.schema({
        id: chaca.key(chaca.sequence()),
        b: chaca.ref("b.id"),
      });

      const b = chaca.schema({
        id: chaca.key(chaca.sequence()),
        a: chaca.ref("a.id"),
      });

      const dataset = chaca.dataset([
        { name: "a", documents: 5, schema: a },
        { name: "b", documents: 5, schema: b },
      ]);

      await expect(async () => await dataset.generate()).rejects.toThrow(
        CyclicAccessDataError,
      );
    });
  });

  describe("ref an empty referenced schema", () => {
    it("referenced schema has 0 documents. should throw NotEnoughValuesForRefError", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });
      const schema2 = chaca.schema({ ref: chaca.ref("schema.id") });

      const dataset = chaca.dataset([
        { name: "schema", documents: 0, schema: schema },
        { name: "schema2", documents: 3, schema: schema2 },
      ]);

      await expect(dataset.generate()).rejects.toThrow(
        NotEnoughValuesForRefError,
      );
    });
  });

  describe("isArray defined as a min/max range", () => {
    it("should return an array whose length is within the range", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id"),
          isArray: { min: 10, max: 30 },
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 100, schema: schema },
          { name: "schema2", documents: 20, schema: schema2 },
        ])
        .generate();

      const keys = data.schema.map((s: { id: number }) => s.id);

      for (const s2 of data.schema2) {
        const refs = s2.ref as number[];

        expect(refs.length).toBeGreaterThanOrEqual(10);
        expect(refs.length).toBeLessThanOrEqual(30);

        for (const r of refs) {
          expect(keys).include(r);
        }
      }
    });

    it("range exceeds the available values with nullOnEmpty = true. should cap the array at the values that were taken", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id", { unique: true, nullOnEmpty: true }),
          isArray: { min: 10, max: 30 },
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 7, schema: schema },
          { name: "schema2", documents: 3, schema: schema2 },
        ])
        .generate();

      const lengths = data.schema2.map((s: { ref: unknown[] }) => s.ref.length);

      // only the 7 keys exist in total, and unique = true, so no document
      // can end up with more than 7 elements even though the range asks for
      // at least 10
      for (const l of lengths) {
        expect(l).toBeLessThanOrEqual(7);
      }

      expect(lengths.reduce((a: number, b: number) => a + b, 0)).toBe(7);
    });
  });

  describe("ref array with possibleNull on the elements", () => {
    it("possibleNull as an integer count. no element inside the array should be null", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id"),
          isArray: 10,
          possibleNull: 5,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 100, schema: schema },
          { name: "schema2", documents: 20, schema: schema2 },
        ])
        .generate();

      const refs = data.schema2.map((s: { ref: unknown }) => s.ref);

      // possibleNull decides whether the whole field is null or an array,
      // it is not re-evaluated per array element
      expect(refs.filter((r: unknown) => r === null)).toHaveLength(5);

      const arrays = refs.filter((r: unknown) =>
        Array.isArray(r),
      ) as unknown[][];
      expect(arrays).toHaveLength(15);

      for (const arr of arrays) {
        expect(arr).toHaveLength(10);
        expect(arr.every((v) => v !== null)).toBe(true);
      }
    });

    it("possibleNull as a float probability. the field is either null or a full array, with no null inside", async () => {
      const schema = chaca.schema({ id: chaca.key(chaca.sequence()) });

      const schema2 = chaca.schema({
        ref: {
          type: chaca.ref("schema.id"),
          isArray: 10,
          possibleNull: 0.5,
        },
      });

      const data = await chaca
        .dataset([
          { name: "schema", documents: 100, schema: schema },
          { name: "schema2", documents: 100, schema: schema2 },
        ])
        .generate();

      const refs = data.schema2.map((s: { ref: unknown }) => s.ref);

      let nullFields = 0;
      let arrays = 0;

      for (const r of refs) {
        if (r === null) {
          nullFields++;
        } else {
          arrays++;

          expect(r).toHaveLength(10);
          expect((r as unknown[]).every((v) => v !== null)).toBe(true);
        }
      }

      // with 100 documents and a 0.5 probability both branches must show up
      expect(nullFields).toBeGreaterThan(0);
      expect(arrays).toBeGreaterThan(0);
    });
  });
});
