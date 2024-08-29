import { Module } from "../Module";
import { ChacaUtils } from "../../core/utils";
import {
  ACCOUNT_TYPES,
  IBAN,
  MONEY_INFO,
  SUBSCRIPTION_PLAN,
  TRANSACTION_TYPE,
} from "./constants";
import { DatatypeModule } from "../datatype";

type AmountProps = {
  min?: number;
  max?: number;
  symbol?: string;
  precision?: number;
};

type PinProps = {
  length?: number;
};

export class FinanceModule {
  private datatypeModule = new DatatypeModule();
  private utils = new ChacaUtils();

  public readonly constants = {
    accountTypes: ACCOUNT_TYPES,
    ibans: IBAN,
    moneyInfo: MONEY_INFO,
    transactionTypes: TRANSACTION_TYPE,
    subscriptionPlans: SUBSCRIPTION_PLAN,
  };

  /**
   * Returns a transaction type
   *
   * @example
   * modules.finance.transaction() // Schema
   * modules.finance.transaction().getValue() 'payment'
   *
   * @returns string
   */
  transaction() {
    return new Module(() => {
      return this.utils.oneOfArray(this.constants.transactionTypes);
    });
  }

  /**
   * Returns a suscription plan type
   *
   * @example
   * modules.finance.subscriptionPlan() // Schema
   * modules.finance.subscriptionPlan().getValue() // 'Free'
   *
   * @returns string
   */
  subscriptionPlan() {
    return new Module(() => {
      return this.utils.oneOfArray(this.constants.subscriptionPlans);
    });
  }

  /**
   * Returns a PIN number.
   *
   * @param args.length The length of the PIN to generate. Defaults to `4`.
   *
   * @example modules.finance.pin() // Schema
   * @example
   * modules.finance.pin().getValue() // '5067'
   * modules.finance.pin().getValue({length: 6}) // '213789'
   *
   * @returns string
   */
  pin(args?: PinProps) {
    return new Module<string, PinProps>((a) => {
      const len = typeof a.length === "number" && a.length > 0 ? a.length : 4;

      return Array.from({ length: len })
        .map(() =>
          String(this.datatypeModule.int().getValue({ min: 0, max: 9 })),
        )
        .join("");
    }, args || {});
  }

  /**
   * Returns a Bitcoin address.
   *
   * @example modules.finance.bitcoinAddress() // Schema
   * @example
   * modules.finance.bitcoinAddress().getValue() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   *
   * @returns string
   */
  bitcoinAddress() {
    return new Module<string>(() => {
      let address: string = this.utils.oneOfArray(["1", "3"]);

      address += this.datatypeModule.alphaNumeric().getValue({
        case: "mixed",
        banned: "0OIl",
        length: this.datatypeModule.int().getValue({ min: 25, max: 39 }),
      });

      return address;
    }, {});
  }

  /**
   * Returns a credit card number.
   *
   * @example modules.finance.creaditNumber() // Schema
   * @example
   * modules.finance.creditCard().getValue() // '6375-3265-4676-6646'
   *
   * @returns string
   */
  creditCard() {
    return new Module<string>(() => {
      let retString = "";

      for (let i = 1; i <= 12; i++) {
        if (i % 4 === 0) retString = retString.concat("-");

        retString = retString.concat(
          String(this.datatypeModule.int().getValue({ min: 0, max: 9 })),
        );
      }

      return retString;
    });
  }

  /**
   * Returns a Ethereum address.
   *
   * @example modules.finance.ethereumAddress() // Schema
   * @example
   * modules.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   *
   * @returns string
   */
  ethereumAddress(): Module<string> {
    return new Module(() =>
      this.datatypeModule.hexadecimal().getValue({ length: 40, case: "lower" }),
    );
  }

  /**
   * @example
   * modules.finance.accountType() // Schema
   * modules.finance.accountType().getValue() // "Credit Card"
   * @returns string
   */
  accountType(): Module<string> {
    return new Module<string>(() => this.utils.oneOfArray(ACCOUNT_TYPES));
  }

  /**
   * Returns a SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
   *
   * @example modules.finance.bic() // Schema
   * @example
   * modules.finance.bic().getValue() // 'WYAUPGX1'
   *
   * @returns string
   */
  bic() {
    return new Module<string>(() => {
      const bankIdentifier = this.datatypeModule.characters().getValue({
        length: 4,
        case: "upper",
      });
      const countryCode = this.utils.oneOfArray(IBAN.iso3166);
      const locationCode = this.datatypeModule.alphaNumeric().getValue({
        case: "upper",
        length: 2,
      });
      const branchCode = this.datatypeModule.boolean().getValue()
        ? this.datatypeModule.boolean().getValue()
          ? this.datatypeModule
              .alphaNumeric()
              .getValue({ case: "upper", length: 3 })
          : "XXX"
        : "";

      return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
    }, {});
  }

  /**
   * @example
   * modules.finance.routingNumber() // Schema
   * modules.finance.routingNumber().getValue() // '522814402'
   * @returns string
   */
  routingNumber() {
    return new Module<string>(() => {
      const routingNumber = this.utils.replaceSymbols("########");

      // Modules 10 straight summation.
      let sum = 0;

      for (let i = 0; i < routingNumber.length; i += 3) {
        sum += Number(routingNumber[i]) * 3;
        sum += Number(routingNumber[i + 1]) * 7;
        sum += Number(routingNumber[i + 2]) || 0;
      }

      return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
    });
  }

  /**
   * Returns a credit card CVV.
   *
   * @example modules.finance.creditCardCVV() // Schema
   * @example
   * modules.finance.creditCardCVV().getValue() // '506'
   *
   * @returns string
   */
  creditCardCVV(): Module<string> {
    return new Module<string>(() => {
      let cvv = "";
      for (let i = 0; i < 3; i++) {
        cvv += this.datatypeModule
          .int()
          .getValue({ max: 9, min: 0 })
          .toString();
      }
      return cvv;
    });
  }

  /**
   * Returns a string with a money symbol
   * @example modules.finance.moneySymbol() // Schema
   * @example modules.finance.moneySymbol().getValue() // '$'
   * @returns string
   */
  moneySymbol(): Module<string> {
    return new Module<string>(() => {
      return this.utils.oneOfArray(
        Object.values(MONEY_INFO).map((el) => el.symbol),
      );
    }, {});
  }

  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param args.min The lower bound for the amount.
   * @param args.max The upper bound for the amount.
   * @param args.precision The number of decimal places for the amount.
   * @param args.symbol The symbol used to prefix the amount. Defaults to `'$'`.
   *
   * @example modules.finance.amount() // Schema
   * @example
   * modules.finance.amount().getValue() // '$6170.87'
   * modules.finance.amount().getValue({min: 0, max: 1000}) // '$5.53'
   * modules.finance.amount().getValue({min: 0, max: 1000, symbol: '€', precision: 0}) // '€5'
   *
   * @returns string
   */
  amount(args?: AmountProps): Module<string, AmountProps> {
    return new Module<string, AmountProps>((a) => {
      const symbol = typeof a.symbol === "string" ? a.symbol : "$";

      return `${symbol}${this.datatypeModule.number().getValue({
        max: a.max,
        min: a.min,
        precision: a.precision,
      })}`;
    }, args || {});
  }

  /**
   * Returns a current money name
   * @example modules.finance.currencyMoneyName() // Schema
   * @example modules.finance.currencyMoneyName().getValue() // 'Us Dollar'
   * @returns string
   */
  currencyMoneyName() {
    return new Module<string>(() =>
      this.utils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.name)),
    );
  }

  /**
   * Returns a common money code
   * @example modules.finance.moneyCode() // Schema
   * @example modules.finance.moneyCode().getValue() // 'EUR'
   * @returns string
   */
  moneyCode(): Module<string> {
    return new Module<string>(
      () =>
        this.utils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.code)),
      {},
    );
  }
}
