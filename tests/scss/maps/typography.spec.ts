// tests/scss/maps/typography.spec.ts
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
    @use "maps/typography" as maps;
    @use "tokens/typography" as tokens;
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

describe("maps/typography", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$font-families) != "map" { @error "Expected $font-families to be a map"; }
      @if meta.type-of(maps.$font-weights)  != "map" { @error "Expected $font-weights to be a map"; }
      @if meta.type-of(maps.$font-sizes)    != "map" { @error "Expected $font-sizes to be a map"; }
      @if meta.type-of(maps.$formatting)    != "map" { @error "Expected $formatting to be a map"; }
      @if meta.type-of(maps.$spacing)       != "map" { @error "Expected $spacing to be a map"; }
      @if meta.type-of(maps.$typography)    != "map" { @error "Expected $typography to be a map"; }
    `);
  });

  it("registry contains expected keys in the expected order and references the actual maps", () => {
    expectSassAssertionsPass(`
      $expected-keys: ("font-families", "font-weights", "font-sizes", "formatting", "spacing");
      $keys: map.keys(maps.$typography);

      @if list.length($keys) != list.length($expected-keys) {
        @error "Expected $typography to have #{list.length($expected-keys)} keys, got #{list.length($keys)}. (Duplicate keys in source map will collapse.)";
      }

      @for $i from 1 through list.length($expected-keys) {
        @if list.nth($keys, $i) != list.nth($expected-keys, $i) {
          @error "Registry key order mismatch at index #{$i}: expected '#{list.nth($expected-keys, $i)}' got '#{list.nth($keys, $i)}'";
        }
      }

      @if map.get(maps.$typography, "font-families") != maps.$font-families { @error "Expected registry 'font-families' to reference $font-families"; }
      @if map.get(maps.$typography, "font-weights")  != maps.$font-weights  { @error "Expected registry 'font-weights' to reference $font-weights"; }
      @if map.get(maps.$typography, "font-sizes")    != maps.$font-sizes    { @error "Expected registry 'font-sizes' to reference $font-sizes"; }
      @if map.get(maps.$typography, "formatting")    != maps.$formatting    { @error "Expected registry 'formatting' to reference $formatting"; }
      @if map.get(maps.$typography, "spacing")       != maps.$spacing       { @error "Expected registry 'spacing' to reference $spacing"; }
    `);
  });

  it("sub-maps contain the expected keys in the expected order", () => {
    expectSassAssertionsPass(`
      @function _assert-keys($m, $expected, $label) {
        $keys: map.keys($m);

        @if list.length($keys) != list.length($expected) {
          @error "Key count mismatch in #{$label}: expected #{list.length($expected)} got #{list.length($keys)}";
        }

        @for $i from 1 through list.length($expected) {
          @if list.nth($keys, $i) != list.nth($expected, $i) {
            @error "Key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
          }
        }

        @return $m;
      }

      $_: _assert-keys(
        maps.$font-families,
        ("base-font-family","heading-font-family","code-font-family"),
        "font-families"
      );

      $_: _assert-keys(
        maps.$font-weights,
        (
          "thin-font-weight",
          "lighter-font-weight",
          "light-font-weight",
          "normal-font-weight",
          "medium-font-weight",
          "semibold-font-weight",
          "bold-font-weight",
          "bolder-font-weight",
          "black-font-weight"
        ),
        "font-weights"
      );

      $_: _assert-keys(
        maps.$font-sizes,
        ("base-font-size","font-size-h1","font-size-h2","font-size-h3","font-size-h4","font-size-h5","font-size-h6"),
        "font-sizes"
      );

      $_: _assert-keys(
        maps.$formatting,
        ("base-font-weight","heading-font-weight","base-line-height","heading-line-height"),
        "formatting"
      );

      $_: _assert-keys(
        maps.$spacing,
        ("base-margin-bottom","heading-margin-bottom"),
        "spacing"
      );
    `);
  });

  it("every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}"; }
        @return $a;
      }

      // Font families
      $_: _assert-eq(map.get(maps.$font-families, "base-font-family"),    tokens.$base-font-family,    "font-families.base-font-family");
      $_: _assert-eq(map.get(maps.$font-families, "heading-font-family"), tokens.$heading-font-family, "font-families.heading-font-family");
      $_: _assert-eq(map.get(maps.$font-families, "code-font-family"),    tokens.$code-font-family,    "font-families.code-font-family");

      // Font weights
      $_: _assert-eq(map.get(maps.$font-weights, "thin-font-weight"),     tokens.$thin-font-weight,     "font-weights.thin-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "lighter-font-weight"),  tokens.$lighter-font-weight,  "font-weights.lighter-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "light-font-weight"),    tokens.$light-font-weight,    "font-weights.light-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "normal-font-weight"),   tokens.$normal-font-weight,   "font-weights.normal-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "medium-font-weight"),   tokens.$medium-font-weight,   "font-weights.medium-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "semibold-font-weight"), tokens.$semibold-font-weight, "font-weights.semibold-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "bold-font-weight"),     tokens.$bold-font-weight,     "font-weights.bold-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "bolder-font-weight"),   tokens.$bolder-font-weight,   "font-weights.bolder-font-weight");
      $_: _assert-eq(map.get(maps.$font-weights, "black-font-weight"),    tokens.$black-font-weight,    "font-weights.black-font-weight");

      // Font sizes
      $_: _assert-eq(map.get(maps.$font-sizes, "base-font-size"), tokens.$base-font-size, "font-sizes.base-font-size");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h1"),   tokens.$font-size-h1,   "font-sizes.font-size-h1");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h2"),   tokens.$font-size-h2,   "font-sizes.font-size-h2");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h3"),   tokens.$font-size-h3,   "font-sizes.font-size-h3");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h4"),   tokens.$font-size-h4,   "font-sizes.font-size-h4");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h5"),   tokens.$font-size-h5,   "font-sizes.font-size-h5");
      $_: _assert-eq(map.get(maps.$font-sizes, "font-size-h6"),   tokens.$font-size-h6,   "font-sizes.font-size-h6");

      // Formatting
      $_: _assert-eq(map.get(maps.$formatting, "base-font-weight"),    tokens.$base-font-weight,    "formatting.base-font-weight");
      $_: _assert-eq(map.get(maps.$formatting, "heading-font-weight"), tokens.$heading-font-weight, "formatting.heading-font-weight");
      $_: _assert-eq(map.get(maps.$formatting, "base-line-height"),    tokens.$base-line-height,    "formatting.base-line-height");
      $_: _assert-eq(map.get(maps.$formatting, "heading-line-height"), tokens.$heading-line-height, "formatting.heading-line-height");

      // Spacing
      $_: _assert-eq(map.get(maps.$spacing, "base-margin-bottom"),    tokens.$base-margin-bottom,    "spacing.base-margin-bottom");
      $_: _assert-eq(map.get(maps.$spacing, "heading-margin-bottom"), tokens.$heading-margin-bottom, "spacing.heading-margin-bottom");
    `);
  });

    it("all maps: types are correct and integrity rules hold", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-type($value, $expected, $label) {
        @if meta.type-of($value) != $expected {
          @error "Expected #{$label} to be type '#{$expected}', got '#{meta.type-of($value)}'";
        }
        @return $value;
      }

      @function _assert-unit($value, $unit, $label) {
        $_: _assert-type($value, "number", $label);
        @if math.unit($value) != $unit {
          @error "Expected #{$label} to have unit '#{$unit}', got '#{math.unit($value)}'";
        }
        @return $value;
      }

      @function _assert-unitless($value, $label) {
        $_: _assert-type($value, "number", $label);
        @if not math.is-unitless($value) {
          @error "Expected #{$label} to be unitless, got '#{math.unit($value)}'";
        }
        @return $value;
      }

      @function _assert-between($value, $min, $max, $label) {
        $_: _assert-type($value, "number", $label);
        @if $value < $min or $value > $max {
          @error "Expected #{$label} to be between #{$min} and #{$max}, got #{$value}";
        }
        @return $value;
      }

      @function _assert-gt($a, $b, $label) {
        @if $a <= $b {
          @error "Expected #{$label}: #{$a} > #{$b}";
        }
        @return $a;
      }

      // Font stacks in Sass are commonly expressed as *lists* (comma-separated),
      // not strings. Accept either:
      // - a list of identifiers/strings, length >= 2 for fallbacks
      // - a string containing commas (legacy/alternate style)
      @function _assert-font-stack($value, $label) {
        $t: meta.type-of($value);

        @if $t == "list" {
          @if list.length($value) == 0 {
            @error "Expected #{$label} to be a non-empty font stack list";
          }

          // For non-code fonts, enforce at least one fallback.
          @if $label != "code-font-family" and list.length($value) < 2 {
            @error "Expected #{$label} to include fallbacks (list length >= 2), got #{list.length($value)}";
          }

          // Basic sanity: each item must be string or unquoted identifier.
          @for $i from 1 through list.length($value) {
            $item: list.nth($value, $i);
            $it: meta.type-of($item);

            @if not ($it == "string" or $it == "color" or $it == "number" or $it == "map" or $it == "list") {
              // This looks weird, but Sass identifiers are reported as strings in many cases.
              // The only reliable thing here is: reject maps and nulls and functions.
            }

            @if $item == null {
              @error "Expected #{$label}[#{$i}] to be a valid font name, got null";
            }
          }

          @return $value;
        }

        @if $t == "string" {
          @if string.length($value) == 0 {
            @error "Expected #{$label} to be a non-empty string";
          }

          @if $label != "code-font-family" and string.index($value, ",") == null {
            @error "Expected #{$label} to include fallbacks (comma-separated stack), got '#{$value}'";
          }

          @return $value;
        }

        @error "Expected #{$label} to be a font stack (list or string), got '#{$t}'";
      }

      // ---------------------------------------------------------------------
      // Font families
      // ---------------------------------------------------------------------

      $_: _assert-font-stack(map.get(maps.$font-families, "base-font-family"), "base-font-family");
      $_: _assert-font-stack(map.get(maps.$font-families, "heading-font-family"), "heading-font-family");
      $_: _assert-font-stack(map.get(maps.$font-families, "code-font-family"), "code-font-family");

      // ---------------------------------------------------------------------
      // Font weights: numeric, unitless, strictly increasing, and within [100..900]
      // ---------------------------------------------------------------------

      $w: maps.$font-weights;

      $thin:     _assert-between(_assert-unitless(map.get($w, "thin-font-weight"), "thin-font-weight"), 100, 900, "thin-font-weight");
      $lighter:  _assert-between(_assert-unitless(map.get($w, "lighter-font-weight"), "lighter-font-weight"), 100, 900, "lighter-font-weight");
      $light:    _assert-between(_assert-unitless(map.get($w, "light-font-weight"), "light-font-weight"), 100, 900, "light-font-weight");
      $normal:   _assert-between(_assert-unitless(map.get($w, "normal-font-weight"), "normal-font-weight"), 100, 900, "normal-font-weight");
      $medium:   _assert-between(_assert-unitless(map.get($w, "medium-font-weight"), "medium-font-weight"), 100, 900, "medium-font-weight");
      $semibold: _assert-between(_assert-unitless(map.get($w, "semibold-font-weight"), "semibold-font-weight"), 100, 900, "semibold-font-weight");
      $bold:     _assert-between(_assert-unitless(map.get($w, "bold-font-weight"), "bold-font-weight"), 100, 900, "bold-font-weight");
      $bolder:   _assert-between(_assert-unitless(map.get($w, "bolder-font-weight"), "bolder-font-weight"), 100, 900, "bolder-font-weight");
      $black:    _assert-between(_assert-unitless(map.get($w, "black-font-weight"), "black-font-weight"), 100, 900, "black-font-weight");

      $_: _assert-gt($lighter, $thin, "lighter > thin");
      $_: _assert-gt($light, $lighter, "light > lighter");
      $_: _assert-gt($normal, $light, "normal > light");
      $_: _assert-gt($medium, $normal, "medium > normal");
      $_: _assert-gt($semibold, $medium, "semibold > medium");
      $_: _assert-gt($bold, $semibold, "bold > semibold");
      $_: _assert-gt($bolder, $bold, "bolder > bold");
      $_: _assert-gt($black, $bolder, "black > bolder");

      // formatting weights must be drawn from the weight scale
      $fmt: maps.$formatting;
      $base-w: _assert-unitless(map.get($fmt, "base-font-weight"), "base-font-weight");
      $heading-w: _assert-unitless(map.get($fmt, "heading-font-weight"), "heading-font-weight");

      @if $base-w != $normal { @error "Expected base-font-weight to equal normal-font-weight"; }
      @if $heading-w != $bold { @error "Expected heading-font-weight to equal bold-font-weight"; }

      // ---------------------------------------------------------------------
      // Font sizes: numbers with rem units; heading scale expected ordering
      // ---------------------------------------------------------------------

      $s: maps.$font-sizes;

      $base: _assert-unit(map.get($s, "base-font-size"), "rem", "base-font-size");
      $h1:   _assert-unit(map.get($s, "font-size-h1"), "rem", "font-size-h1");
      $h2:   _assert-unit(map.get($s, "font-size-h2"), "rem", "font-size-h2");
      $h3:   _assert-unit(map.get($s, "font-size-h3"), "rem", "font-size-h3");
      $h4:   _assert-unit(map.get($s, "font-size-h4"), "rem", "font-size-h4");
      $h5:   _assert-unit(map.get($s, "font-size-h5"), "rem", "font-size-h5");
      $h6:   _assert-unit(map.get($s, "font-size-h6"), "rem", "font-size-h6");

      $_: _assert-gt($h1, $h2, "h1 > h2");
      $_: _assert-gt($h2, $h3, "h2 > h3");
      $_: _assert-gt($h3, $h4, "h3 > h4");
      $_: _assert-gt($h4, $h5, "h4 > h5");
      @if $h5 < $h6 { @error "Expected h5 >= h6"; }
      @if $h6 != $base { @error "Expected h6 to equal base-font-size"; }

      // ---------------------------------------------------------------------
      // Line heights: unitless numbers, heading tighter than base
      // ---------------------------------------------------------------------

      $base-lh: _assert-between(_assert-unitless(map.get($fmt, "base-line-height"), "base-line-height"), 1, 3, "base-line-height");
      $head-lh: _assert-between(_assert-unitless(map.get($fmt, "heading-line-height"), "heading-line-height"), 1, 3, "heading-line-height");

      @if $head-lh >= $base-lh {
        @error "Expected heading-line-height to be less than base-line-height";
      }

      // ---------------------------------------------------------------------
      // Spacing: numbers with rem units and expected relationship
      // ---------------------------------------------------------------------

      $sp: maps.$spacing;

      $base-mb: _assert-unit(map.get($sp, "base-margin-bottom"), "rem", "base-margin-bottom");
      $head-mb: _assert-unit(map.get($sp, "heading-margin-bottom"), "rem", "heading-margin-bottom");

      @if $head-mb >= $base-mb {
        @error "Expected heading-margin-bottom to be less than base-margin-bottom";
      }
    `);
  });
});
