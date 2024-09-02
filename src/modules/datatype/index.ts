import { ChacaUtils } from "../../core/utils";
import { Module } from "../module";
import { SPECIAL_CHARACTERS } from "./constants/special_characters";
import {
  LOWER_CHARACTERS,
  MIXED_CHARACTERS,
  UPPER_CHARACTERS,
} from "./constants/characters";

type Case = "lower" | "upper" | "mixed";

type AlphaNumericProps = {
  length?: number;
  case?: Case;
  banned?: Array<string> | string;
};

type BinaryCodeProps = {
  length?: number;
};

type FloatProps = {
  min?: number;
  max?: number;
  precision?: number;
};

type NumberProps = {
  min?: number;
  max?: number;
  precision?: number;
};

type IntProps = {
  min?: number;
  max?: number;
};

type HexadecimalProps = {
  length?: number;
  case?: Case;
};

type MatrizProps = {
  x_size?: number;
  y_size?: number;
  min?: number;
  max?: number;
  precision?: number;
};

type CharactersProps = {
  length?: number;
  case?: "lower" | "upper";
};

export class DatatypeModule {
  private MIN_RANDOM_VALUE = -9999999;
  private MAX_RANDOM_VALUE = 9999999;
  private MAX_PRECISION = 16;

  private utils = new ChacaUtils();

  readonly constants = {
    upperCharacters: UPPER_CHARACTERS,
    lowerCharacters: LOWER_CHARACTERS,
    mixedCharacters: MIXED_CHARACTERS,
    specialCharacters: SPECIAL_CHARACTERS,
  };

  /**
   * Returns a keyboard special character
   * @example modules.datatype.specialCharacter() // Schema
   * @example modules.datatype.specialCharacter().getValue() // '_'
   * @returns string
   */
  specialCharacter(): Module<string> {
    return new Module<string>(() => {
      return this.utils.oneOfArray(SPECIAL_CHARACTERS);
    });
  }

  /**
   * Returns a boolean
   * @example modules.datatype.boolean() /// Schema
   * @example modules.datatype.boolean().getValue() // true
   * @returns boolean
   */
  boolean() {
    return new Module<boolean>(() => this.utils.oneOfArray([true, false]));
  }

  /**
   * Returns a integer number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @example modules.datatype.int() // Schema
   * @example
   * modules.datatype.int().getValue() // 462
   * modules.datatype.int().getValue({min: 10, max: 30}) // 28
   * @returns number
   */
  int(args?: IntProps) {
    return new Module<number, IntProps>((a) => {
      const minimun: number =
        typeof a.min === "number" ? a.min : this.MIN_RANDOM_VALUE;
      let maximun: number;

      if (typeof a.max === "number") {
        if (minimun) {
          if (a.max >= minimun) {
            maximun = a.max;
          } else {
            maximun = this.MAX_RANDOM_VALUE;
          }
        } else {
          maximun = a.max;
        }
      } else {
        maximun = this.MAX_RANDOM_VALUE;
      }

      const val = Math.floor(Math.random() * (maximun - minimun) + minimun);
      return val;
    }, args || {});
  }

  /**
   * Returns a float number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the float. Must be a value between `1` and `20`. Default `2`
   * @example modules.datatype.float() // Schema
   * @example
   * modules.datatype.float().getValue() // 462.12
   * modules.datatype.float().getValue({min: 10, max: 30}) // 10.23
   * modules.datatype.number().getValue({precision: 4}) // 90.5362
   * @returns number
   */
  float(args?: FloatProps) {
    return new Module<number, FloatProps>((a) => {
      const { max, min, precision } = a;
      let range: number;
      if (typeof max === "number" && typeof min === "number") {
        range = max - min;
      } else if (typeof max === "number" && typeof min === "undefined") {
        range = max;
      } else if (typeof max === "undefined" && typeof min === "number") {
        range = this.MAX_RANDOM_VALUE - min;
      } else {
        range = this.utils.oneOfArray([
          this.MAX_RANDOM_VALUE,
          this.MIN_RANDOM_VALUE,
        ]);
      }

      const pres: number =
        typeof precision === "number" &&
        precision > 0 &&
        precision <= this.MAX_PRECISION
          ? precision
          : this.int().getValue({ min: 1, max: 10 });

      const randomNum = Math.random() * range + (min || 0);
      const factor = Math.pow(10, pres);

      const returnValue = Math.round(randomNum * factor) / factor;

      return returnValue;
    }, args || {});
  }

  /**
   * Returns a number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the number. Must be a value between `0` and `20`.
   * @example modules.datatype.number() // Schema
   * @example
   * modules.datatype.number().getValue() // 301
   * modules.datatype.number().getValue({min: 10, max: 30}) // 10.2327
   * @returns number
   */
  number(args?: NumberProps) {
    return new Module<number, NumberProps>((a) => {
      const { max, min, precision } = a;

      let val: number;
      if (precision === 0) {
        val = this.int().getValue({ max, min });
      } else {
        val = this.float().getValue({ max, min, precision });
      }

      return val;
    }, args || {});
  }

  /**
   * Returns a string with a hexadecimal code
   * @param args.case Case of the values inside de hexadecimal code (`mixed` | `lower` | `upper`)
   * @param args.length Lenght of the hexadecimal code
   * @example
   * modules.datatype.hexadecimal() // Schema
   * modules.datatype.hexadecimal().getValue() // '009df'
   * modules.datatype.hexadecimal().getValue({length: 3}) // '01D'
   * modules.datatype.hexadecimal().getValue({lenght: 3, case: 'upper'}) // 'DE20'
   * @returns string
   */
  hexadecimal(args?: HexadecimalProps) {
    return new Module<string, HexadecimalProps>((a) => {
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const characters = ["A", "B", "C", "D", "E", "F", "G"];

      const length =
        typeof a.length === "number" && a.length > 0
          ? a.length
          : this.int().getValue({ min: 5, max: 10 });
      const c = typeof a.case === "string" ? a.case : "mixed";

      let ret = "";
      for (let i = 1; i <= length; i++) {
        ret = ret.concat(
          this.utils.oneOfArray([
            ...numbers,
            ...characters.map((el) => {
              if (c === "lower") return el.toLowerCase();
              else if (c === "upper") return el;
              else {
                return this.utils.oneOfArray([
                  el.toLowerCase(),
                  el.toUpperCase(),
                ]);
              }
            }),
          ]),
        );
      }

      return ret;
    }, args || {});
  }

  /**
   * Return a two dimension matriz of numbers
   *
   * @param args.x_size Columns size
   * @param args.y_size Row size
   * @param args.min Min value for the numbers of the matrix
   * @param args.max Max value for the numbers of the matrix
   * @param args.precision Number precision of the matrix
   *
   * @example modules.datatype.matriz() // Schema
   *
   * @example
   * modules.datatype.matrix().getValue() // [[1, 0, 5], [5, 10, 9]]
   * modules.datatype.matrix().getValue({x_size: 4, y_size: 2}) // [[1, 2], [0, 0], [1, 1], [4, 5]]
   */
  matrix(args?: MatrizProps) {
    return new Module<number[][], MatrizProps>((a) => {
      const x_size =
        typeof a.x_size === "number" && a.x_size >= 0
          ? Number.parseInt(String(a.x_size))
          : this.int().getValue({ min: 1, max: 10 });
      const y_size =
        typeof a.y_size === "number" && a.y_size >= 0
          ? Number.parseInt(String(a.y_size))
          : this.int().getValue({ min: 1, max: 10 });

      return Array.from({ length: x_size }).map(() => {
        return Array.from({ length: y_size }).map(() => {
          return this.number().getValue({
            min: a.min,
            max: a.max,
            precision: a.precision,
          });
        });
      });
    }, args || {});
  }

  /**
   *
   * @param args.length Length of characters. Default `1`
   * @param args.case Case of the characters (`lower` or `upper`)
   *
   * @example modules.datatype.character() // Schema
   * @example
   * modules.datatype.characters().getValue() // 'v'
   * modules.datatype.characters().getValue({length: 5}) // 'bhtlw'
   * modules.datatype.characters().getValue({length: 5, case: 'upper'}) // 'HQRSD'
   *
   * @returns string
   */
  characters(args?: CharactersProps) {
    return new Module<string, CharactersProps>((a) => {
      const len =
        typeof a.length === "number" && a.length > 0 ? a.length : undefined;

      let charactersToRet;

      if (a.case) {
        if (a.case === "lower") {
          charactersToRet = this.constants.lowerCharacters;
        } else if (a.case === "upper") {
          charactersToRet = this.constants.upperCharacters;
        } else {
          charactersToRet = this.constants.mixedCharacters;
        }
      } else {
        charactersToRet = this.constants.mixedCharacters;
      }

      if (len) {
        let ret = "";
        for (let i = 1; i <= len; i++) {
          ret = ret.concat(this.utils.oneOfArray(charactersToRet));
        }

        return ret;
      } else {
        return this.utils.oneOfArray(charactersToRet);
      }
    }, args || {});
  }

  /**
   * Returns a string with a binary code
   * @param args.length Length of the binary code
   * @example modules.datatype.binaryCode() // Schema
   * @example
   * modules.datatype.binaryCode().getValue() // '00101'
   * modules.datatype.binaryCode().getValue({length: 6}) // '010100'
   * @returns string
   */
  binaryCode(args?: BinaryCodeProps) {
    return new Module<string, BinaryCodeProps>((a) => {
      const length =
        typeof a.length === "number" && a.length > 0
          ? a.length
          : this.int().getValue({ min: 4, max: 8 });

      let ret = "";

      for (let i = 1; i <= length; i++) {
        ret = ret.concat(String(this.utils.oneOfArray([0, 1])));
      }

      return ret;
    }, args || {});
  }

  /**
   * @param args.length Length of the string
   * @param args.case Case of the string. (`lower`, `upper`, `mixed`)
   * @param args.banned Characters that cannot appear in the string. It can be an array of characters or a string with all the characters
   * @returns string
   */

  alphaNumeric(args?: AlphaNumericProps) {
    return new Module<string, AlphaNumericProps>((a) => {
      const length =
        typeof a.length === "number" && a.length > 0
          ? a.length
          : this.int().getValue({ min: 1, max: 20 });

      const banned: string[] = [];

      const cass = typeof a.case === "string" ? a.case : undefined;

      if (a.banned) {
        if (typeof a.banned === "string") {
          for (let i = 0; i < a.banned.length; i++) {
            banned.push(a.banned[i]);
          }
        } else if (Array.isArray(banned)) {
          for (const c of a.banned) {
            if (typeof c === "string") {
              banned.push(c);
            }
          }
        }
      }

      const selectNumbers = this.numbersArray().filter((el) => {
        const is = banned.some((b) => b === el);
        return !is;
      });

      const characters = this.filterCharacters(cass);
      const selectCharacters = characters.filter((el) => {
        let is = true;
        banned.forEach((b) => {
          if (b === el) is = false;
        });
        return is;
      });
      const selectValues = [...selectCharacters, ...selectNumbers];

      let retString = "";
      for (let i = 1; i <= length; i++) {
        retString = retString.concat(this.utils.oneOfArray(selectValues));
      }

      return retString;
    }, args || {});
  }

  private filterCharacters(fCase?: Case): string[] {
    if (fCase === "upper") {
      return this.constants.upperCharacters;
    } else if (fCase === "lower") {
      return this.constants.lowerCharacters;
    } else {
      return this.constants.mixedCharacters;
    }
  }

  private numbersArray(): string[] {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
}
