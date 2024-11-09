import { DatatypeModule } from "../../datatype";

export class Password {
  constructor(
    private readonly datatypeModule: DatatypeModule,
    readonly consonants: RegExp,
    readonly vowel: RegExp,
  ) {}

  execute(
    length: number,
    memorable: boolean,
    i_pattern: RegExp,
    prefix: string,
  ): string {
    if (prefix.length >= length) {
      return prefix;
    }

    let pattern: RegExp = i_pattern;
    if (memorable) {
      if (prefix.match(this.consonants)) {
        pattern = this.vowel;
      } else {
        pattern = this.consonants;
      }
    }

    const n = this.datatypeModule.int({ min: 0, max: 94 }) + 33;
    let char = String.fromCharCode(n);

    if (memorable) {
      char = char.toLowerCase();
    }

    if (!char.match(pattern)) {
      return this.execute(length, memorable, pattern, prefix);
    }

    return this.execute(length, memorable, pattern, prefix + char);
  }
}
