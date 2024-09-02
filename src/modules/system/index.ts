import { ChacaUtils } from "../../core/utils";
import { Module } from "../module";
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

type FileNameProps = {
  ext?: string;
};

export class SystemModule {
  private datatypeModule = new DatatypeModule();
  private wordModule = new WordModule();

  private utils = new ChacaUtils();

  public readonly constants = {
    fileExtensions: FILE_EXTENSIONS,
    mimeTypes: MIME_TYPES,
  };

  /**
   * Returns a file name
   * @param args.ext extension of the file
   * @example modules.system.filename() // Schema
   * @example
   * modules.system.filename().getValue() // 'academy.png'
   * modules.system.filename().getValue({ext: 'gif'}) // 'academy_button_school.gif'
   * @returns string
   */
  filename(args?: FileNameProps) {
    return new Module<string, FileNameProps>((a) => {
      const ext =
        typeof a.ext === "string" && a.ext.length > 0
          ? a.ext
          : this.fileExt().getValue();

      const arrayNames: string[] = Array.from({
        length: this.datatypeModule.int().getValue({ min: 1, max: 5 }),
      }).map(() => this.wordModule.noun().getValue({ language: "en" }));

      return `${arrayNames.join("")}.${ext}`;
    }, args || {});
  }

  /**
   * Returns a mime type
   * @example modules.system.mimeType() // Schema
   * @example modules.system.mimeType().getValue() // 'video/mpeg'
   * @returns string
   */
  mimeType() {
    return new Module<string>(() => this.utils.oneOfArray(MIME_TYPES));
  }

  /**
   * Return a file extension
   * @example modules.system.fileExt() // Schema
   * @example modules.system.fileExt().getValue() // 'mp4'
   * @returns string
   */
  fileExt() {
    return new Module<string>(() => {
      const selTem = this.utils.oneOfArray(
        Object.keys(FILE_EXTENSIONS),
      ) as keyof FileExtensions;
      return this.utils.oneOfArray(FILE_EXTENSIONS[selTem]);
    });
  }

  /**
   * Returns a directory path
   * @example modules.system.directoryPath() // Schema
   * @example modules.system.directoryPath().getValue() // 'user/files/videos'
   * @returns string
   */
  directoryPath() {
    return new Module<string>(() => {
      const cantFolder = this.datatypeModule.int().getValue({ min: 1, max: 5 });
      const array = Array.from({ length: cantFolder });

      for (let i = 0; i < array.length; i++) {
        array[i] = this.wordModule.noun().getValue();
      }

      return array.join("/");
    });
  }

  /**
   * Returns a string with a system file path
   * @example modules.system.filePath() // Schema
   * @example modules.system.filePath().getValue() // 'user/files/videos/academy.mp4'
   * @returns string
   */
  filePath() {
    return new Module<string>(() => {
      return `${this.directoryPath().getValue()}/${this.filename().getValue()}`;
    });
  }
}
