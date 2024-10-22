export interface ZipConfig {
  /**The generated files are stored in a zip file. Default `false` */
  zip?: boolean;
}

export interface IndentConfig {
  /**Indentation width to use (in spaces). Default `2` */
  index?: number;
}

export interface SeparateConfig {
  /**The data of each schema must be separated into separate files. Default `false` */
  separate?: boolean;
}
