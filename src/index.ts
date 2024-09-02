import {
  SchemaInput,
  FieldObjectInput,
  CustomField,
  InputIsArrayConfig,
  InputPossibleNull,
  CustomFieldProps,
  FieldTypes,
  SchemaFieldConfig,
  PossibleNullFunction,
  PossibleNullFunctionProps,
} from "./core/schema/interfaces/schema";

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

import { ChacaSchema } from "./core/schema";

import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
  CyclicAccessDataError,
  NotExistFieldError,
  EmptyEnumValuesError,
  PickFieldDefinitionError,
} from "./errors";

import { GetStoreValueInput } from "./core/schema-store/interfaces/store";

import { DatasetSchema } from "./core/dataset-resolver/interfaces/resolver";

import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
  RefFieldWhereProps,
  RefFieldWhere,
} from "./core/fields/core/ref";

import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/fields/core/sequential/SequentialField";

import {
  KeyField,
  KeyFieldProps,
  KeyAllowDataTypes,
} from "./core/fields/core/key/KeyField";

import {
  SequenceField,
  SequenceFieldProps,
} from "./core/fields/core/sequence/SequenceField";

import { DatasetStore } from "./core/dataset-store";
import { EnumField } from "./core/fields/core/enum/EnumField";
import { Chaca } from "./Chaca";
import { ChacaUtils } from "./core/utils";

import {
  ProbabilityField,
  Chance,
  ProbabilityOption,
  ChanceFunction,
  ChanceFunctionProps,
} from "./core/fields/core/probability";

import { PickField, PickFieldProps } from "./core/fields/core/pick/PickField";
import { ChacaModules, Module } from "./modules";
import { Dataset } from "./core/dataset";

export const chaca = new Chaca();
export const modules = new ChacaModules();

export {
  TryRefANoKeyFieldError,
  EmptySequentialValuesError,
  CyclicAccessDataError,
  ChacaError,
  NotEnoughValuesForRefError,
  NotExistFieldError,
  EmptyEnumValuesError,
  PickFieldDefinitionError,
};

export {
  KeyField,
  RefField,
  Module,
  EnumField,
  SequenceField,
  SequentialField,
  ProbabilityField,
  PickField,
};

export { ChacaSchema, DatasetStore, Chaca, ChacaUtils, ChacaModules };

export type {
  CustomField,
  SchemaInput,
  ExportFormat,
  FileConfig,
  DatasetSchema,
  FieldToRef,
  RefFieldWhere,
  KeyAllowDataTypes,
  GetStoreValueInput,
  ExportSQLFormat,
  SequenceFieldProps,
  KeyFieldProps,
  FieldRefInputConfig,
  FieldObjectInput,
  InputIsArrayConfig,
  InputPossibleNull,
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
