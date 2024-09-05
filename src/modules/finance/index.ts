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
  readonly constants = {
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
   * modules.finance.transaction() // 'payment'
   *
   * @returns string
   */
  transaction(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.transactionTypes);
  }

  /**
   * Returns a suscription plan type
   *
   * @example
   * modules.finance.subscriptionPlan() // 'Free'
   *
   * @returns string
   */
  subscriptionPlan(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.subscriptionPlans);
  }

  /**
   * Returns a PIN number.
   *
   * @param args.length The length of the PIN to generate. Defaults to `4`.
   *
   * @example
   * modules.finance.pin() // '5067'
   * modules.finance.pin({ length: 6 }) // '213789'
   *
   * @returns string
   */
  pin(a?: PinProps): string {
    const datatypeModule = new DatatypeModule();

    const len = a?.length && a.length > 0 ? a.length : 4;

    return Array.from({ length: len })
      .map(() => String(datatypeModule.int({ min: 0, max: 9 })))
      .join("");
  }

  /**
   * Returns a Bitcoin address.
   *
   * @example
   * modules.finance.bitcoinAddress() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   *
   * @returns string
   */
  bitcoinAddress(): string {
    const utils = new ChacaUtils();
    const datatypeModule = new DatatypeModule();

    let address: string = utils.oneOfArray(["1", "3"]);

    address += datatypeModule.alphaNumeric({
      case: "mixed",
      banned: "0OIl",
      length: datatypeModule.int({ min: 25, max: 39 }),
    });

    return address;
  }

  /**
   * Returns a credit card number.
   *
   * @example
   * modules.finance.creditCard() // '6375-3265-4676-6646'
   *
   * @returns string
   */
  creditCard(): string {
    const datatypeModule = new DatatypeModule();

    let retString = "";

    for (let i = 1; i <= 12; i++) {
      if (i % 4 === 0) retString = retString.concat("-");

      retString = retString.concat(
        String(datatypeModule.int({ min: 0, max: 9 })),
      );
    }

    return retString;
  }

  /**
   * Returns a Ethereum address.
   *
   * @example
   * modules.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   *
   * @returns string
   */
  ethereumAddress(): string {
    const datatypeModule = new DatatypeModule();
    return datatypeModule.hexadecimal({ length: 40, case: "lower" });
  }

  /**
   * @example
   * modules.finance.accountType() // "Credit Card"
   *
   * @returns string
   */
  accountType(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(ACCOUNT_TYPES);
  }

  /**
   * Returns a SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
   *
   * @example
   * modules.finance.bic() // 'WYAUPGX1'
   *
   * @returns string
   */
  bic(): string {
    const utils = new ChacaUtils();
    const datatypeModule = new DatatypeModule();

    const bankIdentifier = datatypeModule.characters({
      length: 4,
      case: "upper",
    });
    const countryCode = utils.oneOfArray(IBAN.iso3166);
    const locationCode = datatypeModule.alphaNumeric({
      case: "upper",
      length: 2,
    });
    const branchCode = datatypeModule.boolean()
      ? datatypeModule.boolean()
        ? datatypeModule.alphaNumeric({ case: "upper", length: 3 })
        : "XXX"
      : "";

    return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
  }

  /**
   * @example
   * modules.finance.routingNumber() // '522814402'
   * @returns string
   */
  routingNumber(): string {
    const utils = new ChacaUtils();
    const routingNumber = utils.replaceSymbols("########");

    // Modules 10 straight summation.
    let sum = 0;

    for (let i = 0; i < routingNumber.length; i += 3) {
      sum += Number(routingNumber[i]) * 3;
      sum += Number(routingNumber[i + 1]) * 7;
      sum += Number(routingNumber[i + 2]) || 0;
    }

    return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
  }

  /**
   * Returns a credit card CVV.
   *
   * @example
   * modules.finance.creditCardCVV() // '506'
   *
   * @returns string
   */
  creditCardCVV(): string {
    const datatypeModule = new DatatypeModule();

    let cvv = "";

    for (let i = 0; i < 3; i++) {
      cvv += datatypeModule.int({ max: 9, min: 0 }).toString();
    }

    return cvv;
  }

  /**
   * Returns a string with a money symbol
   * @example modules.finance.moneySymbol() // '$'
   * @returns string
   */
  moneySymbol(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.symbol));
  }

  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param args.min The lower bound for the amount.
   * @param args.max The upper bound for the amount.
   * @param args.precision The number of decimal places for the amount.
   * @param args.symbol The symbol used to prefix the amount. Defaults to `'$'`.
   *
   * @example
   * modules.finance.amount()// '$6170.87'
   * modules.finance.amount({ min: 0, max: 1000 }) // '$5.53'
   * modules.finance.amount({ min: 0, max: 1000, symbol: '€', precision: 0 }) // '€5'
   *
   * @returns string
   */
  amount(a?: AmountProps): string {
    const datatypeModule = new DatatypeModule();

    const {
      max = undefined,
      min = undefined,
      precision = undefined,
      symbol: isymbol = undefined,
    } = a ? a : {};

    const symbol = isymbol ? isymbol : "$";

    return `${symbol}${datatypeModule.number({
      max: max,
      min: min,
      precision: precision,
    })}`;
  }

  /**
   * Returns a current money name
   * @example modules.finance.currencyMoneyName() // 'Us Dollar'
   * @returns string
   */
  currencyMoneyName(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.name));
  }

  /**
   * Returns a common money code
   * @example modules.finance.moneyCode() // 'EUR'
   * @returns string
   */
  moneyCode(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(Object.values(MONEY_INFO).map((el) => el.code));
  }
}
