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
  constructor(
    private readonly utils: ChacaUtils,
    private readonly datatypeModule: DatatypeModule,
  ) {}

  readonly constants = {
    phonePrefixs: PHONE_PREFIX.map((p) => p.code),
  };

  /**
   * Returns a phone number
   *
   * @param args.format Format of the phone number
   *
   * @example
   * modules.phone.number({ format: '+53 #### ## ##' }) // '+53 5417 98 99'
   * modules.phone.number() // '+1 234 498 37'
   *
   * @returns string
   */
  number({ format: iformat }: NumberProps = {}): string {
    const format: string = iformat ? iformat : `${this.prefix()} ### ### ##`;

    const number: string = this.utils.replaceSymbols(format);
    return number;
  }

  /**
   * Returns a string with a country number prefix
   * @example modules.phone.prefix() // '+53'
   * @returns string
   */
  prefix(): string {
    return this.utils.oneOfArray(this.constants.phonePrefixs);
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
    const min: number =
      typeof imin === "number" && imin >= 0 && imin < 60 ? imin : 0;
    const max: number =
      typeof imax === "number" && imax < 60 && imax >= 0 && imax >= min
        ? imax
        : 59;

    const minutes = this.datatypeModule.int({
      min,
      max,
    });

    const seconds = this.datatypeModule.int({ min: 0, max: 59 });

    const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${stringMinutes}:${stringSeconds}`;
  }
}
