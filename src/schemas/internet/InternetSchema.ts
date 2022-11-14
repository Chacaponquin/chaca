import { SchemaField } from "../SchemaField.js";
import { PrivateUtils } from "../../utils/helpers/PrivateUtils.js";
import { EMOJIS } from "./constants/emojis.js";
import { DOMAIN_SUFFIX } from "./constants/domainSuffix.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import { GenerateUserAgent } from "./helpers/userAgent.js";
import { Schemas } from "../index.js";

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

type UserNameArgs = {
  firstName?: string;
  lastName?: string;
};

export class InternetSchema {
  /**
   * Returns a user email
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @param args.provider email provider
   * @example schemas.internet.email() // Schema
   * @example
   * schemas.internet.email().getValue() // 'juan527120@gmail.com'
   * schemas.internet.email.getValue({firstName: 'pedro', lastName: 'Scott', provider: 'yahoo.com'}) // "pedro_scott@yahoo.com"
   * @returns string
   */
  public email(args: EmailArgs) {
    return new SchemaField<string, EmailArgs>(
      "email",
      (a) => {
        const provider =
          typeof a.provider === "string"
            ? a.provider
            : PrivateUtils.oneOfArray([
                "gmail.com",
                "yahoo.com",
                "hotmail.com",
              ]);

        return `${this.userName({
          firstName: a.firstName,
          lastName: a.lastName,
        })}@${provider}`;
      },
      args,
    );
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
    return new SchemaField<string, PasswordArgs>(
      "password",
      (a) => {
        const vowel = /[aeiouAEIOU]$/;
        const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;

        const len =
          typeof a.length === "number" && a.length > 0 ? a.length : 15;
        const memorable =
          typeof a.memorable === "boolean" ? a.memorable : false;
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
          const n = PrivateUtils.intNumber({ max: 94 }) + 33;
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
      },
      args || {},
    );
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
    return new SchemaField<string, UrlArgs>(
      "url",
      (a) => {
        if (typeof a.secure === "boolean") {
          const sec = a.secure ? "https" : "http";

          return `${sec}://${this.domainName().getValue()}.${this.domainSuffix().getValue()}`;
        } else
          return `${this.protocol().getValue()}://${this.domainName().getValue()}.${this.domainSuffix().getValue()}`;
      },
      args || {},
    );
  }

  /**
   * Returns a profile user name
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @example schemas.internet.userName() // Schema
   * @example
   * schemas.internet.userName().getValue() // 'juan527134'
   * schemas.internet.userName().getValue({firstName: 'pedro', lastName: 'Scott'}) // 'pedro_scott'
   * @returns string
   */
  public userName(args?: UserNameArgs) {
    return new SchemaField<string, UserNameArgs>(
      "userName",
      (a) => {
        const firstName =
          typeof a.firstName === "string"
            ? PrivateUtils.camelCaseText(a.firstName)
            : Schemas.person.firstName({ language: "en" }).getValue();
        const lastName =
          typeof a.lastName === "string"
            ? PrivateUtils.camelCaseText(a.lastName)
            : undefined;

        if (firstName && !lastName) {
          return `${firstName}${PrivateUtils.replaceSymbols("######")}`;
        } else {
          const ran = PrivateUtils.intNumber({ min: 0, max: 2 });
          let result: string;
          switch (ran) {
            case 0:
              result = `${firstName}${lastName}${PrivateUtils.replaceSymbols(
                "###",
              )}`;
              break;
            case 1:
              result = `${firstName}${PrivateUtils.oneOfArray([
                ".",
                "_",
              ])}${lastName}`;
              break;
            case 2:
              result = result = `${firstName}${PrivateUtils.oneOfArray([
                ".",
                "_",
              ])}${lastName}${PrivateUtils.replaceSymbols("###")}`;
              break;
            default:
              result =
                result = `${firstName}${lastName}${PrivateUtils.replaceSymbols(
                  "###",
                )}`;
              break;
          }

          return result;
        }
      },
      args || {},
    );
  }

  /**
   * Returns a http method
   * @example
   * schemas.internet.httpMethod() // Schema
   * @example
   * schemas.internet.httpMethod().getValue() // 'GET'
   * @returns `GET` | `PATCH` | `DELETE` | `POST` | `PUT`
   */
  public httpMethod() {
    return new SchemaField<string>(
      "httoMethod",
      () => {
        return PrivateUtils.oneOfArray([
          "GET",
          "PATCH",
          "DELETE",
          "POST",
          "PUT",
        ]);
      },
      {},
    );
  }

  /**
   * Returns a IPv6 address
   * @example schemas.internet.ipv6() // Schema
   * @example schemas.internet.ipv6().getValue() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   * @returns string
   */
  public ipv6() {
    return new SchemaField<string>(
      "ipv6",
      () => {
        const randHash = () => {
          let result = "";
          for (let i = 0; i < 4; i++) {
            result += PrivateUtils.oneOfArray([
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
      },
      {},
    );
  }

  /**
   * Returns a IPv4 address.
   * @example schemas.internet.ipv4() // Schema
   * @example schemas.internet.ipv4().getValue() // '245.108.222.0'
   * @returns string
   */
  public ipv4() {
    return new SchemaField<string>(
      "ipv4",
      () => {
        let retString = "";

        for (let i = 1; i <= 4; i++) {
          const val = PrivateUtils.intNumber({ max: 255, min: 0 });
          if (i === 4) retString += `${val}`;
          else retString += `${val}.`;
        }

        return retString;
      },
      {},
    );
  }

  /**
   * Return an emoji string
   * @example schemas.internet.emoji().getValue() // '🔎'
   * @returns string
   */
  public emoji(args?: EmojiProps) {
    return new SchemaField<string, EmojiProps>(
      "emoji",
      (a) => {
        const emoji = typeof a.emoji === "string" ? a.emoji : undefined;

        if (emoji) {
          const selEmoji = EMOJIS[emoji];
          if (selEmoji) {
            return PrivateUtils.oneOfArray(selEmoji);
          } else {
            let retEmojis: string[] = [];
            for (const val of Object.values(EMOJIS)) {
              retEmojis = [...retEmojis, ...val];
            }
            return PrivateUtils.oneOfArray(retEmojis);
          }
        } else {
          let retEmojis: string[] = [];
          for (const val of Object.values(EMOJIS)) {
            retEmojis = [...retEmojis, ...val];
          }
          return PrivateUtils.oneOfArray(retEmojis);
        }
      },
      args || {},
    );
  }

  /**
   * Returns a mac address
   * @example schemas.internet.mac() // Schema
   * @example schemas.internet.mac().getValue() // '32:8e:2e:09:c6:05'
   * @returns string
   */
  public mac() {
    return new SchemaField<string>(
      "mac",
      () => {
        let retString = "";

        const lowerCharacters = PrivateUtils.characters("lower");
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 1; i <= 6; i++) {
          for (let j = 1; j <= 2; j++) {
            retString += `${String(
              PrivateUtils.oneOfArray([...numbers, ...lowerCharacters]),
            )}`;
          }

          if (i !== 6) retString += `:`;
        }

        return retString;
      },
      {},
    );
  }

  /**
   * Returns a port number
   * @example schemas.internet.port() // Schema
   * @example
   * schemas.internet.port().getValue() // 8001
   * @returns string
   */
  public port() {
    return new SchemaField<number>(
      "port",
      () => PrivateUtils.intNumber({ min: 0, max: 65535 }),
      {},
    );
  }

  /**
   * Returns a string with a browser user agent
   * @example schemas.internet.userAgent() // Schema
   * @example schemas.internet.userAgent().getValue() // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   * @returns string
   */
  public userAgent() {
    return new SchemaField<string>("userAgent", () => GenerateUserAgent(), {});
  }

  /**
   * Returns a web protocol
   * @example schemas.internet.protocol() // Schema
   * @example schemas.internet.protocol().getValue() // 'https'
   * @returns string
   */
  public protocol() {
    return new SchemaField<string>(
      "protocol",
      () => PrivateUtils.oneOfArray(["http", "https"]),
      {},
    );
  }

  /**
   * Returns a domain suffix
   * @example schemas.internet.domainSuffix() // Schema
   * @example schemas.internet.domainSuffix().getValue() // '.com'
   * @returns string
   */
  public domainSuffix() {
    return new SchemaField<string>(
      "domainSuffix",
      () => PrivateUtils.oneOfArray(DOMAIN_SUFFIX),
      {},
    );
  }

  /**
   * Returns a domain word
   * @example schemas.internet.domainName() // Schema
   * @example schemas.internet.domainName().getValue() // 'words.info'
   * @returns string
   */
  public domainName() {
    return new SchemaField<string>(
      "domainName",
      () => {
        const name: string = Schemas.word.noun().getValue({ language: "en" });
        const tale = PrivateUtils.boolean();

        if (tale) {
          const t = PrivateUtils.oneOfArray([
            "info",
            Schemas.word.adjective().getValue({ language: "en" }),
          ]);
          const sep = PrivateUtils.oneOfArray([".", "-"]);

          return `${name}${sep}${t}`;
        } else return name;
      },
      {},
    );
  }

  /**
   * Returns a web http status code
   * @example schemas.internet.httpStatusCode() // Schema
   * @example schemas.internet.httpStatusCode().getValue // 201
   * @returns string
   */
  public httpStatusCode() {
    return new SchemaField<number>(
      "httpStatusCode",
      () => {
        const sel = PrivateUtils.oneOfArray(
          Object.keys(HTTP_STATUS),
        ) as keyof HttpStatus;
        return PrivateUtils.oneOfArray(HTTP_STATUS[sel]);
      },
      {},
    );
  }
}
