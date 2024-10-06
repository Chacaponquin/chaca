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

export type FilenameProps = {
  ext?: string;
};

export class SystemModule {
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
}
