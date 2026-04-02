import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassAssertionsPass(snippet: string): void {
  const header = `
        @use "maps/theme" as maps;
    @use "tokens/theme" as tokens;
  `;

  expect(() => {
    runSass(`${snippet}
.__sol_maps_test__ { content: "ok"; }`, header);
  }).not.toThrow();
}

describe("maps/theme", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$theme) != "map" { @error "Expected $theme to be a map"; }
      @if meta.type-of(maps.$font-sources) != "map" { @error "Expected $font-sources to be a map"; }
    `);
  });

  it("contains expected registry keys and font-source structure", () => {
    expectSassAssertionsPass(`
      @if map.has-key(maps.$theme, "font-sources") == false { @error "Missing font-sources group"; }
      $sources: map.get(maps.$theme, "font-sources");
      @if map.has-key($sources, "base") == false { @error "Missing base font sources"; }
      @if map.has-key(map.get($sources, "base"), "normal") == false { @error "Missing base normal map"; }
    `);
  });

  it("every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @if map.get(maps.$font-families, "base-font") != tokens.$base-font { @error "base-font mismatch"; }
      @if map.get(maps.$font-families, "font-package-format") != tokens.$font-package-format { @error "font-package-format mismatch"; }
      @if map.get(maps.$asset-paths, "base-font-path") != tokens.$base-font-path { @error "base-font-path mismatch"; }
      @if map.get(map.get(map.get(maps.$font-sources, "base"), "normal"), tokens.$font-package-format) != "#{tokens.$base-font-normal-stem}.#{tokens.$font-package-format}" { @error "base normal source mismatch"; }
    `);
  });

  it("font-source maps contain non-empty active-format values", () => {
    expectSassAssertionsPass(`
      $path: map.get(map.get(map.get(maps.$font-sources, "base"), "normal"), tokens.$font-package-format);
      @if meta.type-of($path) != "string" or $path == "" { @error "Expected non-empty active-format font source path"; }
    `);
  });
});
