import { modules } from "../../../src";

describe("# Internet email tests", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("Generate email with out arguments. Should return a valid argument", () => {
    const emails = Array.from({ length: 50 }).map(() =>
      modules.internet.email().getValue(),
    );

    expect(emails.every((e) => emailRegex.test(e) === true)).toBe(true);
  });
});
