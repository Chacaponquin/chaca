import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# Animal schema options tests", () => {
  it("Bear test", () => {
    const value = modules.animal.bear();
    expect(modules.animal.constants.bears.includes(value)).toBe(true);
  });

  it("Bird test", () => {
    const value = modules.animal.bird();
    expect(modules.animal.constants.birds.includes(value)).toBe(true);
  });

  it("Cat test", () => {
    const value = modules.animal.cat();
    expect(modules.animal.constants.cats.includes(value)).toBe(true);
  });

  it("Cocodrila test", () => {
    const value = modules.animal.crocodilia();
    expect(modules.animal.constants.cocodrilas.includes(value)).toBe(true);
  });

  it("Cetacean test", () => {
    const value = modules.animal.cetacean();
    expect(modules.animal.constants.ceteceans.includes(value)).toBe(true);
  });

  it("Cow test", () => {
    const value = modules.animal.cow();
    expect(modules.animal.constants.cows.includes(value)).toBe(true);
  });

  it("Dog test", () => {
    const value = modules.animal.dog();
    expect(modules.animal.constants.dogs.includes(value)).toBe(true);
  });

  it("Fish test", () => {
    const value = modules.animal.fish();
    expect(modules.animal.constants.fishes.includes(value)).toBe(true);
  });

  it("Hourse test", () => {
    const value = modules.animal.horse();
    expect(modules.animal.constants.hourses.includes(value)).toBe(true);
  });

  it("Insect test", () => {
    const value = modules.animal.insect();
    expect(modules.animal.constants.insects.includes(value)).toBe(true);
  });

  it("Lion test", () => {
    const value = modules.animal.lion();
    expect(modules.animal.constants.lions.includes(value)).toBe(true);
  });

  it("Rabbit test", () => {
    const value = modules.animal.rabbit();
    expect(modules.animal.constants.rabbits.includes(value)).toBe(true);
  });

  it("Rodent test", () => {
    const value = modules.animal.rodent();
    expect(modules.animal.constants.rodents.includes(value)).toBe(true);
  });

  it("Snake test", () => {
    const value = modules.animal.snake();
    expect(modules.animal.constants.snakes.includes(value)).toBe(true);
  });
});
