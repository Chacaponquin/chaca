import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

describe("finance modules", () => {
  it("finance.transaction", () => {
    const result = modules.finance.transaction();
    expect(modules.finance.constants.transactionTypes).include(result);
  });

  it("finance.subscriptionPlan", () => {
    const result = modules.finance.subscriptionPlan();
    expect(modules.finance.constants.subscriptionPlans).include(result);
  });
});
