import {
  SchemaInput,
  FieldObjectInput,
  IsArrayConfig,
  PossibleNullConfig,
  FieldTypes,
  SchemaFieldConfig,
  PossibleNullFunction,
  PossibleNullFunctionProps,
} from "./core/schema/interfaces/schema";

import { CustomField, CustomFieldProps } from "./core/fields/core/custom";

import {
  ExportFormat,
  FileConfig,
  ExportSQLFormat,
  JsonFormatConfig,
  CsvFormatConfig,
  JavaFormatConfig,
  JavascriptFormatConfig,
  ExtensionConfigs,
  Extensions,
  PostgresqlFormatConfig,
  PythonFormatConfig,
  TypescriptFormatConfig,
  YamlFormatConfig,
} from "./core/export/interfaces/export";

import { Schema } from "./core/schema";

import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
  CyclicAccessDataError,
  NotExistRefFieldError,
  EmptyEnumValuesError,
  PickFieldDefinitionError,
} from "./errors";

import {
  GetStoreConfig,
  GetStoreWhere,
} from "./core/schema-store/interfaces/store";

import { DatasetSchema } from "./core/dataset-resolver/interfaces/resolver";

import {
  RefFieldConfig,
  FieldToRef,
  RefField,
  RefFieldWhereProps,
  RefFieldWhere,
} from "./core/fields/core/ref";

import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/fields/core/sequential/SequentialField";

import { KeyField, KeyFieldProps } from "./core/fields/core/key";

import {
  SequenceField,
  SequenceFieldProps,
} from "./core/fields/core/sequence/SequenceField";

import { DatasetStore } from "./core/dataset-store";
import { EnumField } from "./core/fields/core/enum";
import { Chaca } from "./Chaca";
import { ChacaUtils } from "./core/utils";

import {
  ProbabilityField,
  Chance,
  ProbabilityOption,
  ChanceFunction,
  ChanceFunctionProps,
} from "./core/fields/core/probability";

import {
  PickField,
  PickFieldProps,
  PickCount,
  PickCountFunction,
  PickCountFunctionProps,
  PickCountLimits,
} from "./core/fields/core/pick";

import { ChacaModules } from "./modules";
import { Dataset } from "./core/dataset";
import { DumpConfig, DumpFile } from "./core/export/resolvers/dump/dump";

const utils = new ChacaUtils();

export const modules = new ChacaModules(utils);
export const chaca = new Chaca(modules.datatype, utils);

export {
  TryRefANoKeyFieldError,
  EmptySequentialValuesError,
  CyclicAccessDataError,
  ChacaError,
  NotEnoughValuesForRefError,
  NotExistRefFieldError,
  EmptyEnumValuesError,
  PickFieldDefinitionError,
};

export {
  KeyField,
  RefField,
  EnumField,
  SequenceField,
  SequentialField,
  ProbabilityField,
  PickField,
};

export { Schema, DatasetStore, Chaca, ChacaUtils, ChacaModules };

export type {
  CustomField,
  SchemaInput,
  ExportFormat,
  FileConfig,
  DatasetSchema,
  FieldToRef,
  RefFieldWhere,
  GetStoreConfig,
  ExportSQLFormat,
  SequenceFieldProps,
  KeyFieldProps,
  RefFieldConfig,
  FieldObjectInput,
  IsArrayConfig,
  PossibleNullConfig,
  CustomFieldProps,
  SequentialFieldConfig,
  RefFieldWhereProps,
  FieldTypes,
  SchemaFieldConfig,
  PossibleNullFunction,
  PossibleNullFunctionProps,
  Chance,
  ProbabilityOption,
  ChanceFunction,
  ChanceFunctionProps,
  PickFieldProps,
  GetStoreWhere,
  PickCount,
  PickCountFunctionProps,
  PickCountFunction,
  PickCountLimits,
  DumpConfig,
  DumpFile,
};

export type {
  JsonFormatConfig,
  CsvFormatConfig,
  JavaFormatConfig,
  JavascriptFormatConfig,
  ExtensionConfigs,
  Extensions,
  PostgresqlFormatConfig,
  PythonFormatConfig,
  TypescriptFormatConfig,
  YamlFormatConfig,
};

export { Dataset };
