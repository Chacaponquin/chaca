import { chaca, modules } from "../../../../../src";

export const CONTRACT_SCHEMA = chaca.schema({
  plate: chaca.key(chaca.ref("Car.plate")),
  passport: chaca.ref("Tourist.passport"),
  start_date: chaca.key(() => modules.date.past()),
  end_date: ({ currentFields: fields }) => {
    return modules.date.between({ from: fields.start_date, to: new Date() });
  },
  delivery_date: ({ currentFields: fields }) => {
    return modules.date.between({ from: fields.start_date, to: new Date() });
  },
  pay_method_id: chaca.ref("Pay_Method.id"),
  driver_dni: { type: chaca.ref("Driver.dni"), possibleNull: 50 },
  end_km: ({ currentFields: fields, store }) => {
    const allCars = store.value("Car");
    const restDocuments = store.getSchemaDocuments();

    let found = null;
    for (let i = 0; i < restDocuments.length && !found; i++) {
      const contract = restDocuments[i];

      if (contract.car_plate === fields.car_plate) {
        if (contract.end_date.getTime() > fields.end_date.getTime()) {
          found = contract;
        }
      }
    }

    if (!found) {
      const foundCar = allCars.find((c) => c.plate === fields.car_plate);

      if (foundCar) {
        return foundCar.cant_km;
      } else {
        return modules.datatype.int({ min: 0, max: 3000 });
      }
    } else {
      return modules.datatype.int({ min: 0, max: 3000 });
    }
  },
  start_km: ({ currentFields: fields, store }) => {
    let founds = [] as Array<any>;
    const restDocuments = store.getSchemaDocuments();

    for (let i = 0; i < restDocuments.length; i++) {
      const contract = restDocuments[i];

      if (contract.car_plate === fields.car_plate) {
        if (contract.delivery_date.getTime() < fields.start_date.getTime()) {
          founds.push(contract);
        }
      }
    }

    if (founds.length) {
      let ref = founds[0];

      for (let i = 1; i < founds.length; i++) {
        if (founds[i].delivery_date.getTime() > ref.delivery_date.getTime()) {
          ref = founds[i];
        }
      }

      return modules.datatype.int({ min: ref.end_km, max: fields.end_km });
    } else {
      return modules.datatype.int({ min: 0, max: fields.end_km });
    }
  },
  value: ({ currentFields: fields }) => {
    const calcDaysDiff = (date1: Date, date2: Date) => {
      const fechaInicio = date1.getTime();
      const fechaFin = date2.getTime();

      const diff = fechaFin - fechaInicio;

      return diff / (1000 * 60 * 60 * 24);
    };

    const end_date = fields.end_date;
    const start_date = fields.start_date;
    const delivery_date = fields.delivery_date;

    const value =
      calcDaysDiff(start_date, end_date) * 15 +
      calcDaysDiff(end_date, delivery_date) * 30;

    return value;
  },
});
