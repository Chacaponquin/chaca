import { SchemaField } from "../SchemaField";
import { ChacaUtils } from "../../core/ChacaUtils/ChacaUtils";
import { EMOJIS } from "./constants/emojis";
import { DOMAIN_SUFFIX } from "./constants/domainSuffix";
import { HTTP_STATUS } from "./constants/httpStatus";
import { HTTP_METHODS } from "./constants/http_method";
import { GenerateUserAgent } from "./helpers/userAgent";
import { DataTypeSchema } from "../dataType/DataTypeSchema";
import { PersonSchema } from "../person/PersonSchema";
import { WordSchema } from "../word/WordSchema";
import { PROTOCOL } from "./constants/protocol";
import { OAUTH_PROVIDER } from "./constants/oauth";
import { LOCALE } from "./constants/locale";
import { EMAIL_PROVIDER } from "./constants/email_provider";
import { BROWSERS } from "./constants/browser";

export type HttpStatus = {
  informational: number[];
  success: number[];
  redirection: number[];
  clientError: number[];
  serverError: number[];
};

export type Emojis = {
  smiley: string[];
  body: string[];
  person: string[];
  nature: string[];
  food: string[];
  travel: string[];
  activity: string[];
  object: string[];
  symbol: string[];
};

type EmojiProps = {
  emoji?: keyof Emojis;
};

type EmailArgs = {
  firstName?: string;
  lastName?: string;
  provider?: string;
};

type PasswordArgs = {
  length?: number;
  memorable?: boolean;
  prefix?: string;
  pattern?: RegExp;
};

type UrlArgs = {
  secure?: boolean;
};

type usernameArgs = {
  firstName?: string;
  lastName?: string;
};

export class InternetSchema {
  private dataTypeSchema = new DataTypeSchema();
  private personSchema = new PersonSchema();
  private wordSchema = new WordSchema();

  private utils = new ChacaUtils();

  public readonly constants = {
    emojis: EMOJIS,
    domainSuffixs: DOMAIN_SUFFIX,
    httpStatus: HTTP_STATUS,
    httpMethods: HTTP_METHODS,
    protocols: PROTOCOL,
    oauthProviders: OAUTH_PROVIDER,
    locales: LOCALE,
    emailProviders: EMAIL_PROVIDER,
    browsers: BROWSERS,
  };

  /**
   * Returns a browser name
   *
   * @example
   * schemas.internet.browser() // Schema
   * schemas.internet.browser().getValue() // 'Opera'
   *
   * @returns string
   */
  browser() {
    return new SchemaField(() => {
      return this.utils.oneOfArray(this.constants.browsers);
    });
  }

  /**
   * Generate a random OAuth provider
   *
   * @example
   * schemas.internet.oauthProvider() // Schema
   * schemas.internet.oauthProvider().getValue() // 'Amazon'
   *
   * @returns string
   */
  oauthProvider() {
    return new SchemaField(() => {
      return this.utils.oneOfArray(this.constants.oauthProviders);
    });
  }

  /**
   * Returns a random locale
   *
   * @example
   * schemas.internet.locale() // Schema
   * schemas.internet.locale().getValue() // 'es_MX'
   *
   * @returns string
   */
  locale() {
    return new SchemaField(() => {
      return this.utils.oneOfArray(this.constants.locales);
    });
  }

  /**
   * Returns a random email provider
   *
   * @example
   * schemas.internet.emailProvider() // Schema
   * schemas.internet.emailProvider().getValue() // 'gmail'
   *
   * @returns string
   */
  emailProvider() {
    return new SchemaField(() => {
      return this.utils.oneOfArray(this.constants.emailProviders);
    });
  }

  /**
   * Returns a user email
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @param args.provider email provider
   *
   * @example schemas.internet.email() // Schema
   * @example
   * schemas.internet.email().getValue() // 'juan527120@gmail.com'
   * schemas.internet.email.getValue({firstName: 'pedro', lastName: 'Scott', provider: 'yahoo.com'}) // "pedro_scott@yahoo.com"
   *
   * @returns string
   */
  public email(args?: EmailArgs) {
    return new SchemaField<string, EmailArgs>((a) => {
      const provider =
        typeof a.provider === "string"
          ? a.provider
          : this.utils.oneOfArray(this.constants.emailProviders);

      const username = this.username({
        firstName: a.firstName,
        lastName: a.lastName,
      }).getValue();

      const email = `${username}@${provider}.com`;

      return email.toLowerCase();
    }, args || {});
  }

  /**
   * Returns a password.
   *
   * @param args.len The length of the password to generate. Defaults to `15`.
   * @param args.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param args.pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param args.prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * schemas.internet.password().getValue() // '89G1wJuBLbGziIs'
   * schemas.internet.password().getValue({length: 20}) // 'aF55c_8O9kZaPOrysFB_'
   * schemas.internet.password().getValue({length: 20, memorable: true}) // 'lawetimufozujosodedi'
   * schemas.internet.password().getValue({length: 20, memorable: true, pattern: /[A-Z]/}) // 'HMAQDFFYLDDUTBKVNFVS'
   * schemas.internet.password().getValue({length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello '}) // 'Hello IREOXTDWPERQSB'
   *
   * @returns string
   */
  public password(args?: PasswordArgs) {
    return new SchemaField<string, PasswordArgs>((a) => {
      const vowel = /[aeiouAEIOU]$/;
      const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;

      const len = typeof a.length === "number" && a.length > 0 ? a.length : 15;
      const memorable = typeof a.memorable === "boolean" ? a.memorable : false;
      const pattern = a.pattern instanceof RegExp ? a.pattern : /w/;
      const prefix = typeof a.prefix === "string" ? a.prefix : "";

      const _password = (
        length: number,
        memorable: boolean,
        pattern: RegExp,
        prefix: string,
      ): string => {
        if (prefix.length >= length) {
          return prefix;
        }

        if (memorable) {
          if (prefix.match(consonant)) {
            pattern = vowel;
          } else {
            pattern = consonant;
          }
        }

        const n = this.dataTypeSchema.int().getValue({ min: 0, max: 94 }) + 33;
        let char = String.fromCharCode(n);

        if (memorable) {
          char = char.toLowerCase();
        }

        if (!char.match(pattern)) {
          return _password(length, memorable, pattern, prefix);
        }

        return _password(length, memorable, pattern, prefix + char);
      };

      return _password(len, memorable, pattern, prefix);
    }, args || {});
  }

  /**
   * Returns a string with a web url
   * @example schemas.internet.url() // Schema
   * @example
   * schemas.internet.url().getValue() // 'http://words.info.net'
   * @param args.secure Boolean that indicates if the url has a secure protocol or not
   * @returns
   */
  public url(args?: UrlArgs) {
    return new SchemaField<string, UrlArgs>((a) => {
      if (typeof a.secure === "boolean") {
        const sec = a.secure ? "https" : "http";

        return `${sec}://${this.domainName().getValue()}.${this.domainSuffix().getValue()}`;
      } else
        return `${this.protocol().getValue()}://${this.domainName().getValue()}.${this.domainSuffix().getValue()}`;
    }, args || {});
  }

  /**
   * Returns a profile user name
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @example schemas.internet.username() // Schema
   * @example
   * schemas.internet.username().getValue() // 'juan527134'
   * schemas.internet.username().getValue({firstName: 'pedro', lastName: 'Scott'}) // 'pedro_scott'
   * @returns string
   */
  username(args?: usernameArgs) {
    return new SchemaField<string, usernameArgs>((a) => {
      const firstName =
        typeof a.firstName === "string"
          ? this.utils.camelCase(a.firstName)
          : this.personSchema.firstName({ language: "en" }).getValue();
      const lastName =
        typeof a.lastName === "string" ? this.utils.camelCase(a.lastName) : "";

      const ran = this.dataTypeSchema.int().getValue({ min: 0, max: 3 });

      const genNumbers = (): string => {
        const countNumbers = this.dataTypeSchema
          .int()
          .getValue({ min: 1, max: 5 });

        return this.utils.replaceSymbols(
          Array.from({ length: countNumbers })
            .map(() => "#")
            .join(""),
        );
      };

      const genSymbol = (): string => {
        return this.utils.oneOfArray([".", "-", "_"]);
      };

      let result: string;
      if (ran === 0) {
        const numbers = this.utils.replaceSymbols(genNumbers());
        result = `${firstName}${lastName}${numbers}`;
      } else if (ran === 1) {
        const symbol = genSymbol();
        result = `${firstName}${symbol}${lastName}`;
      } else if (ran === 2) {
        const numbers = genNumbers();
        result = `${firstName}${numbers}${lastName}`;
      } else {
        const symbol = genSymbol();
        const number = genNumbers();

        result = `${firstName}${symbol}${lastName}${number}`;
      }

      return result;
    }, args || {});
  }

  /**
   * Returns a http method
   * @example
   * schemas.internet.httpMethod() // Schema
   * @example
   * schemas.internet.httpMethod().getValue() // 'GET'
   * @returns `GET` | `PATCH` | `DELETE` | `POST` | `PUT`
   */
  public httpMethod(): SchemaField<string> {
    return new SchemaField<string>(() => {
      return this.utils.oneOfArray(HTTP_METHODS);
    }, {});
  }

  /**
   * Returns a IPv6 address
   * @example schemas.internet.ipv6() // Schema
   * @example schemas.internet.ipv6().getValue() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   * @returns string
   */
  public ipv6() {
    return new SchemaField<string>(() => {
      const randHash = () => {
        let result = "";
        for (let i = 0; i < 4; i++) {
          result += this.utils.oneOfArray([
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
          ]);
        }
        return result;
      };

      const result: string[] = [];
      for (let i = 0; i < 8; i++) {
        result[i] = randHash();
      }

      return result.join(":");
    }, {});
  }

  /**
   * Returns a IPv4 address.
   * @example schemas.internet.ipv4() // Schema
   * @example schemas.internet.ipv4().getValue() // '245.108.222.0'
   * @returns string
   */
  public ipv4(): SchemaField<string> {
    return new SchemaField<string>(() => {
      let retString = "";

      for (let i = 1; i <= 4; i++) {
        const val = this.dataTypeSchema.int().getValue({ max: 255, min: 0 });
        if (i === 4) retString += `${val}`;
        else retString += `${val}.`;
      }

      return retString;
    }, {});
  }

  /**
   * Return an emoji
   * @param args.emoji emoji category
   * @example schemas.internet.emoji() // Schema
   * @example schemas.internet.emoji().getValue() // '🔎'
   * @returns string
   */
  public emoji(args?: EmojiProps): SchemaField<string, EmojiProps> {
    return new SchemaField<string, EmojiProps>((a) => {
      const emoji = typeof a.emoji === "string" ? a.emoji : undefined;

      if (emoji) {
        const selEmoji = EMOJIS[emoji];
        if (selEmoji) {
          return this.utils.oneOfArray(selEmoji);
        } else {
          let retEmojis: string[] = [];
          for (const val of Object.values(EMOJIS)) {
            retEmojis = [...retEmojis, ...val];
          }

          return this.utils.oneOfArray(retEmojis);
        }
      } else {
        let retEmojis: string[] = [];
        for (const val of Object.values(EMOJIS)) {
          retEmojis = [...retEmojis, ...val];
        }
        return this.utils.oneOfArray(retEmojis);
      }
    }, args || {});
  }

  /**
   * Returns a mac address
   * @example schemas.internet.mac() // Schema
   * @example schemas.internet.mac().getValue() // '32:8e:2e:09:c6:05'
   * @returns string
   */
  public mac() {
    return new SchemaField<string>(() => {
      let retString = "";

      const lowerCharacters = this.dataTypeSchema.constants.lowerCharacters;
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 2; j++) {
          retString += `${String(
            this.utils.oneOfArray([...numbers, ...lowerCharacters]),
          )}`;
        }

        if (i !== 6) retString += `:`;
      }

      return retString;
    }, {});
  }

  /**
   * Returns a port number
   * @example schemas.internet.port() // Schema
   * @example
   * schemas.internet.port().getValue() // 8001
   * @returns string
   */
  public port(): SchemaField<number> {
    return new SchemaField<number>(
      () => this.dataTypeSchema.int().getValue({ min: 0, max: 65535 }),
      {},
    );
  }

  /**
   * Returns a string with a browser user agent
   * @example schemas.internet.userAgent() // Schema
   * @example schemas.internet.userAgent().getValue() // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   * @returns string
   */
  public userAgent(): SchemaField<string> {
    return new SchemaField<string>(() => GenerateUserAgent(), {});
  }

  /**
   * Returns a web protocol
   * @example schemas.internet.protocol() // Schema
   * @example schemas.internet.protocol().getValue() // 'https'
   * @returns string
   */
  public protocol(): SchemaField<string> {
    return new SchemaField<string>(() =>
      this.utils.oneOfArray(this.constants.protocols),
    );
  }

  /**
   * Returns a domain suffix
   * @example schemas.internet.domainSuffix() // Schema
   * @example schemas.internet.domainSuffix().getValue() // '.com'
   * @returns string
   */
  public domainSuffix(): SchemaField<string> {
    return new SchemaField<string>(() => this.utils.oneOfArray(DOMAIN_SUFFIX));
  }

  /**
   * Returns a domain word
   * @example schemas.internet.domainName() // Schema
   * @example schemas.internet.domainName().getValue() // 'words.info'
   * @returns string
   */
  public domainName(): SchemaField<string> {
    return new SchemaField<string>(() => {
      const name: string = this.wordSchema.noun().getValue({ language: "en" });
      const tale = this.dataTypeSchema.boolean().getValue();

      if (tale) {
        const t = this.utils.oneOfArray([
          "info",
          this.wordSchema.adjective().getValue({ language: "en" }),
        ]);
        const sep = this.utils.oneOfArray([".", "-"]);

        return `${name}${sep}${t}`;
      } else {
        return name;
      }
    });
  }

  /**
   * Returns a web http status code
   * @example schemas.internet.httpStatusCode() // Schema
   * @example schemas.internet.httpStatusCode().getValue // 201
   * @returns string
   */
  public httpStatusCode(): SchemaField<number> {
    return new SchemaField<number>(() => {
      const sel = this.utils.oneOfArray(
        Object.keys(HTTP_STATUS),
      ) as keyof HttpStatus;

      return this.utils.oneOfArray(HTTP_STATUS[sel]);
    });
  }
}
