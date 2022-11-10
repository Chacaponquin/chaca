import { CHDataError } from "../../errors/CHDataError";
import { CHDataUtils } from "../../utils/CHDataUtils";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils";
import { SchemaField } from "../SchemaField";

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
  case?: "mixed" | "lower" | "upper";
};

type MatrizProps = {
  x_size?: number;
  y_size?: number;
  min?: number;
  max?: number;
  precision?: number;
};

type CustomArrayProps = {
  array: any[];
};

type CharactersProps = {
  length?: number;
  case?: "lower" | "upper";
};

export class DataTypeSchema {
  /**
   * Returns a boolean
   * @example schemas.dataType.boolean() /// Schema
   * @example schemas.dataType.boolean().getValue() // true
   * @returns boolean
   */
  public boolean() {
    return new SchemaField<boolean>(
      "boolean",
      () => CHDataUtils.oneOfArray([true, false]),
      {},
    );
  }

  /**
   * Returns a integer number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @example schemas.dataType.int() // Schema
   * @example
   * schemas.dataType.int().getValue() // 462
   * schemas.dataType.int().getValue({min: 10, max: 30}) // 28
   * @returns number
   */
  int(args?: IntProps) {
    return new SchemaField<number, IntProps>(
      "int",
      (a) => {
        return PrivateUtils.intNumber(a);
      },
      args || {},
    );
  }

  /**
   * Returns a float number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the float. Must be a value between `1` and `20`. Default `2`
   * @example schemas.dataType.float() // Schema
   * @example
   * schemas.dataType.float().getValue() // 462.12
   * schemas.dataType.float().getValue({min: 10, max: 30}) // 10.23
   * schemas.dataType.number().getValue({precision: 4}) // 90.5362
   * @returns number
   */
  float(args?: FloatProps) {
    return new SchemaField<number, FloatProps>(
      "float",
      (a) => PrivateUtils.floatNumber(a),
      args || {},
    );
  }

  /**
   * Returns a number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the number. Must be a value between `1` and `20`.
   * @example schemas.dataType.number() // Schema
   * @example
   * schemas.dataType.number().getValue() // 301
   * schemas.dataType.number().getValue({min: 10, max: 30}) // 10.2327
   * @returns number
   */
  number(args?: NumberProps) {
    return new SchemaField<number, NumberProps>(
      "number",
      (a) => {
        let minimun: number = typeof a.min === "number" ? a.min : -999999;
        let maximun: number;
        let pres: number =
          typeof a.precision === "number" &&
          a.precision > 0 &&
          a.precision <= 20
            ? a.precision
            : PrivateUtils.intNumber({ min: 0, max: 5 });

        if (typeof a.max === "number") {
          if (minimun) {
            if (a.max > minimun) maximun = a.max;
            else maximun = 999999;
          } else maximun = a.max;
        } else maximun = 999999;

        const val = Math.random() * (maximun - minimun + 1) + minimun;
        return Number(String(val.toFixed(pres)));
      },
      args || {},
    );
  }

  /**
   * Returns a string with a hexadecimal code
   * @param args.case Case of the values inside de hexadecimal code (`mixed` | `lower` | `upper`)
   * @param args.length Lenght of the hexadecimal code
   * @example schemas.dataType.hexadecimal() // Schema
   * @example
   * schemas.dataType.hexadecimal().getValue() // '009df'
   * schemas.dataType.hexadecimal().getValue({length: 3}) // '01D'
   * schemas.dataType.hexadecimal().getValue({lenght: 3, case: 'upper'}) // 'DE20'
   * @returns
   */
  public hexadecimal(args?: HexadecimalProps) {
    return new SchemaField<string, HexadecimalProps>(
      "hexadecimal",
      (a) => {
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const characters = ["A", "B", "C", "D", "E", "F", "G"];

        const length =
          typeof a.length === "number" && a.length > 0
            ? a.length
            : PrivateUtils.intNumber({ min: 5, max: 10 });
        const c = typeof a.case === "string" ? a.case : "mixed";

        let ret: string = "";
        for (let i = 1; i <= length; i++) {
          ret = ret.concat(
            PrivateUtils.oneOfArray([
              ...numbers,
              ...characters.map((el) => {
                if (c === "lower") return el.toLowerCase();
                else if (c === "upper") return el;
                else {
                  return PrivateUtils.oneOfArray([
                    el.toLowerCase(),
                    el.toUpperCase(),
                  ]);
                }
              }),
            ]),
          );
        }

        return ret;
      },
      args || {},
    );
  }

  /**
   * Return a two dimension matriz of numbers
   *
   * @param args.x_size Columns size
   * @param args.y_size Row size
   * @param args.min Min value for the numbers of the matriz
   * @param args.max Max value for the numbers of the matriz
   * @param args.precision Number precision of the matriz
   *
   * @example schemas.dataType.matriz() // Schema
   *
   * @example
   * schemas.dataType.matriz().getValue() // [[1, 0, 5], [5, 10, 9]]
   * schemas.dataType.matriz().getValue({x_size: 4, y_size: 2}) // [[1, 2], [0, 0], [1, 1], [4, 5]]
   */
  public matriz(args?: MatrizProps) {
    return new SchemaField<number[][], MatrizProps>(
      "matriz",
      (a) => {
        const x_size =
          typeof a.x_size === "number" && a.x_size > 0
            ? Number.parseInt(String(a.x_size))
            : PrivateUtils.intNumber({ min: 1, max: 10 });
        const y_size =
          typeof a.y_size === "number" && a.y_size > 0
            ? Number.parseInt(String(a.y_size))
            : PrivateUtils.intNumber({ min: 1, max: 10 });

        const { min, max } = this.validateMinMax(a.min, a.max);

        const precision =
          typeof a.precision === "number" && a.precision > 0
            ? a.precision
            : undefined;

        return new Array(x_size).fill(0).map(() => {
          return new Array(y_size).fill(0).map(() => {
            return this.number().getValue({ min, max, precision });
          });
        });
      },
      args || {},
    );
  }

  /**
   * Return one of an array of elements
   * @param args.array Array of elements
   * @example schemas.dataType.customArray() // Schema
   * @example schemas.dataType.customArray({array: [5, {hello: "world"}, "Chaca"]}) // 5
   */
  public customArray(args?: CustomArrayProps) {
    return new SchemaField<any, CustomArrayProps>(
      "customArray",
      (a) => {
        if (Array.isArray(a.array) && a.array.length > 0) {
          return CHDataUtils.oneOfArray(a.array);
        } else
          throw new CHDataError(
            "The argument of custom array must be an array of values",
          );
      },
      args || { array: [] },
    );
  }

  /**
   *
   * @param args.length Length of characters. Default `1`
   * @param args.case Case of the characters (`lower` or `upper`)
   *
   * @example schemas.dataType.character() // Schema
   * @example
   * schemas.dataType.characters().getValue() // 'v'
   * schemas.dataType.characters().getValue({length: 5}) // 'bhtlw'
   * schemas.dataType.characters().getValue({length: 5, case: 'upper'}) // 'HQRSD'
   *
   * @returns string
   */
  public characters(args?: CharactersProps) {
    return new SchemaField<string, CharactersProps>(
      "character",
      (a) => {
        const len =
          typeof a.length === "number" && a.length > 0 ? a.length : undefined;
        let charactersToRet: string[] = [];

        if (a.case) {
          if (a.case === "lower")
            charactersToRet = PrivateUtils.characters("lower");
          else if (a.case === "upper") PrivateUtils.characters("upper");
          else charactersToRet = PrivateUtils.characters();
        } else charactersToRet = PrivateUtils.characters();

        if (len) {
          let ret = "";
          for (let i = 1; i <= len; i++) {
            ret = ret.concat(CHDataUtils.oneOfArray(charactersToRet));
          }
          return ret;
        } else return CHDataUtils.oneOfArray(charactersToRet);
      },
      args || {},
    );
  }

  /**
   * Returns a string with a binary code
   * @param args.length Length of the binary code
   * @example schemas.dataType.binaryCode() // Schema
   * @example
   * schemas.dataType.binaryCode().getValue() // '00101'
   * schemas.dataType.binaryCode().getValue({length: 6}) // '010100'
   * @returns
   */
  binaryCode(args?: BinaryCodeProps) {
    return new SchemaField<string, BinaryCodeProps>(
      "binaryCode",
      (a) => {
        const length =
          typeof a.length === "number" && a.length > 0
            ? a.length
            : PrivateUtils.intNumber({ min: 4, max: 8 });

        let ret: string = "";
        for (let i = 1; i <= length; i++) {
          ret = ret.concat(String(PrivateUtils.oneOfArray([0, 1])));
        }

        return ret;
      },
      args || {},
    );
  }

  /**
   * Returns a keyboard special character
   * @example schemas.dataType.specialCharacter() // Schema
   * @example schemas.dataType.specialCharacter().getValue() // '_'
   * @returns string
   */
  public specialCharacter() {
    return new SchemaField<string>(
      "specialCharacter",
      () => {
        return PrivateUtils.oneOfArray(PrivateUtils.specialCharacters());
      },
      {},
    );
  }

  private validateMinMax(
    min: number | undefined,
    max: number | undefined,
  ): { min: number | undefined; max: number | undefined } {
    let mi = typeof min === "number" ? min : undefined;
    let ma =
      typeof max === "number" ? (mi && max > mi ? max : undefined) : undefined;

    return { min: mi, max: ma };
  }
}
