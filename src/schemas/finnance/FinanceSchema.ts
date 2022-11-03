import { faker } from "@faker-js/faker";
import { MONEY_SYMBOLS } from "./constants/moneySymbols";
import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";

type AmountProps = {
  min?: number;
  max?: number;
  symbol?: string;
  precision?: number;
};

export class FinanceSchema {
  pin() {
    return new SchemaField<string>(
      "pin",
      () => {
        return faker.finance.pin();
      },
      {},
    );
  }

  bitcoinAddress() {
    return new SchemaField<string>(
      "bitcoinAddress",
      () => faker.finance.bitcoinAddress(),
      {},
    );
  }

  creditCard() {
    return new SchemaField<string>(
      "creditCard",
      () => faker.finance.creditCardNumber(),
      {},
    );
  }

  ethereumAddress() {
    return new SchemaField(
      "ethereumAddress",
      () => faker.finance.ethereumAddress(),
      {},
    );
  }

  accountName() {
    return new SchemaField<string>(
      "accountName",
      () => faker.finance.accountName(),
      {},
    );
  }

  bic() {
    return new SchemaField<string>("bic", faker.finance.bic, {});
  }

  routingNumber() {
    return new SchemaField<string>(
      "routingNumber",
      () => faker.finance.routingNumber(),
      {},
    );
  }

  creditCardCVV() {
    return new SchemaField<string>(
      "creaditCardCVV",
      () => faker.finance.creditCardCVV(),
      {},
    );
  }

  moneySymbol() {
    return new SchemaField<string>(
      "moneySymbol",
      () => {
        return CHDataUtils.oneOfArray(
          Object.values(MONEY_SYMBOLS).map((el) => el.symbol),
        );
      },
      {},
    );
  }

  amount(args?: AmountProps) {
    return new SchemaField<string, AmountProps>(
      "amount",
      (a) => {
        return faker.finance.amount(a.min, a.max, a.precision, a.symbol);
      },
      args || {},
    );
  }

  currencyMoneyName() {
    return new SchemaField<string>(
      "currencyMoneyName",
      () =>
        CHDataUtils.oneOfArray(
          Object.values(MONEY_SYMBOLS).map((el) => el.name),
        ),
      {},
    );
  }

  moneyCode() {
    return new SchemaField<string>(
      "moneyCode",
      () => {
        return CHDataUtils.oneOfArray(
          Object.values(MONEY_SYMBOLS).map((el) => el.code),
        );
      },
      {},
    );
  }
}
