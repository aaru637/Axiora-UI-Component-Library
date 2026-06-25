import { describe, expect, it } from "vitest";
import { EMPTY_STRING } from "../common/common.utils";
import {
  camelCase,
  capitalize,
  capitalizeWord,
  contains,
  endsWith,
  extractInitials,
  formatTemplate,
  isEmptyString,
  isNotEmptyString,
  kebabCase,
  maskString,
  pascalCase,
  removeSpaces,
  replaceAll,
  reverseString,
  slugify,
  snakeCase,
  startsWith,
  titleCase,
  trim,
  truncate,
} from "./string.utils";

describe("String Utils", () => {
  /**
   * isEmptyString
   */
  it("isEmptyString returns true when value is null", () => {
    expect(isEmptyString(null)).toBe(true);
  });

  it("isEmptyString returns true when value is undefined", () => {
    expect(isEmptyString(undefined)).toBe(true);
  });

  it("isEmptyString returns true when value equals EMPTY_STRING", () => {
    expect(isEmptyString(EMPTY_STRING)).toBe(true);
    expect(isEmptyString("")).toBe(true);
  });

  it("isEmptyString returns false for whitespace only strings", () => {
    expect(isEmptyString(" ")).toBe(false);
    expect(isEmptyString("   ")).toBe(false);
    expect(isEmptyString("\t")).toBe(false);
    expect(isEmptyString("\n")).toBe(false);
  });

  it("isEmptyString returns false for non empty strings", () => {
    expect(isEmptyString("Axiora UI")).toBe(false);
    expect(isEmptyString(" Axiora UI ")).toBe(false);
    expect(isEmptyString("Axiora UI Component Library")).toBe(false);
  });

  /**
   * isNotEmptyString
   */
  it("isNotEmptyString returns false when value is null", () => {
    expect(isNotEmptyString(null)).toBe(false);
  });

  it("isNotEmptyString returns false when value is undefined", () => {
    expect(isNotEmptyString(undefined)).toBe(false);
  });

  it("isNotEmptyString returns false when value equals EMPTY_STRING", () => {
    expect(isNotEmptyString(EMPTY_STRING)).toBe(false);
    expect(isNotEmptyString("")).toBe(false);
  });

  it("isNotEmptyString returns true for whitespace only strings", () => {
    expect(isNotEmptyString(" ")).toBe(true);
    expect(isNotEmptyString("   ")).toBe(true);
    expect(isNotEmptyString("\t")).toBe(true);
    expect(isNotEmptyString("\n")).toBe(true);
  });

  it("isNotEmptyString returns true for non empty strings", () => {
    expect(isNotEmptyString("Axiora UI")).toBe(true);
    expect(isNotEmptyString(" Axiora UI ")).toBe(true);
    expect(isNotEmptyString("Axiora UI Component Library")).toBe(true);
  });

  /**
   * capitalizeWord
   */
  it("capitalizeWord returns nullish values unchanged", () => {
    expect(capitalizeWord(null)).toBe(null);
    expect(capitalizeWord(undefined)).toBe(undefined);
  });

  it("capitalizeWord uppercases a single character", () => {
    expect(capitalizeWord("a")).toBe("A");
    expect(capitalizeWord("z")).toBe("Z");
  });

  it("capitalizeWord capitalizes the first character of a word", () => {
    expect(capitalizeWord("axiora-ui")).toBe("Axiora-ui");
    expect(capitalizeWord("HELLO")).toBe("HELLO");
  });

  it("capitalizeWord throws when value is an empty string", () => {
    expect(() => capitalizeWord("")).toThrow();
  });

  /**
   * capitalize
   */
  it("capitalize returns nullish values unchanged", () => {
    expect(capitalize(null)).toBe(null);
    expect(capitalize(undefined)).toBe(undefined);
  });

  it("capitalize capitalizes each word separated by spaces", () => {
    expect(capitalize("hello world")).toBe("Hello World");
    expect(capitalize("axiora-ui ui library")).toBe("Axiora-ui Ui Library");
  });

  it("capitalize uses a custom separator", () => {
    expect(capitalize("hello-world", "-")).toBe("Hello-World");
    expect(capitalize("hello_world", "_")).toBe("Hello_World");
  });

  /**
   * camelCase
   */
  it("camelCase returns nullish values unchanged", () => {
    expect(camelCase(null)).toBe(null);
    expect(camelCase(undefined)).toBe(undefined);
  });

  it("camelCase converts space separated words", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("axiora-ui ui library")).toBe("axioraUiUiLibrary");
  });

  it("camelCase converts underscore and hyphen separated words", () => {
    expect(camelCase("hello_world")).toBe("helloWorld");
    expect(camelCase("hello-world")).toBe("helloWorld");
    expect(camelCase("hello_world-test")).toBe("helloWorldTest");
  });

  it("camelCase lowercases the input before converting", () => {
    expect(camelCase("HELLO WORLD")).toBe("helloWorld");
  });

  /**
   * snakeCase
   */
  it("snakeCase returns nullish values unchanged", () => {
    expect(snakeCase(null)).toBe(null);
    expect(snakeCase(undefined)).toBe(undefined);
  });

  it("snakeCase replaces spaces with underscores by default", () => {
    expect(snakeCase("hello world")).toBe("hello_world");
    expect(snakeCase("axiora-ui ui library")).toBe("axiora-ui_ui_library");
  });

  it("snakeCase uses a custom separator", () => {
    expect(snakeCase("hello-world", "-")).toBe("hello_world");
  });

  /**
   * kebabCase
   */
  it("kebabCase returns nullish values unchanged", () => {
    expect(kebabCase(null)).toBe(null);
    expect(kebabCase(undefined)).toBe(undefined);
  });

  it("kebabCase joins characters with hyphens when separator is empty", () => {
    expect(kebabCase("hello")).toBe("h-e-l-l-o");
  });

  it("kebabCase replaces a custom separator with hyphens", () => {
    expect(kebabCase("hello world", " ")).toBe("hello-world");
    expect(kebabCase("hello_world", "_")).toBe("hello-world");
  });

  /**
   * pascalCase
   */
  it("pascalCase returns nullish values unchanged", () => {
    expect(pascalCase(null)).toBe(null);
    expect(pascalCase(undefined)).toBe(undefined);
  });

  it("pascalCase converts space separated words", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("axiora-ui ui")).toBe("AxioraUiUi");
  });

  it("pascalCase converts underscore and hyphen separated words", () => {
    expect(pascalCase("hello_world")).toBe("HelloWorld");
    expect(pascalCase("hello-world")).toBe("HelloWorld");
  });

  it("pascalCase lowercases the input before converting", () => {
    expect(pascalCase("HELLO WORLD")).toBe("HelloWorld");
  });

  /**
   * titleCase
   */
  it("titleCase returns nullish values unchanged", () => {
    expect(titleCase(null)).toBe(null);
    expect(titleCase(undefined)).toBe(undefined);
  });

  it("titleCase capitalizes the first letter of each word", () => {
    expect(titleCase("hello world")).toBe("Hello World");
    expect(titleCase("axiora-ui ui library")).toBe("Axiora-Ui Ui Library");
  });

  it("titleCase lowercases uppercase input before title casing", () => {
    expect(titleCase("HELLO WORLD")).toBe("Hello World");
  });

  /**
   * trim
   */
  it("trim returns nullish values unchanged", () => {
    expect(trim(null)).toBe(null);
    expect(trim(undefined)).toBe(undefined);
  });

  it("trim removes leading and trailing whitespace", () => {
    expect(trim("  Axiora UI  ")).toBe("Axiora UI");
    expect(trim("\tAxiora UI\n")).toBe("Axiora UI");
    expect(trim("Axiora UI")).toBe("Axiora UI");
  });

  /**
   * truncate
   */
  it("truncate returns nullish values unchanged", () => {
    expect(truncate(null)).toBe(null);
    expect(truncate(undefined)).toBe(undefined);
  });

  it("truncate shortens a string to maxLength and appends ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
    expect(truncate("Axiora UI", 2)).toBe("Ax...");
  });

  it("truncate appends ellipsis even when the string fits within maxLength", () => {
    expect(truncate("hello")).toBe("hello...");
    expect(truncate("hi", 10)).toBe("hi...");
  });

  /**
   * contains
   */
  it("contains returns false for nullish values", () => {
    expect(contains(null)).toBe(false);
    expect(contains(undefined)).toBe(false);
  });

  it("contains returns true when the search substring is found", () => {
    expect(contains("Axiora UI", "UI")).toBe(true);
    expect(contains("Axiora UI", "Axiora UI")).toBe(true);
  });

  it("contains returns false when the search substring is not found", () => {
    expect(contains("Axiora UI", "React")).toBe(false);
  });

  it("contains returns true for an empty search string on non nullish values", () => {
    expect(contains("Axiora UI", "")).toBe(true);
  });

  /**
   * startsWith
   */
  it("startsWith returns false for nullish values", () => {
    expect(startsWith(null)).toBe(false);
    expect(startsWith(undefined)).toBe(false);
  });

  it("startsWith returns true when the prefix matches", () => {
    expect(startsWith("Axiora UI", "Axiora UI")).toBe(true);
  });

  it("startsWith returns false when the prefix does not match", () => {
    expect(startsWith("Axiora UI", "UI")).toBe(false);
  });

  it("startsWith returns true for an empty prefix on non nullish values", () => {
    expect(startsWith("Axiora UI", "")).toBe(true);
  });

  /**
   * endsWith
   */
  it("endsWith returns false for nullish values", () => {
    expect(endsWith(null)).toBe(false);
    expect(endsWith(undefined)).toBe(false);
  });

  it("endsWith returns true when the suffix matches", () => {
    expect(endsWith("Axiora UI", "UI")).toBe(true);
  });

  it("endsWith returns false when the suffix does not match", () => {
    expect(endsWith("Axiora UI", "Axiora")).toBe(false);
  });

  it("endsWith returns true for an empty suffix on non nullish values", () => {
    expect(endsWith("Axiora UI", "")).toBe(true);
  });

  /**
   * replaceAll
   */
  it("replaceAll returns nullish values unchanged", () => {
    expect(replaceAll(null, "foo", "bar")).toBe(null);
    expect(replaceAll(undefined, "foo", "bar")).toBe(undefined);
  });

  it("replaceAll replaces all occurrences of the search value", () => {
    expect(replaceAll("foo bar foo", "foo", "baz")).toBe("baz bar baz");
    expect(replaceAll("aaa", "a", "b")).toBe("bbb");
  });

  it("replaceAll uses empty replacement by default", () => {
    expect(replaceAll("hello world", "o")).toBe("hell wrld");
  });

  /**
   * removeSpaces
   */
  it("removeSpaces returns nullish values unchanged", () => {
    expect(removeSpaces(null)).toBe(null);
    expect(removeSpaces(undefined)).toBe(undefined);
  });

  it("removeSpaces removes whitespace by default", () => {
    expect(removeSpaces("hello world")).toBe("helloworld");
    expect(removeSpaces("a b c")).toBe("abc");
  });

  it("removeSpaces replaces whitespace with a custom appender", () => {
    expect(removeSpaces("hello world", "-")).toBe("hello-world");
    expect(removeSpaces("a b c", "_")).toBe("a_b_c");
  });

  /**
   * reverseString
   */
  it("reverseString returns nullish values unchanged", () => {
    expect(reverseString(null)).toBe(null);
    expect(reverseString(undefined)).toBe(undefined);
  });

  it("reverseString reverses the character order", () => {
    expect(reverseString("Axiora UI")).toBe("IU aroixA");
    expect(reverseString("12345")).toBe("54321");
  });

  it("reverseString returns an empty string for empty input", () => {
    expect(reverseString("")).toBe("");
  });

  /**
   * maskString
   */
  it("maskString returns nullish values unchanged", () => {
    expect(maskString(null)).toBe(null);
    expect(maskString(undefined)).toBe(undefined);
  });

  it("maskString masks leading characters and leaves trailing characters visible", () => {
    expect(maskString("1234567890", 4)).toBe("******7890");
    expect(maskString("1234567890", 2)).toBe("********90");
  });

  it("maskString uses a custom mask character", () => {
    expect(maskString("1234567890", 4, "#")).toBe("######7890");
  });

  it("maskString returns the original value when visibleChars covers the full length", () => {
    expect(maskString("1234", 4)).toBe("1234");
    expect(maskString("1234", 10)).toBe("1234");
  });

  /**
   * extractInitials
   */
  it("extractInitials returns nullish values unchanged", () => {
    expect(extractInitials(null)).toBe(null);
    expect(extractInitials(undefined)).toBe(undefined);
  });

  it("extractInitials returns the uppercase first character", () => {
    expect(extractInitials("John Doe")).toBe("J");
    expect(extractInitials("axiora-ui")).toBe("A");
  });

  /**
   * slugify
   */
  it("slugify returns nullish values unchanged", () => {
    expect(slugify(null)).toBe(null);
    expect(slugify(undefined)).toBe(undefined);
  });

  it("slugify converts a string to a lowercase hyphenated slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Axiora UI Library")).toBe("axiora-ui-library");
  });

  it("slugify trims whitespace and normalizes underscores", () => {
    expect(slugify("  Foo_Bar  ")).toBe("foo-bar");
  });

  it("slugify collapses consecutive hyphens", () => {
    expect(slugify("hello---world")).toBe("hello-world");
    expect(slugify("foo  bar")).toBe("foo-bar");
  });

  /**
   * formatTemplate
   */
  it("formatTemplate returns nullish templates unchanged", () => {
    expect(formatTemplate(null, { name: "Axiora UI" })).toBe(null);
    expect(formatTemplate(undefined, { name: "Axiora UI" })).toBe(undefined);
  });

  it("formatTemplate replaces placeholders with matching values", () => {
    expect(formatTemplate("Hello {name}!", { name: "Axiora UI" })).toBe(
      "Hello Axiora UI!",
    );
    expect(
      formatTemplate("{greeting} {name}", {
        greeting: "Hi",
        name: "Axiora UI",
      }),
    ).toBe("Hi Axiora UI");
  });

  it("formatTemplate replaces missing keys with an empty string", () => {
    expect(formatTemplate("Hello {name}!", {})).toBe("Hello !");
  });

  it("formatTemplate coerces non string values to strings", () => {
    expect(formatTemplate("Count: {count}", { count: 42 })).toBe("Count: 42");
  });

  it("formatTemplate supports a custom placeholder regex", () => {
    expect(
      formatTemplate(
        "Hello {{name}}!",
        { name: "Axiora UI" },
        /\{\{(\w+)\}\}/g,
      ),
    ).toBe("Hello Axiora UI!");
  });
});
