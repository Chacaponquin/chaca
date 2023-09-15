import { chaca } from "../../../../src";



export const FEW_VALUES_SEQUENTIAL_SCHEMA = chaca.schema({
  favoriteNumber: chaca.sequential([1, 2]),
});
