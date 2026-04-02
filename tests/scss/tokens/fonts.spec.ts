// tests/scss/tokens/fonts.spec.ts
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
    @use "tokens/fonts" as fonts;
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

describe("tokens/fonts", () => {
  it("matches shared font-face primitives exactly", () => {
    expectSassAssertionsPass(`
      @if fonts.$font-display != "swap" { @error "Expected $font-display to be 'swap'"; }

      @if fonts.$font-style-normal != "normal" { @error "Expected $font-style-normal to be 'normal'"; }
      @if fonts.$font-style-italic != "italic" { @error "Expected $font-style-italic to be 'italic'"; }

      // Variable font weight range (list) must match exactly.
      @if fonts.$font-weight-range != (100 900) {
        @error "Expected $font-weight-range to be (100 900)";
      }
    `);
  });

  it("enforces token types", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(fonts.$font-display) != "string" {
        @error "Expected $font-display to be type 'string', got '#{meta.type-of(fonts.$font-display)}'";
      }

      @if meta.type-of(fonts.$font-style-normal) != "string" {
        @error "Expected $font-style-normal to be type 'string', got '#{meta.type-of(fonts.$font-style-normal)}'";
      }

      @if meta.type-of(fonts.$font-style-italic) != "string" {
        @error "Expected $font-style-italic to be type 'string', got '#{meta.type-of(fonts.$font-style-italic)}'";
      }

      @if meta.type-of(fonts.$font-weight-range) != "list" {
        @error "Expected $font-weight-range to be type 'list', got '#{meta.type-of(fonts.$font-weight-range)}'";
      }
    `);
  });

  it("enforces style token integrity", () => {
    expectSassAssertionsPass(`
      // Style tokens should be distinct.
      @if fonts.$font-style-normal == fonts.$font-style-italic {
        @error "Expected $font-style-normal and $font-style-italic to be different values";
      }

      // Display value is intentionally strict. If you want more options later, update tests.
      $allowed-display: ("swap", "block", "fallback", "optional", "auto");
      @if list.index($allowed-display, fonts.$font-display) == null {
        @error "Unexpected $font-display '#{fonts.$font-display}'. Expected one of: #{$allowed-display}";
      }
    `);
  });

  it("enforces variable weight range integrity (two-number list, ascending, sane bounds)", () => {
    expectSassAssertionsPass(`
      $range: fonts.$font-weight-range;

      @if list.length($range) != 2 {
        @error "Expected $font-weight-range to contain exactly 2 items, got #{list.length($range)}";
      }

      $min: list.nth($range, 1);
      $max: list.nth($range, 2);

      @if meta.type-of($min) != "number" or meta.type-of($max) != "number" {
        @error "Expected $font-weight-range items to be numbers, got '#{meta.type-of($min)}' and '#{meta.type-of($max)}'";
      }

      // Keep it strict: font-weight range should be unitless.
      @if not math.is-unitless($min) or not math.is-unitless($max) {
        @error "Expected $font-weight-range values to be unitless numbers";
      }

      @if $min >= $max {
        @error "Expected $font-weight-range to be ascending (min < max), got #{$min} #{$max}";
      }

      // Sanity constraints: CSS font-weight ranges.
      @if $min < 1 or $max > 1000 {
        @error "Expected $font-weight-range within CSS font-weight bounds (1..1000), got #{$min} #{$max}";
      }

      // Montserrat variable files typically ship 100..900, so we enforce 'hundreds'.
      @if ($min % 100) != 0 or ($max % 100) != 0 {
        @error "Expected $font-weight-range values to be multiples of 100, got #{$min} #{$max}";
      }
    `);
  });
});
