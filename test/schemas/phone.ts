import { expect } from 'chai';
import chData from '../../src';
import mocha from 'mocha';

describe('callDuration', () => {
  context('without arguments', () => {
    const value = chData.schemas.phone.callDuration().getValue();
    it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
      expect(value).to.be.a('string').lengthOf(5);
    });
  });

  context('passing max argument', () => {
    context('passing superior than 59', () => {
      const value = chData.schemas.phone.callDuration({ max: 90 }).getValue();
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(value).to.be.a('string').lengthOf(5);
      });
    });

    context('passing inferior than 0', () => {
      const value = chData.schemas.phone.callDuration({ max: -20 }).getValue();
      it(`should return a string with two numbers between 0 and 59 VALUE=${value}`, () => {
        expect(value).to.be.a('string').lengthOf(5);
      });
    });

    context('passing a max argument between 0 and 59', () => {
      const value = chData.schemas.phone.callDuration({ max: 30 }).getValue();
      it(`should return a string with two numbers, the first one must be inferior than the argument VALUE=${value}`, () => {
        expect(value).to.be.a('string').lengthOf(5);
      });
    });
  });
});
