### chaca@1.5.1

### 🪛 Fix

#### Schemas

- Fix extra blank space in `PersonSchema.fullName`

## chaca@1.5.0

### 🌚 Features

#### Fields

- Add `sequence field`
- Add `sequential field`
- Add `ref field`
- Add `key field`
- Add `enum field`

#### Schemas

- Add `ColorSchema`
- Delete `numberRow` from `IdSchema`

#### Utils

- Add `utils.sumDateRange` to change dates by range

#### Generators

- Add `PostgreSQL` code generator
- Add `chaca.multiGenerate` to generate relational schemas data
- Add `chaca.exportFromSchemas` to export and generate relational schemas data
- Add `schema.generateObject` to generate single object of data schema

### 🪛 Fix

#### Generators

- Now you can export any type of data in all extensions

#### Utils

- Fix `utils.camelCase`

## chaca@1.1.0

- Add YAML code generator
- Fix `Internet.email` schema error
- Fix `Person.fullName` schema error
- Remove `chaca.exportAll` method

## chaca@1.0.0

- Initial release
