import { chaca, modules } from "../../../../../../../src";
import { GEO_LOCATION } from "./geolocation";

export const AIRPORT_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.lorem.words(),
  country: () => modules.address.country(),
  geo: GEO_LOCATION,
});
