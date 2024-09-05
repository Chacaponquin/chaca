import { ChacaUtils } from "../../core/utils";
import { SPECIAL_CHARACTERS } from "./constants/special_characters";
import {
  LOWER_CHARACTERS,
  MIXED_CHARACTERS,
  UPPER_CHARACTERS,
} from "./constants/characters";

export type Case = "lower" | "upper" | "mixed";

export type AlphaNumericProps = {
  length?: number;
  case?: Case;
  banned?: Array<string> | string;
};

export type BinaryCodeProps = {
  length?: number;
};

export type FloatProps = {
  min?: number;
  max?: number;
  precision?: number;
};

export type NumberProps = {
  min?: number;
  max?: number;
  precision?: number;
};

export type IntProps = {
  min?: number;
  max?: number;
};

export type HexadecimalProps = {
  length?: number;
  case?: Case;
};

export type MatrixProps = {
  x_size?: number;
  y_size?: number;
  min?: number;
  max?: number;
  precision?: number;
};

export type CharactersProps = {
  length?: number;
  case?: "lower" | "upper";
};

export class DatatypeModule {
  private readonly MIN_RANDOM_VALUE = -9999999;
  private readonly MAX_RANDOM_VALUE = 9999999;
  private readonly MAX_PRECISION = 16;

  readonly constants = {
    upperCharacters: UPPER_CHARACTERS,
    lowerCharacters: LOWER_CHARACTERS,
    mixedCharacters: MIXED_CHARACTERS,
    specialCharacters: SPECIAL_CHARACTERS,
  };

  /**
   * Returns a keyboard special character
   * @example modules.datatype.specialCharacter() // '_'
   * @returns string
   */
  specialCharacter(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(SPECIAL_CHARACTERS);
  }

  /**
   * Returns a boolean
   * @example modules.datatype.boolean() // true
   * @returns boolean
   */
  boolean(): boolean {
    const utils = new ChacaUtils();
    return utils.oneOfArray([true, false]);
  }

  /**
   * Returns a integer number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @example
   * modules.datatype.int() // 462
   * modules.datatype.int() // 28
   * @returns number
   */
  int(a?: IntProps): number {
    const { max = undefined, min = undefined } = a || {};

    const minimun: number =
      typeof min === "number" ? min : this.MIN_RANDOM_VALUE;
    let maximun: number;

    if (typeof max === "number") {
      if (minimun) {
        if (max >= minimun) {
          maximun = max;
        } else {
          maximun = this.MAX_RANDOM_VALUE;
        }
      } else {
        maximun = max;
      }
    } else {
      maximun = this.MAX_RANDOM_VALUE;
    }

    const val = Math.floor(Math.random() * (maximun - minimun) + minimun);

    return val;
  }

  /**
   * Returns a float number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the float. Must be a value between `1` and `20`. Default `2`
   * @example
   * modules.datatype.float() // 462.12
   * modules.datatype.float({ min: 10, max: 30 }) // 10.23
   * modules.datatype.float({ precision: 4 }) // 90.5362
   * @returns number
   */
  float(a?: FloatProps): number {
    const utils = new ChacaUtils();
    const {
      max = undefined,
      min = undefined,
      precision = undefined,
    } = a ? a : {};

    let range: number;
    if (typeof max === "number" && typeof min === "number") {
      range = max - min;
    } else if (typeof max === "number" && typeof min === "undefined") {
      range = max;
    } else if (typeof max === "undefined" && typeof min === "number") {
      range = this.MAX_RANDOM_VALUE - min;
    } else {
      range = utils.oneOfArray([this.MAX_RANDOM_VALUE, this.MIN_RANDOM_VALUE]);
    }

    const pres: number =
      typeof precision === "number" &&
      precision > 0 &&
      precision <= this.MAX_PRECISION
        ? precision
        : this.int({ min: 1, max: 10 });

    const randomNum = Math.random() * range + (min || 0);
    const factor = Math.pow(10, pres);

    const returnValue = Math.round(randomNum * factor) / factor;

    return returnValue;
  }

  /**
   * Returns a number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the number. Must be a value between `0` and `20`.
   * @example
   * modules.datatype.number() // 301
   * modules.datatype.number({ min: 10, max: 30 }) // 10.2327
   * @returns number
   */
  number(a?: NumberProps): number {
    const {
      max = undefined,
      min = undefined,
      precision = undefined,
    } = a ? a : {};

    let val: number;
    if (precision === 0) {
      val = this.int({ max, min });
    } else {
      val = this.float({ max, min, precision });
    }

    return val;
  }

  /**
   * Returns a string with a hexadecimal code
   * @param args.case Case of the values inside de hexadecimal code (`mixed` | `lower` | `upper`)
   * @param args.length Lenght of the hexadecimal code
   * @example
   * modules.datatype.hexadecimal() // '009df'
   * modules.datatype.hexadecimal({ length: 3 }) // '01D'
   * modules.datatype.hexadecimal({ lenght: 3, case: 'upper' }) // 'DE20'
   * @returns string
   */
  hexadecimal(a?: HexadecimalProps): string {
    const utils = new ChacaUtils();
    const { length: ilength = undefined, case: icase = "mixed" } = a ? a : {};

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const characters = ["A", "B", "C", "D", "E", "F", "G"];

    const length =
      ilength && ilength > 0 ? ilength : this.int({ min: 5, max: 10 });
    const c = icase ? icase : "mixed";

    let ret = "";
    for (let i = 1; i <= length; i++) {
      ret = ret.concat(
        utils.oneOfArray([
          ...numbers,
          ...characters.map((el) => {
            if (c === "lower") {
              return el.toLowerCase();
            } else if (c === "upper") {
              return el;
            } else {
              return utils.oneOfArray([el.toLowerCase(), el.toUpperCase()]);
            }
          }),
        ]),
      );
    }

    return ret;
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
   * @example
   * modules.datatype.matrix() // [[1, 0, 5], [5, 10, 9]]
   * modules.datatype.matrix({ x_size: 4, y_size: 2 }) // [[1, 2], [0, 0], [1, 1], [4, 5]]
   */
  matrix(a?: MatrixProps): number[][] {
    const {
      x_size: ix_size = undefined,
      max = undefined,
      min = undefined,
      precision = undefined,
      y_size: iy_size = undefined,
    } = a ? a : {};

    const x_size =
      typeof ix_size === "number" && ix_size >= 0
        ? ix_size
        : this.int({ min: 1, max: 10 });

    const y_size =
      typeof iy_size === "number" && iy_size >= 0
        ? iy_size
        : this.int({ min: 1, max: 10 });

    return Array.from({ length: x_size }).map(() => {
      return Array.from({ length: y_size }).map(() => {
        return this.number({
          min: min,
          max: max,
          precision: precision,
        });
      });
    });
  }

  /**
   *
   * @param args.length Length of characters. Default `1`
   * @param args.case Case of the characters (`lower` or `upper`)
   *
   * @example
   * modules.datatype.characters() // 'v'
   * modules.datatype.characters({ length: 5 }) // 'bhtlw'
   * modules.datatype.characters({ length: 5, case: 'upper' }) // 'HQRSD'
   *
   * @returns string
   */
  characters(a?: CharactersProps): string {
    const utils = new ChacaUtils();
    const { case: icase = "lower", length = 10 } = a ? a : {};

    const len = length > 0 ? length : undefined;

    let charactersToRet;

    if (icase) {
      if (icase === "lower") {
        charactersToRet = this.constants.lowerCharacters;
      } else if (icase === "upper") {
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
        ret = ret.concat(utils.oneOfArray(charactersToRet));
      }

      return ret;
    } else {
      return utils.oneOfArray(charactersToRet);
    }
  }

  /**
   * Returns a string with a binary code
   * @param args.length Length of the binary code
   * @example
   * modules.datatype.binaryCode() // '00101'
   * modules.datatype.binaryCode({ length: 6 }) // '010100'
   * @returns string
   */
  binaryCode(a?: BinaryCodeProps): string {
    const utils = new ChacaUtils();
    const { length: ilength = this.int({ min: 4, max: 8 }) } = a ? a : {};

    const length = ilength > 0 ? ilength : this.int({ min: 4, max: 8 });

    let ret = "";

    for (let i = 1; i <= length; i++) {
      ret = ret.concat(String(utils.oneOfArray([0, 1])));
    }

    return ret;
  }

  /**
   * @param args.length Length of the string
   * @param args.case Case of the string. (`lower`, `upper`, `mixed`)
   * @param args.banned Characters that cannot appear in the string. It can be an array of characters or a string with all the characters
   * @returns string
   */

  alphaNumeric(a?: AlphaNumericProps): string {
    const utils = new ChacaUtils();
    const {
      length: ilength = this.int({ min: 1, max: 20 }),
      case: icase = undefined,
      banned: ibanned = undefined,
    } = a ? a : {};

    const length =
      ilength && ilength > 0 ? ilength : this.int({ min: 1, max: 20 });

    const banned: string[] = [];

    const cass = icase ? icase : undefined;

    if (ibanned) {
      if (typeof ibanned === "string") {
        for (let i = 0; i < ibanned.length; i++) {
          banned.push(ibanned[i]);
        }
      } else if (Array.isArray(banned)) {
        for (const c of ibanned) {
          banned.push(c);
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
      retString = retString.concat(utils.oneOfArray(selectValues));
    }

    return retString;
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
