// tests/scss/functions/theme.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a function/registry entry is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "functions/theme" as fn;
    @use "maps/theme" as theme-maps;
    @use "tokens/theme" as theme-tokens;
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
    @use "functions/theme" as fn;
    @use "maps/theme" as theme-maps;
    @use "tokens/theme" as theme-tokens;
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

describe("functions/theme", () => {
  it("exposes registry accessors and returns correct base types", () => {
    expectSassAssertionsPass(`
      $t: fn.theme();
      @if meta.type-of($t) != "map" {
        @error "Expected theme() to return a map";
      }

      $groups: fn.theme-groups();
      @if meta.type-of($groups) != "list" {
        @error "Expected theme-groups() to return a list";
      }

      // Must match authoritative registry group keys exactly.
      @if $groups != map.keys(theme-maps.$theme) {
        @error "Expected theme-groups() to equal map.keys($theme)";
      }

      // Sanity: should include canonical groups.
      @if list.index($groups, "feature-flags") == null { @error "Expected theme-groups() to include 'feature-flags'"; }
      @if list.index($groups, "namespace") == null { @error "Expected theme-groups() to include 'namespace'"; }
      @if list.index($groups, "font-families") == null { @error "Expected theme-groups() to include 'font-families'"; }
      @if list.index($groups, "font-sources") == null { @error "Expected theme-groups() to include 'font-sources'"; }
    `);
  });

  it("returns the keys for a specific group exactly", () => {
    expectSassAssertionsPass(`
      $keys: fn.theme-keys("namespace");
      $expected: map.keys(map.get(theme-maps.$theme, "namespace"));

      @if meta.type-of($keys) != "list" {
        @error "Expected theme-keys() to return a list";
      }

      @if $keys != $expected {
        @error "Expected theme-keys('namespace') to match registry group keys";
      }

      @if list.index($keys, "theme-prefix") == null {
        @error "Expected theme-keys('namespace') to include 'theme-prefix'";
      }
    `);
  });

  it("returns a full group map and it matches the canonical registry", () => {
    expectSassAssertionsPass(`
      $g: fn.theme-group("base-colours");

      @if meta.type-of($g) != "map" {
        @error "Expected theme-group('base-colours') to return a map";
      }

      @if $g != map.get(theme-maps.$theme, "base-colours") {
        @error "Expected theme-group('base-colours') to equal registry entry";
      }
    `);
  });

  it("returns theme values by group + key and matches the canonical token values", () => {
    expectSassAssertionsPass(`
      // Strings
      $prefix1: fn.theme-value("namespace", "theme-prefix");
      $prefix2: fn.t("namespace", "theme-prefix");

      @if meta.type-of($prefix1) != "string" { @error "Expected theme-prefix to be a string"; }
      @if $prefix2 != $prefix1 { @error "Expected t() to be a strict alias of theme-value()"; }
      @if $prefix1 != theme-tokens.$theme-prefix {
        @error "Expected theme-value(namespace, theme-prefix) to match tokens.$theme-prefix";
      }

      // Booleans
      $dark: fn.theme-value("feature-flags", "theme-dark-mode");
      @if meta.type-of($dark) != "bool" { @error "Expected dark-mode to be a bool"; }
      @if $dark != theme-tokens.$theme-dark-mode {
        @error "Expected theme-value(feature-flags, theme-dark-mode) to match tokens.$theme-dark-mode";
      }

      // Colors
      $bg: fn.theme-value("base-colours", "body-bg-color");
      @if meta.type-of($bg) != "color" { @error "Expected body-bg-color to be a color"; }
      @if $bg != theme-tokens.$body-bg-color {
        @error "Expected theme-value(base-colours, body-bg-color) to match tokens.$body-bg-color";
      }
    `);
  });

  it("exposes nested groups without transforming them (font-sources stays a map-of-maps)", () => {
    expectSassAssertionsPass(`
      $sources: fn.theme-value("font-sources", "base");

      @if meta.type-of($sources) != "map" {
        @error "Expected theme-value(font-sources, base) to return a map";
      }

      // Expected keys in base font sources group.
      @if map.has-key($sources, "woff2") == false { @error "Expected base font-sources to include 'woff2'"; }
      @if map.has-key($sources, "ttf") == false { @error "Expected base font-sources to include 'ttf'"; }
      @if map.has-key($sources, "italic-woff2") == false { @error "Expected base font-sources to include 'italic-woff2'"; }
      @if map.has-key($sources, "italic-ttf") == false { @error "Expected base font-sources to include 'italic-ttf'"; }

      // Must align with theme tokens directly.
      @if map.get($sources, "woff2") != theme-tokens.$base-font-woff2-path {
        @error "Expected base woff2 font source to match tokens.$base-font-woff2-path";
      }
    `);
  });

  it("supports existence checks (has-theme-group / has-theme-key)", () => {
    expectSassAssertionsPass(`
      @if fn.has-theme-group("namespace") != true { @error "Expected has-theme-group('namespace') to be true"; }
      @if fn.has-theme-group("does-not-exist") != false { @error "Expected has-theme-group(missing) to be false"; }

      @if fn.has-theme-key("namespace", "theme-prefix") != true { @error "Expected has-theme-key(namespace, theme-prefix) to be true"; }
      @if fn.has-theme-key("namespace", "nope") != false { @error "Expected has-theme-key(namespace, nope) to be false"; }

      // Missing group should short-circuit to false (no throw).
      @if fn.has-theme-key("does-not-exist", "anything") != false {
        @error "Expected has-theme-key(missing-group, key) to be false";
      }
    `);
  });

  it("supports safe lookup (try-theme-group / try-theme-value) with fallbacks", () => {
    expectSassAssertionsPass(`
      $ok-group: fn.try-theme-group("namespace", $fallback: ("x": 1));
      @if meta.type-of($ok-group) != "map" { @error "Expected try-theme-group(valid) to return a map"; }
      @if map.has-key($ok-group, "theme-prefix") == false { @error "Expected try-theme-group(valid) to include theme-prefix"; }

      $missing-group: fn.try-theme-group("nope", $fallback: ("fallback": true));
      @if $missing-group != ("fallback": true) {
        @error "Expected try-theme-group(missing) to return fallback";
      }

      $ok-value: fn.try-theme-value("namespace", "theme-prefix", $fallback: "x");
      @if $ok-value != theme-tokens.$theme-prefix {
        @error "Expected try-theme-value(valid) to return actual value";
      }

      $missing-key: fn.try-theme-value("namespace", "nope", $fallback: "fallback");
      @if $missing-key != "fallback" {
        @error "Expected try-theme-value(missing key) to return fallback";
      }

      $default-fallback: fn.try-theme-value("namespace", "nope");
      @if $default-fallback != null {
        @error "Expected try-theme-value() default fallback to be null";
      }
    `);
  });

  it("fails fast on invalid argument types", () => {
    expectSassAssertionsFail(
      `
      $_: fn.theme-group(123);
      `,
      "Expected $group to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.theme-value("namespace", true);
      `,
      "Expected $key to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-theme-key(false, "theme-prefix");
      `,
      "Expected $group to be type 'string'"
    );
  });

  it("fails fast on empty/whitespace strings (guardrails against confusing lookups)", () => {
    // Use single quotes inside Sass to avoid quote-parsing weirdness in JS template strings.
    expectSassAssertionsFail(
      `
      $_: fn.theme-group('');
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.theme-group('   ');
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.theme-value('namespace', '');
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-theme-value('', 'theme-prefix', $fallback: 'x');
      `,
      "non-empty string"
    );
  });

  it("throws actionable errors for missing groups/keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.theme-group("does-not-exist");
      `,
      "Missing key 'does-not-exist' in $theme"
    );

    expectSassAssertionsFail(
      `
      $_: fn.theme-value("namespace", "does-not-exist");
      `,
      "Missing key 'does-not-exist' in theme group 'namespace'"
    );
  });
});
