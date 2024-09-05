import { modules } from "../../../src";

describe("# Image schema tests", () => {
  it("Animal test", () => {
    const value = modules.image.animal();
    expect(typeof value).toBe("string");
  });

  it("3D test", () => {
    const value = modules.image.threeDimension();
    expect(typeof value).toBe("string");
  });

  it("Animate avatar test", () => {
    const value = modules.image.animateAvatar();
    expect(typeof value).toBe("string");
  });

  it("Architecture test", () => {
    const value = modules.image.architecture();
    expect(typeof value).toBe("string");
  });

  it("Art test", () => {
    const value = modules.image.art();
    expect(typeof value).toBe("string");
  });

  it("Event test", () => {
    const value = modules.image.event();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = modules.image.fashion();
    expect(typeof value).toBe("string");
  });

  it("Fashion test", () => {
    const value = modules.image.fashion();
    expect(typeof value).toBe("string");
  });

  it("Film test", () => {
    const value = modules.image.film();
    expect(typeof value).toBe("string");
  });

  it("Food test", () => {
    const value = modules.image.food();
    expect(typeof value).toBe("string");
  });

  it("Health test", () => {
    const value = modules.image.health();
    expect(typeof value).toBe("string");
  });

  it("History test", () => {
    const value = modules.image.history();
    expect(typeof value).toBe("string");
  });

  it("Nature test", () => {
    const value = modules.image.nature();
    expect(typeof value).toBe("string");
  });

  it("People test", () => {
    const value = modules.image.people();
    expect(typeof value).toBe("string");
  });

  it("Spiritual test", () => {
    const value = modules.image.spiritual();
    expect(typeof value).toBe("string");
  });

  it("Sport test", () => {
    const value = modules.image.sport();
    expect(typeof value).toBe("string");
  });

  it("Street test", () => {
    const value = modules.image.street();
    expect(typeof value).toBe("string");
  });

  it("Travel test", () => {
    const value = modules.image.travel();
    expect(typeof value).toBe("string");
  });

  it("Wallpaper test", () => {
    const value = modules.image.wallpaper();
    expect(typeof value).toBe("string");
  });
});
