import { ChacaError } from "../../errors/ChacaError";

export class PrivateUtils {
  static boolean(): boolean {
    return this.oneOfArray([true, false]);
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
      let retString = "";

      for (const w of words) {
        if (typeof w === "string") {
        } else throw new ChacaError(`${w} is not a string`);
      }

      return retString;
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

  static intNumber({ min, max }: { min?: number; max?: number }): number {
    let minimun: number = typeof min === "number" ? min : -999999;
    let maximun: number;

    if (typeof max === "number") {
      if (minimun) {
        if (max >= minimun) maximun = max;
        else maximun = 999999;
      } else maximun = max;
    } else maximun = 999999;

    const val = Math.random() * (maximun - minimun + 1) + minimun;
    return Number.parseInt(String(val));
  }

  static numbersArray(): string[] {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }

  static replaceSymbols(text: string): string {
    if (typeof text !== "string") {
      return "";
    } else {
      let ret: string = "";

      for (let i = 0; i < text.length; i++) {
        let val: string;

        if (text[i] === "#") {
          val = String(PrivateUtils.intNumber({ min: 0, max: 9 }));
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

  public static capitalizeText(text: string): string {
    if (typeof text === "string") {
      if (!PrivateUtils.isCapitalized(text)) {
        let returnString = "";
        let mayus = false;

        for (let i = 0; i < text.length; i++) {
          if (
            text[i] != " " &&
            text[i] != "_" &&
            text[i] != "-" &&
            text[i] != "(" &&
            text[i] != ")"
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
          value[i] != "_" ||
          value[i] != "-" ||
          value[i] != "(" ||
          value[i] != ")"
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

  static capitalizeTextUpper(text: string): string {
    let result = PrivateUtils.capitalizeText(text);
    let newResult = "";

    for (let i = 0; i < result.length; i++) {
      newResult = newResult.concat(
        i === 0 ? result[i].toUpperCase() : result[i],
      );
    }

    return newResult;
  }
}
