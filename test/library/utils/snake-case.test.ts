import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.snakeCase", () => {
  it("'Hello World'. should return 'hello_world'", () => {
    const value = chaca.utils.snakeCase("Hello World");
    expect(value).toBe("hello_world");
  });

  it("'hello___world'. should return 'hello_world'", () => {
    const value = chaca.utils.snakeCase("hello___world");
    expect(value).toBe("hello_world");
  });

  it("'helloWorld'. should return 'hello_world'", () => {
    const value = chaca.utils.snakeCase("helloWorld");
    expect(value).toBe("hello_world");
  });

  it("'helloworld'. should return 'helloworld'", () => {
    const value = chaca.utils.snakeCase("helloworld");
    expect(value).toBe("helloworld");
  });

  it("'hello+-world='. should return 'hello_world'", () => {
    const value = chaca.utils.snakeCase("hello+-world=");
    expect(value).toBe("hello_world");
  });
});
