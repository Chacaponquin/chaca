import { chaca } from "../../../../../../src";
import { AIRLINE_SCHEMA } from "./schemas/airline";
import { AIRPORT_SCHEMA } from "./schemas/airport";
import { HOTEL_SCHEMA } from "./schemas/hotel";
import { ROUTE } from "./schemas/route";
import { USER } from "./schemas/user";

export const COUCHBASE_DATASET = chaca.dataset([
  { name: "Airline", documents: 80, schema: AIRLINE_SCHEMA },
  { name: "Airport", documents: 10, schema: AIRPORT_SCHEMA },
  { name: "Hotel", documents: 10, schema: HOTEL_SCHEMA },
  { name: "Route", documents: 200, schema: ROUTE },
  { name: "User", documents: 300, schema: USER },
]);
