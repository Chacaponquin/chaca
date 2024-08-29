import { chaca, modules } from "../../../src";

export const COMPLETE_SCHEMA = chaca.schema({
  id: chaca.key(modules.id.uuid()),
  authors: {
    type: modules.person.fullName({ language: "es" }),
    isArray: 5,
  },
  image: modules.image.film(),
  likes: modules.datatype.int({ min: 0, max: 500000 }),
  category: chaca.enum([
    "Horror",
    "War",
    "History",
    "Comedy",
    "Mystery",
    "Action",
    "Animation",
    "Musical",
  ]),
  adultMovie: ({ currentFields: docFields }) => {
    return (
      docFields.category === "Horror" ||
      docFields.category === "War" ||
      docFields.category === "Action"
    );
  },
  directorsInf: {
    type: chaca.schema({
      name: modules.person.fullName({}),
      age: modules.datatype.int({ min: 18, max: 85 }),
      currentMovie: {
        type: chaca.schema({
          movieName: modules.person.firstName(),
          image: modules.image.event(),
        }),
        possibleNull: 50,
      },
      email: modules.internet.email(),
    }),
    isArray: { min: 1, max: 4 },
  },
});
