// tests/scss/tokens/typography.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a token is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "tokens/typography" as type;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_token_test__ { content: "ok"; }
    `,
      header
    );
  }).not.toThrow();
}

describe("tokens/typography", () => {
  it("matches font family tokens exactly", () => {
    expectSassAssertionsPass(`
      @if type.$base-font-family != ("Merriweather", Georgia, "Times New Roman", Times, serif) {
        @error "Expected $base-font-family to be Merriweather serif stack";
      }

      @if type.$heading-font-family != ("Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif) {
        @error "Expected $heading-font-family to be Montserrat system-sans stack";
      }

      @if type.$code-font-family != (ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace) {
        @error "Expected $code-font-family to be a modern monospace stack";
      }
    `);
  });

  it("matches font weight tokens exactly", () => {
    expectSassAssertionsPass(`
      @if type.$thin-font-weight != 100 { @error "Expected $thin-font-weight to be 100"; }
      @if type.$lighter-font-weight != 200 { @error "Expected $lighter-font-weight to be 200"; }
      @if type.$light-font-weight != 300 { @error "Expected $light-font-weight to be 300"; }
      @if type.$normal-font-weight != 400 { @error "Expected $normal-font-weight to be 400"; }
      @if type.$medium-font-weight != 500 { @error "Expected $medium-font-weight to be 500"; }
      @if type.$semibold-font-weight != 600 { @error "Expected $semibold-font-weight to be 600"; }
      @if type.$bold-font-weight != 700 { @error "Expected $bold-font-weight to be 700"; }
      @if type.$bolder-font-weight != 800 { @error "Expected $bolder-font-weight to be 800"; }
      @if type.$black-font-weight != 900 { @error "Expected $black-font-weight to be 900"; }

      @if type.$base-font-weight != type.$normal-font-weight {
        @error "Expected $base-font-weight to equal $normal-font-weight";
      }

      @if type.$heading-font-weight != type.$bold-font-weight {
        @error "Expected $heading-font-weight to equal $bold-font-weight";
      }
    `);
  });

  it("matches base size + derived heading sizes exactly", () => {
    expectSassAssertionsPass(`
      @if type.$base-font-size != 1rem { @error "Expected $base-font-size to be 1rem"; }

      @if type.$font-size-h1 != type.$base-font-size * 2.5 { @error "Expected $font-size-h1 to equal $base-font-size * 2.5"; }
      @if type.$font-size-h2 != type.$base-font-size * 2 { @error "Expected $font-size-h2 to equal $base-font-size * 2"; }
      @if type.$font-size-h3 != type.$base-font-size * 1.75 { @error "Expected $font-size-h3 to equal $base-font-size * 1.75"; }
      @if type.$font-size-h4 != type.$base-font-size * 1.5 { @error "Expected $font-size-h4 to equal $base-font-size * 1.5"; }
      @if type.$font-size-h5 != type.$base-font-size * 1.25 { @error "Expected $font-size-h5 to equal $base-font-size * 1.25"; }
      @if type.$font-size-h6 != type.$base-font-size { @error "Expected $font-size-h6 to equal $base-font-size"; }
    `);
  });

  it("matches line-height and spacing tokens exactly", () => {
    expectSassAssertionsPass(`
      @if type.$base-line-height != 1.5 { @error "Expected $base-line-height to be 1.5"; }
      @if type.$heading-line-height != 1.2 { @error "Expected $heading-line-height to be 1.2"; }

      @if type.$base-margin-bottom != 1rem { @error "Expected $base-margin-bottom to be 1rem"; }
      @if type.$heading-margin-bottom != 1rem * 0.5 { @error "Expected $heading-margin-bottom to be 0.5rem"; }
    `);
  });

  it("enforces token types and typography integrity", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-is-number($value, $name) {
        @if meta.type-of($value) != "number" {
          @error "Expected #{$name} to be a number, got #{meta.type-of($value)}";
        }
        @return $value;
      }

      @function _assert-is-list($value, $name) {
        @if meta.type-of($value) != "list" {
          @error "Expected #{$name} to be a list, got #{meta.type-of($value)}";
        }
        @return $value;
      }

      @function _assert-list-min-length($value, $min, $name) {
        $v: _assert-is-list($value, $name);
        @if list.length($v) < $min {
          @error "Expected #{$name} to have at least #{$min} entries, got #{list.length($v)}";
        }
        @return $v;
      }

      @function _assert-unit($value, $expected-unit, $name) {
        $v: _assert-is-number($value, $name);
        @if math.unit($v) != $expected-unit {
          @error "Expected #{$name} to have unit '#{$expected-unit}', got '#{math.unit($v)}'";
        }
        @return $v;
      }

      @function _assert-between($value, $min, $max, $name) {
        $v: _assert-is-number($value, $name);
        @if $v < $min or $v > $max {
          @error "Expected #{$name} to be between #{$min} and #{$max}, got #{$v}";
        }
        @return $v;
      }

      @function _assert-strictly-increasing($values, $label) {
        $len: list.length($values);
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          $a: _assert-is-number(list.nth($values, $i), "#{$label}[#{$i}]");
          $b: _assert-is-number(list.nth($values, $i + 1), "#{$label}[#{$i + 1}]");

          @if $b <= $a {
            @error "Expected #{$label} to be strictly increasing at step #{$i + 1} (#{$b} <= #{$a})";
          }
        }

        @return $values;
      }

      @function _assert-strictly-decreasing($values, $label) {
        $len: list.length($values);
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          $a: _assert-is-number(list.nth($values, $i), "#{$label}[#{$i}]");
          $b: _assert-is-number(list.nth($values, $i + 1), "#{$label}[#{$i + 1}]");

          @if $b >= $a {
            @error "Expected #{$label} to be strictly decreasing at step #{$i + 1} (#{$b} >= #{$a})";
          }
        }

        @return $values;
      }

      // ---------------------------------------------------------------------
      // Font family integrity
      // ---------------------------------------------------------------------

      $_: _assert-list-min-length(type.$base-font-family, 2, "$base-font-family");
      $_: _assert-list-min-length(type.$heading-font-family, 2, "$heading-font-family");
      $_: _assert-list-min-length(type.$code-font-family, 2, "$code-font-family");

      // Require common safety-net generics at end of stacks.
      @if list.nth(type.$base-font-family, list.length(type.$base-font-family)) != serif {
        @error "Expected $base-font-family to end with generic 'serif'";
      }

      @if list.nth(type.$heading-font-family, list.length(type.$heading-font-family)) != sans-serif {
        @error "Expected $heading-font-family to end with generic 'sans-serif'";
      }

      @if list.nth(type.$code-font-family, list.length(type.$code-font-family)) != monospace {
        @error "Expected $code-font-family to end with generic 'monospace'";
      }

      // ---------------------------------------------------------------------
      // Weight integrity
      // ---------------------------------------------------------------------

      $_: _assert-between(type.$thin-font-weight, 1, 1000, "$thin-font-weight");
      $_: _assert-between(type.$lighter-font-weight, 1, 1000, "$lighter-font-weight");
      $_: _assert-between(type.$light-font-weight, 1, 1000, "$light-font-weight");
      $_: _assert-between(type.$normal-font-weight, 1, 1000, "$normal-font-weight");
      $_: _assert-between(type.$medium-font-weight, 1, 1000, "$medium-font-weight");
      $_: _assert-between(type.$semibold-font-weight, 1, 1000, "$semibold-font-weight");
      $_: _assert-between(type.$bold-font-weight, 1, 1000, "$bold-font-weight");
      $_: _assert-between(type.$bolder-font-weight, 1, 1000, "$bolder-font-weight");
      $_: _assert-between(type.$black-font-weight, 1, 1000, "$black-font-weight");

      // Keep weights ordered and sensible.
      $_: _assert-strictly-increasing((
        type.$thin-font-weight,
        type.$lighter-font-weight,
        type.$light-font-weight,
        type.$normal-font-weight,
        type.$medium-font-weight,
        type.$semibold-font-weight,
        type.$bold-font-weight,
        type.$bolder-font-weight,
        type.$black-font-weight
      ), "font weights");

      // Base/heading weights should reference canonical tokens (not "random" numbers).
      @if type.$base-font-weight != type.$normal-font-weight {
        @error "Expected $base-font-weight to reference $normal-font-weight";
      }
      @if type.$heading-font-weight != type.$bold-font-weight {
        @error "Expected $heading-font-weight to reference $bold-font-weight";
      }

      // ---------------------------------------------------------------------
      // Size integrity
      // ---------------------------------------------------------------------

      // Base font size should be rem-based.
      $_: _assert-unit(type.$base-font-size, "rem", "$base-font-size");

      // Derived sizes should be rem-based as well (since base is rem).
      $_: _assert-unit(type.$font-size-h1, "rem", "$font-size-h1");
      $_: _assert-unit(type.$font-size-h2, "rem", "$font-size-h2");
      $_: _assert-unit(type.$font-size-h3, "rem", "$font-size-h3");
      $_: _assert-unit(type.$font-size-h4, "rem", "$font-size-h4");
      $_: _assert-unit(type.$font-size-h5, "rem", "$font-size-h5");
      $_: _assert-unit(type.$font-size-h6, "rem", "$font-size-h6");

      // Size scale should be strictly decreasing from h1 -> h6.
      $_: _assert-strictly-decreasing((
        type.$font-size-h1,
        type.$font-size-h2,
        type.$font-size-h3,
        type.$font-size-h4,
        type.$font-size-h5,
        type.$font-size-h6
      ), "heading sizes (h1->h6)");

      // Ensure h6 is exactly base, not "close enough".
      @if type.$font-size-h6 != type.$base-font-size {
        @error "Expected $font-size-h6 to equal $base-font-size exactly";
      }

      // ---------------------------------------------------------------------
      // Line-height & spacing integrity
      // ---------------------------------------------------------------------

      $_: _assert-between(type.$base-line-height, 1, 3, "$base-line-height");
      $_: _assert-between(type.$heading-line-height, 1, 3, "$heading-line-height");

      // Headings should be tighter than body (usually).
      @if type.$heading-line-height >= type.$base-line-height {
        @error "Expected $heading-line-height to be less than $base-line-height";
      }

      $_: _assert-unit(type.$base-margin-bottom, "rem", "$base-margin-bottom");
      $_: _assert-unit(type.$heading-margin-bottom, "rem", "$heading-margin-bottom");

      // Heading margin should not exceed base margin by default.
      @if type.$heading-margin-bottom > type.$base-margin-bottom {
        @error "Expected $heading-margin-bottom <= $base-margin-bottom";
      }
    `);
  });
});
