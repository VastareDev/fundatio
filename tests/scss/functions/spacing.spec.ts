// tests/scss/functions/spacing.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compile a Sass snippet that performs compile-time assertions via `@error`.
 * If any assertion fails, Sass compilation fails, and so does the test.
 *
 * We assert inside Sass to avoid CSS serialization quirks and unit formatting
 * differences that can appear when values are emitted to CSS.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "functions/spacing" as fn;
    @use "maps/spacing" as spacing-maps;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the compiler always produces output.
      .__sol_function_test__ { content: "ok"; }
      `,
      header
    );
  }).not.toThrow();
}

/**
 * Compile a Sass snippet that is expected to throw (via `@error` or similar).
 *
 * We match a message fragment so tests stay stable while still validating
 * the failure mode is correct and actionable.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsFail(snippet: string, messageIncludes: string): void {
  const header = `
    @use "functions/spacing" as fn;
    @use "maps/spacing" as spacing-maps;
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

describe("functions/spacing", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $m: fn.spacing-map();
      $keys: fn.spacing-keys();
      $min: fn.spacing-min-key();
      $max: fn.spacing-max-key();

      @if meta.type-of($m) != "map" { @error "Expected spacing-map() to return a map"; }
      @if meta.type-of($keys) != "list" { @error "Expected spacing-keys() to return a list"; }
      @if meta.type-of($min) != "number" { @error "Expected spacing-min-key() to return a number"; }
      @if meta.type-of($max) != "number" { @error "Expected spacing-max-key() to return a number"; }

      // Map must be the authoritative registry.
      @if $m != spacing-maps.$spacing {
        @error "Expected spacing-map() to equal maps.$spacing exactly";
      }

      // Keys must match authoritative map.keys() order.
      @if $keys != map.keys(spacing-maps.$spacing) {
        @error "Expected spacing-keys() to equal map.keys($spacing) exactly";
      }

      // Min/max must reflect keys list ends.
      @if $min != list.nth($keys, 1) {
        @error "Expected spacing-min-key() to equal first spacing key";
      }

      @if $max != list.nth($keys, list.length($keys)) {
        @error "Expected spacing-max-key() to equal last spacing key";
      }
    `);
  });

  it("returns scale values by key and matches the canonical registry exactly", () => {
    expectSassAssertionsPass(`
      // Spot-check key presence and value equality against map registry.
      @each $k in fn.spacing-keys() {
        $v: fn.spacing($k);
        $expected: map.get(spacing-maps.$spacing, $k);

        @if $v != $expected {
          @error "Expected spacing(#{$k}) to equal map.get($spacing, #{$k})";
        }
      }

      // Alias must be strict.
      @if fn.s(4) != fn.spacing(4) { @error "Expected s() to be a strict alias of spacing()"; }
    `);
  });

  it("enforces the spacing contract: key 0 is hard zero (unitless) and non-zero keys are lengths", () => {
    expectSassAssertionsPass(`
      // Key 0 must be exactly 0 (unitless).
      $z: fn.spacing(0);

      @if $z != 0 { @error "Expected spacing(0) to resolve to 0"; }
      @if meta.type-of($z) != "number" { @error "Expected spacing(0) to be a number"; }
      @if math.is-unitless($z) != true { @error "Expected spacing(0) to be unitless"; }

      // Non-zero keys must be numbers with units.
      @each $k in fn.spacing-keys() {
        @if $k != 0 {
          $v: fn.spacing($k);

          @if meta.type-of($v) != "number" {
            @error "Expected spacing(#{$k}) to be a number";
          }

          @if math.is-unitless($v) == true {
            @error "Expected spacing(#{$k}) to be a length (have units)";
          }
        }
      }
    `);
  });

  it("supports existence checks (has-spacing)", () => {
    expectSassAssertionsPass(`
      @if fn.has-spacing(0) != true { @error "Expected has-spacing(0) to be true"; }
      @if fn.has-spacing(10) != true { @error "Expected has-spacing(10) to be true"; }

      // Out of range keys should be false, not throw.
      @if fn.has-spacing(-1) != false { @error "Expected has-spacing(-1) to be false"; }
      @if fn.has-spacing(999) != false { @error "Expected has-spacing(999) to be false"; }
    `);
  });

  it("supports safe lookup via try-spacing (returns fallback and never throws for missing keys)", () => {
    expectSassAssertionsPass(`
      // Valid key returns actual value.
      $ok: fn.try-spacing(4, $fallback: 999px);
      @if $ok != map.get(spacing-maps.$spacing, 4) {
        @error "Expected try-spacing(valid) to return the registry value";
      }

      // Missing key returns fallback.
      $missing: fn.try-spacing(999, $fallback: 12px);
      @if $missing != 12px {
        @error "Expected try-spacing(missing) to return fallback";
      }

      // Default fallback is null.
      $null-fallback: fn.try-spacing(999);
      @if $null-fallback != null {
        @error "Expected try-spacing() default fallback to be null";
      }
    `);
  });

  it("supports negative values via spacing-neg", () => {
    expectSassAssertionsPass(`
      @if fn.spacing-neg(0) != 0 { @error "Expected spacing-neg(0) to be 0"; }

      $v: fn.spacing(4);
      $neg: fn.spacing-neg(4);

      @if $neg != $v * -1 { @error "Expected spacing-neg(k) to equal spacing(k) * -1"; }
      @if meta.type-of($neg) != "number" { @error "Expected spacing-neg() to return a number"; }
    `);
  });

  it("clamps keys correctly via spacing-clamp-key", () => {
    expectSassAssertionsPass(`
      $min: fn.spacing-min-key();
      $max: fn.spacing-max-key();

      @if fn.spacing-clamp-key($min) != $min { @error "Expected clamp(min) to equal min"; }
      @if fn.spacing-clamp-key($max) != $max { @error "Expected clamp(max) to equal max"; }

      @if fn.spacing-clamp-key($min - 100) != $min { @error "Expected clamp(below-min) to return min"; }
      @if fn.spacing-clamp-key($max + 100) != $max { @error "Expected clamp(above-max) to return max"; }

      // In-range value should remain unchanged.
      @if fn.spacing-clamp-key(4) != 4 { @error "Expected clamp(4) to equal 4"; }
    `);
  });

  it("returns correct inclusive sequences via spacing-between (ascending and descending)", () => {
    expectSassAssertionsPass(`
      // Ascending: 2..5 inclusive => 4 values
      $asc: fn.spacing-between(2, 5);

      @if meta.type-of($asc) != "list" { @error "Expected spacing-between() to return a list"; }
      @if list.length($asc) != 4 { @error "Expected spacing-between(2,5) to return 4 items"; }

      @if list.nth($asc, 1) != fn.spacing(2) { @error "Expected first item to equal spacing(2)"; }
      @if list.nth($asc, 2) != fn.spacing(3) { @error "Expected second item to equal spacing(3)"; }
      @if list.nth($asc, 3) != fn.spacing(4) { @error "Expected third item to equal spacing(4)"; }
      @if list.nth($asc, 4) != fn.spacing(5) { @error "Expected fourth item to equal spacing(5)"; }

      // Descending: 5..2 inclusive => 4 values
      $desc: fn.spacing-between(5, 2);

      @if list.length($desc) != 4 { @error "Expected spacing-between(5,2) to return 4 items"; }
      @if list.nth($desc, 1) != fn.spacing(5) { @error "Expected first item to equal spacing(5)"; }
      @if list.nth($desc, 2) != fn.spacing(4) { @error "Expected second item to equal spacing(4)"; }
      @if list.nth($desc, 3) != fn.spacing(3) { @error "Expected third item to equal spacing(3)"; }
      @if list.nth($desc, 4) != fn.spacing(2) { @error "Expected fourth item to equal spacing(2)"; }
    `);
  });

  it("clamps out-of-range inputs in spacing-between", () => {
    expectSassAssertionsPass(`
      $min: fn.spacing-min-key();
      $max: fn.spacing-max-key();

      // Far out-of-range should clamp to bounds and still return a sane list.
      $x: fn.spacing-between($min - 999, $min + 1);
      @if list.length($x) != 2 { @error "Expected clamped spacing-between() to return 2 items"; }
      @if list.nth($x, 1) != fn.spacing($min) { @error "Expected first item to be min spacing"; }

      $y: fn.spacing-between($max + 999, $max - 1);
      @if list.length($y) != 2 { @error "Expected clamped spacing-between() to return 2 items"; }
      @if list.nth($y, 1) != fn.spacing($max) { @error "Expected first item to be max spacing"; }
    `);
  });

  it("fails fast on invalid argument types", () => {
    expectSassAssertionsFail(
      `
      $_: fn.spacing("4");
      `,
      "Expected $key to be type 'number'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-spacing(true);
      `,
      "Expected $key to be type 'number'"
    );

    expectSassAssertionsFail(
      `
      $_: fn.try-spacing(null);
      `,
      "Expected $key to be type 'number'"
    );
  });

  it("fails fast on non-integer keys for key-based APIs", () => {
    expectSassAssertionsFail(
      `
      $_: fn.spacing(2.5);
      `,
      "Expected $key to be an integer"
    );

    expectSassAssertionsFail(
      `
      $_: fn.has-spacing(1.1);
      `,
      "Expected $key to be an integer"
    );

    expectSassAssertionsFail(
      `
      $_: fn.spacing-between(2.2, 3);
      `,
      "Expected $from to be an integer"
    );

    expectSassAssertionsFail(
      `
      $_: fn.spacing-clamp-key(9.9);
      `,
      "Expected $key to be an integer"
    );
  });

  it("throws actionable errors for missing keys on strict accessors", () => {
    expectSassAssertionsFail(
      `
      $_: fn.spacing(999);
      `,
      "Missing key '999' in $spacing"
    );

    expectSassAssertionsFail(
      `
      $_: fn.spacing(-1);
      `,
      "Missing key '-1' in $spacing"
    );
  });
});
