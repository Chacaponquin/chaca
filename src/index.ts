import {
  SchemaInput,
  FieldObjectInput,
  CustomField,
  InputIsArrayConfig,
  InputPossibleNull,
  CustomFieldProps,
  FieldTypes,
  FieldSchemaConfig,
} from "./core/ChacaSchema/interfaces/schema.interface.js";
import {
  ExportFormat,
  FileConfig,
  ExportSQLFormat,
} from "./core/Export/interfaces/export.interface.js";

import { Schemas } from "./schemas/index.js";
import { SchemaField } from "./schemas/SchemaField.js";

import { ChacaSchema } from "./core/ChacaSchema/ChacaSchema.js";

import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
  CyclicAccessDataError,
} from "./errors/ChacaError.js";

import { GetStoreValueInput } from "./core/SchemasStore/interfaces/store.interface.js";

import {
  MultiGenerateSchema,
  GenerateConfig,
} from "./core/MultiGenerate/interfaces/multiGenerate.interface.js";

import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
  RefFieldWhereProps,
  RefFieldWhere,
} from "./core/Fields/core/RefField/RefField.js";

import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/Fields/core/SequentialField/SequentialField.js";
import {
  KeyField,
  KeyFieldProps,
  KeyAllowDataTypes,
} from "./core/Fields/core/KeyField/KeyField.js";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/Fields/core/SequenceField/SequenceField.js";
import { DatasetStore } from "./core/DatasetStore/DatasetStore.js";
import { EnumField } from "./core/Fields/core/EnumField/EnumField.js";
import { Chaca } from "./Chaca.js";
import { ChacaUtils } from "./core/ChacaUtils/ChacaUtils.js";

export const chaca = new Chaca();
export const schemas = new Schemas();

export {
  TryRefANoKeyFieldError,
  EmptySequentialValuesError,
  CyclicAccessDataError,
  ChacaError,
  NotEnoughValuesForRefError,
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
