import { EMPTY_STRING, isNullOrUndefined } from "../common/common.utils";

/**
 * Returns `true` when the value is `null`, `undefined`, or an empty string (`""`).
 * Whitespace-only strings such as `"   "` are not considered empty.
 *
 * @param value - String value to evaluate.
 * @returns `true` for nullish or empty string values.
 *
 * @example
 * ```ts
 * isEmptyString(null);   // true
 * isEmptyString("");     // true
 * isEmptyString("   ");  // false
 * isEmptyString("Axiora UI"); // false
 * ```
 */
const isEmptyString = (value: string | null | undefined): boolean =>
  isNullOrUndefined(value) || value === EMPTY_STRING;

/**
 * Returns `true` when the value is a non-empty string.
 * Inverse of {@link isEmptyString}.
 *
 * @param value - String value to evaluate.
 * @returns `true` for any value that is not nullish or empty.
 *
 * @example
 * ```ts
 * isNotEmptyString(null);   // false
 * isNotEmptyString("");     // false
 * isNotEmptyString("   ");  // true
 * isNotEmptyString("Axiora UI"); // true
 * ```
 */
const isNotEmptyString = (value: string | null | undefined): boolean =>
  !isEmptyString(value);

/**
 * Capitalizes the first character of a single word.
 * Returns nullish values unchanged.
 *
 * @param value - Word to capitalize.
 * @returns The capitalized word, or the original nullish value.
 *
 * @example
 * ```ts
 * capitalizeWord("axiora-ui"); // "Axiora UI"
 * capitalizeWord("a");    // "A"
 * capitalizeWord(null);   // null
 * ```
 */
const capitalizeWord = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value.length === 1
      ? value.toUpperCase()
      : value[0].toUpperCase() + value?.slice(1);
};

/**
 * Capitalizes the first character of each word in a string.
 * Words are split using the provided separator (default: space).
 *
 * @param value - String to capitalize.
 * @param separator - Delimiter used to split words. Defaults to `" "`.
 * @returns The capitalized string, or the original nullish value.
 *
 * @example
 * ```ts
 * capitalize("hello world");         // "Hello World"
 * capitalize("hello-world", "-");    // "Hello-World"
 * capitalize(null);                  // null
 * ```
 */
const capitalize = (
  value: string | null | undefined,
  separator = " ",
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value
        .split(separator)
        .map((word) => capitalizeWord(word))
        .join(separator);
};

/**
 * Converts a string to camelCase.
 * Splits on spaces, underscores, and hyphens.
 *
 * @param value - String to convert.
 * @returns The camelCase string, or the original nullish value.
 *
 * @example
 * ```ts
 * camelCase("hello world");  // "helloWorld"
 * camelCase("hello_world");  // "helloWorld"
 * camelCase("hello-world");  // "helloWorld"
 * camelCase(null);           // null
 * ```
 */
const camelCase = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value
        .toLowerCase()
        .split(/[\s_-]+/)
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
};

/**
 * Converts a string to snake_case by replacing a separator with underscores.
 *
 * @param value - String to convert.
 * @param separator - Delimiter used to split segments. Defaults to `" "`.
 * @returns The snake_case string, or the original nullish value.
 *
 * @example
 * ```ts
 * snakeCase("hello world"); // "hello_world"
 * snakeCase(null);          // null
 * ```
 */
const snakeCase = (
  value: string | null | undefined,
  separator = " ",
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.split(separator).join("_");
};

/**
 * Converts a string to kebab-case by replacing a separator with hyphens.
 *
 * @param value - String to convert.
 * @param separator - Delimiter used to split segments. Defaults to `""`.
 * @returns The kebab-case string, or the original nullish value.
 *
 * @example
 * ```ts
 * kebabCase("hello world", " "); // "hello-world"
 * kebabCase("hello");            // "h-e-l-l-o"
 * kebabCase(null);               // null
 * ```
 */
const kebabCase = (
  value: string | null | undefined,
  separator = "",
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.split(separator).join("-");
};

/**
 * Converts a string to PascalCase.
 * Splits on spaces, underscores, and hyphens and capitalizes each segment.
 *
 * @param value - String to convert.
 * @returns The PascalCase string, or the original nullish value.
 *
 * @example
 * ```ts
 * pascalCase("hello world"); // "HelloWorld"
 * pascalCase("hello_world"); // "HelloWorld"
 * pascalCase(null);          // null
 * ```
 */
const pascalCase = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value
        .toLowerCase()
        .split(/[\s_-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
};

/**
 * Converts a string to Title Case.
 * Lowercases the input then capitalizes the first letter of each word boundary.
 *
 * @param value - String to convert.
 * @returns The title-cased string, or the original nullish value.
 *
 * @example
 * ```ts
 * titleCase("hello world"); // "Hello World"
 * titleCase("HELLO WORLD"); // "Hello World"
 * titleCase(null);          // null
 * ```
 */
const titleCase = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Trims leading and trailing whitespace from a string.
 *
 * @param value - String to trim.
 * @returns The trimmed string, or the original nullish value.
 *
 * @example
 * ```ts
 * trim("  Axiora UI  "); // "Axiora UI"
 * trim(null);       // null
 * ```
 */
const trim = (value: string | null | undefined): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.trim();
};

/**
 * Truncates a string to a maximum length and appends an ellipsis (`"..."`).
 *
 * @param value - String to truncate.
 * @param maxLength - Maximum number of characters to keep before the ellipsis. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @returns The truncated string with ellipsis, or the original nullish value.
 *
 * @example
 * ```ts
 * truncate("hello world", 5); // "hello..."
 * truncate("hello");          // "hello..."
 * truncate(null);             // null
 * ```
 */
const truncate = (
  value: string | null | undefined,
  maxLength: number = Number.MAX_SAFE_INTEGER,
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.slice(0, maxLength) + "...";
};

/**
 * Checks whether a string contains a search substring.
 *
 * @param value - String to search within.
 * @param search - Substring to find. Defaults to `""`.
 * @returns `true` if the substring is found, `false` for nullish values or no match.
 *
 * @example
 * ```ts
 * contains("Axiora UI", "UI"); // true
 * contains("Axiora UI", "React"); // false
 * contains(null, "UI");      // false
 * ```
 */
const contains = (value: string | null | undefined, search = ""): boolean => {
  return isNullOrUndefined(value) ? false : value.includes(search);
};

/**
 * Checks whether a string starts with the given prefix.
 *
 * @param value - String to evaluate.
 * @param prefix - Prefix to match. Defaults to `""`.
 * @returns `true` if the string starts with the prefix, `false` for nullish values or no match.
 *
 * @example
 * ```ts
 * startsWith("Axiora UI", "Axiora UI"); // true
 * startsWith("Axiora UI", "UI");   // false
 * startsWith(null, "Axiora UI");      // false
 * ```
 */
const startsWith = (value: string | null | undefined, prefix = ""): boolean => {
  return isNullOrUndefined(value) ? false : value.startsWith(prefix);
};

/**
 * Checks whether a string ends with the given suffix.
 *
 * @param value - String to evaluate.
 * @param suffix - Suffix to match. Defaults to `""`.
 * @returns `true` if the string ends with the suffix, `false` for nullish values or no match.
 *
 * @example
 * ```ts
 * endsWith("Axiora UI", "UI");   // true
 * endsWith("Axiora UI", "Axiora UI"); // false
 * endsWith(null, "UI");        // false
 * ```
 */
const endsWith = (value: string | null | undefined, suffix = ""): boolean => {
  return isNullOrUndefined(value) ? false : value.endsWith(suffix);
};

/**
 * Replaces all occurrences of a search value in a string.
 *
 * @param value - String to transform.
 * @param regex - Search string or pattern to replace. Defaults to `""`.
 * @param replacement - Replacement text. Defaults to `""`.
 * @returns The transformed string, or the original nullish value.
 *
 * @example
 * ```ts
 * replaceAll("foo bar foo", "foo", "baz"); // "baz bar baz"
 * replaceAll(null, "foo", "baz");          // null
 * ```
 */
const replaceAll = (
  value: string | null | undefined,
  regex = "",
  replacement = "",
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value.replaceAll(regex, replacement);
};

/**
 * Removes whitespace from a string, optionally inserting a replacement between segments.
 *
 * @param value - String to transform.
 * @param appender - Replacement inserted where whitespace was removed. Defaults to `""`.
 * @returns The transformed string, or the original nullish value.
 *
 * @example
 * ```ts
 * removeSpaces("hello world");       // "helloworld"
 * removeSpaces("hello world", "-");  // "hello-world"
 * removeSpaces(null);                // null
 * ```
 */
const removeSpaces = (
  value: string | null | undefined,
  appender = "",
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.replace(/\s/g, appender);
};

/**
 * Reverses the characters in a string.
 *
 * @param value - String to reverse.
 * @returns The reversed string, or the original nullish value.
 *
 * @example
 * ```ts
 * reverseString("Axiora UI"); // "noxA"
 * reverseString(null);   // null
 * ```
 */
const reverseString = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value.split("").reverse().join("");
};

/**
 * Masks a string by replacing leading characters with a mask character,
 * leaving a configurable number of trailing characters visible.
 *
 * @param value - String to mask.
 * @param visibleChars - Number of trailing characters to leave unmasked. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @param maskCharacter - Character used for masking. Defaults to `"*"`.
 * @returns The masked string, or the original nullish value when masking is not needed.
 *
 * @example
 * ```ts
 * maskString("1234567890", 4);       // "******7890"
 * maskString("1234567890", 4, "#");  // "######7890"
 * maskString("1234", 4);             // "1234"
 * maskString(null);                  // null
 * ```
 */
const maskString = (
  value: string | null | undefined,
  visibleChars: number = Number.MAX_SAFE_INTEGER,
  maskCharacter = "*",
): string | null | undefined => {
  if (isNullOrUndefined(value) || visibleChars >= value.length) return value;

  return (
    maskCharacter.repeat(value.length - visibleChars) +
    value.slice(-visibleChars)
  );
};

/**
 * Extracts the uppercase initial from the first character of a string.
 *
 * @param value - String to extract from.
 * @returns The uppercase first character, or the original nullish value.
 *
 * @example
 * ```ts
 * extractInitials("John Doe"); // "J"
 * extractInitials("axiora-ui");     // "A"
 * extractInitials(null);         // null
 * ```
 */
const extractInitials = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value) ? value : value[0].toUpperCase();
};

/**
 * Converts a string into a URL-friendly slug.
 * Lowercases, trims, removes special characters, and replaces spaces/underscores with hyphens.
 *
 * @param value - String to slugify.
 * @returns The slug string, or the original nullish value.
 *
 * @example
 * ```ts
 * slugify("Hello World!");  // "hello-world"
 * slugify("  Foo_Bar  ");   // "foo-bar"
 * slugify(null);            // null
 * ```
 */
const slugify = (
  value: string | null | undefined,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
        .replace(/-+/g, "-"); // Collapse multiple hyphens
};

/**
 * Replaces `{key}` placeholders in a template string with values from a record.
 * Missing keys are replaced with an empty string.
 *
 * @param template - Template string containing `{key}` placeholders.
 * @param values - Record of replacement values keyed by placeholder name.
 * @param regex - Pattern used to match placeholders. Defaults to `/\{(\w+)\}/g`.
 * @returns The formatted string, or the original nullish template value.
 *
 * @example
 * ```ts
 * formatTemplate("Hello {name}!", { name: "Axiora UI" }); // "Hello Axiora UI!"
 * formatTemplate("Hello {name}!", {});                 // "Hello !"
 * formatTemplate(null, { name: "Axiora UI" });              // null
 * ```
 */
const formatTemplate = (
  template: string | null | undefined,
  values: Record<string, unknown>,
  regex = /\{(\w+)\}/g,
): string | null | undefined => {
  return isNullOrUndefined(template)
    ? template
    : template.replace(regex, (_, key) => String(values[key] ?? ""));
};

export {
  isEmptyString,
  isNotEmptyString,
  capitalizeWord,
  capitalize,
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
  titleCase,
  trim,
  truncate,
  contains,
  startsWith,
  endsWith,
  replaceAll,
  removeSpaces,
  reverseString,
  maskString,
  extractInitials,
  slugify,
  formatTemplate,
};
