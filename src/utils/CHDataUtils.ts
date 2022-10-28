import { faker } from "@faker-js/faker";
export class CHDataUtils {
  public static oneOfArray<T = any>(list: T[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
  public static numberByLimits({ min, max }: { min: number; max: number }) {
    return faker.datatype.number({ min, max, precision: 1 });
  }
  public static characters(type?: "lower" | "upper"): string[] {
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

  public static capitalizeText(text: string): string {
    if (!this.isCapitalized(text)) {
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
  }

  public static capitalizeMayusText(text: string): string {
    let result = this.capitalizeText(text);
    let newResult = "";

    for (let i = 0; i < result.length; i++) {
      newResult = newResult.concat(
        i === 0 ? result[i].toUpperCase() : result[i],
      );
    }

    return newResult;
  }
}
