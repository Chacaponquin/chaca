import { chaca } from "../../../src";
import { describe, expect, it } from "vitest";

describe("# CamelCase util test", () => {
  it("Pass 'Hello World' as argument. Should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("Hello World");
    expect(value).toBe("helloWorld");
  });

  it("Pass 'hello___world'. Should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("hello___world");
    expect(value).toBe("helloWorld");
  });

  it("Pass 'helloWorld'. Should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("helloWorld");
    expect(value).toBe("helloWorld");
  });

  it("Pass 'helloworld'. Should return 'helloworld'", () => {
    const value = chaca.utils.camelCase("helloworld");
    expect(value).toBe("helloworld");
  });

  it("Pass 'hello+-world='. Should return 'helloWorld'", () => {
    const value = chaca.utils.camelCase("hello+-world=");
    expect(value).toBe("helloWorld");
  });
});
