export class SQLDataGenerator {
  constructor(private readonly generator: SQLExtensionGenerator) {}

  code(): string {
    let code = ``;

    code += this.generator.tables();

    return code;
  }
}

export abstract class SQLExtensionGenerator {
  abstract tables(): string;
}

export class PostgreSQL extends SQLExtensionGenerator {
  tables(): string {
    return "";
  }
}
