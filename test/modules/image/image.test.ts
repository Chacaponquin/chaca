import { modules } from "../../../src";
import { describe, expect, it } from "vitest";

describe("image modules", () => {
  it("image.animal", () => {
    const value = modules.image.animal();
    expect(typeof value).toBe("string");
  });

  it("image.threeDimension", () => {
    const value = modules.image.threeDimension();
    expect(typeof value).toBe("string");
  });

  it("image.animatedAvatar", () => {
    const value = modules.image.animatedAvatar();
    expect(typeof value).toBe("string");
  });

  it("image.architecture", () => {
    const value = modules.image.architecture();
    expect(typeof value).toBe("string");
  });

  it("image.art", () => {
    const value = modules.image.art();
    expect(typeof value).toBe("string");
  });

  it("image.event", () => {
    const value = modules.image.event();
    expect(typeof value).toBe("string");
  });

  it("image.fashion", () => {
    const value = modules.image.fashion();
    expect(typeof value).toBe("string");
  });

  it("image.film", () => {
    const value = modules.image.film();
    expect(typeof value).toBe("string");
  });

  it("image.food", () => {
    const value = modules.image.food();
    expect(typeof value).toBe("string");
  });

  it("image.health", () => {
    const value = modules.image.health();
    expect(typeof value).toBe("string");
  });

  it("image.history", () => {
    const value = modules.image.history();
    expect(typeof value).toBe("string");
  });

  it("image.nature", () => {
    const value = modules.image.nature();
    expect(typeof value).toBe("string");
  });

  it("image.people", () => {
    const value = modules.image.people();
    expect(typeof value).toBe("string");
  });

  it("image.spiritual", () => {
    const value = modules.image.spiritual();
    expect(typeof value).toBe("string");
  });

  it("image.sport", () => {
    const value = modules.image.sport();
    expect(typeof value).toBe("string");
  });

  it("image.street", () => {
    const value = modules.image.street();
    expect(typeof value).toBe("string");
  });

  it("image.travel", () => {
    const value = modules.image.travel();
    expect(typeof value).toBe("string");
  });

  it("image.wallpaper", () => {
    const value = modules.image.wallpaper();
    expect(typeof value).toBe("string");
  });
});
