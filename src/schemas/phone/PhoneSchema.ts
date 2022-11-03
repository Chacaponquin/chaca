import { faker } from "@faker-js/faker";
import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";
import { PHONE_PREFIX } from "./constants/phonePrefix";

type CallDurationProps = {
  min?: number;
  max?: number;
};

export class PhoneSchema {
  number() {
    return new SchemaField<string>("number", () => faker.phone.number(), {});
  }

  prefix() {
    return new SchemaField<string>(
      "prefix",
      () => CHDataUtils.oneOfArray(PHONE_PREFIX.map((el) => el.code)),
      {},
    );
  }

  /**
   * Return a call duartion with minutes and seconds
   * @param args.min Minimun minutes of the call. Default `0`
   * @param args.max Maximun minutes of the call. Default `59`
   *
   * @example schemas.phone.callDuration().getValue({min: 10, max: 30}) // '27:30'
   *
   * @returns string
   */
  callDuration(args?: CallDurationProps) {
    return new SchemaField<string, CallDurationProps>(
      "callDuration",
      (a) => {
        const min =
          a.min && typeof a.min === "number" && a.min >= 0 && a.min < 60
            ? a.min
            : undefined;
        let max: number | undefined = undefined;

        if (a.max && typeof a.max === "number" && a.max < 60 && a.max >= 0) {
          if (min && a.max >= min) {
            max = a.max;
          } else if (!min) {
            max = a.max;
          }
        }

        const minutes = CHDataUtils.numberByLimits({
          min: min || 0,
          max: max || 59,
        });
        const seconds = CHDataUtils.numberByLimits({ min: 0, max: 59 });

        const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${stringMinutes}:${stringSeconds}`;
      },

      args || {},
    );
  }
}
