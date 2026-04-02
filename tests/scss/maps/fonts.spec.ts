import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassAssertionsPass(snippet: string): void {
  const header = `
        @use "maps/fonts" as maps;
    @use "tokens/theme" as theme;
  `;

  expect(() => {
    runSass(`${snippet}
.__sol_maps_test__ { content: "ok"; }`, header);
  }).not.toThrow();
}

describe("maps/fonts", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$base-fonts) != "map" { @error "Expected $base-fonts to be a map"; }
      @if meta.type-of(maps.$heading-fonts) != "map" { @error "Expected $heading-fonts to be a map"; }
      @if meta.type-of(maps.$code-fonts) != "map" { @error "Expected $code-fonts to be a map"; }
      @if meta.type-of(maps.$fonts) != "map" { @error "Expected $fonts to be a map"; }
    `);
  });

  it("registry contains expected keys in the expected order and references the actual maps", () => {
    expectSassAssertionsPass(`
      @if map.keys(maps.$fonts) != ("base", "headings", "code") { @error "Unexpected registry keys"; }
      @if map.get(maps.$fonts, "base") != maps.$base-fonts { @error "Registry/base mismatch"; }
      @if map.get(maps.$fonts, "headings") != maps.$heading-fonts { @error "Registry/headings mismatch"; }
      @if map.get(maps.$fonts, "code") != maps.$code-fonts { @error "Registry/code mismatch"; }
    `);
  });

  it("group maps contain expected variant keys in the expected order", () => {
    expectSassAssertionsPass(`
      @if map.keys(maps.$base-fonts) != ("normal", "italic") { @error "Unexpected base variants"; }
      @if map.keys(maps.$heading-fonts) != ("normal", "italic") { @error "Unexpected heading variants"; }
      @if map.keys(maps.$code-fonts) != ("normal", "italic") { @error "Unexpected code variants"; }
    `);
  });

  it("descriptor maps contain expected keys and sources keys in the expected order", () => {
    expectSassAssertionsPass(`
      $desc: map.get(maps.$base-fonts, "normal");
      @if map.keys($desc) != ("family", "display", "style", "weight", "sources") { @error "Unexpected descriptor keys"; }
      @if map.keys(map.get($desc, "sources")) != (theme.$font-package-format,) { @error "Unexpected source keys"; }
    `);
  });

  it("every entry matches canonical token/theme values exactly", () => {
    expectSassAssertionsPass(`
      $bn: map.get(maps.$base-fonts, "normal");
      @if map.get($bn, "family") != theme.$base-font { @error "Base family mismatch"; }
      @if map.get(map.get($bn, "sources"), theme.$font-package-format) != "#{theme.$base-font-normal-stem}.#{theme.$font-package-format}" { @error "Base normal source mismatch"; }

      $bi: map.get(maps.$base-fonts, "italic");
      @if map.get(map.get($bi, "sources"), theme.$font-package-format) != "#{theme.$base-font-italic-stem}.#{theme.$font-package-format}" { @error "Base italic source mismatch"; }
    `);
  });

  it("all maps: types are correct and integrity rules hold", () => {
    expectSassAssertionsPass(`
      @function _assert-type($value, $expected, $label) {
        @if meta.type-of($value) != $expected { @error "Expected #{$label} to be type '#{$expected}', got '#{meta.type-of($value)}'"; }
        @return $value;
      }
      @each $group, $group-map in maps.$fonts {
        $_: _assert-type($group-map, "map", $group);
        @each $variant, $desc in $group-map {
          $_: _assert-type($desc, "map", "#{$group}.#{$variant}");
          $_: _assert-type(map.get($desc, "sources"), "map", "#{$group}.#{$variant}.sources");
          @each $fmt, $path in map.get($desc, "sources") {
            $_: _assert-type($fmt, "string", "format key");
            $_: _assert-type($path, "string", "path value");
          }
        }
      }
    `);
  });
});
