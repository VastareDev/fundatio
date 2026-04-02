// tests/scss/functions/options.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a function/value is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid serialization quirks and to validate
 * true compile-time behaviour.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "functions/options" as fn;
    @use "maps/options" as option-maps;
    @use "tokens/options" as option-tokens;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_function_test__ { content: "ok"; }
      `,
      header
    );
  }).not.toThrow();
}

/**
 * Compiles a Sass snippet that is expected to throw via @error.
 *
 * We match a message fragment so tests stay stable while still validating
 * failure mode correctness.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsFail(snippet: string, messageIncludes: string): void {
  const header = `
    @use "functions/options" as fn;
    @use "maps/options" as option-maps;
    @use "tokens/options" as option-tokens;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      .__sol_function_test__ { content: "ok"; }
      `,
      header
    );
  }).toThrow(messageIncludes);
}

describe("functions/options", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $keys: fn.option-keys();

      @if meta.type-of($keys) != "list" {
        @error "Expected option-keys() to return a list";
      }

      // Must match authoritative registry keys exactly.
      @if $keys != map.keys(option-maps.$options) {
        @error "Expected option-keys() to equal map.keys($options)";
      }

      // Sanity check: canonical keys exist.
      @if list.index($keys, "prefix") == null { @error "Expected option-keys() to include 'prefix'"; }
      @if list.index($keys, "dark-mode") == null { @error "Expected option-keys() to include 'dark-mode'"; }
      @if list.index($keys, "font-path") == null { @error "Expected option-keys() to include 'font-path'"; }
    `);
  });

  it("returns the full options registry and matches maps exactly", () => {
    expectSassAssertionsPass(`
      $m: fn.options();

      @if meta.type-of($m) != "map" {
        @error "Expected options() to return a map";
      }

      @if $m != option-maps.$options {
        @error "Expected options() to equal maps.$options";
      }
    `);
  });

  it("returns option values by key and matches canonical token values exactly", () => {
    expectSassAssertionsPass(`
      $prefix: fn.option("prefix");
      $dark: fn.option("dark-mode");
      $path: fn.option("font-path");

      @if meta.type-of($prefix) != "string" { @error "Expected option('prefix') to be a string"; }
      @if meta.type-of($dark) != "bool" { @error "Expected option('dark-mode') to be a bool"; }
      @if meta.type-of($path) != "string" { @error "Expected option('font-path') to be a string"; }

      // Exact lock to canonical token layer (via maps).
      @if $prefix != option-tokens.$vs-prefix {
        @error "Expected option('prefix') to match tokens.$vs-prefix";
      }

      @if $dark != option-tokens.$dark-mode {
        @error "Expected option('dark-mode') to match tokens.$dark-mode";
      }

      @if $path != option-tokens.$font-path {
        @error "Expected option('font-path') to match tokens.$font-path";
      }
    `);
  });

  it("supports the convenience alias o() and it is a strict alias of option()", () => {
    expectSassAssertionsPass(`
      $a: fn.option("prefix");
      $b: fn.o("prefix");

      @if $a != $b {
        @error "Expected o() to be a strict alias of option()";
      }
    `);
  });

  it("supports existence checks (has-option)", () => {
    expectSassAssertionsPass(`
      @if fn.has-option("prefix") != true { @error "Expected has-option('prefix') to be true"; }
      @if fn.has-option("dark-mode") != true { @error "Expected has-option('dark-mode') to be true"; }
      @if fn.has-option("font-path") != true { @error "Expected has-option('font-path') to be true"; }

      @if fn.has-option("does-not-exist") != false { @error "Expected has-option(missing) to be false"; }
    `);
  });

  it("supports safe lookup via try-option (never throws on missing key)", () => {
    expectSassAssertionsPass(`
      // Valid key returns value.
      $ok: fn.try-option("prefix", $fallback: "nope");
      @if $ok != option-tokens.$vs-prefix {
        @error "Expected try-option(valid) to return actual value";
      }

      // Missing key returns fallback.
      $missing: fn.try-option("does-not-exist", $fallback: "fallback-value");
      @if $missing != "fallback-value" {
        @error "Expected try-option(missing) to return fallback";
      }

      // Default fallback is null.
      $null-fallback: fn.try-option("does-not-exist");
      @if $null-fallback != null {
        @error "Expected try-option() default fallback to be null";
      }
    `);
  });

  it("fails fast on invalid argument types", () => {
    expectSassAssertionsFail(
      `
      $_: fn.option(123);
      `,
      "Expected $key to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-option(true, $fallback: "x");
      `,
      "Expected $key to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-option(999);
      `,
      "Expected $key to be type 'string'"
    );
  });

  it("fails fast on empty/whitespace strings (guardrails against confusing lookups)", () => {
    expectSassAssertionsFail(
      `
      $_: fn.option("");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.option("   ");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-option("", $fallback: "x");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-option("   ");
      `,
      "non-empty string"
    );
  });

  it("throws actionable errors for missing keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.option("does-not-exist");
      `,
      "Missing key 'does-not-exist' in $options"
    );
  });

  it("registry key order is stable and matches the map (consumer-facing API stability)", () => {
    expectSassAssertionsPass(`
      $expected: map.keys(option-maps.$options);
      $actual: fn.option-keys();

      @if $actual != $expected {
        @error "Expected option-keys() to preserve registry key order";
      }
    `);
  });
});
