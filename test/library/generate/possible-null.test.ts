import { chaca, schemas } from "../../../src";

function countNulls(array: any[]): number {
  let count = 0;

  for (const dat of array) {
    if (dat.null === null) {
      count++;
    }
  }

  return count;
}

describe("# Possible null fields tests", () => {
  describe("Boolean value", () => {
    it("Pass possibleNull=true. Returns at least one null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: true },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass possibleNull=false. Returns always a null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: false },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(0);
    });
  });

  describe("Number value", () => {
    it("Pass possibleNull=0. Always return a non-null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: 0 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(0);
    });

    it("Pass possibleNull=100. Always return a null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: 100 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(50);
    });

    it("Pass possibleNull=number-greater-than-100. Always return a null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: 150 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(50);
    });

    it("Pass a number between 0 and 100. Should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: 60 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass possibleNull=negative-number. Always return a non-null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: -60 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(0);
    });
  });

  describe("Function value", () => {
    it("Pass a function that return a 0. Should return an non-null values", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: () => 0 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(0);
    });

    it("Pass a function that return 100. Always return a null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: () => 100 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(50);
    });

    it("Pass a function that return a number-greater-than-100. Always return a null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: () => 150 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(50);
    });

    it("Pass a function that return a number between 0 and 100. Should return at least one null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: () => 60 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBeGreaterThan(0);
    });

    it("Pass a function that return a negative number. Always return a non-null value", () => {
      const schema = chaca.schema({
        null: { type: schemas.color.cmyk(), possibleNull: () => -60 },
      });

      const data = schema.generate(50);

      expect(countNulls(data)).toBe(0);
    });

    it("Pass a function that uses currentFields", () => {
      const schema = chaca.schema({
        age: schemas.dataType.int({ max: 90, min: 18 }),
        null: {
          type: schemas.color.cmyk(),
          possibleNull: ({ currentFields }) => {
            if (currentFields.age > 40) {
              return 100;
            } else {
              return 0;
            }
          },
        },
      });

      const data = schema.generate(50);

      let count = 0;
      data.forEach((d) => {
        if (d.age > 40) {
          count++;
        }
      });

      expect(countNulls(data)).toBe(count);
    });
  });
});
