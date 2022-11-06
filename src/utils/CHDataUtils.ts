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
