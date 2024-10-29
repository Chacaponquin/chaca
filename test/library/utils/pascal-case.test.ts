import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.pascalCase", () => {
  it("'Hello World'. should return 'HelloWorld'", () => {
    const value = chaca.utils.pascalCase("Hello World");
    expect(value).toBe("HelloWorld");
  });

  it("'hello___world'. should return 'helloWorld'", () => {
    const value = chaca.utils.pascalCase("hello___world");
    expect(value).toBe("HelloWorld");
  });

  it("'helloWorld'. should return 'HelloWorld'", () => {
    const value = chaca.utils.pascalCase("helloWorld");
    expect(value).toBe("HelloWorld");
  });

  it("'helloworld'. should return 'Helloworld'", () => {
    const value = chaca.utils.pascalCase("helloworld");
    expect(value).toBe("Helloworld");
  });

  it("'hello+-world='. should return 'HelloWorld'", () => {
    const value = chaca.utils.pascalCase("hello+-world=");
    expect(value).toBe("HelloWorld");
  });
});
