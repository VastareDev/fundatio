// tests/scss/maps/options.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If an assertion fails, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks and to keep
 * failures pinned to the token/map layer (not JS parsing).
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "maps/options" as maps;
    @use "tokens/options" as tokens;
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

describe("maps/options", () => {
  it("exports the expected top-level registry map", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$options) != "map" {
        @error "Expected $options to be a map";
      }
    `);
  });

  it("registry contains the expected keys in the expected order", () => {
    expectSassAssertionsPass(`
      $expected: ("prefix", "dark-mode", "font-path");
      $keys: map.keys(maps.$options);

      @if list.length($keys) != list.length($expected) {
        @error "Expected $options to have #{list.length($expected)} keys, got #{list.length($keys)}";
      }

      @for $i from 1 through list.length($expected) {
        @if list.nth($keys, $i) != list.nth($expected, $i) {
          @error "Key order mismatch in $options at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
        }
      }
    `);
  });

  it("every registry entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _assert-eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}"; }
        @return $a;
      }

      $_: _assert-eq(map.get(maps.$options, "prefix"), tokens.$sol-prefix, "options.prefix");
      $_: _assert-eq(map.get(maps.$options, "dark-mode"), tokens.$dark-mode, "options.dark-mode");
      $_: _assert-eq(map.get(maps.$options, "font-path"), tokens.$font-path, "options.font-path");
    `);
  });

  it("types are correct and no unexpected entries exist", () => {
    expectSassAssertionsPass(`
      @function _assert-type($value, $expected, $label) {
        @if meta.type-of($value) != $expected {
          @error "Expected #{$label} to be type '#{$expected}', got '#{meta.type-of($value)}'";
        }
        @return $value;
      }

      // Ensure no missing or extra keys by re-checking key count + membership.
      $expected: ("prefix", "dark-mode", "font-path");
      $keys: map.keys(maps.$options);

      @if list.length($keys) != 3 {
        @error "Expected $options to have exactly 3 entries, got #{list.length($keys)}";
      }

      @each $k in $expected {
        @if map.has-key(maps.$options, $k) == false {
          @error "Missing expected key in $options: '#{$k}'";
        }
      }

      // Type assertions.
      $_: _assert-type(map.get(maps.$options, "prefix"), "string", "options.prefix");
      $_: _assert-type(map.get(maps.$options, "dark-mode"), "bool", "options.dark-mode");
      $_: _assert-type(map.get(maps.$options, "font-path"), "string", "options.font-path");
    `);
  });

  it("integrity: values are sensible and non-empty where required", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-non-empty-string($value, $label) {
        @if meta.type-of($value) != "string" {
          @error "Expected #{$label} to be a string, got '#{meta.type-of($value)}'";
        }

        // Sass strings can be empty ("") or whitespace; whitespace-only checks
        // are overkill here, but empty string is never useful for options.
        @if $value == "" {
          @error "Expected #{$label} to be non-empty";
        }

        @return $value;
      }

      @function _assert-bool($value, $label) {
        @if meta.type-of($value) != "bool" {
          @error "Expected #{$label} to be a bool, got '#{meta.type-of($value)}'";
        }
        @return $value;
      }

      // ---------------------------------------------------------------------
      // Integrity checks
      // ---------------------------------------------------------------------

      $_: _assert-non-empty-string(map.get(maps.$options, "prefix"), "options.prefix");
      $_: _assert-bool(map.get(maps.$options, "dark-mode"), "options.dark-mode");
      $_: _assert-non-empty-string(map.get(maps.$options, "font-path"), "options.font-path");
    `);
  });
});
