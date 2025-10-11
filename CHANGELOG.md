# chaca@2.1.0

## 🌚 Features

- All dataset, schema and dataset store operations are now async functions
- You can define the number of documents to generate as a function that depends on the current state of the dataset.

  ```ts
  chaca.dataset([
    {
      name: "User",
      schema: userSchema,
      documents: 50,
    },
    {
      name: "Writer",
      schema: writerSchema,
      documents: async ({ store }) => {
        const users = await store.get("User");

        return users.filter((u) => u.role === "writer");
      },
    },
  ]);
  ```

## 🪛 Fix

- Issues with `date.birthdate` generation problems were fixed

# chaca@2.0.0

## 🌚 Features

### Core

- The `Dataset` class was created to export various schemas in a relational way
- You can now define the `isArray` parameter as a function that is executed when each document is created.

  ```ts
  const schema = chaca.schema({
    image: {
      type: () => modules.image.people(),
      isArray: ({ currentFields, store }) => {
        return 5;

        // or

        return {
          min: 2,
          max: 10,
        };
      },
    },
  });
  ```

- Added exception `WrongPossibleNullDefinitionError` for errors in the definition of the parameter `possibleNull`
- Added exception `WrongArrayDefinitionError` for errors in the definition of the parameter `isArray`
- Added exception `WrongProbabilityFieldDefinitionError` for errors in the definition of `probability` fields
- 🗑️ `chaca.multiGenerate` was removed
- 🎉 The number of items to select in the `pick` field can be defined as a range of values ​​or a function that returns the number of values ​​to choose from.

  ```ts
  // range
  chaca.pick({
    values: [1, 2, 3, 4, 5],
    count: {
      min: 1,
      max: 3,
    },
  });

  // function
  chaca.pick({
    values: [1, 2, 3, 4, 5],
    count: ({ store, currentFields }) => {
      return 2;

      // or

      return {
        min: 1,
        max: 3,
      };
    },
  });
  ```

- Added `nullOnEmpty` parameter to avoid `NotEnoughValuesForRefError` exception
- The `ref` fields can reference the schema they are located in without causing a circular dependency.
- 🎉 Added `Dataset.transform`, `Schema.transform` and `Chaca.transform` methods to serialize data to a specific file format without having to export it
- 🎉 Added new CLI commands
  - `json`
  - `python`
  - `java`
  - `js`
  - `json`
  - `postgresql`
  - `ts`
  - `yaml`

### Modules

- 🎉 Added `datatype.octal`
- 🎉 Added `datatype.numeric`
- 🎉 Added `datatype.bigint`
- 🎉 Added `datatype.character`
- 🎉 Added `id.nanoid`
- 🎉 Added `id.ulid`
- 🎉 Added `id.cuid`
- 🎉 Added `image.category`
- 🎉 Added `color.human`
- 🎉 Added `date.anytime`
- 🎉 Added `finance.litecoinAddress`
- 🎉 Added `internet.ip`
- 🎉 Added `address.ordinalDirection`
- 🎉 Added `lorem.word`
- 🎉 Added `lorem.sentence`
- 🎉 Added `lorem.paragraph`
- 🎉 Added `person.zodiacSign`
- 🎉 Added `system.cron`
- 🎉 Added `address.longitude`
- 🎉 Added `address.latitude`
- The `prefix` argument was added to the `datatype.alphaNumeric` module

### Utils

- 🎉 Added `utils.pick` to select elements from an array without being chosen more than once
- 🎉 Added `utils.multiple` To create an array of values ​​from a generator
- 🎉 Added `banned` and `symbols` options on `utils.replaceSymbols`
- 🗑️ Deleted `utils.capitalCamelCase`
- 🗑️ Deleted `utils.capitalize`
- 🗑️ Deleted `utils.capitalizeWord`
- 🎉 Added `utils.snakeCase`
- 🎉 Added `utils.dotCase`
- 🎉 Added `utils.sentenceCase`
- 🎉 Added `utils.capitalCase`
- 🎉 Added `utils.pascalCase`

## 🪛 Fix

### Core

- 🔄 `DatasetStore.getValue` -> `DatasetStore.get`
- 🔄 The `schemas` concept was changed to `modules` for predefined functions
- 🗑️ The `SchemaField` class and the `chaca.schemaField()` method are removed. The way to use the modules from now on is as follows

  ```js
  // get a value
  modules.id.uuid();

  // use on schemas
  const schema = chaca.schema({
    id: () => modules.id.uuid(),
  });
  ```

- Probability values ​​for the `possibleNull` param must be in the range 0 to 1 now
- 🔄 `Schema.generate` -> `Schema.array`
- 🔄 `Schema.generateObject` -> `Schema.object`
- 🔄 `FileConfig.fileName` -> `FileConfig.filename`
- 🔄 `DatasetStore.getSchemaDocuments` -> `DatasetStore.currentDocuments`
- 🔄 `NotExistFieldError` -> `NotExistRefFieldError`
- 🗑️ Removed `export` CLI command

### Modules

- 🔄 `modules.animal.animalType` -> `modules.animal.type`
- 🔄 `modules.image.animateAvatar` -> `modules.image.animatedAvatar`
- 🔄 `modules.id.mongodbID` -> `modules.id.mongodbId`

# chaca@1.9.0

## 🌚 Features

- 🎉 Add `pick` field to choose unique elements from an array

## 🪛 Fix

- 🎉 Data creation times have been reduced by 20%

# chaca@1.8.0

## 🌚 Features

- 🎉 The bundle size has been reduced by 50%
- 🗑️ `Video` schema was deleted
- 🗑️ The `constants` in `Image` schema were removed

# chaca@1.7.2

## 🪛 Fix

- Fix problems with zip exportation in `python` and `postgresql` formats
- Fix `Internet.password` schema

# chaca@1.7.1

## 🌚 Features

- Add export configurations to all formats (`java` | `csv` | `typescript` | `json` | `javascript` | `yaml` | `postgresql` | `python`)

# chaca@1.7.0

## 🪛 Fix

- Fix some problems with `sequence` fields configuration
- Upgrade error messages

## 🌚 Features

- Add conditional value function to `possibleNull` configuration

  ```ts
  const schema = chaca.schema({
    age: schemas.dataType.int({ min: 18, max: 90 }),
    actual_school_year: {
      type: schemas.dataType.int({ min: 10, max: 15 }),
      possibleNull: ({ currentFields, store }) => {
        if (currentFields.age > 25) {
          return 90; // If the age is greater than 25 years, there will be a 90% probability that the field will be null
        } else {
          return 15; // Will be a 15% probability that the field will be null;
        }
      },
    },
  });
  ```

- Add `probability` field as alternative to `enum` field

  ```ts
  // Simple definition
  const schema = chaca.schema({
    prob: chaca.probability([
      { chance: 0.9, value: 10 }, // There is a 90% chance of choosing the value 10
      { chance: 0.5, value: 5 }, // There is a 50% chance of choosing the value 5
      { chance: 0.1, value: 1 }, // There is a 10% chance of choosing the value 1
    ]),
  });

  // Conditional definition
  const schema = chaca.schema({
    test: schemas.dataType.int({ min: 0, max: 10 }),
    prob: chaca.probability([
      {
        chance: ({ currentFields, store }) => {
          if (currentFields.test > 5) {
            return 0.9;
          } else {
            return 0.2;
          }
        },
        value: 10,
      },
      { chance: 0.5, value: 5 },
      { chance: 0.1, value: 1 },
    ]),
  });
  ```

- Add export configurations for `json`, `java` and `csv` extensions
  ```ts
  chaca.export(data, {
    filename: "Data",
    localtion: "./data",
    format: { ext: "json", zip: false, separate: true },
  });
  ```

# chaca@1.6.3

## 🪛 Fix

- Add more information of fields routes in exceptions
- Add new exception `NotExistFieldError`

  ```ts
  const dataset1 = chaca.schema({
    id: chaca.key(schemas.id.uuid()),
  });

  const dataset2 = chaca.schema({
    id: chaca.ref("Dataset1.customId"), // not exist that field
  });

  const data = chaca.multiGenerate([
    { name: "Dataset1", documents: 30, schema: dataset1 },
    { name: "Dataset2", documents: 30, schema: dataset2 },
  ]); // throw a NotExistFieldError because 'customId' not exist
  ```

# chaca@1.6.2

## 🪛 Fix

- Change `internet.userName` to `internet.username`
- Fix `intener.username` and `internet.email` values generator

# chaca@1.6.1

## 🌚 Features

- Add `browser`, `oauthProvider`, `locale`, `emailProvider` options in `internet` schema
- Add more values for the `protocol` option in `internet` schema
- Add `transaction`, `subscriptionPlan` options in `finance` schema
- Add more values for `manufacturer` and `model` options in `vehicle` schema
- Add `language` option in `person` schema

## 🪛 Fix

- Allow `possibleNull` config for sequence and sequential fields
- Add more results for `internet.userName`

# chaca@1.6.0

## 🌚 Features

- Add CLI commands for export dataset from schemas configuration file

- 🐍 Add Python code generator

- Add `loop` configuration in `chaca.sequential` field

```js
// Before
const schema = chaca.schema({
  favoriteNumber: chaca.sequential([1, 2, 3]),
});

schema.generate(5); // Throws an error because there are only 3 values for 5 documents to create

// Now
const schema = chaca.schema({
  favoriteNumbers: chaca.sequential([1, 2, 3], { loop: true }),
});

schema.generate(5);

/*
[
  { favoriteNumber: 1 },
  { favoriteNumber: 2 },
  { favoriteNumber: 3 },
  { favoriteNumber: 1 },
  { favoriteNumber: 2 },
];
*/
```

- Remove names from `schema field` declaration

```js
// Before
const customField = chaca.module("customField", (args) => {
  // return value
});

// Now
const customField = chaca.module((args) => {
  // return value
});
```

## 🪛 Fix

- Allow 0 as a possible value for the `isArray` parameter
- Interfaces referring to `isArray` and `possibleNull` configurations are now accessible
- Change `posibleNull` to `possibleNull` in schema configuration
- The limit of documents to be generated by schema was eliminated
- Fix problems with CSV code generator
- Fix problems with Typescript code generator

# chaca@1.5.1

## 🪛 Fix

- Fix extra blank space in `PersonSchema.fullName` string generation

# chaca@1.5.0

## 🌚 Features

# Fields

- Add `sequence field`
- Add `sequential field`
- Add `ref field`
- Add `key field`
- Add `enum field`

# Schemas

- Add `ColorSchema`
- Delete `numberRow` from `IdSchema`

# Utils

- Add `utils.sumDateRange` to change dates by range

# Generators

- Add `PostgreSQL` code generator
- Add `chaca.multiGenerate` to generate relational schemas data
- Add `chaca.exportFromSchemas` to export and generate relational schemas data
- Add `schema.object` to generate single object of data schema

## 🪛 Fix

# Generators

- Now you can export any type of data in all extensions

# Utils

- Fix `utils.camelCase`

# chaca@1.1.0

- Add YAML code generator
- Fix `Internet.email` schema error
- Fix `Person.fullName` schema error
- Remove `chaca.exportAll` method

# chaca@1.0.0

- Initial release
