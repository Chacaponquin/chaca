import { chaca, schemas } from "../../../../src";

export const EMPTY_SEQUENTIAL_SCHEMA = chaca.schema({
  id: schemas.id.uuid(),
  name: schemas.person.fullName(),
  favoriteNumber: chaca.sequential([]),
});

export const STRING_SEQUENTIAL_SCHEMA = () =>
  chaca.schema({
    id: schemas.id.uuid(),
    name: schemas.person.fullName(),
    favoriteNumber: chaca.sequential("" as any),
  });

export const NUMBER_SEQUENTIAL_SCHEMA = () =>
  chaca.schema({
    id: schemas.id.uuid(),
    name: schemas.person.fullName(),
    favoriteNumber: chaca.sequential(5 as any),
  });

export const FEW_VALUES_SEQUENTIAL_SCHEMA = chaca.schema({
  id: schemas.id.uuid(),
  name: schemas.person.fullName(),
  favoriteNumber: chaca.sequential([1, 2]),
});