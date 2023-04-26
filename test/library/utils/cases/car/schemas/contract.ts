import { chaca, schemas } from "../../../../../../src";

export const CONTRACT_SCHEMA = chaca.defineSchema({
  id: chaca.key(schemas.id.uuid()),
  car_plate: chaca.ref("Car.plate"),
  tourist_passport: chaca.ref("Turist.passport"),
  start_date: schemas.date.past(),
  finish_date: (fields) => {
    return schemas.date.future().getValue({ refDate: fields.start_date });
  },
  pay_method: { enum: ["CREDIT", "CASH"] },
  extension: schemas.dataType.int({ min: 0, max: 100 }),
  dni_chofer: { type: chaca.ref("Driver.dni"), posibleNull: 50 }, // puede ser null
});
