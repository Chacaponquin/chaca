declare class NodeRoute {
    private readonly _route;
    constructor(route: string[]);
    array(): string[];
    create(name: string): NodeRoute;
    empty(): boolean;
    name(): string;
    pop(): NodeRoute;
    string(): string;
}

interface Props$7 {
    name: string;
    value: unknown;
}
declare class SingleResultNode extends FieldNode {
    private _value;
    private _taken;
    constructor({ name, value }: Props$7);
    value(): unknown;
    changeIsTaken(fieldRoute: NodeRoute): void;
    isTaken(fieldRoute: NodeRoute): boolean;
    getNodeByRoute(fieldTreeRoute: string[]): FieldNode;
    getRefValueByNodeRoute({ caller, search, baseSearch, }: GetRefValueProps$1): SingleResultNode;
}

interface GetRefValueProps$1 {
    search: NodeRoute;
    caller: NodeRoute;
    baseSearch: NodeRoute;
}
declare abstract class FieldNode {
    readonly name: string;
    constructor(name: string);
    abstract value(): unknown | unknown[];
    abstract getNodeByRoute(fieldTreeRoute: string[]): FieldNode;
    protected abstract getRefValueByNodeRoute(props: GetRefValueProps$1): SingleResultNode;
    getRefValueByRoute(props: GetRefValueProps$1): SingleResultNode;
}

interface GetRefValueByRouteProps {
    caller: NodeRoute;
    search: NodeRoute;
}
declare class DocumentTree<D = any> {
    private nodes;
    insertField(newField: FieldNode): void;
    getDocumentObject(): D;
    getNodeByNodeRoute(fieldTreeRoute: string[]): FieldNode;
    getRefValueByNodeRoute({ caller, search, }: GetRefValueByRouteProps): SingleResultNode;
}

type TimeUnits$1 = "years" | "seconds" | "minutes" | "days" | "hours" | "months";
type SumDateRangeProps = {
    date: Date;
    value: number;
    range: TimeUnits$1;
};
interface PickProps<T> {
    values: T[];
    count: number;
}
interface MultipleProps<T = any> {
    count: number;
    generator(index: number): T;
}
interface ReplaceSymbolsProps {
    symbols?: Record<string, string[]>;
    banned?: string[];
}
declare class ChacaUtils {
    private readonly datatypeModule;
    /**
     * Returns one element from an array
     *
     * @param list Array of values to return
     * @example
     * chaca.utils.oneOfArray([1, 2, 3, 5, 4]) // 3
     * chaca.utils.oneOfArray(['Hi!!!', 'Chaca the best!!!', 10]) // 'Chaca the best!!!'
     * chaca.utils.oneOfArray([]) // undefined
     */
    oneOfArray<T>(list: ReadonlyArray<T>): T;
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
    replaceSymbols(text: string, { banned, symbols: ownSymbols }?: ReplaceSymbolsProps): string;
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
    camelCase(text: string): string;
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
    snakeCase(text: string): string;
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
    dotCase(text: string): string;
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
    sentenceCase(text: string): string;
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
    capitalCase(text: string): string;
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
    pascalCase(text: string): string;
    /**
     * Sum a range value to a date
     *
     * @param param.date Date to modify
     * @param param.range Time unit (`"years"` | `"seconds"` | `"minutes"` | `"days"`| `"hours"` | `"months"`)
     * @param param.value Amount of time unit
     *
     * @returns string
     */
    sumDateRange({ date, range, value }: SumDateRangeProps): Date;
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
    pick<T = any>({ values, count }: PickProps<T>): T[];
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
    multiple<T = any>({ generator, count }: MultipleProps<T>): T[];
}

type Case = "lower" | "upper" | "mixed";
type BigIntProps = {
    min?: bigint;
    max?: bigint;
};
type NumericProps = {
    allowLeadingZeros?: boolean;
    length?: number;
    prefix?: string;
    banned?: string[];
};
type AlphaNumericProps = {
    length?: number;
    case?: Case;
    banned?: string[] | string;
    prefix?: string;
};
type BinaryCodeProps = {
    length?: number;
    prefix?: string;
};
type OctalProps = {
    length?: number;
    prefix?: string;
};
type FloatProps = {
    min?: number;
    max?: number;
    precision?: number;
};
type NumberProps$1 = {
    min?: number;
    max?: number;
    precision?: number;
};
type IntProps = {
    min?: number;
    max?: number;
};
type HexadecimalProps = {
    length?: number;
    case?: Case;
};
type MatrixProps = {
    x_size?: number;
    y_size?: number;
    min?: number;
    max?: number;
    precision?: number;
};
type CharacterProps = {
    case?: Case;
};
type CharactersProps = {
    length?: number;
    case?: Case;
};
declare class DatatypeModule {
    private readonly utils;
    private readonly MIN_RANDOM_VALUE;
    private readonly MAX_RANDOM_VALUE;
    private readonly MAX_PRECISION;
    constructor(utils: ChacaUtils);
    readonly constants: {
        upperCharacters: string[];
        lowerCharacters: string[];
        mixedCharacters: string[];
        specialCharacters: string[];
        numbers: string[];
    };
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
    bigint({ max: imax, min: imin }?: BigIntProps): bigint;
    /**
     * Returns a keyboard special character
     *
     * @example modules.datatype.specialCharacter() // '_'
     *
     * @returns string
     */
    specialCharacter(): string;
    /**
     * Returns a boolean
     *
     * @example modules.datatype.boolean() // true
     *
     * @returns boolean
     */
    boolean(): boolean;
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
    int({ max, min }?: IntProps): number;
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
    float({ max, min, precision }?: FloatProps): number;
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
    number({ max, min, precision }?: NumberProps$1): number;
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
    hexadecimal({ length: ilength, case: icase, }?: HexadecimalProps): string;
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
    matrix({ x_size: ix_size, max, min, precision, y_size: iy_size, }?: MatrixProps): number[][];
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
    character({ case: icase }?: CharacterProps): string;
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
    characters({ case: icase, length }?: CharactersProps): string;
    /**
     * Returns a string with a binary code
     * @param args.length Length of the binary code
     * @example
     * modules.datatype.binaryCode() // '00101'
     * modules.datatype.binaryCode({ length: 6 }) // '010100'
     * @returns string
     */
    binaryCode({ length: ilength, prefix }?: BinaryCodeProps): string;
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
    alphaNumeric({ length: ilength, case: icase, banned: ibanned, prefix, }?: AlphaNumericProps): string;
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
    octal({ length: ilength, prefix }?: OctalProps): string;
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
    numeric({ length: ilength, allowLeadingZeros, prefix, banned, }?: NumericProps): string;
    private filterCharacters;
    private generateByLength;
}

interface ValueProps$1 {
    store: DatasetStore;
    currentDocument: DocumentTree;
}
declare abstract class IsArray {
    abstract execute(props: ValueProps$1): Promise<number | undefined>;
}

interface Props$6 {
    singleSchema: boolean;
    name: string;
}
declare class SchemaCount {
    private readonly singleSchema;
    private readonly name;
    private _value;
    private readonly observers;
    constructor({ singleSchema, name }: Props$6);
    setValue(v: number): void;
    value(): number | null;
    register(fun: (v: number) => void): void;
}

interface IsProps {
    index: number;
    store: DatasetStore;
    currentDocument: DocumentTree;
}
declare abstract class PossibleNull {
    abstract is(props: IsProps): Promise<boolean>;
    abstract can(): boolean;
}

interface IsNullProps<K> {
    store: DatasetStore;
    currentDocument: DocumentTree<K>;
    index: number;
}
interface GenerateProps {
    currentDocument: DocumentTree;
    store: DatasetStore;
    indexDoc: number;
    schemaIndex: number;
}
declare abstract class InputTreeNode {
    protected readonly route: NodeRoute;
    protected readonly isArray: IsArray;
    protected readonly possibleNull: PossibleNull;
    constructor(route: NodeRoute, isArray: IsArray, possibleNull: PossibleNull);
    abstract getNoArrayNode(): InputTreeNode;
    abstract checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    abstract generate(props: GenerateProps): Promise<FieldNode>;
    getRouteString(): string;
    getName(): string;
    getFieldRoute(): NodeRoute;
    getIsArray(): IsArray;
    getPossibleNull(): PossibleNull;
    isPossibleNull(): boolean;
    isNull<K>({ currentDocument, store, index, }: IsNullProps<K>): Promise<boolean>;
}

declare class CustomValueNode extends InputTreeNode {
    private readonly func;
    constructor(route: NodeRoute, isArray: IsArray, possibleNull: PossibleNull, func: CustomField);
    getNoArrayNode(): InputTreeNode;
    private value;
    checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    generate({ currentDocument, store, }: GenerateProps): Promise<FieldNode>;
}

/**
 * Field to ref types
 */
type FieldToRef = string;
/**
 * Function that filters the fields to reference
 */
type RefFieldWhere<C = any, R = any> = (args: RefFieldWhereProps<C, R>) => boolean | Promise<boolean>;
type RefFieldWhereProps<C = any, R = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Reference schema document fields */
    refFields: R;
    /** Store to interact with all schemas */
    store: DatasetStore;
};
type RefFieldConfig = {
    /**
     * The value to be referenced will only be taken once by this schema. Default `false`
     */
    unique?: boolean;
    /**
     * Function that filters the fields to reference
     */
    where?: RefFieldWhere;
    /**
     * When there are no more documents to reference, the generated value will be null. Default `false`
     */
    nullOnEmpty?: boolean;
};
interface FieldToRefObject {
    refField: string;
    unique: boolean;
    where: RefFieldWhere | null;
    nullOnEmpty: boolean;
}
declare class RefField {
    readonly refField: FieldToRefObject;
    constructor(refField: FieldToRef, config?: RefFieldConfig);
    private validate;
}

declare class RefValueNode extends InputTreeNode {
    private readonly utils;
    readonly refField: FieldToRefObject;
    readonly schemasStore: SchemaStore;
    private refFieldTreeRoute;
    private schemaRefIndex;
    private allRefNodes;
    constructor(utils: ChacaUtils, route: NodeRoute, isArray: IsArray, possibleNull: PossibleNull, refField: FieldToRefObject, schemasStore: SchemaStore);
    nullWhenEmpty(): boolean;
    isUnique(): boolean;
    getRefFieldRoute(): NodeRoute;
    searchSchemaRef(): void;
    getSchemaRef(): SchemaResolver | null;
    checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    private filterRefNodesByConfig;
    private value;
    generate({ schemaIndex, currentDocument, }: GenerateProps): Promise<FieldNode>;
    setSchemaRef(resolverIndex: number): void;
    getNoArrayNode(): InputTreeNode;
}

interface Props$5 {
    value: number;
    route: string;
}
declare class Step {
    private readonly step;
    constructor({ value }: Props$5);
    value(): number;
}

interface Props$4 {
    value: number;
    route: string;
}
declare class StartsWith {
    private readonly startsWith;
    constructor({ value }: Props$4);
    value(): number;
}

declare class SequenceValueNode extends InputTreeNode {
    private actualValue;
    private readonly startsWith;
    private readonly step;
    constructor(route: NodeRoute, possibleNull: PossibleNull, startsWith: StartsWith, step: Step);
    private value;
    generate(): Promise<FieldNode>;
    checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    getNoArrayNode(): InputTreeNode;
}

type KeyFieldProps$1 = RefValueNode | SequenceValueNode | CustomValueNode;
declare class KeyValueNode extends InputTreeNode {
    private readonly fieldNode;
    constructor(route: NodeRoute, fieldNode: KeyFieldProps$1);
    getNoArrayNode(): InputTreeNode;
    checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    generate(props: GenerateProps): Promise<FieldNode>;
}

interface SequentialFieldConfig {
    /**
     * Boolean indicating whether the values should be generated cyclically
     */
    loop?: boolean;
}
declare class SequentialField<K = any> {
    readonly values: K[];
    readonly config: Required<SequentialFieldConfig>;
    constructor(values: K[], config?: SequentialFieldConfig);
}

type Chance = number | ChanceFunction;
type ChanceFunction = (props: ChanceFunctionProps) => number | Promise<number>;
type ChanceFunctionProps<C = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Store to interact with all datasets */
    store: DatasetStore;
};
interface ProbabilityOption<T = any> {
    /**
     * Probability of being chosen
     * - `number` Value between 0 and 1
     * - `function` Function that returns a probability value between 0 and 1. Receive 'currentFields' and 'store' as parameters
     */
    chance: Chance;
    /**
     * Option value
     */
    value: T;
}
declare class ProbabilityField<T = any> {
    readonly values: ProbabilityOption<T>[];
    constructor(values: ProbabilityOption<T>[]);
}

interface PickFieldProps<V = any> {
    values: V[];
    count: PickCount;
}
type PickCount = number | PickCountLimits | PickCountFunction;
type PickCountLimits = {
    min?: number;
    max?: number;
};
type PickCountFunction = (props: PickCountFunctionProps) => number | PickCountLimits | Promise<number | PickCountLimits>;
type PickCountFunctionProps<C = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Store to interact with all dataset schemas */
    store: DatasetStore;
};
declare class PickField<V = any> {
    readonly values: PickFieldProps<V>;
    constructor(values: PickFieldProps<V>);
}

type DatasetSchemaCountFunctionProps = {
    /** Store to interact with all dataset schemas */
    store: DatasetStore;
};
type DatasetSchemaCountFunction = (props: DatasetSchemaCountFunctionProps) => number | Promise<number>;
type DatasetSchemaCount = number | DatasetSchemaCountFunction;
interface DatasetSchema {
    /**
     * Schema name
     */
    name: string;
    /**
     * Defined schema
     */
    schema: Schema;
    /**
     * Count documents to generate
     */
    documents: DatasetSchemaCount;
}

interface DumpFile {
    filename: string;
    content: string;
}

interface ZipConfig {
    /** The generated files are stored in a zip file. Default `false` */
    zip?: boolean;
}
interface IndentConfig {
    /** Indentation width to use (in spaces). Default `3` */
    indent?: number;
}
interface SeparateConfig {
    /** The data of each schema must be separated into separate files. Default `false` */
    separate?: boolean;
}
interface SkipInvalidConfig {
    /**
     * Do not throw on invalid types. Default `false`
     */
    skipInvalid?: boolean;
}
interface DeclarationOnlyConfig {
    /**
     * Value assignment will not be included in the files. Default `false`
     */
    declarationOnly?: boolean;
}

interface KeyConverter {
    field: string;
    title: string;
}
type ParseValueFunction = (value: any, defaultParser: (v: any) => string) => string;
interface TrimProps {
    header?: boolean;
    field?: boolean;
}
interface Delimiters {
    wrap?: string;
    field?: string;
    eol?: string;
}
interface CodeProps {
    /**
     * Specifies the different types of delimiters
     * @param delimiter.wrap wrap values in the delimiter of choice (e.g. wrap values in quotes). Default `"`
     * @param delimiter.field field delimiter. Default `,`
     * @param delimiter.eol end of line delimiter. Default `\n`
     */
    delimiter?: Delimiters;
    /**
     * Specify the string keys that should be excluded from the output
     */
    excludeKeys?: string[];
    /**
     * Should nested objects be deep-converted to CSV? Default `true`
     */
    expandNestedObjects?: boolean;
    /**
     * Should objects in array values be deep-converted to CSV? Default `false`
     */
    expandArrayObjects?: boolean;
    /**
     * Specify the keys that should be converted.
     *
     * @param key.field specifies the key path
     * @param key.title specifies a more human readable field heading
     */
    keys?: KeyConverter[];
    /**
     * Specify how values should be converted into CSV format. This function is provided a single field value at a time and must return a `string`
     */
    parseValue?: ParseValueFunction;
    /**
     * Should the header keys be sorted in alphabetical order? Default `false`
     */
    sortHeader?: boolean;
    /**
     * @param trim.header should the header fields be trimmed? Default `false`
     * @param trim.field should the field values be trimmed? Default `false`
     */
    trim?: TrimProps;
    /**
     * Should array values be "unwound" such that there is one line per value in the array? Default `false`
     */
    unwindArrays?: boolean;
}

type CsvProps = ZipConfig & CodeProps;

type JavaProps = ZipConfig & IndentConfig & SkipInvalidConfig & DeclarationOnlyConfig & {
    /** Name of the package in which the classes will be found. Default `chaca.data` */
    package?: string;
};

type JavascriptProps = ZipConfig & SeparateConfig & IndentConfig & SkipInvalidConfig;

type JsonProps = SeparateConfig & ZipConfig & IndentConfig;

type PythonProps = ZipConfig & SeparateConfig & IndentConfig & SkipInvalidConfig & DeclarationOnlyConfig;

interface RefColumnParser {
    column: string;
    ref: string;
}

type SQLProps = ZipConfig & IndentConfig & SkipInvalidConfig & DeclarationOnlyConfig & {
    /** columns that will be converted to `PRIMARY KEYS` */
    keys?: string[];
    /** columns that will be converted to `UNIQUE` */
    uniques?: string[];
    /** columns that can accept null values */
    nulls?: string[];
    /** columns that will be converted to `FOREIGN KEYS` */
    refs?: RefColumnParser[];
    /** Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined */
    generateIds?: boolean;
};

type TypescriptProps = ZipConfig & SeparateConfig & IndentConfig & SkipInvalidConfig & DeclarationOnlyConfig;

type YamlProps = {
    /**If `true`, sort keys when dumping YAML. If is a `function`, use the function to sort the keys. Default `false`*/
    sortKeys?: boolean | ((a: any, b: any) => number);
    /**Set max line width. Default `80`*/
    lineWidth?: number;
    /**Strings will be quoted using this quoting style. Default `'` */
    quotingType?: "'" | '"';
} & ZipConfig & SeparateConfig & IndentConfig;

/** Export files extensions */
type ExportFormat = Extensions | ExtensionConfigs;
type Extensions = "json" | "java" | "typescript" | "csv" | "javascript" | "yaml" | "python" | ExportSQLFormat;
type ExportSQLFormat = "postgresql";
/**
 * Export file configuration
 */
type FileConfig = {
    /**
     * Name for the file
     */
    filename: string;
    /**
     * Location of the file
     * @example
     * { location: './data' }
     */
    location: string;
    /**
     * File extension configuration (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     * @example { format: 'csv' }
     */
    format: ExportFormat;
    /** Show log in console progretion */
    verbose?: boolean;
};
type DumpConfig = Omit<FileConfig, "location">;
/**
 * Contract the CLI relies on to export a config module without knowing whether
 * it is a `Schema` or a `Dataset`. Each implementation adapts the uniform
 * `(documents, config)` call to its own export signature (a `Dataset` ignores
 * the document count). This keeps the CLI free of type discrimination.
 */
interface CliExportable {
    exportFromCli(documents: number, config: FileConfig): Promise<string[]>;
}
type ExtensionConfigs = JsonFormatConfig | CsvFormatConfig | JavaFormatConfig | TypescriptFormatConfig | JavascriptFormatConfig | YamlFormatConfig | PythonFormatConfig | PostgresqlFormatConfig;
type PostgresqlFormatConfig = {
    ext: "postgresql";
} & SQLProps;
type PythonFormatConfig = {
    ext: "python";
} & PythonProps;
type YamlFormatConfig = {
    ext: "yaml";
} & YamlProps;
type JavascriptFormatConfig = {
    ext: "javascript";
} & JavascriptProps;
type TypescriptFormatConfig = {
    ext: "typescript";
} & TypescriptProps;
type JsonFormatConfig = {
    ext: "json";
} & JsonProps;
type CsvFormatConfig = {
    ext: "csv";
} & CsvProps;
type JavaFormatConfig = {
    ext: "java";
} & JavaProps;

interface WriteFilesProps {
    /** Files to persist. Each `filename` must NOT include the extension. */
    files: DumpFile[];
    /** File extension applied to every written file (without the dot). */
    ext: string;
    /** Base output directory. */
    location: string;
    /** Whether the written files must be bundled into a single zip file. */
    zip: boolean;
    /** Base name used for the zip file when `zip` is `true`. */
    filename: string;
}
/**
 * Port that persists already-serialized files somewhere.
 *
 * The core generators only know how to produce `DumpFile[]` (in-memory content).
 * Where those bytes actually land (disk, a zip, a browser download, memory...) is
 * a `FileWriter` concern, so the generation pipeline stays free of any environment
 * specific API (`fs`, `adm-zip`, ...).
 */
interface FileWriter {
    write(props: WriteFilesProps): Promise<string[]>;
}

declare class Schema<K = any> implements CliExportable {
    readonly input: SchemaInput;
    private readonly utils;
    private readonly datatypeModule;
    private readonly fileWriter;
    constructor(input: SchemaInput, utils: ChacaUtils, datatypeModule: DatatypeModule, fileWriter?: FileWriter);
    /**
     * Generates and serializes schema data as a specific file format
     *
     * @param documents number of documents that you want to create
     * @param props.filename name for the file
     * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     */
    transform(documents: number, props: DumpConfig): Promise<DumpFile[]>;
    /**
     * Generate and export the schema documents
     * @param documents number of documents that you want to create
     * @param config.filename file name
     * @param config.location location of the file
     * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     *
     * @returns Promise<string[]>
     */
    export(documents: number, config: FileConfig): Promise<string[]>;
    /**
     * Adapts the CLI's uniform export call to the schema `export` signature.
     * @internal
     */
    exportFromCli(documents: number, config: FileConfig): Promise<string[]>;
    /**
     * Generate a schema document
     */
    object(): Promise<K>;
    /**
     * Generate an array of schema documents
     * @param countDocuments number of documents that you want to create
     */
    array(countDocuments: number): Promise<K[]>;
}

declare class EnumField<R = any> {
    readonly values: ReadonlyArray<R>;
    constructor(values: ReadonlyArray<R>);
}

type SequenceFieldProps = Partial<{
    /** Init value for the field. Default `1`*/
    starsWith: number;
    /** Step between field values in schema documents. Default `1` */
    step: number;
}>;
declare class SequenceField {
    readonly config: Required<SequenceFieldProps>;
    constructor(config?: SequenceFieldProps);
}

declare class IResolver {
}

declare class FieldIsArray {
    private readonly _value;
    private valid;
    constructor(isArray?: IsArrayConfig);
    value(): IsArrayConfig;
    can(): boolean;
    isValid(): boolean;
    private validate;
}

declare class FieldPossibleNull {
    private _value;
    private valid;
    constructor(possible?: PossibleNullConfig);
    value(): PossibleNullConfig;
    isValid(): boolean;
    can(): boolean;
    private validate;
}

type FieldTypes<R = any> = CustomField<any, R> | KeyField | EnumField | PickField | ProbabilityField | RefField | SequenceField | SequentialField | Schema;
type FieldObjectInput<R = any> = {
    /** Schema field type*/
    type: FieldTypes<R>;
    /** Array schema field configuration
     * - `boolean`- array length between 1 and 10
     * - `number` - specific array length
     * - `config.min` and `config.max` - limits of array length
     */
    isArray?: IsArrayConfig;
    /** Null schema field configuration
     * - `boolean` - `true` 100% chances to be null, `false` 0% chances
     * - `number` specific porcent of chances
     * - `function` function that returns a number between 0 and 1 or a boolean. Receive 'currentFields' and 'store' as parameters
     */
    possibleNull?: PossibleNullConfig;
};
type SchemaFieldConfig<R = any> = FieldTypes<R> | FieldObjectInput<R>;
/**
 * Input schema config
 */
type SchemaInput = Record<string, SchemaFieldConfig>;
type ResolverObject = {
    type: IResolver;
    isArray: FieldIsArray;
    possibleNull: FieldPossibleNull;
};
type ArrayLimitObject = {
    min?: number;
    max?: number;
};
type IsArrayFunction = (props: IsArrayFunctionProps) => ArrayLimitObject | number | undefined | Promise<ArrayLimitObject | number | undefined>;
type IsArrayFunctionProps<C = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Store to interact with all dataset schemas */
    store: DatasetStore;
};
type PossibleNullFunction = (props: PossibleNullFunctionProps) => number | boolean | undefined | Promise<number | boolean | undefined>;
type PossibleNullFunctionProps<C = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Store to interact with all dataset schemas */
    store: DatasetStore;
};
type IsArrayConfig = number | ArrayLimitObject | IsArrayFunction | undefined;
type PossibleNullConfig = boolean | number | PossibleNullFunction | undefined;

type ISchemaToResolve = Record<string, ResolverObject>;
declare class SchemaToResolve {
    private _schema;
    constructor(route: NodeRoute, obj: SchemaInput);
    value(): ISchemaToResolve;
    private filter;
    private validate;
}

interface Props$3 {
    name: string;
    schemaToResolve: SchemaToResolve;
    schemasStore: SchemaStore;
    count: SchemaCount;
}
declare class ChacaInputTree {
    private readonly utils;
    private readonly datatypeModule;
    private nodes;
    private schemasStore;
    private name;
    private count;
    private refToResolve;
    private readonly nullMapper;
    private readonly arrayMapper;
    private readonly resolverValidator;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule, { name, schemaToResolve, schemasStore, count }: Props$3);
    getRefNodes(): RefValueNode[];
    getFields(): InputTreeNode[];
    private createNodeByType;
    private createSubNodes;
    insertNode(node: InputTreeNode): void;
    checkIfFieldExists(fieldTreeRoute: string[]): boolean;
    searchRefNodes(): void;
    getPossibleNullNodes(): InputTreeNode[];
    getKeyFields(): KeyValueNode[];
}

interface SearchedRefValue {
    document: DocumentTree<any>;
    resultNode: SingleResultNode;
}

/**
 * Get value in dataset store config
 */
type GetStoreConfig = {
    /**
     * Function that filters the store schema fields
     */
    where?: GetStoreWhere;
};
/**
 * Function that filters the store schema fields
 */
type GetStoreWhere<T = any> = (fields: T) => boolean | Promise<boolean>;
type GetStoreValueConfig<C = any> = GetStoreConfig & {
    omitDocument?: DocumentTree<C>;
    omitResolver: SchemaResolver;
};

interface GetRefValuesProps {
    caller: NodeRoute;
    search: NodeRoute;
}
declare class ChacaResultTree<D = any> {
    readonly name: string;
    constructor(name: string);
    private documents;
    getDocumentByIndex(index: number): DocumentTree<D>;
    insertDocument(document: DocumentTree<D>): void;
    getAllValuesByNodeRoute(fieldTreeRoute: string[], config: GetStoreValueConfig): Promise<FieldNode[]>;
    getAllRefValuesByNodeRoute({ search, caller, }: GetRefValuesProps): SearchedRefValue[];
    getDocumentsArray(): D[];
    getDocuments(): DocumentTree<D>[];
}

interface Props$2 {
    store: DatasetStore;
}
interface CreateProps {
    value: DatasetSchemaCount;
    singleSchema: boolean;
    name: string;
}
declare abstract class SchemaCountExecutor {
    static create({ value, name, singleSchema, }: CreateProps): SchemaCountExecutor;
    abstract value(props: Props$2): Promise<number>;
}

interface GetRefValueProps {
    caller: NodeRoute;
    search: NodeRoute;
}
interface Props$1 {
    name: string;
    input: SchemaInput;
    countExecutor: SchemaCountExecutor;
    count: SchemaCount;
    schemaIndex: number;
    consoleVerbose: boolean;
}
declare class SchemaResolver<K = any> {
    private readonly utils;
    private readonly datatypeModule;
    private readonly subFieldsCreator;
    private readonly solutionCreator;
    private readonly arrayCreator;
    private readonly fillSolution;
    readonly index: number;
    readonly route: NodeRoute;
    private inputTree;
    private resultTree;
    private name;
    private countDocExecutor;
    private count;
    private input;
    private isBuilding;
    private finishBuilding;
    private schemasStore;
    private consoleVerbose;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule, { consoleVerbose, count, countExecutor, schemaIndex, name, input }: Props$1);
    resolve(): Promise<K[]>;
    getKeyNodes(): KeyValueNode[];
    getPossibleNullNodes(): InputTreeNode[];
    getRefNodes(): RefValueNode[];
    getSchemaToResolve(): SchemaToResolve;
    buildInputTree(): void;
    getSchemaName(): string;
    isFinishBuilding(): boolean;
    isBuildingTrees(): boolean;
    setInjectedSchemas(array: SchemaResolver[]): void;
    getInputTree(): ChacaInputTree | null;
    getResultTree(): ChacaResultTree<K>;
    getAllValuesByRoute(fieldToGet: string[], config: GetStoreValueConfig): Promise<Array<DocumentTree<K> | FieldNode>>;
    getAllRefValuesByNodeRoute({ caller, search, }: GetRefValueProps): SearchedRefValue[];
    searchRefNodes(): void;
    dangerCyclic(): boolean;
    buildTrees(caller: NodeRoute): Promise<void>;
    getDocumentsArray(omitDocument?: DocumentTree<K>): K[];
}

interface ValueProps {
    route: string;
    config: GetStoreValueConfig;
    caller: NodeRoute;
}
declare class SchemaStore {
    private schemas;
    constructor(schemas: SchemaResolver[]);
    private validateFieldToGet;
    get(index: number): SchemaResolver<any>;
    setInjectedSchemas(array: SchemaResolver[]): void;
    getSchemasResolvers(): SchemaResolver<any>[];
    value<D = any>({ caller, config, route, }: ValueProps): Promise<Array<FieldNode | DocumentTree<D>>>;
}

interface Props {
    schemasStore: SchemaStore;
    omitResolver: SchemaResolver;
    caller: NodeRoute;
    omitCurrentDocument?: DocumentTree;
}
/** Store to interact with all datasets */
declare class DatasetStore {
    private readonly schemasStore;
    private readonly omitCurrentDocument;
    private readonly omitResolver;
    private readonly caller;
    constructor({ omitCurrentDocument, omitResolver, schemasStore, caller, }: Props);
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
    get<R = any>(route: string, iconfig?: GetStoreConfig): Promise<R[]>;
    /**
     * Returns the documents of the schema that uses this method
     */
    currentDocuments<R = any>(): R[];
}

type CustomFieldProps<C = any> = {
    /** Current schema document fields */
    currentFields: C;
    /** Store to interact with all dataset schemas */
    store: DatasetStore;
};
/**
 * Function that returns a value depending on the state of the current document and the dataset
 */
type CustomField<C = any, R = any> = (args: CustomFieldProps<C>) => R | Promise<R>;

/**
 * Possible types for key schema field
 */
type KeyFieldProps<C = any> = RefField | SequenceField | CustomField<C>;
declare class KeyField<C = any> {
    readonly field: KeyFieldProps<C>;
    constructor(type: KeyFieldProps<C>);
}

declare class Dataset<K = any> implements CliExportable {
    private readonly schemas;
    private readonly utils;
    private readonly datatypeModule;
    private readonly fileWriter;
    constructor(schemas: DatasetSchema[], utils: ChacaUtils, datatypeModule: DatatypeModule, fileWriter?: FileWriter);
    /**
     * Generates and serializes dataset data as a specific file format
     *
     * @param props.filename name for the file
     * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     * @param config.verbose show log in console progretion
     */
    transform(props: DumpConfig): Promise<DumpFile[]>;
    /**
     * Generate and export data from relational schemas
     * @param schemas Array with the schemas config
     * @param config.filename file name
     * @param config.location location of the file
     * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     * @param config.verbose show log in console progretion
     */
    export(config: FileConfig): Promise<string[]>;
    /**
     * Adapts the CLI's uniform export call to the dataset `export` signature.
     * The document count is defined per schema, so it is ignored here.
     * @internal
     */
    exportFromCli(_documents: number, config: FileConfig): Promise<string[]>;
    /**
     * Generates the dataset data through the defined schemas
     */
    generate(): Promise<K>;
}

declare class Chaca {
    private readonly datatypeModule;
    readonly utils: ChacaUtils;
    private readonly fileWriter;
    constructor(datatypeModule: DatatypeModule, utils: ChacaUtils, fileWriter: FileWriter);
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
    schema<K = any>(input: SchemaInput): Schema<K>;
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
    ref(field: FieldToRef, config?: RefFieldConfig): RefField;
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
    sequential<K = any>(values: K[], config?: SequentialFieldConfig): SequentialField<K>;
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
    sequence(config?: SequenceFieldProps): SequenceField;
    /**
     * Key field
     * @param field field that will return the value. Could be (`RefField` | `SequenceField` | `CustomField` )
     *
     * @example
     * chaca.key(chaca.sequence())
     * chaca.key(() => modules.id.uuid())
     */
    key(field: KeyFieldProps): KeyField<any>;
    /**
     * Enum field
     * @param values Array of posible values
     *
     * @example
     * chaca.enum(["category1", "category2", "category3"])
     */
    enum<R = any>(values: ReadonlyArray<R>): EnumField<R>;
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
    export(data: any, config: FileConfig): Promise<string[]>;
    /**
     * Generate data from realtional schemas
     * @param schemas Array with the schemas config
     */
    dataset<K = any>(schemas: DatasetSchema[]): Dataset<K>;
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
    probability<T = any>(options: ProbabilityOption<T>[]): ProbabilityField<T>;
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
    pick<V = any>(props: PickFieldProps<V>): PickField<V>;
    /**
     * Serializes `data` as a specific file format
     *
     * @param data Data to transform
     * @param props.filename name for the file
     * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
     */
    transform(data: any, props: DumpConfig): DumpFile[];
}

declare class ChacaError extends Error {
    constructor(message: string);
}
declare class WrongArrayDefinitionError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string, message: string);
}
declare class WrongPossibleNullDefinitionError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string, message: string);
}
declare class EmptySequentialValuesError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string);
}
declare class WrongProbabilityFieldDefinitionError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string, message: string);
}
declare class PickFieldDefinitionError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string, message: string);
}
declare class TryRefANoKeyFieldError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string);
}
declare class NotEnoughValuesForRefError extends ChacaError {
    readonly refFieldRoute: string;
    readonly keyFieldRoute: string;
    constructor(refFieldRoute: string, keyFieldRoute: string);
}
declare class CyclicAccessDataError extends ChacaError {
    constructor(message: string);
}
declare class NotExistRefFieldError extends ChacaError {
    readonly fieldRoute: string;
    readonly refFieldRoute: string;
    constructor(fieldRoute: string, refFieldRoute: string);
}
declare class EmptyEnumValuesError extends ChacaError {
    readonly fieldRoute: string;
    constructor(fieldRoute: string);
}

type index_ChacaError = ChacaError;
declare const index_ChacaError: typeof ChacaError;
type index_CyclicAccessDataError = CyclicAccessDataError;
declare const index_CyclicAccessDataError: typeof CyclicAccessDataError;
type index_EmptyEnumValuesError = EmptyEnumValuesError;
declare const index_EmptyEnumValuesError: typeof EmptyEnumValuesError;
type index_EmptySequentialValuesError = EmptySequentialValuesError;
declare const index_EmptySequentialValuesError: typeof EmptySequentialValuesError;
type index_NotEnoughValuesForRefError = NotEnoughValuesForRefError;
declare const index_NotEnoughValuesForRefError: typeof NotEnoughValuesForRefError;
type index_NotExistRefFieldError = NotExistRefFieldError;
declare const index_NotExistRefFieldError: typeof NotExistRefFieldError;
type index_PickFieldDefinitionError = PickFieldDefinitionError;
declare const index_PickFieldDefinitionError: typeof PickFieldDefinitionError;
type index_TryRefANoKeyFieldError = TryRefANoKeyFieldError;
declare const index_TryRefANoKeyFieldError: typeof TryRefANoKeyFieldError;
type index_WrongArrayDefinitionError = WrongArrayDefinitionError;
declare const index_WrongArrayDefinitionError: typeof WrongArrayDefinitionError;
type index_WrongPossibleNullDefinitionError = WrongPossibleNullDefinitionError;
declare const index_WrongPossibleNullDefinitionError: typeof WrongPossibleNullDefinitionError;
type index_WrongProbabilityFieldDefinitionError = WrongProbabilityFieldDefinitionError;
declare const index_WrongProbabilityFieldDefinitionError: typeof WrongProbabilityFieldDefinitionError;
declare namespace index {
  export { index_ChacaError as ChacaError, index_CyclicAccessDataError as CyclicAccessDataError, index_EmptyEnumValuesError as EmptyEnumValuesError, index_EmptySequentialValuesError as EmptySequentialValuesError, index_NotEnoughValuesForRefError as NotEnoughValuesForRefError, index_NotExistRefFieldError as NotExistRefFieldError, index_PickFieldDefinitionError as PickFieldDefinitionError, index_TryRefANoKeyFieldError as TryRefANoKeyFieldError, index_WrongArrayDefinitionError as WrongArrayDefinitionError, index_WrongPossibleNullDefinitionError as WrongPossibleNullDefinitionError, index_WrongProbabilityFieldDefinitionError as WrongProbabilityFieldDefinitionError };
}

type NanoidProps = {
    length?: number;
};
declare class IdModule {
    private readonly datatypeModule;
    constructor(datatypeModule: DatatypeModule);
    /**
     * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
     *
     * @example
     * modules.id.mongodbId() // 'e175cac316a79afdd0ad3afb'
     *
     * @returns string
     */
    mongodbId(): string;
    /**
     * Returns a UUID v4 ([Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
     *
     * @example
     * modules.id.uuid() // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
     *
     * @returns string
     */
    uuid(): string;
    /**
     * Generates a [Nano ID](https://github.com/ai/nanoid).
     *
     * @param length Length of the generated string. Defaults to `20`.
     *
     * @example
     * modules.id.nanoid() // 'ptL0KpX_yRMI98JFr6B3n'
     * modules.id.nanoid({ length: 10 }) // 'VsvwSdm_Am'
     */
    nanoid({ length: ilength }?: NanoidProps): string;
    /**
     * Generates a [ULID](https://github.com/ulid/javascript)
     *
     * @example
     * modules.id.ulid() // "01ARZ3NDEKTSV4RRFFQ69G5FAV"
     *
     * @returns string
     */
    ulid(): string;
    /**
     * Generates a [CUID](https://github.com/paralleldrive/cuid2)
     *
     * @example
     * modules.id.cuid() // "tz4a98xxat96iws9zmbrgj3a"
     *
     * @returns string
     */
    cuid(): string;
}

interface ILanguageNames {
    male: string[];
    female: string[];
    lastNames: string[];
}

type AllLanguages = "es" | "en";
type LangugeProps = {
    language?: AllLanguages;
};
type Sex = "male" | "female";
type NameProps = {
    language?: AllLanguages;
    sex?: Sex;
};
type SexProps = {
    sex?: Sex;
};
declare class PersonModule {
    private readonly utils;
    private readonly datatypeModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule);
    readonly constants: {
        jobLevels: string[];
        jobAreas: string[];
        genders: string[];
        names: {
            es: ILanguageNames;
            en: ILanguageNames;
        };
        languages: string[];
        prefixes: {
            male: string[];
            female: string[];
        };
        zodiacSigns: string[];
        sexs: string[];
    };
    /**
     * @example
     * modules.person.language() // 'Georgian'
     *
     * @returns string
     */
    language(): string;
    /**
     * Returns a Job Level
     * @example modules.person.jobLevel() // 'Investor'
     * @returns string
     */
    jobLevel(): string;
    /**
     * Returns a Job Area
     * @example modules.person.jobArea() // 'Supervisor'
     * @returns string
     */
    jobArea(): string;
    /**
     * Returns a person gender
     * @example modules.person.gender() // 'Bigender'
     * @returns string
     */
    gender(): string;
    /**
     * Returns a person sex
     * @example modules.person.sex() // 'Male'
     * @returns `Male` | `Female`
     */
    sex(): string;
    /**
     * Returns a first name from a selected lenguage
     * @param args.language (`'en'` | `'es'`). Default `'en'`
     * @param args.sex Person name sex (`'male'` | `'female'`)
     * @example modules.person.firstName() // 'Juan'
     * @returns string
     */
    firstName({ language, sex }?: NameProps): string;
    /**
     * Returns a last name from a selected lenguage
     * @param args.language (`en` | `es`). Default `en`
     * @example modules.person.lastName() // 'Scott'
     * @returns string
     */
    lastName({ language }?: LangugeProps): string;
    /**
     * Returns a full name from a selected lenguage
     * @param args.language (`en` | `es`). Default `en`
     * @param args.sex (`male` | `female`)
     * @example
     * modules.person.fullName() // Schema
     * modules.person.fullName() // 'Juan Rodriguez Perez'
     * @returns string
     */
    fullName({ language, sex: isex }?: NameProps): string;
    /**
     * Returns a random zodiac sign.
     *
     * @example
     * modules.person.zodiacSign() // 'Pisces'
     */
    zodiacSign(): string;
    /**
     * Returns a random name prefix
     * @param args.sex Sex of the person. (`male` | `female`)
     * @example modules.person.prefix() // 'Ms.'
     * @returns string
     */
    prefix({ sex: isex }?: SexProps): string;
    private filterNameByLanguage;
    private filterBySex;
}

interface ILanguageWord {
    verbs: string[];
    conjuctions: string[];
    interjections: string[];
    prepositions: string[];
    adverbs: string[];
    adjectives: string[];
    nouns: string[];
}

type Languages = "es" | "en";
type WordProps = {
    language?: Languages;
};
declare class WordModule {
    private readonly utils;
    constructor(utils: ChacaUtils);
    readonly constants: {
        words: {
            es: ILanguageWord;
            en: ILanguageWord;
        };
    };
    /**
     * Returns a adjective from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.adjective() // 'clever'
     * @returns string
     */
    adjective(args?: WordProps): string;
    /**
     * Returns a conjuction from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.conjuction() // 'but'
     * @returns string
     */
    conjuction(args?: WordProps): string;
    /**
     * Returns a interjection from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.interjection() // 'hey!'
     * @returns string
     */
    interjection(args?: WordProps): string;
    /**
     * Returns a preposition from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.preposition() // 'at'
     * @returns string
     */
    preposition(args?: WordProps): string;
    /**
     * Returns a adverb from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.adverb() // 'here'
     * @returns string
     */
    adverb(args?: WordProps): string;
    /**
     * Returns a verb from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.verb() // 'had'
     * @returns string
     */
    verb(args?: WordProps): string;
    /**
     * Returns a noun from a selected lenguage
     * @param args.language word language (`en` | `es`). Defaults `en`
     * @example modules.word.noun() // 'car'
     * @returns string
     */
    noun(args?: WordProps): string;
    private filterWords;
}

type HttpStatus = {
    informational: number[];
    success: number[];
    redirection: number[];
    clientError: number[];
    serverError: number[];
};
type Emojis = {
    smiley: string[];
    body: string[];
    person: string[];
    nature: string[];
    food: string[];
    travel: string[];
    activity: string[];
    object: string[];
    symbol: string[];
};
type EmojiProps = {
    emoji?: keyof Emojis;
};
type EmailArgs = {
    firstName?: string;
    lastName?: string;
    provider?: string;
};
type PasswordArgs = {
    length?: number;
    memorable?: boolean;
    prefix?: string;
    pattern?: RegExp;
};
type UrlArgs = {
    secure?: boolean;
};
type UsernameArgs = {
    firstName?: string;
    lastName?: string;
};
declare class InternetModule {
    private readonly datatypeModule;
    private readonly utils;
    private readonly personModule;
    private readonly wordModule;
    private readonly passwordCreator;
    constructor(datatypeModule: DatatypeModule, utils: ChacaUtils, personModule: PersonModule, wordModule: WordModule);
    readonly constants: {
        emojis: Emojis;
        domainSuffixs: string[];
        httpStatus: HttpStatus;
        httpMethods: string[];
        protocols: string[];
        oauthProviders: string[];
        locales: string[];
        emailProviders: string[];
        browsers: string[];
    };
    /**
     * Returns a browser name
     *
     * @example
     * modules.internet.browser() // 'Opera'
     *
     * @returns string
     */
    browser(): string;
    /**
     * Generate a random OAuth provider
     *
     * @example
     * modules.internet.oauthProvider() // 'Amazon'
     *
     * @returns string
     */
    oauthProvider(): string;
    /**
     * Returns a random locale
     *
     * @example
     * modules.internet.locale() // 'es_MX'
     *
     * @returns string
     */
    locale(): string;
    /**
     * Returns a random email provider
     *
     * @example
     * modules.internet.emailProvider() // 'gmail'
     *
     * @returns string
     */
    emailProvider(): string;
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
    email({ firstName, lastName, provider: iprovider }?: EmailArgs): string;
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
    password({ length, memorable: imemorable, pattern: ipattern, prefix: iprefix, }?: PasswordArgs): string;
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
    url({ secure }?: UrlArgs): string;
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
    username({ firstName: ifirstName, lastName: ilastName, }?: UsernameArgs): string;
    /**
     * Returns a http method
     * @example
     * modules.internet.httpMethod() // 'GET'
     * @returns `GET` | `PATCH` | `DELETE` | `POST` | `PUT`
     */
    httpMethod(): string;
    /**
     * Returns a IPv6 address
     * @example modules.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
     * @returns string
     */
    ipv6(): string;
    /**
     * Returns a IPv4 address.
     *
     * @example modules.internet.ipv4() // '245.108.222.0'
     *
     * @returns string
     */
    ipv4(): string;
    /**
     * Return an emoji
     * @param args.emoji emoji category
     * @example modules.internet.emoji() // '🔎'
     * @returns string
     */
    emoji({ emoji: iemoji }?: EmojiProps): string;
    /**
     * Returns a mac address
     * @example modules.internet.mac() // '32:8e:2e:09:c6:05'
     * @returns string
     */
    mac(): string;
    /**
     * Returns a port number
     * @example
     * modules.internet.port() // 8001
     * @returns string
     */
    port(): number;
    /**
     * Returns a string with a browser user agent
     * @example modules.internet.userAgent() // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
     * @returns string
     */
    userAgent(): string;
    /**
     * Returns a web protocol
     * @example modules.internet.protocol() // 'https'
     * @returns string
     */
    protocol(): string;
    /**
     * Returns a domain suffix
     * @example modules.internet.domainSuffix() // '.com'
     * @returns string
     */
    domainSuffix(): string;
    /**
     * Returns a domain word
     * @example modules.internet.domainName() // 'words.info'
     * @returns string
     */
    domainName(): string;
    /**
     * Returns a web http status code
     * @example modules.internet.httpStatusCode() // 201
     * @returns string
     */
    httpStatusCode(): number;
    /**
     * Generates a random IPv4 or IPv6 address.
     *
     * @example
     * modules.internet.ip() // '245.108.222.0'
     * modules.internet.ip() // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
     */
    ip(): string;
}

type WordsProps = {
    count?: number;
};
type ParagraphProps = {
    count?: number;
};
type SlugProps = {
    wordCount?: number;
};
type SentencesProps = {
    sentencesCount?: number;
    separator?: string;
    wordsMax?: number;
    wordsMin?: number;
};
type SentenceProps = {
    wordsMax?: number;
    wordsMin?: number;
};
type ParagraphsProps = {
    paragraphsCount?: number;
    separator?: string;
    minSentences?: number;
    maxSentences?: number;
};
declare class LoremModule {
    private readonly datatypeModule;
    constructor(datatypeModule: DatatypeModule);
    /**
     * @param args.paragraphsCount Number of paragraphs. Default `3`
     * @param args.separator Separator between paragraphs. Default `\n`
     * @param args.maxSentences Maximun of sentences of each paragraphs
     * @param args.minSentences Min of sentences of each paragraphs
     *
     * @example modules.lorem.paragraphs()
     * @returns string
     */
    paragraphs({ maxSentences, minSentences, paragraphsCount, separator: iseparator, }?: ParagraphsProps): string;
    /**
     * @param args.sentencesCount Number of sentences. Default in `3`
     * @param args.separator Separator between sentences. Default `\n`
     * @param args.wordsMin Minimun of words in each sentence
     * @param args.wordsMax Maximun of words in each sentence
     *
     * @example modules.lorem.sentences()
     * @returns
     */
    sentences({ sentencesCount, separator: iseparator, wordsMax, wordsMin, }?: SentencesProps): string;
    /**
     * @param args.wordCount Number of words in the slug. Default `3`
     * @example modules.lorem.slug() // 'lorem-ipsum-ad'
     * @returns string
     */
    slug({ wordCount }?: SlugProps): string;
    /**
     *
     * @param args.count Number or words.
     * @example modules.lorem.words() // 'lorem ipsum in'
     * @returns string
     */
    words({ count: icount }?: WordsProps): string;
    /**
     * Generates a word .
     *
     * @example
     * modules.lorem.word() // 'temporibus'
     */
    word(): string;
    /**
     * Generates a paragraph with the given number of sentences.
     *
     * @param args.count The number of sentences to generate.
     *
     * @example
     * modules.lorem.paragraph()
     *
     */
    paragraph({ count: icount }?: ParagraphProps): string;
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
    sentence({ wordsMax, wordsMin }?: SentenceProps): string;
}

interface ImageProps {
    width?: number;
    height?: number;
}
interface CategoryProps {
    width?: number;
    height?: number;
    category?: string;
}
declare class ImageModule {
    private readonly datatypeModule;
    private readonly wordModule;
    constructor(datatypeModule: DatatypeModule, wordModule: WordModule);
    private buildUrl;
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
    category(props?: CategoryProps): string;
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
    food(props?: ImageProps): string;
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
    event(props?: ImageProps): string;
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
    wallpaper(props?: ImageProps): string;
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
    threeDimension(props?: ImageProps): string;
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
    architecture(props?: ImageProps): string;
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
    nature(props?: ImageProps): string;
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
    fashion(props?: ImageProps): string;
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
    film(props?: ImageProps): string;
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
    people(props?: ImageProps): string;
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
    health(props?: ImageProps): string;
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
    house(props?: ImageProps): string;
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
    street(props?: ImageProps): string;
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
    animal(props?: ImageProps): string;
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
    spiritual(props?: ImageProps): string;
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
    travel(props?: ImageProps): string;
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
    art(props?: ImageProps): string;
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
    history(props?: ImageProps): string;
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
    sport(props?: ImageProps): string;
    /**
     * Return a animate avatar image url
     *
     * @example
     * modules.image.animateAvatar()
     *
     * @returns string
     */
    animatedAvatar(): string;
}

interface CronProps {
    includeYear?: boolean;
    includeNonStandard?: boolean;
}
type FilenameProps = {
    ext?: string;
};
declare class SystemModule {
    private readonly utils;
    private readonly datatypeModule;
    private readonly wordModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule, wordModule: WordModule);
    readonly constants: {
        fileExtensions: {
            text: string[];
            code: string[];
            config: string[];
            docs: string[];
            multimedia: string[];
            minify: string[];
            executable: string[];
            database: string[];
            office: string[];
            videogame: string[];
            os: string[];
        };
        mimeTypes: string[];
    };
    /**
     * Returns a file name
     * @param args.ext File extension
     * @example
     * modules.system.filename() // 'academy.png'
     * modules.system.filename({ ext: 'gif' }) // 'academy_button_school.gif'
     * @returns string
     */
    filename({ ext: iext }?: FilenameProps): string;
    /**
     * Returns a mime type
     * @example modules.system.mimeType() // 'video/mpeg'
     * @returns string
     */
    mimeType(): string;
    /**
     * Return a file extension
     * @example modules.system.fileExt() // '.mp4'
     * @returns string
     */
    fileExt(): string;
    /**
     * Returns a directory path
     *
     * @example modules.system.directoryPath() // 'user/files/videos'
     *
     * @returns string
     */
    directoryPath(): string;
    /**
     * Returns a string with a system file path
     * @example
     * modules.system.filePath() // 'user/files/videos/academy.mp4'
     * @returns string
     */
    filePath(): string;
    /**
     * Returns a [semantic version](https://semver.org).
     *
     * @example
     * modules.system.semver() // '1.1.2'
     */
    semver(): string;
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
    cron({ includeYear, includeNonStandard, }?: CronProps): string;
}

interface Iban {
    alpha: string[];
    formats: Array<{
        bban: Array<{
            type: string;
            count: number;
        }>;
        country: string;
        format?: string;
        total?: number;
    }>;
    iso3166: string[];
    mod97: (digitStr: string) => number;
    pattern10: string[];
    pattern100: string[];
    toDigitString: (str: string) => string;
}

type AmountProps = {
    min?: number;
    max?: number;
    symbol?: string;
    precision?: number;
};
type PinProps = {
    length?: number;
};
declare class FinanceModule {
    private readonly utils;
    private readonly datatypeModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule);
    readonly constants: {
        accountTypes: string[];
        ibans: Iban;
        moneyInfo: {
            CUP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            USD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CAD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            EUR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            AED: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            AFN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ALL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            AMD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ARS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            AUD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            AZN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BAM: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BDT: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BGN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BHD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BIF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BND: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BOB: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BRL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BWP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BYN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            BZD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CDF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CHF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CLP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CNY: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            COP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CRC: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CVE: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            CZK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            DJF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            DKK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            DOP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            DZD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            EEK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            EGP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ERN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ETB: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            GBP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            GEL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            GHS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            GNF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            GTQ: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            HKD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            HNL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            HRK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            HUF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            IDR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ILS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            INR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            IQD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            IRR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ISK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            JMD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            JOD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            JPY: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KES: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KHR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KMF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KRW: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KWD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            KZT: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            LBP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            LKR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            LTL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            LVL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            LYD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MAD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MDL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MGA: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MKD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MMK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MOP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MUR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MXN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MYR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            MZN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NAD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NGN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NIO: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NOK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NPR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            NZD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            OMR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PAB: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PEN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PHP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PKR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PLN: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            PYG: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            QAR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            RON: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            RSD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            RUB: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            RWF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SAR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SDG: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SEK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SGD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SOS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            SYP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            THB: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TND: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TOP: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TRY: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TTD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TWD: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            TZS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            UAH: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            UGX: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            UYU: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            UZS: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            VEF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            VND: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            XAF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            XOF: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            YER: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ZAR: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ZMK: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
            ZWL: {
                symbol: string;
                name: string;
                symbol_native: string;
                decimal_digits: number;
                rounding: number;
                code: string;
                name_plural: string;
            };
        };
        transactionTypes: string[];
        subscriptionPlans: string[];
    };
    /**
     * Returns a transaction type
     *
     * @example
     * modules.finance.transaction() // 'payment'
     *
     * @returns string
     */
    transaction(): string;
    /**
     * Returns a suscription plan type
     *
     * @example
     * modules.finance.subscriptionPlan() // 'Free'
     *
     * @returns string
     */
    subscriptionPlan(): string;
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
    pin({ length }?: PinProps): string;
    /**
     * Returns a Bitcoin address.
     *
     * @example
     * modules.finance.bitcoinAddress() // '3ySdvCkTLVy7gKD4j6JfSaf5d'
     *
     * @returns string
     */
    bitcoinAddress(): string;
    /**
     * Returns a credit card number.
     *
     * @example
     * modules.finance.creditCard() // '6375-3265-4676-6646'
     *
     * @returns string
     */
    creditCard(): string;
    /**
     * Returns a Ethereum address.
     *
     * @example
     * modules.finance.ethereumAddress() // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a'
     *
     * @returns string
     */
    ethereumAddress(): string;
    /**
     * @example
     * modules.finance.accountType() // "Credit Card"
     *
     * @returns string
     */
    accountType(): string;
    /**
     * Returns a SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
     *
     * @example
     * modules.finance.bic() // 'WYAUPGX1'
     *
     * @returns string
     */
    bic(): string;
    /**
     * @example
     * modules.finance.routingNumber() // '522814402'
     * @returns string
     */
    routingNumber(): string;
    /**
     * Returns a credit card CVV.
     *
     * @example
     * modules.finance.creditCardCVV() // '506'
     *
     * @returns string
     */
    creditCardCVV(): string;
    /**
     * Returns a string with a money symbol
     * @example modules.finance.moneySymbol() // '$'
     * @returns string
     */
    moneySymbol(): string;
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
    amount({ max, min, precision, symbol: isymbol }?: AmountProps): string;
    /**
     * Returns a current money name
     * @example modules.finance.currencyMoneyName() // 'Us Dollar'
     * @returns string
     */
    currencyMoneyName(): string;
    /**
     * Returns a common money code
     * @example modules.finance.moneyCode() // 'EUR'
     * @returns string
     */
    moneyCode(): string;
    /**
     * Generates a random Litecoin address.
     *
     * @example
     * modules.finance.litecoinAddress() // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
     */
    litecoinAddress(): string;
}

type CallDurationProps = {
    min?: number;
    max?: number;
};
type NumberProps = {
    format?: string;
};
declare class PhoneModule {
    private readonly utils;
    private readonly datatypeModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule);
    readonly constants: {
        phonePrefixs: string[];
    };
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
    number({ format: iformat }?: NumberProps): string;
    /**
     * Returns a string with a country number prefix
     * @example modules.phone.prefix() // '+53'
     * @returns string
     */
    prefix(): string;
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
    callDuration({ max: imax, min: imin }?: CallDurationProps): string;
}

type ZipCodeProps = {
    format?: string;
};
type CountryProps = {
    continent?: "Asia" | "Africa" | "Oceania" | "Europe" | "South America" | "North America" | "Antarctica";
};
type LatitudeProps = {
    max?: number;
    min?: number;
    precision?: number;
};
type LongitudProps = {
    max?: number;
    min?: number;
    precision?: number;
};
declare class AddressModule {
    private readonly utils;
    private readonly datatypeModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule);
    readonly constants: {
        timeZones: string[];
        countries: {
            country: string;
            continent: string;
        }[];
        countriesCode: string[];
        cardinalDirections: string[];
        ordinalDirection: string[];
    };
    /**
     * Returns a zip code
     * @param args.format format of the zip code. Default '#####'
     * @example
     * modules.address.zipCode() // '62581'
     * modules.address.zipCode({ format: '###' }) // '453'
     * @returns string
     */
    zipCode({ format: iformat }?: ZipCodeProps): string;
    /**
     * Returns a time zone
     * @example modules.address.timeZone() // "Asia/Magadan"
     * @returns string
     */
    timeZone(): string;
    /**
     * Returns a cardinal direction
     * @example modules.address.cardinalDirection()// 'North'
     * @returns string
     */
    cardinalDirection(): string;
    /**
     * Returns a country
     * @param args.continent Continent of the country that you want
     * @example modules.address.country() // 'Spain'
     * @returns string
     */
    country({ continent }?: CountryProps): string;
    /**
     * Returns a country name code
     * @example modules.address.countryCode() // 'CU'
     * @returns string
     */
    countryCode(): string;
    /**
     * Returns a random ordinal direction (northwest, southeast, etc).
     *
     * @example
     * modules.address.ordinalDirection() // 'Northeast'
     */
    ordinalDirection(): string;
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
    latitude(options?: LatitudeProps): number;
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
    longitude(options?: LongitudProps): number;
}

declare class VehicleModule {
    private readonly utils;
    constructor(utils: ChacaUtils);
    readonly constants: {
        bicycles: string[];
        fuels: string[];
        manufacturers: string[];
        models: string[];
        vehicleTypes: string[];
    };
    /**
     * Returns a bicycle type
     * @example modules.vehicle.bicycle() // 'BMX Bicycle'
     * @returns string
     */
    bicycle(): string;
    /**
     * Returns a manufacturer name
     * @example modules.vehicle.manufacturer() // 'BMW'
     * @returns string
     */
    manufacturer(): string;
    /**
     * Returns a vehicle model name
     * @example modules.vehicle.model() // 'Model S'
     * @returns string
     */
    model(): string;
    /**
     * Returns a vehicle type
     * @example modules.vehicle.type() // 'Coupe'
     * @returns string
     */
    type(): string;
    /**
     * Returns a vehicle name
     * @example modules.vehicle.vehicle() // 'BMW Explorer'
     * @returns string
     */
    vehicle(): string;
    /**
     * Returns a fuel type
     * @example modules.vehicle.fuel() // 'Diesel'
     * @returns string
     */
    fuel(): string;
}

type ArgDate = Date | string;
type DateSoonProps = {
    days?: number;
    refDate?: ArgDate;
};
type DatePastProps = {
    years?: number;
    refDate?: ArgDate;
};
type AnytimeProps = {
    refDate?: ArgDate;
};
type DateFutureProps = {
    years?: number;
    refDate?: ArgDate;
};
type BirthDateProps = {
    refDate?: ArgDate;
    min?: number;
    max?: number;
    mode?: "age" | "year";
};
type TimeUnits = "years" | "seconds" | "minutes" | "days" | "hours" | "months";
type TimeAgoProps = {
    unit?: TimeUnits;
};
type DateBetweenProps = {
    from?: ArgDate;
    to?: ArgDate;
};
declare class DateModule {
    private readonly datatypeModule;
    private readonly utils;
    constructor(datatypeModule: DatatypeModule, utils: ChacaUtils);
    readonly constants: {
        weekDays: string[];
        months: string[];
    };
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
    soon({ days: idays, refDate: irefDate }?: DateSoonProps): Date;
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
    past({ refDate: irefDate, years: iyears }?: DatePastProps): Date;
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
    future({ refDate: irefDate, years: iyears }?: DateFutureProps): Date;
    /**
     * Returns a month name
     * @example modules.date.month() // 'February'
     * @returns string
     */
    month(): string;
    /**
     * Returns a weekday name
     * @example modules.date.weekDay() // 'Monday'
     * @returns string
     */
    weekDay(): string;
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
    birthdate({ refDate: irefDate, max: imax, min: imin, mode: imode, }?: BirthDateProps): Date;
    private randomDate;
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
    between({ from: ifrom, to: ito }?: DateBetweenProps): Date;
    /**
     * Returns a string with a time ago information
     * @param args.unit Date time unit. Can be (`"years"` | `"seconds"` | `"minutes"` | `"days"` | `"hours"` | `"months"`)
     * @example modules.date.timeAgo({ unit: 'days' }) // '20 days ago'
     * @returns string
     */
    timeAgo({ unit: iunit }?: TimeAgoProps): string;
    /**
     * Generates a random date that can be either in the past or in the future.
     *
     * @param args.refDate The date to use as reference point for the newly generated date. Defaults to `new Date()`.
     *
     * @example
     * modules.date.anytime() // '2022-07-31T01:33:29.567Z'
     */
    anytime({ refDate }?: AnytimeProps): Date;
    private argToDate;
}

declare class AnimalModule {
    private readonly utils;
    constructor(utils: ChacaUtils);
    readonly constants: {
        animalTypes: string[];
        bears: string[];
        birds: string[];
        cats: string[];
        ceteceans: string[];
        cows: string[];
        cocodrilas: string[];
        dogs: string[];
        hourses: string[];
        insects: string[];
        lions: string[];
        rabbits: string[];
        rodents: string[];
        snakes: string[];
        fishes: string[];
    };
    /**
     * Returns a dog breed
     * @example modules.animal.dog() // 'Irish Water Spaniel'
     * @returns string
     */
    dog(): string;
    /**
     * Returns a bear breed
     * @example modules.animal.bear() // 'Singapuria'
     * @returns string
     */
    bear(): string;
    /**
     * Returns a bird breed
     * @example modules.animal.bird() // 'Singapuria'
     * @returns string
     */
    bird(): string;
    /**
     * Returns a cat breed
     * @example modules.animal.cat() // 'Bengal'
     * @returns string
     */
    cat(): string;
    /**
     * Returns a cetacean breed
     * @example modules.animal.cetacean() // 'Spinner Dolphin'
     * @returns string
     */
    cetacean(): string;
    /**
     * Returns a cow breed
     * @example modules.animal.cow() // 'Brava'
     * @returns string
     */
    cow(): string;
    /**
     * Returns a crocodilia breed
     * @example modules.animal.crocodilia() // 'Philippine Crocodile'
     * @returns string
     */
    crocodilia(): string;
    /**
     * Returns a fish breed
     * @example modules.animal.fish() // 'Mandarin fish'
     * @returns string
     */
    fish(): string;
    /**
     * Returns a horse breed
     * @example modules.animal.horse() // 'Swedish Warmblood'
     * @returns string
     */
    horse(): string;
    /**
     * Returns a insect breed
     * @example modules.animal.insect() // 'Pyramid ant'
     * @returns string
     */
    insect(): string;
    /**
     * Returns a lion breed
     * @example modules.animal.lion() // 'Northeast Congo Lion'
     * @returns string
     */
    lion(): string;
    /**
     * Returns a rabbit breed
     * @example modules.animal.rabbit() // 'Florida White'
     * @returns string
     */
    rabbit(): string;
    /**
     * Returns a rodent breed
     * @example modules.animal.rodent() // 'Cuscomys ashanika'
     * @returns string
     */
    rodent(): string;
    /**
     * Returns a snake breed
     * @example modules.animal.snake() // 'Eyelash viper'
     * @returns string
     */
    snake(): string;
    /**
     * Returns an animal type
     * @example modules.animal.type() // 'Singapuria'
     * @returns string
     */
    type(): string;
}

type PeriodicTableProps = {
    type?: "symbol" | "name";
};
type UnitProps = {
    type?: "symbol" | "name";
};
declare class ScienceModule {
    private readonly utils;
    constructor(utils: ChacaUtils);
    readonly constants: {
        units: {
            key: string;
            unit: string;
            symbol: string;
        }[];
        periodicTableElements: {
            symbol: string;
            name: string;
        }[];
    };
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
    periodicTableElement({ type }?: PeriodicTableProps): string;
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
    unit({ type }?: UnitProps): string;
}

/**
 * Color space names supported by CSS.
 */
declare const CSS_SPACES: readonly ["sRGB", "display-p3", "rec2020", "a98-rgb", "prophoto-rgb"];
type CSSSpace = (typeof CSS_SPACES)[number];

type StringColorFormat = "css" | "binary";
type ColorFormat = StringColorFormat;
type Casing = "lower" | "upper" | "mixed";

type RgbProps = {
    prefix?: string;
    casing?: Casing;
    format?: "hex" | ColorFormat;
    includeAlpha?: boolean;
};
type CmykProps = {
    format?: ColorFormat;
};
type HslProps = {
    format?: ColorFormat;
    includeAlpha?: boolean;
};
type HwbProps = {
    format?: ColorFormat;
};
type LchProps = {
    format?: ColorFormat;
};
type ColorByCSSColorSpaceProps = {
    format?: ColorFormat;
    space?: CSSSpace;
};
declare class ColorModule {
    private readonly utils;
    private readonly datatypeModule;
    constructor(utils: ChacaUtils, datatypeModule: DatatypeModule);
    readonly constants: {
        cssFunctions: readonly ["rgb", "rgba", "hsl", "hsla", "hwb", "cmyk", "lab", "lch", "color"];
        cssSpaces: readonly ["sRGB", "display-p3", "rec2020", "a98-rgb", "prophoto-rgb"];
        human: string[];
    };
    /**
     * Returns a random human-readable color name.
     *
     * @example
     * modules.color.human() // 'blue'
     */
    human(): string;
    /**
     * Returns a random css supported color function name.
     *
     * @example
     * modules.color.cssSupportedFunction() // 'rgb'
     */
    cssSupportedFunction(): "color" | "lab" | "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "cmyk" | "lch";
    /**
     * Returns a random css supported color space name.
     *
     * @example
     * modules.color.cssSupportedSpace() // 'display-p3'
     */
    cssSupportedSpace(): "sRGB" | "display-p3" | "rec2020" | "a98-rgb" | "prophoto-rgb";
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
    rgb({ format, includeAlpha, casing, prefix, }?: RgbProps): string;
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
    cmyk({ format }?: CmykProps): string;
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
    hsl({ format, includeAlpha }?: HslProps): string;
    /**
     * Returns an HWB color.
     *
     * @param options.format Format of generated HWB color. Defaults to `'css'`.
     *
     * @example
     * modules.color.hwb({ format: 'css' }) // hwb(194 0% 0%)
     * modules.color.hwb({ format: 'binary' }) // (8-32 bits x 3)
     */
    hwb({ format }?: HwbProps): string;
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
    lch({ format }?: LchProps): string;
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
    colorByCSSColorSpace({ format, space, }?: ColorByCSSColorSpaceProps): string;
}

declare class ChacaModules {
    readonly internet: InternetModule;
    readonly datatype: DatatypeModule;
    readonly id: IdModule;
    readonly lorem: LoremModule;
    readonly image: ImageModule;
    readonly system: SystemModule;
    readonly finance: FinanceModule;
    readonly phone: PhoneModule;
    readonly address: AddressModule;
    readonly word: WordModule;
    readonly vehicle: VehicleModule;
    readonly date: DateModule;
    readonly person: PersonModule;
    readonly animal: AnimalModule;
    readonly science: ScienceModule;
    readonly color: ColorModule;
    constructor(utils: ChacaUtils);
}

declare const modules: ChacaModules;

/**
 * Node.js entry point. `chaca.export(...)` writes files to disk through the
 * `NodeFileWriter`. For browser bundles the `browser` export condition resolves
 * to `./browser`, where filesystem writing is disabled.
 */
declare const chaca: Chaca;

export { Chaca, ChacaError, ChacaModules, ChacaUtils, type Chance, type ChanceFunction, type ChanceFunctionProps, type CsvFormatConfig, type CustomField, type CustomFieldProps, CyclicAccessDataError, Dataset, type DatasetSchema, type DatasetSchemaCount, type DatasetSchemaCountFunction, type DatasetSchemaCountFunctionProps, DatasetStore, type DumpConfig, type DumpFile, EmptyEnumValuesError, EmptySequentialValuesError, EnumField, index as Errors, type ExportFormat, type ExportSQLFormat, type ExtensionConfigs, type Extensions, type FieldObjectInput, type FieldToRef, type FieldTypes, type FileConfig, type FileWriter, type GetStoreConfig, type GetStoreWhere, type IsArrayConfig, type JavaFormatConfig, type JavascriptFormatConfig, type JsonFormatConfig, KeyField, type KeyFieldProps, NotEnoughValuesForRefError, NotExistRefFieldError, type PickCount, type PickCountFunction, type PickCountFunctionProps, type PickCountLimits, PickField, PickFieldDefinitionError, type PickFieldProps, type PossibleNullConfig, type PossibleNullFunction, type PossibleNullFunctionProps, type PostgresqlFormatConfig, ProbabilityField, type ProbabilityOption, type PythonFormatConfig, RefField, type RefFieldConfig, type RefFieldWhere, type RefFieldWhereProps, Schema, type SchemaFieldConfig, type SchemaInput, SequenceField, type SequenceFieldProps, SequentialField, type SequentialFieldConfig, TryRefANoKeyFieldError, type TypescriptFormatConfig, type WriteFilesProps, type YamlFormatConfig, chaca, modules };
