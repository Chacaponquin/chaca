import { chaca, schemas } from "../../../../src";

export const CORRECT_SEQUENTIAL_SCHEMA = chaca.schema({
  id: schemas.id.uuid(),
  name: schemas.person.fullName(),
  favoriteNumber: chaca.sequential([1, 2, 3, 4]),
});

export const CORRECT_LOOP_SEQUENTIAL_SCHEMA = chaca.schema({
  favoriteNumber: chaca.sequential([1, 2, 3, 4], { loop: true }),
});
