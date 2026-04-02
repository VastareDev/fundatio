// tests/scss/functions/fonts.spec.ts
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
    @use "functions/fonts" as fn;
    @use "maps/fonts" as font-maps;
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
    @use "functions/fonts" as fn;
    @use "maps/fonts" as font-maps;
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

describe("functions/fonts", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $groups: fn.font-groups();

      @if meta.type-of($groups) != "list" {
        @error "Expected font-groups() to return a list";
      }

      // Must equal authoritative registry keys exactly.
      @if $groups != map.keys(font-maps.$fonts) {
        @error "Expected font-groups() to equal map.keys($fonts)";
      }

      // Must include canonical groups.
      @if list.index($groups, "base") == null { @error "Expected font-groups() to include 'base'"; }
      @if list.index($groups, "headings") == null { @error "Expected font-groups() to include 'headings'"; }
      @if list.index($groups, "code") == null { @error "Expected font-groups() to include 'code'"; }
    `);
  });

  it("returns variants for a group exactly and includes expected variants", () => {
    expectSassAssertionsPass(`
      $variants: fn.font-variants("base");
      $expected: map.keys(map.get(font-maps.$fonts, "base"));

      @if meta.type-of($variants) != "list" {
        @error "Expected font-variants('base') to return a list";
      }

      @if $variants != $expected {
        @error "Expected font-variants('base') to match registry keys";
      }

      @if list.index($variants, "normal") == null { @error "Expected 'normal' variant in base"; }
      @if list.index($variants, "italic") == null { @error "Expected 'italic' variant in base"; }
    `);
  });

  it("returns descriptor keys for a given group+variant and includes required descriptors", () => {
    expectSassAssertionsPass(`
      $keys: fn.font-descriptors("base", "normal");

      @if meta.type-of($keys) != "list" {
        @error "Expected font-descriptors() to return a list";
      }

      @if list.index($keys, "family") == null { @error "Expected descriptor 'family'"; }
      @if list.index($keys, "display") == null { @error "Expected descriptor 'display'"; }
      @if list.index($keys, "style") == null { @error "Expected descriptor 'style'"; }
      @if list.index($keys, "weight") == null { @error "Expected descriptor 'weight'"; }
      @if list.index($keys, "sources") == null { @error "Expected descriptor 'sources'"; }
    `);
  });

  it("returns a full group map and it matches the canonical registry exactly", () => {
    expectSassAssertionsPass(`
      $g: fn.font-group("base");

      @if meta.type-of($g) != "map" {
        @error "Expected font-group('base') to return a map";
      }

      @if $g != map.get(font-maps.$fonts, "base") {
        @error "Expected font-group('base') to equal registry entry exactly";
      }
    `);
  });

  it("returns a variant map and it matches the canonical registry entry exactly", () => {
    expectSassAssertionsPass(`
      $v: fn.font-variant("base", "italic");

      @if meta.type-of($v) != "map" {
        @error "Expected font-variant('base','italic') to return a map";
      }

      @if $v != map.get(map.get(font-maps.$fonts, "base"), "italic") {
        @error "Expected font-variant('base','italic') to equal registry entry exactly";
      }
    `);
  });

  it("returns descriptor values with correct types and matches the underlying maps", () => {
    expectSassAssertionsPass(`
      $family: fn.font-descriptor("base", "normal", "family");
      $display: fn.font-descriptor("base", "normal", "display");
      $style: fn.font-descriptor("base", "normal", "style");
      $weight: fn.font-descriptor("base", "normal", "weight");
      $sources: fn.font-descriptor("base", "normal", "sources");

      @if meta.type-of($family) != "string" { @error "Expected 'family' to be a string"; }
      @if meta.type-of($display) != "string" { @error "Expected 'display' to be a string"; }
      @if meta.type-of($style) != "string" { @error "Expected 'style' to be a string"; }

      // Weight is a list (e.g. 100 900).
      @if meta.type-of($weight) != "list" { @error "Expected 'weight' to be a list"; }

      // Sources must be a map.
      @if meta.type-of($sources) != "map" { @error "Expected 'sources' to be a map"; }

      // Exact value alignment with registry
      $expected-family: map.get(map.get(map.get(font-maps.$fonts, "base"), "normal"), "family");
      @if $family != $expected-family {
        @error "Expected descriptor('family') to match registry";
      }
    `);
  });

  it("returns sources map and individual sources; fs() is a strict alias of font-source()", () => {
    expectSassAssertionsPass(`
      $sources: fn.font-sources("base", "normal");

      @if meta.type-of($sources) != "map" {
        @error "Expected font-sources('base','normal') to return a map";
      }

      @if map.has-key($sources, "woff2") == false { @error "Expected sources to contain 'woff2'"; }
      @if map.has-key($sources, "truetype") == false { @error "Expected sources to contain 'truetype'"; }

      $woff2: fn.font-source("base", "normal", "woff2");
      $truetype: fn.font-source("base", "normal", "truetype");
      $woff2-alias: fn.fs("base", "normal", "woff2");

      @if meta.type-of($woff2) != "string" { @error "Expected font-source(...,'woff2') to be a string"; }
      @if meta.type-of($truetype) != "string" { @error "Expected font-source(...,'truetype') to be a string"; }

      @if $woff2-alias != $woff2 {
        @error "Expected fs() to be a strict alias of font-source()";
      }

      // Exact alignment with registry values
      $expected-woff2: map.get(map.get(map.get(map.get(font-maps.$fonts, "base"), "normal"), "sources"), "woff2");
      @if $woff2 != $expected-woff2 {
        @error "Expected font-source() to match the registry path exactly";
      }
    `);
  });

  it("supports safe lookup via try-font-variant / try-font-source (never throws on missing group/variant/key)", () => {
    expectSassAssertionsPass(`
      // Valid lookup returns map
      $v: fn.try-font-variant("base", "normal", $fallback: ("ok": true));
      @if meta.type-of($v) != "map" { @error "Expected try-font-variant(valid) to return a map"; }

      // Missing group returns fallback
      $missing-group: fn.try-font-variant("nope", "normal", $fallback: ("fallback": true));
      @if $missing-group != ("fallback": true) {
        @error "Expected try-font-variant(missing group) to return fallback";
      }

      // Missing variant returns fallback
      $missing-variant: fn.try-font-variant("base", "nope", $fallback: ("fallback": true));
      @if $missing-variant != ("fallback": true) {
        @error "Expected try-font-variant(missing variant) to return fallback";
      }

      // try-font-source valid
      $s: fn.try-font-source("base", "normal", "woff2", $fallback: "X");
      $expected: map.get(map.get(map.get(map.get(font-maps.$fonts, "base"), "normal"), "sources"), "woff2");
      @if $s != $expected { @error "Expected try-font-source(valid) to return registry path"; }

      // try-font-source missing group/key returns fallback
      $s1: fn.try-font-source("nope", "normal", "woff2", $fallback: "FB");
      @if $s1 != "FB" { @error "Expected try-font-source(missing group) to return fallback"; }

      $s2: fn.try-font-source("base", "normal", "nope", $fallback: "FB");
      @if $s2 != "FB" { @error "Expected try-font-source(missing key) to return fallback"; }

      // Default fallback is null.
      $s3: fn.try-font-source("base", "normal", "nope");
      @if $s3 != null { @error "Expected default fallback of try-font-source() to be null"; }
    `);
  });

  it("supports existence checks (has-font-group / has-font-variant / has-font-descriptor)", () => {
    expectSassAssertionsPass(`
      @if fn.has-font-group("base") != true { @error "Expected has-font-group('base') true"; }
      @if fn.has-font-group("nope") != false { @error "Expected has-font-group('nope') false"; }

      @if fn.has-font-variant("base", "normal") != true { @error "Expected has-font-variant('base','normal') true"; }
      @if fn.has-font-variant("base", "nope") != false { @error "Expected has-font-variant('base','nope') false"; }
      @if fn.has-font-variant("nope", "normal") != false { @error "Expected has-font-variant(missing group) false"; }

      @if fn.has-font-descriptor("base", "normal", "family") != true { @error "Expected descriptor 'family' to exist"; }
      @if fn.has-font-descriptor("base", "normal", "nope") != false { @error "Expected missing descriptor to be false"; }
      @if fn.has-font-descriptor("nope", "normal", "family") != false { @error "Expected missing group to short-circuit false"; }
    `);
  });

  it("fails fast on invalid argument types (strict API)", () => {
    expectSassAssertionsFail(
      `
      $_: fn.font-group(123);
      `,
      "Expected $group to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-variant("base", 123);
      `,
      "Expected $variant to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-source("base", "normal", 123);
      `,
      "Expected $format to be type 'string'"
    );
  });

  it("fails fast on empty/whitespace strings (guardrails against confusing lookups)", () => {
    expectSassAssertionsFail(
      `
      $_: fn.font-group("");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-variant("base", "   ");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-source("base", "normal", "");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-font-source("", "normal", "woff2", $fallback: "X");
      `,
      "non-empty string"
    );
  });

  it("throws actionable errors for missing groups/variants/keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.font-group("does-not-exist");
      `,
      "Missing key 'does-not-exist' in $fonts"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-variant("base", "does-not-exist");
      `,
      "Missing key 'does-not-exist' in font group 'base'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.font-source("base", "normal", "does-not-exist");
      `,
      "Missing key 'does-not-exist' in font sources 'base/normal'"
    );
  });
});
