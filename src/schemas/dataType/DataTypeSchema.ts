import { faker } from "@faker-js/faker";
import { CHDataError } from "../../errors/CHDataError";
import { CHDataUtils } from "../../utils/CHDataUtils";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils";
import { SchemaField } from "../SchemaField";

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
  prefix?: string;
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
   * @example schemas.dataType.int().getValue() // 462
   * @example schemas.dataType.int().getValue({min: 10, max: 30}) // 28
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
   * @example schemas.dataType.float().getValue() // 462.12
   * @example schemas.dataType.float().getValue({min: 10, max: 30}) // 10.23
   * @example schemas.dataType.number().getValue({precision: 4}) // 90.5362
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
   * @example schemas.dataType.number().getValue() // 301
   * @example schemas.dataType.number().getValue({min: 10, max: 30}) // 10.2327
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

  public hexadecimal(args?: HexadecimalProps) {
    return new SchemaField<string, HexadecimalProps>(
      "hexadecimal",
      (a) => {
        const length =
          typeof a.length === "number" && a.length && a.length > 0
            ? a.length
            : undefined;

        return faker.datatype.hexadecimal({
          length,
          case: a.case,
          prefix: a.prefix,
        });
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
   * @example schemas.dataType.matriz().getValue() // [[1, 0, 5], [5, 10, 9]]
   * @example schemas.dataType.matriz().getValue({x_size: 4, y_size: 2}) // [[1, 2], [0, 0], [1, 1], [4, 5]]
   */
  public matriz(args?: MatrizProps) {
    return new SchemaField<number[][], MatrizProps>(
      "matriz",
      (a) => {
        const x_size =
          typeof a.x_size === "number" && a.x_size > 0
            ? Number.parseInt(String(a.x_size))
            : CHDataUtils.numberByLimits({ min: 1, max: 10 });
        const y_size =
          typeof a.y_size === "number" && a.y_size > 0
            ? Number.parseInt(String(a.y_size))
            : CHDataUtils.numberByLimits({ min: 1, max: 10 });

        const { min, max } = this.validateMinMax(a.min, a.max);

        const precision =
          typeof a.precision === "number" && a.precision > 0
            ? a.precision
            : undefined;

        return new Array(x_size).fill(0).map(() => {
          return new Array(y_size).fill(0).map(() => {
            return faker.datatype.number({ min, max, precision });
          });
        });
      },
      args || {},
    );
  }

  /**
   * Return one of an array of elements
   * @param args.array Array of elements
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
   * @example schemas.dataType.characters().getValue() // 'v'
   * @example schemas.dataType.characters().getValue({length: 5}) // 'bhtlw'
   * @example schemas.dataType.characters().getValue({length: 5, case: 'upper'}) // 'HQRSD'
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
            charactersToRet = CHDataUtils.characters("lower");
          else if (a.case === "upper") CHDataUtils.characters("upper");
          else charactersToRet = CHDataUtils.characters();
        } else charactersToRet = CHDataUtils.characters();

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
