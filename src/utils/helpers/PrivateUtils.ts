import { CHDataError } from "../../errors/CHDataError";

export class PrivateUtils {
  public static oneOfArray<T = unknown>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }

  static intNumber({ min, max }: { min?: number; max?: number }): number {
    let minimun: number | undefined = typeof min === "number" ? min : undefined;
    let maximun: number | undefined;

    if (typeof max === "number") {
      if (minimun) {
        if (max > minimun) maximun = max;
        else maximun = undefined;
      } else maximun = max;
    } else maximun = undefined;

    let val: number;
    if (!maximun && !minimun) {
      maximun = Math.random() * 999999;
      val = Math.floor(Math.random() * maximun) * this.oneOfArray([-1, 1]);
    } else if (maximun && !minimun) {
      val =
        Math.floor(Math.random() * maximun) -
        Math.floor(Math.random() * 999999);
    } else if (minimun && !maximun) {
      maximun = Math.random() * 999999;
      val = Math.floor(Math.random() * maximun) + minimun;
    } else {
      console.log(maximun, "buenas");
      console.log(minimun, "buenas");
      val = Math.floor(Math.random() * maximun!) + minimun!;
    }

    console.log(val);
    return val;
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
