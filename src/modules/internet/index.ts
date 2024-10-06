import { ChacaUtils } from "../../core/utils";
import { EMOJIS } from "./constants/emojis";
import { DOMAIN_SUFFIX } from "./constants/domainSuffix";
import { HTTP_STATUS } from "./constants/httpStatus";
import { HTTP_METHODS } from "./constants/http_method";
import { GenerateUserAgent } from "./helpers/user-agent";
import { PersonModule } from "../person";
import { PROTOCOL } from "./constants/protocol";
import { OAUTH_PROVIDER } from "./constants/oauth";
import { LOCALE } from "./constants/locale";
import { EMAIL_PROVIDER } from "./constants/email_provider";
import { BROWSERS } from "./constants/browser";
import { DatatypeModule } from "../datatype";
import { WordModule } from "../word";

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

type UsernameArgs = {
  firstName?: string;
  lastName?: string;
};

export class InternetModule {
  readonly constants = {
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
   * modules.internet.browser() // 'Opera'
   *
   * @returns string
   */
  browser(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.browsers);
  }

  /**
   * Generate a random OAuth provider
   *
   * @example
   * modules.internet.oauthProvider() // 'Amazon'
   *
   * @returns string
   */
  oauthProvider(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.oauthProviders);
  }

  /**
   * Returns a random locale
   *
   * @example
   * modules.internet.locale() // 'es_MX'
   *
   * @returns string
   */
  locale(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.locales);
  }

  /**
   * Returns a random email provider
   *
   * @example
   * modules.internet.emailProvider() // 'gmail'
   *
   * @returns string
   */
  emailProvider(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.emailProviders);
  }

  /**
   * Returns a user email
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @param args.provider email provider
   *
   * @example
   * modules.internet.email() // 'juan527120@gmail.com'
   * modules.internet.email({ firstName: 'pedro', lastName: 'Scott', provider: 'yahoo.com' }) // "pedro_scott@yahoo.com"
   *
   * @returns string
   */
  email({ firstName, lastName, provider: iprovider }: EmailArgs = {}): string {
    const utils = new ChacaUtils();

    const provider = iprovider
      ? iprovider
      : utils.oneOfArray(this.constants.emailProviders);

    const username = this.username({
      firstName: firstName,
      lastName: lastName,
    });

    const email = `${username}@${provider}.com`;

    return email.toLowerCase();
  }

  /**
   * Returns a password.
   *
   * @param args.length The length of the password to generate. Defaults to `15`.
   * @param args.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param args.pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param args.prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * modules.internet.password() // '89G1wJuBLbGziIs'
   * modules.internet.password({ length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
   * modules.internet.password({ length: 20, memorable: true }) // 'lawetimufozujosodedi'
   * modules.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
   * modules.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
   *
   * @returns string
   */
  password({
    length,
    memorable: imemorable,
    pattern: ipattern,
    prefix: iprefix,
  }: PasswordArgs = {}): string {
    const datatypeModule = new DatatypeModule();

    const vowel = /[aeiouAEIOU]$/;
    const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;

    const len = length && length > 0 ? length : 15;
    const memorable = imemorable ? imemorable : false;
    const pattern = ipattern instanceof RegExp ? ipattern : consonant;
    const prefix = iprefix ? iprefix : "";

    const _password = (
      length: number,
      memorable: boolean,
      i_pattern: RegExp,
      prefix: string,
    ): string => {
      if (prefix.length >= length) {
        return prefix;
      }

      let pattern: RegExp = i_pattern;
      if (memorable) {
        if (prefix.match(consonant)) {
          pattern = vowel;
        } else {
          pattern = consonant;
        }
      }

      const n = datatypeModule.int({ min: 0, max: 94 }) + 33;
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
  }

  /**
   * Returns a string with a web url
   * @example
   * modules.internet.url() // 'http://words.info.net'
   * @param args.secure Boolean that indicates if the url has a secure protocol or not
   * @returns
   */
  url({ secure }: UrlArgs = {}): string {
    if (typeof secure === "boolean") {
      const sec = secure ? "https" : "http";

      return `${sec}://${this.domainName()}.${this.domainSuffix()}`;
    } else {
      return `${this.protocol()}://${this.domainName()}.${this.domainSuffix()}`;
    }
  }

  /**
   * Returns a profile user name
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @example
   * modules.internet.username() // 'juan527134'
   * modules.internet.username({ firstName: 'pedro', lastName: 'Scott' }) // 'pedro_scott'
   * @returns string
   */
  username({
    firstName: ifirstName,
    lastName: ilastName,
  }: UsernameArgs = {}): string {
    const datatypeModule = new DatatypeModule();
    const personModule = new PersonModule();
    const utils = new ChacaUtils();

    const firstName = ifirstName
      ? utils.camelCase(ifirstName)
      : personModule.firstName({ language: "en" });
    const lastName = ilastName ? utils.camelCase(ilastName) : "";

    const ran = datatypeModule.int({ min: 0, max: 3 });

    const genNumbers = (): string => {
      const countNumbers = datatypeModule.int({ min: 1, max: 5 });

      return utils.replaceSymbols(
        Array.from({ length: countNumbers })
          .map(() => "#")
          .join(""),
      );
    };

    const genSymbol = (): string => {
      return utils.oneOfArray([".", "-", "_"]);
    };

    let result: string;
    if (ran === 0) {
      const numbers = utils.replaceSymbols(genNumbers());
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
  }

  /**
   * Returns a http method
   * @example
   * modules.internet.httpMethod() // 'GET'
   * @returns `GET` | `PATCH` | `DELETE` | `POST` | `PUT`
   */
  httpMethod(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(HTTP_METHODS);
  }

  /**
   * Returns a IPv6 address
   * @example modules.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   * @returns string
   */
  ipv6(): string {
    const utils = new ChacaUtils();

    const randHash = () => {
      let result = "";
      for (let i = 0; i < 4; i++) {
        result += utils.oneOfArray([
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
  }

  /**
   * Returns a IPv4 address.
   * @example modules.internet.ipv4() // '245.108.222.0'
   * @returns string
   */
  ipv4(): string {
    const datatypeModule = new DatatypeModule();

    let retString = "";

    for (let i = 1; i <= 4; i++) {
      const val = datatypeModule.int({ max: 255, min: 0 });

      if (i === 4) {
        retString += `${val}`;
      } else {
        retString += `${val}.`;
      }
    }

    return retString;
  }

  /**
   * Return an emoji
   * @param args.emoji emoji category
   * @example modules.internet.emoji() // '🔎'
   * @returns string
   */
  emoji({ emoji: iemoji }: EmojiProps = {}): string {
    const utils = new ChacaUtils();

    const emoji = iemoji ? iemoji : undefined;

    if (emoji) {
      const selEmoji = EMOJIS[emoji];
      if (selEmoji) {
        return utils.oneOfArray(selEmoji);
      } else {
        let retEmojis: string[] = [];
        for (const val of Object.values(EMOJIS)) {
          retEmojis = [...retEmojis, ...val];
        }

        return utils.oneOfArray(retEmojis);
      }
    } else {
      let retEmojis: string[] = [];
      for (const val of Object.values(EMOJIS)) {
        retEmojis = [...retEmojis, ...val];
      }

      return utils.oneOfArray(retEmojis);
    }
  }

  /**
   * Returns a mac address
   * @example modules.internet.mac() // '32:8e:2e:09:c6:05'
   * @returns string
   */
  mac(): string {
    const utils = new ChacaUtils();
    const datatypeModule = new DatatypeModule();

    let retString = "";

    const lowerCharacters = datatypeModule.constants.lowerCharacters;
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 2; j++) {
        retString += `${String(
          utils.oneOfArray([...numbers, ...lowerCharacters]),
        )}`;
      }

      if (i !== 6) retString += `:`;
    }

    return retString;
  }

  /**
   * Returns a port number
   * @example
   * modules.internet.port() // 8001
   * @returns string
   */
  port(): number {
    const datatypeModule = new DatatypeModule();
    return datatypeModule.int({ min: 0, max: 65535 });
  }

  /**
   * Returns a string with a browser user agent
   * @example modules.internet.userAgent() // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   * @returns string
   */
  userAgent(): string {
    return GenerateUserAgent();
  }

  /**
   * Returns a web protocol
   * @example modules.internet.protocol() // 'https'
   * @returns string
   */
  protocol(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(this.constants.protocols);
  }

  /**
   * Returns a domain suffix
   * @example modules.internet.domainSuffix() // '.com'
   * @returns string
   */
  domainSuffix(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(DOMAIN_SUFFIX);
  }

  /**
   * Returns a domain word
   * @example modules.internet.domainName() // 'words.info'
   * @returns string
   */
  domainName(): string {
    const utils = new ChacaUtils();
    const wordModule = new WordModule();
    const datatypeModule = new DatatypeModule();

    const name: string = wordModule.noun({ language: "en" });
    const tale = datatypeModule.boolean();

    if (tale) {
      const t = utils.oneOfArray([
        "info",
        wordModule.adjective({ language: "en" }),
      ]);
      const sep = utils.oneOfArray([".", "-"]);

      return `${name}${sep}${t}`;
    } else {
      return name;
    }
  }

  /**
   * Returns a web http status code
   * @example modules.internet.httpStatusCode() // 201
   * @returns string
   */
  httpStatusCode(): number {
    const utils = new ChacaUtils();

    const sel = utils.oneOfArray(Object.keys(HTTP_STATUS)) as keyof HttpStatus;

    return utils.oneOfArray(HTTP_STATUS[sel]);
  }
}
