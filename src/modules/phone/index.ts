import { ChacaUtils } from "../../core/utils";
import { DatatypeModule } from "../datatype";
import { PHONE_PREFIX } from "./constants/prefix";

export type CallDurationProps = {
  min?: number;
  max?: number;
};

export type NumberProps = {
  format?: string;
};

export class PhoneModule {
  readonly constants = {
    phonePrefixs: PHONE_PREFIX,
  };

  /**
   * Returns a phone number
   * @param args.format Format of the phone number
   * @example
   * modules.phone.number({ format: '+53 #### ## ##' }) // '+53 5417 35 99'
   * @returns string
   */
  number({ format: iformat }: NumberProps): string {
    const utils = new ChacaUtils();

    const format: string = iformat ? iformat : `${this.prefix()} ### ### ##`;

    const number: string = utils.replaceSymbols(format);
    return number;
  }

  /**
   * Returns a string with a country number prefix
   * @example modules.phone.prefix() // '+53'
   * @returns string
   */
  prefix(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(PHONE_PREFIX.map((el) => el.code));
  }

  /**
   * Return a call duartion with minutes and seconds
   * @param args.min Minimun minutes of the call. Default `0`
   * @param args.max Maximun minutes of the call. Default `59`
   *
   * @example
   * modules.phone.callDuration({ min: 10, max: 30 }) // '27:30'
   * modules.phone.callDuration() // '20:52'
   *
   * @returns string
   */
  callDuration({ max: imax, min: imin }: CallDurationProps = {}): string {
    const datatypeModule = new DatatypeModule();

    const min: number =
      typeof imin === "number" && imin >= 0 && imin < 60 ? imin : 0;
    const max: number =
      typeof imax === "number" && imax < 60 && imax >= 0 && imax >= min
        ? imax
        : 59;

    const minutes = datatypeModule.int({
      min,
      max,
    });

    const seconds = datatypeModule.int({ min: 0, max: 59 });

    const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${stringMinutes}:${stringSeconds}`;
  }
}
