import { modules } from "../../../src";

describe("# Internet password tests", () => {
  it("Pass length: 10 as argument. Should return an password with length 10", () => {
    const val = modules.internet.password({ length: 10 });

    expect(val.length === 10).toBe(true);
  });

  it("Pass no pattern. Should return a multiple character string", () => {
    const val = modules.internet.password({ length: 10 });

    expect(val.length === 10).toBe(true);
    expect(val).not.toBe("wwwwwwwwww");
  });
});
