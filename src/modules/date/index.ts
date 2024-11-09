import { ChacaUtils } from "../../core/utils";
import { ChacaError } from "../../errors";
import { DatatypeModule } from "../datatype";
import { MONTHS } from "./constants/month";
import { WEEKDAYS } from "./constants/weekday";

export type ArgDate = Date | string;

export type DateSoonProps = {
  days?: number;
  refDate?: ArgDate;
};

export type DatePastProps = {
  years?: number;
  refDate?: ArgDate;
};

export type AnytimeProps = {
  refDate?: ArgDate;
};

export type DateFutureProps = { years?: number; refDate?: ArgDate };

export type BirthDateProps = {
  refDate?: ArgDate;
  min?: number;
  max?: number;
  mode?: "age" | "year";
};

export type TimeUnits =
  | "years"
  | "seconds"
  | "minutes"
  | "days"
  | "hours"
  | "months";

export type TimeAgoProps = {
  unit?: TimeUnits;
};

export type DateBetweenProps = {
  from?: ArgDate;
  to?: ArgDate;
};

export class DateModule {
  constructor(
    private readonly datatypeModule: DatatypeModule,
    private readonly utils: ChacaUtils,
  ) {}

  readonly constants = {
    weekDays: WEEKDAYS,
    months: MONTHS,
  };

  /**
   * Returns a date in the near future.
   *
   * @param args.days The range of days the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.soon() // '2022-02-05T09:55:39.216Z'
   * modules.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
   */
  soon({ days: idays, refDate: irefDate }: DateSoonProps = {}): Date {
    const days =
      typeof idays === "number" && idays >= 0
        ? idays
        : this.datatypeModule.int({ min: 1, max: 200 });

    const refDate = this.argToDate(irefDate);

    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
    };

    let future = refDate.getTime();
    future += this.datatypeModule.int(range);
    refDate.setTime(future);

    return refDate;
  }

  /**
   * Returns a Date in the past.
   *
   * @param args.years The range of years the date may be in the past.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.past() // '2021-12-03T05:40:44.408Z'
   * modules.date.past()({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
   *
   * @returns Date
   * */
  past({ refDate: irefDate, years: iyears }: DatePastProps = {}) {
    const years =
      typeof iyears === "number" && iyears >= 0
        ? iyears
        : this.datatypeModule.int({ min: 1, max: 10 });

    const refDate = this.argToDate(irefDate);

    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    let past = refDate.getTime();
    past -= this.datatypeModule.int(range); // some time from now to N years ago, in milliseconds
    refDate.setTime(past);

    return refDate;
  }

  /**
   * Returns a date in the future.
   *
   * @param args.years The range of years the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.future() // '2022-11-19T05:52:49.100Z'
   * modules.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
   *
   * @returns Date
   */
  future({ refDate: irefDate, years: iyears }: DateFutureProps = {}) {
    const years =
      typeof iyears === "number" && iyears >= 0 ? iyears : undefined;

    const refDate = this.argToDate(irefDate);

    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    let future = refDate.getTime();
    future += this.datatypeModule.int(range);

    const newDate = new Date();
    newDate.setTime(future);

    return newDate;
  }

  /**
   * Returns a month name
   * @example modules.date.month() // 'February'
   * @returns string
   */
  month(): string {
    return this.utils.oneOfArray(MONTHS);
  }

  /**
   * Returns a weekday name
   * @example modules.date.weekDay() // 'Monday'
   * @returns string
   */
  weekDay(): string {
    return this.utils.oneOfArray(WEEKDAYS);
  }

  /**
   * Returns a random birthdate.
   *
   * @param args.min The minimum age or year to generate a birthdate.
   * @param args.max The maximum age or year to generate a birthdate.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to `now`.
   * @param args.mode The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
   *
   * There are two modes available `'age'` and `'year'`:
   * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
   * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
   *
   * Defaults to `year`.
   *
   * @example
   * modules.date.birthdate() // 1977-07-10T01:37:30.719Z
   * modules.date.birthdate({ min: 18, max: 65, mode: 'age' }) // 2003-11-02T20:03:20.116Z
   * modules.date.birthdate({ min: 1900, max: 2000, mode: 'year' }) // 1940-08-20T08:53:07.538Z
   *
   * @returns Date
   */
  birthdate({
    refDate: irefDate,
    max: imax,
    min: imin,
    mode: imode = "age",
  }: BirthDateProps = {}): Date {
    const refDate = this.argToDate(irefDate);

    const mode = imode === "age" || imode === "year" ? imode : "age";

    const refYear = refDate.getUTCFullYear();

    const min: number =
      typeof imin === "number" && imin > 0 ? imin : refYear - 18;
    const max: number = typeof imax === "number" ? imax : refYear - 80;

    if (mode === "age") {
      const minimun = new Date(refDate).setUTCFullYear(refYear - max - 1);
      const maximun = new Date(refDate).setUTCFullYear(refYear - min);

      return new Date(this.datatypeModule.int({ min: maximun, max: minimun }));
    } else {
      const minimun = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(min);
      const maximun = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(max);

      return new Date(this.datatypeModule.int({ min: minimun, max: maximun }));
    }
  }

  private randomDate(): Date {
    const year = this.datatypeModule.int({ min: 1900, max: 2300 });
    const month = this.datatypeModule.int({ min: 0, max: 11 });
    const day = this.datatypeModule.int({ min: 1, max: 30 });

    return new Date(year, month, day);
  }

  /**
   * Returns a date between the given boundaries.
   *
   * @param args.from The early date boundary.
   * @param args.to The late date boundary.
   *
   * @example
   * modules.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
   *
   * @returns Date
   */
  between({ from: ifrom, to: ito }: DateBetweenProps = {}) {
    let from: Date;
    let to: Date;

    if (ifrom instanceof Date && ito instanceof Date) {
      if (ifrom.getTime() > ito.getTime()) {
        throw new ChacaError(`The to Date must be greater than from Date.`);
      } else {
        from = ifrom;
        to = ito;
      }
    } else {
      if (ifrom instanceof Date && !(ito instanceof Date)) {
        from = this.argToDate(ifrom);
        to = this.future({ refDate: from });
      } else if (!(ifrom instanceof Date) && ito instanceof Date) {
        to = ito;
        from = this.past({ refDate: to });
      } else {
        from = this.randomDate();
        to = this.future({ refDate: from });
      }
    }

    const fromMs = from.getTime();
    const toMs = to.getTime();
    const dateOffset = this.datatypeModule.int({
      min: 0,
      max: toMs - fromMs,
    });

    return new Date(fromMs + dateOffset);
  }

  /**
   * Returns a string with a time ago information
   * @param args.unit Date time unit. Can be (`"years"` | `"seconds"` | `"minutes"` | `"days"` | `"hours"` | `"months"`)
   * @example modules.date.timeAgo({ unit: 'days' }) // '20 days ago'
   * @returns string
   */
  timeAgo({ unit: iunit }: TimeAgoProps = {}) {
    const units = ["years", "seconds", "minutes", "days", "hours"];

    const unit =
      typeof iunit === "string" ? iunit : this.utils.oneOfArray(units);

    switch (unit) {
      case "days":
        return `${this.datatypeModule.int({
          min: 1,
          max: 30,
        })} ${unit} ago`;
      case "hours":
        return `${this.datatypeModule.int({
          min: 1,
          max: 23,
        })} ${unit} ago`;
      case "minutes":
        return `${this.datatypeModule.int({
          min: 1,
          max: 59,
        })} ${unit} ago`;
      case "seconds":
        return `${this.datatypeModule.int({
          min: 1,
          max: 59,
        })} ${unit} ago`;
      case "years":
        return `${this.datatypeModule.int({
          min: 1,
          max: 40,
        })} ${unit} ago`;
      case "months":
        return `${this.datatypeModule.int({
          min: 1,
          max: 11,
        })} ${unit} ago`;
      default:
        return `${this.datatypeModule.int({
          min: 1,
          max: 60,
        })} ${unit} ago`;
    }
  }

  /**
   * Generates a random date that can be either in the past or in the future.
   *
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to `new Date()`.
   *
   * @example
   * faker.date.anytime() // '2022-07-31T01:33:29.567Z'
   */
  anytime({ refDate }: AnytimeProps = {}): Date {
    const time = this.argToDate(refDate).getTime();

    return this.between({
      from: new Date(time - 1000 * 60 * 60 * 24 * 365),
      to: new Date(time + 1000 * 60 * 60 * 24 * 365),
    });
  }

  private argToDate(date: ArgDate | undefined): Date {
    if (date instanceof Date) {
      return date;
    } else if (typeof date === "string") {
      return new Date(date);
    } else {
      return new Date();
    }
  }
}
