import { PrivateUtils } from "./PrivateUtils";
export const ChacaUtils = {
  /**
   * Returns one element from an array
   * @param list Array of values to return
   * @example chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * @example chaca.utils.oneOfArray(['Buenas', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   */
  oneOfArray: PrivateUtils.oneOfArray,
  replaceSymbols: PrivateUtils.replaceSymbols,
  capitalizeText: PrivateUtils.capitalizeText,
  joinWords: PrivateUtils.joinWords,
};
