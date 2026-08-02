# Example cases

Real-world usage examples of `chaca`. Each case defines a relational dataset that mimics a production domain, generates it, validates its business rules, and exports it to every supported format.

These tests serve two purposes:

1. **Integration testing** — they exercise the whole pipeline (`chaca.dataset` → `generate()` → `export()`) with schemas that combine most of the library's features: `chaca.key`, `chaca.ref` (with `unique` and `where` filters), `chaca.enum`, `chaca.probability`, `possibleNull`, dynamic `documents` counts, and cross-schema lookups through the `store`.
2. **Living documentation** — they show how to model a realistic domain with chaca. If you want to learn how to build relational datasets, start here.

## Cases

| Case                            | Domain                                                              |
| ------------------------------- | ------------------------------------------------------------------- |
| [ecommerce](ecommerce/README.md)   | Online store: users, products, orders, payments, shipments, support. |
| [university](university/README.md) | University: students, courses, registrations, grades, library.       |
| [airline](airline/README.md)       | Flight network: fleet, routes, crews, bookings, check-ins, baggage.  |

## Structure

Each case lives in its own folder, next to the shared runner:

```
example-case/
├── core/
│   └── example-case.ts    # ExampleCaseTest: shared generate + export runner
└── <case>/
    ├── README.md          # Entities, relationships and validated rules
    ├── <case>.test.ts     # Entry point: dataset + business-rule assertions
    └── definitions/       # One chaca.schema per entity + definition.ts (the dataset)
```

`ExampleCaseTest` (in [core/example-case.ts](core/example-case.ts)) does two things:

- **Generation checks**: runs `dataset.generate()` once and passes the result to the case's `check` callback.
- **Export checks**: exports the dataset to `postgresql`, `csv`, `java`, `python`, `javascript`, `typescript`, `yaml` and `json`, covering the relevant option combinations of each format (`zip`, `separate`, `declarationOnly`, `generateIds`), and asserts every produced file exists. Output goes to `data/cases/<case>/<format>/<variant>/` (git-ignored).

## Adding a new case

1. Create `<your-case>/definitions/` with one schema file per entity and a `definition.ts` exporting the `chaca.dataset`.
2. Create `<your-case>/<your-case>.test.ts` instantiating `ExampleCaseTest` with the dataset, a `filename`/`location`, and a `check` callback asserting the business rules of your domain.
3. Document the entities, relationships and rules in `<your-case>/README.md`.
4. Run it with `npm run test:cases`.
