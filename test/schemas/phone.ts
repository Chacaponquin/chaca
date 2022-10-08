import { expect } from 'chai';
import chData from '../../src';
import mocha from 'mocha';

const validateTime = (
  text: string,
  { min, max }: { min: number; max: number },
): boolean => {
  const firstNumber = Number(text.slice(0, 2));

  if (firstNumber > max) return false;
  else if (firstNumber < min) return false;
  return true;
};

describe('#PhoneTest', () => {
  context('callDuration', () => {
    context('without arguments', () => {
      const value = chData.schemas.phone.callDuration().getValue();
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(value).to.be.a('string', 'In not a string').lengthOf(5);
        expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
      });
    });

    context('passing only max argument', () => {
      context('passing superior than 59', () => {
        const value = chData.schemas.phone.callDuration({ max: 90 }).getValue();
        it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
        });
      });

      context('passing inferior than 0', () => {
        const value = chData.schemas.phone
          .callDuration({ max: -20 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
        });
      });

      context('passing a max argument between 0 and 59', () => {
        const value = chData.schemas.phone.callDuration({ max: 30 }).getValue();
        it(`should return a string with two numbers, the first one must be inferior than the argument VALUE=${value}`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 30 })).to.be.true;
        });
      });
    });

    context('passing only min argument', () => {
      context('passing inferior than 0', () => {
        const value = chData.schemas.phone
          .callDuration({ min: -10 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
        });
      });

      context('passing a value between 0 and 59', () => {
        const value = chData.schemas.phone.callDuration({ min: 20 }).getValue();
        it(`should return a string with two numbers, the first one must be a value between the min argument and 59`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 20, max: 59 })).to.be.true;
        });
      });

      context('passing a value superior than 59', () => {
        const value = chData.schemas.phone
          .callDuration({ min: 100 })
          .getValue();
        it(`should return a string with two numbers, the first one must be a value 0 and 59`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
        });
      });
    });

    context('passing bouth arguments (min and max)', () => {
      context('max value superior than min', () => {
        const value = chData.schemas.phone
          .callDuration({ min: 20, max: 40 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59, the first one between 20 and 40`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 20, max: 40 })).to.be.true;
        });
      });

      context('max value inferior than min', () => {
        const value = chData.schemas.phone
          .callDuration({ min: 20, max: 10 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59, the first one between the min argument and 59`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 20, max: 59 })).to.be.true;
        });
      });

      context('bouth argument equals', () => {
        const value = chData.schemas.phone
          .callDuration({ min: 20, max: 20 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59, the first one equal to value pass`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 20, max: 20 })).to.be.true;
        });
      });

      context('bouth argument out of range', () => {
        const value = chData.schemas.phone
          .callDuration({ min: -20, max: 80 })
          .getValue();
        it(`should return a string with two numbers between 0 and 59`, () => {
          expect(value).to.be.a('string').lengthOf(5);
          expect(validateTime(value, { min: 0, max: 59 })).to.be.true;
        });
      });
    });
  });
});
