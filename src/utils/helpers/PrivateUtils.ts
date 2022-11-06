import { CHDataError } from "../../errors/CHDataError";

export class PrivateUtils {
  public static oneOfArray<T = unknown>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  static floatNumber({
    min,
    max,
    precision,
  }: {
    min?: number;
    max?: number;
    precision?: number;
  }): number {
    let minimun: number = typeof min === "number" ? min : -999999;
    let maximun: number;
    let pres: number =
      typeof precision === "number" && precision > 0 && precision <= 20
        ? precision
        : 2;

    if (typeof max === "number") {
      if (minimun) {
        if (max > minimun) maximun = max;
        else maximun = 999999;
      } else maximun = max;
    } else maximun = 999999;

    const val = Math.random() * (maximun - minimun + 1) + minimun;

    return Number(String(val.toFixed(pres)));
  }

  static intNumber({ min, max }: { min?: number; max?: number }): number {
    let minimun: number = typeof min === "number" ? min : -999999;
    let maximun: number;

    if (typeof max === "number") {
      if (minimun) {
        if (max > minimun) maximun = max;
        else maximun = 999999;
      } else maximun = max;
    } else maximun = 999999;

    const val = Math.random() * (maximun - minimun + 1) + minimun;
    return Number.parseInt(String(val));
  }

  static replaceSymbols(symbols: string): string {
    if (typeof symbols !== "string") {
      throw new CHDataError("");
    } else {
      let ret: string = "";

      for (let i = 0; i < symbols.length; i++) {
        let val: string;

        if (symbols[i] === "#")
          val = String(this.intNumber({ min: 0, max: 9 }));
        else val = symbols[i];

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
    } else throw new CHDataError("The text to capitalize is not a string");
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
}
