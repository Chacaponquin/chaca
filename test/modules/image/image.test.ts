import { modules } from "../../../src";

describe("# Image schema tests", () => {
  it("Animal test", () => {
    const value = modules.image.animal().getValue();
    expect(typeof value).toBe("string");
  });

  it("3D test", () => {
    const value = modules.image.threeDimension().getValue();
    expect(typeof value).toBe("string");
  });

  it("Animate avatar test", () => {
    const value = modules.image.animateAvatar().getValue();
    expect(typeof value).toBe("string");
  });

  it("Architecture test", () => {
    const value = modules.image.architecture().getValue();
    expect(typeof value).toBe("string");
  });

  it("Art test", () => {
    const value = modules.image.art().getValue();
    expect(typeof value).toBe("string");
  });

  it("Event test", () => {
    const value = modules.image.event().getValue();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = modules.image.fashion().getValue();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = modules.image.fashion().getValue();
    expect(typeof value).toBe("string");
  });

  it("Film test", () => {
    const value = modules.image.film().getValue();
    expect(typeof value).toBe("string");
  });

  it("Food test", () => {
    const value = modules.image.food().getValue();
    expect(typeof value).toBe("string");
  });

  it("Health test", () => {
    const value = modules.image.health().getValue();
    expect(typeof value).toBe("string");
  });

  it("History test", () => {
    const value = modules.image.history().getValue();
    expect(typeof value).toBe("string");
  });

  it("Nature test", () => {
    const value = modules.image.nature().getValue();
    expect(typeof value).toBe("string");
  });

  it("People test", () => {
    const value = modules.image.people().getValue();
    expect(typeof value).toBe("string");
  });

  it("Spiritual test", () => {
    const value = modules.image.spiritual().getValue();
    expect(typeof value).toBe("string");
  });

  it("Sport test", () => {
    const value = modules.image.sport().getValue();
    expect(typeof value).toBe("string");
  });

  it("Street test", () => {
    const value = modules.image.street().getValue();
    expect(typeof value).toBe("string");
  });

  it("Travel test", () => {
    const value = modules.image.travel().getValue();
    expect(typeof value).toBe("string");
  });

  it("Wallpaper test", () => {
    const value = modules.image.wallpaper().getValue();
    expect(typeof value).toBe("string");
  });
});
