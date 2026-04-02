// tests/scss/functions/typography.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a function/map is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "functions/typography" as fn;
    @use "maps/typography" as typography-maps;
    @use "tokens/typography" as typography-tokens;
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
    @use "functions/typography" as fn;
    @use "maps/typography" as typography-maps;
    @use "tokens/typography" as typography-tokens;
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

describe("functions/typography", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $reg: fn.typography();
      @if meta.type-of($reg) != "map" { @error "Expected typography() to return a map"; }
      @if $reg != typography-maps.$typography { @error "Expected typography() to equal maps.$typography"; }

      $groups: fn.typography-groups();
      @if meta.type-of($groups) != "list" { @error "Expected typography-groups() to return a list"; }
      @if $groups != map.keys(typography-maps.$typography) {
        @error "Expected typography-groups() to equal map.keys($typography)";
      }

      // Must include canonical groups.
      @if list.index($groups, "font-families") == null { @error "Expected groups to include 'font-families'"; }
      @if list.index($groups, "font-weights") == null { @error "Expected groups to include 'font-weights'"; }
      @if list.index($groups, "font-sizes") == null { @error "Expected groups to include 'font-sizes'"; }
      @if list.index($groups, "formatting") == null { @error "Expected groups to include 'formatting'"; }
      @if list.index($groups, "spacing") == null { @error "Expected groups to include 'spacing'"; }
    `);
  });

  it("returns the keys for a specific group exactly", () => {
    expectSassAssertionsPass(`
      $keys: fn.typography-keys("font-sizes");
      $expected: map.keys(map.get(typography-maps.$typography, "font-sizes"));

      @if meta.type-of($keys) != "list" { @error "Expected typography-keys() to return a list"; }
      @if $keys != $expected { @error "Expected typography-keys('font-sizes') to match registry keys"; }

      @if list.index($keys, "base-font-size") == null { @error "Expected font-sizes to include 'base-font-size'"; }
      @if list.index($keys, "font-size-h1") == null { @error "Expected font-sizes to include 'font-size-h1'"; }
    `);
  });

  it("returns a full group map and matches the canonical registry", () => {
    expectSassAssertionsPass(`
      $g: fn.typography-group("font-weights");

      @if meta.type-of($g) != "map" { @error "Expected typography-group() to return a map"; }
      @if $g != map.get(typography-maps.$typography, "font-weights") {
        @error "Expected typography-group('font-weights') to equal registry entry";
      }
    `);
  });

  it("returns values by group + key and matches the canonical token values exactly", () => {
    expectSassAssertionsPass(`
      $h1: fn.typography-value("font-sizes", "font-size-h1");
      @if $h1 != typography-tokens.$font-size-h1 { @error "Expected typography-value(font-sizes,font-size-h1) to match tokens"; }

      $lh: fn.typography-value("formatting", "base-line-height");
      @if $lh != typography-tokens.$base-line-height { @error "Expected typography-value(formatting,base-line-height) to match tokens"; }

      // Alias should be exact.
      $h1b: fn.ty("font-sizes", "font-size-h1");
      @if $h1b != $h1 { @error "Expected ty() to be a strict alias of typography-value()"; }
    `);
  });

  it("exposes convenience accessors that resolve via the registry correctly", () => {
    expectSassAssertionsPass(`
      $ff: fn.font-family("base-font-family");
      @if $ff != typography-tokens.$base-font-family { @error "Expected font-family() to match tokens.$base-font-family"; }

      $fw: fn.font-weight("bold-font-weight");
      @if $fw != typography-tokens.$bold-font-weight { @error "Expected font-weight() to match tokens.$bold-font-weight"; }

      $fs: fn.font-size("font-size-h2");
      @if $fs != typography-tokens.$font-size-h2 { @error "Expected font-size() to match tokens.$font-size-h2"; }

      $fmt: fn.typography-format("heading-line-height");
      @if $fmt != typography-tokens.$heading-line-height { @error "Expected typography-format() to match tokens.$heading-line-height"; }

      $sp: fn.typography-spacing("heading-margin-bottom");
      @if $sp != typography-tokens.$heading-margin-bottom { @error "Expected typography-spacing() to match tokens.$heading-margin-bottom"; }
    `);
  });

  it("supports safe lookup via try-typography-group / try-typography-value (never throws on missing group/key)", () => {
    expectSassAssertionsPass(`
      $ok: fn.try-typography-value("font-sizes", "font-size-h3", $fallback: 999rem);
      @if $ok != typography-tokens.$font-size-h3 { @error "Expected try-typography-value(valid) to return actual"; }

      $missing-group: fn.try-typography-group("nope", $fallback: ("x": 1));
      @if $missing-group != ("x": 1) { @error "Expected try-typography-group(missing) to return fallback"; }

      $missing-key: fn.try-typography-value("font-sizes", "nope", $fallback: 123rem);
      @if $missing-key != 123rem { @error "Expected try-typography-value(missing key) to return fallback"; }

      // Default fallback is null.
      $null-fallback: fn.try-typography-value("font-sizes", "nope");
      @if $null-fallback != null { @error "Expected default fallback to be null"; }
    `);
  });

  it("supports existence checks (has-typography-group / has-typography-key)", () => {
    expectSassAssertionsPass(`
      @if fn.has-typography-group("font-sizes") != true { @error "Expected has-typography-group('font-sizes') true"; }
      @if fn.has-typography-group("nope") != false { @error "Expected has-typography-group('nope') false"; }

      @if fn.has-typography-key("font-sizes", "font-size-h1") != true { @error "Expected has-typography-key(font-sizes,font-size-h1) true"; }
      @if fn.has-typography-key("font-sizes", "nope") != false { @error "Expected has-typography-key(font-sizes,nope) false"; }

      // Missing group should short-circuit to false (no throw).
      @if fn.has-typography-key("nope", "anything") != false { @error "Expected has-typography-key(missing, key) false"; }
    `);
  });

  it("fails fast on invalid argument types", () => {
    expectSassAssertionsFail(
      `
      $_: fn.typography-group(123);
      `,
      "Expected $group to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.typography-value("font-sizes", 123);
      `,
      "Expected $key to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-typography-value(true, "font-size-h1", $fallback: 1rem);
      `,
      "Expected $group to be type 'string'"
    );
  });

  it("fails fast on empty/whitespace strings (guardrails against confusing lookups)", () => {
    expectSassAssertionsFail(
      `
      $_: fn.typography-group("");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.typography-keys("   ");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.typography-value("font-sizes", "");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-typography-value("", "font-size-h1", $fallback: 1rem);
      `,
      "non-empty string"
    );
  });

  it("throws actionable errors for missing groups/keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.typography-group("does-not-exist");
      `,
      "Missing key 'does-not-exist' in $typography"
    );

    expectSassAssertionsFail(
      `
      $_: fn.typography-value("font-sizes", "does-not-exist");
      `,
      "Missing key 'does-not-exist' in typography group 'font-sizes'"
    );
  });
});
