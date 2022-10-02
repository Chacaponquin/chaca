import { SchemaField } from "../utils/SchemaField";
import { faker } from "@faker-js/faker";

type EmailArgs = {
  firstName?: string;
  lastName?: string;
  provider?: string;
  specialCharacters?: boolean;
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

export class InternetSchema {
  public domainName(): SchemaField {
    return new SchemaField("domainName", faker.internet.domainName, {});
  }

  public email(args: EmailArgs): SchemaField<EmailArgs> {
    return new SchemaField<EmailArgs>(
      "email",
      () =>
        faker.internet.email(args.firstName, args.lastName, args.provider, {
          allowSpecialCharacters: args.specialCharacters,
        }),
      args
    );
  }

  public password(args?: PasswordArgs): SchemaField<PasswordArgs> {
    const a = args || {};
    return new SchemaField<PasswordArgs>(
      "password",
      () => {
        return faker.internet.password(
          a.length,
          a.memorable,
          a.pattern,
          a.prefix
        );
      },
      a
    );
  }

  public url(args?: UrlArgs) {
    return new SchemaField<UrlArgs>(
      "url",
      () => {
        if (args !== undefined && args.secure !== undefined) {
          if (!args.secure) return faker.internet.url();

          let top = args.secure ? "https" : "http";
          let randomUrl: string = faker.internet.url();

          return randomUrl;
        } else return faker.internet.url();
      },
      args || {}
    );
  }
}
