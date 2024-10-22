import { ChacaError } from "../../errors";
import { DatatypeModule } from "../../modules/datatype";
import {
  LOWER_CHARACTERS,
  MIXED_CHARACTERS,
  UPPER_CHARACTERS,
} from "../../modules/datatype/constants/characters";
import { camelCase, snakeCase } from "change-case";

export type TimeUnits =
  | "years"
  | "seconds"
  | "minutes"
  | "days"
  | "hours"
  | "months";

export type SumDateRangeProps = {
  date: Date;
  value: number;
  range: TimeUnits;
};

interface PickProps<T> {
  values: T[];
  count: number;
}

interface MultipleProps<T = any> {
  count: number;
  generator(index: number): T;
}

interface ReplaceSymbolsProps {
  symbols?: Record<string, string[]>;
  banned?: string[];
}

export class ChacaUtils {
  private readonly datatypeModule = new DatatypeModule(this);

  /**
   * Returns one element from an array
   *
   * @param list Array of values to return
   * @example
   * chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * chaca.utils.oneOfArray(['Hi!!!', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   */
  oneOfArray<T>(list: ReadonlyArray<T>) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * Parses the given string symbol by symbols and replaces the placeholder appropriately.
   *
   * - `#` will be replaced with a digit (`0` - `9`).
   * - `?` will be replaced with an upper letter ('A' - 'Z')
   * - `$` will be replaced with a lower letter ('a' - 'z')
   * - `*` will be replaced with either a digit or letter.
   *
   * @param text The template string to parse.
   *
   * @example
   * chaca.utils.replaceSymbols('#####') // '98441'
   * chaca.utils.replaceSymbols('?????') // 'ZYRQQ'
   * chaca.utils.replaceSymbols('***$$') // '4Z3pa'
   * chaca.utils.replaceSymbols('Your pin is: #?*#?*') // 'Your pin is: 0T85L1'
   *
   * @returns string
   */
  replaceSymbols(
    text: string,
    { banned, symbols: ownSymbols }: ReplaceSymbolsProps = {
      banned: [],
      symbols: {},
    },
  ): string {
    let ret = "";

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const symbols: Record<string, string[]> = {
      "#": numbers,
      "?": UPPER_CHARACTERS,
      $: LOWER_CHARACTERS,
      "*": [...numbers, ...MIXED_CHARACTERS],
      ...ownSymbols,
    };

    for (let i = 0; i < text.length; i++) {
      let val: string = text[i];

      for (const [key, values] of Object.entries(symbols)) {
        if (text[i] === key) {
          const options = values.filter((v) => {
            if (banned) {
              return !banned.includes(v);
            }

            return true;
          });

          if (options.length === 0) {
            throw new ChacaError(
              `For symbol '${key}' there are no values to choose`,
            );
          }

          val = this.oneOfArray(options);

          break;
        }
      }

      ret += val;
    }

    return ret;
  }

  /**
   * Returns a camel case notation text from a string argument
   * @param text string to capitalize
   *
   * @example
   * chaca.utils.camelCase('Hello World') // 'helloWorld'
   * chaca.utils.camelCase('hiFriend') // 'hiFriend'
   *
   * @returns string
   */
  camelCase(text: string): string {
    return camelCase(text, {});
  }

  snakeCase(text: string): string {
    return snakeCase(text, {});
  }

  /**
   * @param word The string to capitalize
   *
   * @example
   * chaca.utils.capitalizeWord('hello') // 'Hello'
   * chaca.utils.capitalizeWord('hi there') // 'Hi there'
   *
   * @returns string
   */
  capitalizeWord(word: string): string {
    let newResult = "";

    for (let i = 0; i < word.length; i++) {
      newResult = newResult.concat(i === 0 ? word[i].toUpperCase() : word[i]);
    }

    return newResult;
  }

  /**
   * Returns a string with all the words capitalized
   * @param text string with the texto to capitalize
   *
   * @example
   * chaca.utils.capitalize('hi there friend') // 'Hi There Friend'
   * chaca.utils.capitalize(' helloWorld') // ' HelloWorld'
   *
   * @returns string
   */
  capitalize(text: string): string {
    let newResult = "";

    for (let i = 0; i < text.length; i++) {
      if (i === 0 && text[i] !== " ") {
        newResult = newResult.concat(text[i].toUpperCase());
      } else if (text[i - 1] && text[i - 1] === " ") {
        newResult = newResult.concat(text[i].toUpperCase());
      } else {
        newResult = newResult.concat(text[i]);
      }
    }

    return newResult;
  }

  /**
   * Sum a range value to a date
   *
   * @param param.date date to modify
   * @param param.range time unit (`"years"` | `"seconds"` | `"minutes"` | `"days"`| `"hours"` | `"months"`)
   * @param param.value amount of time unit
   *
   * @returns string
   */
  sumDateRange({ date, range, value }: SumDateRangeProps): Date {
    switch (range) {
      case "years":
        date.setFullYear(date.getFullYear() + value);
        break;
      case "months":
        date.setMonth(date.getMonth() + value);
        break;
      case "days":
        date.setDate(date.getDate() + value);
        break;
      case "hours":
        date.setHours(date.getHours() + value);
        break;
      case "minutes":
        date.setMinutes(date.getMinutes() + value);
        break;
      case "seconds":
        date.setSeconds(date.getSeconds() + value);
        break;
      default:
        throw new ChacaError("Invalid date range");
    }

    return date;
  }

  /**
   * Chooses a series of elements from an array of values, preventing an element from being selected more than once
   *
   * @param args.values Values array
   * @param args.count Number of items to select
   *
   * @example
   * chaca.utils.pick({ values: [1, 2, 3, 4, 5], count: 2 }) // [2, 4]
   * chaca.utils.pick({ values: [1, 2, 3, 4, 5], count: 3 }) // [1, 5, 3]
   */
  pick<T = any>({ values, count }: PickProps<T>): T[] {
    if (count > values.length) {
      throw new ChacaError(
        `The number of elements to select must be less or equal than the array length`,
      );
    }

    if (count === values.length) {
      return values;
    } else {
      const generate = (banned: number[]): number => {
        let num = this.datatypeModule.int({
          min: 0,
          max: values.length,
        });

        while (banned.includes(num)) {
          num = this.datatypeModule.int({
            min: 0,
            max: values.length,
          });
        }

        return num;
      };

      const result = [] as T[];
      const banned = [] as number[];

      let i = 0;

      while (i < count) {
        const index = generate(banned);

        banned.push(index);
        result.push(values[index]);

        i++;
      }

      return result;
    }
  }

  /**
   * Generates an array containing values returned by the given method.
   *
   * @param args.count The number of elements to generate.
   *
   * @example
   * chaca.utils.multiple({ generator: () => modules.person.firstName(), count: 3 }) // [ 'Aniya', 'Norval', 'Dallin' ]
   * chaca.utils.multiple({ generator: () => modules.person.firstName(), count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
   * chaca.utils.multiple({ generator: (i) => `element-${i}`, count: 3 }) // [ 'element-0', 'element-1', 'element-2' ]
   */
  multiple<T = any>({ generator, count }: MultipleProps<T>): T[] {
    const result = [] as T[];

    for (let i = 0; i < count; i++) {
      const value = generator(i);
      result.push(value);
    }

    return result;
  }
}
