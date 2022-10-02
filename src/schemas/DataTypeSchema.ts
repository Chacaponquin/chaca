import { faker } from "@faker-js/faker";
import { CHDataError } from "../errors/CHDataError";
import { CHDataUtils } from "../utils/CHDataUtils";
import { ReturnValue } from "../utils/interfaces/value.interface";
import { SchemaField } from "../utils/SchemaField";

type NumberArgs = {
  min?: number;
  max?: number;
  precision?: number;
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
  array: ReturnValue[];
};

export class DataTypeSchema {
  public boolean() {
    return new SchemaField<boolean>("boolean", faker.datatype.boolean, {});
  }

  public number(args?: NumberArgs) {
    return new SchemaField<number, NumberArgs>(
      "number",
      (a) => {
        const precision = a.precision && a.precision > 0 ? a.precision : 1;
        let min = a.min || undefined;
        let max = a.max || undefined;

        if (min && max && min > max) {
          let temp = max;
          max = min;
          min = temp;
        }

        return faker.datatype.number({ max, min, precision });
      },
      args || {}
    );
  }

  public hexadecimal(args?: HexadecimalProps) {
    return new SchemaField<string, HexadecimalProps>(
      "hexadecimal",
      (a) => {
        const length = a.length && a.length > 0 ? a.length : undefined;

        return faker.datatype.hexadecimal({
          length,
          case: a.case,
          prefix: a.prefix,
        });
      },
      args || {}
    );
  }

  public float(args?: NumberArgs) {
    return new SchemaField<number, NumberArgs>(
      "float",
      (a) => {
        const precision = a.precision && a.precision > 0 ? a.precision : 0.1;
        let min = a.min || undefined;
        let max = a.max || undefined;

        if (min && max && min > max) {
          let temp = max;
          max = min;
          min = temp;
        }

        return faker.datatype.float({ min, max, precision });
      },
      args || {}
    );
  }

  public matriz(args?: MatrizProps) {
    return new SchemaField<number[][], MatrizProps>(
      "matriz",
      (a) => {
        const x_size =
          a.x_size || CHDataUtils.numberByLimits({ min: 1, max: 10 });
        const y_size =
          a.y_size || CHDataUtils.numberByLimits({ min: 1, max: 10 });
        let min = a.min || undefined;
        let max = a.max || undefined;

        if (min && max && min > max) {
          let temp = max;
          max = min;
          min = temp;
        }

        const precision =
          a.precision && a.precision > 0 ? a.precision : undefined;

        return new Array(x_size).fill(0).map((el) => {
          return new Array(y_size).fill(0).map((el) => {
            return faker.datatype.number({ min, max, precision });
          });
        });
      },
      args || {}
    );
  }

  public customArray(args?: CustomArrayProps) {
    return new SchemaField<ReturnValue, CustomArrayProps>(
      "customArray",
      (a) => {
        if (Array.isArray(a.array)) {
          const array = a.array || [1, 2, 3, 4];

          return CHDataUtils.oneOfArray(array);
        } else
          throw new CHDataError(
            "The argument of custom array must be an array of values"
          );
      },
      args || { array: [1, 2, 3, 4] }
    );
  }
}
