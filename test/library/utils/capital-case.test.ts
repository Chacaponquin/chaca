import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.capitalCase", () => {
  it("'Hello World'. should return 'Hello World'", () => {
    const value = chaca.utils.capitalCase("Hello World");
    expect(value).toBe("Hello World");
  });

  it("'hello___world'. should return 'Hello World'", () => {
    const value = chaca.utils.capitalCase("hello___world");
    expect(value).toBe("Hello World");
  });

  it("'helloWorld'. should return 'Hello World'", () => {
    const value = chaca.utils.capitalCase("helloWorld");
    expect(value).toBe("Hello World");
  });

  it("'helloworld'. should return 'Helloworld'", () => {
    const value = chaca.utils.capitalCase("helloworld");
    expect(value).toBe("Helloworld");
  });

  it("'hello+-world='. should return 'Hello World'", () => {
    const value = chaca.utils.capitalCase("hello+-world=");
    expect(value).toBe("Hello World");
  });
});
