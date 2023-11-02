import {
  SchemaInput,
  FieldObjectInput,
  CustomField,
  InputIsArrayConfig,
  InputPossibleNull,
  CustomFieldProps,
  FieldTypes,
  FieldSchemaConfig,
} from "./core/ChacaSchema/interfaces/schema";
import {
  ExportFormat,
  FileConfig,
  ExportSQLFormat,
} from "./core/Export/interfaces/export";

import { Schemas } from "./schemas";
import { SchemaField } from "./schemas/SchemaField";

import { ChacaSchema } from "./core/ChacaSchema/ChacaSchema";

import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
  CyclicAccessDataError,
  NotExistFieldError,
  EmptyEnumValuesError,
} from "./errors";

import { GetStoreValueInput } from "./core/SchemasStore/interfaces/store";

import {
  MultiGenerateSchema,
  GenerateConfig,
} from "./core/MultiGenerate/interfaces/multi-generate";

import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
  RefFieldWhereProps,
  RefFieldWhere,
} from "./core/Fields/core/RefField/RefField";

import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/Fields/core/SequentialField/SequentialField";
import {
  KeyField,
  KeyFieldProps,
  KeyAllowDataTypes,
} from "./core/Fields/core/KeyField/KeyField";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/Fields/core/SequenceField/SequenceField";
import { DatasetStore } from "./core/DatasetStore/DatasetStore";
import { EnumField } from "./core/Fields/core/EnumField/EnumField";
import { Chaca } from "./Chaca";
import { ChacaUtils } from "./core/ChacaUtils/ChacaUtils";

export const chaca = new Chaca();
export const schemas = new Schemas();

export {
  TryRefANoKeyFieldError,
  EmptySequentialValuesError,
  CyclicAccessDataError,
  ChacaError,
  NotEnoughValuesForRefError,
  NotExistFieldError,
  EmptyEnumValuesError,
};

export {
  KeyField,
  RefField,
  SchemaField,
  EnumField,
  SequenceField,
  SequentialField,
};

export { ChacaSchema, DatasetStore, Chaca, ChacaUtils, Schemas };

export type {
  CustomField,
  SchemaInput,
  ExportFormat,
  FileConfig,
  MultiGenerateSchema,
  FieldToRef,
  RefFieldWhere,
  KeyAllowDataTypes,
  GetStoreValueInput,
  ExportSQLFormat,
  SequenceFieldProps,
  KeyFieldProps,
  FieldRefInputConfig,
  FieldObjectInput,
  GenerateConfig,
  InputIsArrayConfig,
  InputPossibleNull,
  CustomFieldProps,
  SequentialFieldConfig,
  RefFieldWhereProps,
  FieldTypes,
  FieldSchemaConfig,
};
