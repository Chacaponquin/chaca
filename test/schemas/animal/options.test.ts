import { schemas } from "../../../src";

describe("# Animal schema options tests", () => {
  it("Bear test", () => {
    const value = schemas.animal.bear().getValue();
    expect(schemas.animal.constants.bears.includes(value)).toBe(true);
  });

  it("Bird test", () => {
    const value = schemas.animal.bird().getValue();
    expect(schemas.animal.constants.birds.includes(value)).toBe(true);
  });

  it("Cat test", () => {
    const value = schemas.animal.cat().getValue();
    expect(schemas.animal.constants.cats.includes(value)).toBe(true);
  });

  it("Cocodrila test", () => {
    const value = schemas.animal.crocodilia().getValue();
    expect(schemas.animal.constants.cocodrilas.includes(value)).toBe(true);
  });

  it("Cetacean test", () => {
    const value = schemas.animal.cetacean().getValue();
    expect(schemas.animal.constants.ceteceans.includes(value)).toBe(true);
  });

  it("Cow test", () => {
    const value = schemas.animal.cow().getValue();
    expect(schemas.animal.constants.cows.includes(value)).toBe(true);
  });

  it("Dog test", () => {
    const value = schemas.animal.dog().getValue();
    expect(schemas.animal.constants.dogs.includes(value)).toBe(true);
  });

  it("Fish test", () => {
    const value = schemas.animal.fish().getValue();
    expect(schemas.animal.constants.fishes.includes(value)).toBe(true);
  });

  it("Hourse test", () => {
    const value = schemas.animal.horse().getValue();
    expect(schemas.animal.constants.hourses.includes(value)).toBe(true);
  });

  it("Insect test", () => {
    const value = schemas.animal.insect().getValue();
    expect(schemas.animal.constants.insects.includes(value)).toBe(true);
  });

  it("Lion test", () => {
    const value = schemas.animal.lion().getValue();
    expect(schemas.animal.constants.lions.includes(value)).toBe(true);
  });

  it("Rabbit test", () => {
    const value = schemas.animal.rabbit().getValue();
    expect(schemas.animal.constants.rabbits.includes(value)).toBe(true);
  });

  it("Rodent test", () => {
    const value = schemas.animal.rodent().getValue();
    expect(schemas.animal.constants.rodents.includes(value)).toBe(true);
  });

  it("Snake test", () => {
    const value = schemas.animal.snake().getValue();
    expect(schemas.animal.constants.snakes.includes(value)).toBe(true);
  });
});
