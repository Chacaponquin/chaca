import { schemas } from "../../../src";

describe("# Internet username test", () => {
  it("Without arguments", () => {
    const username = schemas.internet.username().getValue();
    expect(typeof username).toBe("string");
  });

  it("Pass firstName argument", () => {
    const username = schemas.internet
      .username()
      .getValue({ firstName: "hector" });
    expect(username.includes("hector")).toBe(true);
  });

  it("Pass lastName argument", () => {
    const username = schemas.internet
      .username()
      .getValue({ lastName: "hector" });
    expect(username.includes("hector")).toBe(true);
  });

  it("Pass firstName and lastName argument", () => {
    const username = schemas.internet
      .username()
      .getValue({ lastName: "hector", firstName: "john" });
    expect(username.includes("hector") && username.includes("john")).toBe(true);
  });
});
