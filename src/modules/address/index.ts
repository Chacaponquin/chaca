import { Module } from "../Module";
import { COUNTRY_CODE, COUNTRY_LIST } from "./constants/countries";
import { ChacaUtils } from "../../core/utils";
import { TIME_ZONE } from "./constants/timeZone";
import { CARDINAL_DIRECTIONS } from "./constants/cardinal_directions";

type ZipCodeProps = {
  format?: string;
};

type CountryProps = {
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
  private utils = new ChacaUtils();

  public readonly constants = {
    timeZones: TIME_ZONE,
    countries: COUNTRY_LIST,
    countriesCode: COUNTRY_CODE,
    cardinalDirections: CARDINAL_DIRECTIONS,
  };

  /**
   * Returns a zip code
   * @param args.format format of the zip code. Default '#####'
   * @example schemas.address.zipCode() // Schema
   * @example
   * schemas.address.zipCode().getValue() // '62581'
   * schemas.address.zipCode().getValue({format: '###'}) // '453'
   * @returns string
   */
  zipCode(args?: ZipCodeProps) {
    return new Module<string, ZipCodeProps>((a) => {
      const format =
        typeof a.format === "string" && a.format ? a.format : "#####";
      return this.utils.replaceSymbols(format);
    }, args || {});
  }

  /**
   * Returns a time zone
   * @example schemas.address.timeZone() // Schema
   * @example schemas.address.timeZone().getValue() // "Asia/Magadan"
   * @returns string
   */
  timeZone() {
    return new Module<string>(() => this.utils.oneOfArray(TIME_ZONE), {});
  }

  /**
   * Returns a cardinal direction
   * @example schemas.address.cardinalDirection() // Schema
   * @example schemas.address.cardinalDirection().getValue() // 'North'
   * @returns string
   */
  cardinalDirection() {
    return new Module<string>(
      () => this.utils.oneOfArray(this.constants.cardinalDirections),
      {},
    );
  }

  /**
   * Returns a country
   * @param args.continent Continent of the country that you want
   * @example schemas.address.country() // Schema
   * @example schemas.address.country().getValue() // 'Spain'
   * @returns string
   */
  country(args?: CountryProps) {
    return new Module<string, CountryProps>((a) => {
      if (a.continent && typeof a.continent === "string") {
        const filterList = COUNTRY_LIST.filter(
          (el) => el.continent === a.continent,
        );

        if (filterList.length > 0) {
          return this.utils.oneOfArray(filterList.map((el) => el.country));
        } else {
          return this.utils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
        }
      } else {
        return this.utils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
      }
    }, args || {});
  }

  /**
   * Returns a country name code
   * @example schemas.address.countryCode() // Schema
   * @example schemas.address.countryCode().getValue() // 'CU'
   * @returns string
   */
  countryCode() {
    return new Module<string>(() => this.utils.oneOfArray(COUNTRY_CODE), {});
  }
}
