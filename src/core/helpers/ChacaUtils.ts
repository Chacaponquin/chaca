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
   * Returns a camel case notation text from a string argument
   * @param text string to capitalize
   *
   * @example
   * chaca.utils.camelCase('Hello World') // 'helloWorld'
   * chaca.utils.camelCase('hiFriend') // 'hiFriend'
   *
   * @returns string
   */
  camelCase: PrivateUtils.camelCase,
  /**
   * Returns a camel case text in capitalize notation from a string argument
   * @param text string to capitalize
   *
   * @example
   * chaca.utils.camelCase('Hello World') // 'HelloWorld'
   * chaca.utils.camelCase('hiFriend') // 'HiFriend'
   *
   * @returns string
   */
  capitalizeCamelCase: PrivateUtils.capitalizeCamelCase,
  /**
   * @param word The string to capitalize
   *
   * @example
   * chaca.utils.capitalizeWord('hello') // 'Hello'
   * chaca.utils.capitalizeWord('hi there') // 'Hi there'
   *
   * @returns string
   */
  capitalizeWord: PrivateUtils.capitalizeWord,
  /**
   * Returns a string with all the words capitalized
   * @param text string with the texto to capitalize
   *
   * @example
   * chaca.utils.capitalize('hi there friend') // 'Hi There Friend'
   * chaca.utils.capitalize(' helloWorld') // ' HelloWorld'
   *
   * @returns string
   */
  capitalize: PrivateUtils.capitalize,

  sumDateRange: PrivateUtils.sumDateRange,
};
