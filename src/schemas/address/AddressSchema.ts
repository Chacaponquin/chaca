import { faker } from "@faker-js/faker";
import { SchemaField } from "../SchemaField";
import { CHDataUtils } from "../../utils/CHDataUtils";
import { COUNTRY_LIST } from "./constants/countries";

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
  zipCode(args?: ZipCodeProps) {
    return new SchemaField<string, ZipCodeProps>(
      "zipCode",
      (a) => {
        return faker.address.zipCode(a.format);
      },
      args || {},
    );
  }

  timeZone() {
    return new SchemaField<string>("timeZone", faker.address.timeZone, {});
  }

  cardinalDirection() {
    return new SchemaField<string>(
      "cardinalDirection",
      faker.address.cardinalDirection,
      {},
    );
  }

  country(args?: CountryProps) {
    return new SchemaField<string, CountryProps>(
      "country",
      (a) => {
        if (a.continent && typeof a.continent === "string") {
          const filterList = COUNTRY_LIST.filter(
            (el) => el.continent === a.continent,
          );

          if (filterList.length > 0) {
            return CHDataUtils.oneOfArray(filterList.map((el) => el.country));
          } else
            return CHDataUtils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
        } else
          return CHDataUtils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
      },
      args || {},
    );
  }

  countryCode() {
    return new SchemaField<string>(
      "countryCode",
      faker.address.countryCode,
      {},
    );
  }
}
