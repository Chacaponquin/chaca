import {
  SchemaInput,
  FieldObjectInput,
  CustomField,
} from "./core/interfaces/schema.interface.js";
import {
  ExportFormat,
  FileConfig,
  ExportSQLFormat,
} from "./core/interfaces/export.interface.js";

import { Schemas } from "./schemas/index.js";
import { SchemaField } from "./schemas/SchemaField.js";

import { ChacaSchema } from "./core/classes/ChacaSchema/ChacaSchema.js";

import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
  CyclicAccessDataError,
} from "./errors/ChacaError.js";

import {
  GetStoreValueConfig,
  GetStoreValueInput,
} from "./core/classes/SchemasStore/interfaces/store.interface.js";

import {
  MultiGenerateSchema,
  GenerateConfig,
} from "./core/helpers/MultiGenerate/MultiGenerate.js";

import {
  FieldRefInputConfig,
  FieldToRef,
  FieldToRefObject,
  RefField,
  RefFieldWhere,
} from "./core/classes/RefField/RefField.js";

import { SequentialField } from "./core/classes/SequentialField/SequentialField.js";
import {
  KeyField,
  KeyFieldProps,
  KeyAllowDataTypes,
} from "./core/classes/KeyField/KeyField.js";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/classes/SequenceField/SequenceField.js";
import { DatasetStore } from "./core/classes/DatasetStore/DatasetStore.js";
import { EnumField } from "./core/classes/EnumField/EnumField.js";
import { Chaca } from "./Chaca.js";
import { ChacaUtils } from "./core/helpers/ChacaUtils.js";

export const chaca = new Chaca();
export const schemas = Schemas;

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

export { ChacaSchema, DatasetStore, Chaca, ChacaUtils };

export type {
  CustomField,
  SchemaInput,
  ExportFormat,
  FileConfig,
  MultiGenerateSchema,
  FieldToRef,
  FieldToRefObject,
  RefFieldWhere,
  GetStoreValueConfig,
  KeyAllowDataTypes,
  GetStoreValueInput,
  ExportSQLFormat,
  SequenceFieldProps,
  KeyFieldProps,
  FieldRefInputConfig,
  FieldObjectInput,
  GenerateConfig,
};
