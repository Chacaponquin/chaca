import { ChacaUtils } from "../../core/ChacaUtils/ChacaUtils";
import { ChacaError } from "../../errors";
import { SchemaField } from "../SchemaField";
import { DataTypeSchema } from "../dataType/DataTypeSchema";
import { MONTHS } from "./constants/month";
import { WEEKDAYS } from "./constants/weekday";

type ArgDate = Date | string;

type DateSoonProps = {
  days?: number;
  refDate?: ArgDate;
};

type DatePastProps = {
  years?: number;
  refDate?: ArgDate;
};

type DateFutureProps = { years?: number; refDate?: ArgDate };

type BirthDateProps = {
  refDate?: ArgDate;
  min?: number;
  max?: number;
  mode?: "age" | "year";
};

type TimeUnits = "years" | "seconds" | "minutes" | "days" | "hours" | "months";

type TimeAgoProps = {
  unit?: TimeUnits;
};

type DateBetweenProps = {
  from?: ArgDate;
  to?: ArgDate;
};

export class DateSchema {
  private dataTypeSchema = new DataTypeSchema();
  private utils = new ChacaUtils();

  public readonly constants = {
    weekDays: WEEKDAYS,
    months: MONTHS,
  };

  /**
   * Returns a date in the near future.
   *
   * @param args.days The range of days the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example schemas.date.soon() // Schema
   *
   * @example
   * schemas.date.soon().getValue() // '2022-02-05T09:55:39.216Z'
   * schemas.date.soon().getValue({days: 10}) // '2022-02-11T05:14:39.138Z'
   */
  soon(args?: DateSoonProps) {
    return new SchemaField<Date, DateSoonProps>((a) => {
      const days =
        typeof a.days === "number" && a.days > 0
          ? a.days
          : this.dataTypeSchema.int().getValue({ min: 1, max: 200 });

      const refDate = this.argToDate(a.refDate);

      const range = {
        min: 1000,
        max: (days || 1) * 24 * 3600 * 1000,
      };

      let future = refDate.getTime();
      future += this.dataTypeSchema.int().getValue(range);
      refDate.setTime(future);

      return refDate;
    }, args || {});
  }

  /**
   * Returns a Date in the past.
   *
   * @param args.years The range of years the date may be in the past.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example schemas.date.past() // Schema
   *
   * @example
   * schemas.date.past().getValue() // '2021-12-03T05:40:44.408Z'
   * schemas.date.past().getValue({years: 10, refDate: '2020-01-01T00:00:00.000Z'}) // '2017-08-18T02:59:12.350Z'
   *
   * @returns Date
   * */
  past(args?: DatePastProps) {
    return new SchemaField<Date, DatePastProps>((a) => {
      const years =
        typeof a.years === "number" && a.years > 0
          ? a.years
          : this.dataTypeSchema.int().getValue({ min: 1, max: 10 });

      const refDate = this.argToDate(a.refDate);

      const range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000,
      };

      let past = refDate.getTime();
      past -= this.dataTypeSchema.int().getValue(range); // some time from now to N years ago, in milliseconds
      refDate.setTime(past);

      return refDate;
    }, args || {});
  }

  /**
   * Returns a date in the future.
   *
   * @param args.years The range of years the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example schemas.date.future() // Schema
   *
   * @example
   * schemas.date.future().getValue() // '2022-11-19T05:52:49.100Z'
   * schemas.date.future().getValue({years: 10, refDate: '2020-01-01T00:00:00.000Z'}) // '2020-12-13T22:45:10.252Z'
   *
   * @returns Date
   */
  future(args?: DateFutureProps) {
    return new SchemaField<Date, DateFutureProps>((a) => {
      const years =
        typeof a.years === "number" && a.years > 0 ? a.years : undefined;

      const refDate = this.argToDate(a.refDate);

      const range = {
        min: 1000,
        max: (years || 1) * 365 * 24 * 3600 * 1000,
      };

      let future = refDate.getTime();
      future += this.dataTypeSchema.int().getValue(range);

      const newDate = new Date();
      newDate.setTime(future);

      return newDate;
    }, args || {});
  }

  /**
   * Returns a month name
   * @example schemas.date.month() // Schema
   * @example schemas.date.month().getValue() // 'February'
   * @returns string
   */
  month() {
    return new SchemaField<string>(() => {
      return this.utils.oneOfArray(MONTHS);
    }, {});
  }

  /**
   * Returns a weekday name
   * @example schemas.date.weekDay() // Schema
   * @example schemas.date.weekDay().getValue() // 'Monday'
   * @returns string
   */
  weekDay() {
    return new SchemaField<string>(() => {
      return this.utils.oneOfArray(WEEKDAYS);
    }, {});
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
   * @example schemas.date.birthdate() // Schema
   *
   * @example
   * schemas.date.birthdate().getValue() // 1977-07-10T01:37:30.719Z
   * schemas.date.birthdate().getValue({ min: 18, max: 65, mode: 'age' }) // 2003-11-02T20:03:20.116Z
   * schemas.date.birthdate().getValue({ min: 1900, max: 2000, mode: 'year' }) // 1940-08-20T08:53:07.538Z
   *
   * @returns Date
   */
  birthdate(args?: BirthDateProps) {
    return new SchemaField<Date, BirthDateProps>((a) => {
      const refDate = this.argToDate(a.refDate);

      const mode =
        typeof a.mode === "string" && (a.mode === "age" || a.mode === "year")
          ? a.mode
          : "age";

      const refYear = refDate.getUTCFullYear();

      let min: number =
        typeof a.min === "number" && a.min > 0 ? a.min : refYear - 18;
      let max: number = typeof a.max === "number" ? a.max : refYear - 80;

      if (mode === "age") {
        min = new Date(refDate).setUTCFullYear(refYear - max - 1);
        max = new Date(refDate).setUTCFullYear(refYear - min);
      } else {
        min = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(min);
        max = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(max);
      }

      return new Date(this.dataTypeSchema.int().getValue({ min, max }));
    }, args || {});
  }

  private randomDate(): Date {
    const year = this.dataTypeSchema.int().getValue({ min: 1900, max: 2300 });
    const month = this.dataTypeSchema.int().getValue({ min: 0, max: 11 });
    const day = this.dataTypeSchema.int().getValue({ min: 1, max: 30 });

    return new Date(year, month, day);
  }

  /**
   * Returns a date between the given boundaries.
   *
   * @param args.from The early date boundary.
   * @param args.to The late date boundary.
   *
   * @example schemas.date.between() // Schema
   *
   * @example
   * schemas.date.between().getValue({from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z'}) // '2026-05-16T02:22:53.002Z'
   *
   * @returns Date
   */
  between(args?: DateBetweenProps) {
    return new SchemaField<Date, DateBetweenProps>((a) => {
      let from: Date;
      let to: Date;

      if (a.from instanceof Date && a.to instanceof Date) {
        if (a.from.getTime() > a.to.getTime()) {
          throw new ChacaError(`The to Date must be greater than from Date.`);
        } else {
          from = a.from;
          to = a.to;
        }
      } else {
        if (a.from instanceof Date && !(a.to instanceof Date)) {
          from = this.argToDate(a.from);
          to = this.future().getValue({ refDate: from });
        } else if (!(a.from instanceof Date) && a.to instanceof Date) {
          to = a.to as Date;
          from = this.past().getValue({ refDate: to });
        } else {
          from = this.randomDate();
          to = this.future().getValue({ refDate: from });
        }
      }

      const fromMs = from.getTime();
      const toMs = to.getTime();
      const dateOffset = this.dataTypeSchema.int().getValue({
        min: 0,
        max: toMs - fromMs,
      });

      return new Date(fromMs + dateOffset);
    }, args || {});
  }

  /**
   * Returns a string with a time ago information
   * @param args.unit Date time unit. Can be (`"years"` | `"seconds"` | `"minutes"` | `"days"` | `"hours"` | `"months"`)
   * @example schemas.date.timeAgo() // Schema
   * @example schemas.date.timeAgo().getValue({unit: 'days'}) // '20 days ago'
   * @returns string
   */
  timeAgo(args?: TimeAgoProps) {
    return new SchemaField<string, TimeAgoProps>((a) => {
      const units = ["years", "seconds", "minutes", "days", "hours"];

      const unit =
        typeof a.unit === "string" ? a.unit : this.utils.oneOfArray(units);

      let filterUnit = units.find((el) => el === unit) as TimeUnits;
      if (!filterUnit) {
        filterUnit = this.utils.oneOfArray(units) as TimeUnits;
      }

      switch (filterUnit) {
        case "days":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 30,
          })} ${unit} ago`;
        case "hours":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 23,
          })} ${unit} ago`;
        case "minutes":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 59,
          })} ${unit} ago`;
        case "seconds":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 59,
          })} ${unit} ago`;
        case "years":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 40,
          })} ${unit} ago`;
        case "months":
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 11,
          })} ${unit} ago`;
        default:
          return `${this.dataTypeSchema.int().getValue({
            min: 1,
            max: 60,
          })} ${unit} ago`;
      }
    }, args || {});
  }

  private argToDate(date: ArgDate | undefined): Date {
    if (date instanceof Date) return date;
    else if (typeof date === "string") return new Date(date);
    else return new Date();
  }
}
