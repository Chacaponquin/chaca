<p align="center"><img align="center" width="200" src="https://res.cloudinary.com/chaca-sa/image/upload/v1681924431/Logopit_1681682634889_hywzcu.png" style="max-width: 100%"/></p>

<p align="center">Think your data and let Chaca create it.</p>

> **Note** This is the first version we released so any suggestions or bug reports are appreciated. Thanks!!!

## Instalation

```shell
 npm install chaca
```

## Usage

```ts
import { chaca, schemas } from "chaca";

type MoviePost = {
  id: string;
  authors: string[];
  image: string;
  likes: number;
  category: string;
  adultMovie: boolean;
  directorInf: {
    name: string;
    age: number;
  };
};

const postSchema = chaca.schema<MoviePost>({
  id: schemas.id.uuid(),
  authors: {
    type: schemas.person.fullName({ language: "es" }),
    isArray: 5,
  },
  image: schemas.image.film(),
  likes: schemas.dataType.int({ min: 0, max: 500000 }),
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
  directorInf: chaca.schema({
    name: schemas.person.fullName(),
    age: schemas.dataType.int({ min: 18, max: 85 }),
  }),
});

const docs = postSchema.generate(20);

//Generate 20 objects with the defined schema
//Example:
[
  {
    id: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
    authors: [
      "Olivia Gonzalez Gomez",
      "Santiago Torres Gil",
      "Amelia Ruiz Muñoz",
      "Camila Santiago Garcia",
      "Javier Moreno Romero",
    ],
    image:
      "https://images.unsplash.com/photo-1534684686641-05569203ecca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHw1fHxmaWxtfGVufDB8fHx8MTY2Njk3MDgyMQ&ixlib=rb-4.0.3&q=80",
    likes: 21456,
    category: "Horror",
    adultMovie: true,
    directorInf: {
      name: "Alice Adams Barker",
      age: 29,
    },
  },
  ...rest, // 19 more documents
];

//Generate 20 objects and export them in a json file
await postSchema.generateAndExport(20, {
  fileName: "data",
  format: "json",
  location: "./folder",
});
```

## Fields Type

### `schema field`

We have several defined schemas that can be used for data creation. You can use them by importing the `schemas` module

```ts
import { schemas } from "chaca";

// Get the Schema
schemas.person.firstName();

// Get a value from the schema
schemas.person.firstName().getValue(); // 'Juan'
// Get a value from the schema with arguments
schemas.person.firstName().getValue({ sex: "female" }); // 'Camila'
```

- `address`
- `dataType`
- `finance`
- `date`
- `animal`
- `id`
- `image`
- `video`
- `internet`
- `lorem`
- `person`
- `phone`
- `science`
- `system`
- `vehicle`
- `word`

### `enum`

Returns one of the values of the array passed as argument

```ts
chaca.enum([1, 2, 3, 4, 5]); // 5;
chaca.enum([]); // throws an error
```

### `custom`

Function that allows customizing a value based on the current state of the dataset

```ts
{
  isOlder: ({ currentFields }) => {
    return currentFields.age >= 18;
  };
}
```

### `key`

Indicates that the field is the schema key

```ts
{
  id: chaca.key(schemas.id.uuid());
}
```

> **⚠️ Warning**
>
> - `sequential`, `enum` and `nested schema` fields can not be schema keys.
> - In case of being a `schema field` or `custom` field it must return a string, number or Date.

### `ref`

Reference to another schema, indicates that it will have one of the generated values of the selected field.

```ts
{
  user_id: chaca.ref("User.id");
}
```

> **⚠️ Warning**
>
> - The field to reference must be a `key`.

#### Config

- `where`

  Function that indicates if the ref value is valid

  ```ts
  {
    user_id: chaca.ref("User.id", ({ refFields: userFields }) => {
      // will only choose the ids of users older than 18
      return userFields.age > 18;
    });
  }
  ```

- `unique`

  Indicates if the selected value can not be chosen by another documents of that schema.

  ```ts
  {
    // rest fields
    user_id: chaca.ref("User.id", { unique: true });
  }
  ```

### `sequential`

Array of values that will be assigned according to the number of the document being created.

```ts
const postSchema = chaca.schema({
  count_likes: chaca.sequential([1345, 2781, 90, 234]),
  // rest fields
});

// the first post (count_likes = 1345)
// the second post (count_likes = 2781)
// the third post (count_likes = 90)
// the fourth post (count_likes = 234)
postSchema.generate(4);
```

### `sequence`

Returns anumber that increments for each document created.

```ts
const userSchema = chaca.schema({
  id: chaca.sequence(),
  // rest fields
});

userSchema.generate(4); // [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
```

#### Config

- `starsWith`

  The number to start with.

- `step`

  Step between values.

### `nested schema`

You can also make the field an object of information using an nested schema

```ts
{
  // rest fields,
  userInf: chaca.schema({
    firstName: schemas.person.firstName(),
    favoriteCats: {
      type: schemas.animal.cat(),
      isArray: { min: 1, max: 10 },
    },
    description: schemas.lorem.text(),
  });
}
```

## Field Config API

### `type`

Indicates the field type

```ts
// With a defined Schema Field
{
  type: schemas.image.film();
}
```

### `isArray`

Indicates if the field is an array of values of the the selected schema

```ts
isArray: true; // The field would be an array with length between 0 and 10
isArray: { min: 5, max: 10 } // the field would be an array with length between 5 and 10
isArray: 20 // The field would be an array with length 20
```

### `posibleNull`

Indicates the possibility that the field returns `null`

```ts
posibleNull: true; // the field has a 50% chance of being null

//The number indicates de chance porcent
posibleNull: 60; // the field has a 60% chance of being null
```

## Relational Schemas

```ts
const POST_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.mongodbID()),
  title: schemas.word.noun(),
  likes: schemas.dataType.int({ min: 0 }),
  user_id: chaca.ref("User.id"),
});

const USER_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.mongodbID()),
  age: schemas.dataType.int({ min: 15, max: 90 }),
  username: schemas.internet.userName(),
  image: schemas.image.people(),
});

const POST_CATEGORY_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.uuid()),
  categoryName: schemas.word.adjective(),
  postID: chaca.ref("Post.id"),
});

// generate data
const DATA = chaca.multiGenerate([
  { name: "Post", documents: 40, schema: POST_SCHEMA },
  { name: "Category Post", documents: 50, schema: POST_CATEGORY_SCHEMA },
  { name: "User", documents: 40, schema: USER_SCHEMA },
]);

//{
//  "Post": [...posts],
//  "Category Post": [...categories],
//  "User": [...users]
//}
```

## Custom Schema Fields

If none of the defined schemas are useful you can create your own schemas with the `schemaField` method.

```ts
import { chaca } from "chaca";

type SchemaArguments = {
  a: number;
  b: number;
};

// Define Schema Field
const mySchemaField = chaca.schemaField<SchemaArguments, number>(
  "mySchemaField",
  ({ a, b }) => {
    return a + b;
  },
);

// Usage
const mySchema = chaca.schema({
  sum: mySchemaField({ a: 5, b: 10 }), // In all the generated objects the sum field is 15
});
```

## Export

You can export your data in different file formats with the following methods

### `chaca.export`

```ts
const data = [
  {
    id: "7b35fg960g8g1b589b0d8a4d",
    image: "https://images.pexels.com/photos/157543/pexels-photo-157543.jpeg",
    name: "Jose",
  },
  ...rest,
];

// Export the data in a json file inside the `dataFolder` folder
const fileLocation = await chaca.export(data, {
  fileName: "myData",
  location: "./dataFolder",
  format: "json",
});
```

### `chaca.exportFromSchemas`

```ts
await chaca.exportFromSchemas(
  [
    { name: "Post", documents: 40, schema: POST_SCHEMA },
    { name: "Category Post", documents: 50, schema: POST_CATEGORY_SCHEMA },
    { name: "User", documents: 40, schema: USER_SCHEMA },
  ],
  {
    fileName: "myData",
    location: "./dataFolder",
    format: "json",
  },
);
```

## Export API

```ts
{
  // Name of the file that will be export
  fileName: "data",

  // Extension of the file data
  // You can export in `json`, `csv`, `java`, `javascript`, `typescript`, `yaml`, `postgresql`
  format: "json",

  // Location of the folder that will be our data
  location: "./folder"
}
```

## Contributing

The Chaca project welcomes all constructive contributions. Contributions take many forms, from code for bug fixes and enhancements, to additions and fixes to documentation, additional tests, triaging incoming pull requests and issues, and more!

## License

MIT
