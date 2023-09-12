import { chaca } from "../../../../src";

export const EMPTY_SEQUENTIAL_SCHEMA = chaca.schema({
  favoriteNumber: chaca.sequential([]),
});

export const FEW_VALUES_SEQUENTIAL_SCHEMA = chaca.schema({
  favoriteNumber: chaca.sequential([1, 2]),
});
