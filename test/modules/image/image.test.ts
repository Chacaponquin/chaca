import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

type ImageMethod =
  | "food"
  | "event"
  | "wallpaper"
  | "threeDimension"
  | "architecture"
  | "nature"
  | "fashion"
  | "film"
  | "people"
  | "health"
  | "street"
  | "animal"
  | "spiritual"
  | "travel"
  | "art"
  | "history"
  | "sport"
  | "house";

function expectLexicaUrl(value: string): URL {
  const url = new URL(value);

  expect(url.host).toBe("lexica.art");
  expect(url.pathname).toBe("/api/v1/search");

  return url;
}

function expectSizeInRange(url: URL, param: "width" | "height"): number {
  const raw = url.searchParams.get(param);

  expect(raw).not.toBeNull();

  const size = Number(raw);

  expect(Number.isInteger(size)).toBe(true);
  expect(size).toBeGreaterThanOrEqual(640);
  expect(size).toBeLessThanOrEqual(4000);

  return size;
}

describe("image modules", () => {
  it.each<[method: ImageMethod, category: string]>([
    ["food", "food"],
    ["event", "event"],
    ["wallpaper", "wallpaper"],
    ["threeDimension", "3d"],
    ["architecture", "architecture"],
    ["nature", "nature"],
    ["fashion", "fashion"],
    ["film", "film"],
    ["people", "people"],
    ["health", "health"],
    ["street", "street"],
    ["animal", "animal"],
    ["spiritual", "spiritual"],
    ["travel", "travel"],
    ["art", "art"],
    ["history", "history"],
    ["sport", "sport"],
    ["house", "house"],
  ])(
    "image.%s. Should return a lexica.art url with q = '%s' and sizes in [640, 4000]",
    (method, category) => {
      const value = modules.image[method]();

      const url = expectLexicaUrl(value);

      expect(url.searchParams.get("q")).toBe(category);
      expectSizeInRange(url, "width");
      expectSizeInRange(url, "height");
    },
  );

  it("image.food with width = 800 and height = 600. Should preserve q and use the given sizes", () => {
    const value = modules.image.food({ width: 800, height: 600 });

    const url = expectLexicaUrl(value);

    expect(url.searchParams.get("q")).toBe("food");
    expect(url.searchParams.get("width")).toBe("800");
    expect(url.searchParams.get("height")).toBe("600");
  });

  it("image.category with category = 'soccer'. Should return a url with q = 'soccer'", () => {
    const value = modules.image.category({ category: "soccer" });

    const url = expectLexicaUrl(value);

    expect(url.searchParams.get("q")).toBe("soccer");
  });

  it("image.category with no arguments. Should return a url with a non-empty q", () => {
    const value = modules.image.category();

    const url = expectLexicaUrl(value);

    const q = url.searchParams.get("q");

    expect(q).not.toBeNull();
    expect(q).not.toBe("");
  });

  it("image.animatedAvatar. Should return a multiavatar svg url", () => {
    const value = modules.image.animatedAvatar();

    expect(value).toMatch(/^https:\/\/api\.multiavatar\.com\/\d+\.svg$/);
  });
});
