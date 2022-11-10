import { SchemaField } from "../SchemaField";
import { COUNTRY_CODE, COUNTRY_LIST } from "./constants/countries";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils";
import { TIME_ZONE } from "./constants/timeZone";

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

export class AddressSchema {
  /**
   * Returns a zip code
   * @param args.format format of the zip code
   * @example schemas.address.zipCode() // Schema
   * @example
   * schemas.address.zipCode().getValue() // '62581'
   * schemas.address.zipCode().getValue({format: '###'}) // '453'
   * @returns string
   */
  zipCode(args?: ZipCodeProps) {
    return new SchemaField<string, ZipCodeProps>(
      "zipCode",
      (a) => {
        const format =
          typeof a.format === "string" && a.format ? a.format : "#####";
        return PrivateUtils.replaceSymbols(format);
      },
      args || {},
    );
  }

  /**
   * Returns a time zone
   * @example schemas.address.timeZone() // Schema
   * @example schemas.address.timeZone().getValue() // "Asia/Magadan"
   * @returns string
   */
  timeZone() {
    return new SchemaField<string>(
      "timeZone",
      () => PrivateUtils.oneOfArray(TIME_ZONE),
      {},
    );
  }

  /**
   * Returns a cardinal direction
   * @example schemas.address.cardinalDirection() // Schema
   * @example schemas.address.cardinalDirection().getValue() // 'North'
   * @returns string
   */
  cardinalDirection() {
    return new SchemaField<string>(
      "cardinalDirection",
      () =>
        PrivateUtils.oneOfArray([
          "North",
          "East",
          "South",
          "West",
          "Northeast",
          "Northwest",
          "Southeast",
          "Southwest",
        ]),
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
    return new SchemaField<string, CountryProps>(
      "country",
      (a) => {
        if (a.continent && typeof a.continent === "string") {
          const filterList = COUNTRY_LIST.filter(
            (el) => el.continent === a.continent,
          );

          if (filterList.length > 0) {
            return PrivateUtils.oneOfArray(filterList.map((el) => el.country));
          } else
            return PrivateUtils.oneOfArray(
              COUNTRY_LIST.map((el) => el.country),
            );
        } else
          return PrivateUtils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
      },
      args || {},
    );
  }

  /**
   * Returns a country name code
   * @example schemas.address.countryCode() // Schema
   * @example schemas.address.countryCode().getValue() // 'CU'
   * @returns string
   */
  countryCode() {
    return new SchemaField<string>(
      "countryCode",
      () => PrivateUtils.oneOfArray(COUNTRY_CODE),
      {},
    );
  }
}
