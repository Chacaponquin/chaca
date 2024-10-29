import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("utils.camelCase", () => {
  it("'Hello World'. should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("Hello World");
    expect(value).toBe("helloWorld");
  });

  it("'hello___world'. should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("hello___world");
    expect(value).toBe("helloWorld");
  });

  it("'helloWorld'. should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("helloWorld");
    expect(value).toBe("helloWorld");
  });

  it("'helloworld'. should return 'helloworld'", () => {
    const value = chaca.utils.camelCase("helloworld");
    expect(value).toBe("helloworld");
  });

  it("'hello+-world='. should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("hello+-world=");
    expect(value).toBe("helloWorld");
  });
});
