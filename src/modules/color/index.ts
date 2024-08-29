import { ChacaUtils } from "../../core/utils";
import { DatatypeModule } from "../datatype";
import { Module } from "../Module";
import { CSSSpace, CSS_FUNCTIONS, CSS_SPACES, CSSFunction } from "./constants";
import { Casing, ColorFormat, toColorFormat, formatHexColor } from "./helpers";

type RgbProps = {
  prefix: string;
  casing: Casing;
  format: "hex" | ColorFormat;
  includeAlpha?: boolean;
};

type CmykProps = {
  format: ColorFormat;
};

type HslProps = {
  format: ColorFormat;
  includeAlpha: boolean;
};

type HwbProps = { format: ColorFormat };

type LchProps = { format: ColorFormat };

type ColorByCSSColorSpaceProps = { format: ColorFormat; space: CSSSpace };

export class ColorModule {
  private readonly datatypeModule = new DatatypeModule();
  private utils = new ChacaUtils();

  readonly constants = {
    cssFunctions: CSS_FUNCTIONS,
    cssSpaces: CSS_SPACES,
  };

  /**
   * Returns a random css supported color function name.
   *
   * @example
   * modules.color.cssSupportedFunction() // schema
   * modules.color.cssSupportedFunction().getValue() // 'rgb'
   */
  cssSupportedFunction(): Module<string> {
    return new Module(() => {
      return this.utils.oneOfArray(CSS_FUNCTIONS as any);
    }, {});
  }

  /**
   * Returns a random css supported color space name.
   *
   * @example
   * modules.color.cssSupportedSpace() // schema
   * modules.color.cssSupportedSpace().getValue() // 'display-p3'
   */
  cssSupportedSpace(): Module<CSSSpace> {
    return new Module(() => this.utils.oneOfArray(CSS_SPACES as any), {});
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
   * modules.color.rgb().getValue() // schema
   * modules.color.rgb().getValue({ prefix: '#' }) // '#ffffFF'
   * modules.color.rgb().getValue({ casing: 'upper' }) // '0xFFFFFF'
   * modules.color.rgb().getValue({ casing: 'lower' }) // '0xffffff'
   * modules.color.rgb().getValue({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb().getValue({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb().getValue({ format: 'css' }) // 'rgb(255, 0, 0)'
   * modules.color.rgb().getValue({ format: 'binary' }) // '10000000 00000000 11111111'
   */
  rgb(args?: Partial<RgbProps>): Module<string, Partial<RgbProps>> {
    return new Module<string, Partial<RgbProps>>((a) => {
      const {
        format = "hex",
        includeAlpha,
        casing = "mixed",
        prefix = "#",
      } = a;

      let color: string | number[];
      let cssFunction: CSSFunction = "rgb";
      if (format === "hex") {
        color = this.datatypeModule.hexadecimal().getValue({
          length: includeAlpha ? 8 : 6,
        });

        color = formatHexColor(color, args);
        return color;
      }
      color = Array.from({ length: 3 }).map(() =>
        this.datatypeModule.int().getValue({ min: 0, max: 255 }),
      );
      if (includeAlpha) {
        color.push(
          this.datatypeModule
            .float()
            .getValue({ min: 0, max: 1, precision: 2 }),
        );
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
    }, args || {});
  }

  /**
   * Returns a CMYK color.
   *
   * @param options.format Format of generated CMYK color. Defaults to `'css'`.
   *
   * @example
   * modules.color.cmyk() // schema
   * modules.color.cmyk().getValue() // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk().getValue({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk().getValue({ format: 'binary' }) // (8-32 bits) x 4
   */
  cmyk(args?: Partial<CmykProps>): Module<string, Partial<CmykProps>> {
    return new Module<string, Partial<CmykProps>>((a) => {
      const { format = "css" } = a;

      const color: number[] = Array.from({ length: 4 }).map(() =>
        this.datatypeModule.float().getValue({ min: 0, max: 1, precision: 2 }),
      );

      return toColorFormat(color, format, "cmyk");
    }, args || {});
  }

  /**
   * Returns an HSL color.
   *
   * @param options.format Format of generated HSL color. Defaults to `'css'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * modules.color.hsl() // schema
   * modules.color.hsl().getValue({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * modules.color.hsl().getValue({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * modules.color.hsl().getValue({ format: 'binary' }) // (8-32 bits) x 3
   * modules.color.hsl().getValue({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   */
  hsl(args?: Partial<HslProps>): Module<string, Partial<HslProps>> {
    return new Module<string, Partial<HslProps>>((a) => {
      const { format = "css", includeAlpha } = a;

      const hsl: number[] = [
        this.datatypeModule.int().getValue({ min: 0, max: 360 }),
      ];

      for (let i = 0; i < (includeAlpha ? 3 : 2); i++) {
        const value = this.datatypeModule
          .float()
          .getValue({ min: 0, max: 1, precision: 3 });

        hsl.push(value);
      }

      return toColorFormat(hsl, format, includeAlpha ? "hsla" : "hsl");
    }, args || {});
  }

  /**
   * Returns an HWB color.
   *
   * @param options.format Format of generated HWB color. Defaults to `'css'`.
   *
   * @example
   * modules.color.hwb() // schema
   * modules.color.hwb().getValue({ format: 'css' }) // hwb(194 0% 0%)
   * modules.color.hwb().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  hwb(args?: Partial<HwbProps>): Module<string, Partial<HwbProps>> {
    return new Module<string, Partial<HwbProps>>((a) => {
      const { format = "css" } = a;

      const hsl: number[] = [
        this.datatypeModule.int().getValue({ min: 0, max: 360 }),
      ];

      for (let i = 0; i < 2; i++) {
        hsl.push(
          this.datatypeModule
            .float()
            .getValue({ min: 0, max: 1, precision: 3 }),
        );
      }

      return toColorFormat(hsl, format, "hwb");
    }, args || {});
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
   * modules.color.lch() // schema
   * modules.color.lch().getValue({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * modules.color.lch().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  lch(args?: Partial<LchProps>): Module<string, Partial<LchProps>> {
    return new Module((a) => {
      const { format = "css" } = a;

      const lch = [
        this.datatypeModule.float().getValue({ min: 0, max: 1, precision: 6 }),
      ];

      for (let i = 0; i < 2; i++) {
        lch.push(
          this.datatypeModule
            .number()
            .getValue({ min: 0, max: 230, precision: 1 }),
        );
      }

      return toColorFormat(lch, format, "lch");
    }, args || {});
  }

  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options.format Format of generated color. Defaults to `'css'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * modules.color.colorByCSSColorSpace() // schema
   * modules.color.colorByCSSColorSpace().getValue({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * modules.color.colorByCSSColorSpace().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  colorByCSSColorSpace(
    args?: Partial<ColorByCSSColorSpaceProps>,
  ): Module<string, Partial<ColorByCSSColorSpaceProps>> {
    return new Module<string, Partial<ColorByCSSColorSpaceProps>>((a) => {
      const { format = "css", space = "sRGB" } = a;

      const color = Array.from({ length: 3 }).map(() =>
        this.datatypeModule
          .float()
          .getValue({ min: 0, max: 1, precision: 0.0001 }),
      );

      return toColorFormat(color, format, "color", space);
    }, args || {});
  }
}
