import { chaca } from "../../../../../src";
import { PHASE_NAMES } from "../constants";

interface PhaseDate {
  start_date: Date;
  finish_date: Date;
}

const PHASE_DATES: PhaseDate[] = [
  {
    start_date: new Date(2023, 0, 0),
    finish_date: new Date(2023, 0, 30),
  },
  {
    start_date: new Date(2023, 1, 0),
    finish_date: new Date(2023, 1, 9),
  },
  {
    start_date: new Date(2023, 1, 10),
    finish_date: new Date(2023, 1, 19),
  },
  {
    start_date: new Date(2023, 1, 20),
    finish_date: new Date(2023, 2, 0),
  },
];

export const PHASE_SCHEMA = chaca.schema({
  phase_id: chaca.key(chaca.sequence()),
  phase_name: chaca.sequential(PHASE_NAMES),
  start_date: chaca.sequential(PHASE_DATES.map((d) => d.start_date)),
  finish_date: chaca.sequential(PHASE_DATES.map((d) => d.finish_date)),
  count_teams: chaca.sequential([16, 8, 4, 2]),
});
