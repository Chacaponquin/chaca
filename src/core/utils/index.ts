import { ChacaError } from "../../errors";
import {
  LOWER_CHARACTERS,
  MIXED_CHARACTERS,
  UPPER_CHARACTERS,
} from "../../modules/datatype/constants/characters";
import { SPECIAL_CHARACTERS } from "../../modules/datatype/constants/special_characters";

export type TimeUnits =
  | "years"
  | "seconds"
  | "minutes"
  | "days"
  | "hours"
  | "months";

export class ChacaUtils {
  /**
   * Returns one element from an array
   * @param list Array of values to return
   * @example chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * @example chaca.utils.oneOfArray(['Hi!!!', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   */
  oneOfArray<T = any>(list: T[]) {
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
  replaceSymbols(text: string): string {
    let ret = "";

    for (let i = 0; i < text.length; i++) {
      let val: string;

      if (text[i] === "#") {
        val = this.oneOfArray([
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
        ]);
      } else if (text[i] === "?") {
        val = this.oneOfArray(UPPER_CHARACTERS);
      } else if (text[i] === "$") {
        val = this.oneOfArray(LOWER_CHARACTERS);
      } else if (text[i] === "*") {
        val = this.oneOfArray([
          ...["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          ...MIXED_CHARACTERS,
        ]);
      } else val = text[i];

      ret = ret.concat(val);
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
  public camelCase(text: string): string {
    if (!this.isCapitalized(text)) {
      let returnString = "";
      let mayus = false;

      for (let i = 0; i < text.length; i++) {
        if (text[i] !== " " && !SPECIAL_CHARACTERS.some((c) => c === text[i])) {
          const isOnlyMayus: boolean =
            text[i].toUpperCase() === text[i] &&
            i > 0 &&
            i < text.length - 1 &&
            text[i - 1].toLowerCase() === text[i - 1] &&
            text[i + 1].toLowerCase() === text[i + 1];

          if (isOnlyMayus) {
            mayus = true;
          }

          returnString = returnString.concat(
            mayus ? text[i].toUpperCase() : text[i].toLowerCase(),
          );

          mayus = false;
        } else {
          mayus = true;
          continue;
        }
      }

      return returnString;
    } else {
      return text;
    }
  }

  private isCapitalized(value: string): boolean {
    let returnValue = true;

    for (let i = 0; i < value.length; i++) {
      if (value[i].toUpperCase() === value[i]) {
        if (i === value.length - 1 || i === 0) {
          returnValue = false;
          break;
        } else {
          if (
            value[i - 1].toUpperCase() === value[i - 1] ||
            value[i + 1].toUpperCase() === value[i + 1]
          ) {
            returnValue = false;
            break;
          }
        }
      }
      if (value[i] !== " " && !SPECIAL_CHARACTERS.some((c) => c === value[i])) {
        returnValue = false;
        break;
      }
    }

    return returnValue;
  }

  /**
   * Returns a camel case text in capitalize notation from a string argument
   * @param text string to capitalize
   *
   * @example
   * chaca.utils.camelCase('Hello World') // 'HelloWorld'
   * chaca.utils.camelCase('hiFriend') // 'HiFriend'
   *
   * @returns string
   */
  capitalizeCamelCase(text: string): string {
    const result = this.camelCase(text);
    let newResult = "";

    for (let i = 0; i < result.length; i++) {
      newResult = newResult.concat(
        i === 0 ? result[i].toUpperCase() : result[i],
      );
    }

    return newResult;
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
   * @param param.date date to modify
   * @param param.range time unit (`"years"` | `"seconds"` | `"minutes"` | `"days"`| `"hours"` | `"months"`)
   * @param param.value amount of time unit
   *
   * @returns string
   */
  sumDateRange({
    date,
    range,
    value,
  }: {
    date: Date;
    value: number;
    range: TimeUnits;
  }): Date {
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
}
