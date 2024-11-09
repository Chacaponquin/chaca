import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("internet modules", () => {
  it("internet.browser", () => {
    expect(modules.internet.constants.browsers).include(
      modules.internet.browser(),
    );
  });

  it("internet.oauthProvider", () => {
    expect(modules.internet.constants.oauthProviders).include(
      modules.internet.oauthProvider(),
    );
  });

  it("internet.locale", () => {
    expect(modules.internet.constants.locales).include(
      modules.internet.locale(),
    );
  });

  it("internet.emailProvider", () => {
    expect(modules.internet.constants.emailProviders).include(
      modules.internet.emailProvider(),
    );
  });

  it("internet.httpMethod", () => {
    expect(modules.internet.constants.httpMethods).include(
      modules.internet.httpMethod(),
    );
  });

  it("internet.protocol", () => {
    expect(modules.internet.constants.protocols).include(
      modules.internet.protocol(),
    );
  });

  it("internet.domainSuffix", () => {
    expect(modules.internet.constants.domainSuffixs).include(
      modules.internet.domainSuffix(),
    );
  });
});
