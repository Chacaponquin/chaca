import { faker } from '@faker-js/faker';
import { SchemaField } from '../../utils/SchemaField';

type DateSoonProps = {
  days?: number;
  refDate?: Date;
};

type DatePastProps = {
  years?: number;
  refDate?: Date;
};

type DateFutureProps = { years?: number; refDate?: Date };

type DayProps = {
  abbr?: boolean;
};

type BirthDateProps = {
  refDate?: Date;
  min?: number;
  max?: number;
  mode?: 'age' | 'year';
};

type DateBetweenProps = {
  from?: Date;
  to?: Date;
};

export class DateSchema {
  soon(args?: DateSoonProps) {
    return new SchemaField<Date, DateSoonProps>(
      'dateSoon',
      (a) => {
        const days =
          a.days && typeof a.days === 'number' && a.days > 0
            ? a.days
            : undefined;

        const refDate =
          a.refDate && a.refDate instanceof Date ? a.refDate : undefined;

        return faker.date.soon(days, refDate);
      },
      args || {},
    );
  }

  past(args?: DatePastProps) {
    return new SchemaField<Date, DatePastProps>(
      'datePast',
      (a) => {
        const years =
          a.years && typeof a.years === 'number' && a.years > 0
            ? a.years
            : undefined;

        const refDate =
          a.refDate && a.refDate instanceof Date ? a.refDate : undefined;

        return faker.date.past(years, refDate);
      },
      args || {},
    );
  }

  future(args?: DateFutureProps) {
    return new SchemaField<Date, DateFutureProps>(
      'dateFuture',
      (a) => {
        const years =
          a.years && typeof a.years === 'number' && a.years > 0
            ? a.years
            : undefined;

        const refDate =
          a.refDate && a.refDate instanceof Date ? a.refDate : undefined;

        return faker.date.future(years, refDate);
      },
      args || {},
    );
  }

  month(args?: DayProps) {
    return new SchemaField<string, DayProps>(
      'month',
      (a) => {
        const abbr = Boolean(a.abbr);

        return faker.date.month({ abbr });
      },
      args || {},
    );
  }

  weekDay(args?: DayProps) {
    return new SchemaField<string, DayProps>(
      'weekDay',
      (a) => {
        const abbr = Boolean(a.abbr);
        return faker.date.weekday({ abbr });
      },
      args || {},
    );
  }

  birthdate(args?: BirthDateProps) {
    return new SchemaField<Date, BirthDateProps>(
      'birthdate',
      (a) => {
        const min = a.min && typeof a.min === 'number' ? a.min : undefined;
        let max: number | undefined = undefined;

        if (a.max && typeof a.max === 'number') {
          if (min) {
            if (a.max >= min) max = a.max;
            else max = undefined;
          } else {
            max = undefined;
          }
        } else max = undefined;

        const mode =
          a.mode &&
          typeof a.mode === 'string' &&
          (a.mode === 'age' || a.mode === 'year')
            ? a.mode
            : undefined;

        const refDate =
          a.refDate && a.refDate instanceof Date ? a.refDate : undefined;

        return faker.date.birthdate({ max, min, mode, refDate });
      },
      args || {},
    );
  }

  between(args?: DateBetweenProps) {
    return new SchemaField<Date, DateBetweenProps>(
      'dateBetween',
      (a) => {
        const from =
          a.from && a.from instanceof Date
            ? a.from
            : '2020-01-01T00:00:00.000Z';

        const to =
          a.to && a.to instanceof Date ? a.to : '2030-01-01T00:00:00.000Z';

        return faker.date.between(from, to);
      },
      args || {},
    );
  }
}
