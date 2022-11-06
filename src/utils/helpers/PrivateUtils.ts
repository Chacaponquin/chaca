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
}
