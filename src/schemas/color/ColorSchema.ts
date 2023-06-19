import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
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

  /**
   * Returns a random css supported color function name.
   *
   * @example
   * faker.color.cssSupportedFunction() // 'rgb'
   *
   * @since 7.0.0
   */
  cssSupportedFunction(): SchemaField<string> {
    return new SchemaField(
      "cssSupportedFunction",
      () => {
        return PrivateUtils.oneOfArray(CSS_FUNCTIONS as any);
      },
      {},
    );
  }

  /**
   * Returns a random css supported color space name.
   *
   * @example
   * faker.color.cssSupportedSpace() // 'display-p3'
   *
   * @since 7.0.0
   */
  cssSupportedSpace(): SchemaField<CSSSpace> {
    return new SchemaField(
      "cssSupportedSpace",
      () => PrivateUtils.oneOfArray(CSS_SPACES as any),
      {},
    );
  }

  /**
   * Returns an RGB color.
   *
   * @param options Options object.
   * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'0x'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'mixed'`.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.rgb() // '0xffffFF'
   * faker.color.rgb({ prefix: '#' }) // '#ffffFF'
   * faker.color.rgb({ casing: 'upper' }) // '0xFFFFFF'
   * faker.color.rgb({ casing: 'lower' }) // '0xffffff'
   * faker.color.rgb({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * faker.color.rgb({ format: 'decimal' }) // [255, 255, 255]
   * faker.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * faker.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   * faker.color.rgb({ format: 'decimal', includeAlpha: true }) // [255, 255, 255, 0.4]
   *
   * @since 7.0.0
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
      args || {
        format: "hex",
        includeAlpha: false,
        prefix: "#",
        casing: "lower",
      },
    );
  }

  /**
   * Returns a CMYK color.
   *
   * @param options Options object.
   * @param options.format Format of generated CMYK color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.cmyk() // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'decimal' }) // [0.31, 0.52, 0.32, 0.43]
   * faker.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * faker.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   *
   * @since 7.0.0
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
   * @param options Options object.
   * @param options.format Format of generated HSL color. Defaults to `'decimal'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * faker.color.hsl() // [201, 0.23, 0.32]
   * faker.color.hsl({ format: 'decimal' }) // [300, 0.21, 0.52]
   * faker.color.hsl({ format: 'decimal', includeAlpha: true }) // [300, 0.21, 0.52, 0.28]
   * faker.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * faker.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * faker.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
   * faker.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   *
   * @since 7.0.0
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
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.hwb() // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'decimal' }) // [201, 0.21, 0.31]
   * faker.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * faker.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
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
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   *
   * @example
   * faker.color.lch() // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'decimal' }) // [0.522345, 72.2, 56.2]
   * faker.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * faker.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
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
   * @param options Options object.
   * @param options.format Format of generated RGB color. Defaults to `'decimal'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * faker.color.colorByCSSColorSpace() // [0.93, 1, 0.82]
   * faker.color.colorByCSSColorSpace({ format: 'decimal' }) // [0.12, 0.21, 0.31]
   * faker.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * faker.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
   *
   * @since 7.0.0
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
