import { COUNTRY_CODE, COUNTRY_LIST } from "./constants/countries";
import { TIME_ZONE } from "./constants/time-zone";
import { CARDINAL_DIRECTIONS } from "./constants/cardinal-directions";
import { ORDINAL } from "./constants/ordinal";
import { ChacaUtils } from "../../core/utils";

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
  constructor(private readonly utils: ChacaUtils) {}

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
    const format = typeof iformat === "string" ? iformat : "#####";
    return this.utils.replaceSymbols(format);
  }

  /**
   * Returns a time zone
   * @example modules.address.timeZone() // "Asia/Magadan"
   * @returns string
   */
  timeZone(): string {
    return this.utils.oneOfArray(TIME_ZONE);
  }

  /**
   * Returns a cardinal direction
   * @example modules.address.cardinalDirection()// 'North'
   * @returns string
   */
  cardinalDirection(): string {
    return this.utils.oneOfArray(this.constants.cardinalDirections);
  }

  /**
   * Returns a country
   * @param args.continent Continent of the country that you want
   * @example modules.address.country() // 'Spain'
   * @returns string
   */
  country({ continent }: CountryProps = {}): string {
    if (continent && typeof continent === "string") {
      const filterList = COUNTRY_LIST.filter(
        (el) => el.continent === continent,
      );

      if (filterList.length > 0) {
        return this.utils.oneOfArray(filterList.map((el) => el.country));
      }
    }

    return this.utils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
  }

  /**
   * Returns a country name code
   * @example modules.address.countryCode() // 'CU'
   * @returns string
   */
  countryCode(): string {
    return this.utils.oneOfArray(COUNTRY_CODE);
  }

  /**
   * Returns a random ordinal direction (northwest, southeast, etc).
   *
   * @example
   * modules.address.ordinalDirection() // 'Northeast'
   */
  ordinalDirection(): string {
    return this.utils.oneOfArray(ORDINAL);
  }
}
