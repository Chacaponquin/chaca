import { json2csv } from 'json-2-csv';
import yaml from 'js-yaml';
import { Case } from 'change-case-all';
import { ulid } from 'ulid';
import { createId } from '@paralleldrive/cuid2';
import { v4 } from 'uuid';
import { nanoid } from 'nanoid';
import { loremIpsum } from 'lorem-ipsum';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/core/fields/core/key/key-field.ts
var KeyField = class {
  constructor(type) {
    __publicField(this, "field");
    this.field = type;
  }
};

// src/errors/index.ts
var errors_exports = {};
__export(errors_exports, {
  ChacaError: () => ChacaError,
  CyclicAccessDataError: () => CyclicAccessDataError,
  EmptyEnumValuesError: () => EmptyEnumValuesError,
  EmptySequentialValuesError: () => EmptySequentialValuesError,
  NotEnoughValuesForRefError: () => NotEnoughValuesForRefError,
  NotExistRefFieldError: () => NotExistRefFieldError,
  PickFieldDefinitionError: () => PickFieldDefinitionError,
  TryRefANoKeyFieldError: () => TryRefANoKeyFieldError,
  WrongArrayDefinitionError: () => WrongArrayDefinitionError,
  WrongPossibleNullDefinitionError: () => WrongPossibleNullDefinitionError,
  WrongProbabilityFieldDefinitionError: () => WrongProbabilityFieldDefinitionError
});
var ChacaError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ChacaError";
  }
};
var WrongArrayDefinitionError = class extends ChacaError {
  constructor(fieldRoute, message) {
    super(`On '${fieldRoute}'. ${message}`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.WrongArrayDefinitionError";
  }
};
var WrongPossibleNullDefinitionError = class extends ChacaError {
  constructor(fieldRoute, message) {
    super(`On '${fieldRoute}'. ${message}`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = `ChacaError.WrongPossibleNullDefinitionError`;
  }
};
var EmptySequentialValuesError = class extends ChacaError {
  constructor(fieldRoute) {
    super(`There are no more sequential values for the field '${fieldRoute}'`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.EmptySequentialValuesError";
  }
};
var WrongProbabilityFieldDefinitionError = class extends ChacaError {
  constructor(fieldRoute, message) {
    super(`On '${fieldRoute}'. ${message}`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.WrongProbabilityFieldDefinitionError";
  }
};
var PickFieldDefinitionError = class extends ChacaError {
  constructor(fieldRoute, message) {
    super(`On field '${fieldRoute}'. ${message}`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.PickFieldDefinitionError";
  }
};
var TryRefANoKeyFieldError = class extends ChacaError {
  constructor(fieldRoute) {
    super(
      `The field '${fieldRoute}' is not a key field, so you can't reference this one`
    );
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.TryRefANoKeyFieldError";
  }
};
var NotEnoughValuesForRefError = class extends ChacaError {
  constructor(refFieldRoute, keyFieldRoute) {
    super(
      `Not enough values of '${keyFieldRoute}' for the ref field '${refFieldRoute}'`
    );
    __publicField(this, "refFieldRoute", refFieldRoute);
    __publicField(this, "keyFieldRoute", keyFieldRoute);
    this.name = "ChacaError.NotEnoughValuesForRefError";
  }
};
var CyclicAccessDataError = class extends ChacaError {
  constructor(message) {
    super(message);
    this.name = "ChacaError.CyclicAccessDataError";
  }
};
var NotExistRefFieldError = class extends ChacaError {
  constructor(fieldRoute, refFieldRoute) {
    super(`From '${fieldRoute}', The field '${refFieldRoute}' does not exists`);
    __publicField(this, "fieldRoute", fieldRoute);
    __publicField(this, "refFieldRoute", refFieldRoute);
    this.name = "ChacaError.NotExistRefFieldError";
  }
};
var EmptyEnumValuesError = class extends ChacaError {
  constructor(fieldRoute) {
    super(`There are no values for the enum field '${fieldRoute}'`);
    __publicField(this, "fieldRoute", fieldRoute);
    this.name = "ChacaError.EmptyEnumValuesError";
  }
};

// src/core/resolvers/interfaces/resolvers.ts
var IResolver = class {
};

// src/core/resolvers/core/custom/custom-resolver.ts
var CustomFieldResolver = class extends IResolver {
  constructor(fun) {
    super();
    __publicField(this, "fun", fun);
  }
};

// src/core/resolvers/core/enum/enum-resolver.ts
var EnumFieldResolver = class extends IResolver {
  constructor(array) {
    super();
    __publicField(this, "array", array);
  }
};

// src/core/resolvers/core/mixed/mixed-resolver.ts
var MixedFieldResolver = class extends IResolver {
  constructor(schema) {
    super();
    __publicField(this, "schema", schema);
  }
};

// src/core/resolvers/core/ref/ref-field-resolver.ts
var RefFieldResolver = class extends IResolver {
  constructor(refField) {
    super();
    __publicField(this, "refField", refField);
  }
};

// src/core/resolvers/core/sequential/sequential-resolver.ts
var SequentialFieldResolver = class extends IResolver {
  constructor(valuesArray, config) {
    super();
    __publicField(this, "valuesArray", valuesArray);
    __publicField(this, "config", config);
  }
};

// src/core/resolvers/core/key/key-resolver.ts
var KeyFieldResolver = class extends IResolver {
  constructor(type) {
    super();
    __publicField(this, "type", type);
  }
};

// src/core/resolvers/core/sequence/sequence-resolver.ts
var SequenceFieldResolver = class extends IResolver {
  constructor(config) {
    super();
    __publicField(this, "config", config);
  }
  getConfig() {
    return this.config;
  }
};

// src/core/resolvers/core/probability/probability-resolver.ts
var ProbabilityFieldResolver = class extends IResolver {
  constructor(values) {
    super();
    __publicField(this, "values", values);
  }
};

// src/core/resolvers/core/pick/pick-resolver.ts
var PickFieldResolver = class extends IResolver {
  constructor(values) {
    super();
    __publicField(this, "values", values);
  }
};

// src/core/input-tree/core/node/input-tree-node.ts
var InputTreeNode = class {
  constructor(route, isArray, possibleNull) {
    __publicField(this, "route", route);
    __publicField(this, "isArray", isArray);
    __publicField(this, "possibleNull", possibleNull);
  }
  getRouteString() {
    return this.route.string();
  }
  getName() {
    return this.route.name();
  }
  getFieldRoute() {
    return this.route;
  }
  getIsArray() {
    return this.isArray;
  }
  getPossibleNull() {
    return this.possibleNull;
  }
  isPossibleNull() {
    return this.getPossibleNull().can();
  }
  async isNull({
    currentDocument,
    store,
    index
  }) {
    const value = this.getPossibleNull();
    const result = await value.is({
      index,
      currentDocument,
      store
    });
    return result;
  }
};

// src/core/input-tree/core/is-array/is-array.ts
var IsArray = class {
};
var LimitsArray = class extends IsArray {
  constructor(datatypeModule, { limits, route }) {
    super();
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "route");
    this.route = route;
    const min = limits.min === void 0 ? 0 : limits.min;
    const max = limits.max === void 0 ? min + 10 : limits.max;
    if (min < 0) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.min cannot be less than 0`
      );
    }
    if (max < 0) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.max cannot be less than 0`
      );
    }
    if (min > max) {
      throw new WrongArrayDefinitionError(
        this.route,
        `The parameter isArray.min cannot be greater than isArray.max`
      );
    }
    this.min = min;
    this.max = max;
  }
  execute() {
    const limit = this.datatypeModule.int({ min: this.min, max: this.max });
    return new Promise((resolve) => resolve(limit));
  }
};
var FunctionArray = class extends IsArray {
  constructor(datatypeModule, { func, route }) {
    super();
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "func");
    __publicField(this, "route");
    this.route = route;
    this.func = func;
  }
  async execute({
    currentDocument,
    store
  }) {
    const result = await this.func({
      currentFields: currentDocument.getDocumentObject(),
      store
    });
    let type;
    if (typeof result === "number") {
      type = new IntegerArray({ value: result, route: this.route });
    } else if (typeof result === "undefined") {
      type = new NotArray();
    } else if (typeof result === "object" && result !== null) {
      type = new LimitsArray(this.datatypeModule, {
        limits: result,
        route: this.route
      });
    } else {
      throw new WrongArrayDefinitionError(
        this.route,
        `The isArray function must return an object with the array limits or an integer number.`
      );
    }
    return type.execute({
      currentDocument,
      store
    });
  }
};
var IntegerArray = class extends IsArray {
  constructor({ value, route }) {
    super();
    __publicField(this, "limit");
    if (value < 0) {
      throw new WrongArrayDefinitionError(
        route,
        `The parameter isArray cannot be less than 0`
      );
    }
    this.limit = value;
  }
  execute() {
    return new Promise((resolve) => resolve(this.limit));
  }
};
var NotArray = class extends IsArray {
  constructor() {
    super();
  }
  execute() {
    return new Promise((resolve) => resolve(void 0));
  }
};

// src/core/result-tree/classes/node/field-node.ts
var FieldNode = class {
  constructor(name) {
    __publicField(this, "name", name);
  }
  getRefValueByRoute(props) {
    const value = this.getRefValueByNodeRoute(props);
    return value;
  }
};

// src/core/result-tree/classes/single-result/index.ts
var SingleResultNode = class extends FieldNode {
  constructor({ name, value }) {
    super(name);
    __publicField(this, "_value");
    __publicField(this, "_taken", []);
    this._value = value;
  }
  value() {
    return this._value;
  }
  changeIsTaken(fieldRoute) {
    this._taken.push(fieldRoute.string());
  }
  isTaken(fieldRoute) {
    return this._taken.includes(fieldRoute.string());
  }
  getNodeByRoute(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`
      );
    }
  }
  getRefValueByNodeRoute({
    caller,
    search,
    baseSearch
  }) {
    if (search.empty()) {
      return this;
    } else {
      throw new NotExistRefFieldError(caller.string(), baseSearch.string());
    }
  }
};

// src/core/input-tree/core/custom/custom-value-node.ts
var CustomValueNode = class _CustomValueNode extends InputTreeNode {
  constructor(route, isArray, possibleNull, func) {
    super(route, isArray, possibleNull);
    __publicField(this, "func", func);
  }
  getNoArrayNode() {
    return new _CustomValueNode(
      this.route,
      new NotArray(),
      this.possibleNull,
      this.func
    );
  }
  async value({ fields, datasetStore }) {
    const value = await this.func({
      store: datasetStore,
      currentFields: fields
    });
    return value;
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  async generate({
    currentDocument,
    store
  }) {
    return new SingleResultNode({
      name: this.getName(),
      value: await this.value({
        datasetStore: store,
        fields: currentDocument.getDocumentObject()
      })
    });
  }
};

// src/core/input-tree/core/enum/enum-value-node.ts
var EnumValueNode = class _EnumValueNode extends InputTreeNode {
  constructor(utils2, route, isArray, possibleNull, options) {
    super(route, isArray, possibleNull);
    __publicField(this, "utils", utils2);
    __publicField(this, "options", options);
    if (Array.isArray(options)) {
      if (options.length === 0) {
        throw new EmptyEnumValuesError(this.getRouteString());
      }
    } else {
      throw new EmptyEnumValuesError(this.getRouteString());
    }
  }
  value() {
    return this.utils.oneOfArray(this.options);
  }
  getNoArrayNode() {
    return new _EnumValueNode(
      this.utils,
      this.route,
      new NotArray(),
      this.possibleNull,
      this.options
    );
  }
  generate() {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value()
    });
    return new Promise((resolve) => resolve(result));
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
};

// src/core/input-tree/core/possible-null/possible-null.ts
var PossibleNull = class {
};
var BooleanNull = class extends PossibleNull {
  constructor({ value }) {
    super();
    __publicField(this, "value");
    this.value = value;
  }
  is() {
    return new Promise((resolve) => resolve(this.value));
  }
  can() {
    return this.value;
  }
};
var FunctionNull = class extends PossibleNull {
  constructor({ func, route }) {
    super();
    __publicField(this, "route");
    __publicField(this, "func");
    this.func = func;
    this.route = route;
  }
  can() {
    return true;
  }
  async is({ currentDocument, store, index }) {
    const result = await this.func({
      currentFields: currentDocument.getDocumentObject(),
      store
    });
    let type;
    if (typeof result === "number") {
      type = new ProbabilityNull({ value: result, route: this.route });
    } else if (typeof result === "boolean") {
      type = new BooleanNull({ route: this.route, value: result });
    } else if (typeof result === "undefined") {
      type = new NotNull();
    } else {
      throw new WrongPossibleNullDefinitionError(
        this.route,
        `The parameter function possibleNull must return a boolean or a probability value between 0 and 1`
      );
    }
    return type.is({
      currentDocument,
      index,
      store
    });
  }
};
var NotNull = class extends PossibleNull {
  constructor() {
    super();
  }
  is() {
    return new Promise((resolve) => resolve(false));
  }
  can() {
    return false;
  }
};
var ProbabilityNull = class extends PossibleNull {
  constructor({ value, route }) {
    super();
    __publicField(this, "value");
    this.value = value;
    if (!(value >= 0 && value <= 1)) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter in case of being a float number must be in the range of 0 to 1`
      );
    }
  }
  is() {
    return new Promise((resolve) => resolve(Math.random() <= this.value));
  }
  can() {
    return this.value > 0;
  }
};
var AbsoluteNullCount = class extends PossibleNull {
  constructor(utils2, { total: itotal, value, route }) {
    super();
    __publicField(this, "indexes");
    __publicField(this, "value");
    if (value < 0) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter the numeric value must be greater or equal than 0`
      );
    }
    this.value = value;
    itotal.register((total) => {
      const all = [];
      for (let i = 0; i < total; i++) {
        all.push(i);
      }
      if (value > all.length) {
        throw new WrongPossibleNullDefinitionError(
          route,
          `The number of elements to select must be less or equal than the array length`
        );
      }
      this.indexes = utils2.pick({ values: all, count: value });
    });
  }
  is({ index }) {
    return new Promise((resolve) => resolve(this.indexes.includes(index)));
  }
  can() {
    return this.value > 0;
  }
};

// src/core/input-tree/core/key/key-value-node.ts
var KeyValueNode = class _KeyValueNode extends InputTreeNode {
  constructor(route, fieldNode) {
    super(route, new NotArray(), new NotNull());
    __publicField(this, "fieldNode", fieldNode);
  }
  getNoArrayNode() {
    return new _KeyValueNode(this.route, this.fieldNode);
  }
  checkIfFieldExists(fieldTreeRoute) {
    return fieldTreeRoute.length === 0;
  }
  async generate(props) {
    const node = await this.fieldNode.generate(props);
    const value = node.value();
    if (value === null || value === void 0) {
      throw new ChacaError(
        `The key value ${this.getRouteString()} can not be null or undefined`
      );
    }
    return node;
  }
};

// src/core/result-tree/classes/mixed/index.ts
var MixedFieldNode = class extends FieldNode {
  constructor() {
    super(...arguments);
    __publicField(this, "nodes", []);
  }
  insertNode(node) {
    this.nodes.push(node);
  }
  value() {
    let resultObject = {};
    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.name]: n.value() };
    });
    return resultObject;
  }
  getNodeByRoute(fieldTreeRoute) {
    let returnNode = void 0;
    for (let i = 0; i < this.nodes.length && returnNode === void 0; i++) {
      if (this.nodes[i].name === fieldTreeRoute[0]) {
        returnNode = this.nodes[i].getNodeByRoute(fieldTreeRoute.slice(1));
      }
    }
    if (returnNode) {
      return returnNode;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`
      );
    }
  }
  getRefValueByNodeRoute({
    search,
    caller,
    baseSearch
  }) {
    let returnNode = void 0;
    for (let i = 0; i < this.nodes.length && returnNode === void 0; i++) {
      if (this.nodes[i].name === search.array()[0]) {
        returnNode = this.nodes[i].getRefValueByRoute({
          search: search.pop(),
          caller,
          baseSearch
        });
      }
    }
    if (returnNode) {
      return returnNode;
    } else {
      throw new NotExistRefFieldError(caller.string(), baseSearch.string());
    }
  }
};

// src/core/input-tree/core/mixed/mixed-value-node.ts
var MixedValueNode = class _MixedValueNode extends InputTreeNode {
  constructor(route, isArray, possibleNull) {
    super(route, isArray, possibleNull);
    __publicField(this, "nodes", []);
  }
  getFields() {
    return this.nodes;
  }
  getNoArrayNode() {
    const node = new _MixedValueNode(
      this.route,
      new NotArray(),
      this.possibleNull
    );
    node.nodes = this.nodes;
    return node;
  }
  getPossibleNullNodes() {
    const nodes = [];
    this.nodes.forEach((n) => {
      if (n.isPossibleNull()) {
        nodes.push(n);
      }
      if (n instanceof _MixedValueNode) {
        const subNodes = n.getPossibleNullNodes();
        subNodes.forEach((s) => nodes.push(s));
      }
    });
    return nodes;
  }
  getKeyFields() {
    const keys = [];
    this.nodes.forEach((n) => {
      if (n instanceof _MixedValueNode) {
        const subKeys = n.getKeyFields();
        subKeys.forEach((k) => keys.push(k));
      } else if (n instanceof KeyValueNode) {
        keys.push(n);
      }
    });
    return keys;
  }
  insertNode(node) {
    this.nodes.push(node);
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      let found = false;
      for (let i = 0; i < this.nodes.length && !found; i++) {
        if (this.nodes[i].getName() === fieldTreeRoute[0]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(1);
          found = this.nodes[i].checkIfFieldExists(routeWithoutFirstElement);
        }
      }
      return found;
    }
  }
  generate() {
    const result = new MixedFieldNode(this.getName());
    return new Promise((resolve) => resolve(result));
  }
};

// src/core/dataset-store/value-object/get-config.ts
var GetConfig = class {
  constructor({ omitCurrentDocument, omitResolver, config }) {
    __publicField(this, "_value");
    const returnConfig = {
      omitDocument: omitCurrentDocument,
      omitResolver
    };
    if (config && typeof config === "object" && config !== null) {
      if (typeof config.where === "function") {
        const whereFunction = config.where;
        returnConfig.where = whereFunction;
      }
    }
    this._value = returnConfig;
  }
  value() {
    return this._value;
  }
};

// src/core/dataset-store/dataset-store.ts
var DatasetStore = class {
  constructor({
    omitCurrentDocument,
    omitResolver,
    schemasStore,
    caller
  }) {
    __publicField(this, "schemasStore");
    __publicField(this, "omitCurrentDocument");
    __publicField(this, "omitResolver");
    __publicField(this, "caller");
    this.omitResolver = omitResolver;
    this.omitCurrentDocument = omitCurrentDocument;
    this.schemasStore = schemasStore;
    this.caller = caller;
  }
  /**
   * Allows you to access values from a schema from anywhere in the dataset
   *
   * @param route Value route to access
   * @param config.where Function to filter schema documents
   *
   * @example
   * store.get("User") // user schema documents
   * store.get("User.id") // user ids
   * store.get("User.id", {
   *   where: (fields) => {
   *      return fields.age > 40
   *   }
   * })
   */
  async get(route, iconfig) {
    const config = new GetConfig({
      omitCurrentDocument: this.omitCurrentDocument,
      omitResolver: this.omitResolver,
      config: iconfig
    });
    const foundNodes = await this.schemasStore.value({
      route,
      config: config.value(),
      caller: this.caller
    });
    const values = [];
    for (const node of foundNodes) {
      if (node instanceof FieldNode) {
        values.push(node.value());
      } else {
        values.push(node.getDocumentObject());
      }
    }
    return values;
  }
  /**
   * Returns the documents of the schema that uses this method
   */
  currentDocuments() {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
};

// src/core/input-tree/core/node/value-object/route.ts
var NodeRoute = class _NodeRoute {
  constructor(route) {
    __publicField(this, "_route");
    this._route = route;
  }
  array() {
    return this._route;
  }
  create(name) {
    return new _NodeRoute([...this._route, name]);
  }
  empty() {
    return this._route.length === 0;
  }
  name() {
    return this._route.at(-1);
  }
  pop() {
    return new _NodeRoute(this._route.slice(1));
  }
  string() {
    return this._route.join(".");
  }
};

// src/core/input-tree/core/ref/value-object/route.ts
var RefRoute = class {
  constructor({ ref, route }) {
    __publicField(this, "_value");
    const saveRoute = ref.split(".");
    if (saveRoute.length === 0) {
      throw new ChacaError(
        `In '${route.string()}'. You can't ref an empty field"`
      );
    } else {
      this._value = saveRoute;
    }
  }
  value() {
    return new NodeRoute(this._value);
  }
};

// src/core/input-tree/core/ref/ref-value-node.ts
var RefValueNode = class _RefValueNode extends InputTreeNode {
  constructor(utils2, route, isArray, possibleNull, refField, schemasStore) {
    super(route, isArray, possibleNull);
    __publicField(this, "utils", utils2);
    __publicField(this, "refField", refField);
    __publicField(this, "schemasStore", schemasStore);
    __publicField(this, "refFieldTreeRoute");
    __publicField(this, "schemaRefIndex", null);
    __publicField(this, "allRefNodes", null);
    this.refFieldTreeRoute = new RefRoute({
      ref: this.refField.refField,
      route
    });
  }
  nullWhenEmpty() {
    return this.refField.nullOnEmpty;
  }
  isUnique() {
    return this.refField.unique;
  }
  getRefFieldRoute() {
    return this.refFieldTreeRoute.value();
  }
  searchSchemaRef() {
    let exists = -1;
    const schemas = this.schemasStore.getSchemasResolvers();
    for (let i = 0; i < schemas.length && exists === -1; i++) {
      const inputTree = schemas[i].getInputTree();
      if (inputTree) {
        const found = inputTree.checkIfFieldExists(
          this.refFieldTreeRoute.value().array()
        );
        if (found) {
          exists = i;
        }
      }
    }
    if (exists === -1) {
      throw new NotExistRefFieldError(
        this.getRouteString(),
        this.refField.refField
      );
    } else {
      this.schemaRefIndex = exists;
    }
  }
  getSchemaRef() {
    if (this.schemaRefIndex === null) {
      return null;
    } else {
      return this.schemasStore.get(this.schemaRefIndex);
    }
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  async filterRefNodesByConfig(schemaRef, currentDocument, currentSchemaResolverIndex, refItSelf) {
    const allRefValues = this.allRefNodes ? this.allRefNodes : schemaRef.getAllRefValuesByNodeRoute({
      search: this.refFieldTreeRoute.value(),
      caller: this.route
    });
    if (!this.allRefNodes && !refItSelf) {
      this.allRefNodes = allRefValues;
    }
    const currentSchemaResolver = this.schemasStore.get(
      currentSchemaResolverIndex
    );
    const returnRefValues = [];
    for (const refNode of allRefValues) {
      if (currentDocument !== refNode.document) {
        if (this.refField.where) {
          const isAccepted = await this.refField.where({
            store: new DatasetStore({
              schemasStore: this.schemasStore,
              omitCurrentDocument: refNode.document,
              omitResolver: currentSchemaResolver,
              caller: this.getFieldRoute()
            }),
            refFields: refNode.document.getDocumentObject(),
            currentFields: currentDocument.getDocumentObject()
          });
          if (isAccepted) {
            returnRefValues.push(refNode.resultNode);
          }
        } else {
          returnRefValues.push(refNode.resultNode);
        }
      }
    }
    return returnRefValues;
  }
  async value(currentDocument, icurrentSchemaResolver) {
    const schemaRef = this.getSchemaRef();
    const currentResolver = this.schemasStore.get(icurrentSchemaResolver);
    if (schemaRef) {
      const refItSelf = icurrentSchemaResolver === schemaRef.index;
      if (!schemaRef.dangerCyclic() || refItSelf) {
        if (!refItSelf) {
          await schemaRef.buildTrees(currentResolver.route);
        }
        const allValues = await this.filterRefNodesByConfig(
          schemaRef,
          currentDocument,
          icurrentSchemaResolver,
          refItSelf
        );
        if (this.isUnique()) {
          const noTakenValues = allValues.filter(
            (n) => !n.isTaken(this.getFieldRoute())
          );
          if (noTakenValues.length === 0 && !refItSelf && !this.nullWhenEmpty()) {
            throw new NotEnoughValuesForRefError(
              this.getRouteString(),
              this.getRefFieldRoute().string()
            );
          }
          const node = this.utils.oneOfArray(noTakenValues);
          if (node) {
            node.changeIsTaken(this.getFieldRoute());
          }
          if (refItSelf || this.nullWhenEmpty()) {
            return node ? node.value() : null;
          }
          return node.value();
        } else {
          if (allValues.length === 0 && !refItSelf && !this.nullWhenEmpty()) {
            throw new NotEnoughValuesForRefError(
              this.getRouteString(),
              this.getRefFieldRoute().string()
            );
          }
          const node = this.utils.oneOfArray(allValues);
          if (refItSelf || this.nullWhenEmpty()) {
            return node ? node.value() : null;
          }
          return node.value();
        }
      } else {
        throw new CyclicAccessDataError(
          `The field ${this.getRouteString()} is trying to access ${this.getRefFieldRoute().string()}, and it uses that field to create itself`
        );
      }
    } else {
      throw new ChacaError(
        `First find the schema resolver for the ref field '${this.getRouteString()}'`
      );
    }
  }
  async generate({
    schemaIndex,
    currentDocument
  }) {
    const refValue = await this.value(currentDocument, schemaIndex);
    const result = new SingleResultNode({
      name: this.getName(),
      value: refValue
    });
    return result;
  }
  setSchemaRef(resolverIndex) {
    this.schemaRefIndex = resolverIndex;
  }
  getNoArrayNode() {
    const newRefNode = new _RefValueNode(
      this.utils,
      this.route,
      new NotArray(),
      this.possibleNull,
      this.refField,
      this.schemasStore
    );
    if (this.schemaRefIndex !== null) {
      newRefNode.setSchemaRef(this.schemaRefIndex);
    }
    return newRefNode;
  }
};

// src/core/input-tree/core/sequential/sequential-value-node.ts
var SequentialValueNode = class _SequentialValueNode extends InputTreeNode {
  constructor(route, possibleNull, array, config) {
    super(route, new NotArray(), possibleNull);
    __publicField(this, "index", 0);
    __publicField(this, "valuesArray");
    __publicField(this, "config");
    this.valuesArray = array;
    this.config = config;
    if (Array.isArray(this.valuesArray)) {
      if (this.valuesArray.length === 0) {
        throw new EmptySequentialValuesError(this.getRouteString());
      }
    } else {
      throw new EmptySequentialValuesError(this.getRouteString());
    }
  }
  getNoArrayNode() {
    return new _SequentialValueNode(
      this.route,
      this.possibleNull,
      this.valuesArray,
      this.config
    );
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  value() {
    if (this.config.loop) {
      if (this.index === this.valuesArray.length) {
        this.index = 0;
      }
      const returnValue = this.valuesArray[this.index];
      this.index++;
      return returnValue;
    } else {
      if (this.index >= this.valuesArray.length) {
        throw new EmptySequentialValuesError(this.getRouteString());
      } else {
        const returnValue = this.valuesArray[this.index];
        this.index++;
        return returnValue;
      }
    }
  }
  generate() {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value()
    });
    return new Promise((resolve) => resolve(result));
  }
};

// src/core/input-tree/core/sequence/sequence-value-node.ts
var SequenceValueNode = class _SequenceValueNode extends InputTreeNode {
  constructor(route, possibleNull, startsWith, step) {
    super(route, new NotArray(), possibleNull);
    __publicField(this, "actualValue");
    __publicField(this, "startsWith");
    __publicField(this, "step");
    this.startsWith = startsWith;
    this.step = step;
    this.actualValue = startsWith.value();
  }
  value() {
    const returnValue = this.actualValue;
    this.actualValue += this.step.value();
    return returnValue;
  }
  generate() {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value()
    });
    return new Promise((resolve) => resolve(result));
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  getNoArrayNode() {
    return new _SequenceValueNode(
      this.route,
      this.possibleNull,
      this.startsWith,
      this.step
    );
  }
};

// src/core/input-tree/core/probability/probability-value-node.ts
var ProbabilityValueNode = class _ProbabilityValueNode extends InputTreeNode {
  constructor(route, isArray, possibleNull, options) {
    super(route, isArray, possibleNull);
    __publicField(this, "options");
    this.options = options;
  }
  getNoArrayNode() {
    return new _ProbabilityValueNode(
      this.route,
      new NotArray(),
      this.possibleNull,
      this.options
    );
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  value(props) {
    return this.options.value(props);
  }
  async generate(props) {
    const result = new SingleResultNode({
      name: this.getName(),
      value: await this.value(props)
    });
    return result;
  }
};

// src/core/input-tree/core/pick/pick-value-node.ts
var PickValueNode = class _PickValueNode extends InputTreeNode {
  constructor(datatypeModule, route, isArray, possibleNull, count, values) {
    super(route, isArray, possibleNull);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "count", count);
    __publicField(this, "values", values);
  }
  getNoArrayNode() {
    return new _PickValueNode(
      this.datatypeModule,
      this.route,
      new NotArray(),
      this.possibleNull,
      this.count,
      this.values
    );
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
  async getValues({
    currentDocument,
    store
  }) {
    const result = [];
    const banned = [];
    const limit = await this.count.limit({
      store,
      currentDocument
    });
    if (limit === this.values.length()) {
      return this.values.values();
    } else {
      let i = 0;
      while (i < limit) {
        const index = this.generateIndex(banned);
        banned.push(index);
        result.push(this.values.get(index));
        i++;
      }
      return result;
    }
  }
  generateIndex(banned) {
    let num = this.datatypeModule.int({
      min: 0,
      max: this.values.length()
    });
    while (banned.includes(num)) {
      num = this.datatypeModule.int({ min: 0, max: this.values.length() });
    }
    return num;
  }
  async generate(props) {
    return new SingleResultNode({
      name: this.getName(),
      value: await this.getValues(props)
    });
  }
};

// src/core/input-tree/core/map/possible-null.ts
var PossibleNullMapper = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
  }
  execute({ value: ivalue, countDocs, route }) {
    if (!ivalue.isValid()) {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter can be an integer, a float, or a function that returns the probability that the field has a null value.`
      );
    }
    let result;
    const value = ivalue.value();
    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        result = new AbsoluteNullCount(this.utils, {
          total: countDocs,
          value,
          route
        });
      } else {
        result = new ProbabilityNull({ route, value });
      }
    } else if (typeof value === "boolean") {
      result = new BooleanNull({ value, route });
    } else if (typeof value === "function") {
      result = new FunctionNull({ route, func: value });
    } else if (typeof value === "undefined") {
      result = new NotNull();
    } else {
      throw new WrongPossibleNullDefinitionError(
        route,
        `The possibleNull parameter can be an integer, a float, or a function that returns the probability that the field has a null value.`
      );
    }
    return result;
  }
};

// src/core/input-tree/core/map/is-array.ts
var IsArrayMapper = class {
  constructor(datatypeModule) {
    __publicField(this, "datatypeModule", datatypeModule);
  }
  execute({ value, route }) {
    if (!value.isValid()) {
      throw new WrongArrayDefinitionError(
        route,
        `The isArray parameter must be an integer, a function or an object with the limits { min, max }`
      );
    }
    const result = value.value();
    let type;
    if (typeof result === "number") {
      type = new IntegerArray({ route, value: result });
    } else if (typeof result === "function") {
      type = new FunctionArray(this.datatypeModule, {
        func: result,
        route
      });
    } else if (typeof result === "object" && result !== null) {
      type = new LimitsArray(this.datatypeModule, {
        limits: result,
        route
      });
    } else if (typeof result === "undefined") {
      type = new NotArray();
    } else {
      throw new WrongArrayDefinitionError(
        route,
        `The parameter isArray must be an integer, a function or an object with the limits { min, max }`
      );
    }
    return type;
  }
};

// src/core/input-tree/core/pick/value-object/count.ts
var Count = class {
  static create(datatypeModule, { count, route, options }) {
    let type;
    if (typeof count === "number") {
      type = new IntegerCount({ value: count, route, options });
    } else if (typeof count === "function") {
      type = new FunctionCount(datatypeModule, {
        route,
        func: count,
        options
      });
    } else if (typeof count === "object" && count !== null) {
      type = new LimitCount(datatypeModule, {
        options,
        route,
        value: count
      });
    } else {
      throw new PickFieldDefinitionError(
        route,
        `The number of items to choose on a pick field must be a number, an object with the range of items to choose from, or a function that returns one of the above options.`
      );
    }
    return type;
  }
};
var IntegerCount = class extends Count {
  constructor({ route, value, options }) {
    super();
    __publicField(this, "value");
    if (value < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The number of items to select cannot be less than 0`
      );
    }
    if (value > options.length()) {
      throw new PickFieldDefinitionError(
        route,
        `A pick field should must have a number of options to choose greater than or equal to the 'count' property`
      );
    }
    this.value = value;
  }
  limit() {
    return new Promise((resolve) => resolve(this.value));
  }
};
var FunctionCount = class extends Count {
  constructor(datatypeModule, { func, route, options }) {
    super();
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "func");
    __publicField(this, "route");
    __publicField(this, "options");
    this.func = func;
    this.route = route;
    this.options = options;
  }
  async limit({ currentDocument, store }) {
    const result = await this.func({
      currentFields: currentDocument.getDocumentObject(),
      store
    });
    let type;
    if (typeof result === "number") {
      type = new IntegerCount({
        route: this.route,
        value: result,
        options: this.options
      });
    } else if (typeof result === "object" && result !== null) {
      type = new LimitCount(this.datatypeModule, {
        value: result,
        route: this.route,
        options: this.options
      });
    } else {
      throw new PickFieldDefinitionError(
        this.route,
        `The count function must return a range of values or a number indicating the number of values to choose.`
      );
    }
    const value = await type.limit({
      currentDocument,
      store
    });
    return value;
  }
};
var LimitCount = class extends Count {
  constructor(datatypeModule, { route, value, options }) {
    super();
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "min");
    __publicField(this, "max");
    const min = value.min === void 0 ? 0 : value.min;
    const max = value.max === void 0 ? options.length() : value.max;
    if (min < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.min cannot be less than 0`
      );
    }
    if (max < 0) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.max cannot be less than 0`
      );
    }
    if (min > max) {
      throw new PickFieldDefinitionError(
        route,
        `The parameter count.min cannot be greater than count.max`
      );
    }
    if (max > options.length()) {
      throw new PickFieldDefinitionError(
        route,
        `A pick field should must have a number of options to choose greater than or equal to the 'count' property`
      );
    }
    this.min = min;
    this.max = max;
  }
  limit() {
    const limit = this.datatypeModule.int({ min: this.min, max: this.max });
    return new Promise((resolve) => resolve(limit));
  }
};

// src/core/input-tree/core/pick/value-object/values.ts
var Values = class {
  constructor({ route, values }) {
    __publicField(this, "value");
    if (Array.isArray(values)) {
      this.value = values;
    } else {
      throw new PickFieldDefinitionError(
        route,
        `The values that can be chosen must be in an array`
      );
    }
  }
  length() {
    return this.value.length;
  }
  get(index) {
    return this.value[index];
  }
  values() {
    return this.value;
  }
};

// src/core/input-tree/core/probability/value-object/chance.ts
var Chance = class {
  static create({ value, route }) {
    let type;
    if (typeof value === "number") {
      type = new ProbabilityChance({ value, route });
    } else if (typeof value === "function") {
      type = new FunctionChance({ func: value, route });
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `The 'chance' parameter must be a number between 0 and 1 or a function that returns a value in that range`
      );
    }
    return type;
  }
};
var ProbabilityChance = class extends Chance {
  constructor({ value, route }) {
    super();
    __publicField(this, "prob");
    let save;
    if (value <= 1 && value >= 0) {
      save = value;
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `The probability that a value is chosen must be a number between 0 and 1.`
      );
    }
    this.prob = save;
  }
  value() {
    return new Promise((resolve) => resolve(this.prob));
  }
};
var FunctionChance = class extends Chance {
  constructor({ func, route }) {
    super();
    __publicField(this, "route");
    __publicField(this, "func");
    this.func = func;
    this.route = route;
  }
  async value({ currentDocument, store }) {
    const result = await this.func({
      store,
      currentFields: currentDocument.getDocumentObject()
    });
    let type;
    if (typeof result === "number") {
      type = new ProbabilityChance({ value: result, route: this.route });
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        this.route,
        `The chance function must return a number that indicate the value probability.`
      );
    }
    return type.value({ currentDocument, store });
  }
};

// src/core/input-tree/core/probability/value-object/chance-value.ts
var ChanceValue = class {
  constructor(value) {
    __publicField(this, "_value");
    this._value = value;
  }
  value() {
    return this._value;
  }
};

// src/core/input-tree/core/probability/value-object/chances-array.ts
var ChancesArray = class {
  constructor(utils2, { options, route }) {
    __publicField(this, "utils", utils2);
    __publicField(this, "options", []);
    if (options.length > 0) {
      for (const option of options) {
        if (typeof option === "object" && option !== null) {
          const chance = Chance.create({ route, value: option.chance });
          const value = new ChanceValue(option.value);
          this.options.push({ chance, value });
        } else {
          throw new WrongProbabilityFieldDefinitionError(
            route,
            `The 'chance' and 'value' parameters must be specified for each value in the array`
          );
        }
      }
    } else {
      throw new WrongProbabilityFieldDefinitionError(
        route,
        `There are no values for the probability field'`
      );
    }
  }
  async value({ currentDocument, store }) {
    const values = this.options.map((o) => o.value);
    const weights = [];
    for (const o of this.options) {
      const chance = await o.chance.value({
        currentDocument,
        store
      });
      weights.push(chance);
    }
    const distribution = this.createDistribution(values, weights, 10);
    return this.utils.oneOfArray(distribution);
  }
  createDistribution(array, weights, size) {
    const distribution = [];
    const sum = weights.reduce((a, b) => a + b);
    const quant = size / sum;
    for (let i = 0; i < array.length; ++i) {
      const limit = quant * weights[i];
      for (let j = 0; j < limit; ++j) {
        distribution.push(array[i].value());
      }
    }
    return distribution;
  }
};

// src/core/input-tree/core/sequence/value-object/step.ts
var Step = class {
  constructor({ value }) {
    __publicField(this, "step");
    this.step = value;
  }
  value() {
    return this.step;
  }
};

// src/core/input-tree/core/sequence/value-object/starts-with.ts
var StartsWith = class {
  constructor({ value }) {
    __publicField(this, "startsWith");
    this.startsWith = value;
  }
  value() {
    return this.startsWith;
  }
};

// src/core/input-tree/core/validators/resolver.ts
var ResolverValidator = class {
  execute({ config, route }) {
    if (config.type instanceof SequenceFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The sequence field '${route}' can not be an array field`
        );
      }
    } else if (config.type instanceof SequentialFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The sequential field '${route}' can not be an array field`
        );
      }
    } else if (config.type instanceof KeyFieldResolver) {
      if (config.isArray.can()) {
        throw new ChacaError(
          `The key field '${route}' can not be an array field`
        );
      }
      if (config.possibleNull.can()) {
        throw new ChacaError(
          `The key field '${route}' can not be a null field`
        );
      }
    }
  }
};

// src/core/fields/core/enum/enum-field.ts
var EnumField = class {
  constructor(values) {
    __publicField(this, "values", values);
  }
};

// src/core/fields/core/pick/pick-field.ts
var PickField = class {
  constructor(values) {
    __publicField(this, "values", values);
  }
};

// src/core/fields/core/probability/probability-field.ts
var ProbabilityField = class {
  constructor(values) {
    __publicField(this, "values", []);
    if (Array.isArray(values)) {
      this.values = values;
    }
  }
};

// src/core/fields/core/ref/value-object/null-empty.ts
var NullOnEmpty = class {
  constructor(value) {
    __publicField(this, "_value");
    if (value) {
      this._value = true;
    } else {
      this._value = false;
    }
  }
  value() {
    return this._value;
  }
};

// src/core/fields/core/ref/value-object/ref-field.ts
var InputRefField = class {
  constructor(refField) {
    __publicField(this, "_value");
    if (typeof refField === "string") {
      this._value = refField;
    } else {
      this._value = "";
    }
  }
  value() {
    return this._value;
  }
};

// src/core/fields/core/ref/value-object/unique.ts
var Unique = class {
  constructor(value) {
    __publicField(this, "unique");
    if (value) {
      this.unique = true;
    } else {
      this.unique = false;
    }
  }
  value() {
    return this.unique;
  }
};

// src/core/fields/core/ref/value-object/where.ts
var Where = class {
  constructor(value) {
    __publicField(this, "where");
    if (typeof value === "function") {
      this.where = value;
    } else {
      this.where = null;
    }
  }
  value() {
    return this.where;
  }
};

// src/core/fields/core/ref/ref-field.ts
var RefField = class {
  constructor(refField, config) {
    __publicField(this, "refField");
    this.refField = this.validate(refField, config);
  }
  validate(refField, config) {
    const saveConfig = {
      refField: new InputRefField(refField).value(),
      unique: new Unique(config?.unique).value(),
      where: new Where(config?.where).value(),
      nullOnEmpty: new NullOnEmpty(config?.nullOnEmpty).value()
    };
    return saveConfig;
  }
};

// src/core/fields/core/sequence/value-object/Config.ts
var Config = class {
  constructor(config) {
    __publicField(this, "_config", {
      starsWith: 1,
      step: 1
    });
    if (typeof config === "object") {
      if (typeof config.starsWith === "number") {
        this._config.starsWith = config.starsWith;
      }
      if (typeof config.step === "number") {
        this._config.step = config.step;
      }
    }
  }
  value() {
    return this._config;
  }
};

// src/core/fields/core/sequence/sequence-field.ts
var SequenceField = class {
  constructor(config) {
    __publicField(this, "config");
    this.config = new Config(config).value();
  }
};

// src/core/fields/core/sequential/value-object/Config.ts
var Config2 = class {
  constructor(config) {
    __publicField(this, "_config", { loop: false });
    if (typeof config === "object" && config !== null) {
      if (config.loop) {
        this._config.loop = true;
      }
    }
  }
  value() {
    return this._config;
  }
};

// src/core/fields/core/sequential/sequential-field.ts
var SequentialField = class {
  constructor(values, config) {
    __publicField(this, "values");
    __publicField(this, "config");
    this.values = values;
    this.config = new Config2(config).value();
  }
};

// src/core/export/core/space-index.ts
var SpaceIndex = class {
  constructor(v) {
    __publicField(this, "_value");
    __publicField(this, "_step");
    this._step = v ? v : 3;
    this._value = 0;
  }
  reverse() {
    this._value = this._value - this._step;
  }
  create(v) {
    let space = "";
    for (let i = 0; i < this._value; i++) {
      space += " ";
    }
    return `${space}${v}`;
  }
  step() {
    return this._step;
  }
  push() {
    this._value = this._value + this._step;
  }
};

// src/core/export/generators/generator/generator.ts
var Generator = class {
  constructor({ ext, zip }) {
    __publicField(this, "ext");
    /**
     * Whether the produced files should be bundled into a single zip when written
     * to disk. It only affects the `FileWriter`; the in-memory `dump` output is
     * never zipped.
     */
    __publicField(this, "zip");
    this.ext = ext;
    this.zip = Boolean(zip);
  }
};

// src/core/export/generators/file-creator/filename.ts
var Filename = class {
  constructor(name) {
    __publicField(this, "_name");
    this._name = name;
  }
  value() {
    return this._name.trim();
  }
};

// src/core/export/generators/json/core/creator.ts
var JsonCodeCreator = class {
  constructor(indent) {
    __publicField(this, "indent", indent);
  }
  execute(data) {
    return JSON.stringify(
      data,
      (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        } else if (typeof value === "undefined") {
          return "undefined";
        }
        return value;
      },
      this.indent.step()
    );
  }
};

// src/core/export/generators/json/json-generator.ts
var JsonGenerator = class extends Generator {
  constructor(props) {
    super({ ext: "json", zip: props.zip });
    __publicField(this, "config");
    __publicField(this, "creator");
    this.config = props;
    this.creator = new JsonCodeCreator(new SpaceIndex(props.indent));
  }
  dump({ data, filename }) {
    const code = this.creator.execute(data);
    return [{ filename: filename.value(), content: code }];
  }
  async dumpRelational({
    filename,
    resolver
  }) {
    const objectData = await resolver.resolve();
    if (this.config.separate) {
      const result = [];
      for (const [key, data] of Object.entries(objectData)) {
        const filename2 = new Filename(key);
        const code = this.creator.execute(data);
        result.push({ content: code, filename: filename2.value() });
      }
      return result;
    } else {
      return this.dump({ data: objectData, filename });
    }
  }
};

// src/core/export/generators/javascript/core/union.ts
var UnionDatatypes = class {
  constructor() {
    __publicField(this, "datatypes");
    this.datatypes = [];
  }
  setDatatype(dat) {
    const exists = this.datatypes.some((d) => d.equal(dat));
    if (!exists) {
      this.datatypes.push(dat);
    }
  }
  length() {
    return this.datatypes.length;
  }
  declaration() {
    if (this.datatypes.length === 1) {
      const type = this.datatypes[0];
      return `${type.definition()}`;
    } else if (this.datatypes.length === 0) {
      return "any";
    } else {
      const types = this.datatypes.map((d) => d.definition()).join(" | ");
      return types;
    }
  }
};

// src/core/export/generators/javascript/core/types.ts
var JavascriptDatatype = class {
};
var JavascriptClass = class _JavascriptClass extends JavascriptDatatype {
  constructor(save) {
    super();
    __publicField(this, "fields");
    __publicField(this, "save");
    this.save = save;
    this.fields = [];
  }
  name() {
    return this.save.name();
  }
  string(index) {
    if (this.fields.length === 0) {
      return `{}`;
    }
    let code = `{
`;
    index.push();
    const fields = this.fields.map((f) => index.create(`${f.name()}: ${f.string(index)}`)).join(",\n");
    code += fields + "\n";
    index.reverse();
    code += index.create("}");
    return code;
  }
  equal(other) {
    if (other instanceof _JavascriptClass) {
      return true;
    }
    return false;
  }
  definition() {
    return this.name();
  }
  setFields(fields) {
    this.fields = fields;
    this.save.setFields(fields);
  }
};
var JavascriptClassField = class {
  constructor(save, datatype) {
    __publicField(this, "save");
    __publicField(this, "datatype");
    this.save = save;
    this.datatype = datatype;
  }
  name() {
    return this.save.name();
  }
  string(index) {
    return this.datatype.string(index);
  }
  definition() {
    return this.datatype.definition();
  }
};
var JavascriptArray = class _JavascriptArray extends JavascriptDatatype {
  constructor() {
    super();
    __publicField(this, "values");
    __publicField(this, "datatypes");
    this.datatypes = new UnionDatatypes();
    this.values = [];
  }
  definition() {
    const types = this.datatypes.declaration();
    return `Array<${types}>`;
  }
  setValue(v) {
    this.datatypes.setDatatype(v);
    this.values.push(v);
  }
  string(index) {
    if (this.values.length === 0) {
      return `[]`;
    }
    let code = `[
`;
    index.push();
    code += this.values.map((d) => {
      return index.create(d.string(index));
    }).join(",\n") + "\n";
    index.reverse();
    code += index.create("]");
    return code;
  }
  equal(other) {
    if (other instanceof _JavascriptArray) {
      return true;
    }
    return false;
  }
};
var JavascriptBoolean = class _JavascriptBoolean extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  equal(other) {
    return other instanceof _JavascriptBoolean;
  }
  definition() {
    return "boolean";
  }
  string() {
    return this.value ? "true" : "false";
  }
};
var JavascriptRegExp = class _JavascriptRegExp extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  definition() {
    return "RegExp";
  }
  equal(other) {
    return other instanceof _JavascriptRegExp;
  }
  string() {
    return `/${this.value.source}/${this.value.flags}`;
  }
};
var JavascriptNull = class _JavascriptNull extends JavascriptDatatype {
  constructor() {
    super();
  }
  string() {
    return "null";
  }
  definition() {
    return "null";
  }
  equal(other) {
    return other instanceof _JavascriptNull;
  }
};
var JavascriptUndefined = class _JavascriptUndefined extends JavascriptDatatype {
  constructor() {
    super();
  }
  equal(other) {
    return other instanceof _JavascriptUndefined;
  }
  definition() {
    return "undefined";
  }
  string() {
    return "undefined";
  }
};
var JavascriptBignInt = class _JavascriptBignInt extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  definition() {
    return "bigint";
  }
  string() {
    return `${this.value}n`;
  }
  equal(other) {
    return other instanceof _JavascriptBignInt;
  }
};
var JavascriptNumber = class _JavascriptNumber extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  definition() {
    return "number";
  }
  equal(other) {
    return other instanceof _JavascriptNumber;
  }
  string() {
    return this.value.toString();
  }
};
var JavascriptDate = class _JavascriptDate extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  definition() {
    return "Date";
  }
  equal(other) {
    return other instanceof _JavascriptDate;
  }
  string() {
    return `new Date("${this.value.toISOString()}")`;
  }
};
var JavascriptString = class _JavascriptString extends JavascriptDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  definition() {
    return "string";
  }
  equal(other) {
    return other instanceof _JavascriptString;
  }
  string() {
    return `${JSON.stringify(this.value)}`;
  }
};

// src/core/export/generators/javascript/core/classes.ts
var SaveClassField = class {
  constructor(name, datatype) {
    __publicField(this, "_name");
    __publicField(this, "datatypes");
    __publicField(this, "_optional");
    this.datatypes = new UnionDatatypes();
    this.datatypes.setDatatype(datatype);
    this._name = name;
    this._optional = false;
  }
  setDatatype(d) {
    if (d instanceof JavascriptUndefined) {
      this._optional = true;
    } else {
      this.datatypes.setDatatype(d);
    }
  }
  optional() {
    return this._optional;
  }
  equal(other) {
    return other._name.equal(this._name);
  }
  name() {
    return this._name.string();
  }
};
var SaveJavascriptClass = class {
  constructor(name) {
    __publicField(this, "_name");
    __publicField(this, "fields");
    this.fields = [];
    this._name = name;
  }
  setFields(fields) {
    const founds = [];
    for (const f of fields) {
      const found = this.fields.find((sf) => sf === f.save);
      if (found) {
        founds.push(found);
        found.setDatatype(f.datatype);
      }
    }
    for (const f of this.fields) {
      if (!founds.includes(f)) {
        f.setDatatype(new JavascriptUndefined());
      }
    }
  }
  search(create) {
    const found = this.fields.find((f) => f.equal(create));
    if (found) {
      return found;
    } else {
      this.fields.push(create);
      return create;
    }
  }
  name() {
    return this._name.string();
  }
  equal(other) {
    return this._name.equal(other._name);
  }
  definition(index) {
    let code = `interface ${this.name()} {
`;
    index.push();
    this.fields.forEach((f) => {
      if (f.optional()) {
        code += index.create(`${f.name()}?: ${f.datatypes.declaration()}
`);
      } else {
        code += index.create(`${f.name()}: ${f.datatypes.declaration()}
`);
      }
    });
    index.reverse();
    code += "}\n";
    return code;
  }
};
var JavascriptClasses = class {
  constructor() {
    __publicField(this, "classes");
    this.classes = [];
  }
  search(create) {
    const found = this.classes.find((c) => c.equal(create));
    if (found) {
      return found;
    } else {
      this.classes.push(create);
      return create;
    }
  }
  string(index) {
    let code = ``;
    code += this.classes.reverse().map((c) => {
      return `${c.definition(index)}`;
    }).join("\n");
    return code;
  }
};

// src/core/export/core/datatype.ts
var Datatype = class {
  static filter(value, props) {
    let type;
    if (typeof value === "string") {
      type = props.string(value);
    } else if (typeof value === "number") {
      if (Number.isNaN(value)) {
        type = props.nan(value);
      } else if (Number.isInteger(value)) {
        type = props.int(value);
      } else {
        type = props.float(value);
      }
    } else if (typeof value === "boolean") {
      type = props.boolean(value);
    } else if (typeof value === "undefined") {
      type = props.undefined();
    } else if (typeof value === "bigint") {
      type = props.bigint(value);
    } else if (typeof value === "function") {
      type = props.function();
    } else if (typeof value === "symbol") {
      type = props.symbol();
    } else if (value instanceof RegExp) {
      type = props.regexp(value);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        type = props.array(value);
      } else if (value === null) {
        type = props.null();
      } else if (value instanceof Date) {
        type = props.date(value);
      } else {
        type = props.object(value);
      }
    } else {
      type = props.string(String(value));
    }
    return type;
  }
};

// src/core/export/generators/javascript/core/names.ts
var JavascriptClassName = class {
  constructor(utils2, route) {
    __publicField(this, "utils", utils2);
    __publicField(this, "route", route);
  }
  equal(other) {
    return other.route.equal(this.route);
  }
  string() {
    return this.utils.pascalCase(this.route.string());
  }
};
var JavascriptClassFieldName = class {
  constructor(utils2, _name) {
    __publicField(this, "utils", utils2);
    __publicField(this, "_name", _name);
  }
  equal(other) {
    return other._name === this._name;
  }
  string() {
    return this.utils.camelCase(this._name);
  }
};

// src/core/export/generators/javascript/core/value-creator.ts
var ValueCreator = class {
  constructor(classes, utils2, skipInvalid) {
    __publicField(this, "classes", classes);
    __publicField(this, "utils", utils2);
    __publicField(this, "skipInvalid", skipInvalid);
  }
  execute({ route, value }) {
    const type = Datatype.filter(value, {
      string(value2) {
        return new JavascriptString(value2);
      },
      int(value2) {
        return new JavascriptNumber(value2);
      },
      float(value2) {
        return new JavascriptNumber(value2);
      },
      nan() {
        return new JavascriptNumber(value);
      },
      bigint(value2) {
        return new JavascriptBignInt(value2);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        } else {
          throw new ChacaError(
            `You can not export a function to a javascript file.`
          );
        }
      },
      boolean(value2) {
        return new JavascriptBoolean(value2);
      },
      undefined() {
        return new JavascriptUndefined();
      },
      array: (value2) => {
        const array = new JavascriptArray();
        for (const v of value2) {
          const sub = this.execute({ route: route.clone(), value: v });
          if (sub) {
            array.setValue(sub);
          }
        }
        return array;
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        } else {
          throw new ChacaError(
            `You can not export a Symbol into a javascript file.`
          );
        }
      },
      null() {
        return new JavascriptNull();
      },
      date(value2) {
        return new JavascriptDate(value2);
      },
      regexp(value2) {
        return new JavascriptRegExp(value2);
      },
      object: (value2) => {
        const classname = new JavascriptClassName(this.utils, route);
        const save = this.classes.search(new SaveJavascriptClass(classname));
        const object = new JavascriptClass(save);
        const fields = [];
        for (const [key, data] of Object.entries(value2)) {
          const fieldname = new JavascriptClassFieldName(this.utils, key);
          const datatype = this.execute({
            value: data,
            route: route.create(key)
          });
          if (datatype) {
            const saveField = save.search(
              new SaveClassField(fieldname, datatype)
            );
            const field = new JavascriptClassField(saveField, datatype);
            fields.push(field);
          }
        }
        object.setFields(fields);
        return object;
      }
    });
    return type;
  }
};

// src/core/export/generators/javascript/core/route.ts
var Route = class _Route {
  constructor(init) {
    __publicField(this, "route");
    this.route = init;
  }
  create(name) {
    return new _Route([...this.route, name]);
  }
  equal(other) {
    return other.route.join(".") === this.route.join(".");
  }
  clone() {
    return new _Route(this.route);
  }
  string() {
    return this.route.join(".");
  }
};

// src/core/export/generators/javascript/core/creator.ts
var JavascriptCodeCreator = class {
  constructor(utils2, indent, types, skipInvalid, declarationOnly) {
    __publicField(this, "utils", utils2);
    __publicField(this, "indent", indent);
    __publicField(this, "types", types);
    __publicField(this, "skipInvalid", skipInvalid);
    __publicField(this, "declarationOnly", declarationOnly);
  }
  execute({ data, name }) {
    const classes = new JavascriptClasses();
    const route = new Route([name]);
    const creator = new ValueCreator(classes, this.utils, this.skipInvalid);
    const datatype = creator.execute({ route, value: data });
    let code = ``;
    if (datatype) {
      if (!this.types) {
        code += `const data = ${datatype.string(this.indent)}`;
      } else {
        code += `${classes.string(this.indent)}
`;
        if (!this.declarationOnly.value()) {
          code += `export const data: ${datatype.definition()} = ${datatype.string(
            this.indent
          )}`;
        }
      }
    }
    return code;
  }
};

// src/core/export/core/skip-invalid.ts
var SkipInvalid = class {
  constructor(value) {
    __publicField(this, "_value");
    this._value = Boolean(value);
  }
  value() {
    return this._value;
  }
};

// src/core/export/core/declaration-only.ts
var DeclarationOnly = class {
  constructor(v) {
    __publicField(this, "_value");
    this._value = Boolean(v);
  }
  value() {
    return this._value;
  }
};

// src/core/export/generators/javascript/javascript-generator.ts
var JavascriptGenerator = class extends Generator {
  constructor(utils2, config) {
    super({ ext: "js", zip: config.zip });
    __publicField(this, "separate");
    __publicField(this, "creator");
    this.separate = Boolean(config.separate);
    this.creator = new JavascriptCodeCreator(
      utils2,
      new SpaceIndex(config.indent),
      false,
      new SkipInvalid(config.skipInvalid),
      new DeclarationOnly(false)
    );
  }
  async dumpRelational({
    filename,
    resolver
  }) {
    if (this.separate) {
      const result = [];
      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: await r.resolve(),
          name: r.getSchemaName()
        });
        const filename2 = new Filename(r.getSchemaName());
        result.push({ content: code, filename: filename2.value() });
      }
      return result;
    } else {
      return this.dump({
        data: await resolver.resolve(),
        filename
      });
    }
  }
  dump({ filename, data }) {
    const code = this.creator.execute({
      data,
      name: filename.value()
    });
    return [{ filename: filename.value(), content: code }];
  }
};

// src/core/export/generators/csv/core/validator.ts
var DataValidator = class {
  execute(data) {
    let valid = true;
    if (Array.isArray(data)) {
      for (const obj of data) {
        if (!(typeof obj === "object" && obj !== null)) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }
    if (!valid) {
      throw new ChacaError(
        `In the case of the 'csv' format, only an array of objects can be exported.`
      );
    }
  }
};
var CsvCodeCreator = class {
  constructor(config, validator) {
    __publicField(this, "config", config);
    __publicField(this, "validator", validator);
  }
  execute(data) {
    this.validator.execute(data);
    return json2csv(data, {
      trimFieldValues: this.config.trim?.field,
      trimHeaderFields: this.config.trim?.header,
      excludeKeys: this.config.excludeKeys,
      keys: this.config.keys,
      unwindArrays: this.config.unwindArrays,
      sortHeader: this.config.sortHeader,
      expandArrayObjects: this.config.expandArrayObjects,
      expandNestedObjects: this.config.expandNestedObjects,
      parseValue: this.config.parseValue,
      delimiter: {
        field: this.config.delimiter?.field,
        eol: this.config.delimiter?.eol,
        wrap: this.config.delimiter?.wrap
      }
    });
  }
};

// src/core/export/generators/csv/csv-generator.ts
var CsvGenerator = class extends Generator {
  constructor({
    zip = false,
    trim = { field: false, header: false },
    delimiter = {},
    excludeKeys = [],
    expandArrayObjects = false,
    expandNestedObjects = true,
    keys,
    parseValue,
    sortHeader = false,
    unwindArrays = false
  }) {
    super({ ext: "csv", zip });
    __publicField(this, "creator");
    this.creator = new CsvCodeCreator(
      {
        trim,
        delimiter,
        excludeKeys,
        expandArrayObjects,
        expandNestedObjects,
        sortHeader,
        unwindArrays,
        keys,
        parseValue
      },
      new DataValidator()
    );
  }
  dump({ filename, data }) {
    const code = this.creator.execute(data);
    return [{ content: code, filename: filename.value() }];
  }
  async dumpRelational({ resolver }) {
    const result = [];
    for (const r of resolver.getResolvers()) {
      const filename = new Filename(r.getSchemaName());
      const code = this.creator.execute(await r.resolve());
      result.push({ filename: filename.value(), content: code });
    }
    return result;
  }
};

// src/core/export/generators/java/core/parent.ts
var Parent = class _Parent {
  constructor(init) {
    __publicField(this, "route");
    this.route = init;
  }
  create(route) {
    const parent = new _Parent([...this.route, route]);
    return parent;
  }
  string() {
    return this.route.join(".");
  }
  equal(other) {
    return other.string() === this.string();
  }
};

// src/core/export/generators/java/core/classes-creator.ts
var ClassesCreator = class {
  constructor(creator, validator) {
    __publicField(this, "creator", creator);
    __publicField(this, "validator", validator);
  }
  execute({ data, name: iname }) {
    this.validator.execute(data);
    const parent = new Parent([iname]);
    for (const value of data) {
      this.creator.execute({ parent, value, print: true });
    }
  }
};

// src/core/export/generators/java/core/classes.ts
var SaveJavaClassField = class {
  constructor(name, datatype) {
    __publicField(this, "_name");
    __publicField(this, "_datatype");
    this._datatype = datatype;
    this._name = name;
  }
  name() {
    return this._name.string();
  }
  definition(imports) {
    return this._datatype.definition(imports);
  }
  datatype() {
    return this._datatype;
  }
  setDatatype(d) {
    this._datatype = d;
  }
};
var SaveJavaClass = class {
  constructor(name, fields, print) {
    __publicField(this, "_name");
    __publicField(this, "fields");
    __publicField(this, "values");
    __publicField(this, "print");
    this.fields = fields;
    this._name = name;
    this.values = [];
    this.print = print;
  }
  variable() {
    return this._name.variable();
  }
  equal(other) {
    return this._name.equal(other._name);
  }
  find(name, datatype) {
    const found = this.fields.find((f) => f._name.equal(name));
    if (found) {
      const similar = found.datatype().isSimilar(datatype);
      if (similar) {
        const greater = found.datatype().greater(datatype);
        found.setDatatype(greater);
      } else {
        throw new ChacaError(``);
      }
      return found;
    } else {
      const create = new SaveJavaClassField(name, datatype);
      this.fields.push(create);
      return create;
    }
  }
  name() {
    return this._name.string();
  }
  add(value) {
    this.values.push(value);
  }
  definition(index, imports) {
    let code = `public class ${this.name()} {
`;
    index.push();
    const fields = [];
    for (const field of this.fields) {
      fields.push(
        index.create(`private ${field.definition(imports)} ${field.name()};`)
      );
    }
    code += fields.join("\n") + "\n\n";
    code += index.create(`public ${this.name()}(`);
    code += this.fields.map((f) => {
      return `${f.definition(imports)} ${f.name()}`;
    }).join(", ");
    code += ") {\n";
    index.push();
    code += this.fields.map((f) => {
      return index.create(`this.${f.name()} = ${f.name()};`);
    }).join(`
`);
    index.reverse();
    code += "\n" + index.create("}\n\n");
    code += this.fields.map((f) => {
      let code2 = ``;
      code2 += index.create(
        `public ${f.definition(imports)} ${f._name.getter()}() {
`
      );
      index.push();
      code2 += index.create(`return this.${f.name()};
`);
      index.reverse();
      code2 += index.create(`}
`);
      code2 += "\n";
      code2 += index.create(
        `public void ${f._name.setter()}(${f.definition(
          imports
        )} ${f.name()}) {
`
      );
      index.push();
      code2 += index.create(`this.${f.name()} = ${f.name()};
`);
      index.reverse();
      code2 += index.create(`}
`);
      return code2;
    }).join("\n");
    index.reverse();
    code += index.create(`}`);
    return code;
  }
};
var JavaClasses = class {
  constructor() {
    __publicField(this, "classes");
    this.classes = [];
  }
  find(add) {
    const found = this.classes.find((c) => c.equal(add));
    if (found) {
      return found;
    } else {
      this.classes.push(add);
      return add;
    }
  }
};

// src/core/export/generators/java/core/names.ts
var JavaClassFieldName = class {
  constructor(utils2, name) {
    __publicField(this, "utils", utils2);
    __publicField(this, "_name");
    this._name = name;
  }
  getter() {
    return `${this.utils.camelCase(`get_${this.name()}`)}`;
  }
  setter() {
    return `${this.utils.camelCase(`set_${this.name()}`)}`;
  }
  equal(other) {
    return this._name === other._name;
  }
  name() {
    return this._name;
  }
  string() {
    return this.utils.camelCase(this._name);
  }
};
var JavaClassName = class {
  constructor(utils2, parent) {
    __publicField(this, "utils", utils2);
    __publicField(this, "parent", parent);
  }
  variable() {
    return this.utils.camelCase(this.parent.string());
  }
  name() {
    return this.parent.string();
  }
  equal(other) {
    return this.parent.equal(other.parent);
  }
  string() {
    return this.utils.pascalCase(this.parent.string());
  }
};

// src/core/export/generators/java/core/import.ts
var Import = class {
  constructor(from) {
    __publicField(this, "from");
    this.from = from;
  }
  equal(other) {
    return other.from.join(".") === this.from.join(".");
  }
};
var Imports = class {
  constructor() {
    __publicField(this, "imports");
    this.imports = [];
  }
  add(...imp) {
    for (const i of imp) {
      const found = this.imports.find((si) => si.equal(i));
      if (!found) {
        this.imports.push(i);
      }
    }
  }
  string() {
    let code = ``;
    code += this.imports.map((i) => {
      return `import ${i.from.join(".")};`;
    }).join("\n");
    return code;
  }
};

// src/core/export/generators/java/core/types.ts
var JavaDatatype = class {
  greater(other) {
    return this.greaterThan(other) ? this : other;
  }
  isSimilar(other) {
    return this.equal(other) || this.similar(other) || this instanceof JavaNull || other instanceof JavaNull;
  }
};
var JavaString = class _JavaString extends JavaDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "string";
  }
  similar() {
    return false;
  }
  greaterThan() {
    return false;
  }
  definition() {
    return "String";
  }
  equal(other) {
    return other instanceof _JavaString;
  }
  string() {
    return `${JSON.stringify(this.value)}`;
  }
};
var JavaNumber = class _JavaNumber extends JavaDatatype {
  similar(other) {
    return other instanceof _JavaNumber;
  }
  primitive() {
    return "number";
  }
};
var JavaFloat = class _JavaFloat extends JavaNumber {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  greaterThan(other) {
    return other instanceof JavaInt;
  }
  definition() {
    return `Float`;
  }
  equal(other) {
    return other instanceof _JavaFloat;
  }
  string() {
    if (this.value === Infinity) {
      return "Float.POSITIVE_INFINITY";
    } else if (this.value === -Infinity) {
      return "Float.NEGATIVE_INFINITY";
    } else if (Number.isNaN(this.value)) {
      return "Float.NaN";
    } else {
      return `${this.value}`;
    }
  }
};
var JavaInt = class _JavaInt extends JavaNumber {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  greaterThan() {
    return false;
  }
  string() {
    return `${this.value}`;
  }
  equal(other) {
    return other instanceof _JavaInt;
  }
  definition() {
    return "Integer";
  }
};
var JavaBoolean = class _JavaBoolean extends JavaDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "boolean";
  }
  similar() {
    return false;
  }
  greaterThan() {
    return false;
  }
  equal(other) {
    return other instanceof _JavaBoolean;
  }
  definition() {
    return "Boolean";
  }
  string() {
    return this.value ? "true" : "false";
  }
};
var JavaBigint = class _JavaBigint extends JavaDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "bigint";
  }
  similar() {
    return false;
  }
  greaterThan() {
    return false;
  }
  string() {
    return `BigInteger`;
  }
  equal(other) {
    return other instanceof _JavaBigint;
  }
  definition() {
    return `BigInteger.valueOf(${Number(this.value)})`;
  }
};
var JavaDate = class _JavaDate extends JavaDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "Date";
  }
  similar() {
    return false;
  }
  greaterThan() {
    return false;
  }
  string(_, imports) {
    imports.add(new Import(["java", "time", "LocalDateTime"]));
    return `LocalDateTime.parse("${this.value.toISOString()}");`;
  }
  definition(imports) {
    imports.add(new Import(["java", "time", "LocalDateTime"]));
    return "LocalDateTime";
  }
  equal(other) {
    return other instanceof _JavaDate;
  }
};
var JavaRegexp = class _JavaRegexp extends JavaDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "RegExp";
  }
  greaterThan() {
    return false;
  }
  similar() {
    return false;
  }
  equal(other) {
    return other instanceof _JavaRegexp;
  }
  string(_, imports) {
    imports.add(new Import(["java", "util", "regex", "Pattern"]));
    return `Patter.compile("${String(this.value)}")`;
  }
  definition(imports) {
    imports.add(new Import(["java", "util", "regex", "Pattern"]));
    return "Pattern";
  }
};
var JavaNull = class _JavaNull extends JavaDatatype {
  string() {
    return "null";
  }
  primitive() {
    return "null";
  }
  similar() {
    return true;
  }
  greaterThan() {
    return false;
  }
  definition() {
    return "Object";
  }
  equal(other) {
    return other instanceof _JavaNull;
  }
};
var JavaClass = class _JavaClass extends JavaDatatype {
  constructor(save, parent) {
    super();
    __publicField(this, "fields");
    __publicField(this, "save");
    __publicField(this, "parent");
    this.save = save;
    this.fields = [];
    this.parent = parent;
  }
  primitive() {
    return this.save.name();
  }
  greaterThan() {
    return false;
  }
  similar(other) {
    return other instanceof _JavaClass;
  }
  name() {
    return this.save.name();
  }
  string(index, imports) {
    let code = `new ${this.name()}(
`;
    index.push();
    code += this.save.fields.map((f) => {
      const found = this.fields.find((sf) => sf.save === f);
      if (found) {
        return index.create(`${found.string(index, imports)}`);
      } else {
        return `null`;
      }
    }).join(",\n");
    index.reverse();
    code += "\n" + index.create(")");
    return code;
  }
  equal(other) {
    if (other instanceof _JavaClass) {
      return true;
    }
    return false;
  }
  definition() {
    return this.name();
  }
  setField(field) {
    this.fields.push(field);
  }
};
var JavaClassField = class {
  constructor(datatype, save) {
    __publicField(this, "datatype");
    __publicField(this, "save");
    this.datatype = datatype;
    this.save = save;
  }
  name() {
    return this.save.name();
  }
  string(index, imports) {
    return this.datatype.string(index, imports);
  }
  definition(imports) {
    return this.datatype.definition(imports);
  }
};
var JavaArray = class _JavaArray extends JavaDatatype {
  constructor() {
    super();
    __publicField(this, "values");
    __publicField(this, "datatype");
    this.values = [];
    this.datatype = null;
  }
  primitive() {
    return `Array`;
  }
  similar() {
    return false;
  }
  greaterThan() {
    return false;
  }
  definition(imports) {
    imports.add(new Import(["java", "util", "List"]));
    if (this.datatype) {
      return `List<${this.datatype.definition(imports)}>`;
    } else {
      return `List<Object>`;
    }
  }
  string(index, imports) {
    imports.add(
      new Import(["java", "util", "List"]),
      new Import(["java", "util", "Arrays"])
    );
    if (this.values.length === 0) {
      return `Arrays.asList()`;
    }
    let code = `Arrays.asList(
`;
    index.push();
    code += this.values.map((v) => {
      return index.create(`${v.string(index, imports)}`);
    }).join(",\n");
    index.reverse();
    code += "\n" + index.create(")");
    return code;
  }
  equal(other) {
    return other instanceof _JavaArray;
  }
  add(value, parent) {
    if (this.datatype) {
      if (this.datatype.isSimilar(value)) {
        this.datatype = this.datatype.greater(value);
      } else {
        const route = parent.string();
        const type1 = this.datatype.primitive();
        const type2 = value.primitive();
        throw new ChacaError(
          `On field '${route}' exist values of type ${type1} and ${type2}. The data must be uniform`
        );
      }
    } else {
      this.datatype = value;
    }
    this.values.push(value);
  }
};

// src/core/export/generators/java/core/value-creator.ts
var ValueCreator2 = class {
  constructor(utils2, classes, skipInvalid) {
    __publicField(this, "utils", utils2);
    __publicField(this, "classes", classes);
    __publicField(this, "skipInvalid", skipInvalid);
  }
  execute({ value, parent, print }) {
    const type = Datatype.filter(value, {
      bigint(value2) {
        return new JavaBigint(value2);
      },
      string(value2) {
        return new JavaString(value2);
      },
      boolean(value2) {
        return new JavaBoolean(value2);
      },
      regexp: (value2) => {
        return new JavaRegexp(value2);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        }
        throw new ChacaError(`You can not export a function into a java file.`);
      },
      date(value2) {
        return new JavaDate(value2);
      },
      null() {
        return new JavaNull();
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        }
        throw new ChacaError(`You can not export a Symbol into a java file.`);
      },
      float(value2) {
        return new JavaFloat(value2);
      },
      nan(value2) {
        return new JavaFloat(value2);
      },
      int(value2) {
        return new JavaInt(value2);
      },
      undefined() {
        return new JavaNull();
      },
      object: (value2) => {
        const saveClass = this.classes.find(
          new SaveJavaClass(new JavaClassName(this.utils, parent), [], print)
        );
        const object = new JavaClass(saveClass, parent);
        for (const [key, data] of Object.entries(value2)) {
          const fieldName = new JavaClassFieldName(this.utils, key);
          const newParent = parent.create(key);
          const datatype = this.execute({
            value: data,
            parent: newParent,
            print: false
          });
          if (datatype) {
            const saveField = saveClass.find(fieldName, datatype);
            const field = new JavaClassField(datatype, saveField);
            object.setField(field);
          }
        }
        saveClass.add(object);
        return object;
      },
      array: (value2) => {
        const array = new JavaArray();
        for (const v of value2) {
          const datatype = this.execute({
            parent,
            value: v,
            print: false
          });
          if (datatype) {
            array.add(datatype, parent);
          }
        }
        return array;
      }
    });
    return type;
  }
};

// src/core/export/generators/java/core/validator.ts
var DataValidator2 = class {
  execute(data) {
    let valid = true;
    if (Array.isArray(data)) {
      for (const obj of data) {
        if (!(typeof obj === "object" && obj !== null && !Array.isArray(obj))) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }
    if (!valid) {
      throw new ChacaError(
        `In the case of the 'java' format, only an array of objects can be exported.`
      );
    }
  }
};

// src/core/export/generators/java/core/code-creator.ts
var JavaCodeCreator = class {
  constructor(config) {
    __publicField(this, "config", config);
  }
  execute(classes) {
    const codes = [];
    for (const c of classes.classes) {
      const imports = new Imports();
      const definition = c.definition(this.config.indent, imports);
      const imp = imports.string();
      let content = this.config.package.string();
      if (imp !== "") {
        content += imp + "\n\n";
      }
      content += definition;
      codes.push({ content, filename: c.name() });
    }
    if (!this.config.declarationOnly.value()) {
      codes.push({ content: this.main(classes), filename: "Main" });
    }
    return codes;
  }
  main(classes) {
    const imports = new Imports();
    let code = this.config.package.string();
    let content = ``;
    content += this.config.indent.create("public class Main {\n");
    this.config.indent.push();
    content += this.config.indent.create(
      `public static void main(String[] args) {
`
    );
    this.config.indent.push();
    content += classes.classes.filter((c) => c.print).map((c) => {
      imports.add(
        new Import(["java", "util", "List"]),
        new Import(["java", "util", "LinkedList"])
      );
      const definition = c.name();
      const variable = c.variable();
      let code2 = this.config.indent.create(
        `List<${definition}> ${variable} = new LinkedList<>();
`
      );
      code2 += c.values.map((v) => {
        let code3 = this.config.indent.create(`${variable}.add(
`);
        this.config.indent.push();
        code3 += this.config.indent.create(
          v.string(this.config.indent, imports)
        );
        this.config.indent.reverse();
        code3 += "\n" + this.config.indent.create(")");
        return code3;
      }).join(";\n");
      return code2;
    }).join(";\n\n");
    this.config.indent.reverse();
    content += "\n" + this.config.indent.create(`}`);
    this.config.indent.reverse();
    content += "\n" + this.config.indent.create(`}`);
    const imp = imports.string();
    if (imp !== "") {
      code += imp + "\n\n";
    }
    code += content;
    return code;
  }
};

// src/core/export/generators/java/value-object/package.ts
var Package = class {
  constructor(value) {
    __publicField(this, "_value");
    this._value = typeof value === "string" ? value : "chaca.data";
  }
  string() {
    return `package ${this._value};

`;
  }
};

// src/core/export/generators/java/java-generator.ts
var JavaGenerator = class extends Generator {
  constructor(utils2, config) {
    super({ ext: "java", zip: config.zip });
    __publicField(this, "utils", utils2);
    __publicField(this, "creator");
    __publicField(this, "skipInvalid");
    this.creator = new JavaCodeCreator({
      indent: new SpaceIndex(config.indent),
      package: new Package(config.package),
      declarationOnly: new DeclarationOnly(config.declarationOnly)
    });
    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }
  async dumpRelational({ resolver }) {
    const classes = new JavaClasses();
    const valueCreator = new ValueCreator2(
      this.utils,
      classes,
      this.skipInvalid
    );
    const validator = new DataValidator2();
    const creator = new ClassesCreator(valueCreator, validator);
    for (const r of resolver.getResolvers()) {
      creator.execute({
        name: r.getSchemaName(),
        data: await r.resolve()
      });
    }
    const result = [];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes
    )) {
      const filename = new Filename(ifilename);
      result.push({ content, filename: filename.value() });
    }
    return result;
  }
  dump({ data, filename }) {
    const classes = new JavaClasses();
    const valueCreator = new ValueCreator2(
      this.utils,
      classes,
      this.skipInvalid
    );
    const validator = new DataValidator2();
    const creator = new ClassesCreator(valueCreator, validator);
    creator.execute({
      name: filename.value(),
      data
    });
    const result = [];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes
    )) {
      const filename2 = new Filename(ifilename);
      result.push({ filename: filename2.value(), content });
    }
    return result;
  }
};

// src/core/export/generators/typescript/typescript-generator.ts
var TypescriptGenerator = class extends Generator {
  constructor(utils2, config) {
    super({ ext: "ts", zip: config.zip });
    __publicField(this, "separate");
    __publicField(this, "creator");
    this.separate = Boolean(config.separate);
    this.creator = new JavascriptCodeCreator(
      utils2,
      new SpaceIndex(config.indent),
      true,
      new SkipInvalid(config.skipInvalid),
      new DeclarationOnly(config.declarationOnly)
    );
  }
  dump({ data, filename }) {
    const code = this.creator.execute({
      data,
      name: filename.value()
    });
    return [{ content: code, filename: filename.value() }];
  }
  async dumpRelational({
    filename,
    resolver
  }) {
    if (this.separate) {
      const result = [];
      for (const r of resolver.getResolvers()) {
        const filename2 = new Filename(r.getSchemaName());
        const code = this.creator.execute({
          data: await r.resolve(),
          name: r.getSchemaName()
        });
        result.push({ filename: filename2.value(), content: code });
      }
      return result;
    } else {
      return this.dump({ data: await resolver.resolve(), filename });
    }
  }
};
var YamlCodeCreator = class {
  constructor(config) {
    __publicField(this, "config", config);
  }
  execute(data) {
    return yaml.dump(data, {
      skipInvalid: true,
      indent: this.config.indent.step(),
      sortKeys: this.config.sortKeys,
      lineWidth: this.config.lineWidth,
      quotingType: this.config.quotingType
    });
  }
};

// src/core/export/generators/yaml/yaml-generator.ts
var YamlGenerator = class extends Generator {
  constructor(config) {
    super({ ext: "yaml", zip: config.zip });
    __publicField(this, "separate");
    __publicField(this, "creator");
    this.separate = Boolean(config.separate);
    this.creator = new YamlCodeCreator({
      indent: new SpaceIndex(config.indent),
      lineWidth: config.lineWidth,
      quotingType: config.quotingType,
      sortKeys: config.sortKeys
    });
  }
  dump({ data, filename }) {
    const code = this.creator.execute(data);
    return [{ content: code, filename: filename.value() }];
  }
  async dumpRelational({
    resolver,
    filename
  }) {
    if (this.separate) {
      const result = [];
      for (const r of resolver.getResolvers()) {
        const filename2 = new Filename(r.getSchemaName());
        const code = this.creator.execute(await r.resolve());
        result.push({ content: code, filename: filename2.value() });
      }
      return result;
    } else {
      return this.dump({ data: await resolver.resolve(), filename });
    }
  }
};

// src/core/export/generators/sql/core/generators/names.ts
var TableName = class _TableName {
  constructor(utils2, route) {
    __publicField(this, "utils", utils2);
    __publicField(this, "route", route);
  }
  create(name) {
    return new _TableName(this.utils, this.route.create(name));
  }
  equal(t) {
    return this.route.string() === t.route.string();
  }
  value() {
    return this.utils.pascalCase(this.route.string());
  }
};
var ColumnName = class {
  constructor(utils2, name) {
    __publicField(this, "utils", utils2);
    __publicField(this, "name");
    this.name = `${name}`;
  }
  equal(c) {
    return c.name === this.name;
  }
  value() {
    return this.utils.snakeCase(this.name);
  }
};

// src/core/export/generators/sql/core/sql-types/index.ts
var SQLDatatype = class {
  isSimilar(other) {
    if (other instanceof SQLNull || this instanceof SQLNull) {
      return true;
    }
    return other.similar(this);
  }
  greater(other) {
    if (other instanceof SQLNull) {
      return this;
    }
    if (this instanceof SQLNull) {
      return other;
    }
    if (this.greaterThan(other)) {
      return this;
    } else {
      return other;
    }
  }
};
var SQLBoolean = class _SQLBoolean extends SQLDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "boolean";
  }
  greaterThan() {
    return false;
  }
  definition() {
    return "BOOLEAN";
  }
  refValue() {
    return this;
  }
  string() {
    return this.value ? "TRUE" : "FALSE";
  }
  similar(other) {
    return other instanceof _SQLBoolean;
  }
};
var SQLDate = class _SQLDate extends SQLDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  primitive() {
    return "Date";
  }
  refValue() {
    return this;
  }
  definition() {
    return "DATE";
  }
  string() {
    return `'${this.value.toISOString().slice(0, 10)}'`;
  }
  similar(other) {
    return other instanceof _SQLDate;
  }
  greaterThan() {
    return false;
  }
};
var SQLNull = class _SQLNull extends SQLDatatype {
  constructor() {
    super();
  }
  primitive() {
    return "null";
  }
  refValue() {
    return this;
  }
  definition() {
    return "NULL";
  }
  string() {
    return `NULL`;
  }
  greaterThan() {
    return false;
  }
  similar(other) {
    return other instanceof _SQLNull;
  }
};
var SQLNumber = class _SQLNumber extends SQLDatatype {
  constructor(value) {
    super();
    __publicField(this, "value");
    this.value = value;
  }
  similar(other) {
    return other instanceof _SQLNumber;
  }
};
var SQLBigint = class extends SQLNumber {
  constructor(value) {
    super(value);
  }
  primitive() {
    return "bigint";
  }
  refValue() {
    return this;
  }
  definition() {
    return "BIGINT";
  }
  greaterThan(other) {
    if (other instanceof SQLNumber) {
      return true;
    }
    return false;
  }
  string() {
    return `${this.value}`;
  }
};
var SQLInteger = class extends SQLNumber {
  constructor(value) {
    super(value);
  }
  primitive() {
    return "number";
  }
  refValue() {
    return this;
  }
  greaterThan() {
    return false;
  }
  definition() {
    return "INTEGER";
  }
  string() {
    return `${this.value}`;
  }
};
var SQLFloat = class extends SQLNumber {
  constructor(value) {
    super(value);
  }
  primitive() {
    return "number";
  }
  refValue() {
    return this;
  }
  greaterThan(other) {
    if (other instanceof SQLInteger) {
      return true;
    }
    return false;
  }
  definition() {
    return "FLOAT";
  }
  string() {
    if (this.value === Infinity) {
      return "'+infinity'";
    } else if (this.value === -Infinity) {
      return "'-infinity'";
    } else if (Number.isNaN(this.value)) {
      return `'NaN'`;
    } else {
      return `${this.value}`;
    }
  }
};
var SQLString = class _SQLString extends SQLDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  similar(other) {
    return other instanceof _SQLString;
  }
  primitive() {
    return "string";
  }
  string() {
    let value = "";
    const json = JSON.stringify(this.value);
    for (let i = 0; i < json.length; i++) {
      if (i === 0) {
        value += `'`;
      } else if (i === json.length - 1) {
        value += `'`;
      } else {
        value += json[i];
      }
    }
    return value;
  }
};
var SQLText = class extends SQLString {
  constructor(value) {
    super(value);
  }
  refValue() {
    return this;
  }
  definition() {
    return "TEXT";
  }
  greaterThan(other) {
    if (other instanceof SQLString) {
      return true;
    }
    return false;
  }
};
var SQLVarchar = class extends SQLString {
  constructor(value) {
    super(value);
  }
  definition() {
    return "VARCHAR(255)";
  }
  refValue() {
    return this;
  }
  greaterThan() {
    return false;
  }
};
var SQLSerial = class extends SQLNumber {
  constructor(v) {
    super(v);
  }
  primitive() {
    return "number";
  }
  refValue() {
    return new SQLInteger(Number(this.value));
  }
  string() {
    return `${this.value}`;
  }
  definition() {
    return "SERIAL";
  }
  greaterThan() {
    return false;
  }
};

// src/core/export/generators/sql/core/table/column.ts
var SQLColumn = class {
  constructor({ autoGenerated, isKey, isNull, name, isUnique }) {
    __publicField(this, "autoGenerated");
    __publicField(this, "_name");
    __publicField(this, "_datatype");
    __publicField(this, "_isKey");
    __publicField(this, "_isNull");
    __publicField(this, "_unique");
    __publicField(this, "_ref");
    __publicField(this, "_disabled");
    this._name = name;
    this._datatype = new SQLNull();
    this._isKey = isKey;
    this._isNull = isNull;
    this._unique = isUnique;
    this._ref = null;
    this.autoGenerated = autoGenerated;
    this._disabled = false;
  }
  setName(name) {
    this._name = name;
  }
  setUnique(v) {
    this._unique = v;
  }
  setDisabled() {
    this._disabled = true;
  }
  disabled() {
    return this._disabled;
  }
  isUnique() {
    return this._unique;
  }
  isNull() {
    return this._isNull;
  }
  isKey() {
    return this._isKey;
  }
  datatype() {
    return this._datatype;
  }
  setRef(ref) {
    this._ref = ref;
  }
  ref() {
    return this._ref;
  }
  unique() {
    return this._unique;
  }
  equal(other) {
    return this._name.equal(other);
  }
  setIsKey(v) {
    this._isKey = v;
  }
  setIsNull(value) {
    this._isNull = value;
  }
  definition() {
    return `${this._datatype.definition()}`;
  }
  name() {
    return this._name.value();
  }
  setDatatype(table, v) {
    if (v.isSimilar(this._datatype)) {
      this._datatype = this._datatype.greater(v);
      if (v instanceof SQLNull) {
        this._isNull = true;
      }
    } else {
      const route = `${table.name()}.${this.name()}`;
      const type1 = v.primitive();
      const type2 = this._datatype.primitive();
      throw new ChacaError(
        `The values for column '${route}' exist as values of type ${type1} and ${type2}. The data must be uniform`
      );
    }
  }
  similar(other) {
    return other._datatype.isSimilar(this._datatype);
  }
};

// src/core/export/generators/sql/core/table/row-column.ts
var RowColumn = class {
  constructor(table, { column, value }) {
    __publicField(this, "_column");
    __publicField(this, "_value");
    this._column = column;
    this._value = value;
    this._column.setDatatype(table, this._value);
  }
  column() {
    return this._column;
  }
  refValue() {
    return this._value.refValue();
  }
  value() {
    return this._value;
  }
};

// src/core/export/generators/sql/core/table/table.ts
var SQLTable = class {
  constructor(utils2, name, autoGenerated) {
    __publicField(this, "_name");
    __publicField(this, "rows");
    __publicField(this, "autoGenerated");
    __publicField(this, "_columns");
    __publicField(this, "utils");
    this.utils = utils2;
    this.rows = [];
    this._name = name;
    this.autoGenerated = autoGenerated;
    this._columns = [];
  }
  setName(n) {
    this._name = n;
  }
  notAutogeneratedColumns() {
    return this._columns.filter((c) => !c.autoGenerated);
  }
  columns() {
    return this._columns;
  }
  keys() {
    return this._columns.filter((k) => k.isKey());
  }
  autogeneratedColumns() {
    return this._columns.filter((c) => c.autoGenerated);
  }
  deleteAutogeneratedKeys() {
    const autoGenerateds = this.autogeneratedColumns().filter((c) => c.isKey());
    this._columns = this.notAutogeneratedColumns();
    for (const row of this.rows) {
      for (const auto of autoGenerateds) {
        row.deleteColumn(auto);
      }
    }
  }
  deleteColumn(column) {
    this._columns = this._columns.filter((c) => c !== column);
  }
  get(column, index) {
    const row = this.rows[index];
    const found = row.columns().find((c) => c.column() === column);
    if (found) {
      return found.value();
    } else {
      return new SQLNull();
    }
  }
  find(search) {
    const name = new ColumnName(this.utils, search);
    const found = this._columns.filter((c) => !c.autoGenerated && !c.disabled()).find((c) => c.equal(name));
    return found ? found : null;
  }
  length() {
    return this.rows.length;
  }
  equal(name) {
    return this._name.equal(name);
  }
  name() {
    return this._name.value();
  }
  lastKeys() {
    const lastRow = this.rows.at(-1);
    if (lastRow) {
      const keys = this._columns.filter((c) => !c.disabled()).filter((c) => c.isKey());
      return lastRow.columns().filter((c) => keys.includes(c.column()));
    }
    return [];
  }
  addColumn(column, auto) {
    const found = this._columns.filter((c) => {
      return auto ? c.autoGenerated : !c.autoGenerated;
    }).find((c) => c.equal(column._name));
    if (!found) {
      this._columns.push(column);
      return column;
    } else {
      return found;
    }
  }
  addSerial(row, generateId) {
    const serialColumn = this.addColumn(
      new SQLColumn({
        isKey: true,
        isNull: false,
        autoGenerated: true,
        name: new ColumnName(this.utils, "id"),
        isUnique: true
      }),
      true
    );
    const serial = new RowColumn(this, {
      column: serialColumn,
      value: new SQLSerial(this.length())
    });
    row.add(serial);
    if (!generateId.value()) {
      serialColumn.setDisabled();
    }
    return serialColumn;
  }
  addRow(row) {
    this.rows.push(row);
  }
  iterate(func) {
    for (const row of this.rows) {
      const values = [];
      for (const column of this._columns.filter((c) => !c.disabled())) {
        const found = row.columns().find((c) => c.column() === column);
        if (found) {
          values.push(found.value());
        } else {
          values.push(new SQLNull());
        }
      }
      func(values);
    }
  }
};

// src/core/export/generators/sql/core/generators/fill-parent-keys.ts
var FillParentKeys = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
  }
  execute({ parent, nested, table, row }) {
    const keys = parent.lastKeys();
    for (let i = 0; i < keys.length && nested; i++) {
      const key = keys[i];
      const name = new ColumnName(
        this.utils,
        `${parent.name()}_${key.column().name()}`
      );
      const column = table.addColumn(
        new SQLColumn({
          isKey: false,
          isNull: false,
          name,
          autoGenerated: false,
          isUnique: false
        }),
        false
      );
      column.setRef({ table: parent, column: key.column() });
      row.add(
        new RowColumn(table, {
          column,
          value: key.refValue()
        })
      );
    }
  }
};

// src/core/export/generators/sql/core/generators/route.ts
var Route2 = class _Route {
  constructor(init) {
    __publicField(this, "route");
    this.route = init;
  }
  create(name) {
    return new _Route([...this.route, name]);
  }
  clone() {
    return new _Route(this.route);
  }
  string() {
    return this.route.join(".");
  }
  name() {
    return this.route.at(-1);
  }
  parent() {
    return new _Route(this.route.filter((_, i) => i !== this.route.length - 1));
  }
  static from(i) {
    return new _Route(i.split("."));
  }
};

// src/core/export/generators/sql/core/table/row.ts
var SQLRow = class {
  constructor() {
    __publicField(this, "_columns");
    this._columns = [];
  }
  add(column) {
    this._columns.push(column);
  }
  values() {
    return this._columns.map((c) => c.value());
  }
  columns() {
    return this._columns;
  }
  hasKey(...banned) {
    return this._columns.filter((c) => !c.column().disabled() && !banned.includes(c.column())).some((c) => c.column().isKey());
  }
  deleteColumn(column) {
    this._columns = this._columns.filter((c) => c.column() === column);
  }
};

// src/core/export/generators/sql/core/generators/value-creator.ts
var ValueCreator3 = class {
  constructor(utils2, fixer, tables, skipInvalid, generateIds, fillParentKeys) {
    __publicField(this, "utils", utils2);
    __publicField(this, "fixer", fixer);
    __publicField(this, "tables", tables);
    __publicField(this, "skipInvalid", skipInvalid);
    __publicField(this, "generateIds", generateIds);
    __publicField(this, "fillParentKeys", fillParentKeys);
  }
  execute({
    route,
    value,
    current,
    parent,
    nested
  }) {
    const type = Datatype.filter(value, {
      int(value2) {
        return new SQLInteger(value2);
      },
      float(value2) {
        return new SQLFloat(value2);
      },
      bigint(value2) {
        return new SQLBigint(value2);
      },
      boolean(value2) {
        return new SQLBoolean(value2);
      },
      date(value2) {
        return new SQLDate(value2);
      },
      function: () => {
        if (!this.skipInvalid.value()) {
          throw new ChacaError(
            `You can not export a function into a sql file.`
          );
        }
        return null;
      },
      null() {
        return new SQLNull();
      },
      nan(value2) {
        return new SQLFloat(value2);
      },
      symbol: () => {
        if (!this.skipInvalid.value()) {
          throw new ChacaError(`You can not export a Symbol into a sql file.`);
        }
        return null;
      },
      string(value2) {
        if (value2.length < 255) {
          return new SQLVarchar(value2);
        } else {
          return new SQLText(value2);
        }
      },
      regexp(value2) {
        return new SQLText(String(value2));
      },
      undefined() {
        return new SQLNull();
      },
      object: (value2) => {
        if (current) {
          for (const [key, data] of Object.entries(value2)) {
            const datatype = this.execute({
              route: route.create(key),
              current: null,
              parent,
              value: data,
              nested: true
            });
            if (datatype) {
              const columnName = new ColumnName(this.utils, key);
              const column = parent.addColumn(
                new SQLColumn({
                  autoGenerated: false,
                  isKey: this.fixer.isKey(parent._name, columnName),
                  isNull: this.fixer.isNull(parent._name, columnName),
                  name: columnName,
                  isUnique: this.fixer.isUnique(parent._name, columnName)
                }),
                false
              );
              current.row.add(
                new RowColumn(parent, { column, value: datatype })
              );
            }
          }
        } else {
          const tableName = new TableName(this.utils, route.clone());
          const objectTable = this.tables.search(tableName);
          const row = new SQLRow();
          objectTable.addRow(row);
          const serial = objectTable.addSerial(row, this.generateIds);
          for (const [key, data] of Object.entries(value2)) {
            const datatype = this.execute({
              route: route.create(key),
              parent: objectTable,
              value: data,
              current: null,
              nested: true
            });
            if (datatype) {
              const columnName = new ColumnName(this.utils, key);
              const column = objectTable.addColumn(
                new SQLColumn({
                  autoGenerated: false,
                  isKey: this.fixer.isKey(objectTable._name, columnName),
                  isNull: this.fixer.isNull(objectTable._name, columnName),
                  name: columnName,
                  isUnique: this.fixer.isUnique(objectTable._name, columnName)
                }),
                false
              );
              row.add(
                new RowColumn(objectTable, { column, value: datatype })
              );
              if (column.isKey()) {
                serial.setDisabled();
              }
            }
          }
          this.fillParentKeys.execute({
            nested,
            parent,
            row,
            table: objectTable
          });
          if (row.hasKey(serial)) {
            serial.setDisabled();
          }
          if (!row.hasKey()) {
            throw new ChacaError(
              `The table ${objectTable.name()} must have at least 1 PRIMARY KEY`
            );
          }
        }
        return null;
      },
      array: (value2) => {
        const tableName = new TableName(this.utils, route.clone());
        const arrayTable = this.tables.add(
          new SQLTable(this.utils, tableName, true)
        );
        for (const v of value2) {
          const row = new SQLRow();
          arrayTable.addRow(row);
          const serial = arrayTable.addSerial(row, this.generateIds);
          const datatype = this.execute({
            route: route.create("array"),
            parent: arrayTable,
            value: v,
            current: {
              row
            },
            nested: true
          });
          if (datatype) {
            const name = new ColumnName(this.utils, "value");
            const column = arrayTable.addColumn(
              new SQLColumn({
                name,
                autoGenerated: false,
                isKey: false,
                isNull: false,
                isUnique: false
              }),
              false
            );
            row.add(
              new RowColumn(arrayTable, { column, value: datatype })
            );
          }
          this.fillParentKeys.execute({
            table: arrayTable,
            nested,
            parent,
            row
          });
          if (row.hasKey(serial)) {
            serial.setDisabled();
          }
          if (!row.hasKey()) {
            throw new ChacaError(
              `The table ${arrayTable.name()} must have at least 1 PRIMARY KEY`
            );
          }
        }
        return null;
      }
    });
    return type;
  }
};

// src/core/export/generators/sql/core/generators/base.ts
var SQLExtensionGenerator = class {
};
var SQLDataGenerator = class {
  constructor(utils2, generator, validator, fixer, skipInvalid, declarationOnly, generateIds) {
    __publicField(this, "utils", utils2);
    __publicField(this, "generator", generator);
    __publicField(this, "validator", validator);
    __publicField(this, "fixer", fixer);
    __publicField(this, "skipInvalid", skipInvalid);
    __publicField(this, "declarationOnly", declarationOnly);
    __publicField(this, "generateIds", generateIds);
  }
  build({ name: iname, data, tables }) {
    this.validator.execute(data);
    const route = new Route2([iname]);
    const fillParentKeys = new FillParentKeys(this.utils);
    const creator = new ValueCreator3(
      this.utils,
      this.fixer,
      tables,
      this.skipInvalid,
      this.generateIds,
      fillParentKeys
    );
    const table = new SQLTable(
      this.utils,
      new TableName(this.utils, route),
      false
    );
    tables.add(table);
    for (const value of data) {
      creator.execute({
        route,
        parent: table,
        value,
        current: null,
        nested: false
      });
    }
  }
  code(tables) {
    this.fixer.fixTableNames(tables);
    this.fixer.fixColumnNames(tables);
    this.fixer.fixRefFields(tables);
    let code = ``;
    code += this.generator.tables(tables);
    if (!this.declarationOnly.value()) {
      code += this.generator.values(tables);
    }
    return code;
  }
};

// src/core/export/generators/sql/core/generators/postgres.ts
var PostgreSQL = class extends SQLExtensionGenerator {
  constructor(index) {
    super();
    __publicField(this, "index", index);
  }
  values(tables) {
    let code = ``;
    for (const table of tables.tables) {
      const columns = table.columns().filter((c) => !c.disabled()).map((c) => c.name()).join(", ");
      code += `INSERT INTO ${table.name()} (${columns})
`;
      code += `VALUES
`;
      const values = [];
      table.iterate((row) => {
        this.index.push();
        const v = row.map((v2) => v2.string()).join(", ");
        const rowCode = this.index.create(`(${v})`);
        values.push(rowCode);
        this.index.reverse();
      });
      code += `${values.join(",\n")};

`;
    }
    return code;
  }
  tables(tables) {
    let code = ``;
    for (const table of tables.tables) {
      code += `CREATE TABLE ${table.name()} (
`;
      const columns = table.columns().filter((c) => !c.disabled()).map((column) => {
        let code2 = ``;
        this.index.push();
        code2 += this.index.create(`${column.name()} ${column.definition()}`);
        if (column.isKey()) {
          code2 += ` PRIMARY KEY`;
        } else {
          if (column.isUnique()) {
            code2 += ` UNIQUE`;
          }
          if (!column.isNull()) {
            code2 += ` NOT NULL`;
          }
        }
        const ref = column.ref();
        if (ref !== null) {
          const table2 = ref.table.name();
          const col = ref.column.name();
          code2 += ` REFERENCES ${table2}(${col})`;
        }
        this.index.reverse();
        return code2;
      }).join(",\n");
      code += `${columns}
`;
      code += `);

`;
    }
    return code;
  }
};

// src/core/export/generators/sql/core/table/tables.ts
var SQLTables = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "tables");
    this.tables = [];
  }
  search(name) {
    const found = this.tables.find((t) => t.equal(name));
    if (found) {
      return found;
    } else {
      const newTable = new SQLTable(this.utils, name, true);
      this.tables.push(newTable);
      return newTable;
    }
  }
  add(table) {
    const found = this.tables.find((t) => t.equal(table._name));
    if (!found) {
      this.tables.push(table);
      return table;
    } else {
      return found;
    }
  }
  find(search) {
    const found = this.tables.find((t) => t.equal(search));
    return found ? found : null;
  }
};

// src/core/export/generators/sql/core/generators/validator.ts
var DataValidator3 = class {
  execute(data) {
    let valid = true;
    if (Array.isArray(data)) {
      for (const obj of data) {
        if (!(typeof obj === "object" && obj !== null && !Array.isArray(obj))) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }
    if (!valid) {
      throw new ChacaError(
        `In the case of the 'postgresql' format, only an array of objects can be exported.`
      );
    }
  }
};

// src/core/export/generators/sql/core/generators/organizer.ts
var TableOrganizer = class {
  constructor() {
    __publicField(this, "schemas", []);
  }
  execute({ resolver }) {
    for (const schema of resolver.getResolvers()) {
      this.search(schema);
    }
    return this.schemas;
  }
  search(resolver) {
    const refs = resolver.getRefNodes();
    for (const ref of refs) {
      const r = ref.getSchemaRef();
      if (resolver !== r) {
        this.search(r);
      }
    }
    this.add(resolver);
  }
  add(schema) {
    if (!this.schemas.includes(schema)) {
      this.schemas = [...this.schemas, schema];
    }
  }
};

// src/core/export/generators/sql/core/generators/searcher.ts
var Searcher = class {
  constructor(tables) {
    __publicField(this, "tables", tables);
  }
  table({ action, search }) {
    const table = this.tables.find(search);
    if (table) {
      action(table);
    }
  }
  column({ search, action }) {
    const table = this.tables.find(search.table);
    if (table) {
      const column = table.find(search.column);
      if (column) {
        action(column, table);
      }
    }
  }
};

// src/core/export/generators/sql/core/generators/fixer.ts
var TablesFixer = class {
  constructor(utils2, { keys, nulls, refs, uniques }) {
    __publicField(this, "utils", utils2);
    __publicField(this, "refs");
    __publicField(this, "nulls");
    __publicField(this, "keys");
    __publicField(this, "uniques");
    this.keys = keys;
    this.refs = refs;
    this.nulls = nulls;
    this.uniques = uniques;
  }
  fixRefFields(tables) {
    const searcher = new Searcher(tables);
    for (const ref of this.refs) {
      const refRoute = Route2.from(ref.ref);
      const route = Route2.from(ref.column);
      const tableName = new TableName(this.utils, route.parent());
      const refTableName = new TableName(this.utils, refRoute.parent());
      searcher.column({
        search: { table: refTableName, column: refRoute.name() },
        action(refColumn, refTable) {
          searcher.column({
            search: { column: route.name(), table: tableName },
            action(column) {
              column.setRef({ column: refColumn, table: refTable });
            }
          });
        }
      });
    }
  }
  fixColumnNames(tables) {
    for (const table of tables.tables) {
      for (const column of table.columns().filter((c) => !c.disabled())) {
        let stop = false;
        while (!stop) {
          const found = table.columns().filter((c) => !c.disabled()).find((c) => c !== column && c.equal(column._name));
          if (found) {
            const name = new ColumnName(this.utils, `${column.name()}_1`);
            column.setName(name);
          } else {
            stop = true;
          }
        }
      }
    }
  }
  fixTableNames(tables) {
    for (const table of tables.tables) {
      let stop = false;
      while (!stop) {
        const found = tables.tables.find(
          (t) => t !== table && t.equal(table._name)
        );
        if (found) {
          const name = table._name.create("_1");
          table.setName(name);
        } else {
          stop = true;
        }
      }
    }
  }
  isKey(table, name) {
    return this.keys.some((k) => {
      const route = Route2.from(k);
      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());
      return n.equal(name) && t.equal(table);
    });
  }
  isUnique(table, name) {
    return this.uniques.some((k) => {
      const route = Route2.from(k);
      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());
      return n.equal(name) && t.equal(table);
    });
  }
  isNull(table, name) {
    return this.nulls.some((k) => {
      const route = Route2.from(k);
      const n = new ColumnName(this.utils, route.name());
      const t = new TableName(this.utils, route.parent());
      return n.equal(name) && t.equal(table);
    });
  }
};

// src/core/schema/core/default-name.ts
var DEFAULT_SCHEMA_NAME = "Schema";

// src/core/export/generators/sql/value-object/schema-route.ts
var SchemaRouteBuilder = class {
  constructor({ include }) {
    __publicField(this, "include");
    this.include = include;
  }
  execute(route) {
    return route.map((r) => {
      return this.build(r);
    });
  }
  build(r) {
    if (this.include) {
      const save = [DEFAULT_SCHEMA_NAME, ...r.split(".")];
      return save.join(".");
    }
    return r;
  }
};

// src/core/export/generators/sql/value-object/keys.ts
var Keys = class {
  constructor(builder, v) {
    __publicField(this, "values");
    this.values = builder.execute(v);
  }
  value() {
    return this.values;
  }
};

// src/core/export/generators/sql/value-object/nulls.ts
var Nulls = class {
  constructor(builder, v) {
    __publicField(this, "values");
    this.values = builder.execute(v);
  }
  value() {
    return this.values;
  }
};

// src/core/export/generators/sql/value-object/refs.ts
var Refs = class {
  constructor(builder, v) {
    __publicField(this, "values");
    this.values = v.map((r) => {
      return { column: builder.build(r.column), ref: builder.build(r.ref) };
    });
  }
  value() {
    return this.values;
  }
};

// src/core/export/generators/sql/value-object/uniques.ts
var Uniques = class {
  constructor(builder, v) {
    __publicField(this, "values");
    this.values = builder.execute(v);
  }
  value() {
    return this.values;
  }
};

// src/core/export/generators/sql/value-object/generate-ids.ts
var GenerateIds = class {
  constructor(v) {
    __publicField(this, "_value");
    if (v === void 0) {
      this._value = true;
    } else {
      this._value = Boolean(v);
    }
  }
  value() {
    return this._value;
  }
};

// src/core/export/generators/sql/sql-generator.ts
var SQLGenerator = class extends Generator {
  constructor(utils2, format, config) {
    super({ ext: "sql", zip: config.zip });
    __publicField(this, "utils", utils2);
    __publicField(this, "indent");
    __publicField(this, "skipInvalid");
    __publicField(this, "declarationOnly");
    __publicField(this, "keys");
    __publicField(this, "uniques");
    __publicField(this, "nulls");
    __publicField(this, "refs");
    __publicField(this, "generateIds");
    this.indent = new SpaceIndex(config.indent);
    this.skipInvalid = new SkipInvalid(config.skipInvalid);
    this.declarationOnly = new DeclarationOnly(config.declarationOnly);
    this.keys = config.keys ? config.keys : [];
    this.nulls = config.nulls ? config.nulls : [];
    this.refs = config.refs ? config.refs : [];
    this.uniques = config.uniques ? config.uniques : [];
    this.generateIds = new GenerateIds(config.generateIds);
  }
  async dumpRelational({
    resolver,
    filename
  }) {
    const routeBuilder = new SchemaRouteBuilder({ include: false });
    const fixer = new TablesFixer(this.utils, {
      keys: [
        ...resolver.getKeyNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Keys(routeBuilder, this.keys).value()
      ],
      nulls: [
        ...resolver.getPossibleNullNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Nulls(routeBuilder, this.nulls).value()
      ],
      refs: [
        ...resolver.getRefsNodes().map((n) => {
          return {
            column: n.getFieldRoute().string(),
            ref: n.getRefFieldRoute().string()
          };
        }),
        ...new Refs(routeBuilder, this.refs).value()
      ],
      uniques: new Uniques(routeBuilder, this.uniques).value()
    });
    const allTables = new SQLTables(this.utils);
    const organizer = new TableOrganizer();
    const validator = new DataValidator3();
    const postgres = new PostgreSQL(this.indent);
    const generator = new SQLDataGenerator(
      this.utils,
      postgres,
      validator,
      fixer,
      this.skipInvalid,
      this.declarationOnly,
      this.generateIds
    );
    const resolvers = organizer.execute({ resolver });
    for (const r of resolvers) {
      const tables = new SQLTables(this.utils);
      generator.build({
        name: r.getSchemaName(),
        data: await r.resolve(),
        tables,
        generateIds: false
      });
      tables.tables.forEach((t) => allTables.add(t));
    }
    const code = generator.code(allTables);
    return [{ filename: filename.value(), content: code }];
  }
  dump({ data, filename }) {
    const routeBuilder = new SchemaRouteBuilder({ include: true });
    const fixer = new TablesFixer(this.utils, {
      keys: new Keys(routeBuilder, this.keys).value(),
      nulls: new Nulls(routeBuilder, this.nulls).value(),
      refs: new Refs(routeBuilder, this.refs).value(),
      uniques: new Uniques(routeBuilder, this.uniques).value()
    });
    const tables = new SQLTables(this.utils);
    const validator = new DataValidator3();
    const postgres = new PostgreSQL(this.indent);
    const generator = new SQLDataGenerator(
      this.utils,
      postgres,
      validator,
      fixer,
      this.skipInvalid,
      this.declarationOnly,
      this.generateIds
    );
    generator.build({
      name: DEFAULT_SCHEMA_NAME,
      data,
      tables,
      generateIds: false
    });
    const code = generator.code(tables);
    return [{ content: code, filename: filename.value() }];
  }
};

// src/core/export/generators/python/core/union.ts
var UnionDatatypes2 = class {
  constructor() {
    __publicField(this, "datatypes");
    this.datatypes = [];
  }
  setDatatype(dat) {
    const exists = this.datatypes.some((d) => d.equal(dat));
    if (!exists) {
      this.datatypes.push(dat);
    }
  }
  length() {
    return this.datatypes.length;
  }
  declaration(imports) {
    if (this.datatypes.length === 1) {
      const type = this.datatypes[0];
      return `${type.declaration(imports)}`;
    } else {
      imports.add({ from: "typing", modules: ["Union"] });
      const types = this.datatypes.map((d) => d.declaration(imports)).join(", ");
      return `Union[${types}]`;
    }
  }
  equal(union) {
    const [min, max] = union.length() >= this.length() ? [this, union] : [union, this];
    let equal = true;
    for (const datatype of min.datatypes) {
      const exist = max.datatypes.some((d) => d.equal(datatype));
      if (!exist) {
        equal = false;
        break;
      }
    }
    return equal;
  }
};

// src/core/export/generators/python/core/type.ts
var PythonDatatype = class {
};
var PythonString = class _PythonString extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string() {
    return `${JSON.stringify(this.value)}`;
  }
  declaration() {
    return "str";
  }
  equal(other) {
    return other instanceof _PythonString;
  }
};
var PythonFloat = class _PythonFloat extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string() {
    if (this.value === Infinity) {
      return "float('inf')";
    } else if (this.value === -Infinity) {
      return "float('-inf')";
    } else if (Number.isNaN(this.value)) {
      return `float('nan')`;
    }
    return `${this.value}`;
  }
  declaration() {
    return "float";
  }
  equal(other) {
    return other instanceof _PythonFloat;
  }
};
var PythonInt = class _PythonInt extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string() {
    return `${this.value}`;
  }
  declaration() {
    return "int";
  }
  equal(other) {
    return other instanceof _PythonInt;
  }
};
var PythonBoolean = class _PythonBoolean extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string() {
    return this.value ? "True" : "False";
  }
  declaration() {
    return "bool";
  }
  equal(other) {
    return other instanceof _PythonBoolean;
  }
};
var PythonNone = class _PythonNone extends PythonDatatype {
  constructor() {
    super();
  }
  string() {
    return "None";
  }
  declaration() {
    return "None";
  }
  equal(other) {
    return other instanceof _PythonNone;
  }
};
var PythonDate = class _PythonDate extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string(_, imports) {
    imports.add({ from: "datetime", modules: [] });
    return `datetime.datetime.fromisoformat("${this.value.toISOString()}")`;
  }
  declaration(imports) {
    imports.add({ from: "datetime", modules: [] });
    return "datetime.datetime";
  }
  equal(other) {
    return other instanceof _PythonDate;
  }
};
var PythonClass = class _PythonClass extends PythonDatatype {
  constructor(save) {
    super();
    __publicField(this, "fields");
    __publicField(this, "save");
    this.fields = [];
    this.save = save;
  }
  name() {
    return this.save.name();
  }
  string(index, imports) {
    if (this.fields.length === 0) {
      return `${this.name()}()`;
    }
    let code = `${this.name()}(
`;
    index.push();
    const fields = this.fields.map((f) => index.create(`${f.name()}=${f.string(index, imports)}`)).join(",\n");
    code += fields + "\n";
    index.reverse();
    code += index.create(")");
    return code;
  }
  equal(other) {
    if (other instanceof _PythonClass) {
      return true;
    }
    return false;
  }
  declaration() {
    return this.name();
  }
  setFields(fields) {
    for (const field of fields) {
      this.fields.push(field);
    }
    this.save.setFields(fields);
  }
};
var PythonArray = class _PythonArray extends PythonDatatype {
  constructor() {
    super();
    __publicField(this, "datatypes");
    __publicField(this, "values");
    this.values = [];
    this.datatypes = new UnionDatatypes2();
  }
  setValue(d) {
    this.datatypes.setDatatype(d);
    this.values.push(d);
  }
  declaration(imports) {
    imports.add({ from: "typing", modules: ["List"] });
    const types = this.datatypes.declaration(imports);
    return `List[${types}]`;
  }
  string(index, imports) {
    if (this.values.length === 0) {
      return `[]`;
    }
    let code = `[
`;
    index.push();
    code += this.values.map((d) => index.create(d.string(index, imports))).join(",\n") + "\n";
    index.reverse();
    code += index.create("]");
    return code;
  }
  equal(other) {
    if (other instanceof _PythonArray) {
      return other.datatypes.equal(this.datatypes);
    }
    return false;
  }
};
var PythonRegExp = class _PythonRegExp extends PythonDatatype {
  constructor(value) {
    super();
    __publicField(this, "value", value);
  }
  string(_, imports) {
    imports.add({ from: "re", modules: [] });
    return `re.compile(r'${this.value.source}')`;
  }
  declaration(imports) {
    imports.add({ from: "re", modules: [] });
    return "re.Pattern";
  }
  equal(other) {
    return other instanceof _PythonRegExp;
  }
};
var PythonClassField = class {
  constructor(save, datatype) {
    __publicField(this, "save");
    __publicField(this, "datatype");
    this.datatype = datatype;
    this.save = save;
  }
  name() {
    return this.save.name();
  }
  string(index, imports) {
    return this.datatype.string(index, imports);
  }
  definition(imports) {
    return this.datatype.declaration(imports);
  }
};

// src/core/export/generators/python/core/classes.ts
var SaveClassField2 = class {
  constructor(name, datatype) {
    __publicField(this, "_name");
    __publicField(this, "datatypes");
    __publicField(this, "_optional");
    this.datatypes = new UnionDatatypes2();
    this.datatypes.setDatatype(datatype);
    this._name = name;
    this._optional = false;
  }
  optional() {
    return this._optional;
  }
  setDatatype(d) {
    if (d instanceof PythonNone) {
      this._optional = true;
    } else {
      this.datatypes.setDatatype(d);
    }
  }
  name() {
    return this._name.string();
  }
  equal(other) {
    return other._name.equal(this._name);
  }
  declaration(imports) {
    imports.add({ from: "typing", modules: ["TypedDict"] });
    return this.datatypes.declaration(imports);
  }
};
var SavePythonClass = class {
  constructor(name) {
    __publicField(this, "_name");
    __publicField(this, "fields");
    this.fields = [];
    this._name = name;
  }
  setFields(fields) {
    const founds = [];
    for (const field of fields) {
      const found = this.fields.find((f) => f === field.save);
      if (found) {
        found.setDatatype(field.datatype);
        founds.push(found);
      }
    }
    for (const field of this.fields) {
      if (!founds.includes(field)) {
        field.setDatatype(new PythonNone());
      }
    }
  }
  equal(other) {
    return other._name.equal(this._name);
  }
  name() {
    return this._name.string();
  }
  search(field) {
    const found = this.fields.find((f) => f.equal(field));
    if (found) {
      return found;
    } else {
      this.fields.push(field);
      return field;
    }
  }
  definition(index, imports) {
    imports.add({ from: "typing", modules: ["TypedDict"] });
    let code = `class ${this.name()}(TypedDict):
`;
    index.push();
    code += this.fields.map((f) => {
      if (f.optional()) {
        imports.add({ from: "typing", modules: ["Optional"] });
        return index.create(
          `${f.name()}: Optional[${f.datatypes.declaration(imports)}]`
        );
      } else {
        return index.create(
          `${f.name()}: ${f.datatypes.declaration(imports)}`
        );
      }
    }).join("\n");
    index.reverse();
    return code;
  }
};
var PythonClasses = class {
  constructor() {
    __publicField(this, "classes");
    this.classes = [];
  }
  search(name) {
    const create = new SavePythonClass(name);
    const found = this.classes.find((c) => c.equal(create));
    if (found) {
      return found;
    } else {
      this.classes.push(create);
      return create;
    }
  }
  definition(index, imports) {
    let code = ``;
    code += this.classes.reverse().map((c) => {
      return `${c.definition(index, imports)}
`;
    }).join("\n");
    return code;
  }
};

// src/core/export/generators/python/core/import.ts
var Imports3 = class {
  constructor() {
    __publicField(this, "imports");
    this.imports = [];
  }
  add(imp) {
    const result = [];
    let found = false;
    for (let i = 0; i < this.imports.length; i++) {
      const save = this.imports[i];
      if (save.from === imp.from) {
        found = true;
        const newModules = [...save.modules];
        for (const module of imp.modules) {
          const exist = newModules.includes(module);
          if (!exist) {
            newModules.push(module);
          }
        }
        save.modules = newModules;
      }
      result.push(save);
    }
    if (!found) {
      result.push(imp);
    }
    this.imports = result;
  }
  string() {
    let code = ``;
    this.imports.forEach((i) => {
      if (i.modules.length > 0) {
        code += `from ${i.from} import ${i.modules.join(", ")}
`;
      } else {
        code += `import ${i.from}
`;
      }
    });
    return code;
  }
};

// src/core/export/generators/python/core/route.ts
var Route3 = class _Route {
  constructor(init) {
    __publicField(this, "route");
    this.route = init;
  }
  create(r) {
    return new _Route([...this.route, r]);
  }
  string() {
    return this.route.join(".");
  }
  clone() {
    return new _Route(this.route);
  }
  equal(other) {
    return other.route.join(".") === this.route.join(".");
  }
};

// src/core/export/generators/python/core/names.ts
var PythonClassName = class {
  constructor(utils2, route) {
    __publicField(this, "utils", utils2);
    __publicField(this, "route", route);
  }
  equal(other) {
    return other.route.equal(this.route);
  }
  string() {
    return this.utils.pascalCase(this.route.string());
  }
};
var PythonClassFieldName = class {
  constructor(utils2, _name) {
    __publicField(this, "utils", utils2);
    __publicField(this, "_name", _name);
  }
  equal(other) {
    return other._name === this._name;
  }
  string() {
    return this.utils.snakeCase(this._name);
  }
};

// src/core/export/generators/python/core/value-creator.ts
var ValueCreator4 = class {
  constructor(utils2, classes, skipInvalid) {
    __publicField(this, "utils", utils2);
    __publicField(this, "classes", classes);
    __publicField(this, "skipInvalid", skipInvalid);
  }
  execute({ route, value }) {
    const type = Datatype.filter(value, {
      string(value2) {
        return new PythonString(value2);
      },
      int(value2) {
        return new PythonInt(value2);
      },
      float(value2) {
        return new PythonFloat(value2);
      },
      nan(value2) {
        return new PythonFloat(value2);
      },
      undefined() {
        return new PythonNone();
      },
      boolean(value2) {
        return new PythonBoolean(value2);
      },
      array: (value2) => {
        const array = new PythonArray();
        for (const v of value2) {
          const datatype = this.execute({ route: route.clone(), value: v });
          if (datatype) {
            array.setValue(datatype);
          }
        }
        return array;
      },
      null() {
        return new PythonNone();
      },
      date(value2) {
        return new PythonDate(value2);
      },
      regexp(value2) {
        return new PythonRegExp(value2);
      },
      object: (value2) => {
        const classname = new PythonClassName(this.utils, route);
        const save = this.classes.search(classname);
        const object = new PythonClass(save);
        const fields = [];
        for (const [key, data] of Object.entries(value2)) {
          const fieldname = new PythonClassFieldName(this.utils, key);
          const datatype = this.execute({
            route: route.create(key),
            value: data
          });
          if (datatype) {
            const saveField = save.search(
              new SaveClassField2(fieldname, datatype)
            );
            const field = new PythonClassField(saveField, datatype);
            fields.push(field);
          }
        }
        object.setFields(fields);
        return object;
      },
      bigint(value2) {
        return new PythonInt(value2);
      },
      function: () => {
        if (this.skipInvalid.value()) {
          return null;
        }
        throw new ChacaError(
          `You can not export a function into a python file.`
        );
      },
      symbol: () => {
        if (this.skipInvalid.value()) {
          return null;
        }
        throw new ChacaError(`You can not export a Symbol into a python file.`);
      }
    });
    return type;
  }
};

// src/core/export/generators/python/core/creator.ts
var PythonCodeCreator = class {
  constructor(utils2, skipInvalid, indent, declarationOnly) {
    __publicField(this, "utils", utils2);
    __publicField(this, "skipInvalid", skipInvalid);
    __publicField(this, "indent", indent);
    __publicField(this, "declarationOnly", declarationOnly);
  }
  execute({ data, name }) {
    const imports = new Imports3();
    const classes = new PythonClasses();
    const route = new Route3([name]);
    const creator = new ValueCreator4(this.utils, classes, this.skipInvalid);
    const datatype = creator.execute({ route, value: data });
    const classesDef = classes.definition(this.indent, imports);
    if (datatype) {
      const declaration = datatype.declaration(imports);
      const content = datatype.string(this.indent, imports);
      const imp = imports.string();
      let code = ``;
      if (imp !== "") code += `${imports.string()}
`;
      if (classesDef !== "") code += `${classesDef}
`;
      if (!this.declarationOnly.value()) {
        code += `data: ${declaration} = ${content}
`;
      }
      return code;
    } else {
      return ``;
    }
  }
};

// src/core/export/generators/python/python-generator.ts
var PythonGenerator = class extends Generator {
  constructor(utils2, config) {
    super({ ext: "py", zip: config.zip });
    __publicField(this, "separate");
    __publicField(this, "creator");
    this.separate = Boolean(config.separate);
    this.creator = new PythonCodeCreator(
      utils2,
      new SkipInvalid(config.skipInvalid),
      new SpaceIndex(config.indent),
      new DeclarationOnly(config.declarationOnly)
    );
  }
  dump({ filename, data }) {
    const code = this.creator.execute({
      data,
      name: filename.value()
    });
    return [{ filename: filename.value(), content: code }];
  }
  async dumpRelational({
    filename,
    resolver
  }) {
    if (this.separate) {
      const result = [];
      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: await r.resolve(),
          name: r.getSchemaName()
        });
        const filename2 = new Filename(r.getSchemaName());
        result.push({ content: code, filename: filename2.value() });
      }
      return result;
    } else {
      const code = this.creator.execute({
        data: await resolver.resolve(),
        name: filename.value()
      });
      return [{ content: code, filename: filename.value() }];
    }
  }
};

// src/core/export/resolvers/generator-filter/generator-filter.ts
var GeneratorFilter = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
  }
  execute(format) {
    let gen;
    if (format === "json") {
      gen = new JsonGenerator({});
    } else if (format === "javascript") {
      gen = new JavascriptGenerator(this.utils, {});
    } else if (format === "csv") {
      gen = new CsvGenerator({});
    } else if (format === "java") {
      gen = new JavaGenerator(this.utils, {});
    } else if (format === "typescript") {
      gen = new TypescriptGenerator(this.utils, {});
    } else if (format === "yaml") {
      gen = new YamlGenerator({});
    } else if (format === "postgresql") {
      gen = new SQLGenerator(this.utils, format, {});
    } else if (format === "python") {
      gen = new PythonGenerator(this.utils, {});
    } else if (typeof format === "object" && format !== null) {
      if (format.ext === "json") {
        gen = new JsonGenerator(format);
      } else if (format.ext === "csv") {
        gen = new CsvGenerator(format);
      } else if (format.ext === "java") {
        gen = new JavaGenerator(this.utils, format);
      } else if (format.ext === "javascript") {
        gen = new JavascriptGenerator(this.utils, format);
      } else if (format.ext === "postgresql") {
        gen = new SQLGenerator(this.utils, format.ext, format);
      } else if (format.ext === "python") {
        gen = new PythonGenerator(this.utils, format);
      } else if (format.ext === "typescript") {
        gen = new TypescriptGenerator(this.utils, format);
      } else if (format.ext === "yaml") {
        gen = new YamlGenerator(format);
      } else {
        throw new ChacaError(`Format '${format}' invalid for exportation`);
      }
    } else {
      throw new ChacaError(`Format '${format}' invalid for exportation`);
    }
    return gen;
  }
};

// src/core/export/value-object/format.ts
var FileFormat = class {
  constructor(format) {
    __publicField(this, "_value");
    if (typeof format === "string") {
      this._value = format;
    } else if (typeof format === "object" && format !== null) {
      if (format.ext === "json") {
        this._value = this.validateJson(format);
      } else if (format.ext === "csv") {
        this._value = this.validateCsv(format);
      } else if (format.ext === "java") {
        this._value = this.validateJava(format);
      } else if (format.ext === "javascript") {
        this._value = this.validateJs(format);
      } else if (format.ext === "postgresql") {
        this._value = this.validatePostgresql(format);
      } else if (format.ext === "python") {
        this._value = this.validatePython(format);
      } else if (format.ext === "typescript") {
        this._value = this.validateTs(format);
      } else if (format.ext === "yaml") {
        this._value = this.validateYaml(format);
      } else {
        throw new ChacaError(`Invalid format for exportation`);
      }
    } else {
      throw new ChacaError(`Invalid format for exportation`);
    }
    this._value = format;
  }
  validateYaml(format) {
    const config = { ext: "yaml" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validateTs(format) {
    const config = { ext: "typescript" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validatePython(format) {
    const config = { ext: "python" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validatePostgresql(format) {
    const config = { ext: "postgresql" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validateJs(format) {
    const config = { ext: "javascript" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validateCsv(format) {
    const config = { ext: "csv" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validateJson(format) {
    const config = {
      ext: "json"
    };
    if (typeof format === "object" && format !== null) {
      config.separate = Boolean(format.separate);
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  validateJava(format) {
    const config = { ext: "java" };
    if (typeof format === "object" && format !== null) {
      config.zip = Boolean(format.zip);
    }
    return config;
  }
  value() {
    return this._value;
  }
};

// src/core/export/value-object/name.ts
var FileName = class {
  constructor(name) {
    __publicField(this, "_value");
    if (typeof name !== "string" || name.trim() === "") {
      throw new ChacaError("A file name is necesary to export your data");
    }
    this._value = name;
  }
  value() {
    return this._value;
  }
};

// src/core/export/value-object/verbose.ts
var Verbose = class {
  constructor(verbose) {
    __publicField(this, "_value", false);
    if (typeof verbose === "boolean") {
      this._value = verbose;
    }
  }
  value() {
    return this._value;
  }
};

// src/core/export/resolvers/dump/value-object/filename.ts
var ExtensionFilename = class {
  constructor(name, ext) {
    __publicField(this, "_value");
    this._value = `${name}.${ext}`;
  }
  value() {
    return this._value;
  }
};

// src/core/export/resolvers/dump/dump.ts
var DumpResolver = class {
  constructor(utils2, datatypeModule, filter, config) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "filter", filter);
    __publicField(this, "format");
    __publicField(this, "filename");
    __publicField(this, "verbose");
    this.format = new FileFormat(config.format);
    this.filename = new FileName(config.filename);
    this.verbose = new Verbose(config.verbose);
  }
  data(data) {
    const generator = this.filter.execute(this.format.value());
    const result = generator.dump({
      data,
      filename: new Filename(this.filename.value())
    });
    return result.map((r) => {
      return {
        content: r.content,
        filename: new ExtensionFilename(r.filename, generator.ext).value()
      };
    });
  }
  async relational(schemas) {
    const generator = this.filter.execute(this.format.value());
    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas,
      verbose: this.verbose.value()
    });
    const result = await generator.dumpRelational({
      resolver,
      filename: new Filename(this.filename.value())
    });
    return result.map((r) => {
      return {
        content: r.content,
        filename: new ExtensionFilename(r.filename, generator.ext).value()
      };
    });
  }
};

// src/core/export/writers/unavailable/unavailable-file-writer.ts
var UnavailableFileWriter = class {
  write() {
    throw new ChacaError(
      "'export' writes files to the filesystem and is not available in this environment. Use 'transform' to get the serialized file contents in memory instead."
    );
  }
};

// src/core/schema-resolver/value-object/schema-count-executor.ts
var SchemaCountExecutor = class {
  static create({
    value,
    name,
    singleSchema
  }) {
    if (typeof value === "number") {
      return new IntegerSchemaCount(value);
    } else if (typeof value === "function") {
      return new FunctionSchemaCount(value);
    } else {
      throw new ChacaError(
        singleSchema ? `You have to specify a number of documents to create the schema` : `You have to specify a number of documents to create the schema '${name}'`
      );
    }
  }
};
var IntegerSchemaCount = class extends SchemaCountExecutor {
  constructor(limit) {
    super();
    __publicField(this, "limit", limit);
  }
  value() {
    return new Promise((resolve) => resolve(this.limit));
  }
};
var FunctionSchemaCount = class extends SchemaCountExecutor {
  constructor(func) {
    super();
    __publicField(this, "func", func);
  }
  async value(props) {
    const value = await this.func({ store: props.store });
    return value;
  }
};

// src/core/schema-resolver/value-object/schema-count.ts
var SchemaCount = class {
  constructor({ singleSchema, name }) {
    __publicField(this, "singleSchema");
    __publicField(this, "name");
    __publicField(this, "_value");
    __publicField(this, "observers");
    this.singleSchema = singleSchema;
    this.name = name;
    this._value = null;
    this.observers = [];
  }
  setValue(v) {
    if (typeof v === "number") {
      if (v >= 0) {
        this._value = v;
        for (const o of this.observers) {
          o(v);
        }
      } else {
        throw new ChacaError(
          this.singleSchema ? `The number of documents to generate for the schema cannot be a negative value` : `The number of documents to generate for schema '${this.name}' cannot be a negative value (${v})`
        );
      }
    } else {
      throw new ChacaError(
        this.singleSchema ? `You have to specify a number of documents to create the schema` : `You have to specify a number of documents to create the schema '${this.name}'`
      );
    }
  }
  value() {
    return this._value;
  }
  register(fun) {
    this.observers.push(fun);
  }
};

// src/core/schema/schema.ts
var Schema = class {
  constructor(input, utils2, datatypeModule, fileWriter = new UnavailableFileWriter()) {
    __publicField(this, "input", input);
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "fileWriter", fileWriter);
  }
  /**
   * Generates and serializes schema data as a specific file format
   *
   * @param documents number of documents that you want to create
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   */
  async transform(documents, props) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props
    );
    const data = await this.array(documents);
    return resolver.data(data);
  }
  /**
   * Generate and export the schema documents
   * @param documents number of documents that you want to create
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @returns Promise<string[]>
   */
  async export(documents, config) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
      this.fileWriter,
      config
    );
    const routes = await resolver.relational([
      { name: config.filename, documents, schema: this }
    ]);
    return routes;
  }
  /**
   * Adapts the CLI's uniform export call to the schema `export` signature.
   * @internal
   */
  exportFromCli(documents, config) {
    return this.export(documents, config);
  }
  /**
   * Generate a schema document
   */
  async object() {
    const result = await this.array(1);
    return result[0];
  }
  /**
   * Generate an array of schema documents
   * @param countDocuments number of documents that you want to create
   */
  array(countDocuments) {
    const name = DEFAULT_SCHEMA_NAME;
    const schemaToResolve = new SchemaResolver(
      this.utils,
      this.datatypeModule,
      {
        name,
        input: this.input,
        count: new SchemaCount({
          name,
          singleSchema: true
        }),
        countExecutor: SchemaCountExecutor.create({
          value: countDocuments,
          singleSchema: true,
          name
        }),
        schemaIndex: 0,
        consoleVerbose: false
      }
    );
    return schemaToResolve.resolve();
  }
};

// src/core/schema-resolver/value-object/array.ts
var FieldIsArray = class {
  constructor(isArray) {
    __publicField(this, "_value");
    __publicField(this, "valid", true);
    this._value = this.validate(isArray);
  }
  value() {
    return this._value;
  }
  can() {
    return typeof this._value === "number" && this._value > 0 || typeof this._value === "function";
  }
  isValid() {
    return this.valid;
  }
  validate(isArray) {
    let value;
    if (typeof isArray === "number") {
      value = isArray;
    } else if (typeof isArray === "function") {
      value = isArray;
    } else if (typeof isArray === "object" && isArray !== null) {
      const min = typeof isArray.min === "number" ? isArray.min : void 0;
      const max = typeof isArray.max === "number" ? isArray.max : void 0;
      value = { min, max };
    } else if (typeof isArray === "undefined") {
      value = void 0;
    } else {
      value = void 0;
      this.valid = false;
    }
    return value;
  }
};

// src/core/schema-resolver/value-object/possible-null.ts
var FieldPossibleNull = class {
  constructor(possible) {
    __publicField(this, "_value");
    __publicField(this, "valid", true);
    this._value = this.validate(possible);
  }
  value() {
    return this._value;
  }
  isValid() {
    return this.valid;
  }
  can() {
    return typeof this._value === "number" && this._value > 0 || this._value === true || typeof this._value === "function";
  }
  validate(pos) {
    let value;
    if (typeof pos === "number") {
      value = pos;
    } else if (typeof pos === "function") {
      value = pos;
    } else if (typeof pos === "boolean") {
      value = pos;
    } else if (typeof pos === "undefined") {
      value = void 0;
    } else {
      value = 0;
      this.valid = false;
    }
    return value;
  }
};

// src/core/schema-resolver/value-object/input-key.ts
var InputKeyField = class {
  constructor(route, schema) {
    __publicField(this, "_resolver");
    let type;
    if (schema.field instanceof RefField) {
      type = new RefFieldResolver(schema.field.refField);
    } else if (schema.field instanceof SequenceField) {
      type = new SequenceFieldResolver(schema.field.config);
    } else if (typeof schema.field === "function") {
      type = new CustomFieldResolver(schema.field);
    } else {
      throw new ChacaError(
        `The field '${route.string()}' has a incorrect type for key definition`
      );
    }
    this._resolver = new KeyFieldResolver(type);
  }
  resolver() {
    return this._resolver;
  }
};

// src/core/schema-resolver/value-object/schema-input.ts
var SchemaToResolve = class {
  constructor(route, obj) {
    __publicField(this, "_schema");
    this._schema = this.validate(route, obj);
  }
  value() {
    return this._schema;
  }
  filter({ config, route }) {
    let returnResolver;
    if (config) {
      if (typeof config === "function") {
        returnResolver = new CustomFieldResolver(config);
      } else {
        if (config instanceof Schema) {
          returnResolver = new MixedFieldResolver(config);
        } else if (config instanceof PickField) {
          returnResolver = new PickFieldResolver(config.values);
        } else if (config instanceof RefField) {
          returnResolver = new RefFieldResolver(config.refField);
        } else if (config instanceof SequentialField) {
          returnResolver = new SequentialFieldResolver(
            config.values,
            config.config
          );
        } else if (config instanceof ProbabilityField) {
          returnResolver = new ProbabilityFieldResolver(config.values);
        } else if (config instanceof KeyField) {
          returnResolver = new InputKeyField(route, config).resolver();
        } else if (config instanceof SequenceField) {
          returnResolver = new SequenceFieldResolver(config.config);
        } else if (config instanceof EnumField) {
          returnResolver = new EnumFieldResolver(config.values);
        } else {
          throw new ChacaError(`${config} is not a valid field type`);
        }
      }
    } else {
      throw new ChacaError(`${config} is not a valid field type`);
    }
    return returnResolver;
  }
  validate(route, obj) {
    const schemaToSave = {};
    for (const [key, field] of Object.entries(obj)) {
      const resolverObject = {
        isArray: new FieldIsArray(),
        possibleNull: new FieldPossibleNull()
      };
      if (typeof field === "object" && field !== null && "type" in field) {
        const fieldObject = field;
        const type = this.filter({ config: fieldObject.type, route });
        resolverObject.type = type;
        const configArray = new FieldIsArray(fieldObject.isArray);
        const configNull = new FieldPossibleNull(fieldObject.possibleNull);
        resolverObject.possibleNull = configNull;
        resolverObject.isArray = configArray;
      } else {
        const type = this.filter({ config: field, route });
        resolverObject.type = type;
      }
      schemaToSave[key] = resolverObject;
    }
    return schemaToSave;
  }
};

// src/core/input-tree/chaca-input-tree.ts
var ChacaInputTree = class {
  constructor(utils2, datatypeModule, { name, schemaToResolve, schemasStore, count }) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "nodes");
    __publicField(this, "schemasStore");
    __publicField(this, "name");
    __publicField(this, "count");
    // ref nodes
    __publicField(this, "refToResolve");
    __publicField(this, "nullMapper");
    __publicField(this, "arrayMapper");
    __publicField(this, "resolverValidator");
    this.nullMapper = new PossibleNullMapper(this.utils);
    this.arrayMapper = new IsArrayMapper(this.datatypeModule);
    this.resolverValidator = new ResolverValidator();
    this.schemasStore = schemasStore;
    this.name = name;
    this.count = count;
    this.refToResolve = [];
    this.nodes = [];
    for (const [key, obj] of Object.entries(
      schemaToResolve.value()
    )) {
      const route = new NodeRoute([this.name, key]);
      const newNode = this.createNodeByType({
        actualRoute: route,
        object: obj
      });
      this.insertNode(newNode);
    }
  }
  getRefNodes() {
    return this.refToResolve;
  }
  getFields() {
    return this.nodes;
  }
  createNodeByType({
    actualRoute,
    object
  }) {
    let returnNode;
    this.resolverValidator.execute({
      route: actualRoute.string(),
      config: object
    });
    const possibleNull = this.nullMapper.execute({
      route: actualRoute.string(),
      value: object.possibleNull,
      countDocs: this.count
    });
    const isArray = this.arrayMapper.execute({
      route: actualRoute.string(),
      value: object.isArray
    });
    if (object.type instanceof CustomFieldResolver) {
      returnNode = new CustomValueNode(
        actualRoute,
        isArray,
        possibleNull,
        object.type.fun
      );
    } else if (object.type instanceof PickFieldResolver) {
      const values = new Values({
        route: actualRoute.string(),
        values: object.type.values.values
      });
      const count = Count.create(this.datatypeModule, {
        count: object.type.values.count,
        options: values,
        route: actualRoute.string()
      });
      returnNode = new PickValueNode(
        this.datatypeModule,
        actualRoute,
        isArray,
        possibleNull,
        count,
        values
      );
    } else if (object.type instanceof ProbabilityFieldResolver) {
      const options = new ChancesArray(this.utils, {
        options: object.type.values,
        route: actualRoute.string()
      });
      returnNode = new ProbabilityValueNode(
        actualRoute,
        isArray,
        possibleNull,
        options
      );
    } else if (object.type instanceof EnumFieldResolver) {
      returnNode = new EnumValueNode(
        this.utils,
        actualRoute,
        isArray,
        possibleNull,
        object.type.array
      );
    } else if (object.type instanceof MixedFieldResolver) {
      const node = new MixedValueNode(actualRoute, isArray, possibleNull);
      this.createSubNodes({
        actualRoute,
        parentNode: node,
        schema: object.type.schema
      });
      returnNode = node;
    } else if (object.type instanceof RefFieldResolver) {
      const newRefNode = new RefValueNode(
        this.utils,
        actualRoute,
        isArray,
        possibleNull,
        object.type.refField,
        this.schemasStore
      );
      this.refToResolve.push(newRefNode);
      returnNode = newRefNode;
    } else if (object.type instanceof SequentialFieldResolver) {
      returnNode = new SequentialValueNode(
        actualRoute,
        possibleNull,
        object.type.valuesArray,
        object.type.config
      );
    } else if (object.type instanceof SequenceFieldResolver) {
      const step = new Step({
        route: actualRoute.string(),
        value: object.type.getConfig().step
      });
      const startsWith = new StartsWith({
        value: object.type.getConfig().starsWith,
        route: actualRoute.string()
      });
      returnNode = new SequenceValueNode(
        actualRoute,
        possibleNull,
        startsWith,
        step
      );
    } else if (object.type instanceof KeyFieldResolver) {
      if (object.type.type instanceof SequenceFieldResolver) {
        const step = new Step({
          route: actualRoute.string(),
          value: object.type.type.getConfig().step
        });
        const startsWith = new StartsWith({
          value: object.type.type.getConfig().starsWith,
          route: actualRoute.string()
        });
        const schemaValueNode = new SequenceValueNode(
          actualRoute,
          new NotNull(),
          startsWith,
          step
        );
        returnNode = new KeyValueNode(actualRoute, schemaValueNode);
      } else if (object.type.type instanceof CustomFieldResolver) {
        const customNode = new CustomValueNode(
          actualRoute,
          new NotArray(),
          new NotNull(),
          object.type.type.fun
        );
        returnNode = new KeyValueNode(actualRoute, customNode);
      } else {
        const refValueNode = new RefValueNode(
          this.utils,
          actualRoute,
          new NotArray(),
          new NotNull(),
          object.type.type.refField,
          this.schemasStore
        );
        this.refToResolve.push(refValueNode);
        returnNode = new KeyValueNode(actualRoute, refValueNode);
      }
    } else {
      throw new ChacaError(
        `The field '${actualRoute.string()}' have an incorrect resolver`
      );
    }
    return returnNode;
  }
  createSubNodes({
    actualRoute,
    parentNode,
    schema
  }) {
    const object = new SchemaToResolve(actualRoute, schema.input);
    for (const [key, obj] of Object.entries(object.value())) {
      const fieldRoute = actualRoute.create(key);
      const newNode = this.createNodeByType({
        actualRoute: fieldRoute,
        object: obj
      });
      parentNode.insertNode(newNode);
    }
  }
  insertNode(node) {
    this.nodes.push(node);
  }
  checkIfFieldExists(fieldTreeRoute) {
    if (this.name === fieldTreeRoute[0]) {
      let exists = false;
      for (let i = 0; i < this.nodes.length && !exists; i++) {
        if (this.nodes[i].getName() === fieldTreeRoute[1]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(2);
          const found = this.nodes[i].checkIfFieldExists(
            routeWithoutFirstElement
          );
          if (!found) {
            break;
          } else {
            exists = true;
          }
        }
      }
      return exists;
    } else {
      return false;
    }
  }
  searchRefNodes() {
    this.refToResolve.forEach((r) => r.searchSchemaRef());
  }
  getPossibleNullNodes() {
    const nodes = [];
    this.nodes.forEach((n) => {
      if (n.isPossibleNull()) {
        nodes.push(n);
      }
      if (n instanceof MixedValueNode) {
        const subNodes = n.getPossibleNullNodes();
        subNodes.forEach((s) => nodes.push(s));
      }
    });
    return nodes;
  }
  getKeyFields() {
    const keys = [];
    this.nodes.forEach((n) => {
      if (n instanceof KeyValueNode) {
        keys.push(n);
      } else if (n instanceof MixedValueNode) {
        const subKeys = n.getKeyFields();
        subKeys.forEach((k) => keys.push(k));
      }
    });
    return keys;
  }
};

// src/core/result-tree/chaca-result-tree.ts
var ChacaResultTree = class {
  constructor(name) {
    __publicField(this, "name", name);
    __publicField(this, "documents", []);
  }
  getDocumentByIndex(index) {
    return this.documents[index];
  }
  insertDocument(document) {
    this.documents.push(document);
  }
  async getAllValuesByNodeRoute(fieldTreeRoute, config) {
    const whereFunction = config.where;
    let filterDocuemnts;
    if (whereFunction) {
      filterDocuemnts = [];
      for (const d of this.documents) {
        const isValid = d !== config.omitDocument && await whereFunction(d.getDocumentObject());
        if (isValid) {
          filterDocuemnts.push(d);
        }
      }
    } else {
      filterDocuemnts = this.documents;
    }
    const allNodes = [];
    filterDocuemnts.forEach((d) => {
      const foundNode = d.getNodeByNodeRoute(fieldTreeRoute);
      allNodes.push(foundNode);
    });
    return allNodes;
  }
  getAllRefValuesByNodeRoute({
    search,
    caller
  }) {
    const allValues = [];
    this.documents.forEach((d) => {
      const found = d.getRefValueByNodeRoute({
        search: search.pop(),
        caller
      });
      allValues.push({ resultNode: found, document: d });
    });
    return allValues;
  }
  getDocumentsArray() {
    return this.documents.map((d) => d.getDocumentObject());
  }
  getDocuments() {
    return this.documents;
  }
};

// src/core/schema-store/schema-store.ts
var SchemaStore = class {
  constructor(schemas) {
    __publicField(this, "schemas", schemas);
  }
  validateFieldToGet(route, caller) {
    if (typeof route !== "string") {
      throw new ChacaError(
        `From '${caller}'. The field to get must be an array separated by points`
      );
    }
    return route.split(".");
  }
  get(index) {
    return this.schemas[index];
  }
  setInjectedSchemas(array) {
    this.schemas = array;
  }
  getSchemasResolvers() {
    return this.schemas;
  }
  async value({
    caller,
    config,
    route
  }) {
    const routeArray = this.validateFieldToGet(route, caller.string());
    let foundSchema = false;
    let values = [];
    for (let i = 0; i < this.schemas.length && !foundSchema; i++) {
      const currentSchema = this.schemas[i];
      if (currentSchema.getSchemaName() === routeArray[0]) {
        if (currentSchema === config.omitResolver) {
          throw new ChacaError(
            `From '${caller.string()}'. You are trying to access the documents of the current schema, if you want this use the store.currentDocuments method`
          );
        }
        if (currentSchema.dangerCyclic()) {
          throw new CyclicAccessDataError(
            `From '${caller.string()}', you are trying to access '${currentSchema.getSchemaName()}' when this one is being created`
          );
        }
        await currentSchema.buildTrees(caller);
        values = await currentSchema.getAllValuesByRoute(
          routeArray.slice(1),
          config
        );
        foundSchema = true;
      }
    }
    return values;
  }
};

// src/core/schema-resolver/core/sub-fields-creator.ts
var SubFieldsCreator = class {
  constructor(creator, fillSolution) {
    __publicField(this, "creator", creator);
    __publicField(this, "fillSolution", fillSolution);
  }
  async execute({ field, indexDoc, node }) {
    if (field instanceof MixedValueNode && node instanceof MixedFieldNode) {
      const subFields = field.getFields();
      for (const subField of subFields) {
        const solution = await this.creator.execute({
          field: subField,
          indexDoc
        });
        node.insertNode(solution);
        await this.fillSolution.execute({
          indexDoc,
          input: subField,
          solution
        });
      }
    }
  }
};

// src/core/result-tree/classes/array/index.ts
var ArrayResultNode = class extends FieldNode {
  constructor({ name, limit }) {
    super(name);
    __publicField(this, "nodes", []);
    __publicField(this, "limit");
    this.limit = limit;
  }
  value() {
    return this.nodes.map((n) => n.value());
  }
  insertNode(n) {
    this.nodes.push(n);
  }
  getNodeByRoute(fieldTreeRoute) {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`
      );
    }
  }
  getRefValueByNodeRoute({
    baseSearch,
    caller
  }) {
    throw new NotExistRefFieldError(caller.string(), baseSearch.string());
  }
};

// src/core/schema-resolver/core/solution-creator.ts
var SolutionCreator = class {
  constructor(schemasStore, resultTree, resolver) {
    __publicField(this, "schemasStore", schemasStore);
    __publicField(this, "resultTree", resultTree);
    __publicField(this, "resolver", resolver);
  }
  async execute({ field, indexDoc }) {
    const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);
    const store = new DatasetStore({
      schemasStore: this.schemasStore,
      omitCurrentDocument: currentDocument,
      omitResolver: this.resolver,
      caller: field.getFieldRoute()
    });
    const isNull = await field.isNull({
      store,
      currentDocument,
      index: indexDoc
    });
    if (!isNull) {
      const limit = await field.getIsArray().execute({
        currentDocument,
        store
      });
      if (limit !== void 0) {
        const arrayNode = new ArrayResultNode({
          name: field.getName(),
          limit
        });
        return arrayNode;
      } else {
        const node = await field.generate({
          currentDocument,
          indexDoc,
          schemaIndex: this.resolver.index,
          store
        });
        return node;
      }
    } else {
      return new SingleResultNode({
        value: null,
        name: field.getName()
      });
    }
  }
};

// src/core/schema-resolver/core/array-creator.ts
var ArrayCreator = class {
  constructor(creator, fillSolution) {
    __publicField(this, "creator", creator);
    __publicField(this, "fillSolution", fillSolution);
  }
  async execute({ indexDoc, input, solution }) {
    if (solution instanceof ArrayResultNode) {
      for (let i = 0; i < solution.limit; i++) {
        const s = await this.creator.execute({
          field: input.getNoArrayNode(),
          indexDoc
        });
        solution.insertNode(s);
        await this.fillSolution.execute({
          indexDoc,
          input,
          solution: s
        });
      }
    }
  }
};

// src/core/schema-resolver/core/fill-solution.ts
var FillSolution = class {
  constructor() {
    __publicField(this, "subFieldsCreator");
    __publicField(this, "arrayCreator");
  }
  async execute({ indexDoc, input, solution }) {
    await this.subFieldsCreator.execute({
      field: input,
      indexDoc,
      node: solution
    });
    await this.arrayCreator.execute({
      indexDoc,
      input,
      solution
    });
  }
};

// src/core/result-tree/classes/document/document-tree.ts
var DocumentTree = class {
  constructor() {
    __publicField(this, "nodes", []);
  }
  insertField(newField) {
    this.nodes.push(newField);
  }
  getDocumentObject() {
    let returnObject = {};
    for (const n of this.nodes) {
      const nodeName = n.name;
      const nodeValue = n.value();
      returnObject = { ...returnObject, [nodeName]: nodeValue };
    }
    return returnObject;
  }
  getNodeByNodeRoute(fieldTreeRoute) {
    let returnValue = void 0;
    for (let i = 0; i < this.nodes.length && returnValue === void 0; i++) {
      if (this.nodes[i].name === fieldTreeRoute[0]) {
        returnValue = this.nodes[i].getNodeByRoute(fieldTreeRoute.slice(1));
      }
    }
    if (returnValue !== void 0) {
      return returnValue;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`
      );
    }
  }
  getRefValueByNodeRoute({
    caller,
    search
  }) {
    let returnValue = void 0;
    for (let i = 0; i < this.nodes.length && returnValue === void 0; i++) {
      if (this.nodes[i].name === search.array()[0]) {
        returnValue = this.nodes[i].getRefValueByRoute({
          caller,
          search: search.pop(),
          baseSearch: search
        });
      }
    }
    if (returnValue) {
      return returnValue;
    } else {
      throw new NotExistRefFieldError(caller.string(), search.string());
    }
  }
};

// src/core/schema-resolver/value-object/schema-name.ts
var SchemaName = class {
  constructor(name, index) {
    __publicField(this, "index", index);
    __publicField(this, "_value");
    this._value = this.validate(name);
  }
  value() {
    return this._value;
  }
  validate(name) {
    if (typeof name === "string" && name.trim() !== "") {
      return name;
    } else {
      throw new ChacaError(
        `You must provide a name for the schema on index ${this.index}`
      );
    }
  }
};

// src/core/schema-resolver/schema-resolver.ts
var SchemaResolver = class {
  constructor(utils2, datatypeModule, { consoleVerbose, count, countExecutor, schemaIndex, name, input }) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "subFieldsCreator");
    __publicField(this, "solutionCreator");
    __publicField(this, "arrayCreator");
    __publicField(this, "fillSolution");
    __publicField(this, "index");
    __publicField(this, "route");
    __publicField(this, "inputTree", null);
    __publicField(this, "resultTree");
    __publicField(this, "name");
    __publicField(this, "countDocExecutor");
    __publicField(this, "count");
    __publicField(this, "input");
    __publicField(this, "isBuilding", false);
    __publicField(this, "finishBuilding", false);
    __publicField(this, "schemasStore");
    __publicField(this, "consoleVerbose", false);
    this.index = schemaIndex;
    this.name = new SchemaName(name, this.index).value();
    this.schemasStore = new SchemaStore([]);
    this.route = new NodeRoute([name]);
    this.input = new SchemaToResolve(this.route, input);
    this.consoleVerbose = consoleVerbose;
    this.resultTree = new ChacaResultTree(this.name);
    this.countDocExecutor = countExecutor;
    this.count = count;
    this.fillSolution = new FillSolution();
    this.solutionCreator = new SolutionCreator(
      this.schemasStore,
      this.resultTree,
      this
    );
    this.arrayCreator = new ArrayCreator(
      this.solutionCreator,
      this.fillSolution
    );
    this.subFieldsCreator = new SubFieldsCreator(
      this.solutionCreator,
      this.fillSolution
    );
    this.fillSolution.arrayCreator = this.arrayCreator;
    this.fillSolution.subFieldsCreator = this.subFieldsCreator;
  }
  async resolve() {
    this.buildInputTree();
    await this.buildTrees(this.route);
    return this.getDocumentsArray();
  }
  getKeyNodes() {
    let keys = [];
    if (this.inputTree) {
      keys = this.inputTree.getKeyFields();
    }
    return keys;
  }
  getPossibleNullNodes() {
    let nodes = [];
    if (this.inputTree) {
      nodes = this.inputTree.getPossibleNullNodes();
    }
    return nodes;
  }
  getRefNodes() {
    if (this.inputTree) {
      return this.inputTree.getRefNodes();
    } else {
      return [];
    }
  }
  getSchemaToResolve() {
    return this.input;
  }
  buildInputTree() {
    if (this.inputTree === null) {
      this.inputTree = new ChacaInputTree(this.utils, this.datatypeModule, {
        name: this.name,
        schemaToResolve: this.input,
        schemasStore: this.schemasStore,
        count: this.count
      });
    }
  }
  getSchemaName() {
    return this.name;
  }
  isFinishBuilding() {
    return this.finishBuilding;
  }
  isBuildingTrees() {
    return this.isBuilding;
  }
  setInjectedSchemas(array) {
    this.schemasStore.setInjectedSchemas(array);
  }
  getInputTree() {
    return this.inputTree;
  }
  getResultTree() {
    return this.resultTree;
  }
  async getAllValuesByRoute(fieldToGet, config) {
    if (fieldToGet.length === 0) {
      const whereFunction = config.where;
      if (whereFunction) {
        const filterDocuments = [];
        for (const d of this.resultTree.getDocuments()) {
          const condition = d !== config.omitDocument && await whereFunction(d.getDocumentObject());
          if (condition) {
            filterDocuments.push(d);
          }
        }
        return filterDocuments;
      } else {
        return this.resultTree.getDocuments();
      }
    } else {
      const allNodes = await this.resultTree.getAllValuesByNodeRoute(
        fieldToGet,
        config
      );
      return allNodes;
    }
  }
  getAllRefValuesByNodeRoute({
    caller,
    search
  }) {
    return this.resultTree.getAllRefValuesByNodeRoute({
      caller,
      search
    });
  }
  searchRefNodes() {
    if (this.inputTree) {
      this.inputTree.searchRefNodes();
    }
  }
  dangerCyclic() {
    if (!this.finishBuilding && this.isBuilding) {
      return true;
    } else {
      return false;
    }
  }
  async buildTrees(caller) {
    if (!this.finishBuilding) {
      if (!this.isBuilding) {
        if (this.inputTree) {
          if (this.consoleVerbose) {
            console.log(`Creating ${this.name} data...`);
          }
          this.isBuilding = true;
          let count;
          const save = this.count.value();
          if (save === null) {
            count = await this.countDocExecutor.value({
              store: new DatasetStore({
                caller: this.route,
                omitResolver: this,
                schemasStore: this.schemasStore
              })
            });
            this.count.setValue(count);
          } else {
            count = save;
          }
          for (let indexDoc = 0; indexDoc < count; indexDoc++) {
            const newDoc = new DocumentTree();
            this.resultTree.insertDocument(newDoc);
            for (const datField of this.inputTree.getFields()) {
              const solution = await this.solutionCreator.execute({
                field: datField,
                indexDoc
              });
              newDoc.insertField(solution);
              await this.fillSolution.execute({
                solution,
                input: datField,
                indexDoc
              });
            }
          }
          this.isBuilding = false;
          this.finishBuilding = true;
        } else {
          throw new ChacaError(
            `It's imposible create the result trees for the schema ${this.name}, because the input tree was not created yet.`
          );
        }
      } else {
        throw new CyclicAccessDataError(
          `From ${caller.string()}, you are trying to access ${this.name} when this one is being created`
        );
      }
    }
  }
  getDocumentsArray(omitDocument) {
    const result = [];
    for (const d of this.getResultTree().getDocuments()) {
      if (d !== omitDocument) {
        result.push(d.getDocumentObject());
      }
    }
    return result;
  }
};

// src/core/dataset-resolver/dataset-resolver.ts
var DatasetResolver = class {
  constructor(utils2, datatypeModule, { schemas, verbose }) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "resolvers", []);
    __publicField(this, "verbose");
    this.verbose = verbose;
    this.createSchemaResolvers(schemas);
    this.validateNotRepeatSchemaNames(schemas);
    this.injectSchemas();
    this.buildInputTrees();
    this.buildRefFields();
  }
  getResolvers() {
    return this.resolvers;
  }
  validateNotRepeatSchemaNames(schemas) {
    for (let i = 0; i < schemas.length; i++) {
      const notRepeat = schemas.filter(
        (s) => s.name.trim() === schemas[i].name.trim()
      );
      if (notRepeat.length > 1) {
        throw new ChacaError(
          `The name '${schemas[i].name}' is repeat. Your schemas must have different names`
        );
      }
    }
  }
  buildRefFields() {
    this.resolvers.forEach((r) => r.searchRefNodes());
  }
  createSchemaResolvers(schemas) {
    this.resolvers = schemas.map((schema, schemaIndex) => {
      if (typeof schema === "object" && schema !== null) {
        return new SchemaResolver(this.utils, this.datatypeModule, {
          name: schema.name,
          input: schema.schema.input,
          countExecutor: SchemaCountExecutor.create({
            value: schema.documents,
            name: schema.name,
            singleSchema: false
          }),
          count: new SchemaCount({ name: schema.name, singleSchema: false }),
          schemaIndex,
          consoleVerbose: this.verbose
        });
      } else {
        const message = `You must provide a object with the schema configuration. Example: { name: 'User', schema: UserSchema, documents: 50 }`;
        throw new ChacaError(message);
      }
    });
  }
  injectSchemas() {
    for (const resolver of this.resolvers) {
      resolver.setInjectedSchemas(this.resolvers);
    }
  }
  buildInputTrees() {
    this.resolvers.forEach((r) => r.buildInputTree());
  }
  async resolve() {
    let data = {};
    for (const r of this.resolvers) {
      data = { ...data, [r.getSchemaName()]: await r.resolve() };
    }
    return data;
  }
  getRefsNodes() {
    const nodes = [];
    this.resolvers.forEach((r) => {
      nodes.push(...r.getRefNodes());
    });
    return nodes;
  }
  getPossibleNullNodes() {
    const nodes = [];
    this.resolvers.forEach((r) => {
      nodes.push(...r.getPossibleNullNodes());
    });
    return nodes;
  }
  getKeyNodes() {
    const nodes = [];
    this.resolvers.forEach((r) => {
      nodes.push(...r.getKeyNodes());
    });
    return nodes;
  }
};

// src/core/export/value-object/location.ts
var Location = class {
  constructor(location) {
    __publicField(this, "_value");
    if (typeof location !== "string") {
      throw new ChacaError("The file needs a location for exportation");
    }
    this._value = location;
  }
  value() {
    return this._value;
  }
};

// src/core/export/resolvers/export/export.ts
var ExportResolver = class {
  constructor(utils2, datatypeModule, filter, writer, config) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "filter", filter);
    __publicField(this, "writer", writer);
    __publicField(this, "format");
    __publicField(this, "filename");
    __publicField(this, "location");
    __publicField(this, "verbose");
    this.filename = new FileName(config.filename);
    this.format = new FileFormat(config.format);
    this.location = new Location(config.location);
    this.verbose = new Verbose(config.verbose);
  }
  data(data) {
    const gen = this.filter.execute(this.format.value());
    const files = gen.dump({
      data,
      filename: new Filename(this.filename.value())
    });
    return this.writer.write({
      files,
      ext: gen.ext,
      zip: gen.zip,
      location: this.location.value(),
      filename: this.filename.value()
    });
  }
  async relational(schemas) {
    const gen = this.filter.execute(this.format.value());
    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas,
      verbose: this.verbose.value()
    });
    const files = await gen.dumpRelational({
      resolver,
      filename: new Filename(this.filename.value())
    });
    return this.writer.write({
      files,
      ext: gen.ext,
      zip: gen.zip,
      location: this.location.value(),
      filename: this.filename.value()
    });
  }
};

// src/core/dataset/dataset.ts
var Dataset = class {
  constructor(schemas, utils2, datatypeModule, fileWriter = new UnavailableFileWriter()) {
    __publicField(this, "schemas", schemas);
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "fileWriter", fileWriter);
  }
  /**
   * Generates and serializes dataset data as a specific file format
   *
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param config.verbose show log in console progretion
   */
  transform(props) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props
    );
    return resolver.relational(this.schemas);
  }
  /**
   * Generate and export data from relational schemas
   * @param schemas Array with the schemas config
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param config.verbose show log in console progretion
   */
  async export(config) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
      this.fileWriter,
      config
    );
    const routes = await resolver.relational(this.schemas);
    return routes;
  }
  /**
   * Adapts the CLI's uniform export call to the dataset `export` signature.
   * The document count is defined per schema, so it is ignored here.
   * @internal
   */
  exportFromCli(_documents, config) {
    return this.export(config);
  }
  /**
   * Generates the dataset data through the defined schemas
   */
  generate() {
    const resolver = new DatasetResolver(this.utils, this.datatypeModule, {
      schemas: this.schemas,
      verbose: false
    });
    return resolver.resolve();
  }
};

// src/Chaca.ts
var Chaca = class {
  constructor(datatypeModule, utils2, fileWriter) {
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "utils", utils2);
    __publicField(this, "fileWriter", fileWriter);
  }
  /**
   * @param input The object with the keys and type of each field
   *
   * @example
   * chaca.schema({
   *    id: chaca.key(() => modules.id.uuid()),
   *    image: () => modules.image.film(),
   *    name: () => modules.person.firstName()
   * })
   */
  schema(input) {
    const newSchema = new Schema(
      input,
      this.utils,
      this.datatypeModule,
      this.fileWriter
    );
    return newSchema;
  }
  /**
   * Create a reference field for a selected schema
   * @param field Configuration of the reference field. the field location must be separated points
   * @param config.unique The value to be referenced will only be taken once by this schema. Default `false`
   * @param config.where Function that filters the fields to reference
   * @param config.nullOnEmpty When there are no more documents to reference, the generated value will be null. Default `false`
   *
   * @example
   * chaca.ref('schema.field')
   */
  ref(field, config) {
    return new RefField(field, config);
  }
  /**
   * Sequential field
   *
   * @param values Array of the secuential values
   * @param config.loop Boolean indicating whether the values should be generated cyclically. Default `false`
   * @example
   * chaca.schema({
   *   number: chaca.sequential([1, 2, 3])
   * })
   *
   * // array result
   * [
   *    { number: 1 },
   *    { number: 2 },
   *    { number: 3 }
   * ]
   */
  sequential(values, config) {
    return new SequentialField(values, config);
  }
  /**
   * Sequence field
   * @param config.starsWith Init value for the field. Default `1`
   * @param config.step Step between field values in schema documents. Default `1`
   *
   * @example
   * chaca.sequence()
   * chaca.sequence({ startsWith: 10 })
   * chaca.sequence({ step: 0.5 })
   */
  sequence(config) {
    return new SequenceField(config);
  }
  /**
   * Key field
   * @param field field that will return the value. Could be (`RefField` | `SequenceField` | `CustomField` )
   *
   * @example
   * chaca.key(chaca.sequence())
   * chaca.key(() => modules.id.uuid())
   */
  key(field) {
    return new KeyField(field);
  }
  /**
   * Enum field
   * @param values Array of posible values
   *
   * @example
   * chaca.enum(["category1", "category2", "category3"])
   */
  enum(values) {
    return new EnumField(values);
  }
  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @example
   * const data = [
   *  { id: 1, name: 'Alberto', age: 20 },
   *  { id: 2, name: 'Carolina', age: 28 }
   * ]
   * const config = { filename: 'users', format: 'json', location: '../../data' }
   *
   * await chaca.export(data, config)
   *
   * @returns
   * Promise<string[]>
   */
  async export(data, config) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
      this.fileWriter,
      config
    );
    const route = await resolver.data(data);
    return route;
  }
  /**
   * Generate data from realtional schemas
   * @param schemas Array with the schemas config
   */
  dataset(schemas) {
    const dataset = new Dataset(
      schemas,
      this.utils,
      this.datatypeModule,
      this.fileWriter
    );
    return dataset;
  }
  /**
   * Probability field
   * @param options Array of options to choose from. Where each one has the 'chance' parameter to indicate the probability of being chosen.
   *
   * @example
   * chaca.probability([
   *   { chance: 0.9, value: 10 },
   *   { chance: 0.5, value: 5 },
   *   { chance: 0.1, value: 1 },
   * ])
   */
  probability(options) {
    return new ProbabilityField(options);
  }
  /**
   * Select a number of elements in an array so that all selected values are not repeated
   *
   * @param props.values array of values
   * @param props.count number of items to select
   *
   * @example
   * chaca.pick({
   *    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   *    count: 3
   * })
   *
   * // [2, 6, 10] or [4, 5, 1] or [1, 9, 8] or ...
   */
  pick(props) {
    return new PickField(props);
  }
  /**
   * Serializes `data` as a specific file format
   *
   * @param data Data to transform
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   */
  transform(data, props) {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props
    );
    return resolver.data(data);
  }
};

// src/modules/datatype/constants/special-characters.ts
var SPECIAL_CHARACTERS = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~"
];

// src/modules/datatype/constants/characters.ts
var allCharacters = "abcdefghijklmnopqrstuvwxyz";
var LOWER_CHARACTERS = allCharacters.split("");
var UPPER_CHARACTERS = allCharacters.split("").map((el) => el.toUpperCase());
var MIXED_CHARACTERS = [...LOWER_CHARACTERS, ...UPPER_CHARACTERS];

// src/modules/datatype/index.ts
var DatatypeModule = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "MIN_RANDOM_VALUE", -999999);
    __publicField(this, "MAX_RANDOM_VALUE", 999999);
    __publicField(this, "MAX_PRECISION", 16);
    __publicField(this, "constants", {
      upperCharacters: UPPER_CHARACTERS,
      lowerCharacters: LOWER_CHARACTERS,
      mixedCharacters: MIXED_CHARACTERS,
      specialCharacters: SPECIAL_CHARACTERS,
      numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    });
  }
  /**
   * Returns a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#bigint_type) number.
   * The bounds are inclusive.
   *
   * @param args.min Lower bound for generated bigint. Defaults to `0n`.
   * @param args.max Upper bound for generated bigint. Defaults to `min + 999999999999999n`.
   *
   * @throws When `min` is greater than `max`.
   *
   * @example
   * modules.datatype.bigInt() // 55422n
   * modules.datatype.bigInt({ min: 1000000n }) // 431433n
   * modules.datatype.bigInt({ max: 100n }) // 42n
   * modules.datatype.bigInt({ min: 10n, max: 100n }) // 36n
   */
  bigint({ max: imax, min: imin } = {}) {
    const min = typeof imin === "bigint" ? imin : BigInt(0);
    const max = typeof imax === "bigint" ? imax : min + BigInt(999999999999999);
    if (max === min) {
      return min;
    }
    if (max < min) {
      throw new ChacaError(`Max ${max} should be larger then min ${min}.`);
    }
    const delta = max - min;
    const offset = BigInt(
      this.numeric({
        length: delta.toString(10).length,
        allowLeadingZeros: true
      })
    ) % (delta + BigInt(1));
    return min + offset;
  }
  /**
   * Returns a keyboard special character
   *
   * @example modules.datatype.specialCharacter() // '_'
   *
   * @returns string
   */
  specialCharacter() {
    return this.utils.oneOfArray(SPECIAL_CHARACTERS);
  }
  /**
   * Returns a boolean
   *
   * @example modules.datatype.boolean() // true
   *
   * @returns boolean
   */
  boolean() {
    return this.utils.oneOfArray([true, false]);
  }
  /**
   * Returns a integer number
   *
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   *
   * @example
   * modules.datatype.int() // 462
   * modules.datatype.int({ min: 10, max: 30 }) // 28
   *
   * @returns number
   */
  int({ max, min } = {}) {
    let range;
    if (typeof max === "number" && typeof min === "number") {
      if (min > max) {
        throw new ChacaError(`Max ${max} should be greater than min ${min}.`);
      }
      range = max - min;
    } else if (typeof max === "number" && typeof min === "undefined") {
      range = max;
    } else if (typeof max === "undefined" && typeof min === "number") {
      range = this.MAX_RANDOM_VALUE - min;
    } else {
      range = this.utils.oneOfArray([
        this.MAX_RANDOM_VALUE,
        this.MIN_RANDOM_VALUE
      ]);
    }
    const val = Math.floor(Math.random() * range + (min || 0));
    return val;
  }
  /**
   * Returns a float number
   *
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the float. Must be a value between `1` and `20`
   *
   * @example
   * modules.datatype.float() // 462.12
   * modules.datatype.float({ min: 10, max: 30 }) // 10.23
   * modules.datatype.float({ precision: 4 }) // 90.5362
   *
   * @returns number
   */
  float({ max, min, precision } = {}) {
    let range;
    if (typeof max === "number" && typeof min === "number") {
      if (min > max) {
        throw new ChacaError(`Max ${max} should be greater than min ${min}.`);
      }
      range = max - min;
    } else if (typeof max === "number" && typeof min === "undefined") {
      range = max;
    } else if (typeof max === "undefined" && typeof min === "number") {
      range = this.MAX_RANDOM_VALUE - min;
    } else {
      range = this.utils.oneOfArray([
        this.MAX_RANDOM_VALUE,
        this.MIN_RANDOM_VALUE
      ]);
    }
    const pres = typeof precision === "number" && precision > 0 && precision <= this.MAX_PRECISION ? precision : this.int({ min: 1, max: 10 });
    const randomNum = Math.random() * range + (min || 0);
    const factor = Math.pow(10, pres);
    const returnValue = Math.round(randomNum * factor) / factor;
    return returnValue;
  }
  /**
   * Returns a number
   * @param args.min Minimun posible value
   * @param args.max Maximun posible value
   * @param args.precision Precision of the number. Must be a value between `0` and `20`.
   * @example
   * modules.datatype.number() // 301
   * modules.datatype.number({ min: 10, max: 30 }) // 10.2327
   * @returns number
   */
  number({ max, min, precision } = {}) {
    let val;
    const pres = typeof precision === "number" && precision >= 0 ? precision : this.int({ min: 0, max: 10 });
    if (pres === 0) {
      val = this.int({ max, min });
    } else {
      val = this.float({ max, min, precision });
    }
    return val;
  }
  /**
   * Returns a string with a hexadecimal code
   *
   * @param args.case Case of the values inside de hexadecimal code (`mixed` | `lower` | `upper`)
   * @param args.length Lenght of the hexadecimal code
   *
   * @example
   * modules.datatype.hexadecimal() // '009df'
   * modules.datatype.hexadecimal({ length: 3 }) // '01D'
   * modules.datatype.hexadecimal({ lenght: 3, case: 'upper' }) // 'DE20'
   * @returns string
   */
  hexadecimal({
    length: ilength,
    case: icase = "mixed"
  } = {}) {
    const utils2 = new ChacaUtils();
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const characters = ["A", "B", "C", "D", "E", "F"];
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : this.int({ min: 5, max: 10 });
    const c = icase ? icase : "mixed";
    let ret = "";
    for (let i = 1; i <= length; i++) {
      ret = ret.concat(
        utils2.oneOfArray([
          ...numbers,
          ...characters.map((el) => {
            if (c === "lower") {
              return el.toLowerCase();
            } else if (c === "upper") {
              return el;
            } else {
              return utils2.oneOfArray([el.toLowerCase(), el.toUpperCase()]);
            }
          })
        ])
      );
    }
    return ret;
  }
  /**
   * Return a two dimension matriz of numbers
   *
   * @param args.x_size Columns size
   * @param args.y_size Row size
   * @param args.min Min value for the numbers of the matrix
   * @param args.max Max value for the numbers of the matrix
   * @param args.precision Number precision of the matrix
   *
   * @example
   * modules.datatype.matrix() // [[1, 0, 5], [5, 10, 9]]
   * modules.datatype.matrix({ x_size: 4, y_size: 2 }) // [[1, 2], [0, 0], [1, 1], [4, 5]]
   */
  matrix({
    x_size: ix_size,
    max,
    min,
    precision,
    y_size: iy_size
  } = {}) {
    const x_size = typeof ix_size === "number" && ix_size >= 0 ? ix_size : this.int({ min: 1, max: 10 });
    const y_size = typeof iy_size === "number" && iy_size >= 0 ? iy_size : this.int({ min: 1, max: 10 });
    return Array.from({ length: x_size }).map(() => {
      return Array.from({ length: y_size }).map(() => {
        return this.number({
          min,
          max,
          precision
        });
      });
    });
  }
  /**
   * Returns a character
   *
   * @param args.case Case of the characters (`lower`, `upper` or `mixed`)
   *
   * @example
   * modules.datatype.character() // 'c'
   * modules.datatype.character({ case: 'upper' }) // "H"
   *
   * @returns string
   */
  character({ case: icase = "mixed" } = {}) {
    return this.characters({ length: 1, case: icase });
  }
  /**
   * Returns a series of characters
   *
   * @param args.length Length of characters.
   * @param args.case Case of the characters (`lower`, `upper` or `mixed`)
   *
   * @example
   * modules.datatype.characters() // 'v'
   * modules.datatype.characters({ length: 5 }) // 'bhtlw'
   * modules.datatype.characters({ length: 5, case: 'upper' }) // 'HQRSD'
   *
   * @returns string
   */
  characters({ case: icase = "mixed", length } = {}) {
    const len = typeof length === "number" && length >= 0 ? length : this.int({ min: 5, max: 10 });
    let charactersToRet;
    if (icase) {
      if (icase === "lower") {
        charactersToRet = this.constants.lowerCharacters;
      } else if (icase === "upper") {
        charactersToRet = this.constants.upperCharacters;
      } else {
        charactersToRet = this.constants.mixedCharacters;
      }
    } else {
      charactersToRet = this.constants.mixedCharacters;
    }
    let ret = "";
    for (let i = 1; i <= len; i++) {
      ret = ret.concat(this.utils.oneOfArray(charactersToRet));
    }
    return ret;
  }
  /**
   * Returns a string with a binary code
   * @param args.length Length of the binary code
   * @example
   * modules.datatype.binaryCode() // '00101'
   * modules.datatype.binaryCode({ length: 6 }) // '010100'
   * @returns string
   */
  binaryCode({ length: ilength, prefix = "" } = {}) {
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : void 0;
    return this.generateByLength(
      prefix,
      length,
      () => String(this.utils.oneOfArray([0, 1]))
    );
  }
  /**
   * @param args.length Length of the string
   * @param args.case Case of the string. (`lower`, `upper`, `mixed`)
   * @param args.banned Characters that cannot appear in the string. It can be an array of characters or a string with all the characters
   * @param args.prefix Prefix for the generated string
   *
   * @example
   * modules.datatype.alphaNumeric() // "F43jUs"
   * modules.datatype.alphaNumeric({ length: 5 }) // "n3jO4"
   * modules.datatype.alphaNumeric({ length: 7, case = "lower" }) // "ow3kn42"
   * @returns string
   */
  alphaNumeric({
    length: ilength,
    case: icase = "mixed",
    banned: ibanned,
    prefix = ""
  } = {}) {
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : void 0;
    const banned = [];
    if (ibanned) {
      if (typeof ibanned === "string") {
        for (let i = 0; i < ibanned.length; i++) {
          banned.push(ibanned[i]);
        }
      } else if (Array.isArray(ibanned)) {
        for (const c of ibanned) {
          banned.push(c);
        }
      }
    }
    const selectNumbers = this.constants.numbers.filter(
      (el) => !banned.includes(el)
    );
    const characters = this.filterCharacters(icase);
    const selectCharacters = characters.filter((el) => {
      let is = true;
      banned.forEach((b) => {
        if (b === el) is = false;
      });
      return is;
    });
    const selectValues = [...selectCharacters, ...selectNumbers];
    return this.generateByLength(
      prefix,
      length,
      () => this.utils.oneOfArray(selectValues)
    );
  }
  /**
   * Returns an [octal](https://en.wikipedia.org/wiki/Octal) string.
   *
   * @param args.length The number or range of characters to generate after the prefix.
   * @param args.prefix Prefix for the generated number. Defaults to `'0o'`.
   *
   * @example
   * modules.datatype.octal() // '0o3'
   * modules.datatype.octal({ length: 10 }) // '0o1526216210'
   * modules.datatype.octal({ prefix: '0o' }) // '0o7'
   * modules.datatype.octal({ length: 10, prefix: 'oct_' }) // 'oct_1542153414'
   */
  octal({ length: ilength, prefix = "0o" } = {}) {
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : void 0;
    return this.generateByLength(prefix, length, () => {
      return this.utils.oneOfArray(["0", "1", "2", "3", "4", "5", "6", "7"]);
    });
  }
  /**
   * Generates a given length string of digits.
   *
   * @param args.length The number or range of digits to generate.
   * @param args.allowLeadingZeros Whether leading zeros are allowed or not. Defaults to `true`.
   * @param args.banned An array of digits which should be excluded in the generated string. Defaults to `[]`.
   * @param args.prefix Prefix for the generated string
   *
   * @example
   * modules.datatype.numeric() // '2'
   * modules.datatype.numeric({ length: 42, allowLeadingZeros: false }) // '72564846278453876543517840713421451546115'
   * modules.datatype.numeric({ length: 6, exclude: ['0'] }) // '943228'
   *
   */
  numeric({
    length: ilength,
    allowLeadingZeros = true,
    prefix = "",
    banned = []
  } = {}) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : void 0;
    let firstNotZero = false;
    return this.generateByLength(prefix, length, () => {
      const value = this.utils.oneOfArray(
        numbers.filter((n) => {
          if (!firstNotZero && !allowLeadingZeros) {
            return n !== "0";
          }
          return true;
        }).filter((n) => !banned.includes(n))
      );
      if (value !== void 0) {
        if (value !== "0") {
          firstNotZero = true;
        }
        return value;
      } else {
        return "";
      }
    });
  }
  filterCharacters(fCase) {
    if (fCase === "upper") {
      return this.constants.upperCharacters;
    } else if (fCase === "lower") {
      return this.constants.lowerCharacters;
    } else {
      return this.constants.mixedCharacters;
    }
  }
  generateByLength(prefix, length, func) {
    let str = prefix;
    if (length !== void 0) {
      for (let i = 0; i < length - prefix.length; i++) {
        str += func();
      }
      return str.slice(0, length);
    } else {
      const min = prefix.length + 4;
      const max = min + 6;
      for (let i = 0; i < this.int({ min, max }); i++) {
        str += func();
      }
    }
    return str;
  }
};
var ChacaUtils = class {
  constructor() {
    __publicField(this, "datatypeModule", new DatatypeModule(this));
  }
  /**
   * Returns one element from an array
   *
   * @param list Array of values to return
   * @example
   * chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
   * chaca.utils.oneOfArray(['Hi!!!', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
   * chaca.utils.oneOfArray([]) // undefined
   */
  oneOfArray(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  /**
   * Parses the given string symbol by symbols and replaces the placeholder appropriately.
   *
   * - `#` will be replaced with a digit (`0` - `9`).
   * - `?` will be replaced with an upper letter ('A' - 'Z')
   * - `$` will be replaced with a lower letter ('a' - 'z')
   * - `*` will be replaced with either a digit or letter.
   *
   * @param text The template string to parse.
   * @param props.banned values that cannot appear in the string
   * @param props.symbols object with your own symbol definitions
   *
   * @example
   * chaca.utils.replaceSymbols('#####') // '98441'
   * chaca.utils.replaceSymbols('?????') // 'ZYRQQ'
   * chaca.utils.replaceSymbols('***$$') // '4Z3pa'
   * chaca.utils.replaceSymbols('Your pin is: #?*#?*') // 'Your pin is: 0T85L1'
   * chaca.utils.replaceSymbols('#####', { banned: ["3", "7", "8"] }) // '91220'
   *
   * @returns string
   */
  replaceSymbols(text, { banned, symbols: ownSymbols } = {
    banned: [],
    symbols: {}
  }) {
    let ret = "";
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbols = {
      "#": numbers,
      "?": UPPER_CHARACTERS,
      $: LOWER_CHARACTERS,
      "*": [...numbers, ...MIXED_CHARACTERS],
      ...ownSymbols
    };
    for (let i = 0; i < text.length; i++) {
      let val = text[i];
      for (const [key, values] of Object.entries(symbols)) {
        if (text[i] === key) {
          const options = values.filter((v) => {
            if (banned) {
              return !banned.includes(v);
            }
            return true;
          });
          if (options.length === 0) {
            throw new ChacaError(
              `For symbol '${key}' there are no values to choose`
            );
          }
          val = this.oneOfArray(options);
          break;
        }
      }
      ret += val;
    }
    return ret;
  }
  /**
   * Convert a string to camel case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.camelCase('Hello World') // 'helloWorld'
   * chaca.utils.camelCase('hiFriend') // 'hiFriend'
   *
   * @returns string
   */
  camelCase(text) {
    return Case.camel(text);
  }
  /**
   * Convert a string to snake case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.snakeCase('Hello World') // 'hello_world'
   * chaca.utils.snakeCase('hiFriend') // 'hi_friend'
   *
   * @returns string
   */
  snakeCase(text) {
    return Case.snake(text);
  }
  /**
   * Convert a string to dot case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.dotCase('Hello World') // 'hello.world'
   * chaca.utils.dotCase('hiFriend') // 'hi.friend'
   *
   * @returns string
   */
  dotCase(text) {
    return Case.dot(text);
  }
  /**
   * Convert a string to sentence case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.sentenceCase('Hello World') // 'Hello world'
   * chaca.utils.sentenceCase('hiFriend') // 'Hi friend'
   *
   * @returns string
   */
  sentenceCase(text) {
    return Case.sentence(text);
  }
  /**
   * Convert a string to capital case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.capitalCase('Hello World') // 'Hello World'
   * chaca.utils.capitalCase('hiFriend') // 'Hi Friend'
   *
   * @returns string
   */
  capitalCase(text) {
    return Case.capital(text);
  }
  /**
   * Convert a string to pascal case
   *
   * @param text string to transform
   *
   * @example
   * chaca.utils.pascalCase('Hello World') // 'HelloWorld'
   * chaca.utils.pascalCase('hiFriend') // 'HiFriend'
   *
   * @returns string
   */
  pascalCase(text) {
    return Case.pascal(text);
  }
  /**
   * Sum a range value to a date
   *
   * @param param.date Date to modify
   * @param param.range Time unit (`"years"` | `"seconds"` | `"minutes"` | `"days"`| `"hours"` | `"months"`)
   * @param param.value Amount of time unit
   *
   * @returns string
   */
  sumDateRange({ date, range, value }) {
    switch (range) {
      case "years":
        date.setFullYear(date.getFullYear() + value);
        break;
      case "months":
        date.setMonth(date.getMonth() + value);
        break;
      case "days":
        date.setDate(date.getDate() + value);
        break;
      case "hours":
        date.setHours(date.getHours() + value);
        break;
      case "minutes":
        date.setMinutes(date.getMinutes() + value);
        break;
      case "seconds":
        date.setSeconds(date.getSeconds() + value);
        break;
      default:
        throw new ChacaError("Invalid date range");
    }
    return date;
  }
  /**
   * Chooses a series of elements from an array of values, preventing an element from being selected more than once
   *
   * @param args.values Values array
   * @param args.count Number of items to select
   *
   * @example
   * chaca.utils.pick({ values: [1, 2, 3, 4, 5], count: 2 }) // [2, 4]
   * chaca.utils.pick({ values: [1, 2, 3, 4, 5], count: 3 }) // [1, 5, 3]
   */
  pick({ values, count }) {
    if (count > values.length) {
      throw new ChacaError(
        `The number of elements to select must be less or equal than the array length`
      );
    }
    if (count === values.length) {
      return [...values];
    } else {
      const generate = (banned2) => {
        let num = this.datatypeModule.int({
          min: 0,
          max: values.length
        });
        while (banned2.includes(num)) {
          num = this.datatypeModule.int({
            min: 0,
            max: values.length
          });
        }
        return num;
      };
      const result = [];
      const banned = [];
      let i = 0;
      while (i < count) {
        const index = generate(banned);
        banned.push(index);
        result.push(values[index]);
        i++;
      }
      return result;
    }
  }
  /**
   * Generates an array containing values returned by the given method.
   *
   * @param args.count The number of elements to generate.
   *
   * @example
   * chaca.utils.multiple({ generator: () => modules.person.firstName(), count: 3 }) // [ 'Aniya', 'Norval', 'Dallin' ]
   * chaca.utils.multiple({ generator: () => modules.person.firstName(), count: 3 }) // [ 'Santos', 'Lavinia', 'Lavinia' ]
   * chaca.utils.multiple({ generator: (i) => `element-${i}`, count: 3 }) // [ 'element-0', 'element-1', 'element-2' ]
   */
  multiple({ generator, count }) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const value = generator(i);
      result.push(value);
    }
    return result;
  }
};
var IdModule = class {
  constructor(datatypeModule) {
    __publicField(this, "datatypeModule", datatypeModule);
  }
  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example
   * modules.id.mongodbId() // 'e175cac316a79afdd0ad3afb'
   *
   * @returns string
   */
  mongodbId() {
    return this.datatypeModule.hexadecimal({ case: "lower", length: 24 });
  }
  /**
   * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
   *
   * @example
   * modules.id.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
   *
   * @returns string
   */
  uuid() {
    return v4();
  }
  /**
   * Generates a [Nano ID](https://github.com/ai/nanoid).
   *
   * @param length Length of the generated string. Defaults to `20`.
   *
   * @example
   * modules.id.nanoid() // 'ptL0KpX_yRMI98JFr6B3n'
   * modules.id.nanoid({ length: 10 }) // 'VsvwSdm_Am'
   */
  nanoid({ length: ilength } = {}) {
    const length = typeof ilength === "number" && ilength >= 0 ? ilength : 20;
    return nanoid(length);
  }
  /**
   * Generates a [ULID](https://github.com/ulid/javascript)
   *
   * @example
   * modules.id.ulid() // "01ARZ3NDEKTSV4RRFFQ69G5FAV"
   *
   * @returns string
   */
  ulid() {
    return ulid();
  }
  /**
   * Generates a [CUID](https://github.com/paralleldrive/cuid2)
   *
   * @example
   * modules.id.cuid() // "tz4a98xxat96iws9zmbrgj3a"
   *
   * @returns string
   */
  cuid() {
    return createId();
  }
};

// src/modules/internet/constants/emojis.ts
var EMOJIS = {
  smiley: [
    "\u{1F600}",
    "\u{1F603}",
    "\u{1F604}",
    "\u{1F601}",
    "\u{1F606}",
    "\u{1F605}",
    "\u{1F923}",
    "\u{1F602}",
    "\u{1F642}",
    "\u{1F643}",
    "\u{1F609}",
    "\u{1F60A}",
    "\u{1F607}",
    "\u{1F970}",
    "\u{1F60D}",
    "\u{1F929}",
    "\u{1F618}",
    "\u{1F617}",
    "\u263A\uFE0F",
    "\u{1F61A}",
    "\u{1F619}",
    "\u{1F972}",
    "\u{1F60B}",
    "\u{1F61B}",
    "\u{1F61C}",
    "\u{1F92A}",
    "\u{1F61D}",
    "\u{1F911}",
    "\u{1F917}",
    "\u{1F92D}",
    "\u{1F92B}",
    "\u{1F914}",
    "\u{1F910}",
    "\u{1F928}",
    "\u{1F610}",
    "\u{1F611}",
    "\u{1F636}",
    "\u{1F636}\u200D\u{1F32B}\uFE0F",
    "\u{1F60F}",
    "\u{1F612}",
    "\u{1F644}",
    "\u{1F62C}",
    "\u{1F62E}\u200D\u{1F4A8}",
    "\u{1F925}",
    "\u{1F60C}",
    "\u{1F614}",
    "\u{1F62A}",
    "\u{1F924}",
    "\u{1F634}",
    "\u{1F637}",
    "\u{1F912}",
    "\u{1F915}",
    "\u{1F922}",
    "\u{1F92E}",
    "\u{1F927}",
    "\u{1F975}",
    "\u{1F976}",
    "\u{1F974}",
    "\u{1F635}",
    "\u{1F635}\u200D\u{1F4AB}",
    "\u{1F92F}",
    "\u{1F920}",
    "\u{1F973}",
    "\u{1F978}",
    "\u{1F60E}",
    "\u{1F913}",
    "\u{1F9D0}",
    "\u{1F615}",
    "\u{1F61F}",
    "\u{1F641}",
    "\u2639\uFE0F",
    "\u{1F62E}",
    "\u{1F62F}",
    "\u{1F632}",
    "\u{1F633}",
    "\u{1F97A}",
    "\u{1F626}",
    "\u{1F627}",
    "\u{1F628}",
    "\u{1F630}",
    "\u{1F625}",
    "\u{1F622}",
    "\u{1F62D}",
    "\u{1F631}",
    "\u{1F616}",
    "\u{1F623}",
    "\u{1F61E}",
    "\u{1F613}",
    "\u{1F629}",
    "\u{1F62B}",
    "\u{1F971}",
    "\u{1F624}",
    "\u{1F621}",
    "\u{1F620}",
    "\u{1F92C}",
    "\u{1F608}",
    "\u{1F47F}",
    "\u{1F480}",
    "\u2620\uFE0F",
    "\u{1F4A9}",
    "\u{1F921}",
    "\u{1F479}",
    "\u{1F47A}",
    "\u{1F47B}",
    "\u{1F47D}",
    "\u{1F47E}",
    "\u{1F916}",
    "\u{1F63A}",
    "\u{1F638}",
    "\u{1F639}",
    "\u{1F63B}",
    "\u{1F63C}",
    "\u{1F63D}",
    "\u{1F640}",
    "\u{1F63F}",
    "\u{1F63E}",
    "\u{1F648}",
    "\u{1F649}",
    "\u{1F64A}",
    "\u{1F48B}",
    "\u{1F48C}",
    "\u{1F498}",
    "\u{1F49D}",
    "\u{1F496}",
    "\u{1F497}",
    "\u{1F493}",
    "\u{1F49E}",
    "\u{1F495}",
    "\u{1F49F}",
    "\u2763\uFE0F",
    "\u{1F494}",
    "\u2764\uFE0F\u200D\u{1F525}",
    "\u2764\uFE0F\u200D\u{1FA79}",
    "\u2764\uFE0F",
    "\u{1F9E1}",
    "\u{1F49B}",
    "\u{1F49A}",
    "\u{1F499}",
    "\u{1F49C}",
    "\u{1F90E}",
    "\u{1F5A4}",
    "\u{1F90D}",
    "\u{1F4AF}",
    "\u{1F4A2}",
    "\u{1F4A5}",
    "\u{1F4AB}",
    "\u{1F4A6}",
    "\u{1F4A8}",
    "\u{1F573}\uFE0F",
    "\u{1F4A3}",
    "\u{1F4AC}",
    "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F",
    "\u{1F5E8}\uFE0F",
    "\u{1F5EF}\uFE0F",
    "\u{1F4AD}",
    "\u{1F4A4}"
  ],
  body: [
    "\u{1F44B}",
    "\u{1F44B}\u{1F3FB}",
    "\u{1F44B}\u{1F3FC}",
    "\u{1F44B}\u{1F3FD}",
    "\u{1F44B}\u{1F3FE}",
    "\u{1F44B}\u{1F3FF}",
    "\u{1F91A}",
    "\u{1F91A}\u{1F3FB}",
    "\u{1F91A}\u{1F3FC}",
    "\u{1F91A}\u{1F3FD}",
    "\u{1F91A}\u{1F3FE}",
    "\u{1F91A}\u{1F3FF}",
    "\u{1F590}\uFE0F",
    "\u{1F590}\u{1F3FB}",
    "\u{1F590}\u{1F3FC}",
    "\u{1F590}\u{1F3FD}",
    "\u{1F590}\u{1F3FE}",
    "\u{1F590}\u{1F3FF}",
    "\u270B",
    "\u270B\u{1F3FB}",
    "\u270B\u{1F3FC}",
    "\u270B\u{1F3FD}",
    "\u270B\u{1F3FE}",
    "\u270B\u{1F3FF}",
    "\u{1F596}",
    "\u{1F596}\u{1F3FB}",
    "\u{1F596}\u{1F3FC}",
    "\u{1F596}\u{1F3FD}",
    "\u{1F596}\u{1F3FE}",
    "\u{1F596}\u{1F3FF}",
    "\u{1F44C}",
    "\u{1F44C}\u{1F3FB}",
    "\u{1F44C}\u{1F3FC}",
    "\u{1F44C}\u{1F3FD}",
    "\u{1F44C}\u{1F3FE}",
    "\u{1F44C}\u{1F3FF}",
    "\u{1F90C}",
    "\u{1F90C}\u{1F3FB}",
    "\u{1F90C}\u{1F3FC}",
    "\u{1F90C}\u{1F3FD}",
    "\u{1F90C}\u{1F3FE}",
    "\u{1F90C}\u{1F3FF}",
    "\u{1F90F}",
    "\u{1F90F}\u{1F3FB}",
    "\u{1F90F}\u{1F3FC}",
    "\u{1F90F}\u{1F3FD}",
    "\u{1F90F}\u{1F3FE}",
    "\u{1F90F}\u{1F3FF}",
    "\u270C\uFE0F",
    "\u270C\u{1F3FB}",
    "\u270C\u{1F3FC}",
    "\u270C\u{1F3FD}",
    "\u270C\u{1F3FE}",
    "\u270C\u{1F3FF}",
    "\u{1F91E}",
    "\u{1F91E}\u{1F3FB}",
    "\u{1F91E}\u{1F3FC}",
    "\u{1F91E}\u{1F3FD}",
    "\u{1F91E}\u{1F3FE}",
    "\u{1F91E}\u{1F3FF}",
    "\u{1F91F}",
    "\u{1F91F}\u{1F3FB}",
    "\u{1F91F}\u{1F3FC}",
    "\u{1F91F}\u{1F3FD}",
    "\u{1F91F}\u{1F3FE}",
    "\u{1F91F}\u{1F3FF}",
    "\u{1F918}",
    "\u{1F918}\u{1F3FB}",
    "\u{1F918}\u{1F3FC}",
    "\u{1F918}\u{1F3FD}",
    "\u{1F918}\u{1F3FE}",
    "\u{1F918}\u{1F3FF}",
    "\u{1F919}",
    "\u{1F919}\u{1F3FB}",
    "\u{1F919}\u{1F3FC}",
    "\u{1F919}\u{1F3FD}",
    "\u{1F919}\u{1F3FE}",
    "\u{1F919}\u{1F3FF}",
    "\u{1F448}",
    "\u{1F448}\u{1F3FB}",
    "\u{1F448}\u{1F3FC}",
    "\u{1F448}\u{1F3FD}",
    "\u{1F448}\u{1F3FE}",
    "\u{1F448}\u{1F3FF}",
    "\u{1F449}",
    "\u{1F449}\u{1F3FB}",
    "\u{1F449}\u{1F3FC}",
    "\u{1F449}\u{1F3FD}",
    "\u{1F449}\u{1F3FE}",
    "\u{1F449}\u{1F3FF}",
    "\u{1F446}",
    "\u{1F446}\u{1F3FB}",
    "\u{1F446}\u{1F3FC}",
    "\u{1F446}\u{1F3FD}",
    "\u{1F446}\u{1F3FE}",
    "\u{1F446}\u{1F3FF}",
    "\u{1F595}",
    "\u{1F595}\u{1F3FB}",
    "\u{1F595}\u{1F3FC}",
    "\u{1F595}\u{1F3FD}",
    "\u{1F595}\u{1F3FE}",
    "\u{1F595}\u{1F3FF}",
    "\u{1F447}",
    "\u{1F447}\u{1F3FB}",
    "\u{1F447}\u{1F3FC}",
    "\u{1F447}\u{1F3FD}",
    "\u{1F447}\u{1F3FE}",
    "\u{1F447}\u{1F3FF}",
    "\u261D\uFE0F",
    "\u261D\u{1F3FB}",
    "\u261D\u{1F3FC}",
    "\u261D\u{1F3FD}",
    "\u261D\u{1F3FE}",
    "\u261D\u{1F3FF}",
    "\u{1F44D}",
    "\u{1F44D}\u{1F3FB}",
    "\u{1F44D}\u{1F3FC}",
    "\u{1F44D}\u{1F3FD}",
    "\u{1F44D}\u{1F3FE}",
    "\u{1F44D}\u{1F3FF}",
    "\u{1F44E}",
    "\u{1F44E}\u{1F3FB}",
    "\u{1F44E}\u{1F3FC}",
    "\u{1F44E}\u{1F3FD}",
    "\u{1F44E}\u{1F3FE}",
    "\u{1F44E}\u{1F3FF}",
    "\u270A",
    "\u270A\u{1F3FB}",
    "\u270A\u{1F3FC}",
    "\u270A\u{1F3FD}",
    "\u270A\u{1F3FE}",
    "\u270A\u{1F3FF}",
    "\u{1F44A}",
    "\u{1F44A}\u{1F3FB}",
    "\u{1F44A}\u{1F3FC}",
    "\u{1F44A}\u{1F3FD}",
    "\u{1F44A}\u{1F3FE}",
    "\u{1F44A}\u{1F3FF}",
    "\u{1F91B}",
    "\u{1F91B}\u{1F3FB}",
    "\u{1F91B}\u{1F3FC}",
    "\u{1F91B}\u{1F3FD}",
    "\u{1F91B}\u{1F3FE}",
    "\u{1F91B}\u{1F3FF}",
    "\u{1F91C}",
    "\u{1F91C}\u{1F3FB}",
    "\u{1F91C}\u{1F3FC}",
    "\u{1F91C}\u{1F3FD}",
    "\u{1F91C}\u{1F3FE}",
    "\u{1F91C}\u{1F3FF}",
    "\u{1F44F}",
    "\u{1F44F}\u{1F3FB}",
    "\u{1F44F}\u{1F3FC}",
    "\u{1F44F}\u{1F3FD}",
    "\u{1F44F}\u{1F3FE}",
    "\u{1F44F}\u{1F3FF}",
    "\u{1F64C}",
    "\u{1F64C}\u{1F3FB}",
    "\u{1F64C}\u{1F3FC}",
    "\u{1F64C}\u{1F3FD}",
    "\u{1F64C}\u{1F3FE}",
    "\u{1F64C}\u{1F3FF}",
    "\u{1F450}",
    "\u{1F450}\u{1F3FB}",
    "\u{1F450}\u{1F3FC}",
    "\u{1F450}\u{1F3FD}",
    "\u{1F450}\u{1F3FE}",
    "\u{1F450}\u{1F3FF}",
    "\u{1F932}",
    "\u{1F932}\u{1F3FB}",
    "\u{1F932}\u{1F3FC}",
    "\u{1F932}\u{1F3FD}",
    "\u{1F932}\u{1F3FE}",
    "\u{1F932}\u{1F3FF}",
    "\u{1F91D}",
    "\u{1F64F}",
    "\u{1F64F}\u{1F3FB}",
    "\u{1F64F}\u{1F3FC}",
    "\u{1F64F}\u{1F3FD}",
    "\u{1F64F}\u{1F3FE}",
    "\u{1F64F}\u{1F3FF}",
    "\u270D\uFE0F",
    "\u270D\u{1F3FB}",
    "\u270D\u{1F3FC}",
    "\u270D\u{1F3FD}",
    "\u270D\u{1F3FE}",
    "\u270D\u{1F3FF}",
    "\u{1F485}",
    "\u{1F485}\u{1F3FB}",
    "\u{1F485}\u{1F3FC}",
    "\u{1F485}\u{1F3FD}",
    "\u{1F485}\u{1F3FE}",
    "\u{1F485}\u{1F3FF}",
    "\u{1F933}",
    "\u{1F933}\u{1F3FB}",
    "\u{1F933}\u{1F3FC}",
    "\u{1F933}\u{1F3FD}",
    "\u{1F933}\u{1F3FE}",
    "\u{1F933}\u{1F3FF}",
    "\u{1F4AA}",
    "\u{1F4AA}\u{1F3FB}",
    "\u{1F4AA}\u{1F3FC}",
    "\u{1F4AA}\u{1F3FD}",
    "\u{1F4AA}\u{1F3FE}",
    "\u{1F4AA}\u{1F3FF}",
    "\u{1F9BE}",
    "\u{1F9BF}",
    "\u{1F9B5}",
    "\u{1F9B5}\u{1F3FB}",
    "\u{1F9B5}\u{1F3FC}",
    "\u{1F9B5}\u{1F3FD}",
    "\u{1F9B5}\u{1F3FE}",
    "\u{1F9B5}\u{1F3FF}",
    "\u{1F9B6}",
    "\u{1F9B6}\u{1F3FB}",
    "\u{1F9B6}\u{1F3FC}",
    "\u{1F9B6}\u{1F3FD}",
    "\u{1F9B6}\u{1F3FE}",
    "\u{1F9B6}\u{1F3FF}",
    "\u{1F442}",
    "\u{1F442}\u{1F3FB}",
    "\u{1F442}\u{1F3FC}",
    "\u{1F442}\u{1F3FD}",
    "\u{1F442}\u{1F3FE}",
    "\u{1F442}\u{1F3FF}",
    "\u{1F9BB}",
    "\u{1F9BB}\u{1F3FB}",
    "\u{1F9BB}\u{1F3FC}",
    "\u{1F9BB}\u{1F3FD}",
    "\u{1F9BB}\u{1F3FE}",
    "\u{1F9BB}\u{1F3FF}",
    "\u{1F443}",
    "\u{1F443}\u{1F3FB}",
    "\u{1F443}\u{1F3FC}",
    "\u{1F443}\u{1F3FD}",
    "\u{1F443}\u{1F3FE}",
    "\u{1F443}\u{1F3FF}",
    "\u{1F9E0}",
    "\u{1FAC0}",
    "\u{1FAC1}",
    "\u{1F9B7}",
    "\u{1F9B4}",
    "\u{1F440}",
    "\u{1F441}\uFE0F",
    "\u{1F445}",
    "\u{1F444}"
  ],
  person: [
    "\u{1F476}",
    "\u{1F476}\u{1F3FB}",
    "\u{1F476}\u{1F3FC}",
    "\u{1F476}\u{1F3FD}",
    "\u{1F476}\u{1F3FE}",
    "\u{1F476}\u{1F3FF}",
    "\u{1F9D2}",
    "\u{1F9D2}\u{1F3FB}",
    "\u{1F9D2}\u{1F3FC}",
    "\u{1F9D2}\u{1F3FD}",
    "\u{1F9D2}\u{1F3FE}",
    "\u{1F9D2}\u{1F3FF}",
    "\u{1F466}",
    "\u{1F466}\u{1F3FB}",
    "\u{1F466}\u{1F3FC}",
    "\u{1F466}\u{1F3FD}",
    "\u{1F466}\u{1F3FE}",
    "\u{1F466}\u{1F3FF}",
    "\u{1F467}",
    "\u{1F467}\u{1F3FB}",
    "\u{1F467}\u{1F3FC}",
    "\u{1F467}\u{1F3FD}",
    "\u{1F467}\u{1F3FE}",
    "\u{1F467}\u{1F3FF}",
    "\u{1F9D1}",
    "\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FF}",
    "\u{1F471}",
    "\u{1F471}\u{1F3FB}",
    "\u{1F471}\u{1F3FC}",
    "\u{1F471}\u{1F3FD}",
    "\u{1F471}\u{1F3FE}",
    "\u{1F471}\u{1F3FF}",
    "\u{1F468}",
    "\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FF}",
    "\u{1F9D4}",
    "\u{1F9D4}\u{1F3FB}",
    "\u{1F9D4}\u{1F3FC}",
    "\u{1F9D4}\u{1F3FD}",
    "\u{1F9D4}\u{1F3FE}",
    "\u{1F9D4}\u{1F3FF}",
    "\u{1F9D4}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D4}\u200D\u2640\uFE0F",
    "\u{1F9D4}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9D4}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9D4}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9D4}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9D4}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F468}\u200D\u{1F9B0}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9B0}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9B0}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9B0}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9B0}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9B0}",
    "\u{1F468}\u200D\u{1F9B1}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9B1}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9B1}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9B1}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9B1}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9B1}",
    "\u{1F468}\u200D\u{1F9B3}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9B3}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9B3}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9B3}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9B3}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9B3}",
    "\u{1F468}\u200D\u{1F9B2}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9B2}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9B2}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9B2}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9B2}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9B2}",
    "\u{1F469}",
    "\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FF}",
    "\u{1F469}\u200D\u{1F9B0}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9B0}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9B0}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9B0}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9B0}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9B0}",
    "\u{1F9D1}\u200D\u{1F9B0}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9B0}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9B0}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9B0}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9B0}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9B0}",
    "\u{1F469}\u200D\u{1F9B1}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9B1}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9B1}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9B1}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9B1}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9B1}",
    "\u{1F9D1}\u200D\u{1F9B1}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9B1}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9B1}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9B1}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9B1}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9B1}",
    "\u{1F469}\u200D\u{1F9B3}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9B3}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9B3}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9B3}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9B3}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9B3}",
    "\u{1F9D1}\u200D\u{1F9B3}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9B3}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9B3}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9B3}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9B3}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9B3}",
    "\u{1F469}\u200D\u{1F9B2}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9B2}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9B2}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9B2}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9B2}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9B2}",
    "\u{1F9D1}\u200D\u{1F9B2}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9B2}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9B2}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9B2}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9B2}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9B2}",
    "\u{1F471}\u200D\u2640\uFE0F",
    "\u{1F471}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F471}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F471}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F471}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F471}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F471}\u200D\u2642\uFE0F",
    "\u{1F471}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F471}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F471}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F471}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F471}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D3}",
    "\u{1F9D3}\u{1F3FB}",
    "\u{1F9D3}\u{1F3FC}",
    "\u{1F9D3}\u{1F3FD}",
    "\u{1F9D3}\u{1F3FE}",
    "\u{1F9D3}\u{1F3FF}",
    "\u{1F474}",
    "\u{1F474}\u{1F3FB}",
    "\u{1F474}\u{1F3FC}",
    "\u{1F474}\u{1F3FD}",
    "\u{1F474}\u{1F3FE}",
    "\u{1F474}\u{1F3FF}",
    "\u{1F475}",
    "\u{1F475}\u{1F3FB}",
    "\u{1F475}\u{1F3FC}",
    "\u{1F475}\u{1F3FD}",
    "\u{1F475}\u{1F3FE}",
    "\u{1F475}\u{1F3FF}",
    "\u{1F64D}",
    "\u{1F64D}\u{1F3FB}",
    "\u{1F64D}\u{1F3FC}",
    "\u{1F64D}\u{1F3FD}",
    "\u{1F64D}\u{1F3FE}",
    "\u{1F64D}\u{1F3FF}",
    "\u{1F64D}\u200D\u2642\uFE0F",
    "\u{1F64D}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F64D}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F64D}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F64D}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F64D}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F64D}\u200D\u2640\uFE0F",
    "\u{1F64D}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F64D}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F64D}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F64D}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F64D}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F64E}",
    "\u{1F64E}\u{1F3FB}",
    "\u{1F64E}\u{1F3FC}",
    "\u{1F64E}\u{1F3FD}",
    "\u{1F64E}\u{1F3FE}",
    "\u{1F64E}\u{1F3FF}",
    "\u{1F64E}\u200D\u2642\uFE0F",
    "\u{1F64E}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F64E}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F64E}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F64E}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F64E}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F64E}\u200D\u2640\uFE0F",
    "\u{1F64E}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F64E}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F64E}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F64E}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F64E}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F645}",
    "\u{1F645}\u{1F3FB}",
    "\u{1F645}\u{1F3FC}",
    "\u{1F645}\u{1F3FD}",
    "\u{1F645}\u{1F3FE}",
    "\u{1F645}\u{1F3FF}",
    "\u{1F645}\u200D\u2642\uFE0F",
    "\u{1F645}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F645}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F645}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F645}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F645}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F645}\u200D\u2640\uFE0F",
    "\u{1F645}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F645}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F645}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F645}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F645}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F646}",
    "\u{1F646}\u{1F3FB}",
    "\u{1F646}\u{1F3FC}",
    "\u{1F646}\u{1F3FD}",
    "\u{1F646}\u{1F3FE}",
    "\u{1F646}\u{1F3FF}",
    "\u{1F646}\u200D\u2642\uFE0F",
    "\u{1F646}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F646}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F646}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F646}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F646}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F646}\u200D\u2640\uFE0F",
    "\u{1F646}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F646}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F646}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F646}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F646}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F481}",
    "\u{1F481}\u{1F3FB}",
    "\u{1F481}\u{1F3FC}",
    "\u{1F481}\u{1F3FD}",
    "\u{1F481}\u{1F3FE}",
    "\u{1F481}\u{1F3FF}",
    "\u{1F481}\u200D\u2642\uFE0F",
    "\u{1F481}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F481}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F481}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F481}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F481}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F481}\u200D\u2640\uFE0F",
    "\u{1F481}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F481}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F481}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F481}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F481}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F64B}",
    "\u{1F64B}\u{1F3FB}",
    "\u{1F64B}\u{1F3FC}",
    "\u{1F64B}\u{1F3FD}",
    "\u{1F64B}\u{1F3FE}",
    "\u{1F64B}\u{1F3FF}",
    "\u{1F64B}\u200D\u2642\uFE0F",
    "\u{1F64B}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F64B}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F64B}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F64B}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F64B}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F64B}\u200D\u2640\uFE0F",
    "\u{1F64B}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F64B}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F64B}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F64B}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F64B}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9CF}",
    "\u{1F9CF}\u{1F3FB}",
    "\u{1F9CF}\u{1F3FC}",
    "\u{1F9CF}\u{1F3FD}",
    "\u{1F9CF}\u{1F3FE}",
    "\u{1F9CF}\u{1F3FF}",
    "\u{1F9CF}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9CF}\u200D\u2640\uFE0F",
    "\u{1F9CF}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9CF}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9CF}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9CF}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9CF}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F647}",
    "\u{1F647}\u{1F3FB}",
    "\u{1F647}\u{1F3FC}",
    "\u{1F647}\u{1F3FD}",
    "\u{1F647}\u{1F3FE}",
    "\u{1F647}\u{1F3FF}",
    "\u{1F647}\u200D\u2642\uFE0F",
    "\u{1F647}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F647}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F647}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F647}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F647}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F647}\u200D\u2640\uFE0F",
    "\u{1F647}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F647}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F647}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F647}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F647}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F926}",
    "\u{1F926}\u{1F3FB}",
    "\u{1F926}\u{1F3FC}",
    "\u{1F926}\u{1F3FD}",
    "\u{1F926}\u{1F3FE}",
    "\u{1F926}\u{1F3FF}",
    "\u{1F926}\u200D\u2642\uFE0F",
    "\u{1F926}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F926}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F926}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F926}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F926}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F926}\u200D\u2640\uFE0F",
    "\u{1F926}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F926}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F926}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F926}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F926}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F937}",
    "\u{1F937}\u{1F3FB}",
    "\u{1F937}\u{1F3FC}",
    "\u{1F937}\u{1F3FD}",
    "\u{1F937}\u{1F3FE}",
    "\u{1F937}\u{1F3FF}",
    "\u{1F937}\u200D\u2642\uFE0F",
    "\u{1F937}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F937}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F937}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F937}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F937}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F937}\u200D\u2640\uFE0F",
    "\u{1F937}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F937}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F937}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F937}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F937}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9D1}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u{1F3FB}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u{1F3FC}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u{1F3FD}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u{1F3FE}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u{1F3FF}\u200D\u2695\uFE0F",
    "\u{1F468}\u200D\u2695\uFE0F",
    "\u{1F468}\u{1F3FB}\u200D\u2695\uFE0F",
    "\u{1F468}\u{1F3FC}\u200D\u2695\uFE0F",
    "\u{1F468}\u{1F3FD}\u200D\u2695\uFE0F",
    "\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F",
    "\u{1F468}\u{1F3FF}\u200D\u2695\uFE0F",
    "\u{1F469}\u200D\u2695\uFE0F",
    "\u{1F469}\u{1F3FB}\u200D\u2695\uFE0F",
    "\u{1F469}\u{1F3FC}\u200D\u2695\uFE0F",
    "\u{1F469}\u{1F3FD}\u200D\u2695\uFE0F",
    "\u{1F469}\u{1F3FE}\u200D\u2695\uFE0F",
    "\u{1F469}\u{1F3FF}\u200D\u2695\uFE0F",
    "\u{1F9D1}\u200D\u{1F393}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F393}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F393}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F393}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F393}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F393}",
    "\u{1F468}\u200D\u{1F393}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F393}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F393}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F393}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F393}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F393}",
    "\u{1F469}\u200D\u{1F393}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F393}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F393}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F393}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F393}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F393}",
    "\u{1F9D1}\u200D\u{1F3EB}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F3EB}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F3EB}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F3EB}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F3EB}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F3EB}",
    "\u{1F468}\u200D\u{1F3EB}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F3EB}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F3EB}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F3EB}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F3EB}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F3EB}",
    "\u{1F469}\u200D\u{1F3EB}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F3EB}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F3EB}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F3EB}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F3EB}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F3EB}",
    "\u{1F9D1}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u{1F3FB}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u{1F3FC}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u{1F3FD}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u{1F3FE}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u{1F3FF}\u200D\u2696\uFE0F",
    "\u{1F468}\u200D\u2696\uFE0F",
    "\u{1F468}\u{1F3FB}\u200D\u2696\uFE0F",
    "\u{1F468}\u{1F3FC}\u200D\u2696\uFE0F",
    "\u{1F468}\u{1F3FD}\u200D\u2696\uFE0F",
    "\u{1F468}\u{1F3FE}\u200D\u2696\uFE0F",
    "\u{1F468}\u{1F3FF}\u200D\u2696\uFE0F",
    "\u{1F469}\u200D\u2696\uFE0F",
    "\u{1F469}\u{1F3FB}\u200D\u2696\uFE0F",
    "\u{1F469}\u{1F3FC}\u200D\u2696\uFE0F",
    "\u{1F469}\u{1F3FD}\u200D\u2696\uFE0F",
    "\u{1F469}\u{1F3FE}\u200D\u2696\uFE0F",
    "\u{1F469}\u{1F3FF}\u200D\u2696\uFE0F",
    "\u{1F9D1}\u200D\u{1F33E}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F33E}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F33E}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F33E}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F33E}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F33E}",
    "\u{1F468}\u200D\u{1F33E}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F33E}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F33E}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F33E}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F33E}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F33E}",
    "\u{1F469}\u200D\u{1F33E}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F33E}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F33E}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F33E}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F33E}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F33E}",
    "\u{1F9D1}\u200D\u{1F373}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F373}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F373}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F373}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F373}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F373}",
    "\u{1F468}\u200D\u{1F373}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F373}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F373}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F373}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F373}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F373}",
    "\u{1F469}\u200D\u{1F373}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F373}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F373}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F373}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F373}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F373}",
    "\u{1F9D1}\u200D\u{1F527}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F527}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F527}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F527}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F527}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F527}",
    "\u{1F468}\u200D\u{1F527}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F527}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F527}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F527}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F527}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F527}",
    "\u{1F469}\u200D\u{1F527}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F527}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F527}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F527}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F527}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F527}",
    "\u{1F9D1}\u200D\u{1F3ED}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F3ED}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F3ED}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F3ED}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F3ED}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F3ED}",
    "\u{1F468}\u200D\u{1F3ED}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F3ED}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F3ED}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F3ED}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F3ED}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F3ED}",
    "\u{1F469}\u200D\u{1F3ED}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F3ED}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F3ED}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F3ED}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F3ED}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F3ED}",
    "\u{1F9D1}\u200D\u{1F4BC}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F4BC}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F4BC}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F4BC}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F4BC}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F4BC}",
    "\u{1F468}\u200D\u{1F4BC}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F4BC}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F4BC}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F4BC}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F4BC}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F4BC}",
    "\u{1F469}\u200D\u{1F4BC}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F4BC}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F4BC}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F4BC}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F4BC}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F4BC}",
    "\u{1F9D1}\u200D\u{1F52C}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F52C}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F52C}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F52C}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F52C}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F52C}",
    "\u{1F468}\u200D\u{1F52C}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F52C}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F52C}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F52C}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F52C}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F52C}",
    "\u{1F469}\u200D\u{1F52C}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F52C}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F52C}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F52C}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F52C}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F52C}",
    "\u{1F9D1}\u200D\u{1F4BB}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F4BB}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F4BB}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F4BB}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F4BB}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F4BB}",
    "\u{1F468}\u200D\u{1F4BB}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F4BB}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F4BB}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F4BB}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F4BB}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F4BB}",
    "\u{1F469}\u200D\u{1F4BB}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F4BB}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F4BB}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F4BB}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F4BB}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F4BB}",
    "\u{1F9D1}\u200D\u{1F3A4}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F3A4}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F3A4}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F3A4}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F3A4}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F3A4}",
    "\u{1F468}\u200D\u{1F3A4}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F3A4}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F3A4}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F3A4}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F3A4}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F3A4}",
    "\u{1F469}\u200D\u{1F3A4}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F3A4}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F3A4}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F3A4}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F3A4}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F3A4}",
    "\u{1F9D1}\u200D\u{1F3A8}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F3A8}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F3A8}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F3A8}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F3A8}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F3A8}",
    "\u{1F468}\u200D\u{1F3A8}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F3A8}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F3A8}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F3A8}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F3A8}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F3A8}",
    "\u{1F469}\u200D\u{1F3A8}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F3A8}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F3A8}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F3A8}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F3A8}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F3A8}",
    "\u{1F9D1}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u{1F3FB}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u{1F3FC}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u{1F3FD}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u{1F3FE}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u{1F3FF}\u200D\u2708\uFE0F",
    "\u{1F468}\u200D\u2708\uFE0F",
    "\u{1F468}\u{1F3FB}\u200D\u2708\uFE0F",
    "\u{1F468}\u{1F3FC}\u200D\u2708\uFE0F",
    "\u{1F468}\u{1F3FD}\u200D\u2708\uFE0F",
    "\u{1F468}\u{1F3FE}\u200D\u2708\uFE0F",
    "\u{1F468}\u{1F3FF}\u200D\u2708\uFE0F",
    "\u{1F469}\u200D\u2708\uFE0F",
    "\u{1F469}\u{1F3FB}\u200D\u2708\uFE0F",
    "\u{1F469}\u{1F3FC}\u200D\u2708\uFE0F",
    "\u{1F469}\u{1F3FD}\u200D\u2708\uFE0F",
    "\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F",
    "\u{1F469}\u{1F3FF}\u200D\u2708\uFE0F",
    "\u{1F9D1}\u200D\u{1F680}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F680}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F680}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F680}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F680}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F680}",
    "\u{1F468}\u200D\u{1F680}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F680}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F680}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F680}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F680}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F680}",
    "\u{1F469}\u200D\u{1F680}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F680}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F680}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F680}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F680}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F680}",
    "\u{1F9D1}\u200D\u{1F692}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F692}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F692}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F692}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F692}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F692}",
    "\u{1F468}\u200D\u{1F692}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F692}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F692}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F692}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F692}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F692}",
    "\u{1F469}\u200D\u{1F692}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F692}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F692}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F692}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F692}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F692}",
    "\u{1F46E}",
    "\u{1F46E}\u{1F3FB}",
    "\u{1F46E}\u{1F3FC}",
    "\u{1F46E}\u{1F3FD}",
    "\u{1F46E}\u{1F3FE}",
    "\u{1F46E}\u{1F3FF}",
    "\u{1F46E}\u200D\u2642\uFE0F",
    "\u{1F46E}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F46E}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F46E}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F46E}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F46E}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F46E}\u200D\u2640\uFE0F",
    "\u{1F46E}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F46E}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F46E}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F46E}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F46E}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F575}\uFE0F",
    "\u{1F575}\u{1F3FB}",
    "\u{1F575}\u{1F3FC}",
    "\u{1F575}\u{1F3FD}",
    "\u{1F575}\u{1F3FE}",
    "\u{1F575}\u{1F3FF}",
    "\u{1F575}\uFE0F\u200D\u2642\uFE0F",
    "\u{1F575}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F575}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F575}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F575}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F575}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F575}\uFE0F\u200D\u2640\uFE0F",
    "\u{1F575}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F575}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F575}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F575}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F575}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F482}",
    "\u{1F482}\u{1F3FB}",
    "\u{1F482}\u{1F3FC}",
    "\u{1F482}\u{1F3FD}",
    "\u{1F482}\u{1F3FE}",
    "\u{1F482}\u{1F3FF}",
    "\u{1F482}\u200D\u2642\uFE0F",
    "\u{1F482}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F482}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F482}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F482}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F482}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F482}\u200D\u2640\uFE0F",
    "\u{1F482}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F482}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F482}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F482}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F482}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F977}",
    "\u{1F977}\u{1F3FB}",
    "\u{1F977}\u{1F3FC}",
    "\u{1F977}\u{1F3FD}",
    "\u{1F977}\u{1F3FE}",
    "\u{1F977}\u{1F3FF}",
    "\u{1F477}",
    "\u{1F477}\u{1F3FB}",
    "\u{1F477}\u{1F3FC}",
    "\u{1F477}\u{1F3FD}",
    "\u{1F477}\u{1F3FE}",
    "\u{1F477}\u{1F3FF}",
    "\u{1F477}\u200D\u2642\uFE0F",
    "\u{1F477}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F477}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F477}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F477}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F477}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F477}\u200D\u2640\uFE0F",
    "\u{1F477}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F477}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F477}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F477}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F477}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F934}",
    "\u{1F934}\u{1F3FB}",
    "\u{1F934}\u{1F3FC}",
    "\u{1F934}\u{1F3FD}",
    "\u{1F934}\u{1F3FE}",
    "\u{1F934}\u{1F3FF}",
    "\u{1F478}",
    "\u{1F478}\u{1F3FB}",
    "\u{1F478}\u{1F3FC}",
    "\u{1F478}\u{1F3FD}",
    "\u{1F478}\u{1F3FE}",
    "\u{1F478}\u{1F3FF}",
    "\u{1F473}",
    "\u{1F473}\u{1F3FB}",
    "\u{1F473}\u{1F3FC}",
    "\u{1F473}\u{1F3FD}",
    "\u{1F473}\u{1F3FE}",
    "\u{1F473}\u{1F3FF}",
    "\u{1F473}\u200D\u2642\uFE0F",
    "\u{1F473}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F473}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F473}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F473}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F473}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F473}\u200D\u2640\uFE0F",
    "\u{1F473}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F473}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F473}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F473}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F473}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F472}",
    "\u{1F472}\u{1F3FB}",
    "\u{1F472}\u{1F3FC}",
    "\u{1F472}\u{1F3FD}",
    "\u{1F472}\u{1F3FE}",
    "\u{1F472}\u{1F3FF}",
    "\u{1F9D5}",
    "\u{1F9D5}\u{1F3FB}",
    "\u{1F9D5}\u{1F3FC}",
    "\u{1F9D5}\u{1F3FD}",
    "\u{1F9D5}\u{1F3FE}",
    "\u{1F9D5}\u{1F3FF}",
    "\u{1F935}",
    "\u{1F935}\u{1F3FB}",
    "\u{1F935}\u{1F3FC}",
    "\u{1F935}\u{1F3FD}",
    "\u{1F935}\u{1F3FE}",
    "\u{1F935}\u{1F3FF}",
    "\u{1F935}\u200D\u2642\uFE0F",
    "\u{1F935}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F935}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F935}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F935}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F935}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F935}\u200D\u2640\uFE0F",
    "\u{1F935}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F935}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F935}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F935}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F935}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F470}",
    "\u{1F470}\u{1F3FB}",
    "\u{1F470}\u{1F3FC}",
    "\u{1F470}\u{1F3FD}",
    "\u{1F470}\u{1F3FE}",
    "\u{1F470}\u{1F3FF}",
    "\u{1F470}\u200D\u2642\uFE0F",
    "\u{1F470}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F470}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F470}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F470}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F470}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F470}\u200D\u2640\uFE0F",
    "\u{1F470}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F470}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F470}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F470}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F470}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F930}",
    "\u{1F930}\u{1F3FB}",
    "\u{1F930}\u{1F3FC}",
    "\u{1F930}\u{1F3FD}",
    "\u{1F930}\u{1F3FE}",
    "\u{1F930}\u{1F3FF}",
    "\u{1F931}",
    "\u{1F931}\u{1F3FB}",
    "\u{1F931}\u{1F3FC}",
    "\u{1F931}\u{1F3FD}",
    "\u{1F931}\u{1F3FE}",
    "\u{1F931}\u{1F3FF}",
    "\u{1F469}\u200D\u{1F37C}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F37C}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F37C}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F37C}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F37C}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F37C}",
    "\u{1F468}\u200D\u{1F37C}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F37C}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F37C}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F37C}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F37C}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F37C}",
    "\u{1F9D1}\u200D\u{1F37C}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F37C}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F37C}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F37C}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F37C}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F37C}",
    "\u{1F47C}",
    "\u{1F47C}\u{1F3FB}",
    "\u{1F47C}\u{1F3FC}",
    "\u{1F47C}\u{1F3FD}",
    "\u{1F47C}\u{1F3FE}",
    "\u{1F47C}\u{1F3FF}",
    "\u{1F385}",
    "\u{1F385}\u{1F3FB}",
    "\u{1F385}\u{1F3FC}",
    "\u{1F385}\u{1F3FD}",
    "\u{1F385}\u{1F3FE}",
    "\u{1F385}\u{1F3FF}",
    "\u{1F936}",
    "\u{1F936}\u{1F3FB}",
    "\u{1F936}\u{1F3FC}",
    "\u{1F936}\u{1F3FD}",
    "\u{1F936}\u{1F3FE}",
    "\u{1F936}\u{1F3FF}",
    "\u{1F9D1}\u200D\u{1F384}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F384}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F384}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F384}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F384}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F384}",
    "\u{1F9B8}",
    "\u{1F9B8}\u{1F3FB}",
    "\u{1F9B8}\u{1F3FC}",
    "\u{1F9B8}\u{1F3FD}",
    "\u{1F9B8}\u{1F3FE}",
    "\u{1F9B8}\u{1F3FF}",
    "\u{1F9B8}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9B8}\u200D\u2640\uFE0F",
    "\u{1F9B8}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9B8}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9B8}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9B8}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9B8}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9B9}",
    "\u{1F9B9}\u{1F3FB}",
    "\u{1F9B9}\u{1F3FC}",
    "\u{1F9B9}\u{1F3FD}",
    "\u{1F9B9}\u{1F3FE}",
    "\u{1F9B9}\u{1F3FF}",
    "\u{1F9B9}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9B9}\u200D\u2640\uFE0F",
    "\u{1F9B9}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9B9}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9B9}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9B9}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9B9}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9D9}",
    "\u{1F9D9}\u{1F3FB}",
    "\u{1F9D9}\u{1F3FC}",
    "\u{1F9D9}\u{1F3FD}",
    "\u{1F9D9}\u{1F3FE}",
    "\u{1F9D9}\u{1F3FF}",
    "\u{1F9D9}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D9}\u200D\u2640\uFE0F",
    "\u{1F9D9}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9D9}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9D9}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9D9}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9D9}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9DA}",
    "\u{1F9DA}\u{1F3FB}",
    "\u{1F9DA}\u{1F3FC}",
    "\u{1F9DA}\u{1F3FD}",
    "\u{1F9DA}\u{1F3FE}",
    "\u{1F9DA}\u{1F3FF}",
    "\u{1F9DA}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9DA}\u200D\u2640\uFE0F",
    "\u{1F9DA}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9DA}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9DA}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9DA}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9DA}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9DB}",
    "\u{1F9DB}\u{1F3FB}",
    "\u{1F9DB}\u{1F3FC}",
    "\u{1F9DB}\u{1F3FD}",
    "\u{1F9DB}\u{1F3FE}",
    "\u{1F9DB}\u{1F3FF}",
    "\u{1F9DB}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9DB}\u200D\u2640\uFE0F",
    "\u{1F9DB}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9DB}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9DB}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9DB}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9DB}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9DC}",
    "\u{1F9DC}\u{1F3FB}",
    "\u{1F9DC}\u{1F3FC}",
    "\u{1F9DC}\u{1F3FD}",
    "\u{1F9DC}\u{1F3FE}",
    "\u{1F9DC}\u{1F3FF}",
    "\u{1F9DC}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9DC}\u200D\u2640\uFE0F",
    "\u{1F9DC}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9DC}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9DC}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9DC}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9DC}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9DD}",
    "\u{1F9DD}\u{1F3FB}",
    "\u{1F9DD}\u{1F3FC}",
    "\u{1F9DD}\u{1F3FD}",
    "\u{1F9DD}\u{1F3FE}",
    "\u{1F9DD}\u{1F3FF}",
    "\u{1F9DD}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9DD}\u200D\u2640\uFE0F",
    "\u{1F9DD}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9DD}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9DD}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9DD}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9DD}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9DE}",
    "\u{1F9DE}\u200D\u2642\uFE0F",
    "\u{1F9DE}\u200D\u2640\uFE0F",
    "\u{1F9DF}",
    "\u{1F9DF}\u200D\u2642\uFE0F",
    "\u{1F9DF}\u200D\u2640\uFE0F",
    "\u{1F486}",
    "\u{1F486}\u{1F3FB}",
    "\u{1F486}\u{1F3FC}",
    "\u{1F486}\u{1F3FD}",
    "\u{1F486}\u{1F3FE}",
    "\u{1F486}\u{1F3FF}",
    "\u{1F486}\u200D\u2642\uFE0F",
    "\u{1F486}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F486}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F486}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F486}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F486}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F486}\u200D\u2640\uFE0F",
    "\u{1F486}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F486}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F486}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F486}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F486}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F487}",
    "\u{1F487}\u{1F3FB}",
    "\u{1F487}\u{1F3FC}",
    "\u{1F487}\u{1F3FD}",
    "\u{1F487}\u{1F3FE}",
    "\u{1F487}\u{1F3FF}",
    "\u{1F487}\u200D\u2642\uFE0F",
    "\u{1F487}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F487}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F487}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F487}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F487}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F487}\u200D\u2640\uFE0F",
    "\u{1F487}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F487}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F487}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F487}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F487}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F6B6}",
    "\u{1F6B6}\u{1F3FB}",
    "\u{1F6B6}\u{1F3FC}",
    "\u{1F6B6}\u{1F3FD}",
    "\u{1F6B6}\u{1F3FE}",
    "\u{1F6B6}\u{1F3FF}",
    "\u{1F6B6}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F6B6}\u200D\u2640\uFE0F",
    "\u{1F6B6}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F6B6}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F6B6}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F6B6}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F6B6}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9CD}",
    "\u{1F9CD}\u{1F3FB}",
    "\u{1F9CD}\u{1F3FC}",
    "\u{1F9CD}\u{1F3FD}",
    "\u{1F9CD}\u{1F3FE}",
    "\u{1F9CD}\u{1F3FF}",
    "\u{1F9CD}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9CD}\u200D\u2640\uFE0F",
    "\u{1F9CD}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9CD}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9CD}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9CD}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9CD}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9CE}",
    "\u{1F9CE}\u{1F3FB}",
    "\u{1F9CE}\u{1F3FC}",
    "\u{1F9CE}\u{1F3FD}",
    "\u{1F9CE}\u{1F3FE}",
    "\u{1F9CE}\u{1F3FF}",
    "\u{1F9CE}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9CE}\u200D\u2640\uFE0F",
    "\u{1F9CE}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9CE}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9CE}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9CE}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9CE}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9D1}\u200D\u{1F9AF}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9AF}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9AF}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9AF}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9AF}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9AF}",
    "\u{1F468}\u200D\u{1F9AF}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9AF}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9AF}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9AF}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9AF}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9AF}",
    "\u{1F469}\u200D\u{1F9AF}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9AF}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9AF}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9AF}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9AF}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9AF}",
    "\u{1F9D1}\u200D\u{1F9BC}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9BC}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9BC}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9BC}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9BC}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9BC}",
    "\u{1F468}\u200D\u{1F9BC}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9BC}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9BC}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9BC}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9BC}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9BC}",
    "\u{1F469}\u200D\u{1F9BC}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9BC}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9BC}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9BC}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9BC}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9BC}",
    "\u{1F9D1}\u200D\u{1F9BD}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F9BD}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F9BD}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F9BD}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F9BD}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F9BD}",
    "\u{1F468}\u200D\u{1F9BD}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F9BD}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F9BD}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F9BD}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F9BD}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F9BD}",
    "\u{1F469}\u200D\u{1F9BD}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F9BD}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F9BD}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F9BD}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F9BD}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F9BD}",
    "\u{1F3C3}",
    "\u{1F3C3}\u{1F3FB}",
    "\u{1F3C3}\u{1F3FC}",
    "\u{1F3C3}\u{1F3FD}",
    "\u{1F3C3}\u{1F3FE}",
    "\u{1F3C3}\u{1F3FF}",
    "\u{1F3C3}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F3C3}\u200D\u2640\uFE0F",
    "\u{1F3C3}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F3C3}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F3C3}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F3C3}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F3C3}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F483}",
    "\u{1F483}\u{1F3FB}",
    "\u{1F483}\u{1F3FC}",
    "\u{1F483}\u{1F3FD}",
    "\u{1F483}\u{1F3FE}",
    "\u{1F483}\u{1F3FF}",
    "\u{1F57A}",
    "\u{1F57A}\u{1F3FB}",
    "\u{1F57A}\u{1F3FC}",
    "\u{1F57A}\u{1F3FD}",
    "\u{1F57A}\u{1F3FE}",
    "\u{1F57A}\u{1F3FF}",
    "\u{1F574}\uFE0F",
    "\u{1F574}\u{1F3FB}",
    "\u{1F574}\u{1F3FC}",
    "\u{1F574}\u{1F3FD}",
    "\u{1F574}\u{1F3FE}",
    "\u{1F574}\u{1F3FF}",
    "\u{1F46F}",
    "\u{1F46F}\u200D\u2642\uFE0F",
    "\u{1F46F}\u200D\u2640\uFE0F",
    "\u{1F9D6}",
    "\u{1F9D6}\u{1F3FB}",
    "\u{1F9D6}\u{1F3FC}",
    "\u{1F9D6}\u{1F3FD}",
    "\u{1F9D6}\u{1F3FE}",
    "\u{1F9D6}\u{1F3FF}",
    "\u{1F9D6}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D6}\u200D\u2640\uFE0F",
    "\u{1F9D6}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9D6}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9D6}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9D6}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9D6}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9D7}",
    "\u{1F9D7}\u{1F3FB}",
    "\u{1F9D7}\u{1F3FC}",
    "\u{1F9D7}\u{1F3FD}",
    "\u{1F9D7}\u{1F3FE}",
    "\u{1F9D7}\u{1F3FF}",
    "\u{1F9D7}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D7}\u200D\u2640\uFE0F",
    "\u{1F9D7}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9D7}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9D7}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9D7}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9D7}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F93A}",
    "\u{1F3C7}",
    "\u{1F3C7}\u{1F3FB}",
    "\u{1F3C7}\u{1F3FC}",
    "\u{1F3C7}\u{1F3FD}",
    "\u{1F3C7}\u{1F3FE}",
    "\u{1F3C7}\u{1F3FF}",
    "\u26F7\uFE0F",
    "\u{1F3C2}",
    "\u{1F3C2}\u{1F3FB}",
    "\u{1F3C2}\u{1F3FC}",
    "\u{1F3C2}\u{1F3FD}",
    "\u{1F3C2}\u{1F3FE}",
    "\u{1F3C2}\u{1F3FF}",
    "\u{1F3CC}\uFE0F",
    "\u{1F3CC}\u{1F3FB}",
    "\u{1F3CC}\u{1F3FC}",
    "\u{1F3CC}\u{1F3FD}",
    "\u{1F3CC}\u{1F3FE}",
    "\u{1F3CC}\u{1F3FF}",
    "\u{1F3CC}\uFE0F\u200D\u2642\uFE0F",
    "\u{1F3CC}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F3CC}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F3CC}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F3CC}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F3CC}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",
    "\u{1F3CC}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F3CC}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F3CC}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F3CC}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F3CC}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F3C4}",
    "\u{1F3C4}\u{1F3FB}",
    "\u{1F3C4}\u{1F3FC}",
    "\u{1F3C4}\u{1F3FD}",
    "\u{1F3C4}\u{1F3FE}",
    "\u{1F3C4}\u{1F3FF}",
    "\u{1F3C4}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F3C4}\u200D\u2640\uFE0F",
    "\u{1F3C4}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F3C4}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F3C4}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F3C4}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F3C4}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F6A3}",
    "\u{1F6A3}\u{1F3FB}",
    "\u{1F6A3}\u{1F3FC}",
    "\u{1F6A3}\u{1F3FD}",
    "\u{1F6A3}\u{1F3FE}",
    "\u{1F6A3}\u{1F3FF}",
    "\u{1F6A3}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F6A3}\u200D\u2640\uFE0F",
    "\u{1F6A3}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F6A3}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F6A3}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F6A3}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F6A3}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F3CA}",
    "\u{1F3CA}\u{1F3FB}",
    "\u{1F3CA}\u{1F3FC}",
    "\u{1F3CA}\u{1F3FD}",
    "\u{1F3CA}\u{1F3FE}",
    "\u{1F3CA}\u{1F3FF}",
    "\u{1F3CA}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F3CA}\u200D\u2640\uFE0F",
    "\u{1F3CA}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F3CA}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F3CA}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F3CA}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F3CA}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u26F9\uFE0F",
    "\u26F9\u{1F3FB}",
    "\u26F9\u{1F3FC}",
    "\u26F9\u{1F3FD}",
    "\u26F9\u{1F3FE}",
    "\u26F9\u{1F3FF}",
    "\u26F9\uFE0F\u200D\u2642\uFE0F",
    "\u26F9\u{1F3FB}\u200D\u2642\uFE0F",
    "\u26F9\u{1F3FC}\u200D\u2642\uFE0F",
    "\u26F9\u{1F3FD}\u200D\u2642\uFE0F",
    "\u26F9\u{1F3FE}\u200D\u2642\uFE0F",
    "\u26F9\u{1F3FF}\u200D\u2642\uFE0F",
    "\u26F9\uFE0F\u200D\u2640\uFE0F",
    "\u26F9\u{1F3FB}\u200D\u2640\uFE0F",
    "\u26F9\u{1F3FC}\u200D\u2640\uFE0F",
    "\u26F9\u{1F3FD}\u200D\u2640\uFE0F",
    "\u26F9\u{1F3FE}\u200D\u2640\uFE0F",
    "\u26F9\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F3CB}\uFE0F",
    "\u{1F3CB}\u{1F3FB}",
    "\u{1F3CB}\u{1F3FC}",
    "\u{1F3CB}\u{1F3FD}",
    "\u{1F3CB}\u{1F3FE}",
    "\u{1F3CB}\u{1F3FF}",
    "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F",
    "\u{1F3CB}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F3CB}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F3CB}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F3CB}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F3CB}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",
    "\u{1F3CB}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F3CB}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F3CB}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F3CB}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F3CB}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F6B4}",
    "\u{1F6B4}\u{1F3FB}",
    "\u{1F6B4}\u{1F3FC}",
    "\u{1F6B4}\u{1F3FD}",
    "\u{1F6B4}\u{1F3FE}",
    "\u{1F6B4}\u{1F3FF}",
    "\u{1F6B4}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F6B4}\u200D\u2640\uFE0F",
    "\u{1F6B4}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F6B4}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F6B4}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F6B4}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F6B4}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F6B5}",
    "\u{1F6B5}\u{1F3FB}",
    "\u{1F6B5}\u{1F3FC}",
    "\u{1F6B5}\u{1F3FD}",
    "\u{1F6B5}\u{1F3FE}",
    "\u{1F6B5}\u{1F3FF}",
    "\u{1F6B5}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F6B5}\u200D\u2640\uFE0F",
    "\u{1F6B5}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F6B5}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F6B5}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F6B5}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F6B5}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F938}",
    "\u{1F938}\u{1F3FB}",
    "\u{1F938}\u{1F3FC}",
    "\u{1F938}\u{1F3FD}",
    "\u{1F938}\u{1F3FE}",
    "\u{1F938}\u{1F3FF}",
    "\u{1F938}\u200D\u2642\uFE0F",
    "\u{1F938}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F938}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F938}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F938}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F938}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F938}\u200D\u2640\uFE0F",
    "\u{1F938}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F938}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F938}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F938}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F938}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F93C}",
    "\u{1F93C}\u200D\u2642\uFE0F",
    "\u{1F93C}\u200D\u2640\uFE0F",
    "\u{1F93D}",
    "\u{1F93D}\u{1F3FB}",
    "\u{1F93D}\u{1F3FC}",
    "\u{1F93D}\u{1F3FD}",
    "\u{1F93D}\u{1F3FE}",
    "\u{1F93D}\u{1F3FF}",
    "\u{1F93D}\u200D\u2642\uFE0F",
    "\u{1F93D}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F93D}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F93D}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F93D}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F93D}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F93D}\u200D\u2640\uFE0F",
    "\u{1F93D}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F93D}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F93D}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F93D}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F93D}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F93E}",
    "\u{1F93E}\u{1F3FB}",
    "\u{1F93E}\u{1F3FC}",
    "\u{1F93E}\u{1F3FD}",
    "\u{1F93E}\u{1F3FE}",
    "\u{1F93E}\u{1F3FF}",
    "\u{1F93E}\u200D\u2642\uFE0F",
    "\u{1F93E}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F93E}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F93E}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F93E}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F93E}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F93E}\u200D\u2640\uFE0F",
    "\u{1F93E}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F93E}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F93E}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F93E}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F93E}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F939}",
    "\u{1F939}\u{1F3FB}",
    "\u{1F939}\u{1F3FC}",
    "\u{1F939}\u{1F3FD}",
    "\u{1F939}\u{1F3FE}",
    "\u{1F939}\u{1F3FF}",
    "\u{1F939}\u200D\u2642\uFE0F",
    "\u{1F939}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F939}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F939}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F939}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F939}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F939}\u200D\u2640\uFE0F",
    "\u{1F939}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F939}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F939}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F939}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F939}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F9D8}",
    "\u{1F9D8}\u{1F3FB}",
    "\u{1F9D8}\u{1F3FC}",
    "\u{1F9D8}\u{1F3FD}",
    "\u{1F9D8}\u{1F3FE}",
    "\u{1F9D8}\u{1F3FF}",
    "\u{1F9D8}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u{1F3FB}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u{1F3FC}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u{1F3FD}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u{1F3FE}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u{1F3FF}\u200D\u2642\uFE0F",
    "\u{1F9D8}\u200D\u2640\uFE0F",
    "\u{1F9D8}\u{1F3FB}\u200D\u2640\uFE0F",
    "\u{1F9D8}\u{1F3FC}\u200D\u2640\uFE0F",
    "\u{1F9D8}\u{1F3FD}\u200D\u2640\uFE0F",
    "\u{1F9D8}\u{1F3FE}\u200D\u2640\uFE0F",
    "\u{1F9D8}\u{1F3FF}\u200D\u2640\uFE0F",
    "\u{1F6C0}",
    "\u{1F6C0}\u{1F3FB}",
    "\u{1F6C0}\u{1F3FC}",
    "\u{1F6C0}\u{1F3FD}",
    "\u{1F6C0}\u{1F3FE}",
    "\u{1F6C0}\u{1F3FF}",
    "\u{1F6CC}",
    "\u{1F6CC}\u{1F3FB}",
    "\u{1F6CC}\u{1F3FC}",
    "\u{1F6CC}\u{1F3FD}",
    "\u{1F6CC}\u{1F3FE}",
    "\u{1F6CC}\u{1F3FF}",
    "\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F46D}",
    "\u{1F46D}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F46D}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F46D}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F46D}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F46D}\u{1F3FF}",
    "\u{1F46B}",
    "\u{1F46B}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F46B}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F46B}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F46B}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F46B}\u{1F3FF}",
    "\u{1F46C}",
    "\u{1F46C}\u{1F3FB}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FB}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F46C}\u{1F3FC}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FC}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F46C}\u{1F3FD}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FD}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F46C}\u{1F3FE}",
    "\u{1F468}\u{1F3FE}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FF}\u200D\u{1F91D}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F46C}\u{1F3FF}",
    "\u{1F48F}",
    "\u{1F48F}\u{1F3FB}",
    "\u{1F48F}\u{1F3FC}",
    "\u{1F48F}\u{1F3FD}",
    "\u{1F48F}\u{1F3FE}",
    "\u{1F48F}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F48B}\u200D\u{1F469}\u{1F3FF}",
    "\u{1F491}",
    "\u{1F491}\u{1F3FB}",
    "\u{1F491}\u{1F3FC}",
    "\u{1F491}\u{1F3FD}",
    "\u{1F491}\u{1F3FE}",
    "\u{1F491}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F9D1}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FF}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FB}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FC}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FD}",
    "\u{1F9D1}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F9D1}\u{1F3FE}",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F468}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u200D\u2764\uFE0F\u200D\u{1F468}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FB}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FC}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FD}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FE}",
    "\u{1F468}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F468}\u{1F3FF}",
    "\u{1F469}\u200D\u2764\uFE0F\u200D\u{1F469}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FB}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FC}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FD}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FE}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FF}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FB}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FC}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FD}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FE}",
    "\u{1F469}\u{1F3FF}\u200D\u2764\uFE0F\u200D\u{1F469}\u{1F3FF}",
    "\u{1F46A}",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
    "\u{1F468}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F466}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F467}",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F466}",
    "\u{1F468}\u200D\u{1F467}\u200D\u{1F467}",
    "\u{1F469}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F466}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F467}",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
    "\u{1F469}\u200D\u{1F467}\u200D\u{1F467}",
    "\u{1F5E3}\uFE0F",
    "\u{1F464}",
    "\u{1F465}",
    "\u{1FAC2}",
    "\u{1F463}"
  ],
  nature: [
    "\u{1F435}",
    "\u{1F412}",
    "\u{1F98D}",
    "\u{1F9A7}",
    "\u{1F436}",
    "\u{1F415}",
    "\u{1F9AE}",
    "\u{1F415}\u200D\u{1F9BA}",
    "\u{1F429}",
    "\u{1F43A}",
    "\u{1F98A}",
    "\u{1F99D}",
    "\u{1F431}",
    "\u{1F408}",
    "\u{1F408}\u200D\u2B1B",
    "\u{1F981}",
    "\u{1F42F}",
    "\u{1F405}",
    "\u{1F406}",
    "\u{1F434}",
    "\u{1F40E}",
    "\u{1F984}",
    "\u{1F993}",
    "\u{1F98C}",
    "\u{1F9AC}",
    "\u{1F42E}",
    "\u{1F402}",
    "\u{1F403}",
    "\u{1F404}",
    "\u{1F437}",
    "\u{1F416}",
    "\u{1F417}",
    "\u{1F43D}",
    "\u{1F40F}",
    "\u{1F411}",
    "\u{1F410}",
    "\u{1F42A}",
    "\u{1F42B}",
    "\u{1F999}",
    "\u{1F992}",
    "\u{1F418}",
    "\u{1F9A3}",
    "\u{1F98F}",
    "\u{1F99B}",
    "\u{1F42D}",
    "\u{1F401}",
    "\u{1F400}",
    "\u{1F439}",
    "\u{1F430}",
    "\u{1F407}",
    "\u{1F43F}\uFE0F",
    "\u{1F9AB}",
    "\u{1F994}",
    "\u{1F987}",
    "\u{1F43B}",
    "\u{1F43B}\u200D\u2744\uFE0F",
    "\u{1F428}",
    "\u{1F43C}",
    "\u{1F9A5}",
    "\u{1F9A6}",
    "\u{1F9A8}",
    "\u{1F998}",
    "\u{1F9A1}",
    "\u{1F43E}",
    "\u{1F983}",
    "\u{1F414}",
    "\u{1F413}",
    "\u{1F423}",
    "\u{1F424}",
    "\u{1F425}",
    "\u{1F426}",
    "\u{1F427}",
    "\u{1F54A}\uFE0F",
    "\u{1F985}",
    "\u{1F986}",
    "\u{1F9A2}",
    "\u{1F989}",
    "\u{1F9A4}",
    "\u{1FAB6}",
    "\u{1F9A9}",
    "\u{1F99A}",
    "\u{1F99C}",
    "\u{1F438}",
    "\u{1F40A}",
    "\u{1F422}",
    "\u{1F98E}",
    "\u{1F40D}",
    "\u{1F432}",
    "\u{1F409}",
    "\u{1F995}",
    "\u{1F996}",
    "\u{1F433}",
    "\u{1F40B}",
    "\u{1F42C}",
    "\u{1F9AD}",
    "\u{1F41F}",
    "\u{1F420}",
    "\u{1F421}",
    "\u{1F988}",
    "\u{1F419}",
    "\u{1F41A}",
    "\u{1F40C}",
    "\u{1F98B}",
    "\u{1F41B}",
    "\u{1F41C}",
    "\u{1F41D}",
    "\u{1FAB2}",
    "\u{1F41E}",
    "\u{1F997}",
    "\u{1FAB3}",
    "\u{1F577}\uFE0F",
    "\u{1F578}\uFE0F",
    "\u{1F982}",
    "\u{1F99F}",
    "\u{1FAB0}",
    "\u{1FAB1}",
    "\u{1F9A0}",
    "\u{1F490}",
    "\u{1F338}",
    "\u{1F4AE}",
    "\u{1F3F5}\uFE0F",
    "\u{1F339}",
    "\u{1F940}",
    "\u{1F33A}",
    "\u{1F33B}",
    "\u{1F33C}",
    "\u{1F337}",
    "\u{1F331}",
    "\u{1FAB4}",
    "\u{1F332}",
    "\u{1F333}",
    "\u{1F334}",
    "\u{1F335}",
    "\u{1F33E}",
    "\u{1F33F}",
    "\u2618\uFE0F",
    "\u{1F340}",
    "\u{1F341}",
    "\u{1F342}",
    "\u{1F343}"
  ],
  food: [
    "\u{1F347}",
    "\u{1F348}",
    "\u{1F349}",
    "\u{1F34A}",
    "\u{1F34B}",
    "\u{1F34C}",
    "\u{1F34D}",
    "\u{1F96D}",
    "\u{1F34E}",
    "\u{1F34F}",
    "\u{1F350}",
    "\u{1F351}",
    "\u{1F352}",
    "\u{1F353}",
    "\u{1FAD0}",
    "\u{1F95D}",
    "\u{1F345}",
    "\u{1FAD2}",
    "\u{1F965}",
    "\u{1F951}",
    "\u{1F346}",
    "\u{1F954}",
    "\u{1F955}",
    "\u{1F33D}",
    "\u{1F336}\uFE0F",
    "\u{1FAD1}",
    "\u{1F952}",
    "\u{1F96C}",
    "\u{1F966}",
    "\u{1F9C4}",
    "\u{1F9C5}",
    "\u{1F344}",
    "\u{1F95C}",
    "\u{1F330}",
    "\u{1F35E}",
    "\u{1F950}",
    "\u{1F956}",
    "\u{1FAD3}",
    "\u{1F968}",
    "\u{1F96F}",
    "\u{1F95E}",
    "\u{1F9C7}",
    "\u{1F9C0}",
    "\u{1F356}",
    "\u{1F357}",
    "\u{1F969}",
    "\u{1F953}",
    "\u{1F354}",
    "\u{1F35F}",
    "\u{1F355}",
    "\u{1F32D}",
    "\u{1F96A}",
    "\u{1F32E}",
    "\u{1F32F}",
    "\u{1FAD4}",
    "\u{1F959}",
    "\u{1F9C6}",
    "\u{1F95A}",
    "\u{1F373}",
    "\u{1F958}",
    "\u{1F372}",
    "\u{1FAD5}",
    "\u{1F963}",
    "\u{1F957}",
    "\u{1F37F}",
    "\u{1F9C8}",
    "\u{1F9C2}",
    "\u{1F96B}",
    "\u{1F371}",
    "\u{1F358}",
    "\u{1F359}",
    "\u{1F35A}",
    "\u{1F35B}",
    "\u{1F35C}",
    "\u{1F35D}",
    "\u{1F360}",
    "\u{1F362}",
    "\u{1F363}",
    "\u{1F364}",
    "\u{1F365}",
    "\u{1F96E}",
    "\u{1F361}",
    "\u{1F95F}",
    "\u{1F960}",
    "\u{1F961}",
    "\u{1F980}",
    "\u{1F99E}",
    "\u{1F990}",
    "\u{1F991}",
    "\u{1F9AA}",
    "\u{1F366}",
    "\u{1F367}",
    "\u{1F368}",
    "\u{1F369}",
    "\u{1F36A}",
    "\u{1F382}",
    "\u{1F370}",
    "\u{1F9C1}",
    "\u{1F967}",
    "\u{1F36B}",
    "\u{1F36C}",
    "\u{1F36D}",
    "\u{1F36E}",
    "\u{1F36F}",
    "\u{1F37C}",
    "\u{1F95B}",
    "\u2615",
    "\u{1FAD6}",
    "\u{1F375}",
    "\u{1F376}",
    "\u{1F37E}",
    "\u{1F377}",
    "\u{1F378}",
    "\u{1F379}",
    "\u{1F37A}",
    "\u{1F37B}",
    "\u{1F942}",
    "\u{1F943}",
    "\u{1F964}",
    "\u{1F9CB}",
    "\u{1F9C3}",
    "\u{1F9C9}",
    "\u{1F9CA}",
    "\u{1F962}",
    "\u{1F37D}\uFE0F",
    "\u{1F374}",
    "\u{1F944}",
    "\u{1F52A}",
    "\u{1F3FA}"
  ],
  travel: [
    "\u{1F30D}",
    "\u{1F30E}",
    "\u{1F30F}",
    "\u{1F310}",
    "\u{1F5FA}\uFE0F",
    "\u{1F5FE}",
    "\u{1F9ED}",
    "\u{1F3D4}\uFE0F",
    "\u26F0\uFE0F",
    "\u{1F30B}",
    "\u{1F5FB}",
    "\u{1F3D5}\uFE0F",
    "\u{1F3D6}\uFE0F",
    "\u{1F3DC}\uFE0F",
    "\u{1F3DD}\uFE0F",
    "\u{1F3DE}\uFE0F",
    "\u{1F3DF}\uFE0F",
    "\u{1F3DB}\uFE0F",
    "\u{1F3D7}\uFE0F",
    "\u{1F9F1}",
    "\u{1FAA8}",
    "\u{1FAB5}",
    "\u{1F6D6}",
    "\u{1F3D8}\uFE0F",
    "\u{1F3DA}\uFE0F",
    "\u{1F3E0}",
    "\u{1F3E1}",
    "\u{1F3E2}",
    "\u{1F3E3}",
    "\u{1F3E4}",
    "\u{1F3E5}",
    "\u{1F3E6}",
    "\u{1F3E8}",
    "\u{1F3E9}",
    "\u{1F3EA}",
    "\u{1F3EB}",
    "\u{1F3EC}",
    "\u{1F3ED}",
    "\u{1F3EF}",
    "\u{1F3F0}",
    "\u{1F492}",
    "\u{1F5FC}",
    "\u{1F5FD}",
    "\u26EA",
    "\u{1F54C}",
    "\u{1F6D5}",
    "\u{1F54D}",
    "\u26E9\uFE0F",
    "\u{1F54B}",
    "\u26F2",
    "\u26FA",
    "\u{1F301}",
    "\u{1F303}",
    "\u{1F3D9}\uFE0F",
    "\u{1F304}",
    "\u{1F305}",
    "\u{1F306}",
    "\u{1F307}",
    "\u{1F309}",
    "\u2668\uFE0F",
    "\u{1F3A0}",
    "\u{1F3A1}",
    "\u{1F3A2}",
    "\u{1F488}",
    "\u{1F3AA}",
    "\u{1F682}",
    "\u{1F683}",
    "\u{1F684}",
    "\u{1F685}",
    "\u{1F686}",
    "\u{1F687}",
    "\u{1F688}",
    "\u{1F689}",
    "\u{1F68A}",
    "\u{1F69D}",
    "\u{1F69E}",
    "\u{1F68B}",
    "\u{1F68C}",
    "\u{1F68D}",
    "\u{1F68E}",
    "\u{1F690}",
    "\u{1F691}",
    "\u{1F692}",
    "\u{1F693}",
    "\u{1F694}",
    "\u{1F695}",
    "\u{1F696}",
    "\u{1F697}",
    "\u{1F698}",
    "\u{1F699}",
    "\u{1F6FB}",
    "\u{1F69A}",
    "\u{1F69B}",
    "\u{1F69C}",
    "\u{1F3CE}\uFE0F",
    "\u{1F3CD}\uFE0F",
    "\u{1F6F5}",
    "\u{1F9BD}",
    "\u{1F9BC}",
    "\u{1F6FA}",
    "\u{1F6B2}",
    "\u{1F6F4}",
    "\u{1F6F9}",
    "\u{1F6FC}",
    "\u{1F68F}",
    "\u{1F6E3}\uFE0F",
    "\u{1F6E4}\uFE0F",
    "\u{1F6E2}\uFE0F",
    "\u26FD",
    "\u{1F6A8}",
    "\u{1F6A5}",
    "\u{1F6A6}",
    "\u{1F6D1}",
    "\u{1F6A7}",
    "\u2693",
    "\u26F5",
    "\u{1F6F6}",
    "\u{1F6A4}",
    "\u{1F6F3}\uFE0F",
    "\u26F4\uFE0F",
    "\u{1F6E5}\uFE0F",
    "\u{1F6A2}",
    "\u2708\uFE0F",
    "\u{1F6E9}\uFE0F",
    "\u{1F6EB}",
    "\u{1F6EC}",
    "\u{1FA82}",
    "\u{1F4BA}",
    "\u{1F681}",
    "\u{1F69F}",
    "\u{1F6A0}",
    "\u{1F6A1}",
    "\u{1F6F0}\uFE0F",
    "\u{1F680}",
    "\u{1F6F8}",
    "\u{1F6CE}\uFE0F",
    "\u{1F9F3}",
    "\u231B",
    "\u23F3",
    "\u231A",
    "\u23F0",
    "\u23F1\uFE0F",
    "\u23F2\uFE0F",
    "\u{1F570}\uFE0F",
    "\u{1F55B}",
    "\u{1F567}",
    "\u{1F550}",
    "\u{1F55C}",
    "\u{1F551}",
    "\u{1F55D}",
    "\u{1F552}",
    "\u{1F55E}",
    "\u{1F553}",
    "\u{1F55F}",
    "\u{1F554}",
    "\u{1F560}",
    "\u{1F555}",
    "\u{1F561}",
    "\u{1F556}",
    "\u{1F562}",
    "\u{1F557}",
    "\u{1F563}",
    "\u{1F558}",
    "\u{1F564}",
    "\u{1F559}",
    "\u{1F565}",
    "\u{1F55A}",
    "\u{1F566}",
    "\u{1F311}",
    "\u{1F312}",
    "\u{1F313}",
    "\u{1F314}",
    "\u{1F315}",
    "\u{1F316}",
    "\u{1F317}",
    "\u{1F318}",
    "\u{1F319}",
    "\u{1F31A}",
    "\u{1F31B}",
    "\u{1F31C}",
    "\u{1F321}\uFE0F",
    "\u2600\uFE0F",
    "\u{1F31D}",
    "\u{1F31E}",
    "\u{1FA90}",
    "\u2B50",
    "\u{1F31F}",
    "\u{1F320}",
    "\u{1F30C}",
    "\u2601\uFE0F",
    "\u26C5",
    "\u26C8\uFE0F",
    "\u{1F324}\uFE0F",
    "\u{1F325}\uFE0F",
    "\u{1F326}\uFE0F",
    "\u{1F327}\uFE0F",
    "\u{1F328}\uFE0F",
    "\u{1F329}\uFE0F",
    "\u{1F32A}\uFE0F",
    "\u{1F32B}\uFE0F",
    "\u{1F32C}\uFE0F",
    "\u{1F300}",
    "\u{1F308}",
    "\u{1F302}",
    "\u2602\uFE0F",
    "\u2614",
    "\u26F1\uFE0F",
    "\u26A1",
    "\u2744\uFE0F",
    "\u2603\uFE0F",
    "\u26C4",
    "\u2604\uFE0F",
    "\u{1F525}",
    "\u{1F4A7}",
    "\u{1F30A}"
  ],
  activity: [
    "\u{1F383}",
    "\u{1F384}",
    "\u{1F386}",
    "\u{1F387}",
    "\u{1F9E8}",
    "\u2728",
    "\u{1F388}",
    "\u{1F389}",
    "\u{1F38A}",
    "\u{1F38B}",
    "\u{1F38D}",
    "\u{1F38E}",
    "\u{1F38F}",
    "\u{1F390}",
    "\u{1F391}",
    "\u{1F9E7}",
    "\u{1F380}",
    "\u{1F381}",
    "\u{1F397}\uFE0F",
    "\u{1F39F}\uFE0F",
    "\u{1F3AB}",
    "\u{1F396}\uFE0F",
    "\u{1F3C6}",
    "\u{1F3C5}",
    "\u{1F947}",
    "\u{1F948}",
    "\u{1F949}",
    "\u26BD",
    "\u26BE",
    "\u{1F94E}",
    "\u{1F3C0}",
    "\u{1F3D0}",
    "\u{1F3C8}",
    "\u{1F3C9}",
    "\u{1F3BE}",
    "\u{1F94F}",
    "\u{1F3B3}",
    "\u{1F3CF}",
    "\u{1F3D1}",
    "\u{1F3D2}",
    "\u{1F94D}",
    "\u{1F3D3}",
    "\u{1F3F8}",
    "\u{1F94A}",
    "\u{1F94B}",
    "\u{1F945}",
    "\u26F3",
    "\u26F8\uFE0F",
    "\u{1F3A3}",
    "\u{1F93F}",
    "\u{1F3BD}",
    "\u{1F3BF}",
    "\u{1F6F7}",
    "\u{1F94C}",
    "\u{1F3AF}",
    "\u{1FA80}",
    "\u{1FA81}",
    "\u{1F3B1}",
    "\u{1F52E}",
    "\u{1FA84}",
    "\u{1F9FF}",
    "\u{1F3AE}",
    "\u{1F579}\uFE0F",
    "\u{1F3B0}",
    "\u{1F3B2}",
    "\u{1F9E9}",
    "\u{1F9F8}",
    "\u{1FA85}",
    "\u{1FA86}",
    "\u2660\uFE0F",
    "\u2665\uFE0F",
    "\u2666\uFE0F",
    "\u2663\uFE0F",
    "\u265F\uFE0F",
    "\u{1F0CF}",
    "\u{1F004}",
    "\u{1F3B4}",
    "\u{1F3AD}",
    "\u{1F5BC}\uFE0F",
    "\u{1F3A8}",
    "\u{1F9F5}",
    "\u{1FAA1}",
    "\u{1F9F6}",
    "\u{1FAA2}"
  ],
  object: [
    "\u{1F453}",
    "\u{1F576}\uFE0F",
    "\u{1F97D}",
    "\u{1F97C}",
    "\u{1F9BA}",
    "\u{1F454}",
    "\u{1F455}",
    "\u{1F456}",
    "\u{1F9E3}",
    "\u{1F9E4}",
    "\u{1F9E5}",
    "\u{1F9E6}",
    "\u{1F457}",
    "\u{1F458}",
    "\u{1F97B}",
    "\u{1FA71}",
    "\u{1FA72}",
    "\u{1FA73}",
    "\u{1F459}",
    "\u{1F45A}",
    "\u{1F45B}",
    "\u{1F45C}",
    "\u{1F45D}",
    "\u{1F6CD}\uFE0F",
    "\u{1F392}",
    "\u{1FA74}",
    "\u{1F45E}",
    "\u{1F45F}",
    "\u{1F97E}",
    "\u{1F97F}",
    "\u{1F460}",
    "\u{1F461}",
    "\u{1FA70}",
    "\u{1F462}",
    "\u{1F451}",
    "\u{1F452}",
    "\u{1F3A9}",
    "\u{1F393}",
    "\u{1F9E2}",
    "\u{1FA96}",
    "\u26D1\uFE0F",
    "\u{1F4FF}",
    "\u{1F484}",
    "\u{1F48D}",
    "\u{1F48E}",
    "\u{1F507}",
    "\u{1F508}",
    "\u{1F509}",
    "\u{1F50A}",
    "\u{1F4E2}",
    "\u{1F4E3}",
    "\u{1F4EF}",
    "\u{1F514}",
    "\u{1F515}",
    "\u{1F3BC}",
    "\u{1F3B5}",
    "\u{1F3B6}",
    "\u{1F399}\uFE0F",
    "\u{1F39A}\uFE0F",
    "\u{1F39B}\uFE0F",
    "\u{1F3A4}",
    "\u{1F3A7}",
    "\u{1F4FB}",
    "\u{1F3B7}",
    "\u{1FA97}",
    "\u{1F3B8}",
    "\u{1F3B9}",
    "\u{1F3BA}",
    "\u{1F3BB}",
    "\u{1FA95}",
    "\u{1F941}",
    "\u{1FA98}",
    "\u{1F4F1}",
    "\u{1F4F2}",
    "\u260E\uFE0F",
    "\u{1F4DE}",
    "\u{1F4DF}",
    "\u{1F4E0}",
    "\u{1F50B}",
    "\u{1F50C}",
    "\u{1F4BB}",
    "\u{1F5A5}\uFE0F",
    "\u{1F5A8}\uFE0F",
    "\u2328\uFE0F",
    "\u{1F5B1}\uFE0F",
    "\u{1F5B2}\uFE0F",
    "\u{1F4BD}",
    "\u{1F4BE}",
    "\u{1F4BF}",
    "\u{1F4C0}",
    "\u{1F9EE}",
    "\u{1F3A5}",
    "\u{1F39E}\uFE0F",
    "\u{1F4FD}\uFE0F",
    "\u{1F3AC}",
    "\u{1F4FA}",
    "\u{1F4F7}",
    "\u{1F4F8}",
    "\u{1F4F9}",
    "\u{1F4FC}",
    "\u{1F50D}",
    "\u{1F50E}",
    "\u{1F56F}\uFE0F",
    "\u{1F4A1}",
    "\u{1F526}",
    "\u{1F3EE}",
    "\u{1FA94}",
    "\u{1F4D4}",
    "\u{1F4D5}",
    "\u{1F4D6}",
    "\u{1F4D7}",
    "\u{1F4D8}",
    "\u{1F4D9}",
    "\u{1F4DA}",
    "\u{1F4D3}",
    "\u{1F4D2}",
    "\u{1F4C3}",
    "\u{1F4DC}",
    "\u{1F4C4}",
    "\u{1F4F0}",
    "\u{1F5DE}\uFE0F",
    "\u{1F4D1}",
    "\u{1F516}",
    "\u{1F3F7}\uFE0F",
    "\u{1F4B0}",
    "\u{1FA99}",
    "\u{1F4B4}",
    "\u{1F4B5}",
    "\u{1F4B6}",
    "\u{1F4B7}",
    "\u{1F4B8}",
    "\u{1F4B3}",
    "\u{1F9FE}",
    "\u{1F4B9}",
    "\u2709\uFE0F",
    "\u{1F4E7}",
    "\u{1F4E8}",
    "\u{1F4E9}",
    "\u{1F4E4}",
    "\u{1F4E5}",
    "\u{1F4E6}",
    "\u{1F4EB}",
    "\u{1F4EA}",
    "\u{1F4EC}",
    "\u{1F4ED}",
    "\u{1F4EE}",
    "\u{1F5F3}\uFE0F",
    "\u270F\uFE0F",
    "\u2712\uFE0F",
    "\u{1F58B}\uFE0F",
    "\u{1F58A}\uFE0F",
    "\u{1F58C}\uFE0F",
    "\u{1F58D}\uFE0F",
    "\u{1F4DD}",
    "\u{1F4BC}",
    "\u{1F4C1}",
    "\u{1F4C2}",
    "\u{1F5C2}\uFE0F",
    "\u{1F4C5}",
    "\u{1F4C6}",
    "\u{1F5D2}\uFE0F",
    "\u{1F5D3}\uFE0F",
    "\u{1F4C7}",
    "\u{1F4C8}",
    "\u{1F4C9}",
    "\u{1F4CA}",
    "\u{1F4CB}",
    "\u{1F4CC}",
    "\u{1F4CD}",
    "\u{1F4CE}",
    "\u{1F587}\uFE0F",
    "\u{1F4CF}",
    "\u{1F4D0}",
    "\u2702\uFE0F",
    "\u{1F5C3}\uFE0F",
    "\u{1F5C4}\uFE0F",
    "\u{1F5D1}\uFE0F",
    "\u{1F512}",
    "\u{1F513}",
    "\u{1F50F}",
    "\u{1F510}",
    "\u{1F511}",
    "\u{1F5DD}\uFE0F",
    "\u{1F528}",
    "\u{1FA93}",
    "\u26CF\uFE0F",
    "\u2692\uFE0F",
    "\u{1F6E0}\uFE0F",
    "\u{1F5E1}\uFE0F",
    "\u2694\uFE0F",
    "\u{1F52B}",
    "\u{1FA83}",
    "\u{1F3F9}",
    "\u{1F6E1}\uFE0F",
    "\u{1FA9A}",
    "\u{1F527}",
    "\u{1FA9B}",
    "\u{1F529}",
    "\u2699\uFE0F",
    "\u{1F5DC}\uFE0F",
    "\u2696\uFE0F",
    "\u{1F9AF}",
    "\u{1F517}",
    "\u26D3\uFE0F",
    "\u{1FA9D}",
    "\u{1F9F0}",
    "\u{1F9F2}",
    "\u{1FA9C}",
    "\u2697\uFE0F",
    "\u{1F9EA}",
    "\u{1F9EB}",
    "\u{1F9EC}",
    "\u{1F52C}",
    "\u{1F52D}",
    "\u{1F4E1}",
    "\u{1F489}",
    "\u{1FA78}",
    "\u{1F48A}",
    "\u{1FA79}",
    "\u{1FA7A}",
    "\u{1F6AA}",
    "\u{1F6D7}",
    "\u{1FA9E}",
    "\u{1FA9F}",
    "\u{1F6CF}\uFE0F",
    "\u{1F6CB}\uFE0F",
    "\u{1FA91}",
    "\u{1F6BD}",
    "\u{1FAA0}",
    "\u{1F6BF}",
    "\u{1F6C1}",
    "\u{1FAA4}",
    "\u{1FA92}",
    "\u{1F9F4}",
    "\u{1F9F7}",
    "\u{1F9F9}",
    "\u{1F9FA}",
    "\u{1F9FB}",
    "\u{1FAA3}",
    "\u{1F9FC}",
    "\u{1FAA5}",
    "\u{1F9FD}",
    "\u{1F9EF}",
    "\u{1F6D2}",
    "\u{1F6AC}",
    "\u26B0\uFE0F",
    "\u{1FAA6}",
    "\u26B1\uFE0F",
    "\u{1F5FF}",
    "\u{1FAA7}"
  ],
  symbol: [
    "\u{1F3E7}",
    "\u{1F6AE}",
    "\u{1F6B0}",
    "\u267F",
    "\u{1F6B9}",
    "\u{1F6BA}",
    "\u{1F6BB}",
    "\u{1F6BC}",
    "\u{1F6BE}",
    "\u{1F6C2}",
    "\u{1F6C3}",
    "\u{1F6C4}",
    "\u{1F6C5}",
    "\u26A0\uFE0F",
    "\u{1F6B8}",
    "\u26D4",
    "\u{1F6AB}",
    "\u{1F6B3}",
    "\u{1F6AD}",
    "\u{1F6AF}",
    "\u{1F6B1}",
    "\u{1F6B7}",
    "\u{1F4F5}",
    "\u{1F51E}",
    "\u2622\uFE0F",
    "\u2623\uFE0F",
    "\u2B06\uFE0F",
    "\u2197\uFE0F",
    "\u27A1\uFE0F",
    "\u2198\uFE0F",
    "\u2B07\uFE0F",
    "\u2199\uFE0F",
    "\u2B05\uFE0F",
    "\u2196\uFE0F",
    "\u2195\uFE0F",
    "\u2194\uFE0F",
    "\u21A9\uFE0F",
    "\u21AA\uFE0F",
    "\u2934\uFE0F",
    "\u2935\uFE0F",
    "\u{1F503}",
    "\u{1F504}",
    "\u{1F519}",
    "\u{1F51A}",
    "\u{1F51B}",
    "\u{1F51C}",
    "\u{1F51D}",
    "\u{1F6D0}",
    "\u269B\uFE0F",
    "\u{1F549}\uFE0F",
    "\u2721\uFE0F",
    "\u2638\uFE0F",
    "\u262F\uFE0F",
    "\u271D\uFE0F",
    "\u2626\uFE0F",
    "\u262A\uFE0F",
    "\u262E\uFE0F",
    "\u{1F54E}",
    "\u{1F52F}",
    "\u2648",
    "\u2649",
    "\u264A",
    "\u264B",
    "\u264C",
    "\u264D",
    "\u264E",
    "\u264F",
    "\u2650",
    "\u2651",
    "\u2652",
    "\u2653",
    "\u26CE",
    "\u{1F500}",
    "\u{1F501}",
    "\u{1F502}",
    "\u25B6\uFE0F",
    "\u23E9",
    "\u23ED\uFE0F",
    "\u23EF\uFE0F",
    "\u25C0\uFE0F",
    "\u23EA",
    "\u23EE\uFE0F",
    "\u{1F53C}",
    "\u23EB",
    "\u{1F53D}",
    "\u23EC",
    "\u23F8\uFE0F",
    "\u23F9\uFE0F",
    "\u23FA\uFE0F",
    "\u23CF\uFE0F",
    "\u{1F3A6}",
    "\u{1F505}",
    "\u{1F506}",
    "\u{1F4F6}",
    "\u{1F4F3}",
    "\u{1F4F4}",
    "\u2640\uFE0F",
    "\u2642\uFE0F",
    "\u26A7\uFE0F",
    "\u2716\uFE0F",
    "\u2795",
    "\u2796",
    "\u2797",
    "\u267E\uFE0F",
    "\u203C\uFE0F",
    "\u2049\uFE0F",
    "\u2753",
    "\u2754",
    "\u2755",
    "\u2757",
    "\u3030\uFE0F",
    "\u{1F4B1}",
    "\u{1F4B2}",
    "\u2695\uFE0F",
    "\u267B\uFE0F",
    "\u269C\uFE0F",
    "\u{1F531}",
    "\u{1F4DB}",
    "\u{1F530}",
    "\u2B55",
    "\u2705",
    "\u2611\uFE0F",
    "\u2714\uFE0F",
    "\u274C",
    "\u274E",
    "\u27B0",
    "\u27BF",
    "\u303D\uFE0F",
    "\u2733\uFE0F",
    "\u2734\uFE0F",
    "\u2747\uFE0F",
    "\xA9\uFE0F",
    "\xAE\uFE0F",
    "\u2122\uFE0F",
    "#\uFE0F\u20E3",
    "*\uFE0F\u20E3",
    "0\uFE0F\u20E3",
    "1\uFE0F\u20E3",
    "2\uFE0F\u20E3",
    "3\uFE0F\u20E3",
    "4\uFE0F\u20E3",
    "5\uFE0F\u20E3",
    "6\uFE0F\u20E3",
    "7\uFE0F\u20E3",
    "8\uFE0F\u20E3",
    "9\uFE0F\u20E3",
    "\u{1F51F}",
    "\u{1F520}",
    "\u{1F521}",
    "\u{1F522}",
    "\u{1F523}",
    "\u{1F524}",
    "\u{1F170}\uFE0F",
    "\u{1F18E}",
    "\u{1F171}\uFE0F",
    "\u{1F191}",
    "\u{1F192}",
    "\u{1F193}",
    "\u2139\uFE0F",
    "\u{1F194}",
    "\u24C2\uFE0F",
    "\u{1F195}",
    "\u{1F196}",
    "\u{1F17E}\uFE0F",
    "\u{1F197}",
    "\u{1F17F}\uFE0F",
    "\u{1F198}",
    "\u{1F199}",
    "\u{1F19A}",
    "\u{1F201}",
    "\u{1F202}\uFE0F",
    "\u{1F237}\uFE0F",
    "\u{1F236}",
    "\u{1F22F}",
    "\u{1F250}",
    "\u{1F239}",
    "\u{1F21A}",
    "\u{1F232}",
    "\u{1F251}",
    "\u{1F238}",
    "\u{1F234}",
    "\u{1F233}",
    "\u3297\uFE0F",
    "\u3299\uFE0F",
    "\u{1F23A}",
    "\u{1F235}",
    "\u{1F534}",
    "\u{1F7E0}",
    "\u{1F7E1}",
    "\u{1F7E2}",
    "\u{1F535}",
    "\u{1F7E3}",
    "\u{1F7E4}",
    "\u26AB",
    "\u26AA",
    "\u{1F7E5}",
    "\u{1F7E7}",
    "\u{1F7E8}",
    "\u{1F7E9}",
    "\u{1F7E6}",
    "\u{1F7EA}",
    "\u{1F7EB}",
    "\u2B1B",
    "\u2B1C",
    "\u25FC\uFE0F",
    "\u25FB\uFE0F",
    "\u25FE",
    "\u25FD",
    "\u25AA\uFE0F",
    "\u25AB\uFE0F",
    "\u{1F536}",
    "\u{1F537}",
    "\u{1F538}",
    "\u{1F539}",
    "\u{1F53A}",
    "\u{1F53B}",
    "\u{1F4A0}",
    "\u{1F518}",
    "\u{1F533}",
    "\u{1F532}"
  ]
};

// src/modules/internet/constants/domainSuffix.ts
var DOMAIN_SUFFIX = ["com", "biz", "info", "name", "net", "org"];

// src/modules/internet/constants/httpStatus.ts
var HTTP_STATUS = {
  informational: [100, 101, 102, 103],
  success: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226],
  redirection: [300, 301, 302, 303, 304, 305, 306, 307, 308],
  clientError: [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409,
    410,
    411,
    412,
    413,
    414,
    415,
    416,
    417,
    418,
    421,
    422,
    423,
    424,
    425,
    426,
    428,
    429,
    431,
    451
  ],
  serverError: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]
};

// src/modules/internet/constants/http_method.ts
var HTTP_METHODS = ["GET", "PATCH", "DELETE", "POST", "PUT"];

// src/modules/internet/core/user-agent.ts
var LANGUAGES = [
  "AB",
  "AF",
  "AN",
  "AR",
  "AS",
  "AZ",
  "BE",
  "BG",
  "BN",
  "BO",
  "BR",
  "BS",
  "CA",
  "CE",
  "CO",
  "CS",
  "CU",
  "CY",
  "DA",
  "DE",
  "EL",
  "EN",
  "EO",
  "ES",
  "ET",
  "EU",
  "FA",
  "FI",
  "FJ",
  "FO",
  "FR",
  "FY",
  "GA",
  "GD",
  "GL",
  "GV",
  "HE",
  "HI",
  "HR",
  "HT",
  "HU",
  "HY",
  "ID",
  "IS",
  "IT",
  "JA",
  "JV",
  "KA",
  "KG",
  "KO",
  "KU",
  "KW",
  "KY",
  "LA",
  "LB",
  "LI",
  "LN",
  "LT",
  "LV",
  "MG",
  "MK",
  "MN",
  "MO",
  "MS",
  "MT",
  "MY",
  "NB",
  "NE",
  "NL",
  "NN",
  "NO",
  "OC",
  "PL",
  "PT",
  "RM",
  "RO",
  "RU",
  "SC",
  "SE",
  "SK",
  "SL",
  "SO",
  "SQ",
  "SR",
  "SV",
  "SW",
  "TK",
  "TR",
  "TY",
  "UK",
  "UR",
  "UZ",
  "VI",
  "VO",
  "YI",
  "ZH"
];
function GenerateUserAgent(datatypeModule, utils2) {
  const weightedKeyFromObject = (obj) => {
    const rand = datatypeModule.int({ min: 0, max: 100 }) / 100;
    let min = 0;
    let max = 0;
    let return_val = "";
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        max = obj[key] + min;
        return_val = key;
        if (rand >= min && rand <= max) {
          break;
        }
        min = min + obj[key];
      }
    }
    return return_val;
  };
  const randomLang = () => utils2.oneOfArray(LANGUAGES);
  const randomBrowserAndOS = () => {
    const browser2 = weightedKeyFromObject({
      chrome: 0.45132810566,
      iexplorer: 0.27477061836,
      firefox: 0.19384170608,
      safari: 0.06186781118,
      opera: 0.01574236955
    });
    const os = weightedKeyFromObject(
      {
        chrome: { win: 0.89, mac: 0.09, lin: 0.02 },
        firefox: { win: 0.83, mac: 0.16, lin: 0.01 },
        opera: { win: 0.91, mac: 0.03, lin: 0.06 },
        safari: { win: 0.04, mac: 0.96 },
        iexplorer: { win: 1 }
      }[browser2]
    );
    return [browser2, os];
  };
  const randomProc = (arch2) => {
    const procs = {
      lin: ["i686", "x86_64"],
      mac: { Intel: 0.48, PPC: 0.01, "U; Intel": 0.48, "U; PPC": 0.01 },
      win: ["", "WOW64", "Win64; x64"]
    };
    const archValue = procs[arch2];
    const proc = Array.isArray(archValue) ? utils2.oneOfArray(archValue) : weightedKeyFromObject(archValue);
    return proc;
  };
  const randomRevision = (dots) => {
    let return_val = "";
    for (let x = 0; x < dots; x++) {
      return_val += `.${datatypeModule.int({ min: 0, max: 9 })}`;
    }
    return return_val;
  };
  const version_string = {
    net() {
      return [
        datatypeModule.int({ min: 1, max: 4 }),
        datatypeModule.int({ min: 0, max: 9 }),
        datatypeModule.int({ min: 1e4, max: 99999 }),
        datatypeModule.int({ min: 0, max: 9 })
      ].join(".");
    },
    nt() {
      return [
        datatypeModule.int({ min: 5, max: 6 }),
        datatypeModule.int({ min: 0, max: 3 })
      ].join(".");
    },
    ie() {
      return datatypeModule.int({ min: 7, max: 11 });
    },
    trident() {
      return [
        datatypeModule.int({ min: 3, max: 7 }),
        datatypeModule.int({ min: 0, max: 1 })
      ].join(".");
    },
    osx(delim) {
      return [
        10,
        datatypeModule.int({ min: 5, max: 10 }),
        datatypeModule.int({ min: 0, max: 9 })
      ].join(delim || ".");
    },
    chrome() {
      return [
        datatypeModule.int({ min: 13, max: 39 }),
        0,
        datatypeModule.int({ min: 800, max: 899 }),
        0
      ].join(".");
    },
    presto() {
      return `2.9.${datatypeModule.int({ min: 160, max: 190 })}`;
    },
    presto2() {
      return `${datatypeModule.int({ min: 10, max: 12 })}.00`;
    },
    safari() {
      return [
        datatypeModule.int({ min: 531, max: 538 }),
        datatypeModule.int({ min: 0, max: 2 }),
        datatypeModule.int({ min: 0, max: 2 })
      ].join(".");
    }
  };
  const browserMap = {
    firefox(arch2) {
      const firefox_ver = `${datatypeModule.int({
        min: 5,
        max: 15
      })}${randomRevision(2)}`, gecko_ver = `Gecko/20100101 Firefox/${firefox_ver}`, proc = randomProc(arch2), os_ver = arch2 === "win" ? `(Windows NT ${version_string.nt()}${proc ? `; ${proc}` : ""}` : arch2 === "mac" ? `(Macintosh; ${proc} Mac OS X ${version_string.osx()}` : `(X11; Linux ${proc}`;
      return `Mozilla/5.0 ${os_ver}; rv:${firefox_ver.slice(
        0,
        -2
      )}) ${gecko_ver}`;
    },
    iexplorer() {
      const ver = version_string.ie();
      if (ver >= 11) {
        return `Mozilla/5.0 (Windows NT 6.${datatypeModule.int({
          min: 1,
          max: 3
        })}; Trident/7.0; ${datatypeModule.boolean() ? "Touch; " : ""}rv:11.0) like Gecko`;
      }
      return `Mozilla/5.0 (compatible; MSIE ${ver}.0; Windows NT ${version_string.nt()}; Trident/${version_string.trident()}${datatypeModule.boolean() ? `; .NET CLR ${version_string.net()}` : ""})`;
    },
    opera(arch2) {
      const presto_ver = ` Presto/${version_string.presto()} Version/${version_string.presto2()})`, os_ver = arch2 === "win" ? `(Windows NT ${version_string.nt()}; U; ${randomLang()}${presto_ver}` : arch2 === "lin" ? `(X11; Linux ${randomProc(arch2)}; U; ${randomLang()}${presto_ver}` : `(Macintosh; Intel Mac OS X ${version_string.osx()} U; ${randomLang()} Presto/${version_string.presto()} Version/${version_string.presto2()})`;
      return `Opera/${datatypeModule.int({
        min: 9,
        max: 14
      })}.${datatypeModule.int({
        min: 0,
        max: 99
      })} ${os_ver}`;
    },
    safari(arch2) {
      const safari = version_string.safari(), ver = `${datatypeModule.int({
        min: 4,
        max: 7
      })}.${datatypeModule.int({
        min: 0,
        max: 1
      })}.${datatypeModule.int({ min: 0, max: 10 })}`, os_ver = arch2 === "mac" ? `(Macintosh; ${randomProc("mac")} Mac OS X ${version_string.osx(
        "_"
      )} rv:${datatypeModule.int({
        min: 2,
        max: 6
      })}.0; ${randomLang()}) ` : `(Windows; U; Windows NT ${version_string.nt()})`;
      return `Mozilla/5.0 ${os_ver}AppleWebKit/${safari} (KHTML, like Gecko) Version/${ver} Safari/${safari}`;
    },
    chrome(arch2) {
      const safari = version_string.safari(), os_ver = arch2 === "mac" ? `(Macintosh; ${randomProc("mac")} Mac OS X ${version_string.osx(
        "_"
      )}) ` : arch2 === "win" ? `(Windows; U; Windows NT ${version_string.nt()})` : `(X11; Linux ${randomProc(arch2)}`;
      return `Mozilla/5.0 ${os_ver} AppleWebKit/${safari} (KHTML, like Gecko) Chrome/${version_string.chrome()} Safari/${safari}`;
    }
  };
  const [browser, arch] = randomBrowserAndOS();
  return browserMap[browser](arch);
}

// src/modules/internet/constants/protocol.ts
var PROTOCOL = [
  "https",
  "http",
  "tcp",
  "udp",
  "ip",
  "pop",
  "smtp",
  "dhcp",
  "l2tp",
  "ftp",
  "imap"
];

// src/modules/internet/constants/oauth.ts
var OAUTH_PROVIDER = [
  "Amazon",
  "AOL",
  "Autodesk",
  "Apple",
  "Basecamp",
  "Battle.net",
  "Bitbucket",
  "bitly",
  "Box",
  "ClearScore",
  "Cloud Foundry",
  "Dailymotion",
  "Deutsche Telekom",
  "deviantART",
  "Discogs",
  "Discord",
  "Dropbox",
  "Etsy",
  "Evernote",
  "Facebook",
  "FatSecret",
  "Fitbit",
  "Flickr",
  "Formstack",
  "Foursquare",
  "GitHub",
  "GitLab",
  "Goodreads",
  "Google",
  "Google App Engine",
  "Groundspeak",
  "Huddle",
  "Imgur",
  "Instagram",
  "IntelCloud Services",
  "Jive Software",
  "Keycloak",
  "LinkedIn",
  "LoginRadius",
  "Microsoft services",
  "Mixi",
  "MySpace",
  "MoreTeam",
  "Netflix",
  "NetIQ",
  "Okta",
  "OpenAM",
  "OpenStreetMap",
  "OpenTable",
  "ORCID",
  "PayPal",
  "Ping Identity",
  "Pixiv",
  "Plurk",
  "Reddit",
  "Salesforce.com",
  "Sina Weibo",
  "Spotify",
  "Stack Exchange",
  "StatusNet",
  "Strava",
  "Stripe",
  "Trello",
  "Tumblr",
  "Twitch",
  "Twitter",
  "Ubuntu One",
  "Viadeo",
  "Vimeo",
  "VK",
  "WeChat",
  "Withings",
  "WooCommerce",
  "WordPress.com",
  "WSO2 Identity Server",
  "Xero",
  "XING",
  "Yahoo!",
  "Yammer",
  "Yandex",
  "Yelp",
  "Zendesk"
];

// src/modules/internet/constants/locale.ts
var LOCALE = [
  "cz",
  "ge",
  "ne",
  "it",
  "de_CH",
  "en_AU_ocker",
  "ja",
  "ar",
  "en_CA",
  "pt_BR",
  "de",
  "es",
  "vi",
  "hr",
  "en_ZA",
  "fr",
  "id_ID",
  "nb_NO",
  "zh_TW",
  "ro",
  "pl",
  "en_GB",
  "en_AU",
  "fr_CA",
  "hy",
  "ko",
  "en_BORK",
  "es_MX",
  "en_IE",
  "az",
  "nl_BE",
  "en_US",
  "sk",
  "fr_CH",
  "en_IND",
  "sv",
  "fi",
  "en",
  "zh_CN",
  "he",
  "pt_PT",
  "de_AT"
];

// src/modules/internet/constants/email_provider.ts
var EMAIL_PROVIDER = [
  "aim",
  "alice",
  "aliceadsl",
  "aol",
  "arcor",
  "att",
  "bellsouth",
  "bigpond",
  "bluewin",
  "blueyonder",
  "bol",
  "centurytel",
  "charter",
  "chello",
  "club-internet",
  "comcast",
  "earthlink",
  "facebook",
  "free",
  "freenet",
  "frontiernet",
  "gmail",
  "gmx",
  "googlemail",
  "hetnet",
  "home",
  "hotmail",
  "ig",
  "juno",
  "laposte",
  "libero",
  "live",
  "mac",
  "mail",
  "me",
  "msn",
  "neuf",
  "ntlworld",
  "optonline",
  "optusnet",
  "orange",
  "outlook",
  "planet",
  "qq",
  "rambler",
  "rediffmail",
  "rocketmail",
  "sbcglobal",
  "sfr",
  "shaw",
  "sky",
  "skynet",
  "sympatico",
  "t-online",
  "telenet",
  "terra",
  "tin",
  "tiscali",
  "unaref",
  "uol",
  "verizon",
  "virgilio",
  "voila",
  "wanadoo",
  "web",
  "windstream",
  "yahoo",
  "yandex",
  "zonnet"
];

// src/modules/internet/constants/browser.ts
var BROWSERS = [
  "Chrome",
  "Edge",
  "Firefox",
  "Internet Explorer",
  "Safari",
  "Opera",
  "Yandex",
  "Chromium",
  "Vivaldi",
  "Baidu",
  "Brave"
];

// src/modules/internet/core/password.ts
var Password = class {
  constructor(datatypeModule, consonants, vowel) {
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "consonants", consonants);
    __publicField(this, "vowel", vowel);
  }
  execute(length, memorable, i_pattern, prefix) {
    if (prefix.length >= length) {
      return prefix;
    }
    let pattern = i_pattern;
    if (memorable) {
      if (prefix.match(this.consonants)) {
        pattern = this.vowel;
      } else {
        pattern = this.consonants;
      }
    }
    const n = this.datatypeModule.int({ min: 0, max: 94 }) + 33;
    let char = String.fromCharCode(n);
    if (memorable) {
      char = char.toLowerCase();
    }
    if (!char.match(pattern)) {
      return this.execute(length, memorable, pattern, prefix);
    }
    return this.execute(length, memorable, pattern, prefix + char);
  }
};

// src/modules/internet/index.ts
var InternetModule = class {
  constructor(datatypeModule, utils2, personModule, wordModule) {
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "utils", utils2);
    __publicField(this, "personModule", personModule);
    __publicField(this, "wordModule", wordModule);
    __publicField(this, "passwordCreator");
    __publicField(this, "constants", {
      emojis: EMOJIS,
      domainSuffixs: DOMAIN_SUFFIX,
      httpStatus: HTTP_STATUS,
      httpMethods: HTTP_METHODS,
      protocols: PROTOCOL,
      oauthProviders: OAUTH_PROVIDER,
      locales: LOCALE,
      emailProviders: EMAIL_PROVIDER,
      browsers: BROWSERS
    });
    const vowel = /[aeiouAEIOU]$/;
    const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
    this.passwordCreator = new Password(this.datatypeModule, consonant, vowel);
  }
  /**
   * Returns a browser name
   *
   * @example
   * modules.internet.browser() // 'Opera'
   *
   * @returns string
   */
  browser() {
    return this.utils.oneOfArray(this.constants.browsers);
  }
  /**
   * Generate a random OAuth provider
   *
   * @example
   * modules.internet.oauthProvider() // 'Amazon'
   *
   * @returns string
   */
  oauthProvider() {
    return this.utils.oneOfArray(this.constants.oauthProviders);
  }
  /**
   * Returns a random locale
   *
   * @example
   * modules.internet.locale() // 'es_MX'
   *
   * @returns string
   */
  locale() {
    return this.utils.oneOfArray(this.constants.locales);
  }
  /**
   * Returns a random email provider
   *
   * @example
   * modules.internet.emailProvider() // 'gmail'
   *
   * @returns string
   */
  emailProvider() {
    return this.utils.oneOfArray(this.constants.emailProviders);
  }
  /**
   * Returns a user email
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   * @param args.provider email provider
   *
   * @example
   * modules.internet.email() // 'juan527120@gmail.com'
   * modules.internet.email({ firstName: 'pedro', lastName: 'Scott', provider: 'yahoo.com' }) // "pedro_scott@yahoo.com"
   *
   * @returns string
   */
  email({ firstName, lastName, provider: iprovider } = {}) {
    const provider = iprovider ? iprovider : this.utils.oneOfArray(this.constants.emailProviders);
    const username = this.username({
      firstName,
      lastName
    });
    const domain = provider.includes(".") ? provider : `${provider}.com`;
    const email = `${username}@${domain}`;
    return email.toLowerCase();
  }
  /**
   * Returns a password.
   *
   * @param args.length The length of the password to generate. Defaults to `15`.
   * @param args.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param args.pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param args.prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * modules.internet.password() // '89G1wJuBLbGziIs'
   * modules.internet.password({ length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
   * modules.internet.password({ length: 20, memorable: true }) // 'lawetimufozujosodedi'
   * modules.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
   * modules.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
   *
   * @returns string
   */
  password({
    length,
    memorable: imemorable,
    pattern: ipattern,
    prefix: iprefix
  } = {}) {
    const len = length && length > 0 ? length : 15;
    const memorable = imemorable ? imemorable : false;
    const pattern = ipattern instanceof RegExp ? ipattern : this.passwordCreator.consonants;
    const prefix = iprefix ? iprefix : "";
    return this.passwordCreator.execute(len, memorable, pattern, prefix);
  }
  /**
   * Returns a string with a web url
   *
   * @example
   * modules.internet.url() // 'http://words.info.net'
   *
   * @param args.secure The url has a secure protocol or not
   *
   * @returns
   */
  url({ secure } = {}) {
    if (typeof secure === "boolean") {
      const sec = secure ? "https" : "http";
      return `${sec}://${this.domainName()}.${this.domainSuffix()}`;
    } else {
      return `${this.protocol()}://${this.domainName()}.${this.domainSuffix()}`;
    }
  }
  /**
   * Returns a profile user name
   *
   * @param args.firstName owner first name
   * @param args.lastName owner last name
   *
   * @example
   * modules.internet.username() // 'juan527134'
   * modules.internet.username({ firstName: 'pedro', lastName: 'Scott' }) // 'pedro_scott'
   *
   * @returns string
   */
  username({
    firstName: ifirstName,
    lastName: ilastName
  } = {}) {
    const firstName = ifirstName ? this.utils.camelCase(ifirstName) : this.personModule.firstName({ language: "en" });
    const lastName = ilastName ? this.utils.camelCase(ilastName) : "";
    const ran = this.datatypeModule.int({ min: 0, max: 3 });
    const genNumbers = () => {
      const countNumbers = this.datatypeModule.int({ min: 1, max: 5 });
      return this.utils.replaceSymbols(
        Array.from({ length: countNumbers }).map(() => "#").join("")
      );
    };
    const genSymbol = () => {
      return this.utils.oneOfArray([".", "-", "_"]);
    };
    let result;
    if (ran === 0) {
      const numbers = this.utils.replaceSymbols(genNumbers());
      result = `${firstName}${lastName}${numbers}`;
    } else if (ran === 1) {
      const symbol = genSymbol();
      result = `${firstName}${symbol}${lastName}`;
    } else if (ran === 2) {
      const numbers = genNumbers();
      result = `${firstName}${numbers}${lastName}`;
    } else {
      const symbol = genSymbol();
      const number = genNumbers();
      result = `${firstName}${symbol}${lastName}${number}`;
    }
    return result;
  }
  /**
   * Returns a http method
   * @example
   * modules.internet.httpMethod() // 'GET'
   * @returns `GET` | `PATCH` | `DELETE` | `POST` | `PUT`
   */
  httpMethod() {
    return this.utils.oneOfArray(HTTP_METHODS);
  }
  /**
   * Returns a IPv6 address
   * @example modules.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   * @returns string
   */
  ipv6() {
    const randHash = () => {
      let result2 = "";
      for (let i = 0; i < 4; i++) {
        result2 += this.utils.oneOfArray([
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f"
        ]);
      }
      return result2;
    };
    const result = [];
    for (let i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(":");
  }
  /**
   * Returns a IPv4 address.
   *
   * @example modules.internet.ipv4() // '245.108.222.0'
   *
   * @returns string
   */
  ipv4() {
    let retString = "";
    for (let i = 1; i <= 4; i++) {
      const val = this.datatypeModule.int({ max: 255, min: 0 });
      if (i === 4) {
        retString += `${val}`;
      } else {
        retString += `${val}.`;
      }
    }
    return retString;
  }
  /**
   * Return an emoji
   * @param args.emoji emoji category
   * @example modules.internet.emoji() // '🔎'
   * @returns string
   */
  emoji({ emoji: iemoji } = {}) {
    const utils2 = new ChacaUtils();
    const emoji = iemoji ? iemoji : void 0;
    if (emoji) {
      const selEmoji = EMOJIS[emoji];
      if (selEmoji) {
        return utils2.oneOfArray(selEmoji);
      } else {
        let retEmojis = [];
        for (const val of Object.values(EMOJIS)) {
          retEmojis = [...retEmojis, ...val];
        }
        return utils2.oneOfArray(retEmojis);
      }
    } else {
      let retEmojis = [];
      for (const val of Object.values(EMOJIS)) {
        retEmojis = [...retEmojis, ...val];
      }
      return utils2.oneOfArray(retEmojis);
    }
  }
  /**
   * Returns a mac address
   * @example modules.internet.mac() // '32:8e:2e:09:c6:05'
   * @returns string
   */
  mac() {
    let retString = "";
    const lowerCharacters = this.datatypeModule.constants.lowerCharacters;
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 2; j++) {
        retString += `${String(
          this.utils.oneOfArray([...numbers, ...lowerCharacters])
        )}`;
      }
      if (i !== 6) retString += `:`;
    }
    return retString;
  }
  /**
   * Returns a port number
   * @example
   * modules.internet.port() // 8001
   * @returns string
   */
  port() {
    return this.datatypeModule.int({ min: 0, max: 65535 });
  }
  /**
   * Returns a string with a browser user agent
   * @example modules.internet.userAgent() // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   * @returns string
   */
  userAgent() {
    return GenerateUserAgent(this.datatypeModule, this.utils);
  }
  /**
   * Returns a web protocol
   * @example modules.internet.protocol() // 'https'
   * @returns string
   */
  protocol() {
    return this.utils.oneOfArray(this.constants.protocols);
  }
  /**
   * Returns a domain suffix
   * @example modules.internet.domainSuffix() // '.com'
   * @returns string
   */
  domainSuffix() {
    return this.utils.oneOfArray(DOMAIN_SUFFIX);
  }
  /**
   * Returns a domain word
   * @example modules.internet.domainName() // 'words.info'
   * @returns string
   */
  domainName() {
    const name = this.wordModule.noun({ language: "en" });
    const tale = this.datatypeModule.boolean();
    if (tale) {
      const t = this.utils.oneOfArray([
        "info",
        this.wordModule.adjective({ language: "en" })
      ]);
      const sep = this.utils.oneOfArray([".", "-"]);
      return `${name}${sep}${t}`;
    } else {
      return name;
    }
  }
  /**
   * Returns a web http status code
   * @example modules.internet.httpStatusCode() // 201
   * @returns string
   */
  httpStatusCode() {
    const sel = this.utils.oneOfArray(
      Object.keys(HTTP_STATUS)
    );
    return this.utils.oneOfArray(HTTP_STATUS[sel]);
  }
  /**
   * Generates a random IPv4 or IPv6 address.
   *
   * @example
   * modules.internet.ip() // '245.108.222.0'
   * modules.internet.ip() // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
   */
  ip() {
    return this.datatypeModule.boolean() ? this.ipv4() : this.ipv6();
  }
};
var LoremModule = class {
  constructor(datatypeModule) {
    __publicField(this, "datatypeModule", datatypeModule);
  }
  /**
   * @param args.paragraphsCount Number of paragraphs. Default `3`
   * @param args.separator Separator between paragraphs. Default `\n`
   * @param args.maxSentences Maximun of sentences of each paragraphs
   * @param args.minSentences Min of sentences of each paragraphs
   *
   * @example modules.lorem.paragraphs()
   * @returns string
   */
  paragraphs({
    maxSentences,
    minSentences,
    paragraphsCount,
    separator: iseparator
  } = {}) {
    const separator = iseparator ? iseparator : "\n";
    const cant = typeof paragraphsCount === "number" && paragraphsCount > 0 ? paragraphsCount : 3;
    const minS = typeof minSentences === "number" && minSentences > 0 ? minSentences : void 0;
    const maxS = typeof maxSentences === "number" && maxSentences > 0 ? maxSentences : void 0;
    return loremIpsum({
      format: "plain",
      suffix: separator,
      count: cant,
      paragraphUpperBound: maxS,
      paragraphLowerBound: minS,
      units: "paragraphs"
    });
  }
  /**
   * @param args.sentencesCount Number of sentences. Default in `3`
   * @param args.separator Separator between sentences. Default `\n`
   * @param args.wordsMin Minimun of words in each sentence
   * @param args.wordsMax Maximun of words in each sentence
   *
   * @example modules.lorem.sentences()
   * @returns
   */
  sentences({
    sentencesCount,
    separator: iseparator,
    wordsMax,
    wordsMin
  } = {}) {
    const cant = typeof sentencesCount === "number" && sentencesCount > 0 ? sentencesCount : 3;
    const separator = iseparator ? iseparator : "\n";
    const wordMin = typeof wordsMin === "number" && wordsMin > 0 ? wordsMin : void 0;
    const wordMax = typeof wordsMax === "number" && wordsMax > 0 ? wordsMax : void 0;
    return loremIpsum({
      format: "plain",
      units: "sentences",
      count: cant,
      suffix: separator,
      sentenceLowerBound: wordMin,
      sentenceUpperBound: wordMax
    });
  }
  /**
   * @param args.wordCount Number of words in the slug. Default `3`
   * @example modules.lorem.slug() // 'lorem-ipsum-ad'
   * @returns string
   */
  slug({ wordCount } = {}) {
    const cant = typeof wordCount === "number" && wordCount > 0 ? wordCount : 3;
    const words = loremIpsum({
      format: "plain",
      count: cant,
      units: "words"
    });
    let retString = "";
    for (let i = 0; i < words.length; i++) {
      retString = retString.concat(words[i] === " " ? "-" : words[i]);
    }
    return retString;
  }
  /**
   *
   * @param args.count Number or words.
   * @example modules.lorem.words() // 'lorem ipsum in'
   * @returns string
   */
  words({ count: icount } = {}) {
    const count = typeof icount === "number" && icount >= 0 ? icount : this.datatypeModule.int({ min: 5, max: 10 });
    return loremIpsum({ format: "plain", units: "words", count });
  }
  /**
   * Generates a word .
   *
   * @example
   * modules.lorem.word() // 'temporibus'
   */
  word() {
    return loremIpsum({ format: "plain", units: "words", count: 1 });
  }
  /**
   * Generates a paragraph with the given number of sentences.
   *
   * @param args.count The number of sentences to generate.
   *
   * @example
   * modules.lorem.paragraph()
   *
   */
  paragraph({ count: icount } = {}) {
    const count = typeof icount === "number" && icount > 0 ? icount : this.datatypeModule.int({ min: 3, max: 10 });
    return loremIpsum({
      format: "plain",
      paragraphUpperBound: count,
      paragraphLowerBound: count,
      units: "paragraphs"
    });
  }
  /**
   * Generates a single sentence.
   *
   * @param args.wordsMin Minimun of words
   * @param args.wordsMax Maximun of words
   *
   * @example
   * modules.lorem.sentence() // 'Voluptatum cupiditate suscipit autem eveniet aut dolorem aut officiis distinctio.'
   * modules.lorem.sentence(5) // 'Laborum voluptatem officiis est et.'
   * modules.lorem.sentence({ min: 3, max: 5 }) // 'Fugiat repellendus nisi.'
   */
  sentence({ wordsMax, wordsMin } = {}) {
    const wordMin = typeof wordsMin === "number" && wordsMin > 0 ? wordsMin : void 0;
    const wordMax = typeof wordsMax === "number" && wordsMax > 0 ? wordsMax : void 0;
    return loremIpsum({
      format: "plain",
      units: "sentences",
      count: 1,
      sentenceLowerBound: wordMin,
      sentenceUpperBound: wordMax
    });
  }
};

// src/modules/image/index.ts
var ImageModule = class {
  constructor(datatypeModule, wordModule) {
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "wordModule", wordModule);
  }
  buildUrl(category = this.wordModule.noun({ language: "en" }), { height: iheight, width: iwidth } = {}) {
    const size = this.datatypeModule.int({ min: 640, max: 4e3 });
    const width = iwidth ? iwidth : size;
    const height = iheight ? iheight : size;
    const url = `https://lexica.art/api/v1/search?q=${encodeURIComponent(
      category
    )}&width=${width}&height=${height}`;
    return url;
  }
  /**
   * Returns an image url from a category
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @example
   * modules.image.category({ category: "soccer" })
   *
   * @returns string
   */
  category(props = {}) {
    return this.buildUrl(props.category, props);
  }
  /**
   * Return a food image url
   *
   * @example
   * modules.image.food()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  food(props) {
    return this.buildUrl("food", props);
  }
  /**
   * Return a event image url
   *
   * @example
   * modules.image.event()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  event(props) {
    return this.buildUrl("event", props);
  }
  /**
   * Return a wallpaper image url
   *
   * @example
   * modules.image.wallpaper()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  wallpaper(props) {
    return this.buildUrl("wallpaper", props);
  }
  /**
   * Return a 3D image url
   *
   * @example
   * modules.image.treeDimension()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  threeDimension(props) {
    return this.buildUrl("3d", props);
  }
  /**
   * Return a architecture image url
   *
   * @example
   * modules.image.architecture()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  architecture(props) {
    return this.buildUrl("architecture", props);
  }
  /**
   * Return a nature image url
   *
   * @example
   * modules.image.nature()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  nature(props) {
    return this.buildUrl("nature", props);
  }
  /**
   * Return a fashion image url
   *
   * @example
   * modules.image.fashion()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  fashion(props) {
    return this.buildUrl("fashion", props);
  }
  /**
   * Return a film image url
   *
   * @example
   * modules.image.film()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  film(props) {
    return this.buildUrl("film", props);
  }
  /**
   * Return a people image url
   *
   * @example
   * modules.image.people()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  people(props) {
    return this.buildUrl("people", props);
  }
  /**
   * Return a health image url
   *
   * @example
   * modules.image.health()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  health(props) {
    return this.buildUrl("health", props);
  }
  /**
   * Return a house image url
   *
   * @example
   * modules.image.house()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  house(props) {
    return this.buildUrl("house", props);
  }
  /**
   * Return a street image url
   *
   * @example
   * modules.image.street()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  street(props) {
    return this.buildUrl("street", props);
  }
  /**
   * Return a animal image url
   *
   * @example
   * modules.image.animal()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  animal(props) {
    return this.buildUrl("animal", props);
  }
  /**
   * Return a spiritual image url
   *
   * @example
   * modules.image.spiritual()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  spiritual(props) {
    return this.buildUrl("spiritual", props);
  }
  /**
   * Return a travel image url
   *
   * @example
   * modules.image.travel()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  travel(props) {
    return this.buildUrl("travel", props);
  }
  /**
   * Return a art image url
   *
   * @example
   * modules.image.art()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  art(props) {
    return this.buildUrl("art", props);
  }
  /**
   * Return a history image url
   *
   * @example
   * modules.image.history()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  history(props) {
    return this.buildUrl("history", props);
  }
  /**
   * Return a sport image url
   *
   * @example
   * modules.image.sport()
   *
   * @param args.witdh image width
   * @param args.height image height
   *
   * @returns string
   */
  sport(props) {
    return this.buildUrl("sport", props);
  }
  /**
   * Return a animate avatar image url
   *
   * @example
   * modules.image.animateAvatar()
   *
   * @returns string
   */
  animatedAvatar() {
    const ran = this.datatypeModule.int({ min: 0, max: 1e3 });
    return `https://api.multiavatar.com/${ran}.svg`;
  }
};

// src/modules/system/constants/mime-types.ts
var MIME_TYPES = [
  // Text
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  "application/json",
  "application/xml",
  "text/csv",
  "text/tab-separated-values",
  // Image
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
  "image/webp",
  "image/tiff",
  "image/x-icon",
  // Audio
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/flac",
  "audio/mp4",
  // Video
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-flv",
  "video/avi",
  // Application
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/gzip",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/java-archive",
  "application/x-shockwave-flash",
  // Font
  "font/woff",
  "font/woff2",
  "font/opentype",
  "font/truetype",
  "font/collection",
  // Model
  "model/iges",
  "model/vrml",
  "model/mesh",
  "model/obj",
  "model/stl",
  // Message
  "message/http",
  "message/imdn+xml",
  "message/partial",
  "message/rfc822",
  // Multipart
  "multipart/form-data",
  "multipart/byteranges",
  "multipart/alternative",
  "multipart/digest",
  "multipart/parallel",
  "multipart/related",
  "multipart/report",
  "multipart/signed",
  "multipart/encrypted",
  // Other
  "application/octet-stream",
  "application/x-www-form-urlencoded",
  "application/vnd.api+json",
  "application/ld+json",
  "application/problem+json"
];

// src/modules/system/constants/file-extensions.ts
var FILE_EXTENSIONS = {
  text: [".txt", ".log", ".csv", ".json"],
  code: [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".php",
    ".go",
    ".ruby",
    ".swift",
    ".kt",
    ".scala",
    ".rust",
    ".vb",
    ".cs",
    ".sql",
    ".css",
    ".html",
    ".vue",
    ".sass",
    ".scss",
    ".less"
  ],
  config: [".ini", ".conf", ".yaml", ".yml", ".xml", ".properties", ".env"],
  docs: [".md", ".markdown", ".rst", ".docx", ".pdf", ".html", ".htm"],
  multimedia: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
    ".aac",
    ".mp4",
    ".avi",
    ".mov",
    ".mkv"
  ],
  minify: [".zip", ".rar", ".tar", ".gz", ".bz2", ".xz", ".7z"],
  executable: [".exe", ".msi", ".apk", ".ipa", ".deb", ".rpm"],
  database: [".db", ".sqlite", ".mdb", ".accdb", ".sqlitedb", ".sql"],
  office: [
    ".doc",
    ".xls",
    ".ppt",
    ".xlsx",
    ".xlsm",
    ".xltx",
    ".xltm",
    ".pptx",
    ".pptm",
    ".potx",
    ".ppsx",
    ".ppam"
  ],
  videogame: [".sav", ".dat", ".pak", ".unitypackage"],
  os: [".dll", ".so", ".dylib", ".framework"]
};

// src/modules/system/constants/non-standard-cron-expressions.ts
var nonStandardExpressions = [
  "@annually",
  "@daily",
  "@hourly",
  "@monthly",
  "@reboot",
  "@weekly",
  "@yearly"
];

// src/modules/system/index.ts
var CRON_DAY_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var SystemModule = class {
  constructor(utils2, datatypeModule, wordModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "wordModule", wordModule);
    __publicField(this, "constants", {
      fileExtensions: FILE_EXTENSIONS,
      mimeTypes: MIME_TYPES
    });
  }
  /**
   * Returns a file name
   * @param args.ext File extension
   * @example
   * modules.system.filename() // 'academy.png'
   * modules.system.filename({ ext: 'gif' }) // 'academy_button_school.gif'
   * @returns string
   */
  filename({ ext: iext } = {}) {
    const ext = typeof iext === "string" && iext.trim().length > 0 ? `.${iext.trim().replace(/^\.+/, "")}` : this.fileExt();
    const length = this.datatypeModule.int({ min: 1, max: 5 });
    const arrayNames = Array.from({
      length
    }).map(() => this.wordModule.noun({ language: "en" }));
    return `${arrayNames.join("_")}${ext}`.trim();
  }
  /**
   * Returns a mime type
   * @example modules.system.mimeType() // 'video/mpeg'
   * @returns string
   */
  mimeType() {
    return this.utils.oneOfArray(MIME_TYPES);
  }
  /**
   * Return a file extension
   * @example modules.system.fileExt() // '.mp4'
   * @returns string
   */
  fileExt() {
    return this.utils.oneOfArray(Object.values(FILE_EXTENSIONS).flat());
  }
  /**
   * Returns a directory path
   *
   * @example modules.system.directoryPath() // 'user/files/videos'
   *
   * @returns string
   */
  directoryPath() {
    const countFolder = this.datatypeModule.int({ min: 1, max: 5 });
    const array = Array.from({ length: countFolder });
    for (let i = 0; i < array.length; i++) {
      array[i] = this.wordModule.noun();
    }
    return array.join("/");
  }
  /**
   * Returns a string with a system file path
   * @example
   * modules.system.filePath() // 'user/files/videos/academy.mp4'
   * @returns string
   */
  filePath() {
    return `${this.directoryPath()}/${this.filename()}`;
  }
  /**
   * Returns a [semantic version](https://semver.org).
   *
   * @example
   * modules.system.semver() // '1.1.2'
   */
  semver() {
    return [
      this.datatypeModule.int({ min: 0, max: 9 }),
      this.datatypeModule.int({ min: 0, max: 9 }),
      this.datatypeModule.int({ min: 0, max: 9 })
    ].join(".");
  }
  /**
   * Returns a random cron expression.
   *
   * @param args.includeYear Whether to include a year in the generated expression. Default `false`.
   * @param args.includeNonStandard Whether to include a `@yearly`, `@monthly`, `@daily`, etc text labels in the generated expression. Default`false`.
   *
   * @example
   * modules.system.cron() // '45 23 * * 6'
   * modules.system.cron({ includeYear: true }) // '45 23 * * 6 2067'
   * modules.system.cron({ includeYear: false }) // '45 23 * * 6'
   * modules.system.cron({ includeNonStandard: false }) // '45 23 * * 6'
   * modules.system.cron({ includeNonStandard: true }) // '@yearly'
   */
  cron({
    includeYear = false,
    includeNonStandard = false
  } = {}) {
    const minutes = [this.datatypeModule.int({ min: 0, max: 59 }), "*"];
    const hours = [this.datatypeModule.int({ min: 0, max: 23 }), "*"];
    const days = [this.datatypeModule.int({ min: 1, max: 31 }), "*", "?"];
    const months = [this.datatypeModule.int({ min: 1, max: 12 }), "*"];
    const daysOfWeek = [
      this.datatypeModule.int({ min: 0, max: 6 }),
      this.utils.oneOfArray(CRON_DAY_OF_WEEK),
      "*",
      "?"
    ];
    const years = [this.datatypeModule.int({ min: 1970, max: 2099 }), "*"];
    const minute = this.utils.oneOfArray(minutes);
    const hour = this.utils.oneOfArray(hours);
    const day = this.utils.oneOfArray(days);
    const month = this.utils.oneOfArray(months);
    const dayOfWeek = this.utils.oneOfArray(daysOfWeek);
    const year = this.utils.oneOfArray(years);
    let standard = !includeNonStandard;
    let standardExpression = `${minute} ${hour} ${day} ${month} ${dayOfWeek}`;
    if (includeYear) {
      standard = true;
      standardExpression += ` ${year}`;
    }
    return standard ? standardExpression : this.utils.oneOfArray(nonStandardExpressions);
  }
};

// src/modules/finance/constants/account-type.ts
var ACCOUNT_TYPES = [
  "Checking",
  "Savings",
  "Money Market",
  "Investment",
  "Home Loan",
  "Credit Card",
  "Auto Loan",
  "Personal Loan"
];

// src/modules/finance/constants/iban.ts
var IBAN = {
  alpha: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ],
  formats: [
    {
      country: "AL",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "ALkk bbbs sssx cccc cccc cccc cccc"
    },
    {
      country: "AD",
      total: 24,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "ADkk bbbb ssss cccc cccc cccc"
    },
    {
      country: "AT",
      total: 20,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 11
        }
      ],
      format: "ATkk bbbb bccc cccc cccc"
    },
    {
      // Azerbaijan
      // https://transferwise.com/fr/iban/azerbaijan
      // Length 28
      // BBAN 2c,16n
      // GEkk bbbb cccc cccc cccc cccc cccc
      // b = National bank code (alpha)
      // c = Account number
      // example IBAN AZ21 NABZ 0000 0000 1370 1000 1944
      country: "AZ",
      total: 28,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 20
        }
      ],
      format: "AZkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "BH",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 14
        }
      ],
      format: "BHkk bbbb cccc cccc cccc cc"
    },
    {
      country: "BE",
      total: 16,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 9
        }
      ],
      format: "BEkk bbbc cccc ccxx"
    },
    {
      country: "BA",
      total: 20,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "BAkk bbbs sscc cccc ccxx"
    },
    {
      country: "BR",
      total: 29,
      bban: [
        {
          type: "n",
          count: 13
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "a",
          count: 1
        },
        {
          type: "c",
          count: 1
        }
      ],
      format: "BRkk bbbb bbbb ssss sccc cccc ccct n"
    },
    {
      country: "BG",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "c",
          count: 8
        }
      ],
      format: "BGkk bbbb ssss ddcc cccc cc"
    },
    {
      country: "CR",
      total: 22,
      bban: [
        {
          type: "n",
          count: 1
        },
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 14
        }
      ],
      format: "CRkk xbbb cccc cccc cccc cc"
    },
    {
      country: "HR",
      total: 21,
      bban: [
        {
          type: "n",
          count: 7
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "HRkk bbbb bbbc cccc cccc c"
    },
    {
      country: "CY",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "CYkk bbbs ssss cccc cccc cccc cccc"
    },
    {
      country: "CZ",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "CZkk bbbb ssss sscc cccc cccc"
    },
    {
      country: "DK",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "DKkk bbbb cccc cccc cc"
    },
    {
      country: "DO",
      total: 28,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 20
        }
      ],
      format: "DOkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "TL",
      total: 23,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "TLkk bbbc cccc cccc cccc cxx"
    },
    {
      country: "EE",
      total: 20,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "EEkk bbss cccc cccc cccx"
    },
    {
      country: "FO",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "FOkk bbbb cccc cccc cx"
    },
    {
      country: "FI",
      total: 18,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "FIkk bbbb bbcc cccc cx"
    },
    {
      country: "FR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 11
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "FRkk bbbb bggg ggcc cccc cccc cxx"
    },
    {
      country: "GE",
      total: 22,
      bban: [
        {
          type: "a",
          count: 2
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "GEkk bbcc cccc cccc cccc cc"
    },
    {
      country: "DE",
      total: 22,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "DEkk bbbb bbbb cccc cccc cc"
    },
    {
      country: "GI",
      total: 23,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 15
        }
      ],
      format: "GIkk bbbb cccc cccc cccc ccc"
    },
    {
      country: "GR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 7
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "GRkk bbbs sssc cccc cccc cccc ccc"
    },
    {
      country: "GL",
      total: 18,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "GLkk bbbb cccc cccc cc"
    },
    {
      country: "GT",
      total: 28,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "c",
          count: 4
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "GTkk bbbb mmtt cccc cccc cccc cccc"
    },
    {
      country: "HU",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "HUkk bbbs sssk cccc cccc cccc cccx"
    },
    {
      country: "IS",
      total: 26,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "ISkk bbbb sscc cccc iiii iiii ii"
    },
    {
      country: "IE",
      total: 22,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "IEkk aaaa bbbb bbcc cccc cc"
    },
    {
      country: "IL",
      total: 23,
      bban: [
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "ILkk bbbn nncc cccc cccc ccc"
    },
    {
      country: "IT",
      total: 27,
      bban: [
        {
          type: "a",
          count: 1
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "ITkk xaaa aabb bbbc cccc cccc ccc"
    },
    {
      country: "JO",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 18
        }
      ],
      format: "JOkk bbbb nnnn cccc cccc cccc cccc cc"
    },
    {
      country: "KZ",
      total: 20,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "KZkk bbbc cccc cccc cccc"
    },
    {
      country: "XK",
      total: 20,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "XKkk bbbb cccc cccc cccc"
    },
    {
      country: "KW",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 22
        }
      ],
      format: "KWkk bbbb cccc cccc cccc cccc cccc cc"
    },
    {
      country: "LV",
      total: 21,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "LVkk bbbb cccc cccc cccc c"
    },
    {
      country: "LB",
      total: 28,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "c",
          count: 20
        }
      ],
      format: "LBkk bbbb cccc cccc cccc cccc cccc"
    },
    {
      country: "LI",
      total: 21,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "LIkk bbbb bccc cccc cccc c"
    },
    {
      country: "LT",
      total: 20,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 11
        }
      ],
      format: "LTkk bbbb bccc cccc cccc"
    },
    {
      country: "LU",
      total: 20,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 13
        }
      ],
      format: "LUkk bbbc cccc cccc cccc"
    },
    {
      country: "MK",
      total: 19,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "c",
          count: 10
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "MKkk bbbc cccc cccc cxx"
    },
    {
      country: "MT",
      total: 31,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "MTkk bbbb ssss sccc cccc cccc cccc ccc"
    },
    {
      country: "MR",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "MRkk bbbb bsss sscc cccc cccc cxx"
    },
    {
      country: "MU",
      total: 30,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 15
        },
        {
          type: "a",
          count: 3
        }
      ],
      format: "MUkk bbbb bbss cccc cccc cccc 000d dd"
    },
    {
      country: "MC",
      total: 27,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 11
        },
        {
          type: "n",
          count: 2
        }
      ],
      format: "MCkk bbbb bsss sscc cccc cccc cxx"
    },
    {
      country: "MD",
      total: 24,
      bban: [
        {
          type: "c",
          count: 2
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "MDkk bbcc cccc cccc cccc cccc"
    },
    {
      country: "ME",
      total: 22,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "MEkk bbbc cccc cccc cccc xx"
    },
    {
      country: "NL",
      total: 18,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "NLkk bbbb cccc cccc cc"
    },
    {
      country: "NO",
      total: 15,
      bban: [
        {
          type: "n",
          count: 4
        },
        {
          type: "n",
          count: 7
        }
      ],
      format: "NOkk bbbb cccc ccx"
    },
    {
      country: "PK",
      total: 24,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "PKkk bbbb cccc cccc cccc cccc"
    },
    {
      country: "PS",
      total: 29,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 9
        },
        {
          type: "n",
          count: 12
        }
      ],
      format: "PSkk bbbb xxxx xxxx xccc cccc cccc c"
    },
    {
      country: "PL",
      total: 28,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "PLkk bbbs sssx cccc cccc cccc cccc"
    },
    {
      country: "PT",
      total: 25,
      bban: [
        {
          type: "n",
          count: 8
        },
        {
          type: "n",
          count: 13
        }
      ],
      format: "PTkk bbbb ssss cccc cccc cccx x"
    },
    {
      country: "QA",
      total: 29,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 21
        }
      ],
      format: "QAkk bbbb cccc cccc cccc cccc cccc c"
    },
    {
      country: "RO",
      total: 24,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "c",
          count: 16
        }
      ],
      format: "ROkk bbbb cccc cccc cccc cccc"
    },
    {
      country: "SM",
      total: 27,
      bban: [
        {
          type: "a",
          count: 1
        },
        {
          type: "n",
          count: 10
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "SMkk xaaa aabb bbbc cccc cccc ccc"
    },
    {
      country: "SA",
      total: 24,
      bban: [
        {
          type: "n",
          count: 2
        },
        {
          type: "c",
          count: 18
        }
      ],
      format: "SAkk bbcc cccc cccc cccc cccc"
    },
    {
      country: "RS",
      total: 22,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "RSkk bbbc cccc cccc cccc xx"
    },
    {
      country: "SK",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "SKkk bbbb ssss sscc cccc cccc"
    },
    {
      country: "SI",
      total: 19,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "SIkk bbss sccc cccc cxx"
    },
    {
      country: "ES",
      total: 24,
      bban: [
        {
          type: "n",
          count: 10
        },
        {
          type: "n",
          count: 10
        }
      ],
      format: "ESkk bbbb gggg xxcc cccc cccc"
    },
    {
      country: "SE",
      total: 24,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 17
        }
      ],
      format: "SEkk bbbc cccc cccc cccc cccc"
    },
    {
      country: "CH",
      total: 21,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "c",
          count: 12
        }
      ],
      format: "CHkk bbbb bccc cccc cccc c"
    },
    {
      country: "TN",
      total: 24,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 15
        }
      ],
      format: "TNkk bbss sccc cccc cccc cccc"
    },
    {
      country: "TR",
      total: 26,
      bban: [
        {
          type: "n",
          count: 5
        },
        {
          type: "n",
          count: 1
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "TRkk bbbb bxcc cccc cccc cccc cc"
    },
    {
      country: "AE",
      total: 23,
      bban: [
        {
          type: "n",
          count: 3
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "AEkk bbbc cccc cccc cccc ccc"
    },
    {
      country: "GB",
      total: 22,
      bban: [
        {
          type: "a",
          count: 4
        },
        {
          type: "n",
          count: 6
        },
        {
          type: "n",
          count: 8
        }
      ],
      format: "GBkk bbbb ssss sscc cccc cc"
    },
    {
      country: "VG",
      total: 24,
      bban: [
        {
          type: "c",
          count: 4
        },
        {
          type: "n",
          count: 16
        }
      ],
      format: "VGkk bbbb cccc cccc cccc cccc"
    }
  ],
  iso3166: [
    "AD",
    "AE",
    "AF",
    "AG",
    "AI",
    "AL",
    "AM",
    "AO",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AW",
    "AX",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BL",
    "BM",
    "BN",
    "BO",
    "BQ",
    "BR",
    "BS",
    "BT",
    "BV",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CC",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CK",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CW",
    "CX",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "EH",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FK",
    "FM",
    "FO",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GF",
    "GG",
    "GH",
    "GI",
    "GL",
    "GM",
    "GN",
    "GP",
    "GQ",
    "GR",
    "GS",
    "GT",
    "GU",
    "GW",
    "GY",
    "HK",
    "HM",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IM",
    "IN",
    "IO",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JE",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KR",
    "KW",
    "KY",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MF",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MO",
    "MP",
    "MQ",
    "MR",
    "MS",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NC",
    "NE",
    "NF",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NU",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PF",
    "PG",
    "PH",
    "PK",
    "PL",
    "PM",
    "PN",
    "PR",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RE",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SH",
    "SI",
    "SJ",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SX",
    "SY",
    "SZ",
    "TC",
    "TD",
    "TF",
    "TG",
    "TH",
    "TJ",
    "TK",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "UM",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VG",
    "VI",
    "VN",
    "VU",
    "WF",
    "WS",
    "XK",
    "YE",
    "YT",
    "ZA",
    "ZM",
    "ZW"
  ],
  mod97: (digitStr) => {
    let m = 0;
    for (let i = 0; i < digitStr.length; i++) {
      m = (m * 10 + +digitStr[i]) % 97;
    }
    return m;
  },
  pattern10: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
  pattern100: ["001", "002", "003", "004", "005", "006", "007", "008", "009"],
  toDigitString: (str) => str.replace(
    /[A-Z]/gi,
    (match) => String(match.toUpperCase().charCodeAt(0) - 55)
  )
};

// src/modules/finance/constants/money-info.ts
var MONEY_INFO = {
  CUP: {
    symbol: "$",
    name: "Cuban Peso",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "CUP",
    name_plural: "Cuban pesos"
  },
  USD: {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars"
  },
  CAD: {
    symbol: "CA$",
    name: "Canadian Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "CAD",
    name_plural: "Canadian dollars"
  },
  EUR: {
    symbol: "\u20AC",
    name: "Euro",
    symbol_native: "\u20AC",
    decimal_digits: 2,
    rounding: 0,
    code: "EUR",
    name_plural: "euros"
  },
  AED: {
    symbol: "AED",
    name: "United Arab Emirates Dirham",
    symbol_native: "\u062F.\u0625.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "AED",
    name_plural: "UAE dirhams"
  },
  AFN: {
    symbol: "Af",
    name: "Afghan Afghani",
    symbol_native: "\u060B",
    decimal_digits: 0,
    rounding: 0,
    code: "AFN",
    name_plural: "Afghan Afghanis"
  },
  ALL: {
    symbol: "ALL",
    name: "Albanian Lek",
    symbol_native: "Lek",
    decimal_digits: 0,
    rounding: 0,
    code: "ALL",
    name_plural: "Albanian lek\xEB"
  },
  AMD: {
    symbol: "AMD",
    name: "Armenian Dram",
    symbol_native: "\u0564\u0580.",
    decimal_digits: 0,
    rounding: 0,
    code: "AMD",
    name_plural: "Armenian drams"
  },
  ARS: {
    symbol: "AR$",
    name: "Argentine Peso",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "ARS",
    name_plural: "Argentine pesos"
  },
  AUD: {
    symbol: "AU$",
    name: "Australian Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "AUD",
    name_plural: "Australian dollars"
  },
  AZN: {
    symbol: "man.",
    name: "Azerbaijani Manat",
    symbol_native: "\u043C\u0430\u043D.",
    decimal_digits: 2,
    rounding: 0,
    code: "AZN",
    name_plural: "Azerbaijani manats"
  },
  BAM: {
    symbol: "KM",
    name: "Bosnia-Herzegovina Convertible Mark",
    symbol_native: "KM",
    decimal_digits: 2,
    rounding: 0,
    code: "BAM",
    name_plural: "Bosnia-Herzegovina convertible marks"
  },
  BDT: {
    symbol: "Tk",
    name: "Bangladeshi Taka",
    symbol_native: "\u09F3",
    decimal_digits: 2,
    rounding: 0,
    code: "BDT",
    name_plural: "Bangladeshi takas"
  },
  BGN: {
    symbol: "BGN",
    name: "Bulgarian Lev",
    symbol_native: "\u043B\u0432.",
    decimal_digits: 2,
    rounding: 0,
    code: "BGN",
    name_plural: "Bulgarian leva"
  },
  BHD: {
    symbol: "BD",
    name: "Bahraini Dinar",
    symbol_native: "\u062F.\u0628.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "BHD",
    name_plural: "Bahraini dinars"
  },
  BIF: {
    symbol: "FBu",
    name: "Burundian Franc",
    symbol_native: "FBu",
    decimal_digits: 0,
    rounding: 0,
    code: "BIF",
    name_plural: "Burundian francs"
  },
  BND: {
    symbol: "BN$",
    name: "Brunei Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "BND",
    name_plural: "Brunei dollars"
  },
  BOB: {
    symbol: "Bs",
    name: "Bolivian Boliviano",
    symbol_native: "Bs",
    decimal_digits: 2,
    rounding: 0,
    code: "BOB",
    name_plural: "Bolivian bolivianos"
  },
  BRL: {
    symbol: "R$",
    name: "Brazilian Real",
    symbol_native: "R$",
    decimal_digits: 2,
    rounding: 0,
    code: "BRL",
    name_plural: "Brazilian reals"
  },
  BWP: {
    symbol: "BWP",
    name: "Botswanan Pula",
    symbol_native: "P",
    decimal_digits: 2,
    rounding: 0,
    code: "BWP",
    name_plural: "Botswanan pulas"
  },
  BYN: {
    symbol: "Br",
    name: "Belarusian Ruble",
    symbol_native: "\u0440\u0443\u0431.",
    decimal_digits: 2,
    rounding: 0,
    code: "BYN",
    name_plural: "Belarusian rubles"
  },
  BZD: {
    symbol: "BZ$",
    name: "Belize Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "BZD",
    name_plural: "Belize dollars"
  },
  CDF: {
    symbol: "CDF",
    name: "Congolese Franc",
    symbol_native: "FrCD",
    decimal_digits: 2,
    rounding: 0,
    code: "CDF",
    name_plural: "Congolese francs"
  },
  CHF: {
    symbol: "CHF",
    name: "Swiss Franc",
    symbol_native: "CHF",
    decimal_digits: 2,
    rounding: 0.05,
    code: "CHF",
    name_plural: "Swiss francs"
  },
  CLP: {
    symbol: "CL$",
    name: "Chilean Peso",
    symbol_native: "$",
    decimal_digits: 0,
    rounding: 0,
    code: "CLP",
    name_plural: "Chilean pesos"
  },
  CNY: {
    symbol: "CN\xA5",
    name: "Chinese Yuan",
    symbol_native: "CN\xA5",
    decimal_digits: 2,
    rounding: 0,
    code: "CNY",
    name_plural: "Chinese yuan"
  },
  COP: {
    symbol: "CO$",
    name: "Colombian Peso",
    symbol_native: "$",
    decimal_digits: 0,
    rounding: 0,
    code: "COP",
    name_plural: "Colombian pesos"
  },
  CRC: {
    symbol: "\u20A1",
    name: "Costa Rican Col\xF3n",
    symbol_native: "\u20A1",
    decimal_digits: 0,
    rounding: 0,
    code: "CRC",
    name_plural: "Costa Rican col\xF3ns"
  },
  CVE: {
    symbol: "CV$",
    name: "Cape Verdean Escudo",
    symbol_native: "CV$",
    decimal_digits: 2,
    rounding: 0,
    code: "CVE",
    name_plural: "Cape Verdean escudos"
  },
  CZK: {
    symbol: "K\u010D",
    name: "Czech Republic Koruna",
    symbol_native: "K\u010D",
    decimal_digits: 2,
    rounding: 0,
    code: "CZK",
    name_plural: "Czech Republic korunas"
  },
  DJF: {
    symbol: "Fdj",
    name: "Djiboutian Franc",
    symbol_native: "Fdj",
    decimal_digits: 0,
    rounding: 0,
    code: "DJF",
    name_plural: "Djiboutian francs"
  },
  DKK: {
    symbol: "Dkr",
    name: "Danish Krone",
    symbol_native: "kr",
    decimal_digits: 2,
    rounding: 0,
    code: "DKK",
    name_plural: "Danish kroner"
  },
  DOP: {
    symbol: "RD$",
    name: "Dominican Peso",
    symbol_native: "RD$",
    decimal_digits: 2,
    rounding: 0,
    code: "DOP",
    name_plural: "Dominican pesos"
  },
  DZD: {
    symbol: "DA",
    name: "Algerian Dinar",
    symbol_native: "\u062F.\u062C.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "DZD",
    name_plural: "Algerian dinars"
  },
  EEK: {
    symbol: "Ekr",
    name: "Estonian Kroon",
    symbol_native: "kr",
    decimal_digits: 2,
    rounding: 0,
    code: "EEK",
    name_plural: "Estonian kroons"
  },
  EGP: {
    symbol: "EGP",
    name: "Egyptian Pound",
    symbol_native: "\u062C.\u0645.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "EGP",
    name_plural: "Egyptian pounds"
  },
  ERN: {
    symbol: "Nfk",
    name: "Eritrean Nakfa",
    symbol_native: "Nfk",
    decimal_digits: 2,
    rounding: 0,
    code: "ERN",
    name_plural: "Eritrean nakfas"
  },
  ETB: {
    symbol: "Br",
    name: "Ethiopian Birr",
    symbol_native: "Br",
    decimal_digits: 2,
    rounding: 0,
    code: "ETB",
    name_plural: "Ethiopian birrs"
  },
  GBP: {
    symbol: "\xA3",
    name: "British Pound Sterling",
    symbol_native: "\xA3",
    decimal_digits: 2,
    rounding: 0,
    code: "GBP",
    name_plural: "British pounds sterling"
  },
  GEL: {
    symbol: "GEL",
    name: "Georgian Lari",
    symbol_native: "GEL",
    decimal_digits: 2,
    rounding: 0,
    code: "GEL",
    name_plural: "Georgian laris"
  },
  GHS: {
    symbol: "GH\u20B5",
    name: "Ghanaian Cedi",
    symbol_native: "GH\u20B5",
    decimal_digits: 2,
    rounding: 0,
    code: "GHS",
    name_plural: "Ghanaian cedis"
  },
  GNF: {
    symbol: "FG",
    name: "Guinean Franc",
    symbol_native: "FG",
    decimal_digits: 0,
    rounding: 0,
    code: "GNF",
    name_plural: "Guinean francs"
  },
  GTQ: {
    symbol: "GTQ",
    name: "Guatemalan Quetzal",
    symbol_native: "Q",
    decimal_digits: 2,
    rounding: 0,
    code: "GTQ",
    name_plural: "Guatemalan quetzals"
  },
  HKD: {
    symbol: "HK$",
    name: "Hong Kong Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "HKD",
    name_plural: "Hong Kong dollars"
  },
  HNL: {
    symbol: "HNL",
    name: "Honduran Lempira",
    symbol_native: "L",
    decimal_digits: 2,
    rounding: 0,
    code: "HNL",
    name_plural: "Honduran lempiras"
  },
  HRK: {
    symbol: "kn",
    name: "Croatian Kuna",
    symbol_native: "kn",
    decimal_digits: 2,
    rounding: 0,
    code: "HRK",
    name_plural: "Croatian kunas"
  },
  HUF: {
    symbol: "Ft",
    name: "Hungarian Forint",
    symbol_native: "Ft",
    decimal_digits: 0,
    rounding: 0,
    code: "HUF",
    name_plural: "Hungarian forints"
  },
  IDR: {
    symbol: "Rp",
    name: "Indonesian Rupiah",
    symbol_native: "Rp",
    decimal_digits: 0,
    rounding: 0,
    code: "IDR",
    name_plural: "Indonesian rupiahs"
  },
  ILS: {
    symbol: "\u20AA",
    name: "Israeli New Sheqel",
    symbol_native: "\u20AA",
    decimal_digits: 2,
    rounding: 0,
    code: "ILS",
    name_plural: "Israeli new sheqels"
  },
  INR: {
    symbol: "Rs",
    name: "Indian Rupee",
    symbol_native: "\u099F\u0995\u09BE",
    decimal_digits: 2,
    rounding: 0,
    code: "INR",
    name_plural: "Indian rupees"
  },
  IQD: {
    symbol: "IQD",
    name: "Iraqi Dinar",
    symbol_native: "\u062F.\u0639.\u200F",
    decimal_digits: 0,
    rounding: 0,
    code: "IQD",
    name_plural: "Iraqi dinars"
  },
  IRR: {
    symbol: "IRR",
    name: "Iranian Rial",
    symbol_native: "\uFDFC",
    decimal_digits: 0,
    rounding: 0,
    code: "IRR",
    name_plural: "Iranian rials"
  },
  ISK: {
    symbol: "Ikr",
    name: "Icelandic Kr\xF3na",
    symbol_native: "kr",
    decimal_digits: 0,
    rounding: 0,
    code: "ISK",
    name_plural: "Icelandic kr\xF3nur"
  },
  JMD: {
    symbol: "J$",
    name: "Jamaican Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "JMD",
    name_plural: "Jamaican dollars"
  },
  JOD: {
    symbol: "JD",
    name: "Jordanian Dinar",
    symbol_native: "\u062F.\u0623.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "JOD",
    name_plural: "Jordanian dinars"
  },
  JPY: {
    symbol: "\xA5",
    name: "Japanese Yen",
    symbol_native: "\uFFE5",
    decimal_digits: 0,
    rounding: 0,
    code: "JPY",
    name_plural: "Japanese yen"
  },
  KES: {
    symbol: "Ksh",
    name: "Kenyan Shilling",
    symbol_native: "Ksh",
    decimal_digits: 2,
    rounding: 0,
    code: "KES",
    name_plural: "Kenyan shillings"
  },
  KHR: {
    symbol: "KHR",
    name: "Cambodian Riel",
    symbol_native: "\u17DB",
    decimal_digits: 2,
    rounding: 0,
    code: "KHR",
    name_plural: "Cambodian riels"
  },
  KMF: {
    symbol: "CF",
    name: "Comorian Franc",
    symbol_native: "FC",
    decimal_digits: 0,
    rounding: 0,
    code: "KMF",
    name_plural: "Comorian francs"
  },
  KRW: {
    symbol: "\u20A9",
    name: "South Korean Won",
    symbol_native: "\u20A9",
    decimal_digits: 0,
    rounding: 0,
    code: "KRW",
    name_plural: "South Korean won"
  },
  KWD: {
    symbol: "KD",
    name: "Kuwaiti Dinar",
    symbol_native: "\u062F.\u0643.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "KWD",
    name_plural: "Kuwaiti dinars"
  },
  KZT: {
    symbol: "KZT",
    name: "Kazakhstani Tenge",
    symbol_native: "\u0442\u04A3\u0433.",
    decimal_digits: 2,
    rounding: 0,
    code: "KZT",
    name_plural: "Kazakhstani tenges"
  },
  LBP: {
    symbol: "L.L.",
    name: "Lebanese Pound",
    symbol_native: "\u0644.\u0644.\u200F",
    decimal_digits: 0,
    rounding: 0,
    code: "LBP",
    name_plural: "Lebanese pounds"
  },
  LKR: {
    symbol: "SLRs",
    name: "Sri Lankan Rupee",
    symbol_native: "SL Re",
    decimal_digits: 2,
    rounding: 0,
    code: "LKR",
    name_plural: "Sri Lankan rupees"
  },
  LTL: {
    symbol: "Lt",
    name: "Lithuanian Litas",
    symbol_native: "Lt",
    decimal_digits: 2,
    rounding: 0,
    code: "LTL",
    name_plural: "Lithuanian litai"
  },
  LVL: {
    symbol: "Ls",
    name: "Latvian Lats",
    symbol_native: "Ls",
    decimal_digits: 2,
    rounding: 0,
    code: "LVL",
    name_plural: "Latvian lati"
  },
  LYD: {
    symbol: "LD",
    name: "Libyan Dinar",
    symbol_native: "\u062F.\u0644.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "LYD",
    name_plural: "Libyan dinars"
  },
  MAD: {
    symbol: "MAD",
    name: "Moroccan Dirham",
    symbol_native: "\u062F.\u0645.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "MAD",
    name_plural: "Moroccan dirhams"
  },
  MDL: {
    symbol: "MDL",
    name: "Moldovan Leu",
    symbol_native: "MDL",
    decimal_digits: 2,
    rounding: 0,
    code: "MDL",
    name_plural: "Moldovan lei"
  },
  MGA: {
    symbol: "MGA",
    name: "Malagasy Ariary",
    symbol_native: "MGA",
    decimal_digits: 0,
    rounding: 0,
    code: "MGA",
    name_plural: "Malagasy Ariaries"
  },
  MKD: {
    symbol: "MKD",
    name: "Macedonian Denar",
    symbol_native: "MKD",
    decimal_digits: 2,
    rounding: 0,
    code: "MKD",
    name_plural: "Macedonian denari"
  },
  MMK: {
    symbol: "MMK",
    name: "Myanma Kyat",
    symbol_native: "K",
    decimal_digits: 0,
    rounding: 0,
    code: "MMK",
    name_plural: "Myanma kyats"
  },
  MOP: {
    symbol: "MOP$",
    name: "Macanese Pataca",
    symbol_native: "MOP$",
    decimal_digits: 2,
    rounding: 0,
    code: "MOP",
    name_plural: "Macanese patacas"
  },
  MUR: {
    symbol: "MURs",
    name: "Mauritian Rupee",
    symbol_native: "MURs",
    decimal_digits: 0,
    rounding: 0,
    code: "MUR",
    name_plural: "Mauritian rupees"
  },
  MXN: {
    symbol: "MX$",
    name: "Mexican Peso",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "MXN",
    name_plural: "Mexican pesos"
  },
  MYR: {
    symbol: "RM",
    name: "Malaysian Ringgit",
    symbol_native: "RM",
    decimal_digits: 2,
    rounding: 0,
    code: "MYR",
    name_plural: "Malaysian ringgits"
  },
  MZN: {
    symbol: "MTn",
    name: "Mozambican Metical",
    symbol_native: "MTn",
    decimal_digits: 2,
    rounding: 0,
    code: "MZN",
    name_plural: "Mozambican meticals"
  },
  NAD: {
    symbol: "N$",
    name: "Namibian Dollar",
    symbol_native: "N$",
    decimal_digits: 2,
    rounding: 0,
    code: "NAD",
    name_plural: "Namibian dollars"
  },
  NGN: {
    symbol: "\u20A6",
    name: "Nigerian Naira",
    symbol_native: "\u20A6",
    decimal_digits: 2,
    rounding: 0,
    code: "NGN",
    name_plural: "Nigerian nairas"
  },
  NIO: {
    symbol: "C$",
    name: "Nicaraguan C\xF3rdoba",
    symbol_native: "C$",
    decimal_digits: 2,
    rounding: 0,
    code: "NIO",
    name_plural: "Nicaraguan c\xF3rdobas"
  },
  NOK: {
    symbol: "Nkr",
    name: "Norwegian Krone",
    symbol_native: "kr",
    decimal_digits: 2,
    rounding: 0,
    code: "NOK",
    name_plural: "Norwegian kroner"
  },
  NPR: {
    symbol: "NPRs",
    name: "Nepalese Rupee",
    symbol_native: "\u0928\u0947\u0930\u0942",
    decimal_digits: 2,
    rounding: 0,
    code: "NPR",
    name_plural: "Nepalese rupees"
  },
  NZD: {
    symbol: "NZ$",
    name: "New Zealand Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "NZD",
    name_plural: "New Zealand dollars"
  },
  OMR: {
    symbol: "OMR",
    name: "Omani Rial",
    symbol_native: "\u0631.\u0639.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "OMR",
    name_plural: "Omani rials"
  },
  PAB: {
    symbol: "B/.",
    name: "Panamanian Balboa",
    symbol_native: "B/.",
    decimal_digits: 2,
    rounding: 0,
    code: "PAB",
    name_plural: "Panamanian balboas"
  },
  PEN: {
    symbol: "S/.",
    name: "Peruvian Nuevo Sol",
    symbol_native: "S/.",
    decimal_digits: 2,
    rounding: 0,
    code: "PEN",
    name_plural: "Peruvian nuevos soles"
  },
  PHP: {
    symbol: "\u20B1",
    name: "Philippine Peso",
    symbol_native: "\u20B1",
    decimal_digits: 2,
    rounding: 0,
    code: "PHP",
    name_plural: "Philippine pesos"
  },
  PKR: {
    symbol: "PKRs",
    name: "Pakistani Rupee",
    symbol_native: "\u20A8",
    decimal_digits: 0,
    rounding: 0,
    code: "PKR",
    name_plural: "Pakistani rupees"
  },
  PLN: {
    symbol: "z\u0142",
    name: "Polish Zloty",
    symbol_native: "z\u0142",
    decimal_digits: 2,
    rounding: 0,
    code: "PLN",
    name_plural: "Polish zlotys"
  },
  PYG: {
    symbol: "\u20B2",
    name: "Paraguayan Guarani",
    symbol_native: "\u20B2",
    decimal_digits: 0,
    rounding: 0,
    code: "PYG",
    name_plural: "Paraguayan guaranis"
  },
  QAR: {
    symbol: "QR",
    name: "Qatari Rial",
    symbol_native: "\u0631.\u0642.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "QAR",
    name_plural: "Qatari rials"
  },
  RON: {
    symbol: "RON",
    name: "Romanian Leu",
    symbol_native: "RON",
    decimal_digits: 2,
    rounding: 0,
    code: "RON",
    name_plural: "Romanian lei"
  },
  RSD: {
    symbol: "din.",
    name: "Serbian Dinar",
    symbol_native: "\u0434\u0438\u043D.",
    decimal_digits: 0,
    rounding: 0,
    code: "RSD",
    name_plural: "Serbian dinars"
  },
  RUB: {
    symbol: "RUB",
    name: "Russian Ruble",
    symbol_native: "\u20BD.",
    decimal_digits: 2,
    rounding: 0,
    code: "RUB",
    name_plural: "Russian rubles"
  },
  RWF: {
    symbol: "RWF",
    name: "Rwandan Franc",
    symbol_native: "FR",
    decimal_digits: 0,
    rounding: 0,
    code: "RWF",
    name_plural: "Rwandan francs"
  },
  SAR: {
    symbol: "SR",
    name: "Saudi Riyal",
    symbol_native: "\u0631.\u0633.\u200F",
    decimal_digits: 2,
    rounding: 0,
    code: "SAR",
    name_plural: "Saudi riyals"
  },
  SDG: {
    symbol: "SDG",
    name: "Sudanese Pound",
    symbol_native: "SDG",
    decimal_digits: 2,
    rounding: 0,
    code: "SDG",
    name_plural: "Sudanese pounds"
  },
  SEK: {
    symbol: "Skr",
    name: "Swedish Krona",
    symbol_native: "kr",
    decimal_digits: 2,
    rounding: 0,
    code: "SEK",
    name_plural: "Swedish kronor"
  },
  SGD: {
    symbol: "S$",
    name: "Singapore Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "SGD",
    name_plural: "Singapore dollars"
  },
  SOS: {
    symbol: "Ssh",
    name: "Somali Shilling",
    symbol_native: "Ssh",
    decimal_digits: 0,
    rounding: 0,
    code: "SOS",
    name_plural: "Somali shillings"
  },
  SYP: {
    symbol: "SY\xA3",
    name: "Syrian Pound",
    symbol_native: "\u0644.\u0633.\u200F",
    decimal_digits: 0,
    rounding: 0,
    code: "SYP",
    name_plural: "Syrian pounds"
  },
  THB: {
    symbol: "\u0E3F",
    name: "Thai Baht",
    symbol_native: "\u0E3F",
    decimal_digits: 2,
    rounding: 0,
    code: "THB",
    name_plural: "Thai baht"
  },
  TND: {
    symbol: "DT",
    name: "Tunisian Dinar",
    symbol_native: "\u062F.\u062A.\u200F",
    decimal_digits: 3,
    rounding: 0,
    code: "TND",
    name_plural: "Tunisian dinars"
  },
  TOP: {
    symbol: "T$",
    name: "Tongan Pa\u02BBanga",
    symbol_native: "T$",
    decimal_digits: 2,
    rounding: 0,
    code: "TOP",
    name_plural: "Tongan pa\u02BBanga"
  },
  TRY: {
    symbol: "TL",
    name: "Turkish Lira",
    symbol_native: "TL",
    decimal_digits: 2,
    rounding: 0,
    code: "TRY",
    name_plural: "Turkish Lira"
  },
  TTD: {
    symbol: "TT$",
    name: "Trinidad and Tobago Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "TTD",
    name_plural: "Trinidad and Tobago dollars"
  },
  TWD: {
    symbol: "NT$",
    name: "New Taiwan Dollar",
    symbol_native: "NT$",
    decimal_digits: 2,
    rounding: 0,
    code: "TWD",
    name_plural: "New Taiwan dollars"
  },
  TZS: {
    symbol: "TSh",
    name: "Tanzanian Shilling",
    symbol_native: "TSh",
    decimal_digits: 0,
    rounding: 0,
    code: "TZS",
    name_plural: "Tanzanian shillings"
  },
  UAH: {
    symbol: "\u20B4",
    name: "Ukrainian Hryvnia",
    symbol_native: "\u20B4",
    decimal_digits: 2,
    rounding: 0,
    code: "UAH",
    name_plural: "Ukrainian hryvnias"
  },
  UGX: {
    symbol: "USh",
    name: "Ugandan Shilling",
    symbol_native: "USh",
    decimal_digits: 0,
    rounding: 0,
    code: "UGX",
    name_plural: "Ugandan shillings"
  },
  UYU: {
    symbol: "$U",
    name: "Uruguayan Peso",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "UYU",
    name_plural: "Uruguayan pesos"
  },
  UZS: {
    symbol: "UZS",
    name: "Uzbekistan Som",
    symbol_native: "UZS",
    decimal_digits: 0,
    rounding: 0,
    code: "UZS",
    name_plural: "Uzbekistan som"
  },
  VEF: {
    symbol: "Bs.F.",
    name: "Venezuelan Bol\xEDvar",
    symbol_native: "Bs.F.",
    decimal_digits: 2,
    rounding: 0,
    code: "VEF",
    name_plural: "Venezuelan bol\xEDvars"
  },
  VND: {
    symbol: "\u20AB",
    name: "Vietnamese Dong",
    symbol_native: "\u20AB",
    decimal_digits: 0,
    rounding: 0,
    code: "VND",
    name_plural: "Vietnamese dong"
  },
  XAF: {
    symbol: "FCFA",
    name: "CFA Franc BEAC",
    symbol_native: "FCFA",
    decimal_digits: 0,
    rounding: 0,
    code: "XAF",
    name_plural: "CFA francs BEAC"
  },
  XOF: {
    symbol: "CFA",
    name: "CFA Franc BCEAO",
    symbol_native: "CFA",
    decimal_digits: 0,
    rounding: 0,
    code: "XOF",
    name_plural: "CFA francs BCEAO"
  },
  YER: {
    symbol: "YR",
    name: "Yemeni Rial",
    symbol_native: "\u0631.\u064A.\u200F",
    decimal_digits: 0,
    rounding: 0,
    code: "YER",
    name_plural: "Yemeni rials"
  },
  ZAR: {
    symbol: "R",
    name: "South African Rand",
    symbol_native: "R",
    decimal_digits: 2,
    rounding: 0,
    code: "ZAR",
    name_plural: "South African rand"
  },
  ZMK: {
    symbol: "ZK",
    name: "Zambian Kwacha",
    symbol_native: "ZK",
    decimal_digits: 0,
    rounding: 0,
    code: "ZMK",
    name_plural: "Zambian kwachas"
  },
  ZWL: {
    symbol: "ZWL$",
    name: "Zimbabwean Dollar",
    symbol_native: "ZWL$",
    decimal_digits: 0,
    rounding: 0,
    code: "ZWL",
    name_plural: "Zimbabwean Dollar"
  }
};

// src/modules/finance/constants/subscription.ts
var SUBSCRIPTION_PLAN = [
  "Basic",
  "Premium",
  "Free",
  "Gold",
  "Unlimited",
  "Starter",
  "Business",
  "Professional",
  "Advanced",
  "Silver",
  "Bronze",
  "Standard",
  "Pro",
  "Enterprise",
  "Platinum"
];

// src/modules/finance/constants/transaction-type.ts
var TRANSACTION_TYPE = ["deposit", "withdrawal", "payment", "invoice"];

// src/modules/finance/index.ts
var FinanceModule = class {
  constructor(utils2, datatypeModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "constants", {
      accountTypes: ACCOUNT_TYPES,
      ibans: IBAN,
      moneyInfo: MONEY_INFO,
      transactionTypes: TRANSACTION_TYPE,
      subscriptionPlans: SUBSCRIPTION_PLAN
    });
  }
  /**
   * Returns a transaction type
   *
   * @example
   * modules.finance.transaction() // 'payment'
   *
   * @returns string
   */
  transaction() {
    return this.utils.oneOfArray(this.constants.transactionTypes);
  }
  /**
   * Returns a suscription plan type
   *
   * @example
   * modules.finance.subscriptionPlan() // 'Free'
   *
   * @returns string
   */
  subscriptionPlan() {
    return this.utils.oneOfArray(this.constants.subscriptionPlans);
  }
  /**
   * Returns a PIN number.
   *
   * @param args.length The length of the PIN to generate. Defaults to `4`.
   *
   * @example
   * modules.finance.pin() // '5067'
   * modules.finance.pin({ length: 6 }) // '213789'
   *
   * @returns string
   */
  pin({ length } = {}) {
    const len = length && length > 0 ? length : 4;
    return Array.from({ length: len }).map(() => String(this.datatypeModule.int({ min: 0, max: 9 }))).join("");
  }
  /**
   * Returns a Bitcoin address.
   *
   * @example
   * modules.finance.bitcoinAddress() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
   *
   * @returns string
   */
  bitcoinAddress() {
    let address = this.utils.oneOfArray(["1", "3"]);
    address += this.datatypeModule.alphaNumeric({
      case: "mixed",
      banned: "0OIl",
      length: this.datatypeModule.int({ min: 25, max: 39 })
    });
    return address;
  }
  /**
   * Returns a credit card number.
   *
   * @example
   * modules.finance.creditCard() // '6375-3265-4676-6646'
   *
   * @returns string
   */
  creditCard() {
    let retString = String(this.datatypeModule.int({ min: 0, max: 9 }));
    for (let i = 1; i < 16; i++) {
      if (i % 4 === 0) retString = retString + "-";
      retString = retString + String(this.datatypeModule.int({ min: 0, max: 9 }));
    }
    return retString;
  }
  /**
   * Returns a Ethereum address.
   *
   * @example
   * modules.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
   *
   * @returns string
   */
  ethereumAddress() {
    return `0x${this.datatypeModule.hexadecimal({ length: 40, case: "lower" })}`;
  }
  /**
   * @example
   * modules.finance.accountType() // "Credit Card"
   *
   * @returns string
   */
  accountType() {
    return this.utils.oneOfArray(ACCOUNT_TYPES);
  }
  /**
   * Returns a SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
   *
   * @example
   * modules.finance.bic() // 'WYAUPGX1'
   *
   * @returns string
   */
  bic() {
    const bankIdentifier = this.datatypeModule.characters({
      length: 4,
      case: "upper"
    });
    const countryCode = this.utils.oneOfArray(IBAN.iso3166);
    const locationCode = this.datatypeModule.alphaNumeric({
      case: "upper",
      length: 2
    });
    const branchCode = this.datatypeModule.boolean() ? this.datatypeModule.boolean() ? this.datatypeModule.alphaNumeric({ case: "upper", length: 3 }) : "XXX" : "";
    return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
  }
  /**
   * @example
   * modules.finance.routingNumber() // '522814402'
   * @returns string
   */
  routingNumber() {
    const routingNumber = this.utils.replaceSymbols("########");
    let sum = 0;
    for (let i = 0; i < routingNumber.length; i += 3) {
      sum += Number(routingNumber[i]) * 3;
      sum += Number(routingNumber[i + 1]) * 7;
      sum += Number(routingNumber[i + 2]) || 0;
    }
    return `${routingNumber}${Math.ceil(sum / 10) * 10 - sum}`;
  }
  /**
   * Returns a credit card CVV.
   *
   * @example
   * modules.finance.creditCardCVV() // '506'
   *
   * @returns string
   */
  creditCardCVV() {
    let cvv = "";
    for (let i = 0; i < 3; i++) {
      cvv += this.datatypeModule.int({ max: 9, min: 0 }).toString();
    }
    return cvv;
  }
  /**
   * Returns a string with a money symbol
   * @example modules.finance.moneySymbol() // '$'
   * @returns string
   */
  moneySymbol() {
    return this.utils.oneOfArray(
      Object.values(MONEY_INFO).map((el) => el.symbol)
    );
  }
  /**
   * Generates a random amount between the given bounds (inclusive).
   *
   * @param args.min The lower bound for the amount.
   * @param args.max The upper bound for the amount.
   * @param args.precision The number of decimal places for the amount.
   * @param args.symbol The symbol used to prefix the amount. Defaults to `'$'`.
   *
   * @example
   * modules.finance.amount()// '$6170.87'
   * modules.finance.amount({ min: 0, max: 1000 }) // '$5.53'
   * modules.finance.amount({ min: 0, max: 1000, symbol: '€', precision: 0 }) // '€5'
   *
   * @returns string
   */
  amount({ max, min, precision, symbol: isymbol } = {}) {
    const symbol = isymbol ? isymbol : "$";
    return `${symbol}${this.datatypeModule.number({
      max,
      min,
      precision
    })}`;
  }
  /**
   * Returns a current money name
   * @example modules.finance.currencyMoneyName() // 'Us Dollar'
   * @returns string
   */
  currencyMoneyName() {
    return this.utils.oneOfArray(
      Object.values(MONEY_INFO).map((el) => el.name)
    );
  }
  /**
   * Returns a common money code
   * @example modules.finance.moneyCode() // 'EUR'
   * @returns string
   */
  moneyCode() {
    return this.utils.oneOfArray(
      Object.values(MONEY_INFO).map((el) => el.code)
    );
  }
  /**
   * Generates a random Litecoin address.
   *
   * @example
   * modules.finance.litecoinAddress() // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
   */
  litecoinAddress() {
    const addressLength = this.datatypeModule.int({ min: 26, max: 33 });
    let result = this.utils.oneOfArray(["L", "M", "3"]);
    for (let i = 0; i < addressLength - 1; i++) {
      result += this.utils.oneOfArray(
        "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ".split("")
      );
    }
    return result;
  }
};

// src/modules/phone/constants/prefix.ts
var PHONE_PREFIX = [
  { country: "Afghanistan", code: "93", iso: "AF" },
  { country: "Albania", code: "355", iso: "AL" },
  { country: "Algeria", code: "213", iso: "DZ" },
  { country: "American Samoa", code: "1-684", iso: "AS" },
  { country: "Andorra", code: "376", iso: "AD" },
  { country: "Angola", code: "244", iso: "AO" },
  { country: "Anguilla", code: "1-264", iso: "AI" },
  { country: "Antarctica", code: "672", iso: "AQ" },
  { country: "Antigua and Barbuda", code: "1-268", iso: "AG" },
  { country: "Argentina", code: "54", iso: "AR" },
  { country: "Armenia", code: "374", iso: "AM" },
  { country: "Aruba", code: "297", iso: "AW" },
  { country: "Australia", code: "61", iso: "AU" },
  { country: "Austria", code: "43", iso: "AT" },
  { country: "Azerbaijan", code: "994", iso: "AZ" },
  { country: "Bahamas", code: "1-242", iso: "BS" },
  { country: "Bahrain", code: "973", iso: "BH" },
  { country: "Bangladesh", code: "880", iso: "BD" },
  { country: "Barbados", code: "1-246", iso: "BB" },
  { country: "Belarus", code: "375", iso: "BY" },
  { country: "Belgium", code: "32", iso: "BE" },
  { country: "Belize", code: "501", iso: "BZ" },
  { country: "Benin", code: "229", iso: "BJ" },
  { country: "Bermuda", code: "1-441", iso: "BM" },
  { country: "Bhutan", code: "975", iso: "BT" },
  { country: "Bolivia", code: "591", iso: "BO" },
  { country: "Bosnia and Herzegovina", code: "387", iso: "BA" },
  { country: "Botswana", code: "267", iso: "BW" },
  { country: "Brazil", code: "55", iso: "BR" },
  { country: "British Indian Ocean Territory", code: "246", iso: "IO" },
  { country: "British Virgin Islands", code: "1-284", iso: "VG" },
  { country: "Brunei", code: "673", iso: "BN" },
  { country: "Bulgaria", code: "359", iso: "BG" },
  { country: "Burkina Faso", code: "226", iso: "BF" },
  { country: "Burundi", code: "257", iso: "BI" },
  { country: "Cambodia", code: "855", iso: "KH" },
  { country: "Cameroon", code: "237", iso: "CM" },
  { country: "Canada", code: "1", iso: "CA" },
  { country: "Cape Verde", code: "238", iso: "CV" },
  { country: "Cayman Islands", code: "1-345", iso: "KY" },
  { country: "Central African Republic", code: "236", iso: "CF" },
  { country: "Chad", code: "235", iso: "TD" },
  { country: "Chile", code: "56", iso: "CL" },
  { country: "China", code: "86", iso: "CN" },
  { country: "Christmas Island", code: "61", iso: "CX" },
  { country: "Cocos Islands", code: "61", iso: "CC" },
  { country: "Colombia", code: "57", iso: "CO" },
  { country: "Comoros", code: "269", iso: "KM" },
  { country: "Cook Islands", code: "682", iso: "CK" },
  { country: "Costa Rica", code: "506", iso: "CR" },
  { country: "Croatia", code: "385", iso: "HR" },
  { country: "Cuba", code: "53", iso: "CU" },
  { country: "Curacao", code: "599", iso: "CW" },
  { country: "Cyprus", code: "357", iso: "CY" },
  { country: "Czech Republic", code: "420", iso: "CZ" },
  { country: "Democratic Republic of the Congo", code: "243", iso: "CD" },
  { country: "Denmark", code: "45", iso: "DK" },
  { country: "Djibouti", code: "253", iso: "DJ" },
  { country: "Dominica", code: "1-767", iso: "DM" },
  {
    country: "Dominican Republic",
    code: "1-809, 1-829, 1-849",
    iso: "DO"
  },
  { country: "East Timor", code: "670", iso: "TL" },
  { country: "Ecuador", code: "593", iso: "EC" },
  { country: "Egypt", code: "20", iso: "EG" },
  { country: "El Salvador", code: "503", iso: "SV" },
  { country: "Equatorial Guinea", code: "240", iso: "GQ" },
  { country: "Eritrea", code: "291", iso: "ER" },
  { country: "Estonia", code: "372", iso: "EE" },
  { country: "Ethiopia", code: "251", iso: "ET" },
  { country: "Falkland Islands", code: "500", iso: "FK" },
  { country: "Faroe Islands", code: "298", iso: "FO" },
  { country: "Fiji", code: "679", iso: "FJ" },
  { country: "Finland", code: "358", iso: "FI" },
  { country: "France", code: "33", iso: "FR" },
  { country: "French Polynesia", code: "689", iso: "PF" },
  { country: "Gabon", code: "241", iso: "GA" },
  { country: "Gambia", code: "220", iso: "GM" },
  { country: "Georgia", code: "995", iso: "GE" },
  { country: "Germany", code: "49", iso: "DE" },
  { country: "Ghana", code: "233", iso: "GH" },
  { country: "Gibraltar", code: "350", iso: "GI" },
  { country: "Greece", code: "30", iso: "GR" },
  { country: "Greenland", code: "299", iso: "GL" },
  { country: "Grenada", code: "1-473", iso: "GD" },
  { country: "Guam", code: "1-671", iso: "GU" },
  { country: "Guatemala", code: "502", iso: "GT" },
  { country: "Guernsey", code: "44-1481", iso: "GG" },
  { country: "Guinea", code: "224", iso: "GN" },
  { country: "Guinea-Bissau", code: "245", iso: "GW" },
  { country: "Guyana", code: "592", iso: "GY" },
  { country: "Haiti", code: "509", iso: "HT" },
  { country: "Honduras", code: "504", iso: "HN" },
  { country: "Hong Kong", code: "852", iso: "HK" },
  { country: "Hungary", code: "36", iso: "HU" },
  { country: "Iceland", code: "354", iso: "IS" },
  { country: "India", code: "91", iso: "IN" },
  { country: "Indonesia", code: "62", iso: "ID" },
  { country: "Iran", code: "98", iso: "IR" },
  { country: "Iraq", code: "964", iso: "IQ" },
  { country: "Ireland", code: "353", iso: "IE" },
  { country: "Isle of Man", code: "44-1624", iso: "IM" },
  { country: "Israel", code: "972", iso: "IL" },
  { country: "Italy", code: "39", iso: "IT" },
  { country: "Ivory Coast", code: "225", iso: "CI" },
  { country: "Jamaica", code: "1-876", iso: "JM" },
  { country: "Japan", code: "81", iso: "JP" },
  { country: "Jersey", code: "44-1534", iso: "JE" },
  { country: "Jordan", code: "962", iso: "JO" },
  { country: "Kazakhstan", code: "7", iso: "KZ" },
  { country: "Kenya", code: "254", iso: "KE" },
  { country: "Kiribati", code: "686", iso: "KI" },
  { country: "Kosovo", code: "383", iso: "XK" },
  { country: "Kuwait", code: "965", iso: "KW" },
  { country: "Kyrgyzstan", code: "996", iso: "KG" },
  { country: "Laos", code: "856", iso: "LA" },
  { country: "Latvia", code: "371", iso: "LV" },
  { country: "Lebanon", code: "961", iso: "LB" },
  { country: "Lesotho", code: "266", iso: "LS" },
  { country: "Liberia", code: "231", iso: "LR" },
  { country: "Libya", code: "218", iso: "LY" },
  { country: "Liechtenstein", code: "423", iso: "LI" },
  { country: "Lithuania", code: "370", iso: "LT" },
  { country: "Luxembourg", code: "352", iso: "LU" },
  { country: "Macao", code: "853", iso: "MO" },
  { country: "Macedonia", code: "389", iso: "MK" },
  { country: "Madagascar", code: "261", iso: "MG" },
  { country: "Malawi", code: "265", iso: "MW" },
  { country: "Malaysia", code: "60", iso: "MY" },
  { country: "Maldives", code: "960", iso: "MV" },
  { country: "Mali", code: "223", iso: "ML" },
  { country: "Malta", code: "356", iso: "MT" },
  { country: "Marshall Islands", code: "692", iso: "MH" },
  { country: "Mauritania", code: "222", iso: "MR" },
  { country: "Mauritius", code: "230", iso: "MU" },
  { country: "Mayotte", code: "262", iso: "YT" },
  { country: "Mexico", code: "52", iso: "MX" },
  { country: "Micronesia", code: "691", iso: "FM" },
  { country: "Moldova", code: "373", iso: "MD" },
  { country: "Monaco", code: "377", iso: "MC" },
  { country: "Mongolia", code: "976", iso: "MN" },
  { country: "Montenegro", code: "382", iso: "ME" },
  { country: "Montserrat", code: "1-664", iso: "MS" },
  { country: "Morocco", code: "212", iso: "MA" },
  { country: "Mozambique", code: "258", iso: "MZ" },
  { country: "Myanmar", code: "95", iso: "MM" },
  { country: "Namibia", code: "264", iso: "NA" },
  { country: "Nauru", code: "674", iso: "NR" },
  { country: "Nepal", code: "977", iso: "NP" },
  { country: "Netherlands", code: "31", iso: "NL" },
  { country: "Netherlands Antilles", code: "599", iso: "AN" },
  { country: "New Caledonia", code: "687", iso: "NC" },
  { country: "New Zealand", code: "64", iso: "NZ" },
  { country: "Nicaragua", code: "505", iso: "NI" },
  { country: "Niger", code: "227", iso: "NE" },
  { country: "Nigeria", code: "234", iso: "NG" },
  { country: "Niue", code: "683", iso: "NU" },
  { country: "North Korea", code: "850", iso: "KP" },
  { country: "Northern Mariana Islands", code: "1-670", iso: "MP" },
  { country: "Norway", code: "47", iso: "NO" },
  { country: "Oman", code: "968", iso: "OM" },
  { country: "Pakistan", code: "92", iso: "PK" },
  { country: "Palau", code: "680", iso: "PW" },
  { country: "Palestine", code: "970", iso: "PS" },
  { country: "Panama", code: "507", iso: "PA" },
  { country: "Papua New Guinea", code: "675", iso: "PG" },
  { country: "Paraguay", code: "595", iso: "PY" },
  { country: "Peru", code: "51", iso: "PE" },
  { country: "Philippines", code: "63", iso: "PH" },
  { country: "Pitcairn", code: "64", iso: "PN" },
  { country: "Poland", code: "48", iso: "PL" },
  { country: "Portugal", code: "351", iso: "PT" },
  { country: "Puerto Rico", code: "1-787, 1-939", iso: "PR" },
  { country: "Qatar", code: "974", iso: "QA" },
  { country: "Republic of the Congo", code: "242", iso: "CG" },
  { country: "Reunion", code: "262", iso: "RE" },
  { country: "Romania", code: "40", iso: "RO" },
  { country: "Russia", code: "7", iso: "RU" },
  { country: "Rwanda", code: "250", iso: "RW" },
  { country: "Saint Barthelemy", code: "590", iso: "BL" },
  { country: "Saint Helena", code: "290", iso: "SH" },
  { country: "Saint Kitts and Nevis", code: "1-869", iso: "KN" },
  { country: "Saint Lucia", code: "1-758", iso: "LC" },
  { country: "Saint Martin", code: "590", iso: "MF" },
  { country: "Saint Pierre and Miquelon", code: "508", iso: "PM" },
  {
    country: "Saint Vincent and the Grenadines",
    code: "1-784",
    iso: "VC"
  },
  { country: "Samoa", code: "685", iso: "WS" },
  { country: "San Marino", code: "378", iso: "SM" },
  { country: "Sao Tome and Principe", code: "239", iso: "ST" },
  { country: "Saudi Arabia", code: "966", iso: "SA" },
  { country: "Senegal", code: "221", iso: "SN" },
  { country: "Serbia", code: "381", iso: "RS" },
  { country: "Seychelles", code: "248", iso: "SC" },
  { country: "Sierra Leone", code: "232", iso: "SL" },
  { country: "Singapore", code: "65", iso: "SG" },
  { country: "Sint Maarten", code: "1-721", iso: "SX" },
  { country: "Slovakia", code: "421", iso: "SK" },
  { country: "Slovenia", code: "386", iso: "SI" },
  { country: "Solomon Islands", code: "677", iso: "SB" },
  { country: "Somalia", code: "252", iso: "SO" },
  { country: "South Africa", code: "27", iso: "ZA" },
  { country: "South Korea", code: "82", iso: "KR" },
  { country: "South Sudan", code: "211", iso: "SS" },
  { country: "Spain", code: "34", iso: "ES" },
  { country: "Sri Lanka", code: "94", iso: "LK" },
  { country: "Sudan", code: "249", iso: "SD" },
  { country: "Suriname", code: "597", iso: "SR" },
  { country: "Svalbard and Jan Mayen", code: "47", iso: "SJ" },
  { country: "Swaziland", code: "268", iso: "SZ" },
  { country: "Sweden", code: "46", iso: "SE" },
  { country: "Switzerland", code: "41", iso: "CH" },
  { country: "Syria", code: "963", iso: "SY" },
  { country: "Taiwan", code: "886", iso: "TW" },
  { country: "Tajikistan", code: "992", iso: "TJ" },
  { country: "Tanzania", code: "255", iso: "TZ" },
  { country: "Thailand", code: "66", iso: "TH" },
  { country: "Togo", code: "228", iso: "TG" },
  { country: "Tokelau", code: "690", iso: "TK" },
  { country: "Tonga", code: "676", iso: "TO" },
  { country: "Trinidad and Tobago", code: "1-868", iso: "TT" },
  { country: "Tunisia", code: "216", iso: "TN" },
  { country: "Turkey", code: "90", iso: "TR" },
  { country: "Turkmenistan", code: "993", iso: "TM" },
  { country: "Turks and Caicos Islands", code: "1-649", iso: "TC" },
  { country: "Tuvalu", code: "688", iso: "TV" },
  { country: "U.S. Virgin Islands", code: "1-340", iso: "VI" },
  { country: "Uganda", code: "256", iso: "UG" },
  { country: "Ukraine", code: "380", iso: "UA" },
  { country: "United Arab Emirates", code: "971", iso: "AE" },
  { country: "United Kingdom", code: "44", iso: "GB" },
  { country: "United States", code: "1", iso: "US" },
  { country: "Uruguay", code: "598", iso: "UY" },
  { country: "Uzbekistan", code: "998", iso: "UZ" },
  { country: "Vanuatu", code: "678", iso: "VU" },
  { country: "Vatican", code: "379", iso: "VA" },
  { country: "Venezuela", code: "58", iso: "VE" },
  { country: "Vietnam", code: "84", iso: "VN" },
  { country: "Wallis and Futuna", code: "681", iso: "WF" },
  { country: "Western Sahara", code: "212", iso: "EH" },
  { country: "Yemen", code: "967", iso: "YE" },
  { country: "Zambia", code: "260", iso: "ZM" },
  { country: "Zimbabwe", code: "263", iso: "ZW" }
];

// src/modules/phone/index.ts
var PhoneModule = class {
  constructor(utils2, datatypeModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "constants", {
      phonePrefixs: PHONE_PREFIX.map((p) => p.code)
    });
  }
  /**
   * Returns a phone number
   *
   * @param args.format Format of the phone number
   *
   * @example
   * modules.phone.number({ format: '+53 #### ## ##' }) // '+53 5417 98 99'
   * modules.phone.number() // '+1 234 498 37'
   *
   * @returns string
   */
  number({ format: iformat } = {}) {
    const format = iformat ? iformat : `${this.prefix()} ### ### ##`;
    const number = this.utils.replaceSymbols(format);
    return number;
  }
  /**
   * Returns a string with a country number prefix
   * @example modules.phone.prefix() // '+53'
   * @returns string
   */
  prefix() {
    return this.utils.oneOfArray(this.constants.phonePrefixs);
  }
  /**
   * Return a call duartion with minutes and seconds
   * @param args.min Minimun minutes of the call. Default `0`
   * @param args.max Maximun minutes of the call. Default `59`
   *
   * @example
   * modules.phone.callDuration({ min: 10, max: 30 }) // '27:30'
   * modules.phone.callDuration() // '20:52'
   *
   * @returns string
   */
  callDuration({ max: imax, min: imin } = {}) {
    const min = typeof imin === "number" && imin >= 0 && imin < 60 ? imin : 0;
    const max = typeof imax === "number" && imax < 60 && imax >= 0 && imax >= min ? imax : 59;
    const minutes = this.datatypeModule.int({
      min,
      max
    });
    const seconds = this.datatypeModule.int({ min: 0, max: 59 });
    const stringMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const stringSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${stringMinutes}:${stringSeconds}`;
  }
};

// src/modules/address/constants/countries.ts
var COUNTRY_LIST = [
  {
    country: "Afghanistan",
    continent: "Asia"
  },
  {
    country: "Albania",
    continent: "Europe"
  },
  {
    country: "Algeria",
    continent: "Africa"
  },
  {
    country: "American Samoa",
    continent: "Oceania"
  },
  {
    country: "Andorra",
    continent: "Europe"
  },
  {
    country: "Angola",
    continent: "Africa"
  },
  {
    country: "Anguilla",
    continent: "North America"
  },
  {
    country: "Antarctica",
    continent: "Antarctica"
  },
  {
    country: "Antigua and Barbuda",
    continent: "North America"
  },
  {
    country: "Argentina",
    continent: "South America"
  },
  {
    country: "Armenia",
    continent: "Asia"
  },
  {
    country: "Aruba",
    continent: "North America"
  },
  {
    country: "Australia",
    continent: "Oceania"
  },
  {
    country: "Austria",
    continent: "Europe"
  },
  {
    country: "Azerbaijan",
    continent: "Asia"
  },
  {
    country: "Bahamas",
    continent: "North America"
  },
  {
    country: "Bahrain",
    continent: "Asia"
  },
  {
    country: "Bangladesh",
    continent: "Asia"
  },
  {
    country: "Barbados",
    continent: "North America"
  },
  {
    country: "Belarus",
    continent: "Europe"
  },
  {
    country: "Belgium",
    continent: "Europe"
  },
  {
    country: "Belize",
    continent: "North America"
  },
  {
    country: "Benin",
    continent: "Africa"
  },
  {
    country: "Bermuda",
    continent: "North America"
  },
  {
    country: "Bhutan",
    continent: "Asia"
  },
  {
    country: "Bolivia",
    continent: "South America"
  },
  {
    country: "Bosnia and Herzegovina",
    continent: "Europe"
  },
  {
    country: "Botswana",
    continent: "Africa"
  },
  {
    country: "Bouvet Island",
    continent: "Antarctica"
  },
  {
    country: "Brazil",
    continent: "South America"
  },
  {
    country: "British Indian Ocean Territory",
    continent: "Africa"
  },
  {
    country: "Brunei",
    continent: "Asia"
  },
  {
    country: "Bulgaria",
    continent: "Europe"
  },
  {
    country: "Burkina Faso",
    continent: "Africa"
  },
  {
    country: "Burundi",
    continent: "Africa"
  },
  {
    country: "Cambodia",
    continent: "Asia"
  },
  {
    country: "Cameroon",
    continent: "Africa"
  },
  {
    country: "Canada",
    continent: "North America"
  },
  {
    country: "Cape Verde",
    continent: "Africa"
  },
  {
    country: "Cayman Islands",
    continent: "North America"
  },
  {
    country: "Central African Republic",
    continent: "Africa"
  },
  {
    country: "Chad",
    continent: "Africa"
  },
  {
    country: "Chile",
    continent: "South America"
  },
  {
    country: "China",
    continent: "Asia"
  },
  {
    country: "Christmas Island",
    continent: "Oceania"
  },
  {
    country: "Cocos (Keeling) Islands",
    continent: "Oceania"
  },
  {
    country: "Colombia",
    continent: "South America"
  },
  {
    country: "Comoros",
    continent: "Africa"
  },
  {
    country: "Congo",
    continent: "Africa"
  },
  {
    country: "Cook Islands",
    continent: "Oceania"
  },
  {
    country: "Costa Rica",
    continent: "North America"
  },
  {
    country: "Croatia",
    continent: "Europe"
  },
  {
    country: "Cuba",
    continent: "North America"
  },
  {
    country: "Cyprus",
    continent: "Asia"
  },
  {
    country: "Czech Republic",
    continent: "Europe"
  },
  {
    country: "Denmark",
    continent: "Europe"
  },
  {
    country: "Djibouti",
    continent: "Africa"
  },
  {
    country: "Dominica",
    continent: "North America"
  },
  {
    country: "Dominican Republic",
    continent: "North America"
  },
  {
    country: "East Timor",
    continent: "Asia"
  },
  {
    country: "Ecuador",
    continent: "South America"
  },
  {
    country: "Egypt",
    continent: "Africa"
  },
  {
    country: "El Salvador",
    continent: "North America"
  },
  {
    country: "England",
    continent: "Europe"
  },
  {
    country: "Equatorial Guinea",
    continent: "Africa"
  },
  {
    country: "Eritrea",
    continent: "Africa"
  },
  {
    country: "Estonia",
    continent: "Europe"
  },
  {
    country: "Ethiopia",
    continent: "Africa"
  },
  {
    country: "Falkland Islands",
    continent: "South America"
  },
  {
    country: "Faroe Islands",
    continent: "Europe"
  },
  {
    country: "Fiji Islands",
    continent: "Oceania"
  },
  {
    country: "Finland",
    continent: "Europe"
  },
  {
    country: "France",
    continent: "Europe"
  },
  {
    country: "French Guiana",
    continent: "South America"
  },
  {
    country: "French Polynesia",
    continent: "Oceania"
  },
  {
    country: "French Southern territories",
    continent: "Antarctica"
  },
  {
    country: "Gabon",
    continent: "Africa"
  },
  {
    country: "Gambia",
    continent: "Africa"
  },
  {
    country: "Georgia",
    continent: "Asia"
  },
  {
    country: "Germany",
    continent: "Europe"
  },
  {
    country: "Ghana",
    continent: "Africa"
  },
  {
    country: "Gibraltar",
    continent: "Europe"
  },
  {
    country: "Greece",
    continent: "Europe"
  },
  {
    country: "Greenland",
    continent: "North America"
  },
  {
    country: "Grenada",
    continent: "North America"
  },
  {
    country: "Guadeloupe",
    continent: "North America"
  },
  {
    country: "Guam",
    continent: "Oceania"
  },
  {
    country: "Guatemala",
    continent: "North America"
  },
  {
    country: "Guinea",
    continent: "Africa"
  },
  {
    country: "Guinea-Bissau",
    continent: "Africa"
  },
  {
    country: "Guyana",
    continent: "South America"
  },
  {
    country: "Haiti",
    continent: "North America"
  },
  {
    country: "Heard Island and McDonald Islands",
    continent: "Antarctica"
  },
  {
    country: "Holy See (Vatican City State)",
    continent: "Europe"
  },
  {
    country: "Honduras",
    continent: "North America"
  },
  {
    country: "Hong Kong",
    continent: "Asia"
  },
  {
    country: "Hungary",
    continent: "Europe"
  },
  {
    country: "Iceland",
    continent: "Europe"
  },
  {
    country: "India",
    continent: "Asia"
  },
  {
    country: "Indonesia",
    continent: "Asia"
  },
  {
    country: "Iran",
    continent: "Asia"
  },
  {
    country: "Iraq",
    continent: "Asia"
  },
  {
    country: "Ireland",
    continent: "Europe"
  },
  {
    country: "Israel",
    continent: "Asia"
  },
  {
    country: "Italy",
    continent: "Europe"
  },
  {
    country: "Ivory Coast",
    continent: "Africa"
  },
  {
    country: "Jamaica",
    continent: "North America"
  },
  {
    country: "Japan",
    continent: "Asia"
  },
  {
    country: "Jordan",
    continent: "Asia"
  },
  {
    country: "Kazakhstan",
    continent: "Asia"
  },
  {
    country: "Kenya",
    continent: "Africa"
  },
  {
    country: "Kiribati",
    continent: "Oceania"
  },
  {
    country: "Kuwait",
    continent: "Asia"
  },
  {
    country: "Kyrgyzstan",
    continent: "Asia"
  },
  {
    country: "Laos",
    continent: "Asia"
  },
  {
    country: "Latvia",
    continent: "Europe"
  },
  {
    country: "Lebanon",
    continent: "Asia"
  },
  {
    country: "Lesotho",
    continent: "Africa"
  },
  {
    country: "Liberia",
    continent: "Africa"
  },
  {
    country: "Libyan Arab Jamahiriya",
    continent: "Africa"
  },
  {
    country: "Liechtenstein",
    continent: "Europe"
  },
  {
    country: "Lithuania",
    continent: "Europe"
  },
  {
    country: "Luxembourg",
    continent: "Europe"
  },
  {
    country: "Macao",
    continent: "Asia"
  },
  {
    country: "North Macedonia",
    continent: "Europe"
  },
  {
    country: "Madagascar",
    continent: "Africa"
  },
  {
    country: "Malawi",
    continent: "Africa"
  },
  {
    country: "Malaysia",
    continent: "Asia"
  },
  {
    country: "Maldives",
    continent: "Asia"
  },
  {
    country: "Mali",
    continent: "Africa"
  },
  {
    country: "Malta",
    continent: "Europe"
  },
  {
    country: "Marshall Islands",
    continent: "Oceania"
  },
  {
    country: "Martinique",
    continent: "North America"
  },
  {
    country: "Mauritania",
    continent: "Africa"
  },
  {
    country: "Mauritius",
    continent: "Africa"
  },
  {
    country: "Mayotte",
    continent: "Africa"
  },
  {
    country: "Mexico",
    continent: "North America"
  },
  {
    country: "Micronesia, Federated States of",
    continent: "Oceania"
  },
  {
    country: "Moldova",
    continent: "Europe"
  },
  {
    country: "Monaco",
    continent: "Europe"
  },
  {
    country: "Mongolia",
    continent: "Asia"
  },
  {
    country: "Montenegro",
    continent: "Europe"
  },
  {
    country: "Montserrat",
    continent: "North America"
  },
  {
    country: "Morocco",
    continent: "Africa"
  },
  {
    country: "Mozambique",
    continent: "Africa"
  },
  {
    country: "Myanmar",
    continent: "Asia"
  },
  {
    country: "Namibia",
    continent: "Africa"
  },
  {
    country: "Nauru",
    continent: "Oceania"
  },
  {
    country: "Nepal",
    continent: "Asia"
  },
  {
    country: "Netherlands",
    continent: "Europe"
  },
  {
    country: "Netherlands Antilles",
    continent: "North America"
  },
  {
    country: "New Caledonia",
    continent: "Oceania"
  },
  {
    country: "New Zealand",
    continent: "Oceania"
  },
  {
    country: "Nicaragua",
    continent: "North America"
  },
  {
    country: "Niger",
    continent: "Africa"
  },
  {
    country: "Nigeria",
    continent: "Africa"
  },
  {
    country: "Niue",
    continent: "Oceania"
  },
  {
    country: "Norfolk Island",
    continent: "Oceania"
  },
  {
    country: "North Korea",
    continent: "Asia"
  },
  {
    country: "Northern Ireland",
    continent: "Europe"
  },
  {
    country: "Northern Mariana Islands",
    continent: "Oceania"
  },
  {
    country: "Norway",
    continent: "Europe"
  },
  {
    country: "Oman",
    continent: "Asia"
  },
  {
    country: "Pakistan",
    continent: "Asia"
  },
  {
    country: "Palau",
    continent: "Oceania"
  },
  {
    country: "Palestine",
    continent: "Asia"
  },
  {
    country: "Panama",
    continent: "North America"
  },
  {
    country: "Papua New Guinea",
    continent: "Oceania"
  },
  {
    country: "Paraguay",
    continent: "South America"
  },
  {
    country: "Peru",
    continent: "South America"
  },
  {
    country: "Philippines",
    continent: "Asia"
  },
  {
    country: "Pitcairn",
    continent: "Oceania"
  },
  {
    country: "Poland",
    continent: "Europe"
  },
  {
    country: "Portugal",
    continent: "Europe"
  },
  {
    country: "Puerto Rico",
    continent: "North America"
  },
  {
    country: "Qatar",
    continent: "Asia"
  },
  {
    country: "Reunion",
    continent: "Africa"
  },
  {
    country: "Romania",
    continent: "Europe"
  },
  {
    country: "Russian Federation",
    continent: "Europe"
  },
  {
    country: "Rwanda",
    continent: "Africa"
  },
  {
    country: "Saint Helena",
    continent: "Africa"
  },
  {
    country: "Saint Kitts and Nevis",
    continent: "North America"
  },
  {
    country: "Saint Lucia",
    continent: "North America"
  },
  {
    country: "Saint Pierre and Miquelon",
    continent: "North America"
  },
  {
    country: "Saint Vincent and the Grenadines",
    continent: "North America"
  },
  {
    country: "Samoa",
    continent: "Oceania"
  },
  {
    country: "San Marino",
    continent: "Europe"
  },
  {
    country: "Sao Tome and Principe",
    continent: "Africa"
  },
  {
    country: "Saudi Arabia",
    continent: "Asia"
  },
  {
    country: "Scotland",
    continent: "Europe"
  },
  {
    country: "Senegal",
    continent: "Africa"
  },
  {
    country: "Serbia",
    continent: "Europe"
  },
  {
    country: "Seychelles",
    continent: "Africa"
  },
  {
    country: "Sierra Leone",
    continent: "Africa"
  },
  {
    country: "Singapore",
    continent: "Asia"
  },
  {
    country: "Slovakia",
    continent: "Europe"
  },
  {
    country: "Slovenia",
    continent: "Europe"
  },
  {
    country: "Solomon Islands",
    continent: "Oceania"
  },
  {
    country: "Somalia",
    continent: "Africa"
  },
  {
    country: "South Africa",
    continent: "Africa"
  },
  {
    country: "South Georgia and the South Sandwich Islands",
    continent: "Antarctica"
  },
  {
    country: "South Korea",
    continent: "Asia"
  },
  {
    country: "South Sudan",
    continent: "Africa"
  },
  {
    country: "Spain",
    continent: "Europe"
  },
  {
    country: "Sri Lanka",
    continent: "Asia"
  },
  {
    country: "Sudan",
    continent: "Africa"
  },
  {
    country: "Suriname",
    continent: "South America"
  },
  {
    country: "Svalbard and Jan Mayen",
    continent: "Europe"
  },
  {
    country: "Swaziland",
    continent: "Africa"
  },
  {
    country: "Sweden",
    continent: "Europe"
  },
  {
    country: "Switzerland",
    continent: "Europe"
  },
  {
    country: "Syria",
    continent: "Asia"
  },
  {
    country: "Tajikistan",
    continent: "Asia"
  },
  {
    country: "Tanzania",
    continent: "Africa"
  },
  {
    country: "Thailand",
    continent: "Asia"
  },
  {
    country: "The Democratic Republic of Congo",
    continent: "Africa"
  },
  {
    country: "Togo",
    continent: "Africa"
  },
  {
    country: "Tokelau",
    continent: "Oceania"
  },
  {
    country: "Tonga",
    continent: "Oceania"
  },
  {
    country: "Trinidad and Tobago",
    continent: "North America"
  },
  {
    country: "Tunisia",
    continent: "Africa"
  },
  {
    country: "Turkey",
    continent: "Asia"
  },
  {
    country: "Turkmenistan",
    continent: "Asia"
  },
  {
    country: "Turks and Caicos Islands",
    continent: "North America"
  },
  {
    country: "Tuvalu",
    continent: "Oceania"
  },
  {
    country: "Uganda",
    continent: "Africa"
  },
  {
    country: "Ukraine",
    continent: "Europe"
  },
  {
    country: "United Arab Emirates",
    continent: "Asia"
  },
  {
    country: "United Kingdom",
    continent: "Europe"
  },
  {
    country: "United States",
    continent: "North America"
  },
  {
    country: "United States Minor Outlying Islands",
    continent: "Oceania"
  },
  {
    country: "Uruguay",
    continent: "South America"
  },
  {
    country: "Uzbekistan",
    continent: "Asia"
  },
  {
    country: "Vanuatu",
    continent: "Oceania"
  },
  {
    country: "Venezuela",
    continent: "South America"
  },
  {
    country: "Vietnam",
    continent: "Asia"
  },
  {
    country: "Virgin Islands, British",
    continent: "North America"
  },
  {
    country: "Virgin Islands, U.S.",
    continent: "North America"
  },
  {
    country: "Wales",
    continent: "Europe"
  },
  {
    country: "Wallis and Futuna",
    continent: "Oceania"
  },
  {
    country: "Western Sahara",
    continent: "Africa"
  },
  {
    country: "Yemen",
    continent: "Asia"
  },
  {
    country: "Zambia",
    continent: "Africa"
  },
  {
    country: "Zimbabwe",
    continent: "Africa"
  }
];
var COUNTRY_CODE = [
  "BGD",
  "BEL",
  "BFA",
  "BGR",
  "BIH",
  "BRB",
  "WLF",
  "BLM",
  "BMU",
  "BRN",
  "BOL",
  "BHR",
  "BDI",
  "BEN",
  "BTN",
  "JAM",
  "BVT",
  "BWA",
  "WSM",
  "BES",
  "BRA",
  "BHS",
  "JEY",
  "BLR",
  "BLZ",
  "RUS",
  "RWA",
  "SRB",
  "TLS",
  "REU",
  "TKM",
  "TJK",
  "ROU",
  "TKL",
  "GNB",
  "GUM",
  "GTM",
  "SGS",
  "GRC",
  "GNQ",
  "GLP",
  "JPN",
  "GUY",
  "GGY",
  "GUF",
  "GEO",
  "GRD",
  "GBR",
  "GAB",
  "SLV",
  "GIN",
  "GMB",
  "GRL",
  "GIB",
  "GHA",
  "OMN",
  "TUN",
  "JOR",
  "HRV",
  "HTI",
  "HUN",
  "HKG",
  "HND",
  "HMD",
  "VEN",
  "PRI",
  "PSE",
  "PLW",
  "PRT",
  "SJM",
  "PRY",
  "IRQ",
  "PAN",
  "PYF",
  "PNG",
  "PER",
  "PAK",
  "PHL",
  "PCN",
  "POL",
  "SPM",
  "ZMB",
  "ESH",
  "EST",
  "EGY",
  "ZAF",
  "ECU",
  "ITA",
  "VNM",
  "SLB",
  "ETH",
  "SOM",
  "ZWE",
  "SAU",
  "ESP",
  "ERI",
  "MNE",
  "MDA",
  "MDG",
  "MAF",
  "MAR",
  "MCO",
  "UZB",
  "MMR",
  "MLI",
  "MAC",
  "MNG",
  "MHL",
  "MKD",
  "MUS",
  "MLT",
  "MWI",
  "MDV",
  "MTQ",
  "MNP",
  "MSR",
  "MRT",
  "IMN",
  "UGA",
  "TZA",
  "MYS",
  "MEX",
  "ISR",
  "FRA",
  "IOT",
  "SHN",
  "FIN",
  "FJI",
  "FLK",
  "FSM",
  "FRO",
  "NIC",
  "NLD",
  "NOR",
  "NAM",
  "VUT",
  "NCL",
  "NER",
  "NFK",
  "NGA",
  "NZL",
  "NPL",
  "NRU",
  "NIU",
  "COK",
  "XKX",
  "CIV",
  "CHE",
  "COL",
  "CHN",
  "CMR",
  "CHL",
  "CCK",
  "CAN",
  "COG",
  "CAF",
  "COD",
  "CZE",
  "CYP",
  "CXR",
  "CRI",
  "CUW",
  "CPV",
  "CUB",
  "SWZ",
  "SYR",
  "SXM",
  "KGZ",
  "KEN",
  "SSD",
  "SUR",
  "KIR",
  "KHM",
  "KNA",
  "COM",
  "STP",
  "SVK",
  "KOR",
  "SVN",
  "PRK",
  "KWT",
  "SEN",
  "SMR",
  "SLE",
  "SYC",
  "KAZ",
  "CYM",
  "SGP",
  "SWE",
  "SDN",
  "DOM",
  "DMA",
  "DJI",
  "DNK",
  "VGB",
  "DEU",
  "YEM",
  "DZA",
  "USA",
  "URY",
  "MYT",
  "UMI",
  "LBN",
  "LCA",
  "LAO",
  "TUV",
  "TWN",
  "TTO",
  "TUR",
  "LKA",
  "LIE",
  "LVA",
  "TON",
  "LTU",
  "LUX",
  "LBR",
  "LSO",
  "THA",
  "ATF",
  "TGO",
  "TCD",
  "TCA",
  "LBY",
  "VAT",
  "VCT",
  "ARE",
  "AND",
  "ATG",
  "AFG",
  "AIA",
  "VIR",
  "ISL",
  "IRN",
  "ARM",
  "ALB",
  "AGO",
  "ATA",
  "ASM",
  "ARG",
  "AUS",
  "AUT",
  "ABW",
  "IND",
  "ALA",
  "AZE",
  "IRL",
  "IDN",
  "UKR",
  "QAT",
  "MOZ"
];

// src/modules/address/constants/time-zone.ts
var TIME_ZONE = [
  "Pacific/Midway",
  "Pacific/Pago_Pago",
  "Pacific/Honolulu",
  "America/Juneau",
  "America/Los_Angeles",
  "America/Tijuana",
  "America/Denver",
  "America/Phoenix",
  "America/Chihuahua",
  "America/Mazatlan",
  "America/Chicago",
  "America/Regina",
  "America/Mexico_City",
  "America/Mexico_City",
  "America/Monterrey",
  "America/Guatemala",
  "America/New_York",
  "America/Indiana/Indianapolis",
  "America/Bogota",
  "America/Lima",
  "America/Lima",
  "America/Halifax",
  "America/Caracas",
  "America/La_Paz",
  "America/Santiago",
  "America/St_Johns",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "America/Guyana",
  "America/Godthab",
  "Atlantic/South_Georgia",
  "Atlantic/Azores",
  "Atlantic/Cape_Verde",
  "Europe/Dublin",
  "Europe/London",
  "Europe/Lisbon",
  "Europe/London",
  "Africa/Casablanca",
  "Africa/Monrovia",
  "Etc/UTC",
  "Europe/Belgrade",
  "Europe/Bratislava",
  "Europe/Budapest",
  "Europe/Ljubljana",
  "Europe/Prague",
  "Europe/Sarajevo",
  "Europe/Skopje",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Brussels",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Amsterdam",
  "Europe/Berlin",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Africa/Algiers",
  "Europe/Bucharest",
  "Africa/Cairo",
  "Europe/Helsinki",
  "Europe/Kiev",
  "Europe/Riga",
  "Europe/Sofia",
  "Europe/Tallinn",
  "Europe/Vilnius",
  "Europe/Athens",
  "Europe/Istanbul",
  "Europe/Minsk",
  "Asia/Jerusalem",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Europe/Moscow",
  "Europe/Moscow",
  "Europe/Moscow",
  "Asia/Kuwait",
  "Asia/Riyadh",
  "Africa/Nairobi",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Asia/Muscat",
  "Asia/Muscat",
  "Asia/Baku",
  "Asia/Tbilisi",
  "Asia/Yerevan",
  "Asia/Kabul",
  "Asia/Yekaterinburg",
  "Asia/Karachi",
  "Asia/Karachi",
  "Asia/Tashkent",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kolkata",
  "Asia/Kathmandu",
  "Asia/Dhaka",
  "Asia/Dhaka",
  "Asia/Colombo",
  "Asia/Almaty",
  "Asia/Novosibirsk",
  "Asia/Rangoon",
  "Asia/Bangkok",
  "Asia/Bangkok",
  "Asia/Jakarta",
  "Asia/Krasnoyarsk",
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Hong_Kong",
  "Asia/Urumqi",
  "Asia/Kuala_Lumpur",
  "Asia/Singapore",
  "Asia/Taipei",
  "Australia/Perth",
  "Asia/Irkutsk",
  "Asia/Ulaanbaatar",
  "Asia/Seoul",
  "Asia/Tokyo",
  "Asia/Tokyo",
  "Asia/Tokyo",
  "Asia/Yakutsk",
  "Australia/Darwin",
  "Australia/Adelaide",
  "Australia/Melbourne",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Hobart",
  "Asia/Vladivostok",
  "Pacific/Guam",
  "Pacific/Port_Moresby",
  "Asia/Magadan",
  "Asia/Magadan",
  "Pacific/Noumea",
  "Pacific/Fiji",
  "Asia/Kamchatka",
  "Pacific/Majuro",
  "Pacific/Auckland",
  "Pacific/Auckland",
  "Pacific/Tongatapu",
  "Pacific/Fakaofo",
  "Pacific/Apia"
];

// src/modules/address/constants/cardinal-directions.ts
var CARDINAL_DIRECTIONS = [
  "North",
  "East",
  "South",
  "West",
  "Northeast",
  "Northwest",
  "Southeast",
  "Southwest"
];

// src/modules/address/constants/ordinal.ts
var ORDINAL = ["Northeast", "Northwest", "Southeast", "Southwest"];

// src/modules/address/index.ts
var AddressModule = class {
  constructor(utils2, datatypeModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "constants", {
      timeZones: TIME_ZONE,
      countries: COUNTRY_LIST,
      countriesCode: COUNTRY_CODE,
      cardinalDirections: CARDINAL_DIRECTIONS,
      ordinalDirection: ORDINAL
    });
  }
  /**
   * Returns a zip code
   * @param args.format format of the zip code. Default '#####'
   * @example
   * modules.address.zipCode() // '62581'
   * modules.address.zipCode({ format: '###' }) // '453'
   * @returns string
   */
  zipCode({ format: iformat } = {}) {
    const format = typeof iformat === "string" ? iformat : "#####";
    return this.utils.replaceSymbols(format);
  }
  /**
   * Returns a time zone
   * @example modules.address.timeZone() // "Asia/Magadan"
   * @returns string
   */
  timeZone() {
    return this.utils.oneOfArray(TIME_ZONE);
  }
  /**
   * Returns a cardinal direction
   * @example modules.address.cardinalDirection()// 'North'
   * @returns string
   */
  cardinalDirection() {
    return this.utils.oneOfArray(this.constants.cardinalDirections);
  }
  /**
   * Returns a country
   * @param args.continent Continent of the country that you want
   * @example modules.address.country() // 'Spain'
   * @returns string
   */
  country({ continent } = {}) {
    if (continent && typeof continent === "string") {
      const filterList = COUNTRY_LIST.filter(
        (el) => el.continent === continent
      );
      if (filterList.length > 0) {
        return this.utils.oneOfArray(filterList.map((el) => el.country));
      }
    }
    return this.utils.oneOfArray(COUNTRY_LIST.map((el) => el.country));
  }
  /**
   * Returns a country name code
   * @example modules.address.countryCode() // 'CU'
   * @returns string
   */
  countryCode() {
    return this.utils.oneOfArray(COUNTRY_CODE);
  }
  /**
   * Returns a random ordinal direction (northwest, southeast, etc).
   *
   * @example
   * modules.address.ordinalDirection() // 'Northeast'
   */
  ordinalDirection() {
    return this.utils.oneOfArray(ORDINAL);
  }
  /**
   * Generates a random latitude.
   *
   * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
   * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * modules.address.latitude() // -30.9501
   * modules.address.latitude({ max: 10 }) // 5.7225
   * modules.address.latitude({ max: 10, min: -10 }) // -9.6273
   * modules.address.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   */
  latitude(options = {}) {
    const { max = 90, min = -90, precision = 4 } = options;
    return this.datatypeModule.float({
      min,
      max,
      precision
    });
  }
  /**
   * Generates a random longitude.
   *
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * modules.address.longitude() // -30.9501
   * modules.address.longitude({ max: 10 }) // 5.7225
   * modules.address.longitude({ max: 10, min: -10 }) // -9.6273
   * modules.address.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   */
  longitude(options = {}) {
    const { max = 180, min = -180, precision = 4 } = options;
    return this.datatypeModule.float({
      max,
      min,
      precision
    });
  }
};

// src/modules/vehicle/constants/bicycle.ts
var BICYCLE = [
  "Adventure Road Bicycle",
  "BMX Bicycle",
  "City Bicycle",
  "Cruiser Bicycle",
  "Cyclocross Bicycle",
  "Dual-Sport Bicycle",
  "Fitness Bicycle",
  "Flat-Foot Comfort Bicycle",
  "Folding Bicycle",
  "Hybrid Bicycle",
  "Mountain Bicycle",
  "Recumbent Bicycle",
  "Road Bicycle",
  "Tandem Bicycle",
  "Touring Bicycle",
  "Track/Fixed-Gear Bicycle",
  "Triathlon/Time Trial Bicycle",
  "Tricycle"
];

// src/modules/vehicle/constants/fuel.ts
var FUEL = ["Diesel", "Electric", "Gasoline", "Hybrid"];

// src/modules/vehicle/constants/manufacturer.ts
var MANUFACTURER = [
  "Abarth",
  "Acura",
  "Alpine",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Caterham",
  "Chrysler",
  "Citro\xEBn",
  "Chevrolet",
  "Dacia",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Hennessey",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Koenigsegg",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes Benz",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Opel",
  "Pagani",
  "Peugeot",
  "Plymouth",
  "Polestar",
  "Pontiac",
  "Porsche",
  "Renault",
  "Rimac",
  "Rolls Royce",
  "SEAT",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

// src/modules/vehicle/constants/model.ts
var MODEL = [
  "296 GTB",
  "4Runner",
  "500",
  "718",
  "911",
  "A-Class",
  "A2",
  "A3",
  "A4",
  "A6",
  "A7",
  "A8",
  "Accord",
  "Alpine",
  "Arteon",
  "Atlas",
  "Avalon",
  "Aventador",
  "Aviator",
  "Blazer",
  "Bronco",
  "C-Class",
  "C-HR",
  "Camaro",
  "Camry",
  "Cayenne",
  "Chiron",
  "Civic",
  "Clarity",
  "Clubman",
  "Colorado",
  "Corolla",
  "Corsair",
  "Corvette",
  "Countryman",
  "CR-V",
  "CT-4",
  "CT-5",
  "CX-9",
  "Duster",
  "e-tron",
  "E-Class",
  "Edge",
  "Elantra",
  "Escalade",
  "EQS",
  "EV-6",
  "Expedition",
  "Explorer",
  "F-150",
  "Fiesta",
  "Forester",
  "Ghibli",
  "Giulia",
  "GR86",
  "Grand Cherokee",
  "Grecale",
  "Golf",
  "Highlander",
  "HR-V",
  "Huracan",
  "ID.4",
  "Impreza",
  "Insight",
  "Ioniq",
  "Jetta",
  "John Cooper Works",
  "Kona",
  "Land Cruiser",
  "Legacy",
  "Levante",
  "Logan",
  "Lyriq",
  "M3",
  "M4",
  "M5",
  "Macan",
  "Malibu",
  "Maverick",
  "Mirai",
  "Model 3",
  "Model S",
  "Model X",
  "Model Y",
  "Mustang",
  "Nautilus",
  "Navigator",
  "Niro",
  "Outback",
  "Odyssey",
  "Palisade",
  "Panamera",
  "Passat",
  "Passport",
  "Portofino",
  "Prius",
  "Q3",
  "Q4",
  "Q5",
  "Q6",
  "Q7",
  "Q8",
  "Quattroporte",
  "Ranger",
  "R8",
  "RAV4",
  "Rio",
  "Roma",
  "S-Class",
  "Sandero",
  "Santa fe",
  "Sequoia",
  "Sentra",
  "Sienna",
  "Silverado",
  "Sonata",
  "Sorento",
  "Spark",
  "Sportage",
  "Spring",
  "Stelvio",
  "Stinger",
  "Suburban",
  "Super Duty",
  "Supra",
  "Tacoma",
  "Tahoe",
  "Tacoma",
  "Taos",
  "Taurus",
  "Taycan",
  "Tiguan",
  "Tonale",
  "Touareg",
  "Trailblazer",
  "TT",
  "Tucson",
  "Tundra",
  "Urus",
  "Veloster",
  "Venza",
  "Veyron",
  "Wrangler",
  "X1",
  "X2",
  "X3",
  "X4",
  "X5",
  "X6",
  "X7",
  "XT4",
  "XT5",
  "Yaris",
  "Z4"
];

// src/modules/vehicle/constants/type.ts
var TYPE = [
  "Cargo Van",
  "Convertible",
  "Coupe",
  "Crew Cab Pickup",
  "Extended Cab Pickup",
  "Hatchback",
  "Minivan",
  "Passenger Van",
  "SUV",
  "Sedan",
  "Wagon"
];

// src/modules/vehicle/index.ts
var VehicleModule = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "constants", {
      bicycles: BICYCLE,
      fuels: FUEL,
      manufacturers: MANUFACTURER,
      models: MODEL,
      vehicleTypes: TYPE
    });
  }
  /**
   * Returns a bicycle type
   * @example modules.vehicle.bicycle() // 'BMX Bicycle'
   * @returns string
   */
  bicycle() {
    return this.utils.oneOfArray(BICYCLE);
  }
  /**
   * Returns a manufacturer name
   * @example modules.vehicle.manufacturer() // 'BMW'
   * @returns string
   */
  manufacturer() {
    return this.utils.oneOfArray(MANUFACTURER);
  }
  /**
   * Returns a vehicle model name
   * @example modules.vehicle.model() // 'Model S'
   * @returns string
   */
  model() {
    return this.utils.oneOfArray(MODEL);
  }
  /**
   * Returns a vehicle type
   * @example modules.vehicle.type() // 'Coupe'
   * @returns string
   */
  type() {
    return this.utils.oneOfArray(TYPE);
  }
  /**
   * Returns a vehicle name
   * @example modules.vehicle.vehicle() // 'BMW Explorer'
   * @returns string
   */
  vehicle() {
    return `${this.manufacturer()} ${this.model()}`;
  }
  /**
   * Returns a fuel type
   * @example modules.vehicle.fuel() // 'Diesel'
   * @returns string
   */
  fuel() {
    return this.utils.oneOfArray(FUEL);
  }
};

// src/modules/date/constants/month.ts
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// src/modules/date/constants/weekday.ts
var WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// src/modules/date/index.ts
var DateModule = class {
  constructor(datatypeModule, utils2) {
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "utils", utils2);
    __publicField(this, "constants", {
      weekDays: WEEKDAYS,
      months: MONTHS
    });
  }
  /**
   * Returns a date in the near future.
   *
   * @param args.days The range of days the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.soon() // '2022-02-05T09:55:39.216Z'
   * modules.date.soon({ days: 10 }) // '2022-02-11T05:14:39.138Z'
   */
  soon({ days: idays, refDate: irefDate } = {}) {
    const days = typeof idays === "number" && idays >= 0 ? idays : this.datatypeModule.int({ min: 1, max: 200 });
    const refDate = this.argToDate(irefDate);
    const range = {
      min: 1e3,
      max: (days || 1) * 24 * 3600 * 1e3
    };
    let future = refDate.getTime();
    future += this.datatypeModule.int(range);
    refDate.setTime(future);
    return refDate;
  }
  /**
   * Returns a Date in the past.
   *
   * @param args.years The range of years the date may be in the past.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.past() // '2021-12-03T05:40:44.408Z'
   * modules.date.past()({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2017-08-18T02:59:12.350Z'
   *
   * @returns Date
   * */
  past({ refDate: irefDate, years: iyears } = {}) {
    const years = typeof iyears === "number" && iyears >= 0 ? iyears : this.datatypeModule.int({ min: 1, max: 10 });
    const refDate = this.argToDate(irefDate);
    const range = {
      min: 1e3,
      max: (years || 1) * 365 * 24 * 3600 * 1e3
    };
    let past = refDate.getTime();
    past -= this.datatypeModule.int(range);
    refDate.setTime(past);
    return refDate;
  }
  /**
   * Returns a date in the future.
   *
   * @param args.years The range of years the date may be in the future.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to now.
   *
   * @example
   * modules.date.future() // '2022-11-19T05:52:49.100Z'
   * modules.date.future({ years: 10, refDate: '2020-01-01T00:00:00.000Z' }) // '2020-12-13T22:45:10.252Z'
   *
   * @returns Date
   */
  future({ refDate: irefDate, years: iyears } = {}) {
    const years = typeof iyears === "number" && iyears >= 0 ? iyears : void 0;
    const refDate = this.argToDate(irefDate);
    const range = {
      min: 1e3,
      max: (years || 1) * 365 * 24 * 3600 * 1e3
    };
    let future = refDate.getTime();
    future += this.datatypeModule.int(range);
    const newDate = /* @__PURE__ */ new Date();
    newDate.setTime(future);
    return newDate;
  }
  /**
   * Returns a month name
   * @example modules.date.month() // 'February'
   * @returns string
   */
  month() {
    return this.utils.oneOfArray(MONTHS);
  }
  /**
   * Returns a weekday name
   * @example modules.date.weekDay() // 'Monday'
   * @returns string
   */
  weekDay() {
    return this.utils.oneOfArray(WEEKDAYS);
  }
  /**
   * Returns a random birthdate.
   *
   * @param args.min The minimum age or year to generate a birthdate.
   * @param args.max The maximum age or year to generate a birthdate.
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to `now`.
   * @param args.mode The mode to generate the birthdate. Supported modes are `'age'` and `'year'` .
   *
   * There are two modes available `'age'` and `'year'`:
   * - `'age'`: The min and max options define the age of the person (e.g. `18` - `42`).
   * - `'year'`: The min and max options define the range the birthdate may be in (e.g. `1900` - `2000`).
   *
   * Defaults to `age`.
   *
   * @example
   * modules.date.birthdate() // 1977-07-10T01:37:30.719Z
   * modules.date.birthdate({ min: 18, max: 65, mode: 'age' }) // 2003-11-02T20:03:20.116Z
   * modules.date.birthdate({ min: 1900, max: 2000, mode: 'year' }) // 1940-08-20T08:53:07.538Z
   *
   * @returns Date
   */
  birthdate({
    refDate: irefDate,
    max: imax,
    min: imin,
    mode: imode = "age"
  } = {}) {
    const refDate = this.argToDate(irefDate);
    const mode = imode === "age" || imode === "year" ? imode : "age";
    const refYear = refDate.getUTCFullYear();
    let min;
    let max;
    if (mode === "age") {
      min = typeof imin === "number" && imin >= 0 ? imin : 18;
      max = typeof imax === "number" && imax >= 0 ? imax : 80;
    } else {
      min = typeof imin === "number" && imin > 0 ? imin : refYear - 80;
      max = typeof imax === "number" && imax > 0 ? imax : refYear - 18;
    }
    if (min > max) {
      throw new ChacaError(
        `The min ${mode} (${min}) must be lower than or equal to the max ${mode} (${max}).`
      );
    }
    if (mode === "age") {
      const minimun = new Date(refDate).setUTCFullYear(refYear - max - 1);
      const maximun = new Date(refDate).setUTCFullYear(refYear - min);
      return new Date(this.datatypeModule.int({ min: minimun, max: maximun }));
    } else {
      const minimun = new Date(Date.UTC(0, 0, 2)).setUTCFullYear(min);
      const maximun = new Date(Date.UTC(0, 11, 30)).setUTCFullYear(max);
      return new Date(this.datatypeModule.int({ min: minimun, max: maximun }));
    }
  }
  randomDate() {
    const year = this.datatypeModule.int({ min: 1900, max: 2300 });
    const month = this.datatypeModule.int({ min: 0, max: 11 });
    const day = this.datatypeModule.int({ min: 1, max: 30 });
    return new Date(year, month, day);
  }
  /**
   * Returns a date between the given boundaries.
   *
   * @param args.from The early date boundary.
   * @param args.to The late date boundary.
   *
   * @example
   * modules.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
   *
   * @returns Date
   */
  between({ from: ifrom, to: ito } = {}) {
    let from;
    let to;
    if (ifrom instanceof Date && ito instanceof Date) {
      if (ifrom.getTime() > ito.getTime()) {
        throw new ChacaError(`The to Date must be greater than from Date.`);
      } else {
        from = ifrom;
        to = ito;
      }
    } else {
      if (ifrom instanceof Date && !(ito instanceof Date)) {
        from = this.argToDate(ifrom);
        to = this.future({ refDate: from });
      } else if (!(ifrom instanceof Date) && ito instanceof Date) {
        to = ito;
        from = this.past({ refDate: to });
      } else {
        from = this.randomDate();
        to = this.future({ refDate: from });
      }
    }
    const fromMs = from.getTime();
    const toMs = to.getTime();
    const dateOffset = this.datatypeModule.int({
      min: 0,
      max: toMs - fromMs
    });
    return new Date(fromMs + dateOffset);
  }
  /**
   * Returns a string with a time ago information
   * @param args.unit Date time unit. Can be (`"years"` | `"seconds"` | `"minutes"` | `"days"` | `"hours"` | `"months"`)
   * @example modules.date.timeAgo({ unit: 'days' }) // '20 days ago'
   * @returns string
   */
  timeAgo({ unit: iunit } = {}) {
    const units = ["years", "seconds", "minutes", "days", "hours", "months"];
    const unit = typeof iunit === "string" ? iunit : this.utils.oneOfArray(units);
    switch (unit) {
      case "days":
        return `${this.datatypeModule.int({
          min: 1,
          max: 30
        })} ${unit} ago`;
      case "hours":
        return `${this.datatypeModule.int({
          min: 1,
          max: 23
        })} ${unit} ago`;
      case "minutes":
        return `${this.datatypeModule.int({
          min: 1,
          max: 59
        })} ${unit} ago`;
      case "seconds":
        return `${this.datatypeModule.int({
          min: 1,
          max: 59
        })} ${unit} ago`;
      case "years":
        return `${this.datatypeModule.int({
          min: 1,
          max: 40
        })} ${unit} ago`;
      case "months":
        return `${this.datatypeModule.int({
          min: 1,
          max: 11
        })} ${unit} ago`;
      default:
        return `${this.datatypeModule.int({
          min: 1,
          max: 60
        })} ${unit} ago`;
    }
  }
  /**
   * Generates a random date that can be either in the past or in the future.
   *
   * @param args.refDate The date to use as reference point for the newly generated date. Defaults to `new Date()`.
   *
   * @example
   * modules.date.anytime() // '2022-07-31T01:33:29.567Z'
   */
  anytime({ refDate } = {}) {
    const time = this.argToDate(refDate).getTime();
    return this.between({
      from: new Date(time - 1e3 * 60 * 60 * 24 * 365),
      to: new Date(time + 1e3 * 60 * 60 * 24 * 365)
    });
  }
  argToDate(date) {
    if (date instanceof Date) {
      return new Date(date.getTime());
    } else if (typeof date === "string") {
      return new Date(date);
    } else {
      return /* @__PURE__ */ new Date();
    }
  }
};

// src/modules/person/constants/spanish.ts
var SPANISH_NAMES = {
  female: [
    "Olivia",
    "Amaya",
    "Ava",
    "Isabella",
    "Luna",
    "Camila",
    "Emilia",
    "Aurora",
    "Estela",
    "Sofia",
    "Martina",
    "Lucia",
    "Luciana",
    "Elena",
    "Julieta",
    "Valeria",
    "Amelia",
    "Regina",
    "Renata",
    "Sara",
    "Antonella",
    "Lia",
    "Aitana",
    "Ximena",
    "Samantha",
    "Alma",
    "Daniela",
    "Paula",
    "Zoe",
    "Mariana",
    "Natalia",
    "Romina",
    "Julia",
    "Josefina",
    "Roma",
    "Chloe",
    "Lara",
    "Clara",
    "Delfina",
    "Miranda",
    "Fernanda",
    "Celeste",
    "Guadalupe",
    "Paulina",
    "Alba",
    "Elisa",
    "Gabriela"
  ],
  male: [
    "Santiago",
    "Xavier",
    "Jose",
    "Diego",
    "Luis",
    "Carlos",
    "Juan",
    "Emiliano",
    "Arlo",
    "Miguel",
    "Alejandro",
    "Andres",
    "Javier",
    "Jorde",
    "Francisco",
    "Manuel",
    "Fernando",
    "Elian",
    "Leonel",
    "Sergio",
    "Pedro",
    "Esteban",
    "Ruben",
    "Santana",
    "Enrique",
    "Alonzo",
    "Rio",
    "Tadeo",
    "Camilo",
    "Rey",
    "Mauricio",
    "Orlando",
    "Belen",
    "Alonso",
    "Alvaro",
    "Santos",
    "Alfonso",
    "Ernesto",
    "Zavier",
    "Joaquin",
    "Raul",
    "Emilio",
    "Ignacio",
    "Hugo"
  ],
  lastNames: [
    "Garc\xEDa",
    "Fernandez",
    "Gonz\xE1lez",
    "Rodr\xEDguez",
    "L\xF3pez",
    "Mart\xEDnez",
    "S\xE1nchez",
    "P\xE9rez",
    "Martin",
    "G\xF3mez",
    "Ruiz",
    "Hern\xE1ndez",
    "Jim\xE9nez",
    "D\xEDaz",
    "\xC1lvarez",
    "Moreno",
    "Mu\xF1oz",
    "Alonso",
    "Guti\xE9rrez",
    "Romero",
    "Navarro",
    "Torres",
    "D\xF3minguez",
    "Gil",
    "V\xE1squez",
    "Serrano",
    "Ramos",
    "Blanco",
    "Sanz",
    "Castro",
    "Suarez",
    "Ortega",
    "Rubio",
    "Molina",
    "Delgado",
    "Ramirez",
    "Morales",
    "Ortiz",
    "Marin",
    "Iglesisas"
  ]
};

// src/modules/person/constants/english.ts
var ENGLISH_NAMES = {
  female: [
    "Olivia",
    "Emma",
    "Charlotte",
    "Amelia",
    "Ava",
    "Sophia",
    "Isabella",
    "Mia",
    "Evelyn",
    "Harper",
    "Luna",
    "Camila",
    "Gianna",
    "Elizabeth",
    "Eleanor",
    "Ella",
    "Abigail",
    "Sofia",
    "Avery",
    "Scarlett",
    "Emily",
    "Aria",
    "Penelope",
    "Chloe",
    "Layla",
    "Lila",
    "Nora",
    "Hazel",
    "Madison",
    "Ellie",
    "Lily",
    "Nova",
    "Isla",
    "Grace",
    "Violet",
    "Aurora",
    "Riley",
    "Zoey",
    "Willow",
    "Emilia",
    "Stella",
    "Zoe",
    "Victoria",
    "Hannah",
    "Addison",
    "Leah",
    "Lucy",
    "Eliana",
    "Ivy",
    "Everly",
    "Lillian",
    "Paisley",
    "Elena",
    "Naomi",
    "Maya",
    "Natalie",
    "Kinsley",
    "Deliah",
    "Claire",
    "Audrey",
    "Aaliyah",
    "Ruby",
    "Brooklyn",
    "Alice",
    "Aubrey",
    "Autumm",
    "Leilani",
    "Savannah",
    "Valentina",
    "Kennedy"
  ],
  lastNames: [
    "Adams",
    "Allen",
    "Anderson",
    "Amstrong",
    "Atkinson",
    "Bailey",
    "Barker",
    "Barnes",
    "Bell",
    "Bennett",
    "Booth",
    "Bradley",
    "Brooks",
    "Brown",
    "Burton",
    "Butler",
    "Campbel",
    "Carter",
    "Chapman",
    "Clarke",
    "Cole",
    "Collins",
    "Cook",
    "Cooper",
    "Corbyn",
    "Cox",
    "Davidson",
    "Davies",
    "Dawson",
    "Dixon",
    "Edwards",
    "Elliott",
    "Evans",
    "Fisher",
    "Fletcher",
    "Ford",
    "Foster",
    "Fox",
    "Gibson",
    "Graham",
    "Grant",
    "Gray",
    "Green",
    "Griffiths",
    "Hall",
    "Hamilton",
    "Harris",
    "Harrison",
    "Harvey",
    "Henderson",
    "Hill",
    "Holmes",
    "Howard",
    "Hughes",
    "Hunt",
    "Hunter",
    "Jackson",
    "James",
    "Jenkins",
    "Johnson",
    "Jhonston",
    "Jones",
    "Kelly",
    "Kennedy",
    "King",
    "Knight",
    "Lawrence",
    "Lee"
  ],
  male: [
    "Noah",
    "Liam",
    "Oliver",
    "Elijah",
    "James",
    "William",
    "Benjamin",
    "Lucas",
    "Henry",
    "Theodore",
    "Jack",
    "Levi",
    "Alexander",
    "Jackson",
    "Mateo",
    "Daniel",
    "Michael",
    "Mason",
    "Sebastian",
    "Ethan",
    "Logan",
    "Owen",
    "Samuel",
    "Jacob",
    "Asher",
    "Aiden",
    "Jhon",
    "Joseph",
    "Wyatt",
    "David",
    "Leo",
    "Luke",
    "Julian",
    "Hudson",
    "Grayson",
    "Matthew",
    "Ezra",
    "Gabriel",
    "Carter",
    "Issac",
    "Jayden",
    "Luca",
    "Anthony",
    "Dylan",
    "Lincoln",
    "Thomas",
    "Maverick",
    "Elias",
    "Josiah",
    "Charles",
    "Caleb",
    "Christopher",
    "Ezekiel",
    "Miles",
    "Jaxon",
    "Isaiah",
    "Andrew",
    "Nathan",
    "Nolan",
    "Adrian",
    "Cameron",
    "Santiago",
    "Eli",
    "Aaron",
    "Ryan",
    "Cooper",
    "Waylon",
    "Easton"
  ]
};

// src/modules/person/constants/genders.ts
var GENDERS = [
  "Agender",
  "Androgyne",
  "Androgynous",
  "Bigender",
  "Cis female",
  "Cis male",
  "Cis man",
  "Cis woman",
  "Cis",
  "Cisgender female",
  "Cisgender male",
  "Cisgender man",
  "Cisgender woman",
  "Cisgender",
  "Demi-boy",
  "Demi-girl",
  "Demi-man",
  "Demi-woman",
  "Demiflux",
  "Demigender",
  "F2M",
  "FTM",
  "Female to male trans man",
  "Female to male transgender man",
  "Female to male transsexual man",
  "Female to male",
  "Gender fluid",
  "Gender neutral",
  "Gender nonconforming",
  "Gender questioning",
  "Gender variant",
  "Genderflux",
  "Genderqueer",
  "Hermaphrodite",
  "Intersex man",
  "Intersex person",
  "Intersex woman",
  "Intersex",
  "M2F",
  "MTF",
  "Male to female trans woman",
  "Male to female transgender woman",
  "Male to female transsexual woman",
  "Male to female",
  "Man",
  "Multigender",
  "Neither",
  "Neutrois",
  "Non-binary",
  "Omnigender",
  "Other",
  "Pangender",
  "Polygender",
  "T* man",
  "T* woman",
  "Trans female",
  "Trans male",
  "Trans man",
  "Trans person",
  "Trans woman",
  "Trans",
  "Transexual female",
  "Transexual male",
  "Transexual man",
  "Transexual person",
  "Transexual woman",
  "Transexual",
  "Transgender female",
  "Transgender person",
  "Transmasculine",
  "Trigender",
  "Two* person",
  "Two-spirit person",
  "Two-spirit",
  "Woman",
  "Xenogender"
];

// src/modules/person/constants/jobs.ts
var JOBS_AREAS = [
  "Supervisor",
  "Associate",
  "Executive",
  "Liaison",
  "Officer",
  "Manager",
  "Engineer",
  "Specialist",
  "Director",
  "Coordinator",
  "Administrator",
  "Architect",
  "Analyst",
  "Designer",
  "Planner",
  "Orchestrator",
  "Technician",
  "Developer",
  "Producer",
  "Consultant",
  "Assistant",
  "Facilitator",
  "Agent",
  "Representative",
  "Strategist"
];
var JOB_LEVELS = [
  "Lead",
  "Senior",
  "Direct",
  "Corporate",
  "Dynamic",
  "Future",
  "Product",
  "National",
  "Regional",
  "District",
  "Central",
  "Global",
  "Customer",
  "Investor",
  "Dynamic",
  "International",
  "Legacy",
  "Forward",
  "Internal",
  "Human",
  "Chief",
  "Principal"
];

// src/modules/person/constants/language.ts
var LANGUAGES2 = [
  "Afrikaans",
  "Amharic",
  "Arabic",
  "Azerbaijani",
  "Byelorussian",
  "Bulgarian",
  "Bengali,Bangla",
  "Bosnian",
  "Catalan",
  "Cebuano",
  "Corsican",
  "Czech",
  "Welsh",
  "Danish",
  "German",
  "Greek",
  "English",
  "Esperanto",
  "Spanish",
  "Estonian",
  "Basque",
  "Persian",
  "Finnish",
  "French",
  "Frisian",
  "Irish",
  "Gaelic (Scots Gaelic)",
  "Galician",
  "Gujarati",
  "Hausa",
  "Hindi",
  "Hmong",
  "Croatian",
  "Haitian Creole",
  "Hungarian",
  "Armenian",
  "Indonesian",
  "Igbo",
  "Icelandic",
  "Italian",
  "Hebrew",
  "Japanese",
  "Javanese",
  "Georgian",
  "Kazakh",
  "Cambodian",
  "Kannada",
  "Korean",
  "Kurdish",
  "Kirghiz",
  "Latin",
  "Luxembourgish",
  "Laothian",
  "Lithuanian",
  "Latvian,Lettish",
  "Malagasy",
  "Maori",
  "Macedonian",
  "Malayalam",
  "Mongolian",
  "Marathi",
  "Malay",
  "Maltese",
  "Burmese",
  "Nepali",
  "Dutch",
  "Norwegian",
  "Nyanja",
  "Punjabi",
  "Polish",
  "Pashto,Pushto",
  "Portuguese",
  "Romanian",
  "Russian",
  "Sindhi",
  "Singhalese",
  "Slovak",
  "Slovenian",
  "Samoan",
  "Shona",
  "Somali",
  "Albanian",
  "Serbian",
  "Sesotho",
  "Sundanese",
  "Swedish",
  "Swahili",
  "Tamil",
  "Tegulu",
  "Tajik",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Vietnamese",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Chinese",
  "Zulu"
];

// src/modules/person/constants/prefix.ts
var PREFIXES = {
  male: ["Mr.", "Mrs.", "Dr."],
  female: ["Ms.", "Miss"]
};

// src/modules/person/constants/index.ts
var NAMES = { es: SPANISH_NAMES, en: ENGLISH_NAMES };
var GENDERS2 = GENDERS;
var JOBS = {
  JOBS_AREAS,
  JOB_LEVELS
};

// src/modules/person/constants/zodiac.ts
var ZODIAC_SIGN = [
  "Aquarius",
  "Pisces",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn"
];

// src/modules/person/index.ts
var PersonModule = class {
  constructor(utils2, datatypeModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "constants", {
      jobLevels: JOBS.JOB_LEVELS,
      jobAreas: JOBS.JOBS_AREAS,
      genders: GENDERS2,
      names: NAMES,
      languages: LANGUAGES2,
      prefixes: PREFIXES,
      zodiacSigns: ZODIAC_SIGN,
      sexs: ["Male", "Female"]
    });
  }
  /**
   * @example
   * modules.person.language() // 'Georgian'
   *
   * @returns string
   */
  language() {
    return this.utils.oneOfArray(this.constants.languages);
  }
  /**
   * Returns a Job Level
   * @example modules.person.jobLevel() // 'Investor'
   * @returns string
   */
  jobLevel() {
    return this.utils.oneOfArray(JOBS.JOB_LEVELS);
  }
  /**
   * Returns a Job Area
   * @example modules.person.jobArea() // 'Supervisor'
   * @returns string
   */
  jobArea() {
    return this.utils.oneOfArray(JOBS.JOBS_AREAS);
  }
  /**
   * Returns a person gender
   * @example modules.person.gender() // 'Bigender'
   * @returns string
   */
  gender() {
    return this.utils.oneOfArray(this.constants.genders);
  }
  /**
   * Returns a person sex
   * @example modules.person.sex() // 'Male'
   * @returns `Male` | `Female`
   */
  sex() {
    return this.utils.oneOfArray(this.constants.sexs);
  }
  /**
   * Returns a first name from a selected lenguage
   * @param args.language (`'en'` | `'es'`). Default `'en'`
   * @param args.sex Person name sex (`'male'` | `'female'`)
   * @example modules.person.firstName() // 'Juan'
   * @returns string
   */
  firstName({ language, sex } = {}) {
    return this.utils.oneOfArray(
      this.filterBySex(this.filterNameByLanguage(language), sex)
    );
  }
  /**
   * Returns a last name from a selected lenguage
   * @param args.language (`en` | `es`). Default `en`
   * @example modules.person.lastName() // 'Scott'
   * @returns string
   */
  lastName({ language } = {}) {
    return this.utils.oneOfArray(this.filterNameByLanguage(language).lastNames);
  }
  /**
   * Returns a full name from a selected lenguage
   * @param args.language (`en` | `es`). Default `en`
   * @param args.sex (`male` | `female`)
   * @example
   * modules.person.fullName() // Schema
   * modules.person.fullName() // 'Juan Rodriguez Perez'
   * @returns string
   */
  fullName({ language, sex: isex } = {}) {
    const lan = this.filterNameByLanguage(language);
    const sex = isex ? isex : this.utils.oneOfArray(["male", "female"]);
    const firstName = this.utils.oneOfArray(this.filterBySex(lan, sex));
    const middleName = this.datatypeModule.boolean() ? this.utils.oneOfArray(this.filterBySex(lan, sex)) : void 0;
    const lastNameFirst = this.utils.oneOfArray(lan.lastNames);
    const lastNameSecond = this.utils.oneOfArray(lan.lastNames);
    const fullName = [
      firstName,
      middleName,
      lastNameFirst,
      lastNameSecond
    ].filter((n) => n !== void 0);
    return fullName.join(" ");
  }
  /**
   * Returns a random zodiac sign.
   *
   * @example
   * modules.person.zodiacSign() // 'Pisces'
   */
  zodiacSign() {
    return this.utils.oneOfArray(ZODIAC_SIGN);
  }
  /**
   * Returns a random name prefix
   * @param args.sex Sex of the person. (`male` | `female`)
   * @example modules.person.prefix() // 'Ms.'
   * @returns string
   */
  prefix({ sex: isex } = {}) {
    const sex = isex ? isex : void 0;
    const all = [
      ...this.constants.prefixes.male,
      ...this.constants.prefixes.female
    ];
    if (sex) {
      if (sex === "male") {
        return this.utils.oneOfArray(this.constants.prefixes.male);
      } else if (sex === "female") {
        return this.utils.oneOfArray(this.constants.prefixes.female);
      } else {
        return this.utils.oneOfArray(all);
      }
    } else {
      return this.utils.oneOfArray(all);
    }
  }
  filterNameByLanguage(language) {
    if (language && typeof language === "string") {
      const nameSelected = NAMES[language];
      if (nameSelected) return nameSelected;
      else return NAMES["en"];
    } else return NAMES["en"];
  }
  filterBySex(nameSel, sex) {
    if (sex && typeof sex === "string") {
      const selSex = nameSel[sex];
      if (selSex) return selSex;
      else return [...nameSel.male, ...nameSel.female];
    } else return [...nameSel.male, ...nameSel.female];
  }
};

// src/modules/animal/constants/bear.ts
var BEAR = [
  "Giant panda",
  "Spectacled bear",
  "Sun bear",
  "Sloth bear",
  "American black bear",
  "Asian black bear",
  "Brown bear",
  "Polar bear"
];

// src/modules/animal/constants/cat.ts
var CAT = [
  "Abyssinian",
  "American Bobtail",
  "American Curl",
  "American Shorthair",
  "American Wirehair",
  "Balinese",
  "Bengal",
  "Birman",
  "Bombay",
  "British Shorthair",
  "Burmese",
  "Chartreux",
  "Chausie",
  "Cornish Rex",
  "Devon Rex",
  "Donskoy",
  "Egyptian Mau",
  "Exotic Shorthair",
  "Havana",
  "Highlander",
  "Himalayan",
  "Japanese Bobtail",
  "Korat",
  "Kurilian Bobtail",
  "LaPerm",
  "Maine Coon",
  "Manx",
  "Minskin",
  "Munchkin",
  "Nebelung",
  "Norwegian Forest Cat",
  "Ocicat",
  "Ojos Azules",
  "Oriental",
  "Persian",
  "Peterbald",
  "Pixiebob",
  "Ragdoll",
  "Russian Blue",
  "Savannah",
  "Scottish Fold",
  "Selkirk Rex",
  "Serengeti",
  "Siberian",
  "Siamese",
  "Singapura",
  "Snowshoe",
  "Sokoke",
  "Somali",
  "Sphynx",
  "Thai",
  "Tonkinese",
  "Toyger",
  "Turkish Angora",
  "Turkish Van"
];

// src/modules/animal/constants/cetacean.ts
var CETACEAN = [
  "Blue Whale",
  "Fin Whale",
  "Sei Whale",
  "Sperm Whale",
  "Bryde\u2019s whale",
  "Omura\u2019s whale",
  "Humpback whale",
  "Long-Beaked Common Dolphin",
  "Short-Beaked Common Dolphin",
  "Bottlenose Dolphin",
  "Indo-Pacific Bottlenose Dolphin",
  "Northern Rightwhale Dolphin",
  "Southern Rightwhale Dolphin",
  "Tucuxi",
  "Costero",
  "Indo-Pacific Hump-backed Dolphin",
  "Chinese White Dolphin",
  "Atlantic Humpbacked Dolphin",
  "Atlantic Spotted Dolphin",
  "Clymene Dolphin",
  "Pantropical Spotted Dolphin",
  "Spinner Dolphin",
  "Striped Dolphin",
  "Rough-Toothed Dolphin",
  "Chilean Dolphin",
  "Commerson\u2019s Dolphin",
  "Heaviside\u2019s Dolphin",
  "Hector\u2019s Dolphin",
  "Risso\u2019s Dolphin",
  "Fraser\u2019s Dolphin",
  "Atlantic White-Sided Dolphin",
  "Dusky Dolphin",
  "Hourglass Dolphin",
  "Pacific White-Sided Dolphin",
  "Peale\u2019s Dolphin",
  "White-Beaked Dolphin",
  "Australian Snubfin Dolphin",
  "Irrawaddy Dolphin",
  "Melon-headed Whale",
  "Killer Whale (Orca)",
  "Pygmy Killer Whale",
  "False Killer Whale",
  "Long-finned Pilot Whale",
  "Short-finned Pilot Whale",
  "Guiana Dolphin",
  "Burrunan Dolphin",
  "Australian humpback Dolphin",
  "Amazon River Dolphin",
  "Chinese River Dolphin",
  "Ganges River Dolphin",
  "La Plata Dolphin",
  "Southern Bottlenose Whale",
  "Longman's Beaked Whale",
  "Arnoux's Beaked Whale"
];

// src/modules/animal/constants/cow.ts
var COW = [
  "Aberdeen Angus",
  "Abergele",
  "Abigar",
  "Abondance",
  "Abyssinian Shorthorned Zebu",
  "Aceh",
  "Achham",
  "Adamawa",
  "Adaptaur",
  "Afar",
  "Africangus",
  "Afrikaner",
  "Agerolese",
  "Alambadi",
  "Alatau",
  "Albanian",
  "Albera",
  "Alderney",
  "Alentejana",
  "Aleutian wild cattle",
  "Aliad Dinka",
  "Alistana-Sanabresa",
  "Allmogekor",
  "Alur",
  "American",
  "American Angus",
  "American Beef Friesian",
  "American Brown Swiss",
  "American Milking Devon",
  "American White Park",
  "Amerifax",
  "Amrit Mahal",
  "Amsterdam Island cattle",
  "Anatolian Black",
  "Andalusian Black",
  "Andalusian Blond",
  "Andalusian Grey",
  "Angeln",
  "Angoni",
  "Ankina",
  "Ankole",
  "Ankole-Watusi",
  "Aracena",
  "Arado",
  "Argentine Criollo",
  "Argentine Friesian",
  "Armorican",
  "Arouquesa",
  "Arsi",
  "Asturian Mountain",
  "Asturian Valley",
  "Aubrac",
  "Aulie-Ata",
  "Aure et Saint-Girons",
  "Australian Braford",
  "Australian Brangus",
  "Australian Charbray",
  "Australian Friesian Sahiwal",
  "Australian Lowline",
  "Australian Milking Zebu",
  "Australian Shorthorn",
  "Austrian Simmental",
  "Austrian Yellow",
  "Av\xE9tonou",
  "Avile\xF1a-Negra Ib\xE9rica",
  "Aweil Dinka",
  "Ayrshire",
  "Azaouak",
  "Azebuado",
  "Azerbaijan Zebu",
  "Azores",
  "Bedit",
  "Breed",
  "Bachaur cattle",
  "Baherie cattle",
  "Bakosi cattle",
  "Balancer",
  "Baoule",
  "Bargur cattle",
  "Barros\xE3",
  "Barzona",
  "Bazadaise",
  "Beef Freisian",
  "Beefalo",
  "Beefmaker",
  "Beefmaster",
  "Begayt",
  "Belgian Blue",
  "Belgian Red",
  "Belgian Red Pied",
  "Belgian White-and-Red",
  "Belmont Red",
  "Belted Galloway",
  "Bernese",
  "Berrenda cattle",
  "Betizu",
  "Bianca Modenese",
  "Blaarkop",
  "Black Angus",
  "Black Baldy",
  "Black Hereford",
  "Blanca Cacere\xF1a",
  "Blanco Orejinegro BON",
  "Blonde d'Aquitaine",
  "Blue Albion",
  "Blue Grey",
  "Bohuskulla",
  "Bonsmara",
  "Boran",
  "Bo\u0161karin",
  "Braford",
  "Brahman",
  "Brahmousin",
  "Brangus",
  "Braunvieh",
  "Brava",
  "British White",
  "British Friesian",
  "Brown Carpathian",
  "Brown Caucasian",
  "Brown Swiss",
  "Bue Lingo",
  "Burlina",
  "Bu\u0161a cattle",
  "Butana cattle",
  "Bushuyev",
  "Cedit",
  "Breed",
  "Cachena",
  "Caldelana",
  "Camargue",
  "Campbell Island cattle",
  "Canadian Speckle Park",
  "Canadienne",
  "Canaria",
  "Canchim",
  "Caracu",
  "C\xE1rdena Andaluza",
  "Carinthian Blondvieh",
  "Carora",
  "Charbray",
  "Charolais",
  "Chateaubriand",
  "Chiangus",
  "Chianina",
  "Chillingham cattle",
  "Chinese Black Pied",
  "Cholistani",
  "Coloursided White Back",
  "Commercial",
  "Corriente",
  "Corsican cattle",
  "Coste\xF1o con Cuernos",
  "Crioulo Lageano",
  "Dedit",
  "Breed",
  "Dajal",
  "Dangi cattle",
  "Danish Black-Pied",
  "Danish Jersey",
  "Danish Red",
  "Deep Red cattle",
  "Deoni",
  "Devon",
  "Dexter cattle",
  "Dhanni",
  "Doayo cattle",
  "Doela",
  "Drakensberger",
  "D\xF8lafe",
  "Droughtmaster",
  "Dulong'",
  "Dutch Belted",
  "Dutch Friesian",
  "Dwarf Lulu",
  "Eedit",
  "Breed",
  "East Anatolian Red",
  "Eastern Finncattle",
  "Eastern Red Polled",
  "Enderby Island cattle",
  "English Longhorn",
  "Ennstaler Bergscheck",
  "Estonian Holstein",
  "Estonian Native",
  "Estonian Red cattle",
  "\xC9vol\xE8ne cattle",
  "Fedit",
  "Breed",
  "F\u0113ng Cattle",
  "Finnish Ayrshire",
  "Finncattle",
  "Finnish Holstein-Friesian",
  "Fj\xE4ll",
  "Fleckvieh",
  "Florida Cracker cattle",
  "Fogera",
  "French Simmental",
  "Fribourgeoise",
  "Friesian Red and White",
  "Fulani Sudanese",
  "Gedit",
  "Breed",
  "Galician Blond",
  "Galloway cattle",
  "Gangatiri",
  "Gaolao",
  "Garvonesa",
  "Gascon cattle",
  "Gelbvieh",
  "Georgian Mountain cattle",
  "German Angus",
  "German Black Pied cattle",
  "German Black Pied Dairy",
  "German Red Pied",
  "Gir",
  "Glan cattle",
  "Gloucester",
  "Gobra",
  "Greek Shorthorn",
  "Greek Steppe",
  "Greyman cattle",
  "Gudali",
  "Guernsey cattle",
  "Guzer\xE1",
  "Hedit",
  "Breed",
  "Hallikar4",
  "Hanwoo",
  "Hariana cattle",
  "Hart\xF3n del Valle",
  "Harzer Rotvieh",
  "Hays Converter",
  "Heck cattle",
  "Hereford",
  "Herens",
  "Hybridmaster",
  "Highland cattle",
  "Hinterwald",
  "Holando-Argentino",
  "Holstein Friesian cattle",
  "Horro",
  "Hu\xE1ng Cattle",
  "Hungarian Grey",
  "Iedit",
  "Breed",
  "Iberian cattle",
  "Icelandic",
  "Illawarra cattle",
  "Improved Red and White",
  "Indo-Brazilian",
  "Irish Moiled",
  "Israeli Holstein",
  "Israeli Red",
  "Istoben cattle",
  "Istrian cattle",
  "Jedit",
  "Breed",
  "Jamaica Black",
  "Jamaica Hope",
  "Jamaica Red",
  "Japanese Brown",
  "Jarmelista",
  "Javari cattle",
  "Jersey cattle",
  "Jutland cattle",
  "Kedit",
  "Breed",
  "Kabin Buri cattle",
  "Kalmyk cattle",
  "Kangayam",
  "Kankrej",
  "Kamphaeng Saen cattle",
  "Karan Swiss",
  "Kasaragod Dwarf cattle",
  "Kathiawadi",
  "Kazakh Whiteheaded",
  "Kenana cattle",
  "Kenkatha cattle",
  "Kerry cattle",
  "Kherigarh",
  "Khillari cattle",
  "Kholomogory",
  "Korat Wagyu",
  "Kostroma cattle",
  "Krishna Valley cattle",
  "Kuri",
  "Kurgan cattle",
  "Ledit",
  "Breed",
  "La Reina cattle",
  "Lakenvelder cattle",
  "Lampurger",
  "Latvian Blue",
  "Latvian Brown",
  "Latvian Danish Red",
  "Lebedyn",
  "Levantina",
  "Limia cattle",
  "Limousin",
  "Limpurger",
  "Lincoln Red",
  "Lineback",
  "Lithuanian Black-and-White",
  "Lithuanian Light Grey",
  "Lithuanian Red",
  "Lithuanian White-Backed",
  "Lohani cattle",
  "Lourdais",
  "Lucerna cattle",
  "Luing",
  "Medit",
  "Breed",
  "Madagascar Zebu",
  "Madura",
  "Maine-Anjou",
  "Malnad Gidda",
  "Malvi",
  "Mandalong Special",
  "Mantequera Leonesa",
  "Maramure\u015F Brown",
  "Marchigiana",
  "Maremmana",
  "Marinhoa",
  "Maronesa",
  "Masai",
  "Mashona",
  "Menorquina",
  "Mertolenga",
  "Meuse-Rhine-Issel",
  "Mewati",
  "Milking Shorthorn",
  "Minhota",
  "Mirandesa",
  "Mirkadim",
  "Moc\u0103ni\u0163\u0103",
  "Mollie",
  "Monchina",
  "Mongolian",
  "Montb\xE9liarde",
  "Morucha",
  "Muturu",
  "Murboden",
  "Murnau-Werdenfels",
  "Murray Grey",
  "Nedit",
  "Breed",
  "Nagori",
  "N'Dama",
  "Negra Andaluza",
  "Nelore",
  "Nguni",
  "Nimari",
  "Normande",
  "North Bengal Grey",
  "Northern Finncattle",
  "Northern Shorthorn",
  "Norwegian Red",
  "Oedit]",
  "Breed",
  "Ongole",
  "Original Simmental",
  "Pedit",
  "Breed",
  "Pajuna",
  "Palmera",
  "Pantaneiro",
  "Parda Alpina",
  "Parthenaise",
  "Pasiega",
  "Pembroke",
  "Philippine Native",
  "Pie Rouge des Plaines",
  "Piedmontese cattle",
  "Pineywoods",
  "Pinzgauer",
  "Pirenaica",
  "Podolac",
  "Podolica",
  "Polish Black-and-White",
  "Polish Red",
  "Polled Hereford",
  "Poll Shorthorn",
  "Polled Shorthorn",
  "Ponwar",
  "Preta",
  "Punganur",
  "Pulikulam",
  "Pustertaler Sprinzen",
  "Qedit",
  "Breed",
  "Qinchaun",
  "Queensland Miniature Boran",
  "Redit",
  "Breed",
  "Ramo Grande",
  "Randall",
  "Raramuri Criollo",
  "Rathi",
  "R\xE4tisches Grauvieh",
  "Raya",
  "Red Angus",
  "Red Brangus",
  "Red Chittagong",
  "Red Fulani",
  "Red Gorbatov",
  "Red Holstein",
  "Red Kandhari",
  "Red Mingrelian",
  "Red Poll",
  "Red Polled \xD8stland",
  "Red Sindhi",
  "Retinta",
  "Riggit Galloway",
  "Ringam\xE5la",
  "Rohjan",
  "Romagnola",
  "Romanian B\u0103l\u0163ata",
  "Romanian Steppe Gray",
  "Romosinuano",
  "Russian Black Pied",
  "RX3",
  "Sedit",
  "Breed",
  "Sahiwal",
  "Salers",
  "Salorn",
  "Sanga",
  "Sanhe",
  "Santa Cruz",
  "Santa Gertrudis",
  "Sayaguesa",
  "Schwyz",
  "Selembu",
  "Senepol",
  "Serbian Pied",
  "Serbian Steppe",
  "Sheko",
  "Shetland",
  "Shorthorn",
  "Siboney de Cuba",
  "Simbrah",
  "Simford",
  "Simmental",
  "Siri",
  "South Devon",
  "Spanish Fighting Bull",
  "Speckle Park",
  "Square Meater",
  "Sussex",
  "Swedish Friesian",
  "Swedish Polled",
  "Swedish Red Pied",
  "Swedish Red Polled",
  "Swedish Red-and-White",
  "Tedit",
  "Breed",
  "Tabapu\xE3",
  "Tarentaise",
  "Tasmanian Grey",
  "Tauros",
  "Telemark",
  "Texas Longhorn",
  "Texon",
  "Thai Black",
  "Thai Fighting Bull",
  "Thai Friesian",
  "Thai Milking Zebu",
  "Tharparkar",
  "Tswana",
  "Tudanca",
  "Tuli",
  "Tulim",
  "Turkish Grey Steppe",
  "Tux-Zillertal",
  "Tyrol Grey",
  "Uedit",
  "Breed",
  "Umblachery",
  "Ukrainian Grey",
  "Vedit",
  "Breed",
  "Valdostana Castana",
  "Valdostana Pezzata Nera",
  "Valdostana Pezzata Rossa",
  "V\xE4neko",
  "Vaynol",
  "Vechur8",
  "Vestland Fjord",
  "Vestland Red Polled",
  "Vianesa",
  "Volinian Beef",
  "Vorderwald",
  "Vosgienne",
  "Wedit",
  "Breed",
  "Wagyu",
  "Waguli",
  "Wangus",
  "Welsh Black",
  "Western Finncattle",
  "White C\xE1ceres",
  "White Fulani",
  "White Lamphun",
  "White Park",
  "Whitebred Shorthorn",
  "Xedit",
  "Breed",
  "Xingjiang Brown",
  "Yedit",
  "Breed",
  "Yakutian",
  "Yanbian",
  "Yanhuang",
  "Yurino",
  "Zedit",
  "Breed",
  "\u017Bubro\u0144",
  "Zebu"
];

// src/modules/animal/constants/crocodilia.ts
var CROCODILIA = [
  "Alligator mississippiensis",
  "Chinese Alligator",
  "Black Caiman",
  "Broad-snouted Caiman",
  "Spectacled Caiman",
  "Yacare Caiman",
  "Cuvier\u2019s Dwarf Caiman",
  "Schneider\u2019s Smooth-fronted Caiman",
  "African Slender-snouted Crocodile",
  "American Crocodile",
  "Australian Freshwater Crocodile",
  "Cuban Crocodile",
  "Dwarf Crocodile",
  "Morelet\u2019s Crocodile",
  "Mugger Crocodile",
  "New Guinea Freshwater Crocodile",
  "Nile Crocodile",
  "West African Crocodile",
  "Orinoco Crocodile",
  "Philippine Crocodile",
  "Saltwater Crocodile",
  "Siamese Crocodile",
  "Gharial",
  "Tomistoma"
];

// src/modules/animal/constants/dog.ts
var DOG = [
  "Affenpinscher",
  "Afghan Hound",
  "Aidi",
  "Airedale Terrier",
  "Akbash",
  "Akita",
  "Alano Espa\xF1ol",
  "Alapaha Blue Blood Bulldog",
  "Alaskan Husky",
  "Alaskan Klee Kai",
  "Alaskan Malamute",
  "Alopekis",
  "Alpine Dachsbracke",
  "American Bulldog",
  "American Bully",
  "American Cocker Spaniel",
  "American English Coonhound",
  "American Foxhound",
  "American Hairless Terrier",
  "American Pit Bull Terrier",
  "American Staffordshire Terrier",
  "American Water Spaniel",
  "Andalusian Hound",
  "Anglo-Fran\xE7ais de Petite V\xE9nerie",
  "Appenzeller Sennenhund",
  "Ariegeois",
  "Armant",
  "Armenian Gampr dog",
  "Artois Hound",
  "Australian Cattle Dog",
  "Australian Kelpie",
  "Australian Shepherd",
  "Australian Stumpy Tail Cattle Dog",
  "Australian Terrier",
  "Austrian Black and Tan Hound",
  "Austrian Pinscher",
  "Azawakh",
  "Bakharwal dog",
  "Banjara Hound",
  "Barbado da Terceira",
  "Barbet",
  "Basenji",
  "Basque Shepherd Dog",
  "Basset Art\xE9sien Normand",
  "Basset Bleu de Gascogne",
  "Basset Fauve de Bretagne",
  "Basset Hound",
  "Bavarian Mountain Hound",
  "Beagle",
  "Beagle-Harrier",
  "Belgian Shepherd",
  "Bearded Collie",
  "Beauceron",
  "Bedlington Terrier",
  "Bergamasco Shepherd",
  "Berger Picard",
  "Bernese Mountain Dog",
  "Bhotia",
  "Bichon Fris\xE9",
  "Billy",
  "Black and Tan Coonhound",
  "Black Norwegian Elkhound",
  "Black Russian Terrier",
  "Black Mouth Cur",
  "Bloodhound",
  "Blue Lacy",
  "Blue Picardy Spaniel",
  "Bluetick Coonhound",
  "Boerboel",
  "Bohemian Shepherd",
  "Bolognese",
  "Border Collie",
  "Border Terrier",
  "Borzoi",
  "Bosnian Coarse-haired Hound",
  "Boston Terrier",
  "Bouvier des Ardennes",
  "Bouvier des Flandres",
  "Boxer",
  "Boykin Spaniel",
  "Bracco Italiano",
  "Braque d'Auvergne",
  "Braque de l'Ari\xE8ge",
  "Braque du Bourbonnais",
  "Braque Francais",
  "Braque Saint-Germain",
  "Briard",
  "Briquet Griffon Vend\xE9en",
  "Brittany",
  "Broholmer",
  "Bruno Jura Hound",
  "Brussels Griffon",
  "Bucovina Shepherd Dog",
  "Bull Arab",
  "Bull Terrier",
  "Bulldog",
  "Bullmastiff",
  "Bully Kutta",
  "Burgos Pointer",
  "Cairn Terrier",
  "Campeiro Bulldog",
  "Canaan Dog",
  "Canadian Eskimo Dog",
  "Cane Corso",
  "Cane di Oropa",
  "Cane Paratore",
  "Cantabrian Water Dog",
  "Can de Chira",
  "C\xE3o da Serra de Aires",
  "C\xE3o de Castro Laboreiro",
  "C\xE3o de Gado Transmontano",
  "C\xE3o Fila de S\xE3o Miguel",
  "Cardigan Welsh Corgi",
  "Carea Castellano Manchego",
  "Carolina Dog",
  "Carpathian Shepherd Dog",
  "Catahoula Leopard Dog",
  "Catalan Sheepdog",
  "Caucasian Shepherd Dog",
  "Cavalier King Charles Spaniel",
  "Central Asian Shepherd Dog",
  "Cesky Fousek",
  "Cesky Terrier",
  "Chesapeake Bay Retriever",
  "Chien Fran\xE7ais Blanc et Noir",
  "Chien Fran\xE7ais Blanc et Orange",
  "Chien Fran\xE7ais Tricolore",
  "Chihuahua",
  "Chilean Terrier",
  "Chinese Chongqing Dog",
  "Chinese Crested Dog",
  "Chinook",
  "Chippiparai",
  "Chongqing dog",
  "Chortai",
  "Chow Chow",
  "Cimarr\xF3n Uruguayo",
  "Cirneco dell'Etna",
  "Clumber Spaniel",
  "Colombian fino hound",
  "Coton de Tulear",
  "Cretan Hound",
  "Croatian Sheepdog",
  "Curly-Coated Retriever",
  "Cursinu",
  "Czechoslovakian Wolfdog",
  "Dachshund",
  "Dalmatian",
  "Dandie Dinmont Terrier",
  "Danish-Swedish Farmdog",
  "Denmark Feist",
  "Dingo",
  "Doberman Pinscher",
  "Dogo Argentino",
  "Dogo Guatemalteco",
  "Dogo Sardesco",
  "Dogue Brasileiro",
  "Dogue de Bordeaux",
  "Drentse Patrijshond",
  "Drever",
  "Dunker",
  "Dutch Shepherd",
  "Dutch Smoushond",
  "East Siberian Laika",
  "East European Shepherd",
  "English Cocker Spaniel",
  "English Foxhound",
  "English Mastiff",
  "English Setter",
  "English Shepherd",
  "English Springer Spaniel",
  "English Toy Terrier",
  "Entlebucher Mountain Dog",
  "Estonian Hound",
  "Estrela Mountain Dog",
  "Eurasier",
  "Field Spaniel",
  "Fila Brasileiro",
  "Finnish Hound",
  "Finnish Lapphund",
  "Finnish Spitz",
  "Flat-Coated Retriever",
  "French Bulldog",
  "French Spaniel",
  "Galgo Espa\xF1ol",
  "Galician Shepherd Dog",
  "Garafian Shepherd",
  "Gascon Saintongeois",
  "Georgian Shepherd",
  "German Hound",
  "German Longhaired Pointer",
  "German Pinscher",
  "German Roughhaired Pointer",
  "German Shepherd Dog",
  "German Shorthaired Pointer",
  "German Spaniel",
  "German Spitz",
  "German Wirehaired Pointer",
  "Giant Schnauzer",
  "Glen of Imaal Terrier",
  "Golden Retriever",
  "Go\u0144czy Polski",
  "Gordon Setter",
  "Grand Anglo-Fran\xE7ais Blanc et Noir",
  "Grand Anglo-Fran\xE7ais Blanc et Orange",
  "Grand Anglo-Fran\xE7ais Tricolore",
  "Grand Basset Griffon Vend\xE9en",
  "Grand Bleu de Gascogne",
  "Grand Griffon Vend\xE9en",
  "Great Dane",
  "Greater Swiss Mountain Dog",
  "Greek Harehound",
  "Greek Shepherd",
  "Greenland Dog",
  "Greyhound",
  "Griffon Bleu de Gascogne",
  "Griffon Fauve de Bretagne",
  "Griffon Nivernais",
  "Gull Dong",
  "Gull Terrier",
  "H\xE4llefors Elkhound",
  "Hamiltonst\xF6vare",
  "Hanover Hound",
  "Harrier",
  "Havanese",
  "Hierran Wolfdog",
  "Hokkaido",
  "Hovawart",
  "Huntaway",
  "Hygen Hound",
  "Ibizan Hound",
  "Icelandic Sheepdog",
  "Indian pariah dog",
  "Indian Spitz",
  "Irish Red and White Setter",
  "Irish Setter",
  "Irish Terrier",
  "Irish Water Spaniel",
  "Irish Wolfhound",
  "Istrian Coarse-haired Hound",
  "Istrian Shorthaired Hound",
  "Italian Greyhound",
  "Jack Russell Terrier",
  "Jagdterrier",
  "Japanese Chin",
  "Japanese Spitz",
  "Japanese Terrier",
  "Jindo",
  "Jonangi",
  "Kai Ken",
  "Kaikadi",
  "Kangal Shepherd Dog",
  "Kanni",
  "Karakachan dog",
  "Karelian Bear Dog",
  "Kars",
  "Karst Shepherd",
  "Keeshond",
  "Kerry Beagle",
  "Kerry Blue Terrier",
  "King Charles Spaniel",
  "King Shepherd",
  "Kintamani",
  "Kishu",
  "Kokoni",
  "Kombai",
  "Komondor",
  "Kooikerhondje",
  "Koolie",
  "Koyun dog",
  "Kromfohrl\xE4nder",
  "Kuchi",
  "Kuvasz",
  "Labrador Retriever",
  "Lagotto Romagnolo",
  "Lakeland Terrier",
  "Lancashire Heeler",
  "Landseer",
  "Lapponian Herder",
  "Large M\xFCnsterl\xE4nder",
  "Leonberger",
  "Levriero Sardo",
  "Lhasa Apso",
  "Lithuanian Hound",
  "L\xF6wchen",
  "Lupo Italiano",
  "Mackenzie River Husky",
  "Magyar ag\xE1r",
  "Mahratta Greyhound",
  "Maltese",
  "Manchester Terrier",
  "Maremmano-Abruzzese Sheepdog",
  "McNab dog",
  "Miniature American Shepherd",
  "Miniature Bull Terrier",
  "Miniature Fox Terrier",
  "Miniature Pinscher",
  "Miniature Schnauzer",
  "Molossus of Epirus",
  "Montenegrin Mountain Hound",
  "Mountain Cur",
  "Mountain Feist",
  "Mucuchies",
  "Mudhol Hound",
  "Mudi",
  "Neapolitan Mastiff",
  "New Guinea Singing Dog",
  "New Zealand Heading Dog",
  "Newfoundland",
  "Norfolk Terrier",
  "Norrbottenspets",
  "Northern Inuit Dog",
  "Norwegian Buhund",
  "Norwegian Elkhound",
  "Norwegian Lundehund",
  "Norwich Terrier",
  "Nova Scotia Duck Tolling Retriever",
  "Old Croatian Sighthound",
  "Old Danish Pointer",
  "Old English Sheepdog",
  "Old English Terrier",
  "Olde English Bulldogge",
  "Otterhound",
  "Pachon Navarro",
  "Pampas Deerhound",
  "Paisley Terrier",
  "Papillon",
  "Parson Russell Terrier",
  "Pastore della Lessinia e del Lagorai",
  "Patagonian Sheepdog",
  "Patterdale Terrier",
  "Pekingese",
  "Pembroke Welsh Corgi",
  "Perro Majorero",
  "Perro de Pastor Mallorquin",
  "Perro de Presa Canario",
  "Perro de Presa Mallorquin",
  "Peruvian Inca Orchid",
  "Petit Basset Griffon Vend\xE9en",
  "Petit Bleu de Gascogne",
  "Phal\xE8ne",
  "Pharaoh Hound",
  "Phu Quoc Ridgeback",
  "Picardy Spaniel",
  "Plummer Terrier",
  "Plott Hound",
  "Podenco Canario",
  "Podenco Valenciano",
  "Pointer",
  "Poitevin",
  "Polish Greyhound",
  "Polish Hound",
  "Polish Lowland Sheepdog",
  "Polish Tatra Sheepdog",
  "Pomeranian",
  "Pont-Audemer Spaniel",
  "Poodle",
  "Porcelaine",
  "Portuguese Podengo",
  "Portuguese Pointer",
  "Portuguese Water Dog",
  "Posavac Hound",
  "Pra\u017Esk\xFD Krysa\u0159\xEDk",
  "Pshdar Dog",
  "Pudelpointer",
  "Pug",
  "Puli",
  "Pumi",
  "Pungsan Dog",
  "Pyrenean Mastiff",
  "Pyrenean Mountain Dog",
  "Pyrenean Sheepdog",
  "Rafeiro do Alentejo",
  "Rajapalayam",
  "Rampur Greyhound",
  "Rat Terrier",
  "Ratonero Bodeguero Andaluz",
  "Ratonero Mallorquin",
  "Ratonero Murciano de Huerta",
  "Ratonero Valenciano",
  "Redbone Coonhound",
  "Rhodesian Ridgeback",
  "Romanian Mioritic Shepherd Dog",
  "Romanian Raven Shepherd Dog",
  "Rottweiler",
  "Rough Collie",
  "Russian Spaniel",
  "Russian Toy",
  "Russo-European Laika",
  "Saarloos Wolfdog",
  "Sabueso Espa\xF1ol",
  "Saint Bernard",
  "Saint Hubert Jura Hound",
  "Saint-Usuge Spaniel",
  "Saluki",
  "Samoyed",
  "Sapsali",
  "Sarabi dog",
  "\u0160arplaninac",
  "Schapendoes",
  "Schillerst\xF6vare",
  "Schipperke",
  "Schweizer Laufhund",
  "Schweizerischer Niederlaufhund",
  "Scottish Deerhound",
  "Scottish Terrier",
  "Sealyham Terrier",
  "Segugio dell'Appennino",
  "Segugio Italiano",
  "Segugio Maremmano",
  "Seppala Siberian Sleddog",
  "Serbian Hound",
  "Serbian Tricolour Hound",
  "Serrano Bulldog",
  "Shar Pei",
  "Shetland Sheepdog",
  "Shiba Inu",
  "Shih Tzu",
  "Shikoku",
  "Shiloh Shepherd",
  "Siberian Husky",
  "Silken Windhound",
  "Silky Terrier",
  "Sinhala Hound",
  "Skye Terrier",
  "Sloughi",
  "Slovakian Wirehaired Pointer",
  "Slovensk\xFD Cuvac",
  "Slovensk\xFD Kopov",
  "Smalandst\xF6vare",
  "Small Greek domestic dog",
  "Small M\xFCnsterl\xE4nder",
  "Smooth Collie",
  "Smooth Fox Terrier",
  "Soft-Coated Wheaten Terrier",
  "South Russian Ovcharka",
  "Spanish Mastiff",
  "Spanish Water Dog",
  "Spinone Italiano",
  "Sporting Lucas Terrier",
  "Sardinian Shepherd Dog",
  "Stabyhoun",
  "Staffordshire Bull Terrier",
  "Standard Schnauzer",
  "Stephens Stock",
  "Styrian Coarse-haired Hound",
  "Sussex Spaniel",
  "Swedish Elkhound",
  "Swedish Lapphund",
  "Swedish Vallhund",
  "Swedish White Elkhound",
  "Taigan",
  "Taiwan Dog",
  "Tamaskan Dog",
  "Teddy Roosevelt Terrier",
  "Telomian",
  "Tenterfield Terrier",
  "Terrier Brasileiro",
  "Thai Bangkaew Dog",
  "Thai Ridgeback",
  "Tibetan Mastiff",
  "Tibetan Spaniel",
  "Tibetan Terrier",
  "Tornjak",
  "Tosa",
  "Toy Fox Terrier",
  "Toy Manchester Terrier",
  "Transylvanian Hound",
  "Treeing Cur",
  "Treeing Feist",
  "Treeing Tennessee Brindle",
  "Treeing Walker Coonhound",
  "Trigg Hound",
  "Tyrolean Hound",
  "Vikhan",
  "Villano de Las Encartaciones",
  "Villanuco de Las Encartaciones",
  "Vizsla",
  "Volpino Italiano",
  "Weimaraner",
  "Welsh Sheepdog",
  "Welsh Springer Spaniel",
  "Welsh Terrier",
  "West Highland White Terrier",
  "West Siberian Laika",
  "Westphalian Dachsbracke",
  "Wetterhoun",
  "Whippet",
  "White Shepherd",
  "White Swiss Shepherd Dog",
  "Wire Fox Terrier",
  "Wirehaired Pointing Griffon",
  "Wirehaired Vizsla",
  "Xiasi Dog",
  "Xoloitzcuintli",
  "Yakutian Laika",
  "Yorkshire Terrier"
];

// src/modules/animal/constants/horse.ts
var HORSE = [
  "American Albino",
  "Abaco Barb",
  "Abtenauer",
  "Abyssinian",
  "Aegidienberger",
  "Akhal-Teke",
  "Albanian Horse",
  "Altai Horse",
  "Alt\xE8r Real",
  "American Cream Draft",
  "American Indian Horse",
  "American Paint Horse",
  "American Quarter Horse",
  "American Saddlebred",
  "American Warmblood",
  "Andalusian Horse",
  "Andravida Horse",
  "Anglo-Arabian",
  "Anglo-Arabo-Sardo",
  "Anglo-Kabarda",
  "Appaloosa",
  "AraAppaloosa",
  "Arabian Horse",
  "Ardennes Horse",
  "Arenberg-Nordkirchen",
  "Argentine Criollo",
  "Asian wild Horse",
  "Assateague Horse",
  "Asturc\xF3n",
  "Augeron",
  "Australian Brumby",
  "Australian Draught Horse",
  "Australian Stock Horse",
  "Austrian Warmblood",
  "Auvergne Horse",
  "Auxois",
  "Azerbaijan Horse",
  "Azteca Horse",
  "Baise Horse",
  "Bale",
  "Balearic Horse",
  "Balikun Horse",
  "Baluchi Horse",
  "Banker Horse",
  "Barb Horse",
  "Bardigiano",
  "Bashkir Curly",
  "Basque Mountain Horse",
  "Bavarian Warmblood",
  "Belgian Half-blood",
  "Belgian Horse",
  "Belgian Warmblood ",
  "Bhutia Horse",
  "Black Forest Horse",
  "Blazer Horse",
  "Boerperd",
  "Borana",
  "Boulonnais Horse",
  "Brabant",
  "Brandenburger",
  "Brazilian Sport Horse",
  "Breton Horse",
  "Brumby",
  "Budyonny Horse",
  "Burguete Horse",
  "Burmese Horse",
  "Byelorussian Harness Horse",
  "Calabrese Horse",
  "Camargue Horse",
  "Camarillo White Horse",
  "Campeiro",
  "Campolina",
  "Canadian Horse",
  "Canadian Pacer",
  "Carolina Marsh Tacky",
  "Carthusian Horse",
  "Caspian Horse",
  "Castilian Horse",
  "Castillonnais",
  "Catria Horse",
  "Cavallo Romano della Maremma Laziale",
  "Cerbat Mustang",
  "Chickasaw Horse",
  "Chilean Corralero",
  "Choctaw Horse",
  "Cleveland Bay",
  "Clydesdale Horse",
  "Cob",
  "Coldblood Trotter",
  "Colonial Spanish Horse",
  "Colorado Ranger",
  "Comtois Horse",
  "Corsican Horse",
  "Costa Rican Saddle Horse",
  "Cretan Horse",
  "Criollo Horse",
  "Croatian Coldblood",
  "Cuban Criollo",
  "Cumberland Island Horse",
  "Curly Horse",
  "Czech Warmblood",
  "Daliboz",
  "Danish Warmblood",
  "Danube Delta Horse",
  "Dole Gudbrandsdal",
  "Don",
  "Dongola Horse",
  "Draft Trotter",
  "Dutch Harness Horse",
  "Dutch Heavy Draft",
  "Dutch Warmblood",
  "Dzungarian Horse",
  "East Bulgarian",
  "East Friesian Horse",
  "Estonian Draft",
  "Estonian Horse",
  "Falabella",
  "Faroese",
  "Finnhorse",
  "Fjord Horse",
  "Fleuve",
  "Florida Cracker Horse",
  "Foutank\xE9",
  "Frederiksborg Horse",
  "Freiberger",
  "French Trotter",
  "Friesian Cross",
  "Friesian Horse",
  "Friesian Sporthorse",
  "Furioso-North Star",
  "Galice\xF1o",
  "Galician Pony",
  "Gelderland Horse",
  "Georgian Grande Horse",
  "German Warmblood",
  "Giara Horse",
  "Gidran",
  "Groningen Horse",
  "Gypsy Horse",
  "Hackney Horse",
  "Haflinger",
  "Hanoverian Horse",
  "Heck Horse",
  "Heihe Horse",
  "Henson Horse",
  "Hequ Horse",
  "Hirzai",
  "Hispano-Bret\xF3n",
  "Holsteiner Horse",
  "Horro",
  "Hungarian Warmblood",
  "Icelandic Horse",
  "Iomud",
  "Irish Draught",
  "Irish Sport Horse sometimes called Irish Hunter",
  "Italian Heavy Draft",
  "Italian Trotter",
  "Jaca Navarra",
  "Jeju Horse",
  "Jutland Horse",
  "Kabarda Horse",
  "Kafa",
  "Kaimanawa Horses",
  "Kalmyk Horse",
  "Karabair",
  "Karabakh Horse",
  "Karachai Horse",
  "Karossier",
  "Kathiawari",
  "Kazakh Horse",
  "Kentucky Mountain Saddle Horse",
  "Kiger Mustang",
  "Kinsky Horse",
  "Kisber Felver",
  "Kiso Horse",
  "Kladruber",
  "Knabstrupper",
  "Konik",
  "Kundudo",
  "Kustanair",
  "Kyrgyz Horse",
  "Latvian Horse",
  "Lipizzan",
  "Lithuanian Heavy Draught",
  "Lokai",
  "Losino Horse",
  "Lusitano",
  "Lyngshest",
  "M'Bayar",
  "M'Par",
  "Mallorqu\xEDn",
  "Malopolski",
  "Mangalarga",
  "Mangalarga Marchador",
  "Maremmano",
  "Marisme\xF1o Horse",
  "Marsh Tacky",
  "Marwari Horse",
  "Mecklenburger",
  "Me\u0111imurje Horse",
  "Menorqu\xEDn",
  "M\xE9rens Horse",
  "Messara Horse",
  "Metis Trotter",
  "Mez\u0151hegyesi Sport Horse",
  "Miniature Horse",
  "Misaki Horse",
  "Missouri Fox Trotter",
  "Monchina",
  "Mongolian Horse",
  "Mongolian Wild Horse",
  "Monterufolino",
  "Morab",
  "Morgan Horse",
  "Mountain Pleasure Horse",
  "Moyle Horse",
  "Murakoz Horse",
  "Murgese",
  "Mustang Horse",
  "Namib Desert Horse",
  "Nangchen Horse",
  "National Show Horse",
  "Nez Perce Horse",
  "Nivernais Horse",
  "Nokota Horse",
  "Noma",
  "Nonius Horse",
  "Nooitgedachter",
  "Nordlandshest",
  "Noriker Horse",
  "Norman Cob",
  "North American Single-Footer Horse",
  "North Swedish Horse",
  "Norwegian Coldblood Trotter",
  "Norwegian Fjord",
  "Novokirghiz",
  "Oberlander Horse",
  "Ogaden",
  "Oldenburg Horse",
  "Orlov trotter",
  "Ostfriesen",
  "Paint",
  "Pampa Horse",
  "Paso Fino",
  "Pentro Horse",
  "Percheron",
  "Persano Horse",
  "Peruvian Paso",
  "Pintabian",
  "Pleven Horse",
  "Poitevin Horse",
  "Posavac Horse",
  "Pottok",
  "Pryor Mountain Mustang",
  "Przewalski's Horse",
  "Pura Raza Espa\xF1ola",
  "Purosangue Orientale",
  "Qatgani",
  "Quarab",
  "Quarter Horse",
  "Racking Horse",
  "Retuerta Horse",
  "Rhenish German Coldblood",
  "Rhinelander Horse",
  "Riwoche Horse",
  "Rocky Mountain Horse",
  "Romanian Sporthorse",
  "Rottaler",
  "Russian Don",
  "Russian Heavy Draft",
  "Russian Trotter",
  "Saddlebred",
  "Salerno Horse",
  "Samolaco Horse",
  "San Fratello Horse",
  "Sarcidano Horse",
  "Sardinian Anglo-Arab",
  "Schleswig Coldblood",
  "Schwarzw\xE4lder Kaltblut",
  "Selale",
  "Sella Italiano",
  "Selle Fran\xE7ais",
  "Shagya Arabian",
  "Shan Horse",
  "Shire Horse",
  "Siciliano Indigeno",
  "Silesian Horse",
  "Sokolsky Horse",
  "Sorraia",
  "South German Coldblood",
  "Soviet Heavy Draft",
  "Spanish Anglo-Arab",
  "Spanish Barb",
  "Spanish Jennet Horse",
  "Spanish Mustang",
  "Spanish Tarpan",
  "Spanish-Norman Horse",
  "Spiti Horse",
  "Spotted Saddle Horse",
  "Standardbred Horse",
  "Suffolk Punch",
  "Swedish Ardennes",
  "Swedish coldblood trotter",
  "Swedish Warmblood",
  "Swiss Warmblood",
  "Taish\u016B Horse",
  "Takhi",
  "Tawleed",
  "Tchernomor",
  "Tennessee Walking Horse",
  "Tersk Horse",
  "Thoroughbred",
  "Tiger Horse",
  "Tinker Horse",
  "Tolfetano",
  "Tori Horse",
  "Trait Du Nord",
  "Trakehner",
  "Tsushima",
  "Tuigpaard",
  "Ukrainian Riding Horse",
  "Unmol Horse",
  "Uzunyayla",
  "Ventasso Horse",
  "Virginia Highlander",
  "Vlaamperd",
  "Vladimir Heavy Draft",
  "Vyatka",
  "Waler",
  "Waler Horse",
  "Walkaloosa",
  "Warlander",
  "Warmblood",
  "Welsh Cob",
  "Westphalian Horse",
  "Wielkopolski",
  "W\xFCrttemberger",
  "Xilingol Horse",
  "Yakutian Horse",
  "Yili Horse",
  "Yonaguni Horse",
  "Zaniskari",
  "\u017Demaitukas",
  "Zhemaichu",
  "Zweibr\xFCcker"
];

// src/modules/animal/constants/insect.ts
var INSECT = [
  "Acacia-ants",
  "Acorn-plum gall",
  "Aerial yellowjacket",
  "Africanized honey bee",
  "Allegheny mound ant",
  "Almond stone wasp",
  "Ant",
  "Arboreal ant",
  "Argentine ant",
  "Asian paper wasp",
  "Baldfaced hornet",
  "Bee",
  "Bigheaded ant",
  "Black and yellow mud dauber",
  "Black carpenter ant",
  "Black imported fire ant",
  "Blue horntail woodwasp",
  "Blue orchard bee",
  "Braconid wasp",
  "Bumble bee",
  "Carpenter ant",
  "Carpenter wasp",
  "Chalcid wasp",
  "Cicada killer",
  "Citrus blackfly parasitoid",
  "Common paper wasp",
  "Crazy ant",
  "Cuckoo wasp",
  "Cynipid gall wasp",
  "Eastern Carpenter bee",
  "Eastern yellowjacket",
  "Elm sawfly",
  "Encyrtid wasp",
  "Erythrina gall wasp",
  "Eulophid wasp",
  "European hornet",
  "European imported fire ant",
  "False honey ant",
  "Fire ant",
  "Forest bachac",
  "Forest yellowjacket",
  "German yellowjacket",
  "Ghost ant",
  "Giant ichneumon wasp",
  "Giant resin bee",
  "Giant wood wasp",
  "Golden northern bumble bee",
  "Golden paper wasp",
  "Gouty oak gall",
  "Grass Carrying Wasp",
  "Great black wasp",
  "Great golden digger wasp",
  "Hackberry nipple gall parasitoid",
  "Honey bee",
  "Horned oak gall",
  "Horse guard wasp",
  "Horse guard wasp",
  "Hunting wasp",
  "Ichneumonid wasp",
  "Keyhole wasp",
  "Knopper gall",
  "Large garden bumble bee",
  "Large oak-apple gall",
  "Leafcutting bee",
  "Little fire ant",
  "Little yellow ant",
  "Long-horned bees",
  "Long-legged ant",
  "Macao paper wasp",
  "Mallow bee",
  "Marble gall",
  "Mossyrose gall wasp",
  "Mud-daubers",
  "Multiflora rose seed chalcid",
  "Oak apple gall wasp",
  "Oak rough bulletgall wasp",
  "Oak saucer gall",
  "Oak shoot sawfly",
  "Odorous house ant",
  "Orange-tailed bumble bee",
  "Orangetailed potter wasp",
  "Oriental chestnut gall wasp",
  "Paper wasp",
  "Pavement ant",
  "Pigeon tremex",
  "Pip gall wasp",
  "Prairie yellowjacket",
  "Pteromalid wasp",
  "Pyramid ant",
  "Raspberry Horntail",
  "Red ant",
  "Red carpenter ant",
  "Red harvester ant",
  "Red imported fire ant",
  "Red wasp",
  "Red wood ant",
  "Red-tailed wasp",
  "Reddish carpenter ant",
  "Rough harvester ant",
  "Sawfly parasitic wasp",
  "Scale parasitoid",
  "Silky ant",
  "Sirex woodwasp",
  "Siricid woodwasp",
  "Smaller yellow ant",
  "Southeastern blueberry bee",
  "Southern fire ant",
  "Southern yellowjacket",
  "Sphecid wasp",
  "Stony gall",
  "Sweat bee",
  "Texas leafcutting ant",
  "Tiphiid wasp",
  "Torymid wasp",
  "Tramp ant",
  "Valentine ant",
  "Velvet ant",
  "Vespid wasp",
  "Weevil parasitoid",
  "Western harvester ant",
  "Western paper wasp",
  "Western thatching ant",
  "Western yellowjacket",
  "White-horned horntail",
  "Willow shoot sawfly",
  "Woodwasp",
  "Wool sower gall maker",
  "Yellow and black potter wasp",
  "Yellow Crazy Ant",
  "Yellow-horned horntail"
];

// src/modules/animal/constants/lion.ts
var LION = [
  "Asiatic Lion",
  "Barbary Lion",
  "West African Lion",
  "Northeast Congo Lion",
  "Masai Lion",
  "Transvaal lion",
  "Cape lion"
];

// src/modules/animal/constants/rabbit.ts
var RABBIT = [
  "American",
  "American Chinchilla",
  "American Fuzzy Lop",
  "American Sable",
  "Argente Brun",
  "Belgian Hare",
  "Beveren",
  "Blanc de Hotot",
  "Britannia Petite",
  "Californian",
  "Champagne D\u2019Argent",
  "Checkered Giant",
  "Cinnamon",
  "Cr\xE8me D\u2019Argent",
  "Dutch",
  "Dwarf Hotot",
  "English Angora",
  "English Lop",
  "English Spot",
  "Flemish Giant",
  "Florida White",
  "French Angora",
  "French Lop",
  "Giant Angora",
  "Giant Chinchilla",
  "Harlequin",
  "Havana",
  "Himalayan",
  "Holland Lop",
  "Jersey Wooly",
  "Lilac",
  "Lionhead",
  "Mini Lop",
  "Mini Rex",
  "Mini Satin",
  "Netherland Dwarf",
  "New Zealand",
  "Palomino",
  "Polish",
  "Rex",
  "Rhinelander",
  "Satin",
  "Satin Angora",
  "Silver",
  "Silver Fox",
  "Silver Marten",
  "Standard Chinchilla",
  "Tan",
  "Thrianta"
];

// src/modules/animal/constants/rodent.ts
var RODENT = [
  "Abrocoma",
  "Abrocoma schistacea",
  "Aconaemys",
  "Aconaemys porteri",
  "African brush-tailed porcupine",
  "Andean mountain cavy",
  "Argentine tuco-tuco",
  "Ashy chinchilla rat",
  "Asiatic brush-tailed porcupine",
  "Atherurus",
  "Azara's agouti",
  "Azara's tuco-tuco",
  "Bahia porcupine",
  "Bathyergus",
  "Bathyergus janetta",
  "Bathyergus suillus",
  "Bennett's chinchilla rat",
  "Bicolored-spined porcupine",
  "Black agouti",
  "Black dwarf porcupine",
  "Black-rumped agouti",
  "Black-tailed hairy dwarf porcupine",
  "Bolivian chinchilla rat",
  "Bolivian tuco-tuco",
  "Bonetto's tuco-tuco",
  "Brandt's yellow-toothed cavy",
  "Brazilian guinea pig",
  "Brazilian porcupine",
  "Brazilian tuco-tuco",
  "Bridge's degu",
  "Brown hairy dwarf porcupine",
  "Budin's chinchilla rat, A. budini",
  "Cape porcupine",
  "Catamarca tuco-tuco",
  "Cavia",
  "Central American agouti",
  "Chacoan tuco-tuco",
  "Chilean rock rat",
  "Chinchilla",
  "Coendou",
  "Coiban agouti",
  "Colburn's tuco-tuco",
  "Collared tuco-tuco",
  "Common degu",
  "Common yellow-toothed cavy",
  "Conover's tuco-tuco",
  "Coruro",
  "Crested agouti",
  "Crested porcupine",
  "Cryptomys",
  "Cryptomys bocagei",
  "Cryptomys damarensis",
  "Cryptomys foxi",
  "Cryptomys hottentotus",
  "Cryptomys mechowi",
  "Cryptomys ochraceocinereus",
  "Cryptomys zechi",
  "Ctenomys",
  "Cuniculus",
  "Cuscomys",
  "Cuscomys ashanika",
  "Dactylomys",
  "Dactylomys boliviensis",
  "Dactylomys dactylinus",
  "Dactylomys peruanus",
  "Dasyprocta",
  "Domestic guinea pig",
  "Emily's tuco-tuco",
  "Erethizon",
  "Famatina chinchilla rat",
  "Frosted hairy dwarf porcupine",
  "Fukomys",
  "Fukomys amatus",
  "Fukomys anselli",
  "Fukomys bocagei",
  "Fukomys damarensis",
  "Fukomys darlingi",
  "Fukomys foxi",
  "Fukomys ilariae",
  "Fukomys kafuensis",
  "Fukomys mechowii",
  "Fukomys micklemi",
  "Fukomys occlusus",
  "Fukomys ochraceocinereus",
  "Fukomys whytei",
  "Fukomys zechi",
  "Furtive tuco-tuco",
  "Galea",
  "Georychus",
  "Georychus capensis",
  "Golden viscacha-rat",
  "Goya tuco-tuco",
  "Greater guinea pig",
  "Green acouchi",
  "Haig's tuco-tuco",
  "Heliophobius",
  "Heliophobius argenteocinereus",
  "Heterocephalus",
  "Heterocephalus glaber",
  "Highland tuco-tuco",
  "Hystrix",
  "Indian porcupine",
  "Isla Mocha degu",
  "Kalinowski agouti",
  "Kannabateomys",
  "Kannabateomys amblyonyx",
  "Lagidium",
  "Lagostomus",
  "Lewis' tuco-tuco",
  "Long-tailed chinchilla",
  "Long-tailed porcupine",
  "Los Chalchaleros' viscacha-rat",
  "Lowland paca",
  "Magellanic tuco-tuco",
  "Malayan porcupine",
  "Maule tuco-tuco",
  "Mendoza tuco-tuco",
  "Mexican agouti",
  "Mexican hairy dwarf porcupine",
  "Microcavia",
  "Montane guinea pig",
  "Moon-toothed degu",
  "Mottled tuco-tuco",
  "Mountain degu",
  "Mountain paca",
  "Mountain viscacha-rat",
  "Myoprocta",
  "Natterer's tuco-tuco",
  "North American porcupine",
  "Northern viscacha",
  "Octodon",
  "Octodontomys",
  "Octomys",
  "Olallamys",
  "Olallamys albicauda",
  "Olallamys edax",
  "Orinoco agouti",
  "Paraguaian hairy dwarf porcupine",
  "Pearson's tuco-tuco",
  "Peruvian tuco-tuco",
  "Philippine porcupine",
  "Pipanacoctomys",
  "Plains viscacha",
  "Plains viscacha-rat",
  "Porteous' tuco-tuco",
  "Punta de Vacas chinchilla rat",
  "Red acouchi",
  "Red-rumped agouti",
  "Reddish tuco-tuco",
  "Rio Negro tuco-tuco",
  "Robust tuco-tuco",
  "Roosmalen's dwarf porcupine",
  "Rothschild's porcupine",
  "Ruatan Island agouti",
  "Sage's rock rat",
  "Salinoctomys",
  "Salta tuco-tuco",
  "San Luis tuco-tuco",
  "Santa Catarina's guinea pig",
  "Shiny guinea pig",
  "Shipton's mountain cavy",
  "Short-tailed chinchilla",
  "Silky tuco-tuco",
  "Social tuco-tuco",
  "Southern mountain cavy",
  "Southern tuco-tuco",
  "Southern viscacha",
  "Spalacopus",
  "Spix's yellow-toothed cavy",
  "Steinbach's tuco-tuco",
  "Streaked dwarf porcupine",
  "Strong tuco-tuco",
  "Stump-tailed porcupine",
  "Sumatran porcupine",
  "Sunda porcupine",
  "Talas tuco-tuco",
  "Tawny tuco-tuco",
  "Thick-spined porcupine",
  "Tiny tuco-tuco",
  "Trichys",
  "Tucuman tuco-tuco",
  "Tympanoctomys",
  "Uspallata chinchilla rat",
  "White-toothed tuco-tuco",
  "Wolffsohn's viscacha"
];

// src/modules/animal/constants/snake.ts
var SNAKE = [
  "Viper Adder",
  "Common adder",
  "Death Adder",
  "Desert death adder",
  "Horned adder",
  "Long-nosed adder",
  "Many-horned adder",
  "Mountain adder",
  "Mud adder",
  "Namaqua dwarf adder",
  "Nightingale adder",
  "Peringuey's adder",
  "Puff adder",
  "African puff adder",
  "Rhombic night adder",
  "Sand adder",
  "Dwarf sand adder",
  "Namib dwarf sand adder",
  "Water adder",
  "Aesculapian snake",
  "Anaconda",
  "Bolivian anaconda",
  "De Schauensee's anaconda",
  "Green anaconda",
  "Yellow anaconda",
  "Arafura file snake",
  "Asp",
  "European asp",
  "Egyptian asp",
  "African beaked snake",
  "Ball Python",
  "Bird snake",
  "Black-headed snake",
  "Mexican black kingsnake",
  "Black rat snake",
  "Black snake",
  "Red-bellied black snake",
  "Blind snake",
  "Brahminy blind snake",
  "Texas blind snake",
  "Western blind snake",
  "Boa",
  "Abaco Island boa",
  "Amazon tree boa",
  "Boa constrictor",
  "Cuban boa",
  "Dumeril's boa",
  "Dwarf boa",
  "Emerald tree boa",
  "Hogg Island boa",
  "Jamaican boa",
  "Madagascar ground boa",
  "Madagascar tree boa",
  "Puerto Rican boa",
  "Rainbow boa",
  "Red-tailed boa",
  "Rosy boa",
  "Rubber boa",
  "Sand boa",
  "Tree boa",
  "Boiga",
  "Boomslang",
  "Brown snake",
  "Eastern brown snake",
  "Bull snake",
  "Bushmaster",
  "Dwarf beaked snake",
  "Rufous beaked snake",
  "Canebrake",
  "Cantil",
  "Cascabel",
  "Cat-eyed snake",
  "Banded cat-eyed snake",
  "Green cat-eyed snake",
  "Cat snake",
  "Andaman cat snake",
  "Beddome's cat snake",
  "Dog-toothed cat snake",
  "Forsten's cat snake",
  "Gold-ringed cat snake",
  "Gray cat snake",
  "Many-spotted cat snake",
  "Tawny cat snake",
  "Chicken snake",
  "Coachwhip snake",
  "Cobra",
  "Andaman cobra",
  "Arabian cobra",
  "Asian cobra",
  "Banded water cobra",
  "Black-necked cobra",
  "Black-necked spitting cobra",
  "Black tree cobra",
  "Burrowing cobra",
  "Cape cobra",
  "Caspian cobra",
  "Congo water cobra",
  "Common cobra",
  "Eastern water cobra",
  "Egyptian cobra",
  "Equatorial spitting cobra",
  "False cobra",
  "False water cobra",
  "Forest cobra",
  "Gold tree cobra",
  "Indian cobra",
  "Indochinese spitting cobra",
  "Javan spitting cobra",
  "King cobra",
  "Mandalay cobra",
  "Mozambique spitting cobra",
  "North Philippine cobra",
  "Nubian spitting cobra",
  "Philippine cobra",
  "Red spitting cobra",
  "Rinkhals cobra",
  "Shield-nosed cobra",
  "Sinai desert cobra",
  "Southern Indonesian spitting cobra",
  "Southern Philippine cobra",
  "Southwestern black spitting cobra",
  "Snouted cobra",
  "Spectacled cobra",
  "Spitting cobra",
  "Storm water cobra",
  "Thai cobra",
  "Taiwan cobra",
  "Zebra spitting cobra",
  "Collett's snake",
  "Congo snake",
  "Copperhead",
  "American copperhead",
  "Australian copperhead",
  "Coral snake",
  "Arizona coral snake",
  "Beddome's coral snake",
  "Brazilian coral snake",
  "Cape coral snake",
  "Harlequin coral snake",
  "High Woods coral snake",
  "Malayan long-glanded coral snake",
  "Texas Coral Snake",
  "Western coral snake",
  "Corn snake",
  "South eastern corn snake",
  "Cottonmouth",
  "Crowned snake",
  "Cuban wood snake",
  "Eastern hognose snake",
  "Egg-eater",
  "Eastern coral snake",
  "Fer-de-lance",
  "Fierce snake",
  "Fishing snake",
  "Flying snake",
  "Golden tree snake",
  "Indian flying snake",
  "Moluccan flying snake",
  "Ornate flying snake",
  "Paradise flying snake",
  "Twin-Barred tree snake",
  "Banded Flying Snake",
  "Fox snake, three species of Pantherophis",
  "Forest flame snake",
  "Garter snake",
  "Checkered garter snake",
  "Common garter snake",
  "San Francisco garter snake",
  "Texas garter snake",
  "Cape gopher snake",
  "Grass snake",
  "Green snake",
  "Rough green snake",
  "Smooth green snake",
  "Ground snake",
  "Common ground snake",
  "Three-lined ground snake",
  "Western ground snake",
  "Habu",
  "Hognose snake",
  "Blonde hognose snake",
  "Dusty hognose snake",
  "Eastern hognose snake",
  "Jan's hognose snake",
  "Giant Malagasy hognose snake",
  "Mexican hognose snake",
  "South American hognose snake",
  "Hundred pacer",
  "Ikaheka snake",
  "Indigo snake",
  "Jamaican Tree Snake",
  "Keelback",
  "Asian keelback",
  "Assam keelback",
  "Black-striped keelback",
  "Buff striped keelback",
  "Burmese keelback",
  "Checkered keelback",
  "Common keelback",
  "Hill keelback",
  "Himalayan keelback",
  "Khasi Hills keelback",
  "Modest keelback",
  "Nicobar Island keelback",
  "Nilgiri keelback",
  "Orange-collared keelback",
  "Red-necked keelback",
  "Sikkim keelback",
  "Speckle-bellied keelback",
  "White-lipped keelback",
  "Wynaad keelback",
  "Yunnan keelback",
  "King brown",
  "King cobra",
  "King snake",
  "California kingsnake",
  "Desert kingsnake",
  "Grey-banded kingsnake",
  "North eastern king snake",
  "Prairie kingsnake",
  "Scarlet kingsnake",
  "Speckled kingsnake",
  "Krait",
  "Banded krait",
  "Blue krait",
  "Black krait",
  "Burmese krait",
  "Ceylon krait",
  "Indian krait",
  "Lesser black krait",
  "Malayan krait",
  "Many-banded krait",
  "Northeastern hill krait",
  "Red-headed krait",
  "Sind krait",
  "Large shield snake",
  "Lancehead",
  "Common lancehead",
  "Lora",
  "Grey Lora",
  "Lyre snake",
  "Baja California lyresnake",
  "Central American lyre snake",
  "Texas lyre snake",
  "Eastern lyre snake",
  "Machete savane",
  "Mamba",
  "Black mamba",
  "Green mamba",
  "Eastern green mamba",
  "Western green mamba",
  "Mamushi",
  "Mangrove snake",
  "Milk snake",
  "Moccasin snake",
  "Montpellier snake",
  "Mud snake",
  "Eastern mud snake",
  "Western mud snake",
  "Mussurana",
  "Night snake",
  "Cat-eyed night snake",
  "Texas night snake",
  "Nichell snake",
  "Narrowhead Garter Snake",
  "Nose-horned viper",
  "Rhinoceros viper",
  "Vipera ammodytes",
  "Parrot snake",
  "Mexican parrot snake",
  "Patchnose snake",
  "Perrotet's shieldtail snake",
  "Pine snake",
  "Pipe snake",
  "Asian pipe snake",
  "Dwarf pipe snake",
  "Red-tailed pipe snake",
  "Python",
  "African rock python",
  "Amethystine python",
  "Angolan python",
  "Australian scrub python",
  "Ball python",
  "Bismarck ringed python",
  "Black headed python",
  "Blood python",
  "Boelen python",
  "Borneo short-tailed python",
  "Bredl's python",
  "Brown water python",
  "Burmese python",
  "Calabar python",
  "Western carpet python",
  "Centralian carpet python",
  "Coastal carpet python",
  "Inland carpet python",
  "Jungle carpet python",
  "New Guinea carpet python",
  "Northwestern carpet python",
  "Southwestern carpet python",
  "Children's python",
  "Dauan Island water python",
  "Desert woma python",
  "Diamond python",
  "Flinders python",
  "Green tree python",
  "Halmahera python",
  "Indian python",
  "Indonesian water python",
  "Macklot's python",
  "Mollucan python",
  "Oenpelli python",
  "Olive python",
  "Papuan python",
  "Pygmy python",
  "Red blood python",
  "Reticulated python",
  "Kayaudi dwarf reticulated python",
  "Selayer reticulated python",
  "Rough-scaled python",
  "Royal python",
  "Savu python",
  "Spotted python",
  "Stimson's python",
  "Sumatran short-tailed python",
  "Tanimbar python",
  "Timor python",
  "Wetar Island python",
  "White-lipped python",
  "Brown white-lipped python",
  "Northern white-lipped python",
  "Southern white-lipped python",
  "Woma python",
  "Western woma python",
  "Queen snake",
  "Racer",
  "Bimini racer",
  "Buttermilk racer",
  "Eastern racer",
  "Eastern yellowbelly sad racer",
  "Mexican racer",
  "Southern black racer",
  "Tan racer",
  "West Indian racer",
  "Raddysnake",
  "Southwestern blackhead snake",
  "Rat snake",
  "Baird's rat snake",
  "Beauty rat snake",
  "Great Plains rat snake",
  "Green rat snake",
  "Japanese forest rat snake",
  "Japanese rat snake",
  "King rat snake",
  "Mandarin rat snake",
  "Persian rat snake",
  "Red-backed rat snake",
  "Twin-spotted rat snake",
  "Yellow-striped rat snake",
  "Manchurian Black Water Snake",
  "Rattlesnake",
  "Arizona black rattlesnake",
  "Aruba rattlesnake",
  "Chihuahuan ridge-nosed rattlesnake",
  "Coronado Island rattlesnake",
  "Durango rock rattlesnake",
  "Dusky pigmy rattlesnake",
  "Eastern diamondback rattlesnake",
  "Grand Canyon rattlesnake",
  "Great Basin rattlesnake",
  "Hopi rattlesnake",
  "Lance-headed rattlesnake",
  "Long-tailed rattlesnake",
  "Massasauga rattlesnake",
  "Mexican green rattlesnake",
  "Mexican west coast rattlesnake",
  "Midget faded rattlesnake",
  "Mojave rattlesnake",
  "Northern black-tailed rattlesnake",
  "Oaxacan small-headed rattlesnake",
  "Rattler",
  "Red diamond rattlesnake",
  "Southern Pacific rattlesnake",
  "Southwestern speckled rattlesnake",
  "Tancitaran dusky rattlesnake",
  "Tiger rattlesnake",
  "Timber rattlesnake",
  "Tropical rattlesnake",
  "Twin-spotted rattlesnake",
  "Uracoan rattlesnake",
  "Western diamondback rattlesnake",
  "Ribbon snake",
  "Rinkhals",
  "River jack",
  "Sea snake",
  "Annulated sea snake",
  "Beaked sea snake",
  "Dubois's sea snake",
  "Hardwicke's sea snake",
  "Hook Nosed Sea Snake",
  "Olive sea snake",
  "Pelagic sea snake",
  "Stoke's sea snake",
  "Yellow-banded sea snake",
  "Yellow-bellied sea snake",
  "Yellow-lipped sea snake",
  "Shield-tailed snake",
  "Sidewinder",
  "Colorado desert sidewinder",
  "Mojave desert sidewinder",
  "Sonoran sidewinder",
  "Small-eyed snake",
  "Smooth snake",
  "Brazilian smooth snake",
  "European smooth snake",
  "Stiletto snake",
  "Striped snake",
  "Japanese striped snake",
  "Sunbeam snake",
  "Taipan",
  "Central ranges taipan",
  "Coastal taipan",
  "Inland taipan",
  "Paupan taipan",
  "Tentacled snake",
  "Tic polonga",
  "Tiger snake",
  "Chappell Island tiger snake",
  "Common tiger snake",
  "Down's tiger snake",
  "Eastern tiger snake",
  "King Island tiger snake",
  "Krefft's tiger snake",
  "Peninsula tiger snake",
  "Tasmanian tiger snake",
  "Western tiger snake",
  "Tigre snake",
  "Tree snake",
  "Blanding's tree snake",
  "Blunt-headed tree snake",
  "Brown tree snake",
  "Long-nosed tree snake",
  "Many-banded tree snake",
  "Northern tree snake",
  "Trinket snake",
  "Black-banded trinket snake",
  "Twig snake",
  "African twig snake",
  "Twin Headed King Snake",
  "Titanboa",
  "Urutu",
  "Vine snake",
  "Asian Vine Snake, Whip Snake",
  "American Vine Snake",
  "Mexican vine snake",
  "Viper",
  "Asp viper",
  "Bamboo viper",
  "Bluntnose viper",
  "Brazilian mud Viper",
  "Burrowing viper",
  "Bush viper",
  "Great Lakes bush viper",
  "Hairy bush viper",
  "Nitsche's bush viper",
  "Rough-scaled bush viper",
  "Spiny bush viper",
  "Carpet viper",
  "Crossed viper",
  "Cyclades blunt-nosed viper",
  "Eyelash viper",
  "False horned viper",
  "Fea's viper",
  "Fifty pacer",
  "Gaboon viper",
  "Hognosed viper",
  "Horned desert viper",
  "Horned viper",
  "Jumping viper",
  "Kaznakov's viper",
  "Leaf-nosed viper",
  "Leaf viper",
  "Levant viper",
  "Long-nosed viper",
  "McMahon's viper",
  "Mole viper",
  "Nose-horned viper",
  "Rhinoceros viper",
  "Vipera ammodytes",
  "Palestine viper",
  "Pallas' viper",
  "Palm viper",
  "Amazonian palm viper",
  "Black-speckled palm-pitviper",
  "Eyelash palm-pitviper",
  "Green palm viper",
  "Mexican palm-pitviper",
  "Guatemalan palm viper",
  "Honduran palm viper",
  "Siamese palm viper",
  "Side-striped palm-pitviper",
  "Yellow-lined palm viper",
  "Pit viper",
  "Banded pitviper",
  "Bamboo pitviper",
  "Barbour's pit viper",
  "Black-tailed horned pit viper",
  "Bornean pitviper",
  "Brongersma's pitviper",
  "Brown spotted pitviper[4]",
  "Cantor's pitviper",
  "Elegant pitviper",
  "Eyelash pit viper",
  "Fan-Si-Pan horned pitviper",
  "Flat-nosed pitviper",
  "Godman's pit viper",
  "Green tree pit viper",
  "Habu pit viper",
  "Hagen's pitviper",
  "Horseshoe pitviper",
  "Jerdon's pitviper",
  "Kanburian pit viper",
  "Kaulback's lance-headed pitviper",
  "Kham Plateau pitviper",
  "Large-eyed pitviper",
  "Malabar rock pitviper",
  "Malayan pit viper",
  "Mangrove pit viper",
  "Mangshan pitviper",
  "Motuo bamboo pitviper",
  "Nicobar bamboo pitviper",
  "Philippine pitviper",
  "Pointed-scaled pit viper[5]",
  "Red-tailed bamboo pitviper",
  "Schultze's pitviper",
  "Stejneger's bamboo pitviper",
  "Sri Lankan pit viper",
  "Temple pit viper",
  "Tibetan bamboo pitviper",
  "Tiger pit viper",
  "Undulated pit viper",
  "Wagler's pit viper",
  "Wirot's pit viper",
  "Portuguese viper",
  "Saw-scaled viper",
  "Schlegel's viper",
  "Sedge viper",
  "Sharp-nosed viper",
  "Snorkel viper",
  "Temple viper",
  "Tree viper",
  "Chinese tree viper",
  "Guatemalan tree viper",
  "Hutton's tree viper",
  "Indian tree viper",
  "Large-scaled tree viper",
  "Malcolm's tree viper",
  "Nitsche's tree viper",
  "Pope's tree viper",
  "Rough-scaled tree viper",
  "Rungwe tree viper",
  "Sumatran tree viper",
  "White-lipped tree viper",
  "Ursini's viper",
  "Western hog-nosed viper",
  "Wart snake",
  "Water moccasin",
  "Water snake",
  "Bocourt's water snake",
  "Northern water snake",
  "Whip snake",
  "Long-nosed whip snake",
  "Wolf snake",
  "African wolf snake",
  "Barred wolf snake",
  "Worm snake",
  "Common worm snake",
  "Longnosed worm snake",
  "Wutu",
  "Yarara",
  "Zebra snake"
];

// src/modules/animal/constants/type.ts
var ANIMAL_TYPE = [
  "dog",
  "cat",
  "snake",
  "bear",
  "lion",
  "cetacean",
  "insect",
  "crocodilia",
  "cow",
  "bird",
  "fish",
  "rabbit",
  "horse"
];

// src/modules/animal/constants/bird.ts
var BIRD = [
  "Red-throated Loon",
  "Arctic Loon",
  "Pacific Loon",
  "Common Loon",
  "Yellow-billed Loon",
  "Least Grebe",
  "Pied-billed Grebe",
  "Horned Grebe",
  "Red-necked Grebe",
  "Eared Grebe",
  "Western Grebe",
  "Clark's Grebe",
  "Yellow-nosed Albatross",
  "Shy Albatross",
  "Black-browed Albatross",
  "Wandering Albatross",
  "Laysan Albatross",
  "Black-footed Albatross",
  "Short-tailed Albatross",
  "Northern Fulmar",
  "Herald Petrel",
  "Murphy's Petrel",
  "Mottled Petrel",
  "Black-capped Petrel",
  "Cook's Petrel",
  "Stejneger's Petrel",
  "White-chinned Petrel",
  "Streaked Shearwater",
  "Cory's Shearwater",
  "Pink-footed Shearwater",
  "Flesh-footed Shearwater",
  "Greater Shearwater",
  "Wedge-tailed Shearwater",
  "Buller's Shearwater",
  "Sooty Shearwater",
  "Short-tailed Shearwater",
  "Manx Shearwater",
  "Black-vented Shearwater",
  "Audubon's Shearwater",
  "Little Shearwater",
  "Wilson's Storm-Petrel",
  "White-faced Storm-Petrel",
  "European Storm-Petrel",
  "Fork-tailed Storm-Petrel",
  "Leach's Storm-Petrel",
  "Ashy Storm-Petrel",
  "Band-rumped Storm-Petrel",
  "Wedge-rumped Storm-Petrel",
  "Black Storm-Petrel",
  "Least Storm-Petrel",
  "White-tailed Tropicbird",
  "Red-billed Tropicbird",
  "Red-tailed Tropicbird",
  "Masked Booby",
  "Blue-footed Booby",
  "Brown Booby",
  "Red-footed Booby",
  "Northern Gannet",
  "American White Pelican",
  "Brown Pelican",
  "Brandt's Cormorant",
  "Neotropic Cormorant",
  "Double-crested Cormorant",
  "Great Cormorant",
  "Red-faced Cormorant",
  "Pelagic Cormorant",
  "Anhinga",
  "Magnificent Frigatebird",
  "Great Frigatebird",
  "Lesser Frigatebird",
  "American Bittern",
  "Yellow Bittern",
  "Least Bittern",
  "Great Blue Heron",
  "Great Egret",
  "Chinese Egret",
  "Little Egret",
  "Western Reef-Heron",
  "Snowy Egret",
  "Little Blue Heron",
  "Tricolored Heron",
  "Reddish Egret",
  "Cattle Egret",
  "Green Heron",
  "Black-crowned Night-Heron",
  "Yellow-crowned Night-Heron",
  "White Ibis",
  "Scarlet Ibis",
  "Glossy Ibis",
  "White-faced Ibis",
  "Roseate Spoonbill",
  "Jabiru",
  "Wood Stork",
  "Black Vulture",
  "Turkey Vulture",
  "California Condor",
  "Greater Flamingo",
  "Black-bellied Whistling-Duck",
  "Fulvous Whistling-Duck",
  "Bean Goose",
  "Pink-footed Goose",
  "Greater White-fronted Goose",
  "Lesser White-fronted Goose",
  "Emperor Goose",
  "Snow Goose",
  "Ross's Goose",
  "Canada Goose",
  "Brant",
  "Barnacle Goose",
  "Mute Swan",
  "Trumpeter Swan",
  "Tundra Swan",
  "Whooper Swan",
  "Muscovy Duck",
  "Wood Duck",
  "Gadwall",
  "Falcated Duck",
  "Eurasian Wigeon",
  "American Wigeon",
  "American Black Duck",
  "Mallard",
  "Mottled Duck",
  "Spot-billed Duck",
  "Blue-winged Teal",
  "Cinnamon Teal",
  "Northern Shoveler",
  "White-cheeked Pintail",
  "Northern Pintail",
  "Garganey",
  "Baikal Teal",
  "Green-winged Teal",
  "Canvasback",
  "Redhead",
  "Common Pochard",
  "Ring-necked Duck",
  "Tufted Duck",
  "Greater Scaup",
  "Lesser Scaup",
  "Steller's Eider",
  "Spectacled Eider",
  "King Eider",
  "Common Eider",
  "Harlequin Duck",
  "Labrador Duck",
  "Surf Scoter",
  "White-winged Scoter",
  "Black Scoter",
  "Oldsquaw",
  "Bufflehead",
  "Common Goldeneye",
  "Barrow's Goldeneye",
  "Smew",
  "Hooded Merganser",
  "Common Merganser",
  "Red-breasted Merganser",
  "Masked Duck",
  "Ruddy Duck",
  "Osprey",
  "Hook-billed Kite",
  "Swallow-tailed Kite",
  "White-tailed Kite",
  "Snail Kite",
  "Mississippi Kite",
  "Bald Eagle",
  "White-tailed Eagle",
  "Steller's Sea-Eagle",
  "Northern Harrier",
  "Sharp-shinned Hawk",
  "Cooper's Hawk",
  "Northern Goshawk",
  "Crane Hawk",
  "Gray Hawk",
  "Common Black-Hawk",
  "Harris's Hawk",
  "Roadside Hawk",
  "Red-shouldered Hawk",
  "Broad-winged Hawk",
  "Short-tailed Hawk",
  "Swainson's Hawk",
  "White-tailed Hawk",
  "Zone-tailed Hawk",
  "Red-tailed Hawk",
  "Ferruginous Hawk",
  "Rough-legged Hawk",
  "Golden Eagle",
  "Collared Forest-Falcon",
  "Crested Caracara",
  "Eurasian Kestrel",
  "American Kestrel",
  "Merlin",
  "Eurasian Hobby",
  "Aplomado Falcon",
  "Gyrfalcon",
  "Peregrine Falcon",
  "Prairie Falcon",
  "Plain Chachalaca",
  "Chukar",
  "Himalayan Snowcock",
  "Gray Partridge",
  "Ring-necked Pheasant",
  "Ruffed Grouse",
  "Sage Grouse",
  "Spruce Grouse",
  "Willow Ptarmigan",
  "Rock Ptarmigan",
  "White-tailed Ptarmigan",
  "Blue Grouse",
  "Sharp-tailed Grouse",
  "Greater Prairie-chicken",
  "Lesser Prairie-chicken",
  "Wild Turkey",
  "Mountain Quail",
  "Scaled Quail",
  "California Quail",
  "Gambel's Quail",
  "Northern Bobwhite",
  "Montezuma Quail",
  "Yellow Rail",
  "Black Rail",
  "Corn Crake",
  "Clapper Rail",
  "King Rail",
  "Virginia Rail",
  "Sora",
  "Paint-billed Crake",
  "Spotted Rail",
  "Purple Gallinule",
  "Azure Gallinule",
  "Common Moorhen",
  "Eurasian Coot",
  "American Coot",
  "Limpkin",
  "Sandhill Crane",
  "Common Crane",
  "Whooping Crane",
  "Double-striped Thick-knee",
  "Northern Lapwing",
  "Black-bellied Plover",
  "European Golden-Plover",
  "American Golden-Plover",
  "Pacific Golden-Plover",
  "Mongolian Plover",
  "Collared Plover",
  "Snowy Plover",
  "Wilson's Plover",
  "Common Ringed Plover",
  "Semipalmated Plover",
  "Piping Plover",
  "Little Ringed Plover",
  "Killdeer",
  "Mountain Plover",
  "Eurasian Dotterel",
  "Eurasian Oystercatcher",
  "American Oystercatcher",
  "Black Oystercatcher",
  "Black-winged Stilt",
  "Black-necked Stilt",
  "American Avocet",
  "Northern Jacana",
  "Common Greenshank",
  "Greater Yellowlegs",
  "Lesser Yellowlegs",
  "Marsh Sandpiper",
  "Spotted Redshank",
  "Wood Sandpiper",
  "Green Sandpiper",
  "Solitary Sandpiper",
  "Willet",
  "Wandering Tattler",
  "Gray-tailed Tattler",
  "Common Sandpiper",
  "Spotted Sandpiper",
  "Terek Sandpiper",
  "Upland Sandpiper",
  "Little Curlew",
  "Eskimo Curlew",
  "Whimbrel",
  "Bristle-thighed Curlew",
  "Far Eastern Curlew",
  "Slender-billed Curlew",
  "Eurasian Curlew",
  "Long-billed Curlew",
  "Black-tailed Godwit",
  "Hudsonian Godwit",
  "Bar-tailed Godwit",
  "Marbled Godwit",
  "Ruddy Turnstone",
  "Black Turnstone",
  "Surfbird",
  "Great Knot",
  "Red Knot",
  "Sanderling",
  "Semipalmated Sandpiper",
  "Western Sandpiper",
  "Red-necked Stint",
  "Little Stint",
  "Temminck's Stint",
  "Long-toed Stint",
  "Least Sandpiper",
  "White-rumped Sandpiper",
  "Baird's Sandpiper",
  "Pectoral Sandpiper",
  "Sharp-tailed Sandpiper",
  "Purple Sandpiper",
  "Rock Sandpiper",
  "Dunlin",
  "Curlew Sandpiper",
  "Stilt Sandpiper",
  "Spoonbill Sandpiper",
  "Broad-billed Sandpiper",
  "Buff-breasted Sandpiper",
  "Ruff",
  "Short-billed Dowitcher",
  "Long-billed Dowitcher",
  "Jack Snipe",
  "Common Snipe",
  "Pin-tailed Snipe",
  "Eurasian Woodcock",
  "American Woodcock",
  "Wilson's Phalarope",
  "Red-necked Phalarope",
  "Red Phalarope",
  "Oriental Pratincole",
  "Great Skua",
  "South Polar Skua",
  "Pomarine Jaeger",
  "Parasitic Jaeger",
  "Long-tailed Jaeger",
  "Laughing Gull",
  "Franklin's Gull",
  "Little Gull",
  "Black-headed Gull",
  "Bonaparte's Gull",
  "Heermann's Gull",
  "Band-tailed Gull",
  "Black-tailed Gull",
  "Mew Gull",
  "Ring-billed Gull",
  "California Gull",
  "Herring Gull",
  "Yellow-legged Gull",
  "Thayer's Gull",
  "Iceland Gull",
  "Lesser Black-backed Gull",
  "Slaty-backed Gull",
  "Yellow-footed Gull",
  "Western Gull",
  "Glaucous-winged Gull",
  "Glaucous Gull",
  "Great Black-backed Gull",
  "Sabine's Gull",
  "Black-legged Kittiwake",
  "Red-legged Kittiwake",
  "Ross's Gull",
  "Ivory Gull",
  "Gull-billed Tern",
  "Caspian Tern",
  "Royal Tern",
  "Elegant Tern",
  "Sandwich Tern",
  "Roseate Tern",
  "Common Tern",
  "Arctic Tern",
  "Forster's Tern",
  "Least Tern",
  "Aleutian Tern",
  "Bridled Tern",
  "Sooty Tern",
  "Large-billed Tern",
  "White-winged Tern",
  "Whiskered Tern",
  "Black Tern",
  "Brown Noddy",
  "Black Noddy",
  "Black Skimmer",
  "Dovekie",
  "Common Murre",
  "Thick-billed Murre",
  "Razorbill",
  "Great Auk",
  "Black Guillemot",
  "Pigeon Guillemot",
  "Long-billed Murrelet",
  "Marbled Murrelet",
  "Kittlitz's Murrelet",
  "Xantus's Murrelet",
  "Craveri's Murrelet",
  "Ancient Murrelet",
  "Cassin's Auklet",
  "Parakeet Auklet",
  "Least Auklet",
  "Whiskered Auklet",
  "Crested Auklet",
  "Rhinoceros Auklet",
  "Atlantic Puffin",
  "Horned Puffin",
  "Tufted Puffin",
  "Rock Dove",
  "Scaly-naped Pigeon",
  "White-crowned Pigeon",
  "Red-billed Pigeon",
  "Band-tailed Pigeon",
  "Oriental Turtle-Dove",
  "European Turtle-Dove",
  "Eurasian Collared-Dove",
  "Spotted Dove",
  "White-winged Dove",
  "Zenaida Dove",
  "Mourning Dove",
  "Passenger Pigeon",
  "Inca Dove",
  "Common Ground-Dove",
  "Ruddy Ground-Dove",
  "White-tipped Dove",
  "Key West Quail-Dove",
  "Ruddy Quail-Dove",
  "Budgerigar",
  "Monk Parakeet",
  "Carolina Parakeet",
  "Thick-billed Parrot",
  "White-winged Parakeet",
  "Red-crowned Parrot",
  "Common Cuckoo",
  "Oriental Cuckoo",
  "Black-billed Cuckoo",
  "Yellow-billed Cuckoo",
  "Mangrove Cuckoo",
  "Greater Roadrunner",
  "Smooth-billed Ani",
  "Groove-billed Ani",
  "Barn Owl",
  "Flammulated Owl",
  "Oriental Scops-Owl",
  "Western Screech-Owl",
  "Eastern Screech-Owl",
  "Whiskered Screech-Owl",
  "Great Horned Owl",
  "Snowy Owl",
  "Northern Hawk Owl",
  "Northern Pygmy-Owl",
  "Ferruginous Pygmy-Owl",
  "Elf Owl",
  "Burrowing Owl",
  "Mottled Owl",
  "Spotted Owl",
  "Barred Owl",
  "Great Gray Owl",
  "Long-eared Owl",
  "Short-eared Owl",
  "Boreal Owl",
  "Northern Saw-whet Owl",
  "Lesser Nighthawk",
  "Common Nighthawk",
  "Antillean Nighthawk",
  "Common Pauraque",
  "Common Poorwill",
  "Chuck-will's-widow",
  "Buff-collared Nightjar",
  "Whip-poor-will",
  "Jungle Nightjar",
  "Black Swift",
  "White-collared Swift",
  "Chimney Swift",
  "Vaux's Swift",
  "White-throated Needletail",
  "Common Swift",
  "Fork-tailed Swift",
  "White-throated Swift",
  "Antillean Palm Swift",
  "Green Violet-ear",
  "Green-breasted Mango",
  "Broad-billed Hummingbird",
  "White-eared Hummingbird",
  "Xantus's Hummingbird",
  "Berylline Hummingbird",
  "Buff-bellied Hummingbird",
  "Cinnamon Hummingbird",
  "Violet-crowned Hummingbird",
  "Blue-throated Hummingbird",
  "Magnificent Hummingbird",
  "Plain-capped Starthroat",
  "Bahama Woodstar",
  "Lucifer Hummingbird",
  "Ruby-throated Hummingbird",
  "Black-chinned Hummingbird",
  "Anna's Hummingbird",
  "Costa's Hummingbird",
  "Calliope Hummingbird",
  "Bumblebee Hummingbird",
  "Broad-tailed Hummingbird",
  "Rufous Hummingbird",
  "Allen's Hummingbird",
  "Elegant Trogon",
  "Eared Trogon",
  "Hoopoe",
  "Ringed Kingfisher",
  "Belted Kingfisher",
  "Green Kingfisher",
  "Eurasian Wryneck",
  "Lewis's Woodpecker",
  "Red-headed Woodpecker",
  "Acorn Woodpecker",
  "Gila Woodpecker",
  "Golden-fronted Woodpecker",
  "Red-bellied Woodpecker",
  "Williamson's Sapsucker",
  "Yellow-bellied Sapsucker",
  "Red-naped Sapsucker",
  "Red-breasted Sapsucker",
  "Great Spotted Woodpecker",
  "Ladder-backed Woodpecker",
  "Nuttall's Woodpecker",
  "Downy Woodpecker",
  "Hairy Woodpecker",
  "Strickland's Woodpecker",
  "Red-cockaded Woodpecker",
  "White-headed Woodpecker",
  "Three-toed Woodpecker",
  "Black-backed Woodpecker",
  "Northern Flicker",
  "Gilded Flicker",
  "Pileated Woodpecker",
  "Ivory-billed Woodpecker",
  "Northern Beardless-Tyrannulet",
  "Greenish Elaenia",
  "Caribbean Elaenia",
  "Tufted Flycatcher",
  "Olive-sided Flycatcher",
  "Greater Pewee",
  "Western Wood-Pewee",
  "Eastern Wood-Pewee",
  "Yellow-bellied Flycatcher",
  "Acadian Flycatcher",
  "Alder Flycatcher",
  "Willow Flycatcher",
  "Least Flycatcher",
  "Hammond's Flycatcher",
  "Dusky Flycatcher",
  "Gray Flycatcher",
  "Pacific-slope Flycatcher",
  "Cordilleran Flycatcher",
  "Buff-breasted Flycatcher",
  "Black Phoebe",
  "Eastern Phoebe",
  "Say's Phoebe",
  "Vermilion Flycatcher",
  "Dusky-capped Flycatcher",
  "Ash-throated Flycatcher",
  "Nutting's Flycatcher",
  "Great Crested Flycatcher",
  "Brown-crested Flycatcher",
  "La Sagra's Flycatcher",
  "Great Kiskadee",
  "Sulphur-bellied Flycatcher",
  "Variegated Flycatcher",
  "Tropical Kingbird",
  "Couch's Kingbird",
  "Cassin's Kingbird",
  "Thick-billed Kingbird",
  "Western Kingbird",
  "Eastern Kingbird",
  "Gray Kingbird",
  "Loggerhead Kingbird",
  "Scissor-tailed Flycatcher",
  "Fork-tailed Flycatcher",
  "Rose-throated Becard",
  "Masked Tityra",
  "Brown Shrike",
  "Loggerhead Shrike",
  "Northern Shrike",
  "White-eyed Vireo",
  "Thick-billed Vireo",
  "Bell's Vireo",
  "Black-capped Vireo",
  "Gray Vireo",
  "Yellow-throated Vireo",
  "Plumbeous Vireo",
  "Cassin's Vireo",
  "Blue-headed Vireo",
  "Hutton's Vireo",
  "Warbling Vireo",
  "Philadelphia Vireo",
  "Red-eyed Vireo",
  "Yellow-green Vireo",
  "Black-whiskered Vireo",
  "Yucatan Vireo",
  "Gray Jay",
  "Steller's Jay",
  "Blue Jay",
  "Green Jay",
  "Brown Jay",
  "Florida Scrub-Jay",
  "Island Scrub-Jay",
  "Western Scrub-Jay",
  "Mexican Jay",
  "Pinyon Jay",
  "Clark's Nutcracker",
  "Black-billed Magpie",
  "Yellow-billed Magpie",
  "Eurasian Jackdaw",
  "American Crow",
  "Northwestern Crow",
  "Tamaulipas Crow",
  "Fish Crow",
  "Chihuahuan Raven",
  "Common Raven",
  "Sky Lark",
  "Horned Lark",
  "Purple Martin",
  "Cuban Martin",
  "Gray-breasted Martin",
  "Southern Martin",
  "Brown-chested Martin",
  "Tree Swallow",
  "Violet-green Swallow",
  "Bahama Swallow",
  "Northern Rough-winged Swallow",
  "Bank Swallow",
  "Cliff Swallow",
  "Cave Swallow",
  "Barn Swallow",
  "Common House-Martin",
  "Carolina Chickadee",
  "Black-capped Chickadee",
  "Mountain Chickadee",
  "Mexican Chickadee",
  "Chestnut-backed Chickadee",
  "Boreal Chickadee",
  "Gray-headed Chickadee",
  "Bridled Titmouse",
  "Oak Titmouse",
  "Juniper Titmouse",
  "Tufted Titmouse",
  "Verdin",
  "Bushtit",
  "Red-breasted Nuthatch",
  "White-breasted Nuthatch",
  "Pygmy Nuthatch",
  "Brown-headed Nuthatch",
  "Brown Creeper",
  "Cactus Wren",
  "Rock Wren",
  "Canyon Wren",
  "Carolina Wren",
  "Bewick's Wren",
  "House Wren",
  "Winter Wren",
  "Sedge Wren",
  "Marsh Wren",
  "American Dipper",
  "Red-whiskered Bulbul",
  "Golden-crowned Kinglet",
  "Ruby-crowned Kinglet",
  "Middendorff's Grasshopper-Warbler",
  "Lanceolated Warbler",
  "Wood Warbler",
  "Dusky Warbler",
  "Arctic Warbler",
  "Blue-gray Gnatcatcher",
  "California Gnatcatcher",
  "Black-tailed Gnatcatcher",
  "Black-capped Gnatcatcher",
  "Narcissus Flycatcher",
  "Mugimaki Flycatcher",
  "Red-breasted Flycatcher",
  "Siberian Flycatcher",
  "Gray-spotted Flycatcher",
  "Asian Brown Flycatcher",
  "Siberian Rubythroat",
  "Bluethroat",
  "Siberian Blue Robin",
  "Red-flanked Bluetail",
  "Northern Wheatear",
  "Stonechat",
  "Eastern Bluebird",
  "Western Bluebird",
  "Mountain Bluebird",
  "Townsend's Solitaire",
  "Veery",
  "Gray-cheeked Thrush",
  "Bicknell's Thrush",
  "Swainson's Thrush",
  "Hermit Thrush",
  "Wood Thrush",
  "Eurasian Blackbird",
  "Eyebrowed Thrush",
  "Dusky Thrush",
  "Fieldfare",
  "Redwing",
  "Clay-colored Robin",
  "White-throated Robin",
  "Rufous-backed Robin",
  "American Robin",
  "Varied Thrush",
  "Aztec Thrush",
  "Wrentit",
  "Gray Catbird",
  "Black Catbird",
  "Northern Mockingbird",
  "Bahama Mockingbird",
  "Sage Thrasher",
  "Brown Thrasher",
  "Long-billed Thrasher",
  "Bendire's Thrasher",
  "Curve-billed Thrasher",
  "California Thrasher",
  "Crissal Thrasher",
  "Le Conte's Thrasher",
  "Blue Mockingbird",
  "European Starling",
  "Crested Myna",
  "Siberian Accentor",
  "Yellow Wagtail",
  "Citrine Wagtail",
  "Gray Wagtail",
  "White Wagtail",
  "Black-backed Wagtail",
  "Tree Pipit",
  "Olive-backed Pipit",
  "Pechora Pipit",
  "Red-throated Pipit",
  "American Pipit",
  "Sprague's Pipit",
  "Bohemian Waxwing",
  "Cedar Waxwing",
  "Gray Silky-flycatcher",
  "Phainopepla",
  "Olive Warbler",
  "Bachman's Warbler",
  "Blue-winged Warbler",
  "Golden-winged Warbler",
  "Tennessee Warbler",
  "Orange-crowned Warbler",
  "Nashville Warbler",
  "Virginia's Warbler",
  "Colima Warbler",
  "Lucy's Warbler",
  "Crescent-chested Warbler",
  "Northern Parula",
  "Tropical Parula",
  "Yellow Warbler",
  "Chestnut-sided Warbler",
  "Magnolia Warbler",
  "Cape May Warbler",
  "Black-throated Blue Warbler",
  "Yellow-rumped Warbler",
  "Black-throated Gray Warbler",
  "Golden-cheeked Warbler",
  "Black-throated Green Warbler",
  "Townsend's Warbler",
  "Hermit Warbler",
  "Blackburnian Warbler",
  "Yellow-throated Warbler",
  "Grace's Warbler",
  "Pine Warbler",
  "Kirtland's Warbler",
  "Prairie Warbler",
  "Palm Warbler",
  "Bay-breasted Warbler",
  "Blackpoll Warbler",
  "Cerulean Warbler",
  "Black-and-white Warbler",
  "American Redstart",
  "Prothonotary Warbler",
  "Worm-eating Warbler",
  "Swainson's Warbler",
  "Ovenbird",
  "Northern Waterthrush",
  "Louisiana Waterthrush",
  "Kentucky Warbler",
  "Connecticut Warbler",
  "Mourning Warbler",
  "MacGillivray's Warbler",
  "Common Yellowthroat",
  "Gray-crowned Yellowthroat",
  "Hooded Warbler",
  "Wilson's Warbler",
  "Canada Warbler",
  "Red-faced Warbler",
  "Painted Redstart",
  "Slate-throated Redstart",
  "Fan-tailed Warbler",
  "Golden-crowned Warbler",
  "Rufous-capped Warbler",
  "Yellow-breasted Chat",
  "Bananaquit",
  "Hepatic Tanager",
  "Summer Tanager",
  "Scarlet Tanager",
  "Western Tanager",
  "Flame-colored Tanager",
  "Stripe-headed Tanager",
  "White-collared Seedeater",
  "Yellow-faced Grassquit",
  "Black-faced Grassquit",
  "Olive Sparrow",
  "Green-tailed Towhee",
  "Spotted Towhee",
  "Eastern Towhee",
  "Canyon Towhee",
  "California Towhee",
  "Abert's Towhee",
  "Rufous-winged Sparrow",
  "Cassin's Sparrow",
  "Bachman's Sparrow",
  "Botteri's Sparrow",
  "Rufous-crowned Sparrow",
  "Five-striped Sparrow",
  "American Tree Sparrow",
  "Chipping Sparrow",
  "Clay-colored Sparrow",
  "Brewer's Sparrow",
  "Field Sparrow",
  "Worthen's Sparrow",
  "Black-chinned Sparrow",
  "Vesper Sparrow",
  "Lark Sparrow",
  "Black-throated Sparrow",
  "Sage Sparrow",
  "Lark Bunting",
  "Savannah Sparrow",
  "Grasshopper Sparrow",
  "Baird's Sparrow",
  "Henslow's Sparrow",
  "Le Conte's Sparrow",
  "Nelson's Sharp-tailed Sparrow",
  "Saltmarsh Sharp-tailed Sparrow",
  "Seaside Sparrow",
  "Fox Sparrow",
  "Song Sparrow",
  "Lincoln's Sparrow",
  "Swamp Sparrow",
  "White-throated Sparrow",
  "Harris's Sparrow",
  "White-crowned Sparrow",
  "Golden-crowned Sparrow",
  "Dark-eyed Junco",
  "Yellow-eyed Junco",
  "McCown's Longspur",
  "Lapland Longspur",
  "Smith's Longspur",
  "Chestnut-collared Longspur",
  "Pine Bunting",
  "Little Bunting",
  "Rustic Bunting",
  "Yellow-breasted Bunting",
  "Gray Bunting",
  "Pallas's Bunting",
  "Reed Bunting",
  "Snow Bunting",
  "McKay's Bunting",
  "Crimson-collared Grosbeak",
  "Northern Cardinal",
  "Pyrrhuloxia",
  "Yellow Grosbeak",
  "Rose-breasted Grosbeak",
  "Black-headed Grosbeak",
  "Blue Bunting",
  "Blue Grosbeak",
  "Lazuli Bunting",
  "Indigo Bunting",
  "Varied Bunting",
  "Painted Bunting",
  "Dickcissel",
  "Bobolink",
  "Red-winged Blackbird",
  "Tricolored Blackbird",
  "Tawny-shouldered Blackbird",
  "Eastern Meadowlark",
  "Western Meadowlark",
  "Yellow-headed Blackbird",
  "Rusty Blackbird",
  "Brewer's Blackbird",
  "Common Grackle",
  "Boat-tailed Grackle",
  "Great-tailed Grackle",
  "Shiny Cowbird",
  "Bronzed Cowbird",
  "Brown-headed Cowbird",
  "Black-vented Oriole",
  "Orchard Oriole",
  "Hooded Oriole",
  "Streak-backed Oriole",
  "Spot-breasted Oriole",
  "Altamira Oriole",
  "Audubon's Oriole",
  "Baltimore Oriole",
  "Bullock's Oriole",
  "Scott's Oriole",
  "Common Chaffinch",
  "Brambling",
  "Gray-crowned Rosy-Finch",
  "Black Rosy-Finch",
  "Brown-capped Rosy-Finch",
  "Pine Grosbeak",
  "Common Rosefinch",
  "Purple Finch",
  "Cassin's Finch",
  "House Finch",
  "Red Crossbill",
  "White-winged Crossbill",
  "Common Redpoll",
  "Hoary Redpoll",
  "Eurasian Siskin",
  "Pine Siskin",
  "Lesser Goldfinch",
  "Lawrence's Goldfinch",
  "American Goldfinch",
  "Oriental Greenfinch",
  "Eurasian Bullfinch",
  "Evening Grosbeak",
  "Hawfinch",
  "House Sparrow",
  "Eurasian Tree Sparrow"
];

// src/modules/animal/constants/fish.ts
var FISH = [
  "Grass carp",
  "Peruvian anchoveta",
  "Silver carp",
  "Common carp",
  "Asari",
  "Japanese littleneck",
  "Filipino Venus",
  "Japanese cockle",
  "Alaska pollock",
  "Nile tilapia",
  "Whiteleg shrimp",
  "Bighead carp",
  "Skipjack tuna",
  "Catla",
  "Crucian carp",
  "Atlantic salmon",
  "Atlantic herring",
  "Chub mackerel",
  "Rohu",
  "Yellowfin tuna",
  "Japanese anchovy",
  "Largehead hairtail",
  "Atlantic cod",
  "European pilchard",
  "Capelin",
  "Jumbo flying squid",
  "Milkfish",
  "Atlantic mackerel",
  "Rainbow trout",
  "Araucanian herring",
  "Wuchang bream",
  "Gulf menhaden",
  "Indian oil sardine",
  "Black carp",
  "European anchovy",
  "Northern snakehead",
  "Pacific cod",
  "Pacific saury",
  "Pacific herring",
  "Bigeye tuna",
  "Chilean jack mackerel",
  "Yellow croaker",
  "Haddock",
  "Gazami crab",
  "Amur catfish",
  "Japanese common catfish",
  "European sprat",
  "Pink salmon",
  "Mrigal carp",
  "Channel catfish",
  "Blood cockle",
  "Blue whiting",
  "Hilsa shad",
  "Daggertooth pike conger",
  "California pilchard",
  "Cape horse mackerel",
  "Pacific anchoveta",
  "Japanese flying squid",
  "Pollock",
  "Chinese softshell turtle",
  "Kawakawa",
  "Indian mackerel",
  "Asian swamp eel",
  "Argentine hake",
  "Short mackerel",
  "Southern rough shrimp",
  "Southern African anchovy",
  "Pond loach",
  "Iridescent shark",
  "Mandarin fish",
  "Chinese perch",
  "Nile perch",
  "Round sardinella",
  "Japanese pilchard",
  "Bombay-duck",
  "Yellowhead catfish",
  "Korean bullhead",
  "Narrow-barred Spanish mackerel",
  "Albacore",
  "Madeiran sardinella",
  "Bonga shad",
  "Silver cyprinid",
  "Nile tilapia",
  "Longtail tuna",
  "Atlantic menhaden",
  "North Pacific hake",
  "Atlantic horse mackerel",
  "Japanese jack mackerel",
  "Pacific thread herring",
  "Bigeye scad",
  "Yellowstripe scad",
  "Chum salmon",
  "Blue swimming crab",
  "Pacific sand lance",
  "Pacific sandlance",
  "Goldstripe sardinella"
];

// src/modules/animal/index.ts
var AnimalModule = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "constants", {
      animalTypes: ANIMAL_TYPE,
      bears: BEAR,
      birds: BIRD,
      cats: CAT,
      ceteceans: CETACEAN,
      cows: COW,
      cocodrilas: CROCODILIA,
      dogs: DOG,
      hourses: HORSE,
      insects: INSECT,
      lions: LION,
      rabbits: RABBIT,
      rodents: RODENT,
      snakes: SNAKE,
      fishes: FISH
    });
  }
  /**
   * Returns a dog breed
   * @example modules.animal.dog() // 'Irish Water Spaniel'
   * @returns string
   */
  dog() {
    return this.utils.oneOfArray(DOG);
  }
  /**
   * Returns a bear breed
   * @example modules.animal.bear() // 'Singapuria'
   * @returns string
   */
  bear() {
    return this.utils.oneOfArray(BEAR);
  }
  /**
   * Returns a bird breed
   * @example modules.animal.bird() // 'Singapuria'
   * @returns string
   */
  bird() {
    return this.utils.oneOfArray(BIRD);
  }
  /**
   * Returns a cat breed
   * @example modules.animal.cat() // 'Bengal'
   * @returns string
   */
  cat() {
    return this.utils.oneOfArray(CAT);
  }
  /**
   * Returns a cetacean breed
   * @example modules.animal.cetacean() // 'Spinner Dolphin'
   * @returns string
   */
  cetacean() {
    return this.utils.oneOfArray(CETACEAN);
  }
  /**
   * Returns a cow breed
   * @example modules.animal.cow() // 'Brava'
   * @returns string
   */
  cow() {
    return this.utils.oneOfArray(COW);
  }
  /**
   * Returns a crocodilia breed
   * @example modules.animal.crocodilia() // 'Philippine Crocodile'
   * @returns string
   */
  crocodilia() {
    return this.utils.oneOfArray(CROCODILIA);
  }
  /**
   * Returns a fish breed
   * @example modules.animal.fish() // 'Mandarin fish'
   * @returns string
   */
  fish() {
    return this.utils.oneOfArray(FISH);
  }
  /**
   * Returns a horse breed
   * @example modules.animal.horse() // 'Swedish Warmblood'
   * @returns string
   */
  horse() {
    return this.utils.oneOfArray(HORSE);
  }
  /**
   * Returns a insect breed
   * @example modules.animal.insect() // 'Pyramid ant'
   * @returns string
   */
  insect() {
    return this.utils.oneOfArray(INSECT);
  }
  /**
   * Returns a lion breed
   * @example modules.animal.lion() // 'Northeast Congo Lion'
   * @returns string
   */
  lion() {
    return this.utils.oneOfArray(LION);
  }
  /**
   * Returns a rabbit breed
   * @example modules.animal.rabbit() // 'Florida White'
   * @returns string
   */
  rabbit() {
    return this.utils.oneOfArray(RABBIT);
  }
  /**
   * Returns a rodent breed
   * @example modules.animal.rodent() // 'Cuscomys ashanika'
   * @returns string
   */
  rodent() {
    return this.utils.oneOfArray(RODENT);
  }
  /**
   * Returns a snake breed
   * @example modules.animal.snake() // 'Eyelash viper'
   * @returns string
   */
  snake() {
    return this.utils.oneOfArray(SNAKE);
  }
  /**
   * Returns an animal type
   * @example modules.animal.type() // 'Singapuria'
   * @returns string
   */
  type() {
    return this.utils.oneOfArray(ANIMAL_TYPE);
  }
};

// src/modules/science/constants/periodic-table.ts
var PERIODIC_TABLE_ELEMENTS = [
  { symbol: "H", name: "Hydrogen" },
  { symbol: "He", name: "Helium" },
  { symbol: "Li", name: "Lithium" },
  { symbol: "Be", name: "Beryllium" },
  { symbol: "B", name: "Boron" },
  { symbol: "C", name: "Carbon" },
  { symbol: "N", name: "Nitrogen" },
  { symbol: "O", name: "Oxygen" },
  { symbol: "F", name: "Fluorine" },
  { symbol: "Ne", name: "Neon" },
  { symbol: "Na", name: "Sodium" },
  { symbol: "Mg", name: "Magnesium" },
  { symbol: "Al", name: "Aluminum" },
  { symbol: "Si", name: "Silicon" },
  { symbol: "P", name: "Phosphorus" },
  { symbol: "S", name: "Sulfur" },
  { symbol: "Cl", name: "Chlorine" },
  { symbol: "Ar", name: "Argon" },
  { symbol: "K", name: "Potassium" },
  { symbol: "Ca", name: "Calcium" },
  { symbol: "Sc", name: "Scandium" },
  { symbol: "Ti", name: "Titanium" },
  { symbol: "V", name: "Vanadium" },
  { symbol: "Cr", name: "Chromium" },
  { symbol: "Mn", name: "Manganese" },
  { symbol: "Fe", name: "Iron" },
  { symbol: "Co", name: "Cobalt" },
  { symbol: "Ni", name: "Nickel" },
  { symbol: "Cu", name: "Copper" },
  { symbol: "Zn", name: "Zinc" },
  { symbol: "Ga", name: "Gallium" },
  { symbol: "Ge", name: "Germanium" },
  { symbol: "As", name: "Arsenic" },
  { symbol: "Se", name: "Selenium" },
  { symbol: "Br", name: "Bromine" },
  { symbol: "Kr", name: "Krypton" },
  { symbol: "Rb", name: "Rubidium" },
  { symbol: "Sr", name: "Strontium" },
  { symbol: "Y", name: "Yttrium" },
  { symbol: "Zr", name: "Zirconium" },
  { symbol: "Nb", name: "Niobium" },
  { symbol: "Mo", name: "Molybdenum" },
  { symbol: "Tc", name: "Technetium" },
  { symbol: "Ru", name: "Ruthenium" },
  { symbol: "Rh", name: "Rhodium" },
  { symbol: "Pd", name: "Palladium" },
  { symbol: "Ag", name: "Silver" },
  { symbol: "Cd", name: "Cadmium" },
  { symbol: "In", name: "Indium" },
  { symbol: "Sn", name: "Tin" },
  { symbol: "Sb", name: "Antimony" },
  { symbol: "Te", name: "Tellurium" },
  { symbol: "I", name: "Iodine" },
  { symbol: "Xe", name: "Xenon" },
  { symbol: "Cs", name: "Cesium" },
  { symbol: "Ba", name: "Barium" },
  { symbol: "La", name: "Lanthanum" },
  { symbol: "Ce", name: "Cerium" },
  { symbol: "Pr", name: "Praseodymium" },
  { symbol: "Nd", name: "Neodymium" },
  { symbol: "Pm", name: "Promethium" },
  { symbol: "Sm", name: "Samarium" },
  { symbol: "Eu", name: "Europium" },
  { symbol: "Gd", name: "Gadolinium" },
  { symbol: "Tb", name: "Terbium" },
  { symbol: "Dy", name: "Dysprosium" },
  { symbol: "Ho", name: "Holmium" },
  { symbol: "Er", name: "Erbium" },
  { symbol: "Tm", name: "Thulium" },
  { symbol: "Yb", name: "Ytterbium" },
  { symbol: "Lu", name: "Lutetium" },
  { symbol: "Hf", name: "Hafnium" },
  { symbol: "Ta", name: "Tantalum" },
  { symbol: "W", name: "Tungsten" },
  { symbol: "Re", name: "Rhenium" },
  { symbol: "Os", name: "Osmium" },
  { symbol: "Ir", name: "Iridium" },
  { symbol: "Pt", name: "Platinum" },
  { symbol: "Au", name: "Gold" },
  { symbol: "Hg", name: "Mercury" },
  { symbol: "Tl", name: "Thallium" },
  { symbol: "Pb", name: "Lead" },
  { symbol: "Bi", name: "Bismuth" },
  { symbol: "Po", name: "Polonium" },
  { symbol: "At", name: "Astatine" },
  { symbol: "Rn", name: "Radon" },
  { symbol: "Fr", name: "Francium" },
  { symbol: "Ra", name: "Radium" },
  { symbol: "Ac", name: "Actinium" },
  { symbol: "Th", name: "Thorium" },
  { symbol: "Pa", name: "Protactinium" },
  { symbol: "U", name: "Uranium" },
  { symbol: "Np", name: "Neptunium" },
  { symbol: "Pu", name: "Plutonium" },
  { symbol: "Am", name: "Americium" },
  { symbol: "Cm", name: "Curium" },
  { symbol: "Bk", name: "Berkelium" },
  { symbol: "Cf", name: "Californium" },
  { symbol: "Es", name: "Einsteinium" },
  { symbol: "Fm", name: "Fermium" },
  { symbol: "Md", name: "Mendelevium" },
  { symbol: "No", name: "Nobelium" },
  { symbol: "Lr", name: "Lawrencium" },
  { symbol: "Rf", name: "Rutherfordium" },
  { symbol: "Db", name: "Dubnium" },
  { symbol: "Sg", name: "Seaborgium" },
  { symbol: "Bh", name: "Bohrium" },
  { symbol: "Hs", name: "Hassium" },
  { symbol: "Mt", name: "Meitnerium" }
];

// src/modules/science/constants/units.ts
var UNITS = [
  {
    key: "length",
    unit: "meter (m)",
    symbol: "m"
  },
  {
    key: "mass",
    unit: "kilogram (kg)",
    symbol: "kg"
  },
  {
    key: "time",
    unit: "second (s)",
    symbol: "s"
  },
  {
    key: "electric current",
    unit: "ampere (A)",
    symbol: "a"
  },
  {
    key: "thermodynamic temperature",
    unit: "kelvin (K)",
    symbol: "K"
  },
  {
    key: "amount of substance",
    unit: "mole (mol)",
    symbol: "mol"
  },
  {
    key: "luminous intensity",
    unit: "candela (cd)",
    symbol: "cd"
  },
  {
    key: "plane angle",
    unit: "radian (rad)",
    symbol: "rad"
  },
  {
    key: "solid angle",
    unit: "steradian (sr)",
    symbol: "sr"
  },
  {
    key: "frequency",
    unit: "hertz (Hz)",
    symbol: "Hz"
  },
  {
    key: "force",
    unit: "newton (N)",
    symbol: "N"
  },
  {
    key: "pressure, stress",
    unit: "pascal (Pa)",
    symbol: "Pa"
  },
  {
    key: "energy, work, quantity of heat",
    unit: "joule (J)",
    symbol: "J"
  },
  {
    key: "power, radiant flux",
    unit: "watt (W)",
    symbol: "W"
  },
  {
    key: "electric charge, quantity of electricity",
    unit: "coulomb (C)",
    symbol: "C"
  },
  {
    key: "electric potential difference, electromotive force",
    unit: "volt (V)",
    symbol: "V"
  },
  {
    key: "electric resistance",
    unit: "ohm (\u03A9)",
    symbol: "\u03A9"
  },
  {
    key: "electric conductance",
    unit: "siemens (S)",
    symbol: "S"
  },
  {
    key: "magnetic flux",
    unit: "weber (Wb)",
    symbol: "Wb"
  },
  {
    key: "magnetic flux density",
    unit: "tesla (T)",
    symbol: "T"
  },
  {
    key: "inductance",
    unit: "henry (H)",
    symbol: "H"
  },
  {
    key: "luminous flux",
    unit: "lumen (lm)",
    symbol: "lm"
  },
  {
    key: "illuminance",
    unit: "lux (lx)",
    symbol: "lx"
  },
  {
    key: "activity (of a radionuclide)",
    unit: "becquerel (Bq)",
    symbol: "Bq"
  },
  {
    key: "absorbed dose, specific energy (imparted), kerma",
    unit: "gray (Gy)",
    symbol: "Gy"
  },
  {
    key: "dose equiunitent",
    unit: "sievert (Sv)",
    symbol: "Sv"
  },
  {
    key: "catalytic activity",
    unit: "katal (kat)",
    symbol: "kat"
  }
];

// src/modules/science/index.ts
var ScienceModule = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "constants", {
      units: UNITS,
      periodicTableElements: PERIODIC_TABLE_ELEMENTS
    });
  }
  /**
   * Returns periodic table element
   * @param args.type Element format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example
   * modules.science.periodicTableElement() // 'Curium'
   * modules.science.periodicTableElement({ type: 'symbol' }) // 'Zn'
   *
   * @returns string
   */
  periodicTableElement({ type = "name" } = {}) {
    if (type === "name") {
      return this.utils.oneOfArray(
        this.constants.periodicTableElements.map((e) => e.name)
      );
    }
    return this.utils.oneOfArray(
      this.constants.periodicTableElements.map((e) => e.symbol)
    );
  }
  /**
   * Returns a unit of measurement
   *
   * @param args.type Unit format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example
   * modules.science.unit() // 'hertz (Hz)'
   * modules.science.unit({ type: 'symbol' }) // 'N'
   * @returns string
   */
  unit({ type = "name" } = {}) {
    if (type === "symbol") {
      return this.utils.oneOfArray(UNITS.map((el) => el.symbol));
    }
    return this.utils.oneOfArray(UNITS.map((el) => el.unit));
  }
};

// src/modules/word/core/english.ts
var ENGLISH_WORDS = {
  verbs: [
    "been",
    "had",
    "done",
    "be",
    "have",
    "say",
    "get",
    "make",
    "go",
    "know",
    "take",
    "see",
    "come",
    "think",
    "look",
    "want",
    "give",
    "use",
    "find",
    "ask",
    "work",
    "seem",
    "feel",
    "try",
    "leave",
    "call"
  ],
  conjuctions: [
    "for",
    "and",
    "nor",
    "but",
    "or",
    "yet",
    "so",
    "althoungh",
    "though",
    "while",
    "id",
    "until",
    "whether",
    "after",
    "before",
    "since",
    "when",
    "where",
    "how",
    "than"
  ],
  interjections: ["hey!", "oh", "good!", "yes!", "indeed", "ah!"],
  prepositions: [
    "at",
    "for",
    "in",
    "from",
    "to",
    "off",
    "on",
    "over",
    "under",
    "into",
    "upon",
    "onto",
    "without",
    "given",
    "provided",
    "during"
  ],
  adverbs: [
    "slowly",
    "rapidly",
    "clusmsily",
    "badly",
    "sadly",
    "here",
    "there",
    "north",
    "down",
    "anywhere",
    "forward",
    "close",
    "always",
    "usually",
    "normally",
    "really",
    "quite"
  ],
  adjectives: [
    "clever",
    "little",
    "lazy",
    "quite",
    "large",
    "honest",
    "beautiful",
    "aggressive",
    "ashamed",
    "meaningless",
    "nicer",
    "cool",
    "messy",
    "delicious",
    "salty",
    "sweet",
    "yummy",
    "fry",
    "hard",
    "icy",
    "wet",
    "loud",
    "silent",
    "soft",
    "fat",
    "long",
    "huge",
    "flat",
    "low",
    "fast",
    "young",
    "regular",
    "manic",
    "tedious"
  ],
  nouns: [
    "aardvark",
    "abacus",
    "abbey",
    "abbreviation",
    "abdomen",
    "ability",
    "abnormality",
    "abolishment",
    "abortion",
    "abrogation",
    "absence",
    "abundance",
    "abuse",
    "academics",
    "academy",
    "accelerant",
    "accelerator",
    "accent",
    "acceptance",
    "access",
    "accessory",
    "accident",
    "accommodation",
    "accompanist",
    "accomplishment",
    "accord",
    "accordance",
    "accordion",
    "account",
    "accountability",
    "accountant",
    "accounting",
    "accuracy",
    "accusation",
    "acetate",
    "achievement",
    "achiever",
    "acid",
    "acknowledgment",
    "acorn",
    "acoustics",
    "acquaintance",
    "acquisition",
    "acre",
    "acrylic",
    "act",
    "action",
    "activation",
    "activist",
    "activity",
    "actor",
    "actress",
    "acupuncture",
    "ad",
    "adaptation",
    "adapter",
    "addiction",
    "addition",
    "address",
    "adjective",
    "adjustment",
    "admin",
    "administration",
    "administrator",
    "admire",
    "admission",
    "adobe",
    "adoption",
    "adrenalin",
    "adrenaline",
    "adult",
    "adulthood",
    "advance",
    "advancement",
    "advantage",
    "advent",
    "adverb",
    "advertisement",
    "advertising",
    "advice",
    "adviser",
    "advocacy",
    "advocate",
    "affair",
    "affect",
    "affidavit",
    "affiliate",
    "affinity",
    "afoul",
    "afterlife",
    "aftermath",
    "afternoon",
    "aftershave",
    "aftershock",
    "afterthought",
    "age",
    "agency",
    "agenda",
    "agent",
    "aggradation",
    "aggression",
    "aglet",
    "agony",
    "agreement",
    "agriculture",
    "aid",
    "aide",
    "aim",
    "air",
    "airbag",
    "airbus",
    "aircraft",
    "airfare",
    "airfield",
    "airforce",
    "airline",
    "airmail",
    "airman",
    "airplane",
    "airport",
    "airship",
    "airspace",
    "alarm",
    "alb",
    "albatross",
    "album",
    "alcohol",
    "alcove",
    "alder",
    "ale",
    "alert",
    "alfalfa",
    "algebra",
    "algorithm",
    "alias",
    "alibi",
    "alien",
    "allegation",
    "allergist",
    "alley",
    "alliance",
    "alligator",
    "allocation",
    "allowance",
    "alloy",
    "alluvium",
    "almanac",
    "almighty",
    "almond",
    "alpaca",
    "alpenglow",
    "alpenhorn",
    "alpha",
    "alphabet",
    "altar",
    "alteration",
    "alternative",
    "altitude",
    "alto",
    "aluminium",
    "aluminum",
    "amazement",
    "amazon",
    "ambassador",
    "amber",
    "ambience",
    "ambiguity",
    "ambition",
    "ambulance",
    "amendment",
    "amenity",
    "ammunition",
    "amnesty",
    "amount",
    "amusement",
    "anagram",
    "analgesia",
    "analog",
    "analogue",
    "analogy",
    "analysis",
    "analyst",
    "analytics",
    "anarchist",
    "anarchy",
    "anatomy",
    "ancestor",
    "anchovy",
    "android",
    "anesthesiologist",
    "anesthesiology",
    "angel",
    "anger",
    "angina",
    "angiosperm",
    "angle",
    "angora",
    "angstrom",
    "anguish",
    "animal",
    "anime",
    "anise",
    "ankle",
    "anklet",
    "anniversary",
    "announcement",
    "annual",
    "anorak",
    "answer",
    "ant",
    "anteater",
    "antecedent",
    "antechamber",
    "antelope",
    "antennae",
    "anterior",
    "anthropology",
    "antibody",
    "anticipation",
    "anticodon",
    "antigen",
    "antique",
    "antiquity",
    "antler",
    "antling",
    "anxiety",
    "anybody",
    "anyone",
    "anything",
    "anywhere",
    "apartment",
    "ape",
    "aperitif",
    "apology",
    "app",
    "apparatus",
    "apparel",
    "appeal",
    "appearance",
    "appellation",
    "appendix",
    "appetiser",
    "appetite",
    "appetizer",
    "applause",
    "apple",
    "applewood",
    "appliance",
    "application",
    "appointment",
    "appreciation",
    "apprehension",
    "approach",
    "appropriation",
    "approval",
    "apricot",
    "apron",
    "apse",
    "aquarium",
    "aquifer",
    "arcade",
    "arch",
    "arch-rival",
    "archaeologist",
    "archaeology",
    "archeology",
    "archer",
    "architect",
    "architecture",
    "archives",
    "area",
    "arena",
    "argument",
    "arithmetic",
    "ark",
    "arm",
    "arm-rest",
    "armadillo",
    "armament",
    "armchair",
    "armoire",
    "armor",
    "armour",
    "armpit",
    "armrest",
    "army",
    "arrangement",
    "array",
    "arrest",
    "arrival",
    "arrogance",
    "arrow",
    "art",
    "artery",
    "arthur",
    "artichoke",
    "article",
    "artifact",
    "artificer",
    "artist",
    "ascend",
    "ascent",
    "ascot",
    "ash",
    "ashram",
    "ashtray",
    "aside",
    "asparagus",
    "aspect",
    "asphalt",
    "aspic",
    "ass",
    "assassination",
    "assault",
    "assembly",
    "assertion",
    "assessment",
    "asset",
    "assignment",
    "assist",
    "assistance",
    "assistant",
    "associate",
    "association",
    "assumption",
    "assurance",
    "asterisk",
    "astrakhan",
    "astrolabe",
    "astrologer",
    "astrology",
    "astronomy",
    "asymmetry",
    "atelier",
    "atheist",
    "athlete",
    "athletics",
    "atmosphere",
    "atom",
    "atrium",
    "attachment",
    "attack",
    "attacker",
    "attainment",
    "attempt",
    "attendance",
    "attendant",
    "attention",
    "attenuation",
    "attic",
    "attitude",
    "attorney",
    "attraction",
    "attribute",
    "auction",
    "audience",
    "audit",
    "auditorium",
    "aunt",
    "authentication",
    "authenticity",
    "author",
    "authorisation",
    "authority",
    "authorization",
    "auto",
    "autoimmunity",
    "automation",
    "automaton",
    "autumn",
    "availability",
    "avalanche",
    "avenue",
    "average",
    "avocado",
    "award",
    "awareness",
    "awe",
    "axis",
    "azimuth",
    "babe",
    "baboon",
    "babushka",
    "baby",
    "bachelor",
    "back",
    "back-up",
    "backbone",
    "backburn",
    "backdrop",
    "background",
    "backpack",
    "backup",
    "backyard",
    "bacon",
    "bacterium",
    "badge",
    "badger",
    "bafflement",
    "bag",
    "bagel",
    "baggage",
    "baggie",
    "baggy",
    "bagpipe",
    "bail",
    "bait",
    "bake",
    "baker",
    "bakery",
    "bakeware",
    "balaclava",
    "balalaika",
    "balance",
    "balcony",
    "ball",
    "ballet",
    "balloon",
    "balloonist",
    "ballot",
    "ballpark",
    "bamboo",
    "ban",
    "banana",
    "band",
    "bandana",
    "bandanna",
    "bandolier",
    "bandwidth",
    "bangle",
    "banjo",
    "bank",
    "bankbook",
    "banker",
    "banking",
    "bankruptcy",
    "banner",
    "banquette",
    "banyan",
    "baobab",
    "bar",
    "barbecue",
    "barbeque",
    "barber",
    "barbiturate",
    "bargain",
    "barge",
    "baritone",
    "barium",
    "bark",
    "barley",
    "barn",
    "barometer",
    "barracks",
    "barrage",
    "barrel",
    "barrier",
    "barstool",
    "bartender",
    "base",
    "baseball",
    "baseboard",
    "baseline",
    "basement",
    "basics",
    "basil",
    "basin",
    "basis",
    "basket",
    "basketball",
    "bass",
    "bassinet",
    "bassoon",
    "bat",
    "bath",
    "bather",
    "bathhouse",
    "bathrobe",
    "bathroom",
    "bathtub",
    "battalion",
    "batter",
    "battery",
    "batting",
    "battle",
    "battleship",
    "bay",
    "bayou",
    "beach",
    "bead",
    "beak",
    "beam",
    "bean",
    "beancurd",
    "beanie",
    "beanstalk",
    "bear",
    "beard",
    "beast",
    "beastie",
    "beat",
    "beating",
    "beauty",
    "beaver",
    "beck",
    "bed",
    "bedrock",
    "bedroom",
    "bee",
    "beech",
    "beef",
    "beer",
    "beet",
    "beetle",
    "beggar",
    "beginner",
    "beginning",
    "begonia",
    "behalf",
    "behavior",
    "behaviour",
    "beheading",
    "behest",
    "behold",
    "being",
    "belfry",
    "belief",
    "believer",
    "bell",
    "belligerency",
    "bellows",
    "belly",
    "belt",
    "bench",
    "bend",
    "beneficiary",
    "benefit",
    "beret",
    "berry",
    "best-seller",
    "bestseller",
    "bet",
    "beverage",
    "beyond",
    "bias",
    "bibliography",
    "bicycle",
    "bid",
    "bidder",
    "bidding",
    "bidet",
    "bifocals",
    "bijou",
    "bike",
    "bikini",
    "bill",
    "billboard",
    "billing",
    "billion",
    "bin",
    "binoculars",
    "biology",
    "biopsy",
    "biosphere",
    "biplane",
    "birch",
    "bird",
    "bird-watcher",
    "birdbath",
    "birdcage",
    "birdhouse",
    "birth",
    "birthday",
    "biscuit",
    "bit",
    "bite",
    "bitten",
    "bitter",
    "black",
    "blackberry",
    "blackbird",
    "blackboard",
    "blackfish",
    "blackness",
    "bladder",
    "blade",
    "blame",
    "blank",
    "blanket",
    "blast",
    "blazer",
    "blend",
    "blessing",
    "blight",
    "blind",
    "blinker",
    "blister",
    "blizzard",
    "block",
    "blocker",
    "blog",
    "blogger",
    "blood",
    "bloodflow",
    "bloom",
    "bloomer",
    "blossom",
    "blouse",
    "blow",
    "blowgun",
    "blowhole",
    "blue",
    "blueberry",
    "blush",
    "boar",
    "board",
    "boat",
    "boatload",
    "boatyard",
    "bob",
    "bobcat",
    "body",
    "bog",
    "bolero",
    "bolt",
    "bomb",
    "bomber",
    "bombing",
    "bond",
    "bonding",
    "bondsman",
    "bone",
    "bonfire",
    "bongo",
    "bonnet",
    "bonsai",
    "bonus",
    "boogeyman",
    "book",
    "bookcase",
    "bookend",
    "booking",
    "booklet",
    "bookmark",
    "boolean",
    "boom",
    "boon",
    "boost",
    "booster",
    "boot",
    "bootee",
    "bootie",
    "booty",
    "border",
    "bore",
    "borrower",
    "borrowing",
    "bosom",
    "boss",
    "botany",
    "bother",
    "bottle",
    "bottling",
    "bottom",
    "bottom-line",
    "boudoir",
    "bough",
    "boulder",
    "boulevard",
    "boundary",
    "bouquet",
    "bourgeoisie",
    "bout",
    "boutique",
    "bow",
    "bower",
    "bowl",
    "bowler",
    "bowling",
    "bowtie",
    "box",
    "boxer",
    "boxspring",
    "boy",
    "boycott",
    "boyfriend",
    "boyhood",
    "boysenberry",
    "bra",
    "brace",
    "bracelet",
    "bracket",
    "brain",
    "brake",
    "bran",
    "branch",
    "brand",
    "brandy",
    "brass",
    "brassiere",
    "bratwurst",
    "bread",
    "breadcrumb",
    "breadfruit",
    "break",
    "breakdown",
    "breakfast",
    "breakpoint",
    "breakthrough",
    "breast",
    "breastplate",
    "breath",
    "breeze",
    "brewer",
    "bribery",
    "brick",
    "bricklaying",
    "bride",
    "bridge",
    "brief",
    "briefing",
    "briefly",
    "briefs",
    "brilliant",
    "brink",
    "brisket",
    "broad",
    "broadcast",
    "broccoli",
    "brochure",
    "brocolli",
    "broiler",
    "broker",
    "bronchitis",
    "bronco",
    "bronze",
    "brooch",
    "brood",
    "brook",
    "broom",
    "brother",
    "brother-in-law",
    "brow",
    "brown",
    "brownie",
    "browser",
    "browsing",
    "brunch",
    "brush",
    "brushfire",
    "brushing",
    "bubble",
    "buck",
    "bucket",
    "buckle",
    "buckwheat",
    "bud",
    "buddy",
    "budget",
    "buffalo",
    "buffer",
    "buffet",
    "bug",
    "buggy",
    "bugle",
    "builder",
    "building",
    "bulb",
    "bulk",
    "bull",
    "bull-fighter",
    "bulldozer",
    "bullet",
    "bump",
    "bumper",
    "bun",
    "bunch",
    "bungalow",
    "bunghole",
    "bunkhouse",
    "burden",
    "bureau",
    "burglar",
    "burial",
    "burlesque",
    "burn",
    "burn-out",
    "burning",
    "burrito",
    "burro",
    "burrow",
    "burst",
    "bus",
    "bush",
    "business",
    "businessman",
    "bust",
    "bustle",
    "butane",
    "butcher",
    "butler",
    "butter",
    "butterfly",
    "button",
    "buy",
    "buyer",
    "buying",
    "buzz",
    "buzzard",
    "c-clamp",
    "cabana",
    "cabbage",
    "cabin",
    "cabinet",
    "cable",
    "caboose",
    "cacao",
    "cactus",
    "caddy",
    "cadet",
    "cafe",
    "caffeine",
    "caftan",
    "cage",
    "cake",
    "calcification",
    "calculation",
    "calculator",
    "calculus",
    "calendar",
    "calf",
    "caliber",
    "calibre",
    "calico",
    "call",
    "calm",
    "calorie",
    "camel",
    "cameo",
    "camera",
    "camp",
    "campaign",
    "campaigning",
    "campanile",
    "camper",
    "campus",
    "can",
    "canal",
    "cancer",
    "candelabra",
    "candidacy",
    "candidate",
    "candle",
    "candy",
    "cane",
    "cannibal",
    "cannon",
    "canoe",
    "canon",
    "canopy",
    "cantaloupe",
    "canteen",
    "canvas",
    "cap",
    "capability",
    "capacity",
    "cape",
    "caper",
    "capital",
    "capitalism",
    "capitulation",
    "capon",
    "cappelletti",
    "cappuccino",
    "captain",
    "caption",
    "captor",
    "car",
    "carabao",
    "caramel",
    "caravan",
    "carbohydrate",
    "carbon",
    "carboxyl",
    "card",
    "cardboard",
    "cardigan",
    "care",
    "career",
    "cargo",
    "caribou",
    "carload",
    "carnation",
    "carnival",
    "carol",
    "carotene",
    "carp",
    "carpenter",
    "carpet",
    "carpeting",
    "carport",
    "carriage",
    "carrier",
    "carrot",
    "carry",
    "cart",
    "cartel",
    "carter",
    "cartilage",
    "cartload",
    "cartoon",
    "cartridge",
    "carving",
    "cascade",
    "case",
    "casement",
    "cash",
    "cashew",
    "cashier",
    "casino",
    "casket",
    "cassava",
    "casserole",
    "cassock",
    "cast",
    "castanet",
    "castle",
    "casualty",
    "cat",
    "catacomb",
    "catalogue",
    "catalysis",
    "catalyst",
    "catamaran",
    "catastrophe",
    "catch",
    "catcher",
    "category",
    "caterpillar",
    "cathedral",
    "cation",
    "catsup",
    "cattle",
    "cauliflower",
    "causal",
    "cause",
    "causeway",
    "caution",
    "cave",
    "caviar",
    "cayenne",
    "ceiling",
    "celebration",
    "celebrity",
    "celeriac",
    "celery",
    "cell",
    "cellar",
    "cello",
    "celsius",
    "cement",
    "cemetery",
    "cenotaph",
    "census",
    "cent",
    "center",
    "centimeter",
    "centre",
    "centurion",
    "century",
    "cephalopod",
    "ceramic",
    "ceramics",
    "cereal",
    "ceremony",
    "certainty",
    "certificate",
    "certification",
    "cesspool",
    "chafe",
    "chain",
    "chainstay",
    "chair",
    "chairlift",
    "chairman",
    "chairperson",
    "chaise",
    "chalet",
    "chalice",
    "chalk",
    "challenge",
    "chamber",
    "champagne",
    "champion",
    "championship",
    "chance",
    "chandelier",
    "change",
    "channel",
    "chaos",
    "chap",
    "chapel",
    "chaplain",
    "chapter",
    "character",
    "characteristic",
    "characterization",
    "chard",
    "charge",
    "charger",
    "charity",
    "charlatan",
    "charm",
    "charset",
    "chart",
    "charter",
    "chasm",
    "chassis",
    "chastity",
    "chasuble",
    "chateau",
    "chatter",
    "chauffeur",
    "chauvinist",
    "check",
    "checkbook",
    "checking",
    "checkout",
    "checkroom",
    "cheddar",
    "cheek",
    "cheer",
    "cheese",
    "cheesecake",
    "cheetah",
    "chef",
    "chem",
    "chemical",
    "chemistry",
    "chemotaxis",
    "cheque",
    "cherry",
    "chess",
    "chest",
    "chestnut",
    "chick",
    "chicken",
    "chicory",
    "chief",
    "chiffonier",
    "child",
    "childbirth",
    "childhood",
    "chili",
    "chill",
    "chime",
    "chimpanzee",
    "chin",
    "chinchilla",
    "chino",
    "chip",
    "chipmunk",
    "chit-chat",
    "chivalry",
    "chive",
    "chives",
    "chocolate",
    "choice",
    "choir",
    "choker",
    "cholesterol",
    "choosing",
    "chop",
    "chops",
    "chopstick",
    "chopsticks",
    "chord",
    "chorus",
    "chow",
    "chowder",
    "chrome",
    "chromolithograph",
    "chronicle",
    "chronograph",
    "chronometer",
    "chrysalis",
    "chub",
    "chuck",
    "chug",
    "church",
    "churn",
    "chutney",
    "cicada",
    "cigarette",
    "cilantro",
    "cinder",
    "cinema",
    "cinnamon",
    "circadian",
    "circle",
    "circuit",
    "circulation",
    "circumference",
    "circumstance",
    "cirrhosis",
    "cirrus",
    "citizen",
    "citizenship",
    "citron",
    "citrus",
    "city",
    "civilian",
    "civilisation",
    "civilization",
    "claim",
    "clam",
    "clamp",
    "clan",
    "clank",
    "clapboard",
    "clarification",
    "clarinet",
    "clarity",
    "clasp",
    "class",
    "classic",
    "classification",
    "classmate",
    "classroom",
    "clause",
    "clave",
    "clavicle",
    "clavier",
    "claw",
    "clay",
    "cleaner",
    "clearance",
    "clearing",
    "cleat",
    "cleavage",
    "clef",
    "cleft",
    "clergyman",
    "cleric",
    "clerk",
    "click",
    "client",
    "cliff",
    "climate",
    "climb",
    "clinic",
    "clip",
    "clipboard",
    "clipper",
    "cloak",
    "cloakroom",
    "clock",
    "clockwork",
    "clogs",
    "cloister",
    "clone",
    "close",
    "closet",
    "closing",
    "closure",
    "cloth",
    "clothes",
    "clothing",
    "cloud",
    "cloudburst",
    "clove",
    "clover",
    "cloves",
    "club",
    "clue",
    "cluster",
    "clutch",
    "co-producer",
    "coach",
    "coal",
    "coalition",
    "coast",
    "coaster",
    "coat",
    "cob",
    "cobbler",
    "cobweb",
    "cock",
    "cockpit",
    "cockroach",
    "cocktail",
    "cocoa",
    "coconut",
    "cod",
    "code",
    "codepage",
    "codling",
    "codon",
    "codpiece",
    "coevolution",
    "cofactor",
    "coffee",
    "coffin",
    "cohesion",
    "cohort",
    "coil",
    "coin",
    "coincidence",
    "coinsurance",
    "coke",
    "cold",
    "coleslaw",
    "coliseum",
    "collaboration",
    "collagen",
    "collapse",
    "collar",
    "collard",
    "collateral",
    "colleague",
    "collection",
    "collectivisation",
    "collectivization",
    "collector",
    "college",
    "collision",
    "colloquy",
    "colon",
    "colonial",
    "colonialism",
    "colonisation",
    "colonization",
    "colony",
    "color",
    "colorlessness",
    "colt",
    "column",
    "columnist",
    "comb",
    "combat",
    "combination",
    "combine",
    "comeback",
    "comedy",
    "comestible",
    "comfort",
    "comfortable",
    "comic",
    "comics",
    "comma",
    "command",
    "commander",
    "commandment",
    "comment",
    "commerce",
    "commercial",
    "commission",
    "commitment",
    "committee",
    "commodity",
    "common",
    "commonsense",
    "commotion",
    "communicant",
    "communication",
    "communion",
    "communist",
    "community",
    "commuter",
    "company",
    "comparison",
    "compass",
    "compassion",
    "compassionate",
    "compensation",
    "competence",
    "competition",
    "competitor",
    "complaint",
    "complement",
    "completion",
    "complex",
    "complexity",
    "compliance",
    "complication",
    "complicity",
    "compliment",
    "component",
    "comportment",
    "composer",
    "composite",
    "composition",
    "compost",
    "comprehension",
    "compress",
    "compromise",
    "comptroller",
    "compulsion",
    "computer",
    "comradeship",
    "con",
    "concentrate",
    "concentration",
    "concept",
    "conception",
    "concern",
    "concert",
    "conclusion",
    "concrete",
    "condition",
    "conditioner",
    "condominium",
    "condor",
    "conduct",
    "conductor",
    "cone",
    "confectionery",
    "conference",
    "confidence",
    "confidentiality",
    "configuration",
    "confirmation",
    "conflict",
    "conformation",
    "confusion",
    "conga",
    "congo",
    "congregation",
    "congress",
    "congressman",
    "congressperson",
    "conifer",
    "connection",
    "connotation",
    "conscience",
    "consciousness",
    "consensus",
    "consent",
    "consequence",
    "conservation",
    "conservative",
    "consideration",
    "consignment",
    "consist",
    "consistency",
    "console",
    "consonant",
    "conspiracy",
    "conspirator",
    "constant",
    "constellation",
    "constitution",
    "constraint",
    "construction",
    "consul",
    "consulate",
    "consulting",
    "consumer",
    "consumption",
    "contact",
    "contagion",
    "container",
    "content",
    "contention",
    "contest",
    "context",
    "continent",
    "contingency",
    "continuity",
    "contour",
    "contract",
    "contractor",
    "contrail",
    "contrary",
    "contrast",
    "contribution",
    "contributor",
    "control",
    "controller",
    "controversy",
    "convection",
    "convenience",
    "convention",
    "conversation",
    "conversion",
    "convert",
    "convertible",
    "conviction",
    "cook",
    "cookbook",
    "cookie",
    "cooking",
    "coonskin",
    "cooperation",
    "coordination",
    "coordinator",
    "cop",
    "cop-out",
    "cope",
    "copper",
    "copy",
    "copying",
    "copyright",
    "copywriter",
    "coral",
    "cord",
    "corduroy",
    "core",
    "cork",
    "cormorant",
    "corn",
    "corner",
    "cornerstone",
    "cornet",
    "cornflakes",
    "cornmeal",
    "corporal",
    "corporation",
    "corporatism",
    "corps",
    "corral",
    "correspondence",
    "correspondent",
    "corridor",
    "corruption",
    "corsage",
    "cosset",
    "cost",
    "costume",
    "cot",
    "cottage",
    "cotton",
    "couch",
    "cougar",
    "cough",
    "council",
    "councilman",
    "councilor",
    "councilperson",
    "counsel",
    "counseling",
    "counselling",
    "counsellor",
    "counselor",
    "count",
    "counter",
    "counter-force",
    "counterpart",
    "counterterrorism",
    "countess",
    "country",
    "countryside",
    "county",
    "couple",
    "coupon",
    "courage",
    "course",
    "court",
    "courthouse",
    "courtroom",
    "cousin",
    "covariate",
    "cover",
    "coverage",
    "coverall",
    "cow",
    "cowbell",
    "cowboy",
    "coyote",
    "crab",
    "crack",
    "cracker",
    "crackers",
    "cradle",
    "craft",
    "craftsman",
    "cranberry",
    "crane",
    "cranky",
    "crap",
    "crash",
    "crate",
    "cravat",
    "craw",
    "crawdad",
    "crayfish",
    "crayon",
    "crazy",
    "cream",
    "creation",
    "creationism",
    "creationist",
    "creative",
    "creativity",
    "creator",
    "creature",
    "creche",
    "credential",
    "credenza",
    "credibility",
    "credit",
    "creditor",
    "creek",
    "crepe",
    "crest",
    "crew",
    "crewman",
    "crewmate",
    "crewmember",
    "crewmen",
    "cria",
    "crib",
    "cribbage",
    "cricket",
    "cricketer",
    "crime",
    "criminal",
    "crinoline",
    "crisis",
    "crisp",
    "criteria",
    "criterion",
    "critic",
    "criticism",
    "crocodile",
    "crocus",
    "croissant",
    "crook",
    "crop",
    "cross",
    "cross-contamination",
    "cross-stitch",
    "crotch",
    "croup",
    "crow",
    "crowd",
    "crown",
    "crucifixion",
    "crude",
    "cruelty",
    "cruise",
    "crumb",
    "crunch",
    "crusader",
    "crush",
    "crust",
    "cry",
    "crystal",
    "crystallography",
    "cub",
    "cube",
    "cuckoo",
    "cucumber",
    "cue",
    "cuff-link",
    "cuisine",
    "cultivar",
    "cultivator",
    "culture",
    "culvert",
    "cummerbund",
    "cup",
    "cupboard",
    "cupcake",
    "cupola",
    "curd",
    "cure",
    "curio",
    "curiosity",
    "curl",
    "curler",
    "currant",
    "currency",
    "current",
    "curriculum",
    "curry",
    "curse",
    "cursor",
    "curtailment",
    "curtain",
    "curve",
    "cushion",
    "custard",
    "custody",
    "custom",
    "customer",
    "cut",
    "cuticle",
    "cutlet",
    "cutover",
    "cutting",
    "cyclamen",
    "cycle",
    "cyclone",
    "cyclooxygenase",
    "cygnet",
    "cylinder",
    "cymbal",
    "cynic",
    "cyst",
    "cytokine",
    "cytoplasm",
    "dad",
    "daddy",
    "daffodil",
    "dagger",
    "dahlia",
    "daikon",
    "daily",
    "dairy",
    "daisy",
    "dam",
    "damage",
    "dame",
    "damn",
    "dance",
    "dancer",
    "dancing",
    "dandelion",
    "danger",
    "dare",
    "dark",
    "darkness",
    "darn",
    "dart",
    "dash",
    "dashboard",
    "data",
    "database",
    "date",
    "daughter",
    "dawn",
    "day",
    "daybed",
    "daylight",
    "dead",
    "deadline",
    "deal",
    "dealer",
    "dealing",
    "dearest",
    "death",
    "deathwatch",
    "debate",
    "debris",
    "debt",
    "debtor",
    "decade",
    "decadence",
    "decency",
    "decimal",
    "decision",
    "decision-making",
    "deck",
    "declaration",
    "declination",
    "decline",
    "decoder",
    "decongestant",
    "decoration",
    "decrease",
    "decryption",
    "dedication",
    "deduce",
    "deduction",
    "deed",
    "deep",
    "deer",
    "default",
    "defeat",
    "defendant",
    "defender",
    "defense",
    "deficit",
    "definition",
    "deformation",
    "degradation",
    "degree",
    "delay",
    "deliberation",
    "delight",
    "delivery",
    "demand",
    "democracy",
    "democrat",
    "demon",
    "demur",
    "den",
    "denim",
    "denominator",
    "density",
    "dentist",
    "deodorant",
    "department",
    "departure",
    "dependency",
    "dependent",
    "deployment",
    "deposit",
    "deposition",
    "depot",
    "depression",
    "depressive",
    "depth",
    "deputy",
    "derby",
    "derivation",
    "derivative",
    "derrick",
    "descendant",
    "descent",
    "description",
    "desert",
    "design",
    "designation",
    "designer",
    "desire",
    "desk",
    "desktop",
    "dessert",
    "destination",
    "destiny",
    "destroyer",
    "destruction",
    "detail",
    "detainee",
    "detainment",
    "detection",
    "detective",
    "detector",
    "detention",
    "determination",
    "detour",
    "devastation",
    "developer",
    "developing",
    "development",
    "developmental",
    "deviance",
    "deviation",
    "device",
    "devil",
    "dew",
    "dhow",
    "diabetes",
    "diadem",
    "diagnosis",
    "diagram",
    "dial",
    "dialect",
    "dialogue",
    "diam",
    "diamond",
    "diaper",
    "diaphragm",
    "diarist",
    "diary",
    "dibble",
    "dick",
    "dickey",
    "dictaphone",
    "dictator",
    "diction",
    "dictionary",
    "die",
    "diesel",
    "diet",
    "difference",
    "differential",
    "difficulty",
    "diffuse",
    "dig",
    "digestion",
    "digestive",
    "digger",
    "digging",
    "digit",
    "dignity",
    "dilapidation",
    "dill",
    "dilution",
    "dime",
    "dimension",
    "dimple",
    "diner",
    "dinghy",
    "dining",
    "dinner",
    "dinosaur",
    "dioxide",
    "dip",
    "diploma",
    "diplomacy",
    "dipstick",
    "direction",
    "directive",
    "director",
    "directory",
    "dirndl",
    "dirt",
    "disability",
    "disadvantage",
    "disagreement",
    "disappointment",
    "disarmament",
    "disaster",
    "discharge",
    "discipline",
    "disclaimer",
    "disclosure",
    "disco",
    "disconnection",
    "discount",
    "discourse",
    "discovery",
    "discrepancy",
    "discretion",
    "discrimination",
    "discussion",
    "disdain",
    "disease",
    "disembodiment",
    "disengagement",
    "disguise",
    "disgust",
    "dish",
    "dishwasher",
    "disk",
    "disparity",
    "dispatch",
    "displacement",
    "display",
    "disposal",
    "disposer",
    "disposition",
    "dispute",
    "disregard",
    "disruption",
    "dissemination",
    "dissonance",
    "distance",
    "distinction",
    "distortion",
    "distribution",
    "distributor",
    "district",
    "divalent",
    "divan",
    "diver",
    "diversity",
    "divide",
    "dividend",
    "divider",
    "divine",
    "diving",
    "division",
    "divorce",
    "doc",
    "dock",
    "doctor",
    "doctorate",
    "doctrine",
    "document",
    "documentary",
    "documentation",
    "doe",
    "dog",
    "doggie",
    "dogsled",
    "dogwood",
    "doing",
    "doll",
    "dollar",
    "dollop",
    "dolman",
    "dolor",
    "dolphin",
    "domain",
    "dome",
    "domination",
    "donation",
    "donkey",
    "donor",
    "donut",
    "door",
    "doorbell",
    "doorknob",
    "doorpost",
    "doorway",
    "dory",
    "dose",
    "dot",
    "double",
    "doubling",
    "doubt",
    "doubter",
    "dough",
    "doughnut",
    "down",
    "downfall",
    "downforce",
    "downgrade",
    "download",
    "downstairs",
    "downtown",
    "downturn",
    "dozen",
    "draft",
    "drag",
    "dragon",
    "dragonfly",
    "dragonfruit",
    "dragster",
    "drain",
    "drainage",
    "drake",
    "drama",
    "dramaturge",
    "drapes",
    "draw",
    "drawbridge",
    "drawer",
    "drawing",
    "dream",
    "dreamer",
    "dredger",
    "dress",
    "dresser",
    "dressing",
    "drill",
    "drink",
    "drinking",
    "drive",
    "driver",
    "driveway",
    "driving",
    "drizzle",
    "dromedary",
    "drop",
    "drudgery",
    "drug",
    "drum",
    "drummer",
    "drunk",
    "dryer",
    "duck",
    "duckling",
    "dud",
    "dude",
    "due",
    "duel",
    "dueling",
    "duffel",
    "dugout",
    "dulcimer",
    "dumbwaiter",
    "dump",
    "dune",
    "dungarees",
    "dungeon",
    "duplexer",
    "duration",
    "durian",
    "dusk",
    "dust",
    "duster",
    "duty",
    "dwarf",
    "dwell",
    "dwelling",
    "dynamics",
    "dynamite",
    "dynamo",
    "dynasty",
    "dysfunction",
    "e-book",
    "e-mail",
    "e-reader",
    "eagle",
    "eaglet",
    "ear",
    "eardrum",
    "earmuffs",
    "earnings",
    "earplug",
    "earring",
    "earrings",
    "earth",
    "earthquake",
    "earthworm",
    "ease",
    "easel",
    "east",
    "eating",
    "eaves",
    "eavesdropper",
    "ecclesia",
    "echidna",
    "eclipse",
    "ecliptic",
    "ecology",
    "economics",
    "economy",
    "ecosystem",
    "ectoderm",
    "ectodermal",
    "ecumenist",
    "eddy",
    "edge",
    "edger",
    "edible",
    "editing",
    "edition",
    "editor",
    "editorial",
    "education",
    "eel",
    "effacement",
    "effect",
    "effective",
    "effectiveness",
    "effector",
    "efficacy",
    "efficiency",
    "effort",
    "egg",
    "egghead",
    "eggnog",
    "eggplant",
    "ego",
    "eicosanoid",
    "ejector",
    "elbow",
    "elderberry",
    "election",
    "electricity",
    "electrocardiogram",
    "electronics",
    "element",
    "elephant",
    "elevation",
    "elevator",
    "eleventh",
    "elf",
    "elicit",
    "eligibility",
    "elimination",
    "elite",
    "elixir",
    "elk",
    "ellipse",
    "elm",
    "elongation",
    "elver",
    "email",
    "emanate",
    "embarrassment",
    "embassy",
    "embellishment",
    "embossing",
    "embryo",
    "emerald",
    "emergence",
    "emergency",
    "emergent",
    "emery",
    "emission",
    "emitter",
    "emotion",
    "emphasis",
    "empire",
    "employ",
    "employee",
    "employer",
    "employment",
    "empowerment",
    "emu",
    "enactment",
    "encirclement",
    "enclave",
    "enclosure",
    "encounter",
    "encouragement",
    "encyclopedia",
    "end",
    "endive",
    "endoderm",
    "endorsement",
    "endothelium",
    "endpoint",
    "enemy",
    "energy",
    "enforcement",
    "engagement",
    "engine",
    "engineer",
    "engineering",
    "enigma",
    "enjoyment",
    "enquiry",
    "enrollment",
    "enterprise",
    "entertainment",
    "enthusiasm",
    "entirety",
    "entity",
    "entrance",
    "entree",
    "entrepreneur",
    "entry",
    "envelope",
    "environment",
    "envy",
    "enzyme",
    "epauliere",
    "epee",
    "ephemera",
    "ephemeris",
    "ephyra",
    "epic",
    "episode",
    "epithelium",
    "epoch",
    "eponym",
    "epoxy",
    "equal",
    "equality",
    "equation",
    "equinox",
    "equipment",
    "equity",
    "equivalent",
    "era",
    "eraser",
    "erection",
    "erosion",
    "error",
    "escalator",
    "escape",
    "escort",
    "espadrille",
    "espalier",
    "essay",
    "essence",
    "essential",
    "establishment",
    "estate",
    "estimate",
    "estrogen",
    "estuary",
    "eternity",
    "ethernet",
    "ethics",
    "ethnicity",
    "ethyl",
    "euphonium",
    "eurocentrism",
    "evaluation",
    "evaluator",
    "evaporation",
    "eve",
    "evening",
    "evening-wear",
    "event",
    "everybody",
    "everyone",
    "everything",
    "eviction",
    "evidence",
    "evil",
    "evocation",
    "evolution",
    "ex-husband",
    "ex-wife",
    "exaggeration",
    "exam",
    "examination",
    "examiner",
    "example",
    "exasperation",
    "excellence",
    "exception",
    "excerpt",
    "excess",
    "exchange",
    "excitement",
    "exclamation",
    "excursion",
    "excuse",
    "execution",
    "executive",
    "executor",
    "exercise",
    "exhaust",
    "exhaustion",
    "exhibit",
    "exhibition",
    "exile",
    "existence",
    "exit",
    "exocrine",
    "expansion",
    "expansionism",
    "expectancy",
    "expectation",
    "expedition",
    "expense",
    "experience",
    "experiment",
    "experimentation",
    "expert",
    "expertise",
    "explanation",
    "exploration",
    "explorer",
    "explosion",
    "export",
    "expose",
    "exposition",
    "exposure",
    "expression",
    "extension",
    "extent",
    "exterior",
    "external",
    "extinction",
    "extreme",
    "extremist",
    "eye",
    "eyeball",
    "eyebrow",
    "eyebrows",
    "eyeglasses",
    "eyelash",
    "eyelashes",
    "eyelid",
    "eyelids",
    "eyeliner",
    "eyestrain",
    "eyrie",
    "fabric",
    "face",
    "facelift",
    "facet",
    "facility",
    "facsimile",
    "fact",
    "factor",
    "factory",
    "faculty",
    "fahrenheit",
    "fail",
    "failure",
    "fairness",
    "fairy",
    "faith",
    "faithful",
    "fall",
    "fallacy",
    "falling-out",
    "fame",
    "familiar",
    "familiarity",
    "family",
    "fan",
    "fang",
    "fanlight",
    "fanny",
    "fanny-pack",
    "fantasy",
    "farm",
    "farmer",
    "farming",
    "farmland",
    "farrow",
    "fascia",
    "fashion",
    "fat",
    "fate",
    "father",
    "father-in-law",
    "fatigue",
    "fatigues",
    "faucet",
    "fault",
    "fav",
    "fava",
    "favor",
    "favorite",
    "fawn",
    "fax",
    "fear",
    "feast",
    "feather",
    "feature",
    "fedelini",
    "federation",
    "fedora",
    "fee",
    "feed",
    "feedback",
    "feeding",
    "feel",
    "feeling",
    "fellow",
    "felony",
    "female",
    "fen",
    "fence",
    "fencing",
    "fender",
    "feng",
    "fennel",
    "ferret",
    "ferry",
    "ferryboat",
    "fertilizer",
    "festival",
    "fetus",
    "few",
    "fiber",
    "fiberglass",
    "fibre",
    "fibroblast",
    "fibrosis",
    "ficlet",
    "fiction",
    "fiddle",
    "field",
    "fiery",
    "fiesta",
    "fifth",
    "fig",
    "fight",
    "fighter",
    "figure",
    "figurine",
    "file",
    "filing",
    "fill",
    "fillet",
    "filly",
    "film",
    "filter",
    "filth",
    "final",
    "finance",
    "financing",
    "finding",
    "fine",
    "finer",
    "finger",
    "fingerling",
    "fingernail",
    "finish",
    "finisher",
    "fir",
    "fire",
    "fireman",
    "fireplace",
    "firewall",
    "firm",
    "first",
    "fish",
    "fishbone",
    "fisherman",
    "fishery",
    "fishing",
    "fishmonger",
    "fishnet",
    "fisting",
    "fit",
    "fitness",
    "fix",
    "fixture",
    "flag",
    "flair",
    "flame",
    "flan",
    "flanker",
    "flare",
    "flash",
    "flat",
    "flatboat",
    "flavor",
    "flax",
    "fleck",
    "fledgling",
    "fleece",
    "flesh",
    "flexibility",
    "flick",
    "flicker",
    "flight",
    "flint",
    "flintlock",
    "flip-flops",
    "flock",
    "flood",
    "floodplain",
    "floor",
    "floozie",
    "flour",
    "flow",
    "flower",
    "flu",
    "flugelhorn",
    "fluke",
    "flume",
    "flung",
    "flute",
    "fly",
    "flytrap",
    "foal",
    "foam",
    "fob",
    "focus",
    "fog",
    "fold",
    "folder",
    "folk",
    "folklore",
    "follower",
    "following",
    "fondue",
    "font",
    "food",
    "foodstuffs",
    "fool",
    "foot",
    "footage",
    "football",
    "footnote",
    "footprint",
    "footrest",
    "footstep",
    "footstool",
    "footwear",
    "forage",
    "forager",
    "foray",
    "force",
    "ford",
    "forearm",
    "forebear",
    "forecast",
    "forehead",
    "foreigner",
    "forelimb",
    "forest",
    "forestry",
    "forever",
    "forgery",
    "fork",
    "form",
    "formal",
    "formamide",
    "format",
    "formation",
    "former",
    "formicarium",
    "formula",
    "fort",
    "forte",
    "fortnight",
    "fortress",
    "fortune",
    "forum",
    "foundation",
    "founder",
    "founding",
    "fountain",
    "fourths",
    "fowl",
    "fox",
    "foxglove",
    "fraction",
    "fragrance",
    "frame",
    "framework",
    "fratricide",
    "fraud",
    "fraudster",
    "freak",
    "freckle",
    "freedom",
    "freelance",
    "freezer",
    "freezing",
    "freight",
    "freighter",
    "frenzy",
    "freon",
    "frequency",
    "fresco",
    "friction",
    "fridge",
    "friend",
    "friendship",
    "fries",
    "frigate",
    "fright",
    "fringe",
    "fritter",
    "frock",
    "frog",
    "front",
    "frontier",
    "frost",
    "frosting",
    "frown",
    "fruit",
    "frustration",
    "fry",
    "fuck",
    "fuel",
    "fugato",
    "fulfillment",
    "full",
    "fun",
    "function",
    "functionality",
    "fund",
    "funding",
    "fundraising",
    "funeral",
    "fur",
    "furnace",
    "furniture",
    "furry",
    "fusarium",
    "futon",
    "future",
    "gadget",
    "gaffe",
    "gaffer",
    "gain",
    "gaiters",
    "gale",
    "gall-bladder",
    "gallery",
    "galley",
    "gallon",
    "galoshes",
    "gambling",
    "game",
    "gamebird",
    "gaming",
    "gamma-ray",
    "gander",
    "gang",
    "gap",
    "garage",
    "garb",
    "garbage",
    "garden",
    "garlic",
    "garment",
    "garter",
    "gas",
    "gasket",
    "gasoline",
    "gasp",
    "gastronomy",
    "gastropod",
    "gate",
    "gateway",
    "gather",
    "gathering",
    "gator",
    "gauge",
    "gauntlet",
    "gavel",
    "gazebo",
    "gazelle",
    "gear",
    "gearshift",
    "geek",
    "gel",
    "gelatin",
    "gelding",
    "gem",
    "gemsbok",
    "gender",
    "gene",
    "general",
    "generation",
    "generator",
    "generosity",
    "genetics",
    "genie",
    "genius",
    "genocide",
    "genre",
    "gentleman",
    "geography",
    "geology",
    "geometry",
    "geranium",
    "gerbil",
    "gesture",
    "geyser",
    "gherkin",
    "ghost",
    "giant",
    "gift",
    "gig",
    "gigantism",
    "giggle",
    "ginger",
    "gingerbread",
    "ginseng",
    "giraffe",
    "girdle",
    "girl",
    "girlfriend",
    "git",
    "glacier",
    "gladiolus",
    "glance",
    "gland",
    "glass",
    "glasses",
    "glee",
    "glen",
    "glider",
    "gliding",
    "glimpse",
    "globe",
    "glockenspiel",
    "gloom",
    "glory",
    "glove",
    "glow",
    "glucose",
    "glue",
    "glut",
    "glutamate",
    "gnat",
    "gnu",
    "go-kart",
    "goal",
    "goat",
    "gobbler",
    "god",
    "goddess",
    "godfather",
    "godmother",
    "godparent",
    "goggles",
    "going",
    "gold",
    "goldfish",
    "golf",
    "gondola",
    "gong",
    "good",
    "good-bye",
    "goodbye",
    "goodie",
    "goodness",
    "goodnight",
    "goodwill",
    "goose",
    "gopher",
    "gorilla",
    "gosling",
    "gossip",
    "governance",
    "government",
    "governor",
    "gown",
    "grab-bag",
    "grace",
    "grade",
    "gradient",
    "graduate",
    "graduation",
    "graffiti",
    "graft",
    "grain",
    "gram",
    "grammar",
    "gran",
    "grand",
    "grandchild",
    "granddaughter",
    "grandfather",
    "grandma",
    "grandmom",
    "grandmother",
    "grandpa",
    "grandparent",
    "grandson",
    "granny",
    "granola",
    "grant",
    "grape",
    "grapefruit",
    "graph",
    "graphic",
    "grasp",
    "grass",
    "grasshopper",
    "grassland",
    "gratitude",
    "gravel",
    "gravitas",
    "gravity",
    "gravy",
    "gray",
    "grease",
    "great-grandfather",
    "great-grandmother",
    "greatness",
    "greed",
    "green",
    "greenhouse",
    "greens",
    "grenade",
    "grey",
    "grid",
    "grief",
    "grill",
    "grin",
    "grip",
    "gripper",
    "grit",
    "grocery",
    "ground",
    "group",
    "grouper",
    "grouse",
    "grove",
    "growth",
    "grub",
    "guacamole",
    "guarantee",
    "guard",
    "guava",
    "guerrilla",
    "guess",
    "guest",
    "guestbook",
    "guidance",
    "guide",
    "guideline",
    "guilder",
    "guilt",
    "guilty",
    "guinea",
    "guitar",
    "guitarist",
    "gum",
    "gumshoe",
    "gun",
    "gunpowder",
    "gutter",
    "guy",
    "gym",
    "gymnast",
    "gymnastics",
    "gynaecology",
    "gyro",
    "habit",
    "habitat",
    "hacienda",
    "hacksaw",
    "hackwork",
    "hail",
    "hair",
    "haircut",
    "hake",
    "half",
    "half-brother",
    "half-sister",
    "halibut",
    "hall",
    "halloween",
    "hallway",
    "halt",
    "ham",
    "hamburger",
    "hammer",
    "hammock",
    "hamster",
    "hand",
    "hand-holding",
    "handball",
    "handful",
    "handgun",
    "handicap",
    "handle",
    "handlebar",
    "handmaiden",
    "handover",
    "handrail",
    "handsaw",
    "hanger",
    "happening",
    "happiness",
    "harald",
    "harbor",
    "harbour",
    "hard-hat",
    "hardboard",
    "hardcover",
    "hardening",
    "hardhat",
    "hardship",
    "hardware",
    "hare",
    "harm",
    "harmonica",
    "harmonise",
    "harmonize",
    "harmony",
    "harp",
    "harpooner",
    "harpsichord",
    "harvest",
    "harvester",
    "hash",
    "hashtag",
    "hassock",
    "haste",
    "hat",
    "hatbox",
    "hatchet",
    "hatchling",
    "hate",
    "hatred",
    "haunt",
    "haven",
    "haversack",
    "havoc",
    "hawk",
    "hay",
    "haze",
    "hazel",
    "hazelnut",
    "head",
    "headache",
    "headlight",
    "headline",
    "headphones",
    "headquarters",
    "headrest",
    "health",
    "health-care",
    "hearing",
    "hearsay",
    "heart",
    "heart-throb",
    "heartache",
    "heartbeat",
    "hearth",
    "hearthside",
    "heartwood",
    "heat",
    "heater",
    "heating",
    "heaven",
    "heavy",
    "hectare",
    "hedge",
    "hedgehog",
    "heel",
    "heifer",
    "height",
    "heir",
    "heirloom",
    "helicopter",
    "helium",
    "hell",
    "hellcat",
    "hello",
    "helmet",
    "helo",
    "help",
    "hemisphere",
    "hemp",
    "hen",
    "hepatitis",
    "herb",
    "herbs",
    "heritage",
    "hermit",
    "hero",
    "heroine",
    "heron",
    "herring",
    "hesitation",
    "heterosexual",
    "hexagon",
    "heyday",
    "hiccups",
    "hide",
    "hierarchy",
    "high",
    "high-rise",
    "highland",
    "highlight",
    "highway",
    "hike",
    "hiking",
    "hill",
    "hint",
    "hip",
    "hippodrome",
    "hippopotamus",
    "hire",
    "hiring",
    "historian",
    "history",
    "hit",
    "hive",
    "hobbit",
    "hobby",
    "hockey",
    "hoe",
    "hog",
    "hold",
    "holder",
    "hole",
    "holiday",
    "home",
    "homeland",
    "homeownership",
    "hometown",
    "homework",
    "homicide",
    "homogenate",
    "homonym",
    "homosexual",
    "homosexuality",
    "honesty",
    "honey",
    "honeybee",
    "honeydew",
    "honor",
    "honoree",
    "hood",
    "hoof",
    "hook",
    "hop",
    "hope",
    "hops",
    "horde",
    "horizon",
    "hormone",
    "horn",
    "hornet",
    "horror",
    "horse",
    "horseradish",
    "horst",
    "hose",
    "hosiery",
    "hospice",
    "hospital",
    "hospitalisation",
    "hospitality",
    "hospitalization",
    "host",
    "hostel",
    "hostess",
    "hotdog",
    "hotel",
    "hound",
    "hour",
    "hourglass",
    "house",
    "houseboat",
    "household",
    "housewife",
    "housework",
    "housing",
    "hovel",
    "hovercraft",
    "howard",
    "howitzer",
    "hub",
    "hubcap",
    "hubris",
    "hug",
    "hugger",
    "hull",
    "human",
    "humanity",
    "humidity",
    "hummus",
    "humor",
    "humour",
    "hunchback",
    "hundred",
    "hunger",
    "hunt",
    "hunter",
    "hunting",
    "hurdle",
    "hurdler",
    "hurricane",
    "hurry",
    "hurt",
    "husband",
    "hut",
    "hutch",
    "hyacinth",
    "hybridisation",
    "hybridization",
    "hydrant",
    "hydraulics",
    "hydrocarb",
    "hydrocarbon",
    "hydrofoil",
    "hydrogen",
    "hydrolyse",
    "hydrolysis",
    "hydrolyze",
    "hydroxyl",
    "hyena",
    "hygienic",
    "hype",
    "hyphenation",
    "hypochondria",
    "hypothermia",
    "hypothesis",
    "ice",
    "ice-cream",
    "iceberg",
    "icebreaker",
    "icecream",
    "icicle",
    "icing",
    "icon",
    "icy",
    "id",
    "idea",
    "ideal",
    "identification",
    "identity",
    "ideology",
    "idiom",
    "idiot",
    "igloo",
    "ignorance",
    "ignorant",
    "ikebana",
    "illegal",
    "illiteracy",
    "illness",
    "illusion",
    "illustration",
    "image",
    "imagination",
    "imbalance",
    "imitation",
    "immigrant",
    "immigration",
    "immortal",
    "impact",
    "impairment",
    "impala",
    "impediment",
    "implement",
    "implementation",
    "implication",
    "import",
    "importance",
    "impostor",
    "impress",
    "impression",
    "imprisonment",
    "impropriety",
    "improvement",
    "impudence",
    "impulse",
    "in-joke",
    "in-laws",
    "inability",
    "inauguration",
    "inbox",
    "incandescence",
    "incarnation",
    "incense",
    "incentive",
    "inch",
    "incidence",
    "incident",
    "incision",
    "inclusion",
    "income",
    "incompetence",
    "inconvenience",
    "increase",
    "incubation",
    "independence",
    "independent",
    "index",
    "indication",
    "indicator",
    "indigence",
    "individual",
    "industrialisation",
    "industrialization",
    "industry",
    "inequality",
    "inevitable",
    "infancy",
    "infant",
    "infarction",
    "infection",
    "infiltration",
    "infinite",
    "infix",
    "inflammation",
    "inflation",
    "influence",
    "influx",
    "info",
    "information",
    "infrastructure",
    "infusion",
    "inglenook",
    "ingrate",
    "ingredient",
    "inhabitant",
    "inheritance",
    "inhibition",
    "inhibitor",
    "initial",
    "initialise",
    "initialize",
    "initiative",
    "injunction",
    "injury",
    "injustice",
    "ink",
    "inlay",
    "inn",
    "innervation",
    "innocence",
    "innocent",
    "innovation",
    "input",
    "inquiry",
    "inscription",
    "insect",
    "insectarium",
    "insert",
    "inside",
    "insight",
    "insolence",
    "insomnia",
    "inspection",
    "inspector",
    "inspiration",
    "installation",
    "instance",
    "instant",
    "instinct",
    "institute",
    "institution",
    "instruction",
    "instructor",
    "instrument",
    "instrumentalist",
    "instrumentation",
    "insulation",
    "insurance",
    "insurgence",
    "insurrection",
    "integer",
    "integral",
    "integration",
    "integrity",
    "intellect",
    "intelligence",
    "intensity",
    "intent",
    "intention",
    "intentionality",
    "interaction",
    "interchange",
    "interconnection",
    "intercourse",
    "interest",
    "interface",
    "interferometer",
    "interior",
    "interject",
    "interloper",
    "internet",
    "interpretation",
    "interpreter",
    "interval",
    "intervenor",
    "intervention",
    "interview",
    "interviewer",
    "intestine",
    "introduction",
    "intuition",
    "invader",
    "invasion",
    "invention",
    "inventor",
    "inventory",
    "inverse",
    "inversion",
    "investigation",
    "investigator",
    "investment",
    "investor",
    "invitation",
    "invite",
    "invoice",
    "involvement",
    "iridescence",
    "iris",
    "iron",
    "ironclad",
    "irony",
    "irrigation",
    "ischemia",
    "island",
    "isogloss",
    "isolation",
    "issue",
    "item",
    "itinerary",
    "ivory",
    "jack",
    "jackal",
    "jacket",
    "jackfruit",
    "jade",
    "jaguar",
    "jail",
    "jailhouse",
    "jalape\xF1o",
    "jam",
    "jar",
    "jasmine",
    "jaw",
    "jazz",
    "jealousy",
    "jeans",
    "jeep",
    "jelly",
    "jellybeans",
    "jellyfish",
    "jerk",
    "jet",
    "jewel",
    "jeweller",
    "jewellery",
    "jewelry",
    "jicama",
    "jiffy",
    "job",
    "jockey",
    "jodhpurs",
    "joey",
    "jogging",
    "joint",
    "joke",
    "jot",
    "journal",
    "journalism",
    "journalist",
    "journey",
    "joy",
    "judge",
    "judgment",
    "judo",
    "jug",
    "juggernaut",
    "juice",
    "julienne",
    "jumbo",
    "jump",
    "jumper",
    "jumpsuit",
    "jungle",
    "junior",
    "junk",
    "junker",
    "junket",
    "jury",
    "justice",
    "justification",
    "jute",
    "kale",
    "kamikaze",
    "kangaroo",
    "karate",
    "kayak",
    "kazoo",
    "kebab",
    "keep",
    "keeper",
    "kendo",
    "kennel",
    "ketch",
    "ketchup",
    "kettle",
    "kettledrum",
    "key",
    "keyboard",
    "keyboarding",
    "keystone",
    "kick",
    "kick-off",
    "kid",
    "kidney",
    "kielbasa",
    "kill",
    "killer",
    "killing",
    "kilogram",
    "kilometer",
    "kilt",
    "kimono",
    "kinase",
    "kind",
    "kindness",
    "king",
    "kingdom",
    "kingfish",
    "kiosk",
    "kiss",
    "kit",
    "kitchen",
    "kite",
    "kitsch",
    "kitten",
    "kitty",
    "kiwi",
    "knee",
    "kneejerk",
    "knickers",
    "knife",
    "knife-edge",
    "knight",
    "knitting",
    "knock",
    "knot",
    "know-how",
    "knowledge",
    "knuckle",
    "koala",
    "kohlrabi",
    "kumquat",
    "lab",
    "label",
    "labor",
    "laboratory",
    "laborer",
    "labour",
    "labourer",
    "lace",
    "lack",
    "lacquerware",
    "lad",
    "ladder",
    "ladle",
    "lady",
    "ladybug",
    "lag",
    "lake",
    "lamb",
    "lambkin",
    "lament",
    "lamp",
    "lanai",
    "land",
    "landform",
    "landing",
    "landmine",
    "landscape",
    "lane",
    "language",
    "lantern",
    "lap",
    "laparoscope",
    "lapdog",
    "laptop",
    "larch",
    "lard",
    "larder",
    "lark",
    "larva",
    "laryngitis",
    "lasagna",
    "lashes",
    "last",
    "latency",
    "latex",
    "lathe",
    "latitude",
    "latte",
    "latter",
    "laugh",
    "laughter",
    "laundry",
    "lava",
    "law",
    "lawmaker",
    "lawn",
    "lawsuit",
    "lawyer",
    "lay",
    "layer",
    "layout",
    "lead",
    "leader",
    "leadership",
    "leading",
    "leaf",
    "league",
    "leaker",
    "leap",
    "learning",
    "leash",
    "leather",
    "leave",
    "leaver",
    "lecture",
    "leek",
    "leeway",
    "left",
    "leg",
    "legacy",
    "legal",
    "legend",
    "legging",
    "legislation",
    "legislator",
    "legislature",
    "legitimacy",
    "legume",
    "leisure",
    "lemon",
    "lemonade",
    "lemur",
    "lender",
    "lending",
    "length",
    "lens",
    "lentil",
    "leopard",
    "leprosy",
    "leptocephalus",
    "lesbian",
    "lesson",
    "letter",
    "lettuce",
    "level",
    "lever",
    "leverage",
    "leveret",
    "liability",
    "liar",
    "liberty",
    "libido",
    "library",
    "licence",
    "license",
    "licensing",
    "licorice",
    "lid",
    "lie",
    "lieu",
    "lieutenant",
    "life",
    "lifestyle",
    "lifetime",
    "lift",
    "ligand",
    "light",
    "lighting",
    "lightning",
    "lightscreen",
    "ligula",
    "likelihood",
    "likeness",
    "lilac",
    "lily",
    "limb",
    "lime",
    "limestone",
    "limit",
    "limitation",
    "limo",
    "line",
    "linen",
    "liner",
    "linguist",
    "linguistics",
    "lining",
    "link",
    "linkage",
    "linseed",
    "lion",
    "lip",
    "lipid",
    "lipoprotein",
    "lipstick",
    "liquid",
    "liquidity",
    "liquor",
    "list",
    "listening",
    "listing",
    "literate",
    "literature",
    "litigation",
    "litmus",
    "litter",
    "littleneck",
    "liver",
    "livestock",
    "living",
    "lizard",
    "llama",
    "load",
    "loading",
    "loaf",
    "loafer",
    "loan",
    "lobby",
    "lobotomy",
    "lobster",
    "local",
    "locality",
    "location",
    "lock",
    "locker",
    "locket",
    "locomotive",
    "locust",
    "lode",
    "loft",
    "log",
    "loggia",
    "logic",
    "login",
    "logistics",
    "logo",
    "loincloth",
    "lollipop",
    "loneliness",
    "longboat",
    "longitude",
    "look",
    "lookout",
    "loop",
    "loophole",
    "loquat",
    "lord",
    "loss",
    "lot",
    "lotion",
    "lottery",
    "lounge",
    "louse",
    "lout",
    "love",
    "lover",
    "lox",
    "loyalty",
    "luck",
    "luggage",
    "lumber",
    "lumberman",
    "lunch",
    "luncheonette",
    "lunchmeat",
    "lunchroom",
    "lung",
    "lunge",
    "lust",
    "lute",
    "luxury",
    "lychee",
    "lycra",
    "lye",
    "lymphocyte",
    "lynx",
    "lyocell",
    "lyre",
    "lyrics",
    "lysine",
    "mRNA",
    "macadamia",
    "macaroni",
    "macaroon",
    "macaw",
    "machine",
    "machinery",
    "macrame",
    "macro",
    "macrofauna",
    "madam",
    "maelstrom",
    "maestro",
    "magazine",
    "maggot",
    "magic",
    "magnet",
    "magnitude",
    "maid",
    "maiden",
    "mail",
    "mailbox",
    "mailer",
    "mailing",
    "mailman",
    "main",
    "mainland",
    "mainstream",
    "maintainer",
    "maintenance",
    "maize",
    "major",
    "major-league",
    "majority",
    "makeover",
    "maker",
    "makeup",
    "making",
    "male",
    "malice",
    "mall",
    "mallard",
    "mallet",
    "malnutrition",
    "mama",
    "mambo",
    "mammoth",
    "man",
    "manacle",
    "management",
    "manager",
    "manatee",
    "mandarin",
    "mandate",
    "mandolin",
    "mangle",
    "mango",
    "mangrove",
    "manhunt",
    "maniac",
    "manicure",
    "manifestation",
    "manipulation",
    "mankind",
    "manner",
    "manor",
    "mansard",
    "manservant",
    "mansion",
    "mantel",
    "mantle",
    "mantua",
    "manufacturer",
    "manufacturing",
    "many",
    "map",
    "maple",
    "mapping",
    "maracas",
    "marathon",
    "marble",
    "march",
    "mare",
    "margarine",
    "margin",
    "mariachi",
    "marimba",
    "marines",
    "marionberry",
    "mark",
    "marker",
    "market",
    "marketer",
    "marketing",
    "marketplace",
    "marksman",
    "markup",
    "marmalade",
    "marriage",
    "marsh",
    "marshland",
    "marshmallow",
    "marten",
    "marxism",
    "mascara",
    "mask",
    "masonry",
    "mass",
    "massage",
    "mast",
    "master",
    "masterpiece",
    "mastication",
    "mastoid",
    "mat",
    "match",
    "matchmaker",
    "mate",
    "material",
    "maternity",
    "math",
    "mathematics",
    "matrix",
    "matter",
    "mattock",
    "mattress",
    "max",
    "maximum",
    "maybe",
    "mayonnaise",
    "mayor",
    "meadow",
    "meal",
    "mean",
    "meander",
    "meaning",
    "means",
    "meantime",
    "measles",
    "measure",
    "measurement",
    "meat",
    "meatball",
    "meatloaf",
    "mecca",
    "mechanic",
    "mechanism",
    "med",
    "medal",
    "media",
    "median",
    "medication",
    "medicine",
    "medium",
    "meet",
    "meeting",
    "melatonin",
    "melody",
    "melon",
    "member",
    "membership",
    "membrane",
    "meme",
    "memo",
    "memorial",
    "memory",
    "men",
    "menopause",
    "menorah",
    "mention",
    "mentor",
    "menu",
    "merchandise",
    "merchant",
    "mercury",
    "meridian",
    "meringue",
    "merit",
    "mesenchyme",
    "mess",
    "message",
    "messenger",
    "messy",
    "metabolite",
    "metal",
    "metallurgist",
    "metaphor",
    "meteor",
    "meteorology",
    "meter",
    "methane",
    "method",
    "methodology",
    "metric",
    "metro",
    "metronome",
    "mezzanine",
    "microlending",
    "micronutrient",
    "microphone",
    "microwave",
    "mid-course",
    "midden",
    "middle",
    "middleman",
    "midline",
    "midnight",
    "midwife",
    "might",
    "migrant",
    "migration",
    "mile",
    "mileage",
    "milepost",
    "milestone",
    "military",
    "milk",
    "milkshake",
    "mill",
    "millennium",
    "millet",
    "millimeter",
    "million",
    "millisecond",
    "millstone",
    "mime",
    "mimosa",
    "min",
    "mincemeat",
    "mind",
    "mine",
    "mineral",
    "mineshaft",
    "mini",
    "mini-skirt",
    "minibus",
    "minimalism",
    "minimum",
    "mining",
    "minion",
    "minister",
    "mink",
    "minnow",
    "minor",
    "minor-league",
    "minority",
    "mint",
    "minute",
    "miracle",
    "mirror",
    "miscarriage",
    "miscommunication",
    "misfit",
    "misnomer",
    "misogyny",
    "misplacement",
    "misreading",
    "misrepresentation",
    "miss",
    "missile",
    "mission",
    "missionary",
    "mist",
    "mistake",
    "mister",
    "misunderstand",
    "miter",
    "mitten",
    "mix",
    "mixer",
    "mixture",
    "moai",
    "moat",
    "mob",
    "mobile",
    "mobility",
    "mobster",
    "moccasins",
    "mocha",
    "mochi",
    "mode",
    "model",
    "modeling",
    "modem",
    "modernist",
    "modernity",
    "modification",
    "molar",
    "molasses",
    "molding",
    "mole",
    "molecule",
    "mom",
    "moment",
    "monastery",
    "monasticism",
    "money",
    "monger",
    "monitor",
    "monitoring",
    "monk",
    "monkey",
    "monocle",
    "monopoly",
    "monotheism",
    "monsoon",
    "monster",
    "month",
    "monument",
    "mood",
    "moody",
    "moon",
    "moonlight",
    "moonscape",
    "moonshine",
    "moose",
    "mop",
    "morale",
    "morbid",
    "morbidity",
    "morning",
    "moron",
    "morphology",
    "morsel",
    "mortal",
    "mortality",
    "mortgage",
    "mortise",
    "mosque",
    "mosquito",
    "most",
    "motel",
    "moth",
    "mother",
    "mother-in-law",
    "motion",
    "motivation",
    "motive",
    "motor",
    "motorboat",
    "motorcar",
    "motorcycle",
    "mound",
    "mountain",
    "mouse",
    "mouser",
    "mousse",
    "moustache",
    "mouth",
    "mouton",
    "movement",
    "mover",
    "movie",
    "mower",
    "mozzarella",
    "mud",
    "muffin",
    "mug",
    "mukluk",
    "mule",
    "multimedia",
    "murder",
    "muscat",
    "muscatel",
    "muscle",
    "musculature",
    "museum",
    "mushroom",
    "music",
    "music-box",
    "music-making",
    "musician",
    "muskrat",
    "mussel",
    "mustache",
    "mustard",
    "mutation",
    "mutt",
    "mutton",
    "mycoplasma",
    "mystery",
    "myth",
    "mythology",
    "nail",
    "name",
    "naming",
    "nanoparticle",
    "napkin",
    "narrative",
    "nasal",
    "nation",
    "nationality",
    "native",
    "naturalisation",
    "nature",
    "navigation",
    "necessity",
    "neck",
    "necklace",
    "necktie",
    "nectar",
    "nectarine",
    "need",
    "needle",
    "neglect",
    "negligee",
    "negotiation",
    "neighbor",
    "neighborhood",
    "neighbour",
    "neighbourhood",
    "neologism",
    "neon",
    "neonate",
    "nephew",
    "nerve",
    "nest",
    "nestling",
    "nestmate",
    "net",
    "netball",
    "netbook",
    "netsuke",
    "network",
    "networking",
    "neurobiologist",
    "neuron",
    "neuropathologist",
    "neuropsychiatry",
    "news",
    "newsletter",
    "newspaper",
    "newsprint",
    "newsstand",
    "nexus",
    "nibble",
    "nicety",
    "niche",
    "nick",
    "nickel",
    "nickname",
    "niece",
    "night",
    "nightclub",
    "nightgown",
    "nightingale",
    "nightlife",
    "nightlight",
    "nightmare",
    "ninja",
    "nit",
    "nitrogen",
    "nobody",
    "nod",
    "node",
    "noir",
    "noise",
    "nonbeliever",
    "nonconformist",
    "nondisclosure",
    "nonsense",
    "noodle",
    "noodles",
    "noon",
    "norm",
    "normal",
    "normalisation",
    "normalization",
    "north",
    "nose",
    "notation",
    "note",
    "notebook",
    "notepad",
    "nothing",
    "notice",
    "notion",
    "notoriety",
    "nougat",
    "noun",
    "nourishment",
    "novel",
    "nucleotidase",
    "nucleotide",
    "nudge",
    "nuke",
    "number",
    "numeracy",
    "numeric",
    "numismatist",
    "nun",
    "nurse",
    "nursery",
    "nursing",
    "nurture",
    "nut",
    "nutmeg",
    "nutrient",
    "nutrition",
    "nylon",
    "nymph",
    "oak",
    "oar",
    "oasis",
    "oat",
    "oatmeal",
    "oats",
    "obedience",
    "obesity",
    "obi",
    "object",
    "objection",
    "objective",
    "obligation",
    "oboe",
    "observation",
    "observatory",
    "obsession",
    "obsidian",
    "obstacle",
    "occasion",
    "occupation",
    "occurrence",
    "ocean",
    "ocelot",
    "octagon",
    "octave",
    "octavo",
    "octet",
    "octopus",
    "odometer",
    "odyssey",
    "oeuvre",
    "off-ramp",
    "offence",
    "offense",
    "offer",
    "offering",
    "office",
    "officer",
    "official",
    "offset",
    "oil",
    "okra",
    "oldie",
    "oleo",
    "olive",
    "omega",
    "omelet",
    "omission",
    "omnivore",
    "oncology",
    "onion",
    "online",
    "onset",
    "opening",
    "opera",
    "operating",
    "operation",
    "operator",
    "ophthalmologist",
    "opinion",
    "opium",
    "opossum",
    "opponent",
    "opportunist",
    "opportunity",
    "opposite",
    "opposition",
    "optimal",
    "optimisation",
    "optimist",
    "optimization",
    "option",
    "orange",
    "orangutan",
    "orator",
    "orchard",
    "orchestra",
    "orchid",
    "order",
    "ordinary",
    "ordination",
    "ore",
    "oregano",
    "organ",
    "organisation",
    "organising",
    "organization",
    "organizing",
    "orient",
    "orientation",
    "origin",
    "original",
    "originality",
    "ornament",
    "osmosis",
    "osprey",
    "ostrich",
    "other",
    "otter",
    "ottoman",
    "ounce",
    "outback",
    "outcome",
    "outfielder",
    "outfit",
    "outhouse",
    "outlaw",
    "outlay",
    "outlet",
    "outline",
    "outlook",
    "output",
    "outrage",
    "outrigger",
    "outrun",
    "outset",
    "outside",
    "oval",
    "ovary",
    "oven",
    "overcharge",
    "overclocking",
    "overcoat",
    "overexertion",
    "overflight",
    "overhead",
    "overheard",
    "overload",
    "overnighter",
    "overshoot",
    "oversight",
    "overview",
    "overweight",
    "owl",
    "owner",
    "ownership",
    "ox",
    "oxford",
    "oxygen",
    "oyster",
    "ozone",
    "pace",
    "pacemaker",
    "pack",
    "package",
    "packaging",
    "packet",
    "pad",
    "paddle",
    "paddock",
    "pagan",
    "page",
    "pagoda",
    "pail",
    "pain",
    "paint",
    "painter",
    "painting",
    "paintwork",
    "pair",
    "pajamas",
    "palace",
    "palate",
    "palm",
    "pamphlet",
    "pan",
    "pancake",
    "pancreas",
    "panda",
    "panel",
    "panic",
    "pannier",
    "panpipe",
    "pansy",
    "panther",
    "panties",
    "pantologist",
    "pantology",
    "pantry",
    "pants",
    "pantsuit",
    "panty",
    "pantyhose",
    "papa",
    "papaya",
    "paper",
    "paperback",
    "paperwork",
    "parable",
    "parachute",
    "parade",
    "paradise",
    "paragraph",
    "parallelogram",
    "paramecium",
    "paramedic",
    "parameter",
    "paranoia",
    "parcel",
    "parchment",
    "pard",
    "pardon",
    "parent",
    "parenthesis",
    "parenting",
    "park",
    "parka",
    "parking",
    "parliament",
    "parole",
    "parrot",
    "parser",
    "parsley",
    "parsnip",
    "part",
    "participant",
    "participation",
    "particle",
    "particular",
    "partner",
    "partnership",
    "partridge",
    "party",
    "pass",
    "passage",
    "passbook",
    "passenger",
    "passing",
    "passion",
    "passive",
    "passport",
    "password",
    "past",
    "pasta",
    "paste",
    "pastor",
    "pastoralist",
    "pastry",
    "pasture",
    "pat",
    "patch",
    "pate",
    "patent",
    "patentee",
    "path",
    "pathogenesis",
    "pathology",
    "pathway",
    "patience",
    "patient",
    "patina",
    "patio",
    "patriarch",
    "patrimony",
    "patriot",
    "patrol",
    "patroller",
    "patrolling",
    "patron",
    "pattern",
    "patty",
    "pattypan",
    "pause",
    "pavement",
    "pavilion",
    "paw",
    "pawnshop",
    "pay",
    "payee",
    "payment",
    "payoff",
    "pea",
    "peace",
    "peach",
    "peacoat",
    "peacock",
    "peak",
    "peanut",
    "pear",
    "pearl",
    "peasant",
    "pecan",
    "pecker",
    "pedal",
    "peek",
    "peen",
    "peer",
    "peer-to-peer",
    "pegboard",
    "pelican",
    "pelt",
    "pen",
    "penalty",
    "pence",
    "pencil",
    "pendant",
    "pendulum",
    "penguin",
    "penicillin",
    "peninsula",
    "penis",
    "pennant",
    "penny",
    "pension",
    "pentagon",
    "peony",
    "people",
    "pepper",
    "pepperoni",
    "percent",
    "percentage",
    "perception",
    "perch",
    "perennial",
    "perfection",
    "performance",
    "perfume",
    "period",
    "periodical",
    "peripheral",
    "permafrost",
    "permission",
    "permit",
    "perp",
    "perpendicular",
    "persimmon",
    "person",
    "personal",
    "personality",
    "personnel",
    "perspective",
    "pest",
    "pet",
    "petal",
    "petition",
    "petitioner",
    "petticoat",
    "pew",
    "pharmacist",
    "pharmacopoeia",
    "phase",
    "pheasant",
    "phenomenon",
    "phenotype",
    "pheromone",
    "philanthropy",
    "philosopher",
    "philosophy",
    "phone",
    "phosphate",
    "photo",
    "photodiode",
    "photograph",
    "photographer",
    "photography",
    "photoreceptor",
    "phrase",
    "phrasing",
    "physical",
    "physics",
    "physiology",
    "pianist",
    "piano",
    "piccolo",
    "pick",
    "pickax",
    "pickaxe",
    "picket",
    "pickle",
    "pickup",
    "picnic",
    "picture",
    "picturesque",
    "pie",
    "piece",
    "pier",
    "piety",
    "pig",
    "pigeon",
    "piglet",
    "pigpen",
    "pigsty",
    "pike",
    "pilaf",
    "pile",
    "pilgrim",
    "pilgrimage",
    "pill",
    "pillar",
    "pillbox",
    "pillow",
    "pilot",
    "pimp",
    "pimple",
    "pin",
    "pinafore",
    "pince-nez",
    "pine",
    "pineapple",
    "pinecone",
    "ping",
    "pink",
    "pinkie",
    "pinot",
    "pinstripe",
    "pint",
    "pinto",
    "pinworm",
    "pioneer",
    "pipe",
    "pipeline",
    "piracy",
    "pirate",
    "piss",
    "pistol",
    "pit",
    "pita",
    "pitch",
    "pitcher",
    "pitching",
    "pith",
    "pizza",
    "place",
    "placebo",
    "placement",
    "placode",
    "plagiarism",
    "plain",
    "plaintiff",
    "plan",
    "plane",
    "planet",
    "planning",
    "plant",
    "plantation",
    "planter",
    "planula",
    "plaster",
    "plasterboard",
    "plastic",
    "plate",
    "platelet",
    "platform",
    "platinum",
    "platter",
    "platypus",
    "play",
    "player",
    "playground",
    "playroom",
    "playwright",
    "plea",
    "pleasure",
    "pleat",
    "pledge",
    "plenty",
    "plier",
    "pliers",
    "plight",
    "plot",
    "plough",
    "plover",
    "plow",
    "plowman",
    "plug",
    "plugin",
    "plum",
    "plumber",
    "plume",
    "plunger",
    "plywood",
    "pneumonia",
    "pocket",
    "pocket-watch",
    "pocketbook",
    "pod",
    "podcast",
    "poem",
    "poet",
    "poetry",
    "poignance",
    "point",
    "poison",
    "poisoning",
    "poker",
    "polarisation",
    "polarization",
    "pole",
    "polenta",
    "police",
    "policeman",
    "policy",
    "polish",
    "politician",
    "politics",
    "poll",
    "polliwog",
    "pollutant",
    "pollution",
    "polo",
    "polyester",
    "polyp",
    "pomegranate",
    "pomelo",
    "pompom",
    "poncho",
    "pond",
    "pony",
    "pool",
    "poor",
    "pop",
    "popcorn",
    "poppy",
    "popsicle",
    "popularity",
    "population",
    "populist",
    "porcelain",
    "porch",
    "porcupine",
    "pork",
    "porpoise",
    "port",
    "porter",
    "portfolio",
    "porthole",
    "portion",
    "portrait",
    "position",
    "possession",
    "possibility",
    "possible",
    "post",
    "postage",
    "postbox",
    "poster",
    "posterior",
    "postfix",
    "pot",
    "potato",
    "potential",
    "pottery",
    "potty",
    "pouch",
    "poultry",
    "pound",
    "pounding",
    "poverty",
    "powder",
    "power",
    "practice",
    "practitioner",
    "prairie",
    "praise",
    "pray",
    "prayer",
    "precedence",
    "precedent",
    "precipitation",
    "precision",
    "predecessor",
    "preface",
    "preference",
    "prefix",
    "pregnancy",
    "prejudice",
    "prelude",
    "premeditation",
    "premier",
    "premise",
    "premium",
    "preoccupation",
    "preparation",
    "prescription",
    "presence",
    "present",
    "presentation",
    "preservation",
    "preserves",
    "presidency",
    "president",
    "press",
    "pressroom",
    "pressure",
    "pressurisation",
    "pressurization",
    "prestige",
    "presume",
    "pretzel",
    "prevalence",
    "prevention",
    "prey",
    "price",
    "pricing",
    "pride",
    "priest",
    "priesthood",
    "primary",
    "primate",
    "prince",
    "princess",
    "principal",
    "principle",
    "print",
    "printer",
    "printing",
    "prior",
    "priority",
    "prison",
    "prisoner",
    "privacy",
    "private",
    "privilege",
    "prize",
    "prizefight",
    "probability",
    "probation",
    "probe",
    "problem",
    "procedure",
    "proceedings",
    "process",
    "processing",
    "processor",
    "proctor",
    "procurement",
    "produce",
    "producer",
    "product",
    "production",
    "productivity",
    "profession",
    "professional",
    "professor",
    "profile",
    "profit",
    "progenitor",
    "program",
    "programme",
    "programming",
    "progress",
    "progression",
    "prohibition",
    "project",
    "proliferation",
    "promenade",
    "promise",
    "promotion",
    "prompt",
    "pronoun",
    "pronunciation",
    "proof",
    "proof-reader",
    "propaganda",
    "propane",
    "property",
    "prophet",
    "proponent",
    "proportion",
    "proposal",
    "proposition",
    "proprietor",
    "prose",
    "prosecution",
    "prosecutor",
    "prospect",
    "prosperity",
    "prostacyclin",
    "prostanoid",
    "prostrate",
    "protection",
    "protein",
    "protest",
    "protocol",
    "providence",
    "provider",
    "province",
    "provision",
    "prow",
    "proximal",
    "proximity",
    "prune",
    "pruner",
    "pseudocode",
    "pseudoscience",
    "psychiatrist",
    "psychoanalyst",
    "psychologist",
    "psychology",
    "ptarmigan",
    "pub",
    "public",
    "publication",
    "publicity",
    "publisher",
    "publishing",
    "pudding",
    "puddle",
    "puffin",
    "pug",
    "puggle",
    "pulley",
    "pulse",
    "puma",
    "pump",
    "pumpernickel",
    "pumpkin",
    "pumpkinseed",
    "pun",
    "punch",
    "punctuation",
    "punishment",
    "pup",
    "pupa",
    "pupil",
    "puppet",
    "puppy",
    "purchase",
    "puritan",
    "purity",
    "purple",
    "purpose",
    "purr",
    "purse",
    "pursuit",
    "push",
    "pusher",
    "put",
    "puzzle",
    "pyramid",
    "pyridine",
    "quadrant",
    "quail",
    "qualification",
    "quality",
    "quantity",
    "quart",
    "quarter",
    "quartet",
    "quartz",
    "queen",
    "query",
    "quest",
    "question",
    "questioner",
    "questionnaire",
    "quiche",
    "quicksand",
    "quiet",
    "quill",
    "quilt",
    "quince",
    "quinoa",
    "quit",
    "quiver",
    "quota",
    "quotation",
    "quote",
    "rabbi",
    "rabbit",
    "raccoon",
    "race",
    "racer",
    "racing",
    "racism",
    "racist",
    "rack",
    "radar",
    "radiator",
    "radio",
    "radiosonde",
    "radish",
    "raffle",
    "raft",
    "rag",
    "rage",
    "raid",
    "rail",
    "railing",
    "railroad",
    "railway",
    "raiment",
    "rain",
    "rainbow",
    "raincoat",
    "rainmaker",
    "rainstorm",
    "rainy",
    "raise",
    "raisin",
    "rake",
    "rally",
    "ram",
    "rambler",
    "ramen",
    "ramie",
    "ranch",
    "rancher",
    "randomisation",
    "randomization",
    "range",
    "ranger",
    "rank",
    "rap",
    "rape",
    "raspberry",
    "rat",
    "rate",
    "ratepayer",
    "rating",
    "ratio",
    "rationale",
    "rations",
    "raven",
    "ravioli",
    "rawhide",
    "ray",
    "rayon",
    "razor",
    "reach",
    "reactant",
    "reaction",
    "read",
    "reader",
    "readiness",
    "reading",
    "real",
    "reality",
    "realization",
    "realm",
    "reamer",
    "rear",
    "reason",
    "reasoning",
    "rebel",
    "rebellion",
    "reboot",
    "recall",
    "recapitulation",
    "receipt",
    "receiver",
    "reception",
    "receptor",
    "recess",
    "recession",
    "recipe",
    "recipient",
    "reciprocity",
    "reclamation",
    "recliner",
    "recognition",
    "recollection",
    "recommendation",
    "reconsideration",
    "record",
    "recorder",
    "recording",
    "recovery",
    "recreation",
    "recruit",
    "rectangle",
    "red",
    "redesign",
    "redhead",
    "redirect",
    "rediscovery",
    "reduction",
    "reef",
    "refectory",
    "reference",
    "referendum",
    "reflection",
    "reform",
    "refreshments",
    "refrigerator",
    "refuge",
    "refund",
    "refusal",
    "refuse",
    "regard",
    "regime",
    "region",
    "regionalism",
    "register",
    "registration",
    "registry",
    "regret",
    "regulation",
    "regulator",
    "rehospitalisation",
    "rehospitalization",
    "reindeer",
    "reinscription",
    "reject",
    "relation",
    "relationship",
    "relative",
    "relaxation",
    "relay",
    "release",
    "reliability",
    "relief",
    "religion",
    "relish",
    "reluctance",
    "remains",
    "remark",
    "reminder",
    "remnant",
    "remote",
    "removal",
    "renaissance",
    "rent",
    "reorganisation",
    "reorganization",
    "repair",
    "reparation",
    "repayment",
    "repeat",
    "replacement",
    "replica",
    "replication",
    "reply",
    "report",
    "reporter",
    "reporting",
    "repository",
    "representation",
    "representative",
    "reprocessing",
    "republic",
    "republican",
    "reputation",
    "request",
    "requirement",
    "resale",
    "rescue",
    "research",
    "researcher",
    "resemblance",
    "reservation",
    "reserve",
    "reservoir",
    "reset",
    "residence",
    "resident",
    "residue",
    "resist",
    "resistance",
    "resolution",
    "resolve",
    "resort",
    "resource",
    "respect",
    "respite",
    "response",
    "responsibility",
    "rest",
    "restaurant",
    "restoration",
    "restriction",
    "restroom",
    "restructuring",
    "result",
    "resume",
    "retailer",
    "retention",
    "rethinking",
    "retina",
    "retirement",
    "retouching",
    "retreat",
    "retrospect",
    "retrospective",
    "retrospectivity",
    "return",
    "reunion",
    "revascularisation",
    "revascularization",
    "reveal",
    "revelation",
    "revenant",
    "revenge",
    "revenue",
    "reversal",
    "reverse",
    "review",
    "revitalisation",
    "revitalization",
    "revival",
    "revolution",
    "revolver",
    "reward",
    "rhetoric",
    "rheumatism",
    "rhinoceros",
    "rhubarb",
    "rhyme",
    "rhythm",
    "rib",
    "ribbon",
    "rice",
    "riddle",
    "ride",
    "rider",
    "ridge",
    "riding",
    "rifle",
    "right",
    "rim",
    "ring",
    "ringworm",
    "riot",
    "rip",
    "ripple",
    "rise",
    "riser",
    "risk",
    "rite",
    "ritual",
    "river",
    "riverbed",
    "rivulet",
    "road",
    "roadway",
    "roar",
    "roast",
    "robe",
    "robin",
    "robot",
    "robotics",
    "rock",
    "rocker",
    "rocket",
    "rocket-ship",
    "rod",
    "role",
    "roll",
    "roller",
    "romaine",
    "romance",
    "roof",
    "room",
    "roommate",
    "rooster",
    "root",
    "rope",
    "rose",
    "rosemary",
    "roster",
    "rostrum",
    "rotation",
    "round",
    "roundabout",
    "route",
    "router",
    "routine",
    "row",
    "rowboat",
    "rowing",
    "rubber",
    "rubbish",
    "rubric",
    "ruby",
    "ruckus",
    "rudiment",
    "ruffle",
    "rug",
    "rugby",
    "ruin",
    "rule",
    "ruler",
    "ruling",
    "rum",
    "rumor",
    "run",
    "runaway",
    "runner",
    "running",
    "runway",
    "rush",
    "rust",
    "rutabaga",
    "rye",
    "sabre",
    "sac",
    "sack",
    "saddle",
    "sadness",
    "safari",
    "safe",
    "safeguard",
    "safety",
    "saffron",
    "sage",
    "sail",
    "sailboat",
    "sailing",
    "sailor",
    "saint",
    "sake",
    "salad",
    "salami",
    "salary",
    "sale",
    "salesman",
    "salmon",
    "salon",
    "saloon",
    "salsa",
    "salt",
    "salute",
    "samovar",
    "sampan",
    "sample",
    "samurai",
    "sanction",
    "sanctity",
    "sanctuary",
    "sand",
    "sandal",
    "sandbar",
    "sandpaper",
    "sandwich",
    "sanity",
    "sardine",
    "sari",
    "sarong",
    "sash",
    "satellite",
    "satin",
    "satire",
    "satisfaction",
    "sauce",
    "saucer",
    "sauerkraut",
    "sausage",
    "savage",
    "savannah",
    "saving",
    "savings",
    "savior",
    "saviour",
    "savory",
    "saw",
    "saxophone",
    "scaffold",
    "scale",
    "scallion",
    "scallops",
    "scalp",
    "scam",
    "scanner",
    "scarecrow",
    "scarf",
    "scarification",
    "scenario",
    "scene",
    "scenery",
    "scent",
    "schedule",
    "scheduling",
    "schema",
    "scheme",
    "schizophrenic",
    "schnitzel",
    "scholar",
    "scholarship",
    "school",
    "schoolhouse",
    "schooner",
    "science",
    "scientist",
    "scimitar",
    "scissors",
    "scooter",
    "scope",
    "score",
    "scorn",
    "scorpion",
    "scotch",
    "scout",
    "scow",
    "scrambled",
    "scrap",
    "scraper",
    "scratch",
    "screamer",
    "screen",
    "screening",
    "screenwriting",
    "screw",
    "screw-up",
    "screwdriver",
    "scrim",
    "scrip",
    "script",
    "scripture",
    "scrutiny",
    "sculpting",
    "sculptural",
    "sculpture",
    "sea",
    "seabass",
    "seafood",
    "seagull",
    "seal",
    "seaplane",
    "search",
    "seashore",
    "seaside",
    "season",
    "seat",
    "seaweed",
    "second",
    "secrecy",
    "secret",
    "secretariat",
    "secretary",
    "secretion",
    "section",
    "sectional",
    "sector",
    "security",
    "sediment",
    "seed",
    "seeder",
    "seeker",
    "seep",
    "segment",
    "seizure",
    "selection",
    "self",
    "self-confidence",
    "self-control",
    "self-esteem",
    "seller",
    "selling",
    "semantics",
    "semester",
    "semicircle",
    "semicolon",
    "semiconductor",
    "seminar",
    "senate",
    "senator",
    "sender",
    "senior",
    "sense",
    "sensibility",
    "sensitive",
    "sensitivity",
    "sensor",
    "sentence",
    "sentencing",
    "sentiment",
    "sepal",
    "separation",
    "septicaemia",
    "sequel",
    "sequence",
    "serial",
    "series",
    "sermon",
    "serum",
    "serval",
    "servant",
    "server",
    "service",
    "servitude",
    "sesame",
    "session",
    "set",
    "setback",
    "setting",
    "settlement",
    "settler",
    "severity",
    "sewer",
    "sex",
    "sexuality",
    "shack",
    "shackle",
    "shade",
    "shadow",
    "shadowbox",
    "shakedown",
    "shaker",
    "shallot",
    "shallows",
    "shame",
    "shampoo",
    "shanty",
    "shape",
    "share",
    "shareholder",
    "shark",
    "shaw",
    "shawl",
    "shear",
    "shearling",
    "sheath",
    "shed",
    "sheep",
    "sheet",
    "shelf",
    "shell",
    "shelter",
    "sherbet",
    "sherry",
    "shield",
    "shift",
    "shin",
    "shine",
    "shingle",
    "ship",
    "shipper",
    "shipping",
    "shipyard",
    "shirt",
    "shirtdress",
    "shit",
    "shoat",
    "shock",
    "shoe",
    "shoe-horn",
    "shoehorn",
    "shoelace",
    "shoemaker",
    "shoes",
    "shoestring",
    "shofar",
    "shoot",
    "shootdown",
    "shop",
    "shopper",
    "shopping",
    "shore",
    "shoreline",
    "short",
    "shortage",
    "shorts",
    "shortwave",
    "shot",
    "shoulder",
    "shout",
    "shovel",
    "show",
    "show-stopper",
    "shower",
    "shred",
    "shrimp",
    "shrine",
    "shutdown",
    "sibling",
    "sick",
    "sickness",
    "side",
    "sideboard",
    "sideburns",
    "sidecar",
    "sidestream",
    "sidewalk",
    "siding",
    "siege",
    "sigh",
    "sight",
    "sightseeing",
    "sign",
    "signal",
    "signature",
    "signet",
    "significance",
    "signify",
    "signup",
    "silence",
    "silica",
    "silicon",
    "silk",
    "silkworm",
    "sill",
    "silly",
    "silo",
    "silver",
    "similarity",
    "simple",
    "simplicity",
    "simplification",
    "simvastatin",
    "sin",
    "singer",
    "singing",
    "singular",
    "sink",
    "sinuosity",
    "sip",
    "sir",
    "sister",
    "sister-in-law",
    "sitar",
    "site",
    "situation",
    "size",
    "skate",
    "skating",
    "skean",
    "skeleton",
    "ski",
    "skiing",
    "skill",
    "skin",
    "skirt",
    "skull",
    "skullcap",
    "skullduggery",
    "skunk",
    "sky",
    "skylight",
    "skyline",
    "skyscraper",
    "skywalk",
    "slang",
    "slapstick",
    "slash",
    "slate",
    "slave",
    "slavery",
    "slaw",
    "sled",
    "sledge",
    "sleep",
    "sleepiness",
    "sleeping",
    "sleet",
    "sleuth",
    "slice",
    "slide",
    "slider",
    "slime",
    "slip",
    "slipper",
    "slippers",
    "slope",
    "slot",
    "sloth",
    "slump",
    "smell",
    "smelting",
    "smile",
    "smith",
    "smock",
    "smog",
    "smoke",
    "smoking",
    "smolt",
    "smuggling",
    "snack",
    "snail",
    "snake",
    "snakebite",
    "snap",
    "snarl",
    "sneaker",
    "sneakers",
    "sneeze",
    "sniffle",
    "snob",
    "snorer",
    "snow",
    "snowboarding",
    "snowflake",
    "snowman",
    "snowmobiling",
    "snowplow",
    "snowstorm",
    "snowsuit",
    "snuck",
    "snug",
    "snuggle",
    "soap",
    "soccer",
    "socialism",
    "socialist",
    "society",
    "sociology",
    "sock",
    "socks",
    "soda",
    "sofa",
    "softball",
    "softdrink",
    "softening",
    "software",
    "soil",
    "soldier",
    "sole",
    "solicitation",
    "solicitor",
    "solidarity",
    "solidity",
    "soliloquy",
    "solitaire",
    "solution",
    "solvency",
    "sombrero",
    "somebody",
    "someone",
    "someplace",
    "somersault",
    "something",
    "somewhere",
    "son",
    "sonar",
    "sonata",
    "song",
    "songbird",
    "sonnet",
    "soot",
    "sophomore",
    "soprano",
    "sorbet",
    "sorghum",
    "sorrel",
    "sorrow",
    "sort",
    "soul",
    "soulmate",
    "sound",
    "soundness",
    "soup",
    "source",
    "sourwood",
    "sousaphone",
    "south",
    "southeast",
    "souvenir",
    "sovereignty",
    "sow",
    "soy",
    "soybean",
    "space",
    "spacing",
    "spade",
    "spaghetti",
    "span",
    "spandex",
    "spank",
    "sparerib",
    "spark",
    "sparrow",
    "spasm",
    "spat",
    "spatula",
    "spawn",
    "speaker",
    "speakerphone",
    "speaking",
    "spear",
    "spec",
    "special",
    "specialist",
    "specialty",
    "species",
    "specification",
    "spectacle",
    "spectacles",
    "spectrograph",
    "spectrum",
    "speculation",
    "speech",
    "speed",
    "speedboat",
    "spell",
    "spelling",
    "spelt",
    "spending",
    "sphere",
    "sphynx",
    "spice",
    "spider",
    "spiderling",
    "spike",
    "spill",
    "spinach",
    "spine",
    "spiral",
    "spirit",
    "spiritual",
    "spirituality",
    "spit",
    "spite",
    "spleen",
    "splendor",
    "split",
    "spokesman",
    "spokeswoman",
    "sponge",
    "sponsor",
    "sponsorship",
    "spool",
    "spoon",
    "spork",
    "sport",
    "sportsman",
    "spot",
    "spotlight",
    "spouse",
    "sprag",
    "sprat",
    "spray",
    "spread",
    "spreadsheet",
    "spree",
    "spring",
    "sprinkles",
    "sprinter",
    "sprout",
    "spruce",
    "spud",
    "spume",
    "spur",
    "spy",
    "spyglass",
    "square",
    "squash",
    "squatter",
    "squeegee",
    "squid",
    "squirrel",
    "stab",
    "stability",
    "stable",
    "stack",
    "stacking",
    "stadium",
    "staff",
    "stag",
    "stage",
    "stain",
    "stair",
    "staircase",
    "stake",
    "stalk",
    "stall",
    "stallion",
    "stamen",
    "stamina",
    "stamp",
    "stance",
    "stand",
    "standard",
    "standardisation",
    "standardization",
    "standing",
    "standoff",
    "standpoint",
    "star",
    "starboard",
    "start",
    "starter",
    "state",
    "statement",
    "statin",
    "station",
    "station-wagon",
    "statistic",
    "statistics",
    "statue",
    "status",
    "statute",
    "stay",
    "steak",
    "stealth",
    "steam",
    "steamroller",
    "steel",
    "steeple",
    "stem",
    "stench",
    "stencil",
    "step",
    "step-aunt",
    "step-brother",
    "step-daughter",
    "step-father",
    "step-grandfather",
    "step-grandmother",
    "step-mother",
    "step-sister",
    "step-son",
    "step-uncle",
    "stepdaughter",
    "stepmother",
    "stepping-stone",
    "stepson",
    "stereo",
    "stew",
    "steward",
    "stick",
    "sticker",
    "stiletto",
    "still",
    "stimulation",
    "stimulus",
    "sting",
    "stinger",
    "stir-fry",
    "stitch",
    "stitcher",
    "stock",
    "stock-in-trade",
    "stockings",
    "stole",
    "stomach",
    "stone",
    "stonework",
    "stool",
    "stop",
    "stopsign",
    "stopwatch",
    "storage",
    "store",
    "storey",
    "storm",
    "story",
    "story-telling",
    "storyboard",
    "stot",
    "stove",
    "strait",
    "strand",
    "stranger",
    "strap",
    "strategy",
    "straw",
    "strawberry",
    "strawman",
    "stream",
    "street",
    "streetcar",
    "strength",
    "stress",
    "stretch",
    "strife",
    "strike",
    "string",
    "strip",
    "stripe",
    "strobe",
    "stroke",
    "structure",
    "strudel",
    "struggle",
    "stucco",
    "stud",
    "student",
    "studio",
    "study",
    "stuff",
    "stumbling",
    "stump",
    "stupidity",
    "sturgeon",
    "sty",
    "style",
    "styling",
    "stylus",
    "sub",
    "subcomponent",
    "subconscious",
    "subcontractor",
    "subexpression",
    "subgroup",
    "subject",
    "submarine",
    "submitter",
    "subprime",
    "subroutine",
    "subscription",
    "subsection",
    "subset",
    "subsidence",
    "subsidiary",
    "subsidy",
    "substance",
    "substitution",
    "subtitle",
    "suburb",
    "subway",
    "success",
    "succotash",
    "suck",
    "sucker",
    "suede",
    "suet",
    "suffocation",
    "sugar",
    "suggestion",
    "suicide",
    "suit",
    "suitcase",
    "suite",
    "sulfur",
    "sultan",
    "sum",
    "summary",
    "summer",
    "summit",
    "sun",
    "sunbeam",
    "sunbonnet",
    "sundae",
    "sunday",
    "sundial",
    "sunflower",
    "sunglasses",
    "sunlamp",
    "sunlight",
    "sunrise",
    "sunroom",
    "sunset",
    "sunshine",
    "superiority",
    "supermarket",
    "supernatural",
    "supervision",
    "supervisor",
    "supper",
    "supplement",
    "supplier",
    "supply",
    "support",
    "supporter",
    "suppression",
    "supreme",
    "surface",
    "surfboard",
    "surge",
    "surgeon",
    "surgery",
    "surname",
    "surplus",
    "surprise",
    "surround",
    "surroundings",
    "surrounds",
    "survey",
    "survival",
    "survivor",
    "sushi",
    "suspect",
    "suspenders",
    "suspension",
    "sustainment",
    "sustenance",
    "swallow",
    "swamp",
    "swan",
    "swanling",
    "swath",
    "sweat",
    "sweater",
    "sweatshirt",
    "sweatshop",
    "sweatsuit",
    "sweets",
    "swell",
    "swim",
    "swimming",
    "swimsuit",
    "swine",
    "swing",
    "switch",
    "switchboard",
    "switching",
    "swivel",
    "sword",
    "swordfight",
    "swordfish",
    "sycamore",
    "symbol",
    "symmetry",
    "sympathy",
    "symptom",
    "syndicate",
    "syndrome",
    "synergy",
    "synod",
    "synonym",
    "synthesis",
    "syrup",
    "system",
    "t-shirt",
    "tab",
    "tabby",
    "tabernacle",
    "table",
    "tablecloth",
    "tablet",
    "tabletop",
    "tachometer",
    "tackle",
    "taco",
    "tactics",
    "tactile",
    "tadpole",
    "tag",
    "tail",
    "tailbud",
    "tailor",
    "tailspin",
    "take-out",
    "takeover",
    "tale",
    "talent",
    "talk",
    "talking",
    "tam-o'-shanter",
    "tamale",
    "tambour",
    "tambourine",
    "tan",
    "tandem",
    "tangerine",
    "tank",
    "tank-top",
    "tanker",
    "tankful",
    "tap",
    "tape",
    "tapioca",
    "target",
    "taro",
    "tarragon",
    "tart",
    "task",
    "tassel",
    "taste",
    "tatami",
    "tattler",
    "tattoo",
    "tavern",
    "tax",
    "taxi",
    "taxicab",
    "taxpayer",
    "tea",
    "teacher",
    "teaching",
    "team",
    "teammate",
    "teapot",
    "tear",
    "tech",
    "technician",
    "technique",
    "technologist",
    "technology",
    "tectonics",
    "teen",
    "teenager",
    "teepee",
    "telephone",
    "telescreen",
    "teletype",
    "television",
    "tell",
    "teller",
    "temp",
    "temper",
    "temperature",
    "temple",
    "tempo",
    "temporariness",
    "temporary",
    "temptation",
    "temptress",
    "tenant",
    "tendency",
    "tender",
    "tenement",
    "tenet",
    "tennis",
    "tenor",
    "tension",
    "tensor",
    "tent",
    "tentacle",
    "tenth",
    "tepee",
    "teriyaki",
    "term",
    "terminal",
    "termination",
    "terminology",
    "termite",
    "terrace",
    "terracotta",
    "terrapin",
    "terrarium",
    "territory",
    "terror",
    "terrorism",
    "terrorist",
    "test",
    "testament",
    "testimonial",
    "testimony",
    "testing",
    "text",
    "textbook",
    "textual",
    "texture",
    "thanks",
    "thaw",
    "theater",
    "theft",
    "theism",
    "theme",
    "theology",
    "theory",
    "therapist",
    "therapy",
    "thermals",
    "thermometer",
    "thermostat",
    "thesis",
    "thickness",
    "thief",
    "thigh",
    "thing",
    "thinking",
    "thirst",
    "thistle",
    "thong",
    "thongs",
    "thorn",
    "thought",
    "thousand",
    "thread",
    "threat",
    "threshold",
    "thrift",
    "thrill",
    "throat",
    "throne",
    "thrush",
    "thrust",
    "thug",
    "thumb",
    "thump",
    "thunder",
    "thunderbolt",
    "thunderhead",
    "thunderstorm",
    "thyme",
    "tiara",
    "tic",
    "tick",
    "ticket",
    "tide",
    "tie",
    "tiger",
    "tights",
    "tile",
    "till",
    "tilt",
    "timbale",
    "timber",
    "time",
    "timeline",
    "timeout",
    "timer",
    "timetable",
    "timing",
    "timpani",
    "tin",
    "tinderbox",
    "tinkle",
    "tintype",
    "tip",
    "tire",
    "tissue",
    "titanium",
    "title",
    "toad",
    "toast",
    "toaster",
    "tobacco",
    "today",
    "toe",
    "toenail",
    "toffee",
    "tofu",
    "tog",
    "toga",
    "toilet",
    "tolerance",
    "tolerant",
    "toll",
    "tom-tom",
    "tomatillo",
    "tomato",
    "tomb",
    "tomography",
    "tomorrow",
    "ton",
    "tonality",
    "tone",
    "tongue",
    "tonic",
    "tonight",
    "tool",
    "toot",
    "tooth",
    "toothbrush",
    "toothpaste",
    "toothpick",
    "top",
    "top-hat",
    "topic",
    "topsail",
    "toque",
    "toreador",
    "tornado",
    "torso",
    "torte",
    "tortellini",
    "tortilla",
    "tortoise",
    "tosser",
    "total",
    "tote",
    "touch",
    "tough-guy",
    "tour",
    "tourism",
    "tourist",
    "tournament",
    "tow-truck",
    "towel",
    "tower",
    "town",
    "townhouse",
    "township",
    "toy",
    "trace",
    "trachoma",
    "track",
    "tracking",
    "tracksuit",
    "tract",
    "tractor",
    "trade",
    "trader",
    "trading",
    "tradition",
    "traditionalism",
    "traffic",
    "trafficker",
    "tragedy",
    "trail",
    "trailer",
    "trailpatrol",
    "train",
    "trainer",
    "training",
    "trait",
    "tram",
    "tramp",
    "trance",
    "transaction",
    "transcript",
    "transfer",
    "transformation",
    "transit",
    "transition",
    "translation",
    "transmission",
    "transom",
    "transparency",
    "transplantation",
    "transport",
    "transportation",
    "trap",
    "trapdoor",
    "trapezium",
    "trapezoid",
    "trash",
    "travel",
    "traveler",
    "tray",
    "treasure",
    "treasury",
    "treat",
    "treatment",
    "treaty",
    "tree",
    "trek",
    "trellis",
    "tremor",
    "trench",
    "trend",
    "triad",
    "trial",
    "triangle",
    "tribe",
    "tributary",
    "trick",
    "trigger",
    "trigonometry",
    "trillion",
    "trim",
    "trinket",
    "trip",
    "tripod",
    "tritone",
    "triumph",
    "trolley",
    "trombone",
    "troop",
    "trooper",
    "trophy",
    "trouble",
    "trousers",
    "trout",
    "trove",
    "trowel",
    "truck",
    "trumpet",
    "trunk",
    "trust",
    "trustee",
    "truth",
    "try",
    "tsunami",
    "tub",
    "tuba",
    "tube",
    "tuber",
    "tug",
    "tugboat",
    "tuition",
    "tulip",
    "tumbler",
    "tummy",
    "tuna",
    "tune",
    "tune-up",
    "tunic",
    "tunnel",
    "turban",
    "turf",
    "turkey",
    "turmeric",
    "turn",
    "turning",
    "turnip",
    "turnover",
    "turnstile",
    "turret",
    "turtle",
    "tusk",
    "tussle",
    "tutu",
    "tuxedo",
    "tweet",
    "tweezers",
    "twig",
    "twilight",
    "twine",
    "twins",
    "twist",
    "twister",
    "twitter",
    "type",
    "typeface",
    "typewriter",
    "typhoon",
    "ukulele",
    "ultimatum",
    "umbrella",
    "unblinking",
    "uncertainty",
    "uncle",
    "underclothes",
    "underestimate",
    "underground",
    "underneath",
    "underpants",
    "underpass",
    "undershirt",
    "understanding",
    "understatement",
    "undertaker",
    "underwear",
    "underweight",
    "underwire",
    "underwriting",
    "unemployment",
    "unibody",
    "uniform",
    "uniformity",
    "union",
    "unique",
    "unit",
    "unity",
    "universe",
    "university",
    "update",
    "upgrade",
    "uplift",
    "upper",
    "upstairs",
    "upward",
    "urge",
    "urgency",
    "urn",
    "usage",
    "use",
    "user",
    "usher",
    "usual",
    "utensil",
    "utilisation",
    "utility",
    "utilization",
    "vacation",
    "vaccine",
    "vacuum",
    "vagrant",
    "valance",
    "valentine",
    "validate",
    "validity",
    "valley",
    "valuable",
    "value",
    "vampire",
    "van",
    "vanadyl",
    "vane",
    "vanilla",
    "vanity",
    "variability",
    "variable",
    "variant",
    "variation",
    "variety",
    "vascular",
    "vase",
    "vault",
    "vaulting",
    "veal",
    "vector",
    "vegetable",
    "vegetarian",
    "vegetarianism",
    "vegetation",
    "vehicle",
    "veil",
    "vein",
    "veldt",
    "vellum",
    "velocity",
    "velodrome",
    "velvet",
    "vendor",
    "veneer",
    "vengeance",
    "venison",
    "venom",
    "venti",
    "venture",
    "venue",
    "veranda",
    "verb",
    "verdict",
    "verification",
    "vermicelli",
    "vernacular",
    "verse",
    "version",
    "vertigo",
    "verve",
    "vessel",
    "vest",
    "vestment",
    "vet",
    "veteran",
    "veterinarian",
    "veto",
    "viability",
    "vibe",
    "vibraphone",
    "vibration",
    "vibrissae",
    "vice",
    "vicinity",
    "victim",
    "victory",
    "video",
    "view",
    "viewer",
    "vignette",
    "villa",
    "village",
    "vine",
    "vinegar",
    "vineyard",
    "vintage",
    "vintner",
    "vinyl",
    "viola",
    "violation",
    "violence",
    "violet",
    "violin",
    "virginal",
    "virtue",
    "virus",
    "visa",
    "viscose",
    "vise",
    "vision",
    "visit",
    "visitor",
    "visor",
    "vista",
    "visual",
    "vitality",
    "vitamin",
    "vitro",
    "vivo",
    "vixen",
    "vodka",
    "vogue",
    "voice",
    "void",
    "vol",
    "volatility",
    "volcano",
    "volleyball",
    "volume",
    "volunteer",
    "volunteering",
    "vomit",
    "vote",
    "voter",
    "voting",
    "voyage",
    "vulture",
    "wad",
    "wafer",
    "waffle",
    "wage",
    "wagon",
    "waist",
    "waistband",
    "wait",
    "waiter",
    "waiting",
    "waitress",
    "waiver",
    "wake",
    "walk",
    "walker",
    "walking",
    "walkway",
    "wall",
    "wallaby",
    "wallet",
    "walnut",
    "walrus",
    "wampum",
    "wannabe",
    "want",
    "war",
    "warden",
    "wardrobe",
    "warfare",
    "warlock",
    "warlord",
    "warm-up",
    "warming",
    "warmth",
    "warning",
    "warrant",
    "warren",
    "warrior",
    "wasabi",
    "wash",
    "washbasin",
    "washcloth",
    "washer",
    "washtub",
    "wasp",
    "waste",
    "wastebasket",
    "wasting",
    "watch",
    "watcher",
    "watchmaker",
    "water",
    "waterbed",
    "watercress",
    "waterfall",
    "waterfront",
    "watermelon",
    "waterskiing",
    "waterspout",
    "waterwheel",
    "wave",
    "waveform",
    "wax",
    "way",
    "weakness",
    "wealth",
    "weapon",
    "wear",
    "weasel",
    "weather",
    "web",
    "webinar",
    "webmail",
    "webpage",
    "website",
    "wedding",
    "wedge",
    "weed",
    "weeder",
    "weedkiller",
    "week",
    "weekend",
    "weekender",
    "weight",
    "weird",
    "welcome",
    "welfare",
    "well",
    "well-being",
    "west",
    "western",
    "wet-bar",
    "wetland",
    "wetsuit",
    "whack",
    "whale",
    "wharf",
    "wheat",
    "wheel",
    "whelp",
    "whey",
    "whip",
    "whirlpool",
    "whirlwind",
    "whisker",
    "whiskey",
    "whisper",
    "whistle",
    "white",
    "whole",
    "wholesale",
    "wholesaler",
    "whorl",
    "wick",
    "widget",
    "widow",
    "width",
    "wife",
    "wifi",
    "wild",
    "wildebeest",
    "wilderness",
    "wildlife",
    "will",
    "willingness",
    "willow",
    "win",
    "wind",
    "wind-chime",
    "windage",
    "window",
    "windscreen",
    "windshield",
    "wine",
    "winery",
    "wing",
    "wingman",
    "wingtip",
    "wink",
    "winner",
    "winter",
    "wire",
    "wiretap",
    "wiring",
    "wisdom",
    "wiseguy",
    "wish",
    "wisteria",
    "wit",
    "witch",
    "witch-hunt",
    "withdrawal",
    "witness",
    "wok",
    "wolf",
    "woman",
    "wombat",
    "wonder",
    "wont",
    "wood",
    "woodchuck",
    "woodland",
    "woodshed",
    "woodwind",
    "wool",
    "woolens",
    "word",
    "wording",
    "work",
    "workbench",
    "worker",
    "workforce",
    "workhorse",
    "working",
    "workout",
    "workplace",
    "workshop",
    "world",
    "worm",
    "worry",
    "worship",
    "worshiper",
    "worth",
    "wound",
    "wrap",
    "wraparound",
    "wrapper",
    "wrapping",
    "wreck",
    "wrecker",
    "wren",
    "wrench",
    "wrestler",
    "wriggler",
    "wrinkle",
    "wrist",
    "writer",
    "writing",
    "wrong",
    "xylophone",
    "yacht",
    "yahoo",
    "yak",
    "yam",
    "yang",
    "yard",
    "yarmulke",
    "yarn",
    "yawl",
    "year",
    "yeast",
    "yellow",
    "yellowjacket",
    "yesterday",
    "yew",
    "yin",
    "yoga",
    "yogurt",
    "yoke",
    "yolk",
    "young",
    "youngster",
    "yourself",
    "youth",
    "yoyo",
    "yurt",
    "zampone",
    "zebra",
    "zebrafish",
    "zen",
    "zephyr",
    "zero",
    "ziggurat",
    "zinc",
    "zipper",
    "zither",
    "zombie",
    "zone",
    "zoo",
    "zoologist",
    "zoology",
    "zoot-suit",
    "zucchini"
  ]
};

// src/modules/word/core/spanish.ts
var SPANISH_WORDS = {
  verbs: [
    "ser",
    "haber",
    "estar",
    "tener",
    "hacer",
    "poder",
    "decir",
    "ir",
    "ver",
    "dar",
    "saber",
    "querer",
    "llegar",
    "pasar",
    "deber",
    "poner",
    "parecer",
    "quedar",
    "creer",
    "hablar",
    "llevar",
    "dejar",
    "seguir",
    "encontrar",
    "llamar",
    "venir",
    "pensar",
    "salir",
    "volver",
    "tomar",
    "conocer",
    "vivir",
    "sentir",
    "tratar",
    "mirar",
    "contar",
    "empezar",
    "esperar",
    "buscar",
    "existir",
    "entrar",
    "trabajar",
    "escribir",
    "perder",
    "producir",
    "ocurrir",
    "entender",
    "pedir",
    "recibir",
    "recordar",
    "terminar",
    "permitir",
    "aparecer",
    "conseguir",
    "comenzar",
    "servir",
    "sacar",
    "necesitar",
    "mantener",
    "resultar",
    "leer",
    "caer",
    "cambiar",
    "presentar",
    "crear",
    "abrir",
    "considerar",
    "oir",
    "acabar",
    "convertir",
    "ganar",
    "formar",
    "traer",
    "partir",
    "morir",
    "aceptar",
    "realizar",
    "suponer",
    "comprender",
    "lograr",
    "explicar",
    "preguntar",
    "tocar",
    "reconocer",
    "estudiar",
    "alcanzar",
    "nacer",
    "dirigir",
    "correr",
    "utilizar",
    "pagar",
    "ayudar",
    "gustar",
    "jugar",
    "escuchar",
    "cumplir",
    "ofrecer",
    "descubrir",
    "levantar",
    "intentar"
  ],
  conjuctions: [
    "y",
    "e",
    "ni",
    "o",
    "u",
    "pero",
    "aunque",
    "pero",
    "mas",
    "sino",
    "no obstante",
    "excepto",
    "sin embargo",
    "para que",
    "porque",
    "ya que",
    "puesto que",
    "pues",
    "como",
    "si",
    "luego"
  ],
  interjections: [
    "\xA1ah!",
    "\xA1oh!",
    "\xA1ay!",
    "\xA1guay!",
    "\xA1eh!",
    "\xA1hey!",
    "\xA1uy!",
    "\xA1puaj!",
    "\xA1hola!",
    "\xA1ojal\xE1!",
    "\xA1eh!",
    "\xA1uf!",
    "\xA1bah!"
  ],
  prepositions: [
    "a",
    "antes",
    "de",
    "dentro",
    "desde",
    "despues",
    "durante",
    "en",
    "hasta",
    "por",
    "sobre",
    "tras",
    "con",
    "para",
    "sin"
  ],
  adverbs: [
    "aqui",
    "ya",
    "mal",
    "no",
    "aun",
    "siempre",
    "ultimamente",
    "aca",
    "mejor",
    "ma\xF1ana",
    "delante",
    "as\xED",
    "temprano",
    "s\xED",
    "f\xE1cilmente",
    "d\xF3nde",
    "seguro",
    "qu\xE9",
    "tal vez",
    "bastante",
    "mucho",
    "poco",
    "algo",
    "efectivamente",
    "seguramente",
    "por supuesto",
    "ninguno",
    "tampoco",
    "probablemente",
    "todav\xEDa",
    "tarde",
    "arriba",
    "lejos"
  ],
  adjectives: [
    "salado",
    "dulce",
    "amargo",
    "\xE1cido",
    "rojo",
    "verde",
    "rubio",
    "fuerte",
    "d\xE9bil",
    "flexible",
    "tostado",
    "ronco",
    "n\xEDtido",
    "\xE1spero",
    "suave",
    "rugoso",
    "esponjoso",
    "flojo",
    "redondo",
    "cuadrado",
    "universitario",
    "institucional",
    "art\xEDstico",
    "religioso",
    "cultural",
    "estructural",
    "policial",
    "mensual",
    "diario",
    "solar",
    "militar",
    "navide\xF1o",
    "laboral",
    "mercantil",
    "vanguardista",
    "dental",
    "quir\xFArgico",
    "un",
    "dos",
    "primer",
    "grande",
    "peque\xF1o",
    "diminuto",
    "seco",
    "caro",
    "inteligente",
    "divertido",
    "fiel",
    "agradable",
    "sucio",
    "limpio",
    "amable",
    "nuevo",
    "valiente",
    "hermoso",
    "largo",
    "cruel",
    "perfecto",
    "culto",
    "ancho",
    "musical",
    "democr\xE1tico",
    "individual",
    "nacional",
    "regional",
    "mundial",
    "econ\xF3mico",
    "pol\xEDtico",
    "hist\xF3rico",
    "civil",
    "familiar",
    "industrial",
    "naval",
    "agr\xEDcola",
    "en\xE9rgetica",
    "petrolero",
    "segundo"
  ],
  nouns: [
    "amor",
    "explosi\xF3n",
    "crema",
    "l\xE1piz",
    "embarcaci\xF3n",
    "archipi\xE9lago",
    "universidad",
    "llaves",
    "pap\xE1",
    "cuna",
    "escuela",
    "lapicera",
    "mapa",
    "lima",
    "edificio",
    "hoja",
    "granizo",
    "mano",
    "m\xFAsica",
    "habitaci\xF3n",
    "guerra",
    "templo",
    "plato",
    "botella",
    "riqueza",
    "planeta",
    "metal",
    "mono",
    "petr\xF3leo",
    "debate",
    "ruido",
    "herramienta",
    "anteojos",
    "living",
    "zapato",
    "ojo",
    "alma",
    "buzo",
    "puerta",
    "ensalada",
    "candidato",
    "diario",
    "hierro",
    "relifi\xF3n",
    "tecla",
    "departamento",
    "hipop\xF3tamo",
    "gas",
    "discurso",
    "estusiasmo",
    "fideos",
    "reloj",
    "oscuridad",
    "monta\xF1as",
    "mo\xF1o",
    "partido",
    "fiesta",
    "caf\xE9",
    "guitarra",
    "martillo",
    "temor",
    "letra",
    "rueda",
    "librer\xEDa",
    "manada",
    "sill\xF3n",
    "teclado",
    "pantalla",
    "tenedor",
    "fauna",
    "cohete",
    "c\xE9sped",
    "familia",
    "pesta\xF1a",
    "salud",
    "hombre",
    "velero",
    "palo",
    "lentes",
    "nube",
    "castillo",
    "verano",
    "televisor",
    "poder",
    "remera",
    "percha",
    "tiempo",
    "pared",
    "cartas",
    "impresora",
    "luces",
    "bomba",
    "corbata",
    "planta",
    "oficina",
    "t\xEDo",
    "pradera",
    "deporte",
    "fotograf\xEDa",
    "refugio",
    "carne",
    "humedad",
    "celular",
    "vocabulario",
    "coro",
    "autos",
    "famoso",
    "piso",
    "diputado",
    "candado",
    "computadora",
    "cuadro",
    "teatro",
    "sue\xF1o"
  ]
};

// src/modules/word/core/words.ts
var WORDS = {
  es: SPANISH_WORDS,
  en: ENGLISH_WORDS
};

// src/modules/word/index.ts
var WordModule = class {
  constructor(utils2) {
    __publicField(this, "utils", utils2);
    __publicField(this, "constants", { words: WORDS });
  }
  /**
   * Returns a adjective from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adjective() // 'clever'
   * @returns string
   */
  adjective(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).adjectives);
  }
  /**
   * Returns a conjuction from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.conjuction() // 'but'
   * @returns string
   */
  conjuction(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).conjuctions);
  }
  /**
   * Returns a interjection from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.interjection() // 'hey!'
   * @returns string
   */
  interjection(args) {
    return this.utils.oneOfArray(
      this.filterWords(args?.language).interjections
    );
  }
  /**
   * Returns a preposition from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.preposition() // 'at'
   * @returns string
   */
  preposition(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).prepositions);
  }
  /**
   * Returns a adverb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.adverb() // 'here'
   * @returns string
   */
  adverb(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).adverbs);
  }
  /**
   * Returns a verb from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.verb() // 'had'
   * @returns string
   */
  verb(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).verbs);
  }
  /**
   * Returns a noun from a selected lenguage
   * @param args.language word language (`en` | `es`). Defaults `en`
   * @example modules.word.noun() // 'car'
   * @returns string
   */
  noun(args) {
    return this.utils.oneOfArray(this.filterWords(args?.language).nouns);
  }
  filterWords(lan) {
    if (typeof lan === "string") {
      const languageSelected = WORDS[lan];
      if (languageSelected) {
        return languageSelected;
      }
    }
    return WORDS["en"];
  }
};

// src/modules/color/constants/index.ts
var CSS_SPACES = [
  "sRGB",
  "display-p3",
  "rec2020",
  "a98-rgb",
  "prophoto-rgb"
];
var CSS_FUNCTIONS = [
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "cmyk",
  "lab",
  "lch",
  "color"
];
var HUMAN_COLORS = [
  "azure",
  "black",
  "blue",
  "cyan",
  "fuchsia",
  "gold",
  "green",
  "grey",
  "indigo",
  "ivory",
  "lavender",
  "lime",
  "magenta",
  "maroon",
  "mint green",
  "olive",
  "orange",
  "orchid",
  "pink",
  "plum",
  "purple",
  "red",
  "salmon",
  "silver",
  "sky blue",
  "tan",
  "teal",
  "turquoise",
  "violet",
  "white",
  "yellow"
];

// src/modules/color/helpers/index.ts
function formatHexColor(hexColor, options) {
  switch (options?.casing) {
    case "upper":
      hexColor = hexColor.toUpperCase();
      break;
    case "lower":
      hexColor = hexColor.toLowerCase();
      break;
  }
  if (options?.prefix) {
    hexColor = options.prefix + hexColor;
  }
  return hexColor;
}
function toBinary(values) {
  const binary = values.map((value) => {
    const isFloat = value % 1 !== 0;
    if (isFloat) {
      const buffer = new ArrayBuffer(4);
      new DataView(buffer).setFloat32(0, value);
      const bytes = new Uint8Array(buffer);
      return toBinary(Array.from(bytes)).split(" ").join("");
    }
    return (value >>> 0).toString(2).padStart(8, "0");
  });
  return binary.join(" ");
}
function toCSS(values, cssFunction = "rgb", space = "sRGB") {
  const percentage = (value) => Math.round(value * 100);
  switch (cssFunction) {
    case "rgba":
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`;
    case "color":
      return `color(${space} ${values[0]} ${values[1]} ${values[2]})`;
    case "cmyk":
      return `cmyk(${percentage(values[0])}%, ${percentage(
        values[1]
      )}%, ${percentage(values[2])}%, ${percentage(values[3])}%)`;
    case "hsl":
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2]
      )}%)`;
    case "hsla":
      return `hsl(${values[0]}deg ${percentage(values[1])}% ${percentage(
        values[2]
      )}% / ${percentage(values[3])})`;
    case "hwb":
      return `hwb(${values[0]} ${percentage(values[1])}% ${percentage(
        values[2]
      )}%)`;
    case "lab":
      return `lab(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case "lch":
      return `lch(${percentage(values[0])}% ${values[1]} ${values[2]})`;
    case "rgb":
    default:
      return `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
  }
}
function toColorFormat(values, format, cssFunction = "rgb", space = "sRGB") {
  switch (format) {
    case "css":
      return toCSS(values, cssFunction, space);
    case "binary":
      return toBinary(values);
    default:
      return toCSS(values, cssFunction, space);
  }
}

// src/modules/color/index.ts
var ColorModule = class {
  constructor(utils2, datatypeModule) {
    __publicField(this, "utils", utils2);
    __publicField(this, "datatypeModule", datatypeModule);
    __publicField(this, "constants", {
      cssFunctions: CSS_FUNCTIONS,
      cssSpaces: CSS_SPACES,
      human: HUMAN_COLORS
    });
  }
  /**
   * Returns a random human-readable color name.
   *
   * @example
   * modules.color.human() // 'blue'
   */
  human() {
    return this.utils.oneOfArray(HUMAN_COLORS);
  }
  /**
   * Returns a random css supported color function name.
   *
   * @example
   * modules.color.cssSupportedFunction() // 'rgb'
   */
  cssSupportedFunction() {
    const value = this.utils.oneOfArray(CSS_FUNCTIONS);
    return value;
  }
  /**
   * Returns a random css supported color space name.
   *
   * @example
   * modules.color.cssSupportedSpace() // 'display-p3'
   */
  cssSupportedSpace() {
    return this.utils.oneOfArray(CSS_SPACES);
  }
  /**
   * Returns an RGB color.
   *
   * @param options.prefix Prefix of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'#'`.
   * @param options.casing Letter type case of the generated hex color. Only applied when `'hex'` format is used. Defaults to `'mixed'`.
   * @param options.format Format of generated RGB color. Defaults to `'hex'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * modules.color.rgb({ prefix: '0x' }) // '0xffffFF'
   * modules.color.rgb({ casing: 'upper' }) // '#FFFFFF'
   * modules.color.rgb({ casing: 'lower' }) // '#ffffff'
   * modules.color.rgb({ prefix: '#', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb({ format: 'hex', casing: 'lower' }) // '#ffffff'
   * modules.color.rgb({ format: 'css' }) // 'rgb(255, 0, 0)'
   * modules.color.rgb({ format: 'binary' }) // '10000000 00000000 11111111'
   */
  rgb({
    format = "hex",
    includeAlpha = false,
    casing = "mixed",
    prefix = "#"
  } = {}) {
    let color;
    let cssFunction = "rgb";
    if (format === "hex") {
      color = this.datatypeModule.hexadecimal({
        length: includeAlpha ? 8 : 6
      });
      color = formatHexColor(color, { prefix, casing });
      return color;
    }
    color = Array.from({ length: 3 }).map(
      () => this.datatypeModule.int({ min: 0, max: 255 })
    );
    if (includeAlpha) {
      color.push(this.datatypeModule.float({ min: 0, max: 1, precision: 2 }));
      cssFunction = "rgba";
    }
    const returnColor = toColorFormat(color, format, cssFunction);
    if (casing === "lower") {
      return returnColor.toLowerCase();
    } else if (casing === "upper") {
      return returnColor.toUpperCase();
    } else {
      return returnColor;
    }
  }
  /**
   * Returns a CMYK color.
   *
   * @param options.format Format of generated CMYK color. Defaults to `'css'`.
   *
   * @example
   * modules.color.cmyk() // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk({ format: 'css' }) // cmyk(100%, 0%, 0%, 0%)
   * modules.color.cmyk({ format: 'binary' }) // (8-32 bits) x 4
   */
  cmyk({ format = "css" } = {}) {
    const color = Array.from({ length: 4 }).map(
      () => this.datatypeModule.float({ min: 0, max: 1, precision: 2 })
    );
    return toColorFormat(color, format, "cmyk");
  }
  /**
   * Returns an HSL color.
   *
   * @param options.format Format of generated HSL color. Defaults to `'css'`.
   * @param options.includeAlpha Adds an alpha value to the color (RGBA). Defaults to `false`.
   *
   * @example
   * modules.color.hsl({ format: 'css' }) // hsl(0deg, 100%, 80%)
   * modules.color.hsl({ format: 'css', includeAlpha: true }) // hsl(0deg 100% 50% / 0.5)
   * modules.color.hsl({ format: 'binary' }) // (8-32 bits) x 3
   * modules.color.hsl({ format: 'binary', includeAlpha: true }) // (8-32 bits) x 4
   */
  hsl({ format = "css", includeAlpha = false } = {}) {
    const hsl = [this.datatypeModule.int({ min: 0, max: 360 })];
    for (let i = 0; i < (includeAlpha ? 3 : 2); i++) {
      const value = this.datatypeModule.float({ min: 0, max: 1, precision: 3 });
      hsl.push(value);
    }
    return toColorFormat(hsl, format, includeAlpha ? "hsla" : "hsl");
  }
  /**
   * Returns an HWB color.
   *
   * @param options.format Format of generated HWB color. Defaults to `'css'`.
   *
   * @example
   * modules.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
   * modules.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
   */
  hwb({ format = "css" } = {}) {
    const hsl = [this.datatypeModule.int({ min: 0, max: 360 })];
    for (let i = 0; i < 2; i++) {
      hsl.push(this.datatypeModule.float({ min: 0, max: 1, precision: 3 }));
    }
    return toColorFormat(hsl, format, "hwb");
  }
  /**
   * Returns an LCH color. Even though upper bound of
   * chroma in LCH color space is theoretically unbounded,
   * it is bounded to 230 as anything above will not
   * make a noticeable difference in the browser.
   *
   * @param options.format Format of generated LCH color. Defaults to `'css'`.
   *
   * @example
   * modules.color.lch({ format: 'css' }) // lch(52.2345% 72.2 56.2)
   * modules.color.lch({ format: 'binary' }) // (8-32 bits x 3)
   */
  lch({ format = "css" } = {}) {
    const lch = [this.datatypeModule.float({ min: 0, max: 1, precision: 6 })];
    for (let i = 0; i < 2; i++) {
      lch.push(this.datatypeModule.number({ min: 0, max: 230, precision: 1 }));
    }
    return toColorFormat(lch, format, "lch");
  }
  /**
   * Returns a random color based on CSS color space specified.
   *
   * @param options.format Format of generated color. Defaults to `'css'`.
   * @param options.space Color space to generate the color for. Defaults to `'sRGB'`.
   *
   * @example
   * modules.color.colorByCSSColorSpace({ format: 'css', space: 'display-p3' }) // color(display-p3 0.12 1 0.23)
   * modules.color.colorByCSSColorSpace({ format: 'binary' }) // (8-32 bits x 3)
   */
  colorByCSSColorSpace({
    format = "css",
    space = "sRGB"
  } = {}) {
    const color = Array.from({ length: 3 }).map(
      () => this.datatypeModule.float({ min: 0, max: 1, precision: 4 })
    );
    return toColorFormat(color, format, "color", space);
  }
};

// src/modules/index.ts
var ChacaModules = class {
  constructor(utils2) {
    __publicField(this, "internet");
    __publicField(this, "datatype");
    __publicField(this, "id");
    __publicField(this, "lorem");
    __publicField(this, "image");
    __publicField(this, "system");
    __publicField(this, "finance");
    __publicField(this, "phone");
    __publicField(this, "address");
    __publicField(this, "word");
    __publicField(this, "vehicle");
    __publicField(this, "date");
    __publicField(this, "person");
    __publicField(this, "animal");
    __publicField(this, "science");
    __publicField(this, "color");
    this.datatype = new DatatypeModule(utils2);
    this.address = new AddressModule(utils2, this.datatype);
    this.id = new IdModule(this.datatype);
    this.color = new ColorModule(utils2, this.datatype);
    this.person = new PersonModule(utils2, this.datatype);
    this.word = new WordModule(utils2);
    this.internet = new InternetModule(
      this.datatype,
      utils2,
      this.person,
      this.word
    );
    this.science = new ScienceModule(utils2);
    this.vehicle = new VehicleModule(utils2);
    this.lorem = new LoremModule(this.datatype);
    this.phone = new PhoneModule(utils2, this.datatype);
    this.system = new SystemModule(utils2, this.datatype, this.word);
    this.image = new ImageModule(this.datatype, this.word);
    this.finance = new FinanceModule(utils2, this.datatype);
    this.animal = new AnimalModule(utils2);
    this.date = new DateModule(this.datatype, utils2);
  }
};

// src/core-singletons.ts
var utils = new ChacaUtils();
var modules = new ChacaModules(utils);
var Route4 = class {
  constructor(name, base, ext) {
    __publicField(this, "name", name);
    __publicField(this, "base", base);
    __publicField(this, "ext", ext);
  }
  value() {
    return `${path.join(this.base, `${this.name.value()}.${this.ext}`)}`;
  }
};

// src/core/export/writers/node/node-file-writer.ts
var NodeFileWriter = class {
  async write({
    files,
    ext,
    location,
    zip,
    filename
  }) {
    if (location && !fs.existsSync(location)) {
      fs.mkdirSync(location, { recursive: true });
    }
    const base = path.join("./", location);
    const routes = [];
    for (const file of files) {
      const route = new Route4(new Filename(file.filename), base, ext);
      await fs.promises.writeFile(route.value(), file.content, "utf-8");
      routes.push(route);
    }
    if (zip) {
      const instance = new AdmZip();
      const zipRoute = new Route4(new Filename(filename), base, "zip");
      for (const route of routes) {
        instance.addLocalFile(route.value());
      }
      instance.writeZip(zipRoute.value());
      for (const route of routes) {
        await fs.promises.unlink(route.value());
      }
      return [zipRoute.value()];
    }
    return routes.map((r) => r.value());
  }
};

// src/index.ts
var chaca = new Chaca(modules.datatype, utils, new NodeFileWriter());

export { Chaca, ChacaError, ChacaModules, ChacaUtils, CyclicAccessDataError, Dataset, DatasetStore, EmptyEnumValuesError, EmptySequentialValuesError, EnumField, errors_exports as Errors, KeyField, NotEnoughValuesForRefError, NotExistRefFieldError, PickField, PickFieldDefinitionError, ProbabilityField, RefField, Schema, SequenceField, SequentialField, TryRefANoKeyFieldError, chaca, modules };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map