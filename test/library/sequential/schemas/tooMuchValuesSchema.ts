import { chaca, schemas } from "../../../../src";

export const TOO_MUCH_VALUES_SEQUENTIAL_SCHEMA = chaca.defineSchema({
  id: schemas.id.uuid(),
  name: schemas.person.fullName(),
  favoriteNumber: chaca.sequential([1, 2, 3, 4, 5, 4, 5, 6, 6, 5, 1, 5, 5]),
});

export const TOO_MUCH_VALUES_SEQUENTIAL_DATA =
  TOO_MUCH_VALUES_SEQUENTIAL_SCHEMA.generate(4);
