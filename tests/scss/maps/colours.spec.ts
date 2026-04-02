// tests/scss/maps/colours.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If an assertion fails, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks (e.g. #ffffff -> #fff).
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "maps/colours" as maps;
    @use "tokens/colours" as tokens;
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

describe("maps/colours", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$greys) != "map"   { @error "Expected $greys to be a map"; }
      @if meta.type-of(maps.$blues) != "map"   { @error "Expected $blues to be a map"; }
      @if meta.type-of(maps.$indigos) != "map" { @error "Expected $indigos to be a map"; }
      @if meta.type-of(maps.$purples) != "map" { @error "Expected $purples to be a map"; }
      @if meta.type-of(maps.$pinks) != "map"   { @error "Expected $pinks to be a map"; }
      @if meta.type-of(maps.$reds) != "map"    { @error "Expected $reds to be a map"; }
      @if meta.type-of(maps.$oranges) != "map" { @error "Expected $oranges to be a map"; }
      @if meta.type-of(maps.$yellows) != "map" { @error "Expected $yellows to be a map"; }
      @if meta.type-of(maps.$greens) != "map"  { @error "Expected $greens to be a map"; }
      @if meta.type-of(maps.$teals) != "map"   { @error "Expected $teals to be a map"; }
      @if meta.type-of(maps.$cyans) != "map"   { @error "Expected $cyans to be a map"; }

      @if meta.type-of(maps.$colour-scales) != "map" { @error "Expected $colour-scales to be a map"; }
    `);
  });

  it("registry includes all scales, in order, and references the actual maps", () => {
    expectSassAssertionsPass(`
      $expected-keys: ("grey","blue","indigo","purple","pink","red","orange","yellow","green","teal","cyan");
      $keys: map.keys(maps.$colour-scales);

      @if list.length($keys) != 11 {
        @error "Expected $colour-scales to have 11 keys, got #{list.length($keys)}";
      }

      @for $i from 1 through 11 {
        @if list.nth($keys, $i) != list.nth($expected-keys, $i) {
          @error "Registry key order mismatch at index #{$i}: expected '#{list.nth($expected-keys, $i)}' got '#{list.nth($keys, $i)}'";
        }
      }

      @if map.get(maps.$colour-scales, "grey")   != maps.$greys   { @error "Expected registry 'grey' to reference $greys"; }
      @if map.get(maps.$colour-scales, "blue")   != maps.$blues   { @error "Expected registry 'blue' to reference $blues"; }
      @if map.get(maps.$colour-scales, "indigo") != maps.$indigos { @error "Expected registry 'indigo' to reference $indigos"; }
      @if map.get(maps.$colour-scales, "purple") != maps.$purples { @error "Expected registry 'purple' to reference $purples"; }
      @if map.get(maps.$colour-scales, "pink")   != maps.$pinks   { @error "Expected registry 'pink' to reference $pinks"; }
      @if map.get(maps.$colour-scales, "red")    != maps.$reds    { @error "Expected registry 'red' to reference $reds"; }
      @if map.get(maps.$colour-scales, "orange") != maps.$oranges { @error "Expected registry 'orange' to reference $oranges"; }
      @if map.get(maps.$colour-scales, "yellow") != maps.$yellows { @error "Expected registry 'yellow' to reference $yellows"; }
      @if map.get(maps.$colour-scales, "green")  != maps.$greens  { @error "Expected registry 'green' to reference $greens"; }
      @if map.get(maps.$colour-scales, "teal")   != maps.$teals   { @error "Expected registry 'teal' to reference $teals"; }
      @if map.get(maps.$colour-scales, "cyan")   != maps.$cyans   { @error "Expected registry 'cyan' to reference $cyans"; }
    `);
  });

  it("every scale map contains the expected keys in the expected order", () => {
    expectSassAssertionsPass(`
      @function _expected-keys($prefix, $base-key) {
        @return (
          "#{$prefix}-tint-90",
          "#{$prefix}-tint-80",
          "#{$prefix}-tint-70",
          "#{$prefix}-tint-60",
          "#{$prefix}-tint-50",
          "#{$prefix}-tint-40",
          "#{$prefix}-tint-30",
          "#{$prefix}-tint-20",
          "#{$prefix}-tint-10",
          $base-key,
          "#{$prefix}-shade-10",
          "#{$prefix}-shade-20",
          "#{$prefix}-shade-30",
          "#{$prefix}-shade-40",
          "#{$prefix}-shade-50",
          "#{$prefix}-shade-60",
          "#{$prefix}-shade-70",
          "#{$prefix}-shade-80",
          "#{$prefix}-shade-90"
        );
      }

      @function _assert-keys($m, $expected, $label) {
        $keys: map.keys($m);

        @if list.length($keys) != 19 {
          @error "Expected #{$label} to have 19 entries, got #{list.length($keys)}";
        }

        @for $i from 1 through 19 {
          @if list.nth($keys, $i) != list.nth($expected, $i) {
            @error "Key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
          }
        }

        @return $m;
      }

      $_: _assert-keys(maps.$greys,   _expected-keys("grey",   "base-grey"),   "greys");
      $_: _assert-keys(maps.$blues,   _expected-keys("blue",   "base-blue"),   "blues");
      $_: _assert-keys(maps.$indigos, _expected-keys("indigo", "base-indigo"), "indigos");
      $_: _assert-keys(maps.$purples, _expected-keys("purple", "base-purple"), "purples");
      $_: _assert-keys(maps.$pinks,   _expected-keys("pink",   "base-pink"),   "pinks");
      $_: _assert-keys(maps.$reds,    _expected-keys("red",    "base-red"),    "reds");
      $_: _assert-keys(maps.$oranges, _expected-keys("orange", "base-orange"), "oranges");
      $_: _assert-keys(maps.$yellows, _expected-keys("yellow", "base-yellow"), "yellows");
      $_: _assert-keys(maps.$greens,  _expected-keys("green",  "base-green"),  "greens");
      $_: _assert-keys(maps.$teals,   _expected-keys("teal",   "base-teal"),   "teals");
      $_: _assert-keys(maps.$cyans,   _expected-keys("cyan",   "base-cyan"),   "cyans");
    `);
  });

  it("greys: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}"; }
        @return $a;
      }

      $_: _assert-eq(map.get(maps.$greys, "grey-tint-90"),  tokens.$grey-tint-90,  "greys.grey-tint-90");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-80"),  tokens.$grey-tint-80,  "greys.grey-tint-80");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-70"),  tokens.$grey-tint-70,  "greys.grey-tint-70");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-60"),  tokens.$grey-tint-60,  "greys.grey-tint-60");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-50"),  tokens.$grey-tint-50,  "greys.grey-tint-50");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-40"),  tokens.$grey-tint-40,  "greys.grey-tint-40");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-30"),  tokens.$grey-tint-30,  "greys.grey-tint-30");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-20"),  tokens.$grey-tint-20,  "greys.grey-tint-20");
      $_: _assert-eq(map.get(maps.$greys, "grey-tint-10"),  tokens.$grey-tint-10,  "greys.grey-tint-10");
      $_: _assert-eq(map.get(maps.$greys, "base-grey"),     tokens.$base-grey,     "greys.base-grey");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-10"), tokens.$grey-shade-10, "greys.grey-shade-10");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-20"), tokens.$grey-shade-20, "greys.grey-shade-20");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-30"), tokens.$grey-shade-30, "greys.grey-shade-30");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-40"), tokens.$grey-shade-40, "greys.grey-shade-40");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-50"), tokens.$grey-shade-50, "greys.grey-shade-50");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-60"), tokens.$grey-shade-60, "greys.grey-shade-60");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-70"), tokens.$grey-shade-70, "greys.grey-shade-70");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-80"), tokens.$grey-shade-80, "greys.grey-shade-80");
      $_: _assert-eq(map.get(maps.$greys, "grey-shade-90"), tokens.$grey-shade-90, "greys.grey-shade-90");
    `);
  });

  it("blues: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$blues, "blue-tint-90"),  tokens.$blue-tint-90,  "blues.blue-tint-90");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-80"),  tokens.$blue-tint-80,  "blues.blue-tint-80");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-70"),  tokens.$blue-tint-70,  "blues.blue-tint-70");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-60"),  tokens.$blue-tint-60,  "blues.blue-tint-60");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-50"),  tokens.$blue-tint-50,  "blues.blue-tint-50");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-40"),  tokens.$blue-tint-40,  "blues.blue-tint-40");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-30"),  tokens.$blue-tint-30,  "blues.blue-tint-30");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-20"),  tokens.$blue-tint-20,  "blues.blue-tint-20");
      $_: _assert-eq(map.get(maps.$blues, "blue-tint-10"),  tokens.$blue-tint-10,  "blues.blue-tint-10");
      $_: _assert-eq(map.get(maps.$blues, "base-blue"),     tokens.$base-blue,     "blues.base-blue");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-10"), tokens.$blue-shade-10, "blues.blue-shade-10");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-20"), tokens.$blue-shade-20, "blues.blue-shade-20");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-30"), tokens.$blue-shade-30, "blues.blue-shade-30");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-40"), tokens.$blue-shade-40, "blues.blue-shade-40");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-50"), tokens.$blue-shade-50, "blues.blue-shade-50");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-60"), tokens.$blue-shade-60, "blues.blue-shade-60");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-70"), tokens.$blue-shade-70, "blues.blue-shade-70");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-80"), tokens.$blue-shade-80, "blues.blue-shade-80");
      $_: _assert-eq(map.get(maps.$blues, "blue-shade-90"), tokens.$blue-shade-90, "blues.blue-shade-90");
    `);
  });

  it("indigos: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-90"),  tokens.$indigo-tint-90,  "indigos.indigo-tint-90");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-80"),  tokens.$indigo-tint-80,  "indigos.indigo-tint-80");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-70"),  tokens.$indigo-tint-70,  "indigos.indigo-tint-70");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-60"),  tokens.$indigo-tint-60,  "indigos.indigo-tint-60");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-50"),  tokens.$indigo-tint-50,  "indigos.indigo-tint-50");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-40"),  tokens.$indigo-tint-40,  "indigos.indigo-tint-40");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-30"),  tokens.$indigo-tint-30,  "indigos.indigo-tint-30");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-20"),  tokens.$indigo-tint-20,  "indigos.indigo-tint-20");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-tint-10"),  tokens.$indigo-tint-10,  "indigos.indigo-tint-10");
      $_: _assert-eq(map.get(maps.$indigos, "base-indigo"),     tokens.$base-indigo,     "indigos.base-indigo");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-10"), tokens.$indigo-shade-10, "indigos.indigo-shade-10");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-20"), tokens.$indigo-shade-20, "indigos.indigo-shade-20");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-30"), tokens.$indigo-shade-30, "indigos.indigo-shade-30");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-40"), tokens.$indigo-shade-40, "indigos.indigo-shade-40");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-50"), tokens.$indigo-shade-50, "indigos.indigo-shade-50");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-60"), tokens.$indigo-shade-60, "indigos.indigo-shade-60");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-70"), tokens.$indigo-shade-70, "indigos.indigo-shade-70");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-80"), tokens.$indigo-shade-80, "indigos.indigo-shade-80");
      $_: _assert-eq(map.get(maps.$indigos, "indigo-shade-90"), tokens.$indigo-shade-90, "indigos.indigo-shade-90");
    `);
  });

  it("purples: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$purples, "purple-tint-90"),  tokens.$purple-tint-90,  "purples.purple-tint-90");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-80"),  tokens.$purple-tint-80,  "purples.purple-tint-80");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-70"),  tokens.$purple-tint-70,  "purples.purple-tint-70");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-60"),  tokens.$purple-tint-60,  "purples.purple-tint-60");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-50"),  tokens.$purple-tint-50,  "purples.purple-tint-50");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-40"),  tokens.$purple-tint-40,  "purples.purple-tint-40");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-30"),  tokens.$purple-tint-30,  "purples.purple-tint-30");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-20"),  tokens.$purple-tint-20,  "purples.purple-tint-20");
      $_: _assert-eq(map.get(maps.$purples, "purple-tint-10"),  tokens.$purple-tint-10,  "purples.purple-tint-10");
      $_: _assert-eq(map.get(maps.$purples, "base-purple"),     tokens.$base-purple,     "purples.base-purple");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-10"), tokens.$purple-shade-10, "purples.purple-shade-10");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-20"), tokens.$purple-shade-20, "purples.purple-shade-20");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-30"), tokens.$purple-shade-30, "purples.purple-shade-30");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-40"), tokens.$purple-shade-40, "purples.purple-shade-40");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-50"), tokens.$purple-shade-50, "purples.purple-shade-50");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-60"), tokens.$purple-shade-60, "purples.purple-shade-60");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-70"), tokens.$purple-shade-70, "purples.purple-shade-70");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-80"), tokens.$purple-shade-80, "purples.purple-shade-80");
      $_: _assert-eq(map.get(maps.$purples, "purple-shade-90"), tokens.$purple-shade-90, "purples.purple-shade-90");
    `);
  });

  it("pinks: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-90"),  tokens.$pink-tint-90,  "pinks.pink-tint-90");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-80"),  tokens.$pink-tint-80,  "pinks.pink-tint-80");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-70"),  tokens.$pink-tint-70,  "pinks.pink-tint-70");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-60"),  tokens.$pink-tint-60,  "pinks.pink-tint-60");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-50"),  tokens.$pink-tint-50,  "pinks.pink-tint-50");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-40"),  tokens.$pink-tint-40,  "pinks.pink-tint-40");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-30"),  tokens.$pink-tint-30,  "pinks.pink-tint-30");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-20"),  tokens.$pink-tint-20,  "pinks.pink-tint-20");
      $_: _assert-eq(map.get(maps.$pinks, "pink-tint-10"),  tokens.$pink-tint-10,  "pinks.pink-tint-10");
      $_: _assert-eq(map.get(maps.$pinks, "base-pink"),     tokens.$base-pink,     "pinks.base-pink");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-10"), tokens.$pink-shade-10, "pinks.pink-shade-10");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-20"), tokens.$pink-shade-20, "pinks.pink-shade-20");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-30"), tokens.$pink-shade-30, "pinks.pink-shade-30");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-40"), tokens.$pink-shade-40, "pinks.pink-shade-40");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-50"), tokens.$pink-shade-50, "pinks.pink-shade-50");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-60"), tokens.$pink-shade-60, "pinks.pink-shade-60");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-70"), tokens.$pink-shade-70, "pinks.pink-shade-70");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-80"), tokens.$pink-shade-80, "pinks.pink-shade-80");
      $_: _assert-eq(map.get(maps.$pinks, "pink-shade-90"), tokens.$pink-shade-90, "pinks.pink-shade-90");
    `);
  });

  it("reds: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$reds, "red-tint-90"),  tokens.$red-tint-90,  "reds.red-tint-90");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-80"),  tokens.$red-tint-80,  "reds.red-tint-80");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-70"),  tokens.$red-tint-70,  "reds.red-tint-70");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-60"),  tokens.$red-tint-60,  "reds.red-tint-60");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-50"),  tokens.$red-tint-50,  "reds.red-tint-50");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-40"),  tokens.$red-tint-40,  "reds.red-tint-40");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-30"),  tokens.$red-tint-30,  "reds.red-tint-30");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-20"),  tokens.$red-tint-20,  "reds.red-tint-20");
      $_: _assert-eq(map.get(maps.$reds, "red-tint-10"),  tokens.$red-tint-10,  "reds.red-tint-10");
      $_: _assert-eq(map.get(maps.$reds, "base-red"),     tokens.$base-red,     "reds.base-red");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-10"), tokens.$red-shade-10, "reds.red-shade-10");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-20"), tokens.$red-shade-20, "reds.red-shade-20");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-30"), tokens.$red-shade-30, "reds.red-shade-30");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-40"), tokens.$red-shade-40, "reds.red-shade-40");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-50"), tokens.$red-shade-50, "reds.red-shade-50");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-60"), tokens.$red-shade-60, "reds.red-shade-60");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-70"), tokens.$red-shade-70, "reds.red-shade-70");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-80"), tokens.$red-shade-80, "reds.red-shade-80");
      $_: _assert-eq(map.get(maps.$reds, "red-shade-90"), tokens.$red-shade-90, "reds.red-shade-90");
    `);
  });

  it("oranges: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-90"),  tokens.$orange-tint-90,  "oranges.orange-tint-90");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-80"),  tokens.$orange-tint-80,  "oranges.orange-tint-80");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-70"),  tokens.$orange-tint-70,  "oranges.orange-tint-70");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-60"),  tokens.$orange-tint-60,  "oranges.orange-tint-60");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-50"),  tokens.$orange-tint-50,  "oranges.orange-tint-50");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-40"),  tokens.$orange-tint-40,  "oranges.orange-tint-40");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-30"),  tokens.$orange-tint-30,  "oranges.orange-tint-30");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-20"),  tokens.$orange-tint-20,  "oranges.orange-tint-20");
      $_: _assert-eq(map.get(maps.$oranges, "orange-tint-10"),  tokens.$orange-tint-10,  "oranges.orange-tint-10");
      $_: _assert-eq(map.get(maps.$oranges, "base-orange"),     tokens.$base-orange,     "oranges.base-orange");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-10"), tokens.$orange-shade-10, "oranges.orange-shade-10");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-20"), tokens.$orange-shade-20, "oranges.orange-shade-20");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-30"), tokens.$orange-shade-30, "oranges.orange-shade-30");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-40"), tokens.$orange-shade-40, "oranges.orange-shade-40");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-50"), tokens.$orange-shade-50, "oranges.orange-shade-50");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-60"), tokens.$orange-shade-60, "oranges.orange-shade-60");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-70"), tokens.$orange-shade-70, "oranges.orange-shade-70");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-80"), tokens.$orange-shade-80, "oranges.orange-shade-80");
      $_: _assert-eq(map.get(maps.$oranges, "orange-shade-90"), tokens.$orange-shade-90, "oranges.orange-shade-90");
    `);
  });

  it("yellows: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-90"),  tokens.$yellow-tint-90,  "yellows.yellow-tint-90");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-80"),  tokens.$yellow-tint-80,  "yellows.yellow-tint-80");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-70"),  tokens.$yellow-tint-70,  "yellows.yellow-tint-70");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-60"),  tokens.$yellow-tint-60,  "yellows.yellow-tint-60");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-50"),  tokens.$yellow-tint-50,  "yellows.yellow-tint-50");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-40"),  tokens.$yellow-tint-40,  "yellows.yellow-tint-40");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-30"),  tokens.$yellow-tint-30,  "yellows.yellow-tint-30");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-20"),  tokens.$yellow-tint-20,  "yellows.yellow-tint-20");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-tint-10"),  tokens.$yellow-tint-10,  "yellows.yellow-tint-10");
      $_: _assert-eq(map.get(maps.$yellows, "base-yellow"),     tokens.$base-yellow,     "yellows.base-yellow");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-10"), tokens.$yellow-shade-10, "yellows.yellow-shade-10");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-20"), tokens.$yellow-shade-20, "yellows.yellow-shade-20");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-30"), tokens.$yellow-shade-30, "yellows.yellow-shade-30");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-40"), tokens.$yellow-shade-40, "yellows.yellow-shade-40");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-50"), tokens.$yellow-shade-50, "yellows.yellow-shade-50");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-60"), tokens.$yellow-shade-60, "yellows.yellow-shade-60");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-70"), tokens.$yellow-shade-70, "yellows.yellow-shade-70");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-80"), tokens.$yellow-shade-80, "yellows.yellow-shade-80");
      $_: _assert-eq(map.get(maps.$yellows, "yellow-shade-90"), tokens.$yellow-shade-90, "yellows.yellow-shade-90");
    `);
  });

  it("greens: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$greens, "green-tint-90"),  tokens.$green-tint-90,  "greens.green-tint-90");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-80"),  tokens.$green-tint-80,  "greens.green-tint-80");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-70"),  tokens.$green-tint-70,  "greens.green-tint-70");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-60"),  tokens.$green-tint-60,  "greens.green-tint-60");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-50"),  tokens.$green-tint-50,  "greens.green-tint-50");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-40"),  tokens.$green-tint-40,  "greens.green-tint-40");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-30"),  tokens.$green-tint-30,  "greens.green-tint-30");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-20"),  tokens.$green-tint-20,  "greens.green-tint-20");
      $_: _assert-eq(map.get(maps.$greens, "green-tint-10"),  tokens.$green-tint-10,  "greens.green-tint-10");
      $_: _assert-eq(map.get(maps.$greens, "base-green"),     tokens.$base-green,     "greens.base-green");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-10"), tokens.$green-shade-10, "greens.green-shade-10");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-20"), tokens.$green-shade-20, "greens.green-shade-20");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-30"), tokens.$green-shade-30, "greens.green-shade-30");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-40"), tokens.$green-shade-40, "greens.green-shade-40");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-50"), tokens.$green-shade-50, "greens.green-shade-50");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-60"), tokens.$green-shade-60, "greens.green-shade-60");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-70"), tokens.$green-shade-70, "greens.green-shade-70");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-80"), tokens.$green-shade-80, "greens.green-shade-80");
      $_: _assert-eq(map.get(maps.$greens, "green-shade-90"), tokens.$green-shade-90, "greens.green-shade-90");
    `);
  });

  it("teals: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$teals, "teal-tint-90"),  tokens.$teal-tint-90,  "teals.teal-tint-90");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-80"),  tokens.$teal-tint-80,  "teals.teal-tint-80");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-70"),  tokens.$teal-tint-70,  "teals.teal-tint-70");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-60"),  tokens.$teal-tint-60,  "teals.teal-tint-60");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-50"),  tokens.$teal-tint-50,  "teals.teal-tint-50");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-40"),  tokens.$teal-tint-40,  "teals.teal-tint-40");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-30"),  tokens.$teal-tint-30,  "teals.teal-tint-30");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-20"),  tokens.$teal-tint-20,  "teals.teal-tint-20");
      $_: _assert-eq(map.get(maps.$teals, "teal-tint-10"),  tokens.$teal-tint-10,  "teals.teal-tint-10");
      $_: _assert-eq(map.get(maps.$teals, "base-teal"),     tokens.$base-teal,     "teals.base-teal");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-10"), tokens.$teal-shade-10, "teals.teal-shade-10");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-20"), tokens.$teal-shade-20, "teals.teal-shade-20");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-30"), tokens.$teal-shade-30, "teals.teal-shade-30");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-40"), tokens.$teal-shade-40, "teals.teal-shade-40");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-50"), tokens.$teal-shade-50, "teals.teal-shade-50");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-60"), tokens.$teal-shade-60, "teals.teal-shade-60");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-70"), tokens.$teal-shade-70, "teals.teal-shade-70");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-80"), tokens.$teal-shade-80, "teals.teal-shade-80");
      $_: _assert-eq(map.get(maps.$teals, "teal-shade-90"), tokens.$teal-shade-90, "teals.teal-shade-90");
    `);
  });

  it("cyans: every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) { @if $a != $b { @error "Value mismatch for #{$label}"; } @return $a; }

      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-90"),  tokens.$cyan-tint-90,  "cyans.cyan-tint-90");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-80"),  tokens.$cyan-tint-80,  "cyans.cyan-tint-80");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-70"),  tokens.$cyan-tint-70,  "cyans.cyan-tint-70");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-60"),  tokens.$cyan-tint-60,  "cyans.cyan-tint-60");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-50"),  tokens.$cyan-tint-50,  "cyans.cyan-tint-50");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-40"),  tokens.$cyan-tint-40,  "cyans.cyan-tint-40");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-30"),  tokens.$cyan-tint-30,  "cyans.cyan-tint-30");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-20"),  tokens.$cyan-tint-20,  "cyans.cyan-tint-20");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-tint-10"),  tokens.$cyan-tint-10,  "cyans.cyan-tint-10");
      $_: _assert-eq(map.get(maps.$cyans, "base-cyan"),     tokens.$base-cyan,     "cyans.base-cyan");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-10"), tokens.$cyan-shade-10, "cyans.cyan-shade-10");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-20"), tokens.$cyan-shade-20, "cyans.cyan-shade-20");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-30"), tokens.$cyan-shade-30, "cyans.cyan-shade-30");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-40"), tokens.$cyan-shade-40, "cyans.cyan-shade-40");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-50"), tokens.$cyan-shade-50, "cyans.cyan-shade-50");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-60"), tokens.$cyan-shade-60, "cyans.cyan-shade-60");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-70"), tokens.$cyan-shade-70, "cyans.cyan-shade-70");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-80"), tokens.$cyan-shade-80, "cyans.cyan-shade-80");
      $_: _assert-eq(map.get(maps.$cyans, "cyan-shade-90"), tokens.$cyan-shade-90, "cyans.cyan-shade-90");
    `);
  });

  it("all maps: every entry is a color, and ramp integrity holds (uniqueness + monotonic darkening)", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-is-color($value, $name) {
        @if meta.type-of($value) != "color" {
          @error "Expected #{$name} to be a Sass color, got #{meta.type-of($value)}";
        }
        @return $value;
      }

      @function _l($c) {
        @return color.channel($c, "lightness", $space: hsl);
      }

      @function _assert-unique($values, $label) {
        $len: list.length($values);
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          @for $j from ($i + 1) through $len {
            @if list.nth($values, $i) == list.nth($values, $j) {
              @error "Duplicate value found in #{$label} at positions #{$i} and #{$j}";
            }
          }
        }

        @return $values;
      }

      // Ensures the list gets strictly darker as you progress through the list.
      @function _assert-monotonic-darker($values, $label) {
        $len: list.length($values);
        @if $len <= 1 { @return $values; }

        @for $i from 1 through ($len - 1) {
          $a: _assert-is-color(list.nth($values, $i), "#{$label}[#{$i}]");
          $b: _assert-is-color(list.nth($values, $i + 1), "#{$label}[#{$i + 1}]");

          $la: _l($a);
          $lb: _l($b);

          @if $lb >= $la {
            @error "Ramp integrity failure in #{$label}: expected step #{$i + 1} darker than step #{$i} (lightness #{$lb} >= #{$la})";
          }
        }

        @return $values;
      }

      @mixin _assert-map-integrity($scale-name, $m) {
        // Type check all entries.
        @each $k, $v in $m {
          $_: _assert-is-color($v, "#{$scale-name}.#{$k}");
        }

        // Build ordered tint/shade lists from the map (keys are guaranteed by earlier test).
        $tints: (
          map.get($m, "#{$scale-name}-tint-90"),
          map.get($m, "#{$scale-name}-tint-80"),
          map.get($m, "#{$scale-name}-tint-70"),
          map.get($m, "#{$scale-name}-tint-60"),
          map.get($m, "#{$scale-name}-tint-50"),
          map.get($m, "#{$scale-name}-tint-40"),
          map.get($m, "#{$scale-name}-tint-30"),
          map.get($m, "#{$scale-name}-tint-20"),
          map.get($m, "#{$scale-name}-tint-10")
        );

        $shades: (
          map.get($m, "#{$scale-name}-shade-10"),
          map.get($m, "#{$scale-name}-shade-20"),
          map.get($m, "#{$scale-name}-shade-30"),
          map.get($m, "#{$scale-name}-shade-40"),
          map.get($m, "#{$scale-name}-shade-50"),
          map.get($m, "#{$scale-name}-shade-60"),
          map.get($m, "#{$scale-name}-shade-70"),
          map.get($m, "#{$scale-name}-shade-80"),
          map.get($m, "#{$scale-name}-shade-90")
        );

        $_: _assert-unique($tints, "#{$scale-name} tints");
        $_: _assert-unique($shades, "#{$scale-name} shades");
        $_: _assert-monotonic-darker($tints, "#{$scale-name} tints (90->10)");
        $_: _assert-monotonic-darker($shades, "#{$scale-name} shades (10->90)");
      }

      // Greys are special: base key differs from scale-name.
      @mixin _assert-greys-integrity($m) {
        @each $k, $v in $m { $_: _assert-is-color($v, "grey.#{$k}"); }

        $tints: (
          map.get($m, "grey-tint-90"),
          map.get($m, "grey-tint-80"),
          map.get($m, "grey-tint-70"),
          map.get($m, "grey-tint-60"),
          map.get($m, "grey-tint-50"),
          map.get($m, "grey-tint-40"),
          map.get($m, "grey-tint-30"),
          map.get($m, "grey-tint-20"),
          map.get($m, "grey-tint-10")
        );

        $shades: (
          map.get($m, "grey-shade-10"),
          map.get($m, "grey-shade-20"),
          map.get($m, "grey-shade-30"),
          map.get($m, "grey-shade-40"),
          map.get($m, "grey-shade-50"),
          map.get($m, "grey-shade-60"),
          map.get($m, "grey-shade-70"),
          map.get($m, "grey-shade-80"),
          map.get($m, "grey-shade-90")
        );

        $_: _assert-unique($tints, "grey tints");
        $_: _assert-unique($shades, "grey shades");
        $_: _assert-monotonic-darker($tints, "grey tints (90->10)");
        $_: _assert-monotonic-darker($shades, "grey shades (10->90)");
      }

      @include _assert-greys-integrity(maps.$greys);
      @include _assert-map-integrity("blue", maps.$blues);
      @include _assert-map-integrity("indigo", maps.$indigos);
      @include _assert-map-integrity("purple", maps.$purples);
      @include _assert-map-integrity("pink", maps.$pinks);
      @include _assert-map-integrity("red", maps.$reds);
      @include _assert-map-integrity("orange", maps.$oranges);
      @include _assert-map-integrity("yellow", maps.$yellows);
      @include _assert-map-integrity("green", maps.$greens);
      @include _assert-map-integrity("teal", maps.$teals);
      @include _assert-map-integrity("cyan", maps.$cyans);
    `);
  });
});
