import { ChacaUtils } from "../../core/utils";
import { MIME_TYPES } from "./constants/mimeTypes";
import { FILE_EXTENSIONS } from "./constants/fileExtensions";
import { WordModule } from "../word";
import { DatatypeModule } from "../datatype";

export type FileExtensions = {
  audio: string[];
  code: string[];
  data: string[];
  video: string[];
  photo: string[];
};

export interface CronProps {
  includeYear?: boolean;
  includeNonStandard?: boolean;
}

export type FilenameProps = {
  ext?: string;
};

const CRON_DAY_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export class SystemModule {
  private readonly datatypeModule = new DatatypeModule();
  private readonly utils = new ChacaUtils();

  readonly constants = {
    fileExtensions: FILE_EXTENSIONS,
    mimeTypes: MIME_TYPES,
  };

  /**
   * Returns a file name
   * @param args.ext File extension
   * @example
   * modules.system.filename() // 'academy.png'
   * modules.system.filename({ ext: 'gif' }) // 'academy_button_school.gif'
   * @returns string
   */
  filename({ ext: iext }: FilenameProps = {}): string {
    const datatypeModule = new DatatypeModule();
    const wordModule = new WordModule();

    const ext =
      typeof iext === "string" && iext.length > 0 ? iext : this.fileExt();

    const length = datatypeModule.int({ min: 1, max: 5 });

    const arrayNames: string[] = Array.from({
      length: length,
    }).map(() => wordModule.noun({ language: "en" }));

    return `${arrayNames.join("")}.${ext}`;
  }

  /**
   * Returns a mime type
   * @example modules.system.mimeType() // 'video/mpeg'
   * @returns string
   */
  mimeType(): string {
    const utils = new ChacaUtils();
    return utils.oneOfArray(MIME_TYPES);
  }

  /**
   * Return a file extension
   * @example modules.system.fileExt() // 'mp4'
   * @returns string
   */
  fileExt(): string {
    const utils = new ChacaUtils();

    const all = [] as string[];

    Object.values(FILE_EXTENSIONS).forEach((values) => all.push(...values));

    return utils.oneOfArray(all);
  }

  /**
   * Returns a directory path
   * @example modules.system.directoryPath() // 'user/files/videos'
   * @returns string
   */
  directoryPath(): string {
    const datatypeModule = new DatatypeModule();
    const wordModule = new WordModule();

    const countFolder = datatypeModule.int({ min: 1, max: 5 });
    const array = Array.from({ length: countFolder });

    for (let i = 0; i < array.length; i++) {
      array[i] = wordModule.noun();
    }

    return array.join("/");
  }

  /**
   * Returns a string with a system file path
   * @example modules.system.filePath() // 'user/files/videos/academy.mp4'
   * @returns string
   */
  filePath(): string {
    return `${this.directoryPath()}/${this.filename()}`;
  }

  /**
   * Returns a [semantic version](https://semver.org).
   *
   * @example
   * modules.system.semver() // '1.1.2'
   */
  semver(): string {
    return [
      this.datatypeModule.int({ min: 0, max: 9 }),
      this.datatypeModule.int({ min: 0, max: 9 }),
      this.datatypeModule.int({ min: 0, max: 9 }),
    ].join(".");
  }

  /**
   * Returns a random cron expression.
   *
   * @param args.includeYear Whether to include a year in the generated expression. Defaults to `false`.
   * @param args.includeNonStandard Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression. Defaults to `false`.
   *
   * @example
   * modules.system.cron() // '45 23 * * 6'
   * modules.system.cron({ includeYear: true }) // '45 23 * * 6 2067'
   * modules.system.cron({ includeYear: false }) // '45 23 * * 6'
   * modules.system.cron({ includeNonStandard: false }) // '45 23 * * 6'
   * modules.system.cron({ includeNonStandard: true }) // '@yearly'
   */
  cron({
    includeYear = false,
    includeNonStandard = false,
  }: CronProps = {}): string {
    // create the arrays to hold the available values for each component of the expression
    const minutes = [this.datatypeModule.int({ min: 0, max: 59 }), "*"];
    const hours = [this.datatypeModule.int({ min: 0, max: 23 }), "*"];
    const days = [this.datatypeModule.int({ min: 1, max: 31 }), "*", "?"];
    const months = [this.datatypeModule.int({ min: 1, max: 12 }), "*"];
    const daysOfWeek = [
      this.datatypeModule.int({ min: 0, max: 6 }),
      this.utils.oneOfArray(CRON_DAY_OF_WEEK),
      "*",
      "?",
    ];
    const years = [this.datatypeModule.int({ min: 1970, max: 2099 }), "*"];

    const minute = this.utils.oneOfArray(minutes);
    const hour = this.utils.oneOfArray(hours);
    const day = this.utils.oneOfArray(days);
    const month = this.utils.oneOfArray(months);
    const dayOfWeek = this.utils.oneOfArray(daysOfWeek);
    const year = this.utils.oneOfArray(years);

    // create and return the cron expression string
    let standardExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
    if (includeYear) {
      standardExpression += ` ${year}`;
    }

    const nonStandardExpressions = [
      "@annually",
      "@daily",
      "@hourly",
      "@monthly",
      "@reboot",
      "@weekly",
      "@yearly",
    ];

    return !includeNonStandard || this.datatypeModule.boolean()
      ? standardExpression
      : this.utils.oneOfArray(nonStandardExpressions);
  }
}
