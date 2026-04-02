// tests/scss/tokens/dark-theme.spec.ts
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
function expectSassAssertionsPass(snippet: string, header?: string): void {
  const defaultHeader = `
    @use "tokens/dark-theme" as theme;
    @use "tokens/colours" as colours;
    @use "tokens/theme" as base;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_token_test__ { content: "ok"; }
    `,
      header ?? defaultHeader
    );
  }).not.toThrow();
}

describe("tokens/dark-theme", () => {
  it("enables dark mode and applies the expected dark colour roles", () => {
    expectSassAssertionsPass(`
      // Flag must be enabled by the preset.
      @if theme.$theme-dark-mode != true { @error "Expected $theme-dark-mode to be true in dark-theme preset"; }

      // Structural colours (dark preset)
      @if theme.$body-bg-color != colours.$grey-shade-80 { @error "Expected $body-bg-color to equal colours.$grey-shade-80"; }
      @if theme.$base-font-color != colours.$grey-tint-80 { @error "Expected $base-font-color to equal colours.$grey-tint-80"; }
      @if theme.$code-font-color != colours.$grey-tint-80 { @error "Expected $code-font-color to equal colours.$grey-tint-80"; }
      @if theme.$heading-font-color != colours.$grey-tint-80 { @error "Expected $heading-font-color to equal colours.$grey-tint-80"; }

      // Brand colours (should remain canonical)
      @if theme.$primary-colour != colours.$base-blue { @error "Expected $primary-colour to equal colours.$base-blue"; }
      @if theme.$secondary-colour != colours.$base-indigo { @error "Expected $secondary-colour to equal colours.$base-indigo"; }
      @if theme.$tertiary-colour != colours.$base-purple { @error "Expected $tertiary-colour to equal colours.$base-purple"; }

      // State colours (should remain canonical)
      @if theme.$success-colour != colours.$base-green { @error "Expected $success-colour to equal colours.$base-green"; }
      @if theme.$info-colour != colours.$base-cyan { @error "Expected $info-colour to equal colours.$base-cyan"; }
      @if theme.$warning-colour != colours.$base-orange { @error "Expected $warning-colour to equal colours.$base-orange"; }
      @if theme.$danger-colour != colours.$base-red { @error "Expected $danger-colour to equal colours.$base-red"; }
    `);
  });

  it("preserves the underlying theme contract for non-overridden primitives", () => {
    expectSassAssertionsPass(`
      // Prefix & font roles should match the base theme defaults unless explicitly overridden by the preset.
      @if theme.$theme-prefix != base.$theme-prefix { @error "Expected $theme-prefix to match tokens/theme default"; }

      @if theme.$base-font != base.$base-font { @error "Expected $base-font to match tokens/theme default"; }
      @if theme.$heading-font != base.$heading-font { @error "Expected $heading-font to match tokens/theme default"; }
      @if theme.$code-font != base.$code-font { @error "Expected $code-font to match tokens/theme default"; }

      // Asset base path & source paths should match base defaults.
      @if theme.$base-font-path != base.$base-font-path { @error "Expected $base-font-path to match tokens/theme default"; }

      @if theme.$base-font-normal-stem != base.$base-font-normal-stem { @error "Expected $base-font-woff2-path to match tokens/theme default"; }
      @if theme.$base-font-italic-stem != base.$base-font-italic-stem { @error "Expected $base-font-ttf-path to match tokens/theme default"; }
      @if theme.$heading-font-normal-stem != base.$heading-font-normal-stem { @error "Expected $base-font-italic-woff2-path to match tokens/theme default"; }
      @if theme.$heading-font-italic-stem != base.$heading-font-italic-stem { @error "Expected $base-font-italic-ttf-path to match tokens/theme default"; }

      @if theme.$code-font-normal-stem != base.$code-font-normal-stem { @error "Expected $heading-font-woff2-path to match tokens/theme default"; }
      @if theme.$code-font-italic-stem != base.$code-font-italic-stem { @error "Expected $heading-font-ttf-path to match tokens/theme default"; }
          `);
  });

  it("supports consumer overrides by configuring tokens/theme directly", () => {
    const header = `
      @use "tokens/colours" as colours;

      // Consumer chooses not to use the preset, and configures the contract directly.
      @use "tokens/theme" as theme with (
        $theme-dark-mode: true,
        $body-bg-color: colours.$grey-shade-80,
        $base-font-color: colours.$grey-tint-80,
        $primary-colour: colours.$base-red
      );
    `;

    expectSassAssertionsPass(
      `
      @if theme.$theme-dark-mode != true { @error "Expected override: $theme-dark-mode to be true"; }
      @if theme.$body-bg-color != colours.$grey-shade-80 { @error "Expected override: $body-bg-color to be grey-shade-80"; }
      @if theme.$base-font-color != colours.$grey-tint-80 { @error "Expected override: $base-font-color to be grey-tint-80"; }
      @if theme.$primary-colour != colours.$base-red { @error "Expected override: $primary-colour to be base-red"; }
      `,
      header
    );
  });
});
