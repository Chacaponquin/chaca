import { SchemaField } from '../../utils/SchemaField';
import { faker } from '@faker-js/faker';

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

type UserNameArgs = {
  firstName?: string;
  lastName?: string;
};

export class InternetSchema {
  public domainName(): SchemaField {
    return new SchemaField<string>('domainName', faker.internet.domainName, {});
  }

  public email(args: EmailArgs) {
    return new SchemaField<string, EmailArgs>(
      'email',
      () =>
        faker.internet.email(args.firstName, args.lastName, args.provider, {
          allowSpecialCharacters: args.specialCharacters,
        }),
      args,
    );
  }

  public password(args?: PasswordArgs) {
    return new SchemaField<string, PasswordArgs>(
      'password',
      (a) => {
        return faker.internet.password(
          a.length,
          a.memorable,
          a.pattern,
          a.prefix,
        );
      },
      args || {},
    );
  }

  public url(args?: UrlArgs) {
    return new SchemaField<string, UrlArgs>(
      'url',
      (a) => {
        if (a.secure !== undefined) {
          if (!a.secure) return faker.internet.url();

          let top = a.secure ? 'https' : 'http';
          let randomUrl: string = faker.internet.url();

          return randomUrl;
        } else return faker.internet.url();
      },
      args || {},
    );
  }

  public userName(args?: UserNameArgs) {
    return new SchemaField<string, UserNameArgs>(
      'userName',
      (a: UserNameArgs) => {
        if (a !== undefined) {
          return faker.internet.userName(a.firstName, a.lastName);
        } else return faker.internet.userName();
      },
      args || {},
    );
  }

  public httpMethod() {
    return new SchemaField<string>(
      'httoMethod',
      () => faker.internet.httpMethod(),
      {},
    );
  }

  public ip() {
    return new SchemaField<string>('ip', () => faker.internet.ip(), {});
  }

  public emoji() {
    return new SchemaField<string>('emoji', () => faker.internet.emoji(), {});
  }

  public mac() {
    return new SchemaField<string>('mac', () => faker.internet.mac(), {});
  }

  public port() {
    return new SchemaField<number>('port', () => faker.internet.port(), {});
  }

  public ipv4() {
    return new SchemaField<string>('ipv4', () => faker.internet.ipv4(), {});
  }

  public userAgent() {
    return new SchemaField<string>(
      'userAgent',
      () => faker.internet.userAgent(),
      {},
    );
  }

  public protocol() {
    return new SchemaField<string>(
      'protocol',
      () => faker.internet.protocol(),
      {},
    );
  }

  public domainSuffix() {
    return new SchemaField<string>(
      'domainSuffix',
      () => faker.internet.domainSuffix(),
      {},
    );
  }

  public domainWord() {
    return new SchemaField<string>(
      'domainWord',
      () => faker.internet.domainWord(),
      {},
    );
  }

  public httpStatusCode() {
    return new SchemaField<number>(
      'httpStatusCode',
      () => {
        return faker.internet.httpStatusCode();
      },
      {},
    );
  }
}
