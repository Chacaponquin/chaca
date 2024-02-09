import { schemas } from "../../../src";

describe("# Image schema tests", () => {
  it("Animal test", () => {
    const value = schemas.image.animal().getValue();
    expect(typeof value).toBe("string");
  });

  it("3D test", () => {
    const value = schemas.image.threeDimension().getValue();
    expect(typeof value).toBe("string");
  });

  it("Animate avatar test", () => {
    const value = schemas.image.animateAvatar().getValue();
    expect(typeof value).toBe("string");
  });

  it("Architecture test", () => {
    const value = schemas.image.architecture().getValue();
    expect(typeof value).toBe("string");
  });

  it("Art test", () => {
    const value = schemas.image.art().getValue();
    expect(typeof value).toBe("string");
  });

  it("Event test", () => {
    const value = schemas.image.event().getValue();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = schemas.image.fashion().getValue();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = schemas.image.fashion().getValue();
    expect(typeof value).toBe("string");
  });

  it("Film test", () => {
    const value = schemas.image.film().getValue();
    expect(typeof value).toBe("string");
  });

  it("Food test", () => {
    const value = schemas.image.food().getValue();
    expect(typeof value).toBe("string");
  });

  it("Health test", () => {
    const value = schemas.image.health().getValue();
    expect(typeof value).toBe("string");
  });

  it("History test", () => {
    const value = schemas.image.history().getValue();
    expect(typeof value).toBe("string");
  });

  it("Nature test", () => {
    const value = schemas.image.nature().getValue();
    expect(typeof value).toBe("string");
  });

  it("People test", () => {
    const value = schemas.image.people().getValue();
    expect(typeof value).toBe("string");
  });

  it("Spiritual test", () => {
    const value = schemas.image.spiritual().getValue();
    expect(typeof value).toBe("string");
  });

  it("Sport test", () => {
    const value = schemas.image.sport().getValue();
    expect(typeof value).toBe("string");
  });

  it("Street test", () => {
    const value = schemas.image.street().getValue();
    expect(typeof value).toBe("string");
  });

  it("Travel test", () => {
    const value = schemas.image.travel().getValue();
    expect(typeof value).toBe("string");
  });

  it("Wallpaper test", () => {
    const value = schemas.image.wallpaper().getValue();
    expect(typeof value).toBe("string");
  });
});
