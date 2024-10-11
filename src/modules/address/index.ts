import { COUNTRY_CODE, COUNTRY_LIST } from "./constants/countries";
import { ChacaUtils } from "../../core/utils";
import { TIME_ZONE } from "./constants/time-zone";
import { CARDINAL_DIRECTIONS } from "./constants/cardinal-directions";
import { ORDINAL } from "./constants/ordinal";

export type ZipCodeProps = {
  format?: string;
};

export type CountryProps = {
  continent?:
    | "Asia"
    | "Africa"
    | "Oseania"
    | "Europe"
    | "South America"
    | "North America"
    | "Antartica";
};

export class AddressModule {
  private readonly utils = new ChacaUtils();

  readonly constants = {
    timeZones: TIME_ZONE,
    countries: COUNTRY_LIST,
    countriesCode: COUNTRY_CODE,
    cardinalDirections: CARDINAL_DIRECTIONS,
    ordinalDirection: ORDINAL,
  };

  /**
   * Returns a zip code
   * @param args.format format of the zip code. Default '#####'
   * @example
   * modules.address.zipCode() // '62581'
   * modules.address.zipCode({ format: '###' }) // '453'
   * @returns string
   */
  zipCode({ format: iformat }: ZipCodeProps = {}): string {
    const utils = new ChacaUtils();

    const format = typeof iformat === "string" ? iformat : "#####";
    return utils.replaceSymbols(format);
  }

  /**
   * Returns a time zone
   * @example modules.address.timeZone() // "Asia/Magadan"
   * @returns string
   */
  timeZone(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(TIME_ZONE);
  }

  /**
   * Returns a cardinal direction
   * @example modules.address.cardinalDirection()// 'North'
   * @returns string
   */
  cardinalDirection(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.cardinalDirections);
  }

  /**
   * Returns a country
   * @param args.continent Continent of the country that you want
   * @example modules.address.country() // 'Spain'
   * @returns string
   */
  country({ continent }: CountryProps = {}): string {
    const utils = new ChacaUtils();

    if (continent && typeof continent === "string") {
      const filterList = COUNTRY_LIST.filter(
        (el) => el.continent === continent,
      );

      if (filterList.length > 0) {
        return utils.oneOfArray(filterList.map((el) => el.country));
      }
    }

    return utils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
  }

  /**
   * Returns a country name code
   * @example modules.address.countryCode() // 'CU'
   * @returns string
   */
  countryCode(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(COUNTRY_CODE);
  }

  /**
   * Returns a random ordinal direction (northwest, southeast, etc).
   *
   * @param options Whether to use abbreviated or an options object.
   * @param options.abbreviated If true this will return abbreviated directions (NW, SE, etc).
   * Otherwise this will return the long name. Defaults to `false`.
   *
   * @example
   * modules.address.ordinalDirection() // 'Northeast'
   */
  ordinalDirection(): string {
    return this.utils.oneOfArray(ORDINAL);
  }
}