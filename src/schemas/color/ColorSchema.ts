import { ChacaUtils } from "../../core/helpers/ChacaUtils.js";
import { SchemaField } from "../SchemaField.js";
import {
  CSSSpace,
  CSS_FUNCTIONS,
  CSS_SPACES,
  CSSFunction,
} from "./constants/index.js";
import {
  Casing,
  ColorFormat,
  toColorFormat,
  formatHexColor,
} from "./helpers/index.js";
import { DataTypeSchema } from "../dataType/DataTypeSchema.js";

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

export class ColorSchema {
  private readonly dataTypeSchema = new DataTypeSchema();
  private utils = new ChacaUtils();

  private readonly constants = {
    cssFunctions: CSS_FUNCTIONS,
    cssSpaces: CSS_SPACES,
  };

  /**
   * Returns a random css supported color function name.
   *
   * @example
   * schemas.color.cssSupportedFunction() // schema
   * schemas.color.cssSupportedFunction().getValue() // 'rgb'
   */
  cssSupportedFunction(): SchemaField<string> {
    return new SchemaField(
      "cssSupportedFunction",
      () => {
        return this.utils.oneOfArray(CSS_FUNCTIONS as any);
      },
      {},
    );
  }

  /**
   * Returns a random css supported color space name.
   *
   * @example
   * schemas.color.cssSupportedSpace() // schema
   * schemas.color.cssSupportedSpace().getValue() // 'display-p3'
   */
  cssSupportedSpace(): SchemaField<CSSSpace> {
    return new SchemaField(
      "cssSupportedSpace",
      () => this.utils.oneOfArray(CSS_SPACES as any),
      {},
    );
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
   * schemas.color.rgb().getValue() // schema
   * schemas.color.rgb().getValue({ prefix: '#' }) // '#ffffFF'
   * schemas.color.rgb().getValue({ casing: 'upper' }) // '0xFFFFFF'
   * schemas.color.rgb().getValue({ casing: 'lower' }) // '0xffffff'
   * schemas.color.rgb().getValue({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * schemas.color.rgb().getValue({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * schemas.color.rgb().getValue({ format: 'css' }) // 'rgb(255, 0, 0)'
   * schemas.color.rgb().getValue({ format: 'binary' }) // '10000000 00000000 11111111'
   */
  rgb(args?: Partial<RgbProps>): SchemaField<string, Partial<RgbProps>> {
    return new SchemaField<string, Partial<RgbProps>>(
      "rgb",
      (a) => {
        const {
          format = "hex",
          includeAlpha,
          casing = "mixed",
          prefix = "#",
        } = a;

        let color: string | number[];
        let cssFunction: CSSFunction = "rgb";
        if (format === "hex") {
          color = this.dataTypeSchema.hexadecimal().getValue({
            length: includeAlpha ? 8 : 6,
          });

          color = formatHexColor(color, args);
          return color;
        }
        color = Array.from({ length: 3 }).map(() =>
          this.dataTypeSchema.int().getValue({ min: 0, max: 255 }),
        );
        if (includeAlpha) {
          color.push(
            this.dataTypeSchema
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
      },
      args || {},
    );
  }

  /**
   * Returns a CMYK color.
   *
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * schemas.color.cmyk() // schema
   * schemas.color.cmyk().getValue() // cmyk(100%, 0%, 0%, 0%)
   * schemas.color.cmyk().getValue({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * schemas.color.cmyk().getValue({ format: 'binary' }) // (8-32 bits) x 4
   */
  cmyk(args?: Partial<CmykProps>): SchemaField<string, Partial<CmykProps>> {
    return new SchemaField<string, Partial<CmykProps>>(
      "cmyk",
      (a) => {
        const { format = "css" } = a;

        const color: number[] = Array.from({ length: 4 }).map(() =>
          this.dataTypeSchema
            .float()
            .getValue({ min: 0, max: 1, precision: 2 }),
        );

        return toColorFormat(color, format, "cmyk");
      },
      args || {},
    );
  }

  /**
   * Returns an HSL color.
   *
   * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * schemas.color.hsl() // schema
   * schemas.color.hsl().getValue({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * schemas.color.hsl().getValue({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * schemas.color.hsl().getValue({ format: 'binary' }) // (8-32 bits) x 3
   * schemas.color.hsl().getValue({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   */
  hsl(args?: Partial<HslProps>): SchemaField<string, Partial<HslProps>> {
    return new SchemaField<string, Partial<HslProps>>(
      "hsl",
      (a) => {
        const { format = "css", includeAlpha } = a;

        const hsl: number[] = [
          this.dataTypeSchema.int().getValue({ min: 0, max: 360 }),
        ];

        for (let i = 0; i < (includeAlpha ? 3 : 2); i++) {
          hsl.push(
            this.dataTypeSchema
              .float()
              .getValue({ min: 0, max: 1, precision: 3 }),
          );
        }

        return toColorFormat(hsl, format, includeAlpha ? "hsla" : "hsl");
      },
      args || {},
    );
  }

  /**
   * Returns an HWB color.
   *
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * schemas.color.hwb() // schema
   * schemas.color.hwb().getValue({ format: 'css' }) // hwb(194 0% 0%)
   * schemas.color.hwb().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  hwb(args?: Partial<HwbProps>): SchemaField<string, Partial<HwbProps>> {
    return new SchemaField<string, Partial<HwbProps>>(
      "hwb",
      (a) => {
        const { format = "css" } = a;

        const hsl: number[] = [
          this.dataTypeSchema.int().getValue({ min: 0, max: 360 }),
        ];

        for (let i = 0; i < 2; i++) {
          hsl.push(
            this.dataTypeSchema
              .float()
              .getValue({ min: 0, max: 1, precision: 3 }),
          );
        }

        return toColorFormat(hsl, format, "hwb");
      },
      args || {},
    );
  }

  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * schemas.color.lch() // schema
   * schemas.color.lch().getValue() // [0.522345, 72.2, 56.2]
   * schemas.color.lch().getValue({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
   * schemas.color.lch().getValue({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * schemas.color.lch().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  lch(args?: Partial<LchProps>): SchemaField<string, Partial<LchProps>> {
    return new SchemaField(
      "lch",
      (a) => {
        const { format = "css" } = a;

        const lch = [
          this.dataTypeSchema
            .float()
            .getValue({ min: 0, max: 1, precision: 6 }),
        ];

        for (let i = 0; i < 2; i++) {
          lch.push(
            this.dataTypeSchema
              .number()
              .getValue({ min: 0, max: 230, precision: 1 }),
          );
        }

        return toColorFormat(lch, format, "lch");
      },
      args || {},
    );
  }

  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * schemas.color.colorByCSSColorSpace() // schema
   * schemas.color.colorByCSSColorSpace().getValue() // [0.93, 1, 0.82]
   * schemas.color.colorByCSSColorSpace().getValue({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * schemas.color.colorByCSSColorSpace().getValue({ format: 'binary' }) // (8-32 bits x 3)
   */
  colorByCSSColorSpace(
    args?: Partial<ColorByCSSColorSpaceProps>,
  ): SchemaField<string, Partial<ColorByCSSColorSpaceProps>> {
    return new SchemaField<string, Partial<ColorByCSSColorSpaceProps>>(
      "colorByCssColorSpace",
      (a) => {
        const { format = "css", space = "sRGB" } = a;

        const color = Array.from({ length: 3 }).map(() =>
          this.dataTypeSchema
            .float()
            .getValue({ min: 0, max: 1, precision: 0.0001 }),
        );

        return toColorFormat(color, format, "color", space);
      },
      args || {},
    );
  }
}
