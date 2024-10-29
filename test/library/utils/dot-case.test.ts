import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.dotCase", () => {
  it("'Hello World'. should return 'hello.world'", () => {
    const value = chaca.utils.dotCase("Hello World");
    expect(value).toBe("hello.world");
  });

  it("'hello___world'. should return 'hello.world'", () => {
    const value = chaca.utils.dotCase("hello___world");
    expect(value).toBe("hello.world");
  });

  it("'helloWorld'. should return 'hello.world'", () => {
    const value = chaca.utils.dotCase("helloWorld");
    expect(value).toBe("hello.world");
  });

  it("'helloworld'. should return 'helloworld'", () => {
    const value = chaca.utils.dotCase("helloworld");
    expect(value).toBe("helloworld");
  });

  it("'hello+-world='. should return 'helloWorld'", () => {
    const value = chaca.utils.dotCase("hello+-world=");
    expect(value).toBe("hello.world");
  });
});
