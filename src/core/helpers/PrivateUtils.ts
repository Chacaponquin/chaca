import { ChacaError } from "../../errors/ChacaError.js";
import { Schemas } from "../../schemas/index.js";

type TimeUnits = "years" | "seconds" | "minutes" | "days" | "hours" | "months";
export class PrivateUtils {
  static id() {
    return Schemas.id.mongodbID().getValue();
  }

  static joinWords(words: string[] | string, sep?: string): string {
    const separator = typeof sep === "string" ? sep : "_";
    if (typeof words === "string") {
      let retString = "";

      for (let i = 0; i < words.length; i++) {
        retString = retString.concat(words[i] === " " ? separator : words[i]);
      }

      return retString;
    } else if (Array.isArray(words)) {
      const words: string[] = [];

      for (const w of words) {
        if (typeof w === "string") {
          words.push(w);
        } else throw new ChacaError(`${w} is not a string`);
      }

      return words.join(sep);
    } else
      throw new ChacaError(`${words} is not a string or an array of strings`);
  }

  static specialCharacters(): string[] {
    const special = ".!#$%&'*+-/=?^_`{|}~";
    return special.split("");
  }

  public static oneOfArray<T = unknown>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  static numbersArray(): string[] {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }

  static replaceSymbols(text: string): string {
    if (typeof text !== "string") {
      return "";
    } else {
      let ret = "";

      for (let i = 0; i < text.length; i++) {
        let val: string;

        if (text[i] === "#") {
          val = PrivateUtils.oneOfArray(PrivateUtils.numbersArray());
        } else if (text[i] === "?") {
          val = PrivateUtils.oneOfArray(PrivateUtils.characters("upper"));
        } else if (text[i] === "$") {
          val = PrivateUtils.oneOfArray(PrivateUtils.characters("lower"));
        } else if (text[i] === "*") {
          val = PrivateUtils.oneOfArray([
            ...PrivateUtils.numbersArray(),
            ...PrivateUtils.characters("mixed"),
          ]);
        } else val = text[i];

        ret = ret.concat(val);
      }

      return ret;
    }
  }

  public static camelCaseText(text: string): string {
    if (typeof text === "string") {
      if (!PrivateUtils.isCapitalized(text)) {
        let returnString = "";
        let mayus = false;

        for (let i = 0; i < text.length; i++) {
          if (
            text[i] !== " " &&
            !PrivateUtils.specialCharacters().find((el) => el === text[i])
          ) {
            const isOnlyMayus: boolean =
              text[i].toUpperCase() === text[i] &&
              i > 0 &&
              i < text.length - 1 &&
              text[i - 1].toLowerCase() === text[i - 1] &&
              text[i + 1].toLowerCase() === text[i + 1];

            if (isOnlyMayus) mayus = true;

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
      } else return text;
    } else throw new ChacaError("The text to capitalize is not a string");
  }

  public static isCapitalized(value: string): boolean {
    let returnValue = true;

    if (!(value.toLowerCase() === value)) {
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
        if (
          value[i] === " " ||
          value[i] !== "_" ||
          value[i] !== "-" ||
          value[i] !== "(" ||
          value[i] !== ")"
        ) {
          returnValue = false;
          break;
        }
      }
    }
    return returnValue;
  }

  public static characters(type?: "lower" | "upper" | "mixed"): string[] {
    const allCharacters = "abcdefghijklmnopqrstuvwxyz";

    if (type === "lower") return allCharacters.split("");
    else if (type === "upper")
      return allCharacters.split("").map((el) => el.toUpperCase());
    else {
      const mayus = allCharacters.split("").map((el) => el.toUpperCase());
      const minus = allCharacters.split("");
      mayus.forEach((el) => minus.push(el));

      return minus;
    }
  }

  static capitalizeCamelCase(text: string): string {
    const result = PrivateUtils.camelCaseText(text);
    let newResult = "";

    for (let i = 0; i < result.length; i++) {
      newResult = newResult.concat(
        i === 0 ? result[i].toUpperCase() : result[i],
      );
    }

    return newResult;
  }

  static capitalizeWord(word: string): string {
    let newResult = "";

    for (let i = 0; i < word.length; i++) {
      newResult = newResult.concat(i === 0 ? word[i].toUpperCase() : word[i]);
    }

    return newResult;
  }

  static capitalizeText(text: string): string {
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

  static sumDateRange(date: Date, value: number, range: TimeUnits): Date {
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
        throw new ChacaError("Invalid range");
    }

    return date;
  }
}
