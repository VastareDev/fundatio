// tests/scss/maps/spacing.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If an assertion fails, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "maps/spacing" as maps;
    @use "tokens/spacing" as tokens;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_map_test__ { content: "ok"; }
    `,
      header
    );
  }).not.toThrow();
}

describe("maps/spacing", () => {
  it("exports the expected spacing map", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$spacing) != "map" {
        @error "Expected $spacing to be a map";
      }
    `);
  });

  it("contains keys 0..10 in ascending order (stable API)", () => {
    expectSassAssertionsPass(`
      $keys: map.keys(maps.$spacing);

      @if list.length($keys) != 11 {
        @error "Expected $spacing to have 11 keys, got #{list.length($keys)}";
      }

      @for $i from 0 through 10 {
        $expected: $i;
        $actual: list.nth($keys, $i + 1);

        @if $actual != $expected {
          @error "Key order mismatch in $spacing at index #{$i + 1}: expected '#{$expected}' got '#{$actual}'";
        }
      }
    `);
  });

  it("matches computed values exactly (derived from $base-spacing)", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}: got '#{$a}' expected '#{$b}'"; }
        @return $a;
      }

      $_: _assert-eq(map.get(maps.$spacing, 0), 0, "spacing[0]");
      $_: _assert-eq(map.get(maps.$spacing, 1), tokens.$base-spacing * 0.25, "spacing[1]");
      $_: _assert-eq(map.get(maps.$spacing, 2), tokens.$base-spacing * 0.5,  "spacing[2]");
      $_: _assert-eq(map.get(maps.$spacing, 3), tokens.$base-spacing * 0.75, "spacing[3]");
      $_: _assert-eq(map.get(maps.$spacing, 4), tokens.$base-spacing,        "spacing[4]");
      $_: _assert-eq(map.get(maps.$spacing, 5), tokens.$base-spacing * 1.25, "spacing[5]");
      $_: _assert-eq(map.get(maps.$spacing, 6), tokens.$base-spacing * 1.5,  "spacing[6]");
      $_: _assert-eq(map.get(maps.$spacing, 7), tokens.$base-spacing * 1.75, "spacing[7]");
      $_: _assert-eq(map.get(maps.$spacing, 8), tokens.$base-spacing * 2,    "spacing[8]");
      $_: _assert-eq(map.get(maps.$spacing, 9), tokens.$base-spacing * 3,    "spacing[9]");
      $_: _assert-eq(map.get(maps.$spacing, 10), tokens.$base-spacing * 4,   "spacing[10]");
    `);
  });

  it("types are correct and integrity rules hold (units + monotonic growth)", () => {
    expectSassAssertionsPass(`
      @function _assert-type($value, $expected, $label) {
        $t: meta.type-of($value);
        @if $t != $expected {
          @error "Expected #{$label} to be type '#{$expected}', got '#{$t}'";
        }
        @return $value;
      }

      @function _assert-unit($value, $expected-unit, $label) {
        // math.unit() returns "" for unitless numbers.
        $u: math.unit($value);
        @if $u != $expected-unit {
          @error "Expected #{$label} to have unit '#{$expected-unit}', got '#{$u}'";
        }
        @return $value;
      }

      @function _assert-gt($a, $b, $label) {
        @if $a <= $b {
          @error "Expected #{$label} to be strictly increasing (got #{$a} <= #{$b})";
        }
        @return $a;
      }

      // Base token sanity (keeps the scale meaningful)
      $_: _assert-type(tokens.$base-spacing, "number", "$base-spacing");
      $_: _assert-unit(tokens.$base-spacing, "rem", "$base-spacing");
      @if tokens.$base-spacing <= 0 {
        @error "Expected $base-spacing to be > 0, got #{tokens.$base-spacing}";
      }

      // Entry 0 is deliberately unitless zero.
      $v0: map.get(maps.$spacing, 0);
      $_: _assert-type($v0, "number", "spacing[0]");
      $_: _assert-unit($v0, "", "spacing[0]");
      @if $v0 != 0 { @error "Expected spacing[0] to be 0"; }

      // Entries 1..10 must be rem lengths and strictly increasing.
      $prev: $v0;
      @for $i from 1 through 10 {
        $v: map.get(maps.$spacing, $i);

        $_: _assert-type($v, "number", "spacing[#{$i}]");
        $_: _assert-unit($v, "rem", "spacing[#{$i}]");

        // Normalize to unitless numbers for comparison using math.div (no slash-div warning).
        $vn: math.div($v, 1rem);
        $pn: math.div($prev, 1rem);

        $_: _assert-gt($vn, $pn, "spacing[#{$i}] vs spacing[#{$i - 1}]");

        $prev: $v;
      }

      // Specific multiplier checks (locks the intended scale)
      @if math.div(map.get(maps.$spacing, 4), tokens.$base-spacing) != 1 {
        @error "Expected spacing[4] to equal 1x base-spacing";
      }
      @if math.div(map.get(maps.$spacing, 8), tokens.$base-spacing) != 2 {
        @error "Expected spacing[8] to equal 2x base-spacing";
      }
      @if math.div(map.get(maps.$spacing, 10), tokens.$base-spacing) != 4 {
        @error "Expected spacing[10] to equal 4x base-spacing";
      }
    `);
  });
});
