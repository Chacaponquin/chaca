<p align="center"><img align="center" width="200" src="https://res.cloudinary.com/chaca-sa/image/upload/v1681924431/Logopit_1681682634889_hywzcu.png" style="max-width: 100%"/></p>

<p align="center" style="font-size: 20px; font-weight: 600">🌚 Think your data and let Chaca create it.</p>

## 😀 Intro

Welcome to Chaca a powerful TypeScript library that revolutionizes mock data generation for testing and development processes. With Chaca, you can effortlessly generate realistic and diverse fake data to simulate different scenarios. Whether you're building a web application, a mobile app, or an API, Chaca's extensive support ensures seamless integration into your projects.

What's more, Chaca allows you to export the generated data to various formats, making it easy to share and analyze. Boost your development workflow and eliminate tedious manual data creation with Chaca."

## 📦 Installation

```shell
npm install chaca

```

## 📘 Documentation

Visit our website to read the documentation. [Chaca Docs](https://chaca-doc.vercel.app/)

## 😎 Usage

```ts
import { chaca, schemas } from "chaca";

const movieSchema = chaca.schema({
  id: schemas.id.uuid(),
  authors: {
    type: schemas.person.fullName({ language: "es" }),
    isArray: { min: 1, max: 3 },
  },
  image: schemas.image.film(),
  likes: schemas.dataType.int({ min: 0, max: 500000 }),
  category: chaca.enum(["Horror", "War", "History", "Comedy"]),
  adultMovie: ({ currentFields: docFields }) => {
    return (
      docFields.category === "Horror" ||
      docFields.category === "War" ||
      docFields.category === "Action"
    );
  },
});

// Generate 20 objects with the defined schema
const docs = postSchema.generate(20);

/*
[
  {
    id: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
    authors: ["Olivia Gonzalez Gomez", "Santiago Torres Gil"],
    image:
      "https://images.unsplash.com/photo-1534684686641-05569203ecca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHw1fHxmaWxtfGVufDB8fHx8MTY2Njk3MDgyMQ&ixlib=rb-4.0.3&q=80",
    likes: 21456,
    category: "Horror",
    adultMovie: true,
  },
  ...rest, // 19 more documents
];
*/

// Generate 20 objects and export them in a json file
await movieSchema.generateAndExport(20, {
  fileName: "movies",
  format: "json",
  location: "./folder",
});

```

## 🕹️ CLI

See [CLI guide](https://chaca-doc.vercel.app/docs/guide/command-line)

## 🌐 Try our REST API

If you don't want to use our npm package you can use our [REST API](https://chaca-doc.vercel.app/docs/api-rest/overview) to create your mock data

## 🗂️ Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](https://github.com/Chacaponquin/chaca/blob/main/CHANGELOG.md).

## Contributing

The Chaca project welcomes all constructive contributions. Contributions take many forms, from code for bug fixes and enhancements, to additions and fixes to documentation, additional tests, triaging incoming pull requests and issues, and more!. [See CONTRIBUTING.md](https://github.com/Chacaponquin/chaca/blob/chaca-dev/CONTRIBUTING.md)

## License

MIT
