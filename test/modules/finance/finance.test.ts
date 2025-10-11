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

  it("finance.litecoinAddress", () => {
    const value = modules.finance.litecoinAddress();

    expect(value.length).toBeGreaterThanOrEqual(26);
    expect(value.length).toBeLessThanOrEqual(33);
  });

  it("finance.creditCard", () => {
    const value = modules.finance.creditCard();

    const result = value.split("-");

    expect(result).toHaveLength(4);

    for (const r of result) {
      expect(r).toHaveLength(4);
    }
  });

  it("finance.ethereumAddress", () => {
    const value = modules.finance.ethereumAddress();

    expect(value).toHaveLength(40);
  });

  it("finance.moneyCode", () => {
    const value = modules.finance.moneyCode();

    expect(
      Object.values(modules.finance.constants.moneyInfo).map((el) => el.code),
    ).toContain(value);
  });

  it("finance.moneySymbol", () => {
    const value = modules.finance.moneySymbol();

    expect(
      Object.values(modules.finance.constants.moneyInfo).map((el) => el.symbol),
    ).toContain(value);
  });

  it("finance.currencyMoneyName", () => {
    const value = modules.finance.currencyMoneyName();

    expect(
      Object.values(modules.finance.constants.moneyInfo).map((el) => el.name),
    ).toContain(value);
  });

  it("finance.creditCardCVV", () => {
    const value = modules.finance.creditCardCVV();

    expect(value).toHaveLength(3);

    for (const v of value) {
      expect(Number(v)).not.toBeNaN();
    }
  });

  it("finance.routingNumber", () => {
    const value = modules.finance.routingNumber();

    expect(value).toHaveLength(9);

    for (const v of value) {
      expect(Number(v)).not.toBeNaN();
    }
  });

  it("finance.accountType", () => {
    const value = modules.finance.accountType();

    expect(modules.finance.constants.accountTypes).toContain(value);
  });
});
