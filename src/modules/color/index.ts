import { ChacaUtils } from "../../core/utils";
import { DatatypeModule } from "../datatype";
import {
  CSSSpace,
  CSS_FUNCTIONS,
  CSS_SPACES,
  CSSFunction,
  HUMAN_COLORS,
} from "./constants";
import { Casing, ColorFormat, toColorFormat, formatHexColor } from "./helpers";

export type RgbProps = {
  prefix?: string;
  casing?: Casing;
  format?: "hex" | ColorFormat;
  includeAlpha?: boolean;
};

export type CmykProps = {
  format?: ColorFormat;
};

export type HslProps = {
  format?: ColorFormat;
  includeAlpha?: boolean;
};

export type HwbProps = { format?: ColorFormat };

export type LchProps = { format?: ColorFormat };

export type ColorByCSSColorSpaceProps = {
  format?: ColorFormat;
  space?: CSSSpace;
};

export class ColorModule {
  readonly constants = {
    cssFunctions: CSS_FUNCTIONS,
    cssSpaces: CSS_SPACES,
    human: HUMAN_COLORS,
  };

  /**
   * Returns a random human-readable color name.
   *
   * @example
   * modules.color.human() // 'blue'
   */
  human(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(HUMAN_COLORS);
  }

  /**
   * Returns a random css supported color function name.
   *
   * @example
   * modules.color.cssSupportedFunction() // 'rgb'
   */
  cssSupportedFunction() {
    const utils = new ChacaUtils();
    const value = utils.oneOfArray(CSS_FUNCTIONS);
    return value;
  }

  /**
   * Returns a random css supported color space name.
   *
   * @example
   * modules.color.cssSupportedSpace() // 'display-p3'
   */
  cssSupportedSpace() {
    const utils = new ChacaUtils();
    return utils.oneOfArray(CSS_SPACES);
  }

  /**
   * Returns an RGB color.
   *
   * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'0x'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'mixed'`.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * modules.color.rgb({ prefix: '#' }) // '#ffffFF'
   * modules.color.rgb({ casing: 'upper' }) // '0xFFFFFF'
   * modules.color.rgb({ casing: 'lower' }) // '0xffffff'
   * modules.color.rgb({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * modules.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   */
  rgb({
    format = "hex",
    includeAlpha = false,
    casing = "mixed",
    prefix = "#",
  }: RgbProps = {}): string {
    const datatypeModule = new DatatypeModule();

    let color: string | number[];
    let cssFunction: CSSFunction = "rgb";

    if (format === "hex") {
      color = datatypeModule.hexadecimal({
        length: includeAlpha ? 8 : 6,
      });

      color = formatHexColor(color, { prefix, casing });
      return color;
    }

    color = Array.from({ length: 3 }).map(() =>
      datatypeModule.int({ min: 0, max: 255 }),
    );

    if (includeAlpha) {
      color.push(datatypeModule.float({ min: 0, max: 1, precision: 2 }));
      cssFunction = "rgba";
    }

    const returnColor = prefix + toColorFormat(color, format, cssFunction);
    if (casing === "lower") {
      return returnColor.toLowerCase();
    } else if (casing === "upper") {
      return returnColor.toUpperCase();
    } else {
      return returnColor;
    }
  }

  /**
   * Returns a CMYK color.
   *
   * @param options.format Format of generated CMYK color. Defaults to `'css'`.
   *
   * @example
   * modules.color.cmyk() // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   */
  cmyk({ format = "css" }: CmykProps = {}): string {
    const datatypeModule = new DatatypeModule();

    const color: number[] = Array.from({ length: 4 }).map(() =>
      datatypeModule.float({ min: 0, max: 1, precision: 2 }),
    );

    return toColorFormat(color, format, "cmyk");
  }

  /**
   * Returns an HSL color.
   *
   * @param options.format Format of generated HSL color. Defaults to `'css'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * modules.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * modules.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * modules.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
   * modules.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   */
  hsl({ format = "css", includeAlpha = false }: HslProps = {}): string {
    const datatypeModule = new DatatypeModule();

    const hsl: number[] = [datatypeModule.int({ min: 0, max: 360 })];

    for (let i = 0; i < (includeAlpha ? 3 : 2); i++) {
      const value = datatypeModule.float({ min: 0, max: 1, precision: 3 });

      hsl.push(value);
    }

    return toColorFormat(hsl, format, includeAlpha ? "hsla" : "hsl");
  }

  /**
   * Returns an HWB color.
   *
   * @param options.format Format of generated HWB color. Defaults to `'css'`.
   *
   * @example
   * modules.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * modules.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   */
  hwb({ format = "css" }: HwbProps = {}): string {
    const datatypeModule = new DatatypeModule();

    const hsl: number[] = [datatypeModule.int({ min: 0, max: 360 })];

    for (let i = 0; i < 2; i++) {
      hsl.push(datatypeModule.float({ min: 0, max: 1, precision: 3 }));
    }

    return toColorFormat(hsl, format, "hwb");
  }

  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options.format Format of generated LCH color. Defaults to `'decimal'`.
   *
   * @example
   * modules.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * modules.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   */
  lch({ format = "css" }: LchProps = {}): string {
    const datatypeModule = new DatatypeModule();

    const lch = [datatypeModule.float({ min: 0, max: 1, precision: 6 })];

    for (let i = 0; i < 2; i++) {
      lch.push(datatypeModule.number({ min: 0, max: 230, precision: 1 }));
    }

    return toColorFormat(lch, format, "lch");
  }

  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options.format Format of generated color. Defaults to `'css'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * modules.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * modules.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
   */
  colorByCSSColorSpace({
    format = "css",
    space = "sRGB",
  }: ColorByCSSColorSpaceProps = {}) {
    const datatypeModule = new DatatypeModule();

    const color = Array.from({ length: 3 }).map(() =>
      datatypeModule.float({ min: 0, max: 1, precision: 4 }),
    );

    return toColorFormat(color, format, "color", space);
  }
}
