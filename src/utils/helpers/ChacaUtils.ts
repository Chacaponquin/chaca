import { PrivateUtils } from "./PrivateUtils.js";
export const ChacaUtils = {
  /**
   * Returns one element from an array
   * @param list Array of values to return
   * @example chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * @example chaca.utils.oneOfArray(['Buenas', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   */
  oneOfArray: PrivateUtils.oneOfArray,
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
  replaceSymbols: PrivateUtils.replaceSymbols,
  /**
   * Returns a text capitalized from a string argument
   * @param text string to capitalize
   *
   * @example
   * chaca.utils.capitalizeText('Hello World') // 'helloWorld'
   * chaca.utils.capitalizeText('hiFriend') // 'hiFriend'
   */
  capitalizeText: PrivateUtils.capitalizeText,
  /**
   * Concat words with a separator
   * @param words string or array of strings with thw words that you want concat
   * @param sep `optional` separator between words. Deafult `'_'`
   * @example
   * chaca.utils.joinWords('hi there friend') // 'hi_there_friend'
   * chaca.utils.joinWords('hi there friend', '*') // 'hi*there*friend'
   * chaca.utils.joinWords(['hi','there','friend'], '+') // 'hi+there+friends'
   * @returns string
   */
  joinWords: PrivateUtils.joinWords,
};
