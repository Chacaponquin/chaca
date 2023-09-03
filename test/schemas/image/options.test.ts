import { schemas } from "../../../src";

describe("# Image schema tests", () => {
  it("Animal test", () => {
    const value = schemas.image.animal().getValue();
    expect(schemas.image.constants.animal.includes(value)).toBe(true);
  });

  it("Animate avatar test", () => {
    const value = schemas.image.animateAvatar().getValue();
    expect(typeof value).toBe("string");
  });

  it("Architecture test", () => {
    const value = schemas.image.architecture().getValue();
    expect(schemas.image.constants.architecture.includes(value)).toBe(true);
  });

  it("Art test", () => {
    const value = schemas.image.art().getValue();
    expect(schemas.image.constants.art.includes(value)).toBe(true);
  });

  it("Event test", () => {
    const value = schemas.image.event().getValue();
    expect(schemas.image.constants.event.includes(value)).toBe(true);
  });

  it("Fashion test", () => {
    const value = schemas.image.fashion().getValue();
    expect(schemas.image.constants.fashion.includes(value)).toBe(true);
  });

  it("Fashion test", () => {
    const value = schemas.image.fashion().getValue();
    expect(schemas.image.constants.fashion.includes(value)).toBe(true);
  });

  it("Film test", () => {
    const value = schemas.image.film().getValue();
    expect(schemas.image.constants.film.includes(value)).toBe(true);
  });

  it("Food test", () => {
    const value = schemas.image.food().getValue();
    expect(schemas.image.constants.food.includes(value)).toBe(true);
  });

  it("Health test", () => {
    const value = schemas.image.health().getValue();
    expect(schemas.image.constants.health.includes(value)).toBe(true);
  });

  it("History test", () => {
    const value = schemas.image.history().getValue();
    expect(schemas.image.constants.history.includes(value)).toBe(true);
  });

  it("Nature test", () => {
    const value = schemas.image.nature().getValue();
    expect(schemas.image.constants.nature.includes(value)).toBe(true);
  });

  it("People test", () => {
    const value = schemas.image.people().getValue();
    expect(schemas.image.constants.people.includes(value)).toBe(true);
  });

  it("Spiritual test", () => {
    const value = schemas.image.spiritual().getValue();
    expect(schemas.image.constants.spirituality.includes(value)).toBe(true);
  });

  it("Sport test", () => {
    const value = schemas.image.sport().getValue();
    expect(schemas.image.constants.sport.includes(value)).toBe(true);
  });

  it("Street test", () => {
    const value = schemas.image.street().getValue();
    expect(schemas.image.constants.street.includes(value)).toBe(true);
  });

  it("Travel test", () => {
    const value = schemas.image.travel().getValue();
    expect(schemas.image.constants.travel.includes(value)).toBe(true);
  });

  it("Wallpaper test", () => {
    const value = schemas.image.wallpaper().getValue();
    expect(schemas.image.constants.wallpaper.includes(value)).toBe(true);
  });
});
