import { chaca, modules, NotExistFieldError } from "../../../../src";
import { describe, expect, it } from "vitest";

describe("# Ref field tests", () => {
  it("Create a correct ref field", () => {
    const dataset1 = chaca.schema({
      id: chaca.key(modules.id.uuid),
    });

    const dataset2 = chaca.schema({ id: chaca.ref("Dataset1.id") });

    const data = chaca
      .dataset([
        { name: "Dataset1", documents: 30, schema: dataset1 },
        { name: "Dataset2", documents: 30, schema: dataset2 },
      ])
      .generate();

    expect(
      data.Dataset1.map((d: any) => d.id).includes(data.Dataset2[0].id),
    ).toBe(true);
  });

  it("Try ref a not existing field. Should throw an error", () => {
    const dataset1 = chaca.schema({
      id: chaca.key(modules.id.uuid),
    });

    const dataset2 = chaca.schema({ id: chaca.ref("Dataset1.customId") });

    expect(() => {
      chaca
        .dataset([
          { name: "Dataset1", documents: 30, schema: dataset1 },
          { name: "Dataset2", documents: 30, schema: dataset2 },
        ])
        .generate();
    }).toThrow(NotExistFieldError);
  });
});
