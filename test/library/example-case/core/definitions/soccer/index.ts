import { chaca } from "../../../../../../src";
import { COACH_SCHEMA } from "./schemas/coach";
import { INJURY_SCHEMA } from "./schemas/injury";
import { MATCH_SCHEMA } from "./schemas/match";
import { MATCH_REFEREE_SCHEMA } from "./schemas/match-referee";
import { PLAYER_SCHEMA } from "./schemas/player";
import { REFEREE_SCHEMA } from "./schemas/referee";
import { SPONSOR_SCHEMA } from "./schemas/sponsor";
import { TEAM_SPONSOR } from "./schemas/team-sponsor";
import { TEAM_SCHEMA } from "./schemas/teams";
import { TOURNAMENT_SCHEMA } from "./schemas/tournament";
import { TRANSFER_SCHEMA } from "./schemas/transfer";

export const SOCCER_TOURNAMENTE_DATASET = chaca.dataset([
  { schema: COACH_SCHEMA, documents: 100, name: "Coach" },
  {
    name: "Injury",
    schema: INJURY_SCHEMA,
    documents: 20,
  },
  { name: "Match_Referee", documents: 40, schema: MATCH_REFEREE_SCHEMA },
  { documents: 40, name: "Match", schema: MATCH_SCHEMA },
  { documents: 500, name: "Player", schema: PLAYER_SCHEMA },
  { documents: 25, name: "Referee", schema: REFEREE_SCHEMA },
  { documents: 40, name: "Sponsor", schema: SPONSOR_SCHEMA },
  { documents: 40, name: "Team_Sponsor", schema: TEAM_SPONSOR },
  { documents: 5, name: "Tournament", schema: TOURNAMENT_SCHEMA },
  { documents: 60, name: "Transfer", schema: TRANSFER_SCHEMA },
  { documents: 10, name: "Team", schema: TEAM_SCHEMA },
]);
