import { CSSFunction, CSSSpace } from "../constants/index.js";

export type StringColorFormat = "css" | "binary";
export type NumberColorFormat = "decimal";
export type ColorFormat = StringColorFormat;
export type Casing = "lower" | "upper" | "mixed";

/**
 * Formats the hex format of a generated color string according
 * to options specified by user.
 *
 * @param hexColor Hex color string to be formatted.
 * @param options Options object.
 * @param options.prefix Prefix of the generated hex color. Defaults to `'0x'`.
 * @param options.casing Letter type case of the generated hex color. Defaults to `'mixed'`.
 */
export function formatHexColor(
  hexColor: string,
  options?: {
    prefix?: string;
    casing?: Casing;
  },
): string {
  switch (options?.casing) {
    case "upper":
      hexColor = hexColor.toUpperCase();
      break;
    case "lower":
      hexColor = hexColor.toLowerCase();
      break;
  }
  if (options?.prefix) {
    hexColor = options.prefix + hexColor;
  }
  return hexColor;
}

/**
 * Converts an array of numbers into binary string format.
 *
 * @param values Array of values to be converted.
 */
export function toBinary(values: number[]): string {
  const binary: string[] = values.map((value) => {
    const isFloat = value % 1 !== 0;
    if (isFloat) {
      const buffer = new ArrayBuffer(4);
      new DataView(buffer).setFloat32(0, value);
      const bytes = new Uint8Array(buffer);
      return toBinary(Array.from(bytes)).split(" ").join("");
    }
    return (value >>> 0).toString(2).padStart(8, "0");
  });
  return binary.join(" ");
}

/**
 * Converts an array of numbers into CSS accepted format.
 *
 * @param values Array of values to be converted.
 * @param cssFunction CSS function to be generated for the color. Defaults to `'rgb'`.
 * @param space Color space to format CSS color function with. Defaults to `'sRGB'`.
 */
export function toCSS(
  values: number[],
  cssFunction: CSSFunction = "rgb",
  space: CSSSpace = "sRGB",
): string {
  const percentage = (value: number) => Math.round(value * 100);
  switch (cssFunction) {
    case "rgba":
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;
    case "color":
      return `color(${space} ${values[0]} ${values[1]} ${values[2]})`;
    case "cmyk":
      return `cmyk(${percentage(values[0])}%, ${percentage(
        values[1],
      )}%, ${percentage(values[2])}%, ${percentage(values[3])}%)`;
    case "hsl":
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2],
      )}%)`;
    case "hsla":
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2],
      )}% / ${percentage(values[3])})`;
    case "hwb":
      return `hwb(${values[0]} ${percentage(values[1])}% ${percentage(
        values[2],
      )}%)`;
    case "lab":
      return `lab(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case "lch":
      return `lch(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case "rgb":
    default:
      return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
  }
}

/**
 * Converts an array of color values to the specified color format.
 *
 * @param values Array of color values to be converted.
 * @param format Format of generated RGB color.
 * @param cssFunction CSS function to be generated for the color. Defaults to `'rgb'`.
 * @param space Color space to format CSS color function with. Defaults to `'sRGB'`.
 */
export function toColorFormat(
  values: number[],
  format: ColorFormat,
  cssFunction: CSSFunction = "rgb",
  space: CSSSpace = "sRGB",
): string {
  switch (format) {
    case "css":
      return toCSS(values, cssFunction, space);
    case "binary":
      return toBinary(values);
    default:
      return toCSS(values, cssFunction, space);
  }
}
