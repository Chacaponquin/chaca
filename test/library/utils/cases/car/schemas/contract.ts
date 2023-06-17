import { chaca, schemas } from "../../../../../../src";

export const CONTRACT_SCHEMA = chaca.defineSchema({
  car_plate: chaca.key(chaca.ref("Car.plate")),
  tourist_passport: chaca.ref("Turist.passport"),
  start_date: chaca.key(schemas.date.past()),
  end_date: ({ currentFields: fields }) => {
    return schemas.date
      .between()
      .getValue({ from: fields.start_date, to: new Date() });
  },
  delivery_date: ({ currentFields: fields }) => {
    return schemas.date
      .between()
      .getValue({ from: fields.start_date, to: new Date() });
  },
  pay_method_id: chaca.ref("Pay_Method.id"),
  driver_dni: { type: chaca.ref("Driver.dni"), posibleNull: 50 },
  end_km: ({ currentFields: fields, store }) => {
    const allCars = store.getValue("Car");
    const restDocuments = store.getValue("Contract");

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
        return schemas.dataType.int({ min: 0, max: 3000 }).getValue();
      }
    } else {
      return schemas.dataType.int({ min: 0, max: 3000 }).getValue();
    }
  },
  start_km: ({ currentFields: fields, store }) => {
    let founds = [] as Array<any>;
    const restDocuments = store.getValue("Contract");

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

      return schemas.dataType
        .int({ min: ref.end_km, max: fields.end_km })
        .getValue();
    } else {
      return schemas.dataType.int({ min: 0, max: fields.end_km }).getValue();
    }
  },
});
