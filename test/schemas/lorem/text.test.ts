import { schemas } from "../../../src";

describe("# Lorem text test", () => {
  const ARRAY_LENGTH_TEXT = 50;

  it("Without arguments", () => {
    const allTexts = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() => {
      return schemas.lorem.text().getValue();
    });

    expect(allTexts.every((v) => typeof v === "string")).toBe(true);
  });

  it("With character_min=5", () => {
    const allTexts = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() => {
      return schemas.lorem.text({ character_min: 5 }).getValue();
    });

    expect(allTexts.every((v) => typeof v === "string" && v.length >= 5)).toBe(
      true,
    );
  });

  it("With character_max=10", () => {
    const allTexts = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() => {
      return schemas.lorem.text({ character_max: 10 }).getValue();
    });

    expect(allTexts.every((v) => typeof v === "string" && v.length <= 10)).toBe(
      true,
    );
  });

  it("With character_max=10 and character_min=5", () => {
    const allTexts = Array.from({ length: ARRAY_LENGTH_TEXT }).map(() => {
      return schemas.lorem.text({ character_max: 10 }).getValue();
    });

    console.log(allTexts.filter((v) => !(v.length <= 10 && v.length >= 5)));

    expect(allTexts.every((v) => v.length <= 10 && v.length >= 5)).toBe(true);
  });
});
