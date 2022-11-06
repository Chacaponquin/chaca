import { faker } from "@faker-js/faker";
import { PrivateUtils } from "./helpers/PrivateUtils";
export class CHDataUtils {
  /**
   * Returns one element from an array
   * @param list Array of values to return
   * @example chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * @example chaca.utils.oneOfArray(['Buenas', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   */
  public static oneOfArray = PrivateUtils.oneOfArray;
  public static replaceSymbols = PrivateUtils.replaceSymbols;
  public static capitalizeText = PrivateUtils.capitalizeText;

  public static numberByLimits({
    min,
    max,
  }: {
    min: number;
    max: number;
  }): number {
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
