import { PrivateUtils } from "../../core/helpers/PrivateUtils.js";
import { SchemaField } from "../SchemaField.js";
import { MIME_TYPES } from "./constants/mimeTypes.js";
import { FILE_EXTENSIONS } from "./constants/fileExtensions.js";
import { DataTypeSchema } from "../dataType/DataTypeSchema.js";
import { WordSchema } from "../word/WordSchema.js";

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

export class SystemSchema {
  private dataTypeSchema = new DataTypeSchema();
  private wordSchema = new WordSchema();

  /**
   * Returns a file name
   * @param args.ext extension of the file
   * @example schemas.system.fileName() // Schema
   * @example
   * schemas.system.fileName().getValue() // 'academy.png'
   * schemas.system.fileName().getValue({ext: 'gif'}) // 'academy_button_school.gif'
   * @returns string
   */
  fileName(args?: FileNameProps) {
    return new SchemaField<string, FileNameProps>(
      "fileName",
      (a) => {
        const ext =
          typeof a.ext === "string" && a.ext.length > 0
            ? a.ext
            : this.fileExt().getValue();

        const arrayNames: string[] = Array.from({
          length: this.dataTypeSchema.int().getValue({ min: 1, max: 5 }),
        }).map(() => this.wordSchema.noun().getValue({ language: "en" }));

        return `${PrivateUtils.joinWords(arrayNames)}.${ext}`;
      },
      args || {},
    );
  }

  /**
   * Returns a mime type
   * @example schemas.system.mimeType() // Schema
   * @example schemas.system.mimeType().getValue() // 'video/mpeg'
   * @returns string
   */
  mimeType() {
    return new SchemaField<string>(
      "mimeType",
      () => {
        return PrivateUtils.oneOfArray(MIME_TYPES);
      },
      {},
    );
  }

  /**
   * Return a file extension
   * @example schemas.system.fileExt() // Schema
   * @example schemas.system.fileExt().getValue() // 'mp4'
   * @returns string
   */
  fileExt() {
    return new SchemaField<string>(
      "fileExtension",
      () => {
        const selTem = PrivateUtils.oneOfArray(
          Object.keys(FILE_EXTENSIONS),
        ) as keyof FileExtensions;
        return PrivateUtils.oneOfArray(FILE_EXTENSIONS[selTem]);
      },
      {},
    );
  }

  /**
   * Returns a directory path
   * @example schemas.system.directoryPath() // Schema
   * @example schemas.system.directoryPath().getValue() // 'user/files/videos'
   * @returns string
   */
  directoryPath() {
    return new SchemaField<string>(
      "directoryPath",
      () => {
        const cantFolder = this.dataTypeSchema
          .int()
          .getValue({ min: 1, max: 5 });
        const array = Array.from({ length: cantFolder });

        for (let i = 0; i < array.length; i++) {
          array[i] = this.wordSchema.noun().getValue();
        }

        return array.join("/");
      },
      {},
    );
  }

  /**
   * Returns a string with a system file path
   * @example schemas.system.filePath() // Schema
   * @example schemas.system.filePath().getValue() // 'user/files/videos/academy.mp4'
   * @returns string
   */
  filePath() {
    return new SchemaField<string>(
      "filePath",
      () => {
        return `${this.directoryPath().getValue()}/${this.fileName().getValue()}`;
      },
      {},
    );
  }
}
