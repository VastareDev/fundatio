// tests/scss/functions/colours.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a function/token is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks (e.g. #ffffff -> #fff).
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "functions/colours" as fn;
    @use "maps/colours" as colour-maps;
    @use "tokens/colours" as colour-tokens;
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
    @use "functions/colours" as fn;
    @use "maps/colours" as colour-maps;
    @use "tokens/colours" as colour-tokens;
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

describe("functions/colours", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $scales: fn.colour-scales();

      @if meta.type-of($scales) != "list" {
        @error "Expected colour-scales() to return a list";
      }

      // Should match the authoritative map registry keys exactly.
      @if $scales != map.keys(colour-maps.$colour-scales) {
        @error "Expected colour-scales() to equal map.keys($colour-scales)";
      }

      // Must include a few canonical scales.
      @if list.index($scales, "grey") == null { @error "Expected colour-scales() to include 'grey'"; }
      @if list.index($scales, "blue") == null { @error "Expected colour-scales() to include 'blue'"; }
      @if list.index($scales, "indigo") == null { @error "Expected colour-scales() to include 'indigo'"; }
    `);
  });

  it("returns the keys for a specific scale exactly", () => {
    expectSassAssertionsPass(`
      $grey-keys: fn.colour-keys("grey");
      $expected: map.keys(map.get(colour-maps.$colour-scales, "grey"));

      @if $grey-keys != $expected {
        @error "Expected colour-keys('grey') to match map.keys(grey scale)";
      }

      @if list.index($grey-keys, "base-grey") == null {
        @error "Expected colour-keys('grey') to include 'base-grey'";
      }
    `);
  });

  it("returns a full scale map and the map matches the canonical registry", () => {
    expectSassAssertionsPass(`
      $m: fn.colour-scale("grey");

      @if meta.type-of($m) != "map" {
        @error "Expected colour-scale('grey') to return a map";
      }

      @if $m != map.get(colour-maps.$colour-scales, "grey") {
        @error "Expected colour-scale('grey') to equal registry entry";
      }
    `);
  });

  it("returns colours by scale + key and matches the canonical token values exactly", () => {
    expectSassAssertionsPass(`
      $c1: fn.colour("grey", "grey-tint-80");
      $c2: fn.c("grey", "grey-tint-80");

      @if meta.type-of($c1) != "color" { @error "Expected colour() to return a Sass color"; }
      @if meta.type-of($c2) != "color" { @error "Expected c() to return a Sass color"; }

      @if $c1 != colour-tokens.$grey-tint-80 {
        @error "Expected colour('grey','grey-tint-80') to match tokens.$grey-tint-80";
      }

      @if $c2 != $c1 {
        @error "Expected c() to be a strict alias of colour()";
      }
    `);
  });

  it("supports existence checks (has-colour-scale / has-colour)", () => {
    expectSassAssertionsPass(`
      @if fn.has-colour-scale("grey") != true { @error "Expected has-colour-scale('grey') to be true"; }
      @if fn.has-colour-scale("does-not-exist") != false { @error "Expected has-colour-scale('does-not-exist') to be false"; }

      @if fn.has-colour("grey", "grey-tint-80") != true { @error "Expected has-colour('grey','grey-tint-80') to be true"; }
      @if fn.has-colour("grey", "nope") != false { @error "Expected has-colour('grey','nope') to be false"; }

      // Missing scale should short-circuit to false (no throw).
      @if fn.has-colour("does-not-exist", "anything") != false {
        @error "Expected has-colour(missing-scale, key) to be false";
      }
    `);
  });

  it("supports safe lookup via try-colour (never throws on missing scale/key)", () => {
    expectSassAssertionsPass(`
      $ok: fn.try-colour("grey", "grey-tint-80", $fallback: #000000);
      @if $ok != colour-tokens.$grey-tint-80 {
        @error "Expected try-colour(valid) to return the actual value";
      }

      $missing-scale: fn.try-colour("nope", "grey-tint-80", $fallback: #010203);
      @if $missing-scale != #010203 {
        @error "Expected try-colour(missing scale) to return fallback";
      }

      $missing-key: fn.try-colour("grey", "nope", $fallback: #040506);
      @if $missing-key != #040506 {
        @error "Expected try-colour(missing key) to return fallback";
      }

      // Default fallback is null.
      $null-fallback: fn.try-colour("grey", "nope");
      @if $null-fallback != null {
        @error "Expected try-colour() default fallback to be null";
      }
    `);
  });

  it("fails fast on invalid argument types", () => {
    expectSassAssertionsFail(
      `
      $_: fn.colour-scale(123);
      `,
      "Expected $scale to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.colour("grey", 123);
      `,
      "Expected $key to be type 'string'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-colour-scale(true);
      `,
      "Expected $scale to be type 'string'"
    );
  });

  it("fails fast on empty/whitespace strings (guardrails against confusing lookups)", () => {
    expectSassAssertionsFail(
      `
      $_: fn.colour-scale("");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.colour-scale("   ");
      `,
      "non-empty string"
    );

    // Avoid literal newline/tab in a Sass quoted string: build it safely.
    expectSassAssertionsFail(
      `
      $ws: string.unquote("   "); // still whitespace-only, still valid syntax
      $_: fn.colour-scale($ws);
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.colour("grey", "");
      `,
      "non-empty string"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-colour("", "grey-tint-80", $fallback: #000);
      `,
      "non-empty string"
    );
  });

  it("throws actionable errors for missing scales/keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.colour-scale("does-not-exist");
      `,
      "Missing key 'does-not-exist' in $colour-scales"
    );

    expectSassAssertionsFail(
      `
      $_: fn.colour("grey", "does-not-exist");
      `,
      "Missing key 'does-not-exist' in colour scale 'grey'"
    );
  });
});
