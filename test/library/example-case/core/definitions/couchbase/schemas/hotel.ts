import { chaca, modules } from "../../../../../../../src";
import { GEO_LOCATION } from "./geolocation";

const REVIEW_SCHEMA = chaca.schema({
  author: () => modules.person.fullName(),
  content: () => modules.lorem.paragraphs(),
  date: () => modules.date.past(),
  ratings: chaca.schema({
    cleanliness: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    business_service: () =>
      modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    check_in: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    location: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    overall: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    rooms: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    service: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    sleep_quality: () =>
      modules.datatype.float({ min: 0, max: 5, precision: 2 }),
    value: () => modules.datatype.float({ min: 0, max: 5, precision: 2 }),
  }),
});

export const HOTEL_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  country: () => modules.address.country(),
  description: () => modules.lorem.paragraphs(),
  geo: GEO_LOCATION,
  name: () => modules.lorem.words(),
  pets_ok: () => modules.datatype.boolean(),
  public_likes: {
    type: chaca.ref("User.id", {
      where: ({ refFields, currentFields }) => {
        return (
          refFields.role === "customer" &&
          !currentFields.public_likes.includes(refFields.id)
        );
      },
    }),
    isArray: { min: 0, max: 500 },
  },
  reviews: { type: REVIEW_SCHEMA, isArray: { min: 0, max: 500 } },
  title: () => modules.lorem.words(),
});
