import { PrivateUtils } from "../../utils/helpers/PrivateUtils";
import { SchemaField } from "../SchemaField";
import { PHONE_PREFIX } from "./constants/phonePrefix";

type CallDurationProps = {
  min?: number;
  max?: number;
};

type NumberProps = {
  format?: string;
};

export class PhoneSchema {
  /**
   * Returns a phone number
   * @param args.format Format of the phone number
   * @example schemas.phone.number() // Schema
   * @example
   * schemas.phone.number().getValue({format: '+53 #### ## ##'}) // '+53 5417 35 91'
   * @returns string
   */
  number(args?: NumberProps) {
    return new SchemaField<string, NumberProps>(
      "number",
      (a) => {
        const format: string =
          typeof a.format === "string"
            ? a.format
            : `${this.prefix().getValue()} ### ### ##`;

        const number: string = PrivateUtils.replaceSymbols(format);
        return number;
      },
      args || {},
    );
  }

  /**
   * Returns a string with a country number prefix
   * @example schemas.phone.prefix() // Schema
   * @example schemas.phone.prefix().getValue() // '+53'
   * @returns string
   */
  prefix() {
    return new SchemaField<string>(
      "prefix",
      () => PrivateUtils.oneOfArray(PHONE_PREFIX.map((el) => el.code)),
      {},
    );
  }

  /**
   * Return a call duartion with minutes and seconds
   * @param args.min Minimun minutes of the call. Default `0`
   * @param args.max Maximun minutes of the call. Default `59`
   *
   * @example schemas.phone.callDuration() // Schema
   * @example
   * schemas.phone.callDuration().getValue({min: 10, max: 30}) // '27:30'
   * schemas.phone.callDuration().getValue() // '20:52'
   * @returns string
   */
  callDuration(args?: CallDurationProps) {
    return new SchemaField<string, CallDurationProps>(
      "callDuration",
      (a) => {
        const min: number =
          typeof a.min === "number" && a.min >= 0 && a.min < 60 ? a.min : 0;
        let max: number =
          typeof a.max === "number" && a.max < 60 && a.max >= 0 && a.max >= min
            ? a.max
            : 59;

        const minutes = PrivateUtils.intNumber({
          min,
          max,
        });
        const seconds = PrivateUtils.intNumber({ min: 0, max: 59 });

        const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${stringMinutes}:${stringSeconds}`;
      },
      args || {},
    );
  }
}
