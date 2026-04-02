// tests/scss/tokens/spacing.spec.ts
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
    @use "tokens/spacing" as spacing;
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

describe("tokens/spacing", () => {
  it("matches the base spacing token exactly", () => {
    expectSassAssertionsPass(`
      @if spacing.$base-spacing != 1rem {
        @error "Expected $base-spacing to be 1rem";
      }
    `);
  });

  it("enforces token type and unit expectations", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-number($value, $name) {
        @if meta.type-of($value) != "number" {
          @error "Expected #{$name} to be a number, got #{meta.type-of($value)}";
        }
        @return $value;
      }

      @function _assert-has-unit($value, $name) {
        @if math.is-unitless($value) {
          @error "Expected #{$name} to have a unit (length), got unitless number";
        }
        @return $value;
      }

      // ---------------------------------------------------------------------
      // Type + unit checks
      // ---------------------------------------------------------------------

      $_: _assert-number(spacing.$base-spacing, "$base-spacing");
      $_: _assert-has-unit(spacing.$base-spacing, "$base-spacing");

      // Ensure the unit is rem by normalising against 1rem.
      // If units are incompatible, math.div() will error.
      $_: math.div(spacing.$base-spacing, 1rem);
    `);
  });

  it("enforces value sanity", () => {
    expectSassAssertionsPass(`
      // ---------------------------------------------------------------------
      // Helpers
      // ---------------------------------------------------------------------

      @function _assert-positive($value, $name) {
        @if $value <= 0 {
          @error "Expected #{$name} to be > 0, got #{$value}";
        }
        @return $value;
      }

      @function _assert-not-zero($value, $name) {
        @if $value == 0 {
          @error "Expected #{$name} to be non-zero";
        }
        @return $value;
      }

      // ---------------------------------------------------------------------
      // Sanity checks
      // ---------------------------------------------------------------------

      $_: _assert-not-zero(spacing.$base-spacing, "$base-spacing");
      $_: _assert-positive(spacing.$base-spacing, "$base-spacing");
    `);
  });

  it("supports deterministic derivations from the base token", () => {
    expectSassAssertionsPass(`
      $half: spacing.$base-spacing * 0.5;
      $double: spacing.$base-spacing * 2;

      @if $half != 0.5rem {
        @error "Expected $base-spacing * 0.5 to equal 0.5rem, got #{$half}";
      }

      @if $double != 2rem {
        @error "Expected $base-spacing * 2 to equal 2rem, got #{$double}";
      }
    `);
  });
});
