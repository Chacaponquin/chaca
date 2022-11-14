import { SchemaField } from "../SchemaField.js";
import { Schemas } from "../index.js";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";
import { ACCOUNT_TYPES, IBAN, MONEY_INFO } from "./constants/index.js";

type AmountProps = {
  min?: number;
  max?: number;
  symbol?: string;
  precision?: number;
};

type PinProps = {
  length?: number;
};

export class FinanceSchema {
  /**
   * Returns a PIN number.
   *
   * @param args.length The length of the PIN to generate. Defaults to `4`.
   *
   * @example schemas.finance.pin() // Schema
   * @example
   * schemas.finance.pin().getValue() // '5067'
   * schemas.finance.pin().getValue({length: 6}) // '213789'
   *
   * @returns string
   */
  pin(args?: PinProps) {
    return new SchemaField<string, PinProps>(
      "pin",
      (a) => {
        const len = typeof a.length === "number" ? a.length : 4;

        return Array({ length: len })
          .map(() => String(PrivateUtils.intNumber({ min: 0, max: 9 })))
          .join("");
      },
      args || {},
    );
  }

  /**
   * Returns a Bitcoin address.
   *
   * @example schemas.finance.bitcoinAddress() // Schema
   * @example
   * schemas.finance.bitcoinAddress().getValue() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   *
   * @returns string
   */
  bitcoinAddress() {
    return new SchemaField<string>(
      "bitcoinAddress",
      () => {
        let address: string = PrivateUtils.oneOfArray(["1", "3"]);

        address += Schemas.dataType.alphaNumeric().getValue({
          case: "mixed",
          banned: "0OIl",
          length: PrivateUtils.intNumber({ min: 25, max: 39 }),
        });

        return address;
      },
      {},
    );
  }

  /**
   * Returns a credit card number.
   *
   * @example schemas.finance.creaditNumber() // Schema
   * @example
   * faker.finance.creditCard().getValue() // '6375-3265-4676-6646'
   *
   * @returns string
   */
  creditCard() {
    return new SchemaField<string>(
      "creditCard",
      () => {
        let retString = "";

        for (let i = 1; i <= 12; i++) {
          if (i % 4 === 0) retString = retString.concat("-");

          retString = retString.concat(
            String(PrivateUtils.intNumber({ min: 0, max: 9 })),
          );
        }

        return retString;
      },
      {},
    );
  }

  /**
   * Returns a Ethereum address.
   *
   * @example schemas.finance.ethereumAddress() // Schema
   * @example
   * schemas.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   *
   * @returns string
   */
  ethereumAddress() {
    return new SchemaField(
      "ethereumAddress",
      () =>
        Schemas.dataType.hexadecimal().getValue({ length: 40, case: "lower" }),
      {},
    );
  }

  accountType() {
    return new SchemaField<string>(
      "accountType",
      () => PrivateUtils.oneOfArray(ACCOUNT_TYPES),
      {},
    );
  }

  /**
   * Returns a SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
   *
   * @example schemas.finance.bic() // Schema
   * @example
   * schemas.finance.bic().getValue() // 'WYAUPGX1'
   *
   * @returns string
   */
  bic() {
    return new SchemaField<string>(
      "bic",
      () => {
        const bankIdentifier = Schemas.dataType.characters().getValue({
          length: 4,
          case: "upper",
        });
        const countryCode = PrivateUtils.oneOfArray(IBAN.iso3166);
        const locationCode = Schemas.dataType.alphaNumeric().getValue({
          case: "upper",
          length: 2,
        });
        const branchCode = PrivateUtils.boolean()
          ? PrivateUtils.boolean()
            ? Schemas.dataType
                .alphaNumeric()
                .getValue({ case: "upper", length: 3 })
            : "XXX"
          : "";

        return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
      },
      {},
    );
  }

  routingNumber() {
    return new SchemaField<string>(
      "routingNumber",
      () => {
        const routingNumber = PrivateUtils.replaceSymbols("########");

        // Modules 10 straight summation.
        let sum = 0;

        for (let i = 0; i < routingNumber.length; i += 3) {
          sum += Number(routingNumber[i]) * 3;
          sum += Number(routingNumber[i + 1]) * 7;
          sum += Number(routingNumber[i + 2]) || 0;
        }

        return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
      },
      {},
    );
  }

  /**
   * Returns a credit card CVV.
   *
   * @example schemas.finance.creditCardCVV() // Schema
   * @example
   * schemas.finance.creditCardCVV().getValue() // '506'
   *
   * @returns string
   */
  creditCardCVV() {
    return new SchemaField<string>(
      "creaditCardCVV",
      () => {
        let cvv = "";
        for (let i = 0; i < 3; i++) {
          cvv += PrivateUtils.intNumber({ max: 9, min: 0 }).toString();
        }
        return cvv;
      },
      {},
    );
  }

  /**
   * Returns a string with a money symbol
   * @example schemas.finance.moneySymbol() // Schema
   * @example schemas.finance.moneySymbol().getValue() // '$'
   * @returns string
   */
  moneySymbol() {
    return new SchemaField<string>(
      "moneySymbol",
      () => {
        return PrivateUtils.oneOfArray(
          Object.values(MONEY_INFO).map((el) => el.symbol),
        );
      },
      {},
    );
  }

  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param args.min The lower bound for the amount.
   * @param args.max The upper bound for the amount.
   * @param args.precision The number of decimal places for the amount.
   * @param args.symbol The symbol used to prefix the amount. Defaults to `'$'`.
   *
   * @example schemas.finance.amount() // Schema
   * @example
   * schemas.finance.amount().getValue() // '$6170.87'
   * schemas.finance.amount().getValue({min: 0, max: 1000}) // '$5.53'
   * schemas.finance.amount().getValue({min: 0, max: 1000, symbol: '€', precision: 0}) // '€5'
   *
   * @returns string
   */
  amount(args?: AmountProps) {
    return new SchemaField<string, AmountProps>(
      "amount",
      (a) => {
        const symbol = typeof a.symbol === "string" ? a.symbol : "$";

        return `${symbol}${Schemas.dataType.number({
          max: a.max,
          min: a.min,
          precision: a.precision,
        })}`;
      },
      args || {},
    );
  }

  /**
   * Returns a current money name
   * @example schemas.finance.currencyMoneyName() // Schema
   * @example schemas.finance.currencyMoneyName().getValue() // 'Us Dollar'
   * @returns string
   */
  currencyMoneyName() {
    return new SchemaField<string>(
      "currencyMoneyName",
      () =>
        PrivateUtils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.name)),
      {},
    );
  }

  /**
   * Returns a common money code
   * @example schemas.finance.moneyCode() // Schema
   * @example schemas.finance.moneyCode().getValue() // 'EUR'
   * @returns string
   */
  moneyCode() {
    return new SchemaField<string>(
      "moneyCode",
      () => {
        return PrivateUtils.oneOfArray(
          Object.values(MONEY_INFO).map((el) => el.code),
        );
      },
      {},
    );
  }
}
