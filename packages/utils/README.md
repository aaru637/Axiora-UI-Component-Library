# @axiora-ui/utils

<!-- AI-ASSISTED: Cursor
     PROMPT: Refresh utils README status section
     ACCEPTED-BY: dhinesh -->

## 📊 Implementation Status

### ✅ Fully Implemented - Production Ready

TypeScript utility library for strings, arrays, objects, dates, JSON, and more. All utility modules are fully implemented and tested.

| Module  | Status      | Tests     | Description                  |
| ------- | ----------- | --------- | ---------------------------- |
| array   | ✅ Complete | ✅ Tested | Array operations             |
| boolean | ✅ Complete | ✅ Tested | Boolean logic utilities      |
| common  | ✅ Complete | ✅ Tested | Type guards and core helpers |
| date    | ✅ Complete | ✅ Tested | Date operations              |
| json    | ✅ Complete | ✅ Tested | JSON serialization           |
| list    | ✅ Complete | ✅ Tested | Object array operations      |
| meta    | ✅ Complete | ✅ Tested | API response helpers         |
| number  | ✅ Complete | ✅ Tested | Numeric utilities            |
| object  | ✅ Complete | ✅ Tested | Object manipulation          |
| react   | ✅ Complete | ✅ Tested | Browser and async helpers    |
| string  | ✅ Complete | ✅ Tested | String manipulation          |
| url     | ✅ Complete | ✅ Tested | URL and query string helpers |

---

A comprehensive, TypeScript-first utility library organized into focused modules. Every utility is null-safe by convention — functions that receive `null | undefined` return the same nullish value rather than throwing, and all functions are fully typed with generics where applicable.

The library can be consumed as individual named exports or through typed namespace objects (e.g. `arrayUtils`, `stringUtils`) when you prefer an organized API surface.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
  - [common — Type guards and core helpers](#common)
  - [string — String manipulation](#string)
  - [array — Array operations](#array)
  - [list — Object array operations](#list)
  - [object — Object manipulation](#object)
  - [boolean — Boolean logic](#boolean)
  - [number — Numeric utilities](#number)
  - [date — Date operations](#date)
  - [json — JSON serialization](#json)
  - [meta — API response helpers](#meta)
  - [react — Browser and async helpers](#react)
  - [url — URL and query string helpers](#url)
- [Null Safety Convention](#null-safety-convention)
- [Build](#build)

---

## Installation

This package is part of the Axiora UI monorepo and is consumed via the workspace protocol:

```json
"dependencies": {
  "@axiora-ui/utils": "workspace:*"
}
```

---

## Usage

Import individual functions:

```ts
import { capitalize, camelCase, isEmpty } from "@axiora-ui/utils";
```

Or use the namespace object for a grouped API:

```ts
import { stringUtils, arrayUtils } from "@axiora-ui/utils";

stringUtils.capitalize("hello world"); // "Hello World"
arrayUtils.unique([1, 2, 2, 3]); // [1, 2, 3]
```

---

## Modules

---

### common

**File:** [`src/common/common.utils.ts`](./src/common/common.utils.ts)

Type guards, identity helpers, and performance utilities. This module is the foundation that all other modules depend on.

#### Type Guards

| Function               | Signature                                    | Description                                     |
| ---------------------- | -------------------------------------------- | ----------------------------------------------- |
| `isNull`               | `(value) → value is null`                    | Strictly `=== null`                             |
| `isUndefined`          | `(value) → value is undefined`               | Strictly `=== undefined`                        |
| `isNullOrUndefined`    | `(value) → value is null \| undefined`       | Either null or undefined                        |
| `isNotNull`            | `(value) → boolean`                          | Not strictly null                               |
| `isNotNullOrUndefined` | `(value) → boolean`                          | Neither null nor undefined                      |
| `isString`             | `(value) → value is string`                  | `typeof value === "string"` (excludes null)     |
| `isNumber`             | `(value) → value is number`                  | `typeof value === "number"` and not `NaN`       |
| `isBoolean`            | `(value) → value is boolean`                 | `typeof value === "boolean"`                    |
| `isDate`               | `(value) → value is Date`                    | Valid `Date` instance (excludes `Invalid Date`) |
| `isArray`              | `<T>(value) → value is T[]`                  | `Array.isArray` (excludes null)                 |
| `isObject`             | `(value) → value is Record<string, unknown>` | Plain object (excludes arrays and dates)        |

#### Utility Functions

| Function                   | Signature                         | Description                                               |
| -------------------------- | --------------------------------- | --------------------------------------------------------- |
| `defaultIfNullOrUndefined` | `(value, defaultValue) → unknown` | Return `defaultValue` when `value` is nullish             |
| `noop`                     | `() → void`                       | No-operation function — useful as a default callback prop |
| `identity`                 | `<T>(value: T) → T`               | Returns the value unchanged                               |
| `sleep`                    | `(ms: number) → Promise<void>`    | Async delay                                               |
| `debounce`                 | `<T extends fn>(fn, wait) → T`    | Debounce any function                                     |
| `throttle`                 | `<T extends fn>(fn, wait) → T`    | Throttle any function                                     |
| `generateUUID`             | `() → string`                     | Generate a UUID v4 (via the `uuid` package)               |

**Constant:**

```ts
import { EMPTY_STRING } from "@axiora-ui/utils";
// EMPTY_STRING === ""
```

**Examples:**

```ts
import { isNullOrUndefined, debounce, generateUUID, noop } from "@axiora-ui/utils";

// Guard before using a value
if (!isNullOrUndefined(user)) {
  console.log(user.name);
}

// Debounce a search handler
const handleSearch = debounce((query: string) => fetchResults(query), 300);

// Default callback prop
<Button onClick={noop} />

// Generate a unique ID
const id = generateUUID(); // "550e8400-e29b-41d4-a716-446655440000"
```

---

### string

**File:** [`src/string/string.utils.ts`](./src/string/string.utils.ts)

String inspection, transformation, and formatting. All functions return `null | undefined` unchanged when the input is nullish.

#### Functions

| Function           | Signature                                                         | Description                                                   |
| ------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------- |
| `isEmptyString`    | `(value) → boolean`                                               | `true` for `null`, `undefined`, or `""` (not whitespace-only) |
| `isNotEmptyString` | `(value) → boolean`                                               | Inverse of `isEmptyString`                                    |
| `capitalizeWord`   | `(value) → string \| null \| undefined`                           | Uppercase the first character of a single word                |
| `capitalize`       | `(value, separator?) → string \| null \| undefined`               | Capitalize first letter of each word                          |
| `camelCase`        | `(value) → string \| null \| undefined`                           | `"hello world"` → `"helloWorld"`                              |
| `snakeCase`        | `(value, separator?) → string \| null \| undefined`               | `"hello world"` → `"hello_world"`                             |
| `kebabCase`        | `(value, separator?) → string \| null \| undefined`               | `"hello world"` → `"hello-world"`                             |
| `pascalCase`       | `(value) → string \| null \| undefined`                           | `"hello world"` → `"HelloWorld"`                              |
| `titleCase`        | `(value) → string \| null \| undefined`                           | `"HELLO WORLD"` → `"Hello World"`                             |
| `trim`             | `(value) → string \| null \| undefined`                           | Remove leading/trailing whitespace                            |
| `truncate`         | `(value, maxLength?) → string \| null \| undefined`               | Clip to `maxLength` and append `"..."`                        |
| `contains`         | `(value, search?) → boolean`                                      | Check if substring exists                                     |
| `startsWith`       | `(value, prefix?) → boolean`                                      | Check prefix                                                  |
| `endsWith`         | `(value, suffix?) → boolean`                                      | Check suffix                                                  |
| `replaceAll`       | `(value, regex?, replacement?) → string \| null \| undefined`     | Replace all occurrences                                       |
| `removeSpaces`     | `(value, appender?) → string \| null \| undefined`                | Remove whitespace, optionally insert replacement              |
| `reverseString`    | `(value) → string \| null \| undefined`                           | Reverse characters                                            |
| `maskString`       | `(value, visibleChars?, maskChar?) → string \| null \| undefined` | Mask leading characters — useful for credentials              |
| `extractInitials`  | `(value) → string \| null \| undefined`                           | First character, uppercased                                   |
| `slugify`          | `(value) → string \| null \| undefined`                           | URL-friendly slug                                             |
| `formatTemplate`   | `(template, values, regex?) → string \| null \| undefined`        | Replace `{key}` placeholders                                  |

**Examples:**

```ts
import {
  capitalize,
  camelCase,
  maskString,
  slugify,
  formatTemplate,
} from "@axiora-ui/utils";

capitalize("hello world"); // "Hello World"
camelCase("hello-world"); // "helloWorld"
maskString("1234567890", 4); // "******7890"
slugify("Hello World!"); // "hello-world"
formatTemplate("Hi {name}!", { name: "Axiora UI" }); // "Hi Axiora UI!"
```

---

### array

**File:** [`src/array/array.utils.ts`](./src/array/array.utils.ts)

Low-level array operations. Works with primitive arrays as well as arrays of objects. Operates safely on `null | undefined` inputs.

#### Functions

| Function       | Signature                             | Description                                           |
| -------------- | ------------------------------------- | ----------------------------------------------------- |
| `isEmpty`      | `<T>(array) → boolean`                | `true` for nullish or zero-length arrays              |
| `isNotEmpty`   | `<T>(array) → boolean`                | `true` for arrays with at least one element           |
| `unique`       | `<T>(values, keyFun?) → T[]`          | Remove duplicates; optional key extractor for objects |
| `difference`   | `<T>(arr1, arr2, keyFun) → T[]`       | Items in `arr1` not in `arr2` (by key)                |
| `intersection` | `<T>(arr1, arr2, keyFun) → T[]`       | Items in both arrays (by key)                         |
| `union`        | `<T>(arr1, arr2, keyFun) → T[]`       | Merge both arrays, deduplicated by key                |
| `compact`      | `<T>(array) → NonNullable<T>[]`       | Remove falsy values                                   |
| `flatten`      | `<T>(array) → T[]`                    | Flatten one level deep                                |
| `deepFlatten`  | `<T>(array) → T[]`                    | Recursively flatten all levels                        |
| `chunk`        | `<T>(array, size?) → T[][]`           | Split into arrays of `size`                           |
| `shuffle`      | `<T>(array) → T[]`                    | Fisher-Yates random shuffle                           |
| `move`         | `<T>(array, from?, to) → T[]`         | Move an element from one index to another             |
| `remove`       | `<T>(array, ...values) → T[]`         | Remove all matching values (strict equality)          |
| `insert`       | `<T>(array, index?, ...values) → T[]` | Insert values at a given index                        |
| `first`        | `<T>(array) → T \| null`              | First element or `null`                               |
| `last`         | `<T>(array) → T \| null`              | Last element or `null`                                |
| `sort`         | `<T>(array, keyFun?, sortBy?) → T[]`  | Sort a copy; supports `"asc"` / `"desc"`              |

**Examples:**

```ts
import { unique, chunk, difference, sort } from "@axiora-ui/utils";

unique([1, 2, 2, 3]); // [1, 2, 3]
unique([{ id: 1 }, { id: 1 }], (x) => x.id); // [{ id: 1 }]
chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
difference([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 1 }]
sort([3, 1, 2], null, "desc"); // [3, 2, 1]
```

---

### list

**File:** [`src/list/list.utils.ts`](./src/list/list.utils.ts)

Higher-level utilities for arrays of objects (records / entities). All operations are key-based — you pick the property to match on.

#### Functions

| Function     | Signature                                          | Description                                       |
| ------------ | -------------------------------------------------- | ------------------------------------------------- |
| `findBy`     | `<T, K>(list, key, value) → T \| null`             | Find first item where `item[key] === value`       |
| `filterBy`   | `<T, K>(list, key, value) → T[]`                   | Filter items where `item[key] === value`          |
| `exists`     | `<T, K>(list, key, value) → boolean`               | Check if any item matches                         |
| `removeBy`   | `<T, K>(list, key, value) → T[]`                   | Remove items where `item[key] === value`          |
| `updateBy`   | `<T, K>(list, key, value, updates) → T[]`          | Patch items where `item[key] === value`           |
| `sortBy`     | `<T, K>(list, key) → T[]`                          | Sort by a property (ascending)                    |
| `groupBy`    | `<T, K>(list, key) → Record<string, T[]>`          | Group into buckets by property value              |
| `countBy`    | `<T, K>(list, key) → Record<string, number>`       | Count occurrences per property value              |
| `pluck`      | `<T, K>(list, key) → T[K][]`                       | Extract a single property from all items          |
| `distinctBy` | `<T, K>(list, key) → T[]`                          | Remove duplicates by property key                 |
| `indexBy`    | `<T, K>(list, key) → Record<string, T>`            | Convert list to a lookup map keyed by property    |
| `partition`  | `<T>(list, predicate) → [T[], T[]]`                | Split into matching and non-matching groups       |
| `search`     | `<T>(list, text, keys) → T[]`                      | Case-insensitive text search across multiple keys |
| `paginate`   | `<T>(list, page?, pageSize?) → PaginatedResult<T>` | Slice a list and return pagination metadata       |

#### `PaginatedResult<T>` type

```ts
type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
```

**Examples:**

```ts
import { findBy, groupBy, search, paginate, indexBy } from "@axiora-ui/utils";

const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Carol", role: "admin" },
];

findBy(users, "id", 2); // { id: 2, name: "Bob", role: "user" }
groupBy(users, "role"); // { admin: [...], user: [...] }
search(users, "ali", ["name"]); // [{ id: 1, name: "Alice", ... }]
indexBy(users, "id"); // { "1": {...}, "2": {...}, "3": {...} }

const result = paginate(users, 1, 2);
// { data: [Alice, Bob], page: 1, pageSize: 2, total: 3, totalPages: 2 }
```

---

### object

**File:** [`src/object/object.utils.ts`](./src/object/object.utils.ts)

Plain-object inspection and manipulation.

#### Functions

| Function          | Signature                                        | Description                                                            |
| ----------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `isPlainObject`   | `(value) → boolean`                              | True for `{}` or `Object.create(null)`, false for arrays/dates/classes |
| `hasKey`          | `<T>(obj, key) → key is keyof T`                 | Own property check                                                     |
| `get`             | `<T, K, D>(obj, key, defaultValue?) → T[K] \| D` | Safe property read with default                                        |
| `set`             | `<T>(obj, path, value) → T`                      | Set a nested property via dot-separated path                           |
| `merge`           | `<T, U>(obj1, obj2) → T & U`                     | Deep merge — nested plain objects are merged recursively               |
| `pick`            | `<T, K>(obj, keys) → Pick<T, K>`                 | Return a new object with only the given keys                           |
| `omit`            | `<T, K>(obj, keys) → Omit<T, K>`                 | Return a new object without the given keys                             |
| `keys`            | `<T>(obj) → (keyof T)[]`                         | Own enumerable keys                                                    |
| `values`          | `<T>(obj) → T[keyof T][]`                        | Own enumerable values                                                  |
| `entries`         | `<T>(obj) → [keyof T, T[keyof T]][]`             | Own enumerable key-value pairs                                         |
| `invert`          | `(obj) → Record<string, string>`                 | Swap keys and values                                                   |
| `mapKeys`         | `<T>(obj, fn) → Record<string, T[keyof T]>`      | Transform all keys                                                     |
| `mapValues`       | `<T, R>(obj, fn) → Record<string, R>`            | Transform all values                                                   |
| `deepClone`       | `<T>(value) → T`                                 | Deep copy supporting objects, arrays, dates, and primitives            |
| `deepEqual`       | `(a, b) → boolean`                               | Deep equality comparison                                               |
| `removeUndefined` | `<T>(obj) → Partial<T>`                          | Strip `undefined` properties                                           |
| `removeNull`      | `<T>(obj) → Partial<T>`                          | Strip `null` properties                                                |

**Examples:**

```ts
import { pick, omit, merge, deepClone, set } from "@axiora-ui/utils";

pick({ name: "Axiora UI", age: 3, active: true }, ["name", "active"]);
// { name: "Axiora UI", active: true }

omit({ name: "Axiora UI", password: "secret" }, ["password"]);
// { name: "Axiora UI" }

merge({ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 });
// { a: 1, b: { x: 1, y: 2 }, c: 3 }

set({ user: {} }, "user.name", "Axiora UI");
// { user: { name: "Axiora UI" } }
```

---

### boolean

**File:** [`src/boolean/boolean.utils.ts`](./src/boolean/boolean.utils.ts)

Boolean type coercion and logical operations.

#### Functions

| Function    | Signature                           | Description                                                  |
| ----------- | ----------------------------------- | ------------------------------------------------------------ |
| `toBoolean` | `(value: unknown) → boolean`        | Coerce strings (`"true"`, `"1"`) and other values to boolean |
| `isTrue`    | `(value: unknown) → value is true`  | Strictly `=== true`                                          |
| `isFalse`   | `(value: unknown) → value is false` | Strictly `=== false`                                         |
| `toggle`    | `(value: boolean) → boolean`        | Flip a boolean                                               |
| `allTrue`   | `(array) → boolean`                 | Every element is `true`                                      |
| `anyTrue`   | `(array) → boolean`                 | At least one element is `true`                               |
| `noneTrue`  | `(array) → boolean`                 | No elements are `true`                                       |
| `xor`       | `(a, b) → boolean`                  | Exclusive OR                                                 |
| `and`       | `(a, b) → boolean`                  | Logical AND                                                  |
| `or`        | `(a, b) → boolean`                  | Logical OR                                                   |

**Examples:**

```ts
import { toBoolean, allTrue, anyTrue, xor } from "@axiora-ui/utils";

toBoolean("true"); // true
toBoolean("1"); // true
toBoolean(0); // false

allTrue([true, true, true]); // true
allTrue([true, false]); // false
anyTrue([false, false, true]); // true

xor(true, false); // true
xor(true, true); // false
```

---

### number

**File:** [`src/number/number.utils.ts`](./src/number/number.utils.ts)

Numeric math, formatting, and guards.

#### Functions

| Function         | Signature                                    | Description                                     |
| ---------------- | -------------------------------------------- | ----------------------------------------------- | --- | ------------- |
| `clamp`          | `(value, min?, max?) → number`               | Restrict a number to `[min, max]`               |
| `round`          | `(value, decimals?) → number`                | Round to N decimal places (default: 2)          |
| `floor`          | `(value) → number`                           | `Math.floor` with null safety                   |
| `ceil`           | `(value) → number`                           | `Math.ceil` with null safety                    |
| `random`         | `(min?, max?) → number`                      | Pseudo-random float in `[min, max)`             |
| `percentage`     | `(total, rate?) → number`                    | Compute `rate / total / 100`                    |
| `sum`            | `(...values) → number`                       | Sum of all arguments                            |
| `average`        | `(...values) → number`                       | Arithmetic mean                                 |
| `min`            | `(...values) → number`                       | Minimum value                                   |
| `max`            | `(...values) → number`                       | Maximum value                                   |
| `formatCurrency` | `(value, currency, locale) → string`         | Locale-aware currency string (e.g. `₹1,234.50`) |
| `formatNumber`   | `(value, locale?, fractionDigits?) → string` | Locale-aware number string                      |
| `isEven`         | `(value) → boolean`                          | Check even integer                              |
| `isOdd`          | `(value) → boolean`                          | Check odd integer                               |
| `isBetween`      | `(value, min?, max?) → boolean`              | Check `value >= min                             |     | value <= max` |

**Examples:**

```ts
import {
  clamp,
  round,
  formatCurrency,
  formatNumber,
  sum,
} from "@axiora-ui/utils";

clamp(150, 0, 100); // 100
round(1.2345, 2); // 1.23
formatCurrency(1234.5, "INR", "en-IN"); // "₹1,234.50"
formatNumber(9876.5432, "en-IN", 2); // "9,876.54"
sum(1, 2, 3, 4, 5); // 15
```

---

### date

**File:** [`src/date/date.utils.ts`](./src/date/date.utils.ts)

Date arithmetic, formatting, and comparison. All functions accept `Date | null | undefined` and return `null | undefined` for nullish inputs rather than throwing.

#### Functions

| Function           | Signature                          | Description                                        |
| ------------------ | ---------------------------------- | -------------------------------------------------- |
| `formatDate`       | `(date) → string \| null`          | Format as `YYYY-MM-DD`                             |
| `formatDateTime`   | `(date, locale?) → string \| null` | Locale-aware date+time string                      |
| `isToday`          | `(date) → boolean`                 | Check if date falls on today                       |
| `isPast`           | `(date) → boolean`                 | Check if date is before today                      |
| `isFuture`         | `(date) → boolean`                 | Check if date is after today                       |
| `addDays`          | `(date, days) → Date \| null`      | Add N days                                         |
| `subtractDays`     | `(date, days) → Date \| null`      | Subtract N days                                    |
| `startOfDay`       | `(date) → Date \| null`            | Set time to `00:00:00.000`                         |
| `endOfDay`         | `(date) → Date \| null`            | Set time to `23:59:59.999`                         |
| `differenceInDays` | `(a, b) → number \| null`          | Whole-day difference between two dates             |
| `relativeTime`     | `(date, now?) → string \| null`    | Human-readable relative time (e.g. `"3 days ago"`) |

**Examples:**

```ts
import { formatDate, addDays, relativeTime, isToday } from "@axiora-ui/utils";

formatDate(new Date("2024-06-25")); // "2024-06-25"
addDays(new Date("2024-01-01"), 7); // Date for 2024-01-08
relativeTime(new Date(Date.now() - 90000)); // "2 minutes ago"
isToday(new Date()); // true
```

---

### json

**File:** [`src/json/json.utils.ts`](./src/json/json.utils.ts)

Safe JSON serialization and deserialization. All functions catch parse/stringify errors and return `null` instead of throwing.

#### Functions

| Function                    | Signature                             | Description                                            |
| --------------------------- | ------------------------------------- | ------------------------------------------------------ |
| `toJson`                    | `(value, space?) → string \| null`    | `JSON.stringify` with error handling                   |
| `fromJson<T>`               | `(json, fallback?) → T \| null`       | `JSON.parse` with error handling and optional fallback |
| `tryFromJson<T>`            | `(json) → [Error \| null, T \| null]` | Parse and return `[error, result]` tuple               |
| `isValidJson`               | `(json) → boolean`                    | Check if a string is valid JSON                        |
| `prettyJson`                | `(value, space?) → string \| null`    | Pretty-print with configurable indent (default: 2)     |
| `minifyJson`                | `(value) → string \| null`            | Minified JSON string                                   |
| `cloneJson<T>`              | `(value) → T \| null`                 | Deep clone via JSON round-trip                         |
| `jsonEquals`                | `(left, right) → boolean`             | Compare by JSON serialization                          |
| `ensureJsonSerializable<T>` | `(value) → T \| null`                 | Validate serializability via round-trip                |

**Examples:**

```ts
import { toJson, fromJson, tryFromJson, isValidJson } from "@axiora-ui/utils";

toJson({ name: "Axiora UI" }); // '{"name":"Axiora UI"}'
fromJson<{ name: string }>('{"name":"Axiora UI"}'); // { name: "Axiora UI" }
fromJson("invalid json", { name: "fallback" }); // { name: "fallback" }

const [error, data] = tryFromJson<{ id: number }>('{"id":1}');
// error → null, data → { id: 1 }

isValidJson("{}"); // true
isValidJson("not json"); // false
```

---

### meta

**File:** [`src/meta/meta.utils.ts`](./src/meta/meta.utils.ts)

Utilities for working with a standard API response envelope. Designed around a `{ data, status, metaResponse }` shape that carries success/failure state and structured messages alongside the payload.

#### Types

```ts
type MetaInfo = {
  code: string;
  message: string;
};

type MetaResponse = {
  success: boolean;
  metaInfos: MetaInfo[];
};

type ApiResponse<T> = {
  data: T;
  status: number;
  metaResponse: MetaResponse;
};
```

#### Functions

| Function                 | Signature                                       | Description                                       |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------- |
| `isMetaInfo`             | `(value) → boolean`                             | Type guard for `MetaInfo`                         |
| `isMetaResponse`         | `(value) → boolean`                             | Type guard for `MetaResponse`                     |
| `isApiResponse<T>`       | `(value) → boolean`                             | Type guard for `ApiResponse<T>`                   |
| `createMetaInfo`         | `(code, message) → MetaInfo`                    | Construct a `MetaInfo` object                     |
| `createMetaResponse`     | `(success, metaInfos?) → MetaResponse`          | Construct a `MetaResponse` object                 |
| `createApiResponse<T>`   | `(data, status, metaResponse) → ApiResponse<T>` | Construct a full response                         |
| `successResponse<T>`     | `(data, status?, metaInfos?) → ApiResponse<T>`  | Build a successful response (default status: 200) |
| `errorResponse<T>`       | `(metaInfos, status?, data?) → ApiResponse<T>`  | Build a failed response (default status: 400)     |
| `isSuccess<T>`           | `(response) → boolean`                          | Check `metaResponse.success === true`             |
| `isFailure<T>`           | `(response) → boolean`                          | Inverse of `isSuccess`                            |
| `getMetaInfos<T>`        | `(response) → MetaInfo[]`                       | Extract all `MetaInfo` entries                    |
| `getMetaCodes<T>`        | `(response) → string[]`                         | Extract all codes                                 |
| `getMetaMessages<T>`     | `(response) → string[]`                         | Extract all messages                              |
| `findMetaInfoByCode<T>`  | `(response, code) → MetaInfo \| null`           | Find first entry by code                          |
| `hasMetaCode<T>`         | `(response, code) → boolean`                    | Check if code is present                          |
| `getFirstMetaInfo<T>`    | `(response) → MetaInfo \| null`                 | First `MetaInfo` entry                            |
| `getFirstMetaMessage<T>` | `(response) → string \| null`                   | First message string                              |
| `getResponseData<T>`     | `(response) → T \| null`                        | Data only if successful                           |
| `getResponseStatus<T>`   | `(response) → number \| null`                   | HTTP status code                                  |
| `formatMetaMessages<T>`  | `(response, separator?) → string`               | Join all messages into a string                   |

**Examples:**

```ts
import {
  successResponse,
  errorResponse,
  isSuccess,
  getResponseData,
} from "@axiora-ui/utils";

const ok = successResponse({ id: 1, name: "Axiora UI" });
isSuccess(ok); // true
getResponseData(ok); // { id: 1, name: "Axiora UI" }

const err = errorResponse(
  { code: "NOT_FOUND", message: "User not found" },
  404,
);
isSuccess(err); // false
getFirstMetaMessage(err); // "User not found"
hasMetaCode(err, "NOT_FOUND"); // true
```

---

### react

**File:** [`src/react/react.utils.ts`](./src/react/react.utils.ts)

Browser and async helpers commonly needed in React applications. All functions gracefully handle SSR environments where `window` / `document` / `navigator` are unavailable.

#### Functions

| Function                | Signature                                                 | Description                                                         |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| `memoize<T>`            | `(fn) → T`                                                | Cache function results by serialized arguments                      |
| `getErrorMessage`       | `(error: unknown) → string`                               | Extract a string message from any thrown value                      |
| `isPromise`             | `(value) → boolean`                                       | Check for a `.then` method                                          |
| `asyncHandler<Args, T>` | `(fn) → (...args) => Promise<[Error \| null, T \| null]>` | Wrap async function to return `[error, result]` instead of throwing |
| `copyToClipboard`       | `(text) → Promise<boolean>`                               | Write text to the system clipboard                                  |
| `downloadFile`          | `(blob, filename) → void`                                 | Trigger a browser file download                                     |
| `scrollToTop`           | `() → void`                                               | Smooth-scroll the page to the top                                   |
| `scrollIntoView`        | `(target, options?) → void`                               | Scroll an element or React ref into view                            |

**Examples:**

```ts
import {
  asyncHandler,
  copyToClipboard,
  memoize,
  scrollIntoView,
} from "@axiora-ui/utils";

// Wrap a fetch call — no try/catch at the call site
const fetchUser = asyncHandler(async (id: number) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

const [error, user] = await fetchUser(1);
if (error) console.error(error.message);

// Copy to clipboard
const success = await copyToClipboard("Hello, Axiora UI!");

// Memoize an expensive computation
const compute = memoize((n: number) => n * n * n);
compute(5); // 125 (cached on second call)

// Scroll a React ref into view
const ref = useRef<HTMLDivElement>(null);
scrollIntoView(ref, { behavior: "smooth", block: "center" });
```

---

### url

**File:** [`src/url/url.utils.ts`](./src/url/url.utils.ts)

URL parsing and query string manipulation. Uses the native `URL` and `URLSearchParams` APIs. When `url` is omitted, functions default to `window.location.href` in browsers.

#### Functions

| Function           | Signature                        | Description                                                           |
| ------------------ | -------------------------------- | --------------------------------------------------------------------- |
| `getQueryParam`    | `(name, url?) → string \| null`  | Read a query parameter value                                          |
| `setQueryParam`    | `(name, value, url?) → string`   | Add or update a query parameter; returns the new URL string           |
| `removeQueryParam` | `(name, url?) → string`          | Remove a query parameter; returns the new URL string                  |
| `buildQueryString` | `(params) → string`              | Build a `?key=value&...` string from an object (skips null/undefined) |
| `parseQueryString` | `(url) → Record<string, string>` | Parse all query parameters into a plain object                        |

**Examples:**

```ts
import {
  getQueryParam,
  setQueryParam,
  buildQueryString,
  parseQueryString,
} from "@axiora-ui/utils";

const url = "https://example.com/search?q=axiora-ui&page=1";

getQueryParam("q", url); // "axiora-ui"
getQueryParam("missing", url); // null

setQueryParam("page", "2", url);
// "https://example.com/search?q=axiora-ui&page=2"

removeQueryParam("page", url);
// "https://example.com/search?q=axiora-ui"

buildQueryString({ q: "axiora-ui", page: 1, debug: null });
// "?q=axiora-ui&page=1"   (null is skipped)

parseQueryString(url);
// { q: "axiora-ui", page: "1" }
```

---

## Null Safety Convention

Every function in this library follows the same null-safety contract:

- If the primary input is `null` or `undefined`, the function returns that same nullish value rather than throwing.
- For functions returning `boolean` (guards, checks), `null` / `undefined` inputs return `false`.
- This makes it safe to chain operations without defensive guards at every step:

```ts
const result = capitalize(trim(name)); // null if name is null — never throws
```

---

## Build

```bash
# From the package directory
pnpm build

# Generate API documentation
pnpm build:docs

# Watch mode for docs
pnpm build:docs:watch

# From the monorepo root
pnpm build --filter @axiora-ui/utils
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).

API documentation is generated with TypeDoc and outputs to `docs/`.

---

## Status summary

**100% complete** — 12 modules, 300+ Vitest tests, no Axiora UI package dependencies.

Suitable for use in apps alongside `@axiora-ui/ui-core`, custom hooks, form logic, API layers, and URL handling. The monorepo root runs `pnpm test` across all packages including utils.

---
