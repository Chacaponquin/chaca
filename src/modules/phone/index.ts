import { ChacaUtils } from "../../core/utils";
import { DatatypeModule } from "../datatype";
import { Module } from "../Module";
import { PHONE_PREFIX } from "./constants/phonePrefix";

type CallDurationProps = {
  min?: number;
  max?: number;
};

type NumberProps = {
  format?: string;
};

export class PhoneModule {
  private datatypeModule = new DatatypeModule();
  private utils = new ChacaUtils();

  readonly constants = {
    phonePrefixs: PHONE_PREFIX,
  };

  /**
   * Returns a phone number
   * @param args.format Format of the phone number
   * @example schemas.phone.number() // Schema
   * @example
   * schemas.phone.number().getValue({format: '+53 #### ## ##'}) // '+53 5417 35 99'
   * @returns string
   */
  number(args?: NumberProps) {
    return new Module<string, NumberProps>((a) => {
      const format: string =
        typeof a.format === "string"
          ? a.format
          : `${this.prefix().getValue()} ### ### ##`;

      const number: string = this.utils.replaceSymbols(format);
      return number;
    }, args || {});
  }

  /**
   * Returns a string with a country number prefix
   * @example schemas.phone.prefix() // Schema
   * @example schemas.phone.prefix().getValue() // '+53'
   * @returns string
   */
  prefix() {
    return new Module<string>(() =>
      this.utils.oneOfArray(PHONE_PREFIX.map((el) => el.code)),
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
   *
   * @returns string
   */
  callDuration(args?: CallDurationProps) {
    return new Module<string, CallDurationProps>((a) => {
      const min: number =
        typeof a.min === "number" && a.min >= 0 && a.min < 60 ? a.min : 0;
      const max: number =
        typeof a.max === "number" && a.max < 60 && a.max >= 0 && a.max >= min
          ? a.max
          : 59;

      const minutes = this.datatypeModule.int().getValue({
        min,
        max,
      });
      const seconds = this.datatypeModule.int().getValue({ min: 0, max: 59 });

      const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      return `${stringMinutes}:${stringSeconds}`;
    }, args || {});
  }
}
