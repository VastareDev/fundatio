import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "tokens/dark-theme" as tokens;
    @use "maps/dark-theme" as maps;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}
      .__test__ { content: "ok"; }
      `,
      header
    );
  }).not.toThrow();
}

describe("maps/dark-theme", () => {
  it("exports theme map", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$theme) != "map" {
        @error "Expected $theme map";
      }
    `);
  });

  it("has correct top level keys", () => {
    expectSassAssertionsPass(`
      $expected: ("feature-flags","namespace","colours");
      $keys: map.keys(maps.$theme);

      @if $keys != $expected {
        @error "Unexpected keys in dark theme map";
      }
    `);
  });

  it("values match token source", () => {
    expectSassAssertionsPass(`
      $feature: map.get(maps.$theme, "feature-flags");
      $namespace: map.get(maps.$theme, "namespace");
      $colours: map.get(maps.$theme, "colours");

      @if map.get($feature, "dark-mode") != tokens.$theme-dark-mode {
        @error "dark-mode mismatch";
      }

      @if map.get($namespace, "theme-prefix") != tokens.$theme-prefix {
        @error "prefix mismatch";
      }

      @if map.get($colours, "body-bg-color") != tokens.$body-bg-color { @error "body-bg mismatch"; }
      @if map.get($colours, "base-font-color") != tokens.$base-font-color { @error "font mismatch"; }
      @if map.get($colours, "code-font-color") != tokens.$code-font-color { @error "code mismatch"; }
      @if map.get($colours, "heading-font-color") != tokens.$heading-font-color { @error "heading mismatch"; }
    `);
  });
});
