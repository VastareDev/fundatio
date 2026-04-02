// tests/scss/maps/fonts.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If an assertion fails, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks and to validate
 * structure/type integrity at compile time.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "maps/fonts" as maps;
    @use "tokens/fonts" as tokens;
    @use "tokens/theme" as theme;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_fonts_map_test__ { content: "ok"; }
    `,
      header
    );
  }).not.toThrow();
}

describe("maps/fonts", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$base-fonts) != "map"    { @error "Expected $base-fonts to be a map"; }
      @if meta.type-of(maps.$heading-fonts) != "map" { @error "Expected $heading-fonts to be a map"; }
      @if meta.type-of(maps.$code-fonts) != "map"    { @error "Expected $code-fonts to be a map"; }
      @if meta.type-of(maps.$fonts) != "map"         { @error "Expected $fonts to be a map"; }
    `);
  });

  it("registry contains expected keys in the expected order and references the actual maps", () => {
    expectSassAssertionsPass(`
      $expected-keys: ("base", "headings", "code");
      $keys: map.keys(maps.$fonts);

      @if list.length($keys) != 3 {
        @error "Expected $fonts to have 3 keys, got #{list.length($keys)}";
      }

      @for $i from 1 through 3 {
        @if list.nth($keys, $i) != list.nth($expected-keys, $i) {
          @error "Registry key order mismatch at index #{$i}: expected '#{list.nth($expected-keys, $i)}' got '#{list.nth($keys, $i)}'";
        }
      }

      @if map.get(maps.$fonts, "base")     != maps.$base-fonts    { @error "Expected registry 'base' to reference $base-fonts"; }
      @if map.get(maps.$fonts, "headings") != maps.$heading-fonts { @error "Expected registry 'headings' to reference $heading-fonts"; }
      @if map.get(maps.$fonts, "code")     != maps.$code-fonts    { @error "Expected registry 'code' to reference $code-fonts"; }
    `);
  });

  it("group maps contain expected variant keys in the expected order", () => {
    expectSassAssertionsPass(`
      @function _assert-variant-keys($m, $label) {
        $keys: map.keys($m);
        $expected: ("normal", "italic");

        @if list.length($keys) != 2 {
          @error "Expected #{$label} to have 2 variants (normal/italic), got #{list.length($keys)}";
        }

        @for $i from 1 through 2 {
          @if list.nth($keys, $i) != list.nth($expected, $i) {
            @error "Variant key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
          }
        }

        @return $m;
      }

      $_: _assert-variant-keys(maps.$base-fonts, "base-fonts");
      $_: _assert-variant-keys(maps.$heading-fonts, "heading-fonts");
      $_: _assert-variant-keys(maps.$code-fonts, "code-fonts");
    `);
  });

  it("descriptor maps contain expected keys and sources keys in the expected order", () => {
    expectSassAssertionsPass(`
      @function _assert-descriptor-keys($desc, $label) {
        @if meta.type-of($desc) != "map" {
          @error "Expected #{$label} to be a map, got #{meta.type-of($desc)}";
        }

        $keys: map.keys($desc);
        $expected: ("family", "display", "style", "weight", "sources");

        @if list.length($keys) != 5 {
          @error "Expected #{$label} to have 5 keys, got #{list.length($keys)}";
        }

        @for $i from 1 through 5 {
          @if list.nth($keys, $i) != list.nth($expected, $i) {
            @error "Descriptor key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
          }
        }

        $sources: map.get($desc, "sources");
        @if meta.type-of($sources) != "map" {
          @error "Expected #{$label}.sources to be a map, got #{meta.type-of($sources)}";
        }

        $skeys: map.keys($sources);
        $sexpected: ("woff2", "truetype");

        @if list.length($skeys) != 2 {
          @error "Expected #{$label}.sources to have 2 keys (woff2/truetype), got #{list.length($skeys)}";
        }

        @for $i from 1 through 2 {
          @if list.nth($skeys, $i) != list.nth($sexpected, $i) {
            @error "Sources key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($sexpected, $i)}' got '#{list.nth($skeys, $i)}'";
          }
        }

        @return $desc;
      }

      $_: _assert-descriptor-keys(map.get(maps.$base-fonts, "normal"), "base-fonts.normal");
      $_: _assert-descriptor-keys(map.get(maps.$base-fonts, "italic"), "base-fonts.italic");

      $_: _assert-descriptor-keys(map.get(maps.$heading-fonts, "normal"), "heading-fonts.normal");
      $_: _assert-descriptor-keys(map.get(maps.$heading-fonts, "italic"), "heading-fonts.italic");

      $_: _assert-descriptor-keys(map.get(maps.$code-fonts, "normal"), "code-fonts.normal");
      $_: _assert-descriptor-keys(map.get(maps.$code-fonts, "italic"), "code-fonts.italic");
    `);
  });

  it("every entry matches canonical token/theme values exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}"; }
        @return $a;
      }

      // ---------------------------------------------------------------------
      // Base fonts
      // ---------------------------------------------------------------------
      $bn: map.get(maps.$base-fonts, "normal");
      $bi: map.get(maps.$base-fonts, "italic");

      $_: _assert-eq(map.get($bn, "family"),  theme.$base-font,         "base-fonts.normal.family");
      $_: _assert-eq(map.get($bn, "display"), tokens.$font-display,     "base-fonts.normal.display");
      $_: _assert-eq(map.get($bn, "style"),   tokens.$font-style-normal,"base-fonts.normal.style");
      $_: _assert-eq(map.get($bn, "weight"),  tokens.$font-weight-range,"base-fonts.normal.weight");
      $_: _assert-eq(map.get(map.get($bn, "sources"), "woff2"), theme.$base-font-woff2-path, "base-fonts.normal.sources.woff2");
      $_: _assert-eq(map.get(map.get($bn, "sources"), "truetype"),  theme.$base-font-ttf-path,  "base-fonts.normal.sources.truetype");

      $_: _assert-eq(map.get($bi, "family"),  theme.$base-font,         "base-fonts.italic.family");
      $_: _assert-eq(map.get($bi, "display"), tokens.$font-display,     "base-fonts.italic.display");
      $_: _assert-eq(map.get($bi, "style"),   tokens.$font-style-italic,"base-fonts.italic.style");
      $_: _assert-eq(map.get($bi, "weight"),  tokens.$font-weight-range,"base-fonts.italic.weight");
      $_: _assert-eq(map.get(map.get($bi, "sources"), "woff2"), theme.$base-font-italic-woff2-path, "base-fonts.italic.sources.woff2");
      $_: _assert-eq(map.get(map.get($bi, "sources"), "truetype"),  theme.$base-font-italic-ttf-path,  "base-fonts.italic.sources.truetype");

      // ---------------------------------------------------------------------
      // Heading fonts
      // ---------------------------------------------------------------------
      $hn: map.get(maps.$heading-fonts, "normal");
      $hi: map.get(maps.$heading-fonts, "italic");

      $_: _assert-eq(map.get($hn, "family"),  theme.$heading-font,       "heading-fonts.normal.family");
      $_: _assert-eq(map.get($hn, "display"), tokens.$font-display,      "heading-fonts.normal.display");
      $_: _assert-eq(map.get($hn, "style"),   tokens.$font-style-normal, "heading-fonts.normal.style");
      $_: _assert-eq(map.get($hn, "weight"),  tokens.$font-weight-range, "heading-fonts.normal.weight");
      $_: _assert-eq(map.get(map.get($hn, "sources"), "woff2"), theme.$heading-font-woff2-path, "heading-fonts.normal.sources.woff2");
      $_: _assert-eq(map.get(map.get($hn, "sources"), "truetype"),  theme.$heading-font-ttf-path,  "heading-fonts.normal.sources.truetype");

      $_: _assert-eq(map.get($hi, "family"),  theme.$heading-font,       "heading-fonts.italic.family");
      $_: _assert-eq(map.get($hi, "display"), tokens.$font-display,      "heading-fonts.italic.display");
      $_: _assert-eq(map.get($hi, "style"),   tokens.$font-style-italic, "heading-fonts.italic.style");
      $_: _assert-eq(map.get($hi, "weight"),  tokens.$font-weight-range, "heading-fonts.italic.weight");
      $_: _assert-eq(map.get(map.get($hi, "sources"), "woff2"), theme.$heading-font-italic-woff2-path, "heading-fonts.italic.sources.woff2");
      $_: _assert-eq(map.get(map.get($hi, "sources"), "truetype"),  theme.$heading-font-italic-ttf-path,  "heading-fonts.italic.sources.truetype");

      // ---------------------------------------------------------------------
      // Code fonts
      // ---------------------------------------------------------------------
      $cn: map.get(maps.$code-fonts, "normal");
      $ci: map.get(maps.$code-fonts, "italic");

      $_: _assert-eq(map.get($cn, "family"),  theme.$code-font,          "code-fonts.normal.family");
      $_: _assert-eq(map.get($cn, "display"), tokens.$font-display,      "code-fonts.normal.display");
      $_: _assert-eq(map.get($cn, "style"),   tokens.$font-style-normal, "code-fonts.normal.style");
      $_: _assert-eq(map.get($cn, "weight"),  tokens.$font-weight-range, "code-fonts.normal.weight");
      $_: _assert-eq(map.get(map.get($cn, "sources"), "woff2"), theme.$code-font-woff2-path, "code-fonts.normal.sources.woff2");
      $_: _assert-eq(map.get(map.get($cn, "sources"), "truetype"),  theme.$code-font-ttf-path,  "code-fonts.normal.sources.truetype");

      $_: _assert-eq(map.get($ci, "family"),  theme.$code-font,          "code-fonts.italic.family");
      $_: _assert-eq(map.get($ci, "display"), tokens.$font-display,      "code-fonts.italic.display");
      $_: _assert-eq(map.get($ci, "style"),   tokens.$font-style-italic, "code-fonts.italic.style");
      $_: _assert-eq(map.get($ci, "weight"),  tokens.$font-weight-range, "code-fonts.italic.weight");
      $_: _assert-eq(map.get(map.get($ci, "sources"), "woff2"), theme.$code-font-italic-woff2-path, "code-fonts.italic.sources.woff2");
      $_: _assert-eq(map.get(map.get($ci, "sources"), "truetype"),  theme.$code-font-italic-ttf-path,  "code-fonts.italic.sources.truetype");
    `);
  });

  it("all maps: types are correct and integrity rules hold", () => {
    expectSassAssertionsPass(`
      @function _assert-type($value, $expected, $label) {
        $t: meta.type-of($value);
        @if $t != $expected {
          @error "Expected #{$label} to be type '#{$expected}', got '#{$t}'";
        }
        @return $value;
      }

      @function _assert-non-empty-string($value, $label) {
        $_: _assert-type($value, "string", $label);
        @if string.length($value) == 0 {
          @error "Expected #{$label} to be a non-empty string";
        }
        @return $value;
      }

      @function _assert-weight-range($value, $label) {
        $_: _assert-type($value, "list", $label);
        @if list.length($value) != 2 {
          @error "Expected #{$label} to be a 2-item list (min max), got #{list.length($value)}";
        }
        $min: list.nth($value, 1);
        $max: list.nth($value, 2);

        @if meta.type-of($min) != "number" or meta.type-of($max) != "number" {
          @error "Expected #{$label} items to be numbers";
        }

        @if $min <= 0 or $max <= 0 {
          @error "Expected #{$label} weights to be positive numbers";
        }

        @if $max <= $min {
          @error "Expected #{$label} to be ascending (max > min), got (#{$min} #{$max})";
        }

        // Common-sense guardrails; avoids accidental nonsense.
        @if $min < 1 or $max > 1000 {
          @error "Expected #{$label} weights to be within a sane range (1..1000), got (#{$min} #{$max})";
        }

        @return $value;
      }

      @function _assert-sources($sources, $label) {
        $_: _assert-type($sources, "map", $label);

        $woff2: map.get($sources, "woff2");
        $truetype: map.get($sources, "truetype");

        $_: _assert-non-empty-string($woff2, "#{$label}.woff2");
        $_: _assert-non-empty-string($truetype, "#{$label}.truetype");

        // Minimal sanity: don't let paths accidentally not look like files.
        @if not string.index($woff2, ".woff2") { @error "Expected #{$label}.woff2 to include '.woff2'"; }
        @if not string.index($truetype, ".ttf") { @error "Expected #{$label}.truetype to include '.ttf'"; }

        @return $sources;
      }

      @mixin _assert-descriptor($desc, $family-expected, $style-expected, $sources-expected, $label) {
        $_: _assert-type($desc, "map", $label);

        $_: _assert-non-empty-string(map.get($desc, "family"),  "#{$label}.family");
        $_: _assert-non-empty-string(map.get($desc, "display"), "#{$label}.display");
        $_: _assert-non-empty-string(map.get($desc, "style"),   "#{$label}.style");

        // Exact invariants we don't want silently drifting.
        @if map.get($desc, "family")  != $family-expected { @error "Expected #{$label}.family to match canonical theme token"; }
        @if map.get($desc, "display") != tokens.$font-display { @error "Expected #{$label}.display to match $font-display"; }
        @if map.get($desc, "style")   != $style-expected { @error "Expected #{$label}.style to match expected style"; }

        $_: _assert-weight-range(map.get($desc, "weight"), "#{$label}.weight");

        $sources: map.get($desc, "sources");
        $_: _assert-sources($sources, "#{$label}.sources");

        // Ensure sources map is *exactly* the expected one (locks wiring).
        @if $sources != $sources-expected {
          @error "Expected #{$label}.sources to match canonical theme token paths";
        }
      }

      // ---------------------------------------------------------------------
      // Base group
      // ---------------------------------------------------------------------
      @include _assert-descriptor(
        map.get(maps.$base-fonts, "normal"),
        theme.$base-font,
        tokens.$font-style-normal,
        ("woff2": theme.$base-font-woff2-path, "truetype": theme.$base-font-ttf-path),
        "base-fonts.normal"
      );

      @include _assert-descriptor(
        map.get(maps.$base-fonts, "italic"),
        theme.$base-font,
        tokens.$font-style-italic,
        ("woff2": theme.$base-font-italic-woff2-path, "truetype": theme.$base-font-italic-ttf-path),
        "base-fonts.italic"
      );

      // ---------------------------------------------------------------------
      // Heading group
      // ---------------------------------------------------------------------
      @include _assert-descriptor(
        map.get(maps.$heading-fonts, "normal"),
        theme.$heading-font,
        tokens.$font-style-normal,
        ("woff2": theme.$heading-font-woff2-path, "truetype": theme.$heading-font-ttf-path),
        "heading-fonts.normal"
      );

      @include _assert-descriptor(
        map.get(maps.$heading-fonts, "italic"),
        theme.$heading-font,
        tokens.$font-style-italic,
        ("woff2": theme.$heading-font-italic-woff2-path, "truetype": theme.$heading-font-italic-ttf-path),
        "heading-fonts.italic"
      );

      // ---------------------------------------------------------------------
      // Code group
      // ---------------------------------------------------------------------
      @include _assert-descriptor(
        map.get(maps.$code-fonts, "normal"),
        theme.$code-font,
        tokens.$font-style-normal,
        ("woff2": theme.$code-font-woff2-path, "truetype": theme.$code-font-ttf-path),
        "code-fonts.normal"
      );

      @include _assert-descriptor(
        map.get(maps.$code-fonts, "italic"),
        theme.$code-font,
        tokens.$font-style-italic,
        ("woff2": theme.$code-font-italic-woff2-path, "truetype": theme.$code-font-italic-ttf-path),
        "code-fonts.italic"
      );
    `);
  });
});
