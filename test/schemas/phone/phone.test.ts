import { chaca, schemas } from "../../../src";

const validateTime = (
  text: string,
  { min, max }: { min: number; max: number },
): boolean => {
  const firstNumber = Number(text.slice(0, 2));

  if (firstNumber > max) return false;
  else if (firstNumber < min) return false;
  return true;
};

describe("# Phone callDuration test", () => {
  describe("without arguments", () => {
    const value = schemas.phone.callDuration({}).getValue();
    it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
      expect(typeof value === "string" && value.length === 5).toBe(true);
      expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
    });
  });

  describe("passing only max argument", () => {
    describe("passing superior than 59", () => {
      const value = schemas.phone.callDuration({ max: 90 }).getValue();
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing inferior than 0", () => {
      const value = schemas.phone.callDuration({ max: -20 }).getValue();
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing a max argument between 0 and 59", () => {
      const value = schemas.phone.callDuration({ max: 30 }).getValue();
      it(`should return a string with two numbers, the first one must be inferior than the argument VALUE=${value}`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 30 })).toBe(true);
      });
    });
  });

  describe("passing only min argument", () => {
    describe("passing inferior than 0", () => {
      const value = schemas.phone.callDuration({ min: -10 }).getValue();
      it(`should return a string with two numbers between 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });

    describe("passing a value between 0 and 59", () => {
      const value = schemas.phone.callDuration({ min: 20 }).getValue();
      it(`should return a string with two numbers, the first one must be a value between the min argument and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
      });
    });

    describe("passing a value superior than 59", () => {
      const value = schemas.phone.callDuration({ min: 100 }).getValue();
      it(`should return a string with two numbers, the first one must be a value 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });
  });

  describe("passing bouth arguments (min and max)", () => {
    describe("max value superior than min", () => {
      const value = schemas.phone.callDuration({ min: 20, max: 40 }).getValue();
      it(`should return a string with two numbers between 0 and 59, the first one between 20 and 40`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 40 })).toBe(true);
      });
    });

    describe("max value inferior than min", () => {
      const value = schemas.phone.callDuration({ min: 20, max: 10 }).getValue();
      it(`should return a string with two numbers between 0 and 59, the first one between the min argument and 59`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 59 })).toBe(true);
      });
    });

    describe("bouth argument equals", () => {
      const value = schemas.phone.callDuration({ min: 20, max: 20 }).getValue();
      it(`should return a string with two numbers between 0 and 59, the first one equal to value pass`, () => {
        expect(typeof value === "string" && value.length === 5).toBe(true);
        expect(validateTime(value, { min: 20, max: 20 })).toBe(true);
      });
    });

    describe("bouth argument out of range", () => {
      const value = schemas.phone
        .callDuration({ min: -20, max: 80 })
        .getValue();
      it(`should return a string with two numbers between 0 and 59`, () => {
        expect(typeof value === "string" && value.length === 5);
        expect(validateTime(value, { min: 0, max: 59 })).toBe(true);
      });
    });
  });
});
