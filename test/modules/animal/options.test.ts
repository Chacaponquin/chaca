import { modules } from "../../../src";

describe("# Animal schema options tests", () => {
  it("Bear test", () => {
    const value = modules.animal.bear().getValue();
    expect(modules.animal.constants.bears.includes(value)).toBe(true);
  });

  it("Bird test", () => {
    const value = modules.animal.bird().getValue();
    expect(modules.animal.constants.birds.includes(value)).toBe(true);
  });

  it("Cat test", () => {
    const value = modules.animal.cat().getValue();
    expect(modules.animal.constants.cats.includes(value)).toBe(true);
  });

  it("Cocodrila test", () => {
    const value = modules.animal.crocodilia().getValue();
    expect(modules.animal.constants.cocodrilas.includes(value)).toBe(true);
  });

  it("Cetacean test", () => {
    const value = modules.animal.cetacean().getValue();
    expect(modules.animal.constants.ceteceans.includes(value)).toBe(true);
  });

  it("Cow test", () => {
    const value = modules.animal.cow().getValue();
    expect(modules.animal.constants.cows.includes(value)).toBe(true);
  });

  it("Dog test", () => {
    const value = modules.animal.dog().getValue();
    expect(modules.animal.constants.dogs.includes(value)).toBe(true);
  });

  it("Fish test", () => {
    const value = modules.animal.fish().getValue();
    expect(modules.animal.constants.fishes.includes(value)).toBe(true);
  });

  it("Hourse test", () => {
    const value = modules.animal.horse().getValue();
    expect(modules.animal.constants.hourses.includes(value)).toBe(true);
  });

  it("Insect test", () => {
    const value = modules.animal.insect().getValue();
    expect(modules.animal.constants.insects.includes(value)).toBe(true);
  });

  it("Lion test", () => {
    const value = modules.animal.lion().getValue();
    expect(modules.animal.constants.lions.includes(value)).toBe(true);
  });

  it("Rabbit test", () => {
    const value = modules.animal.rabbit().getValue();
    expect(modules.animal.constants.rabbits.includes(value)).toBe(true);
  });

  it("Rodent test", () => {
    const value = modules.animal.rodent().getValue();
    expect(modules.animal.constants.rodents.includes(value)).toBe(true);
  });

  it("Snake test", () => {
    const value = modules.animal.snake().getValue();
    expect(modules.animal.constants.snakes.includes(value)).toBe(true);
  });
});
