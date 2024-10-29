import { describe, expect, it } from "vitest";
import { chaca } from "../../../src";

describe("utils.sentenceCase", () => {
  it("'Hello World'. should return 'Hello world'", () => {
    const value = chaca.utils.sentenceCase("Hello World");
    expect(value).toBe("Hello world");
  });

  it("'hello___world'. should return 'Hello world'", () => {
    const value = chaca.utils.sentenceCase("hello___world");
    expect(value).toBe("Hello world");
  });

  it("'helloWorld'. should return 'Hello world'", () => {
    const value = chaca.utils.sentenceCase("helloWorld");
    expect(value).toBe("Hello world");
  });

  it("'helloworld'. should return 'Helloworld'", () => {
    const value = chaca.utils.sentenceCase("helloworld");
    expect(value).toBe("Helloworld");
  });

  it("'hello+-world='. should return 'Hello world'", () => {
    const value = chaca.utils.sentenceCase("hello+-world=");
    expect(value).toBe("Hello world");
  });
});
