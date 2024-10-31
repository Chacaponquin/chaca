export interface ZipConfig {
  /** The generated files are stored in a zip file. Default `false` */
  zip?: boolean;
}

export interface IndentConfig {
  /** Indentation width to use (in spaces). Default `3` */
  indent?: number;
}

export interface SeparateConfig {
  /** The data of each schema must be separated into separate files. Default `false` */
  separate?: boolean;
}

export interface SkipInvalidConfig {
  /**
   * Do not throw on invalid types. Default `false`
   */
  skipInvalid?: boolean;
}

export interface DeclarationOnlyConfig {
  /**
   * Value assignment will not be included in the files. Default `false`
   */
  declarationOnly?: boolean;
}
