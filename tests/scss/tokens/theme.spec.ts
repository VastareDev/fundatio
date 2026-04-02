// tests/scss/tokens/theme.spec.ts
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
    @use "tokens/theme" as theme;
    @use "tokens/colours" as colours;
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

describe("tokens/theme", () => {
  it("matches default primitive values exactly", () => {
    expectSassAssertionsPass(`
      // Flags & prefix
      @if theme.$theme-dark-mode != false { @error "Expected $theme-dark-mode default to be false"; }
      @if theme.$theme-prefix != "vs-" { @error "Expected $theme-prefix default to be \\"vs-\\""; }

      // Font family roles
      @if theme.$base-font != "Montserrat" { @error "Expected $base-font default to be \\"Montserrat\\""; }
      @if theme.$heading-font != "Montserrat" { @error "Expected $heading-font default to be \\"Montserrat\\""; }
      @if theme.$code-font != "ui-monospace" { @error "Expected $code-font default to be \\"ui-monospace\\""; }

      // Asset base path
      @if theme.$base-font-path != "../assets/fonts" { @error "Expected $base-font-path default to be \\"../assets/fonts\\""; }

      // Base font paths
      @if theme.$base-font-woff2-path != "montserrat/Montserrat-Variable-Font.woff2" { @error "Expected $base-font-woff2-path default to match"; }
      @if theme.$base-font-ttf-path  != "montserrat/Montserrat-Variable-Font.ttf"  { @error "Expected $base-font-ttf-path default to match"; }
      @if theme.$base-font-italic-woff2-path != "montserrat/Montserrat-Variable-Italic-Font.woff2" { @error "Expected $base-font-italic-woff2-path default to match"; }
      @if theme.$base-font-italic-ttf-path  != "montserrat/Montserrat-Variable-Italic-Font.ttf"  { @error "Expected $base-font-italic-ttf-path default to match"; }

      // Heading font paths
      @if theme.$heading-font-woff2-path != "montserrat/Montserrat-Variable-Font.woff2" { @error "Expected $heading-font-woff2-path default to match"; }
      @if theme.$heading-font-ttf-path  != "montserrat/Montserrat-Variable-Font.ttf"  { @error "Expected $heading-font-ttf-path default to match"; }
      @if theme.$heading-font-italic-woff2-path != "montserrat/Montserrat-Variable-Italic-Font.woff2" { @error "Expected $heading-font-italic-woff2-path default to match"; }
      @if theme.$heading-font-italic-ttf-path  != "montserrat/Montserrat-Variable-Italic-Font.ttf"  { @error "Expected $heading-font-italic-ttf-path default to match"; }

      // Code font paths
      @if theme.$code-font-woff2-path != "montserrat/Montserrat-Variable-Font.woff2" { @error "Expected $code-font-woff2-path default to match"; }
      @if theme.$code-font-ttf-path  != "montserrat/Montserrat-Variable-Font.ttf"  { @error "Expected $code-font-ttf-path default to match"; }
      @if theme.$code-font-italic-woff2-path != "montserrat/Montserrat-Variable-Italic-Font.woff2" { @error "Expected $code-font-italic-woff2-path default to match"; }
      @if theme.$code-font-italic-ttf-path  != "montserrat/Montserrat-Variable-Italic-Font.ttf"  { @error "Expected $code-font-italic-ttf-path default to match"; }
    `);
  });

  it("locks default colour roles to canonical colour tokens", () => {
    expectSassAssertionsPass(`
      // Structural
      @if theme.$body-bg-color != colours.$grey-tint-80 { @error "Expected $body-bg-color to equal colours.$grey-tint-80"; }
      @if theme.$base-font-color != colours.$grey-shade-80 { @error "Expected $base-font-color to equal colours.$grey-shade-80"; }
      @if theme.$code-font-color != colours.$grey-shade-80 { @error "Expected $code-font-color to equal colours.$grey-shade-80"; }
      @if theme.$heading-font-color != colours.$grey-shade-80 { @error "Expected $heading-font-color to equal colours.$grey-shade-80"; }

      // Brand
      @if theme.$primary-colour != colours.$base-blue { @error "Expected $primary-colour to equal colours.$base-blue"; }
      @if theme.$secondary-colour != colours.$base-cyan { @error "Expected $secondary-colour to equal colours.$base-cyan"; }
      @if theme.$tertiary-colour != colours.$base-indigo { @error "Expected $tertiary-colour to equal colours.$base-indigo"; }

      // State
      @if theme.$success-colour != colours.$base-green { @error "Expected $success-colour to equal colours.$base-green"; }
      @if theme.$info-colour != colours.$base-cyan { @error "Expected $info-colour to equal colours.$base-cyan"; }
      @if theme.$warning-colour != colours.$base-orange { @error "Expected $warning-colour to equal colours.$base-orange"; }
      @if theme.$danger-colour != colours.$base-red { @error "Expected $danger-colour to equal colours.$base-red"; }

      // Light/dark aliases
      @if theme.$light-colour != colours.$grey-tint-80 { @error "Expected $light-colour to equal colours.$grey-tint-80"; }
      @if theme.$dark-colour != colours.$grey-shade-80 { @error "Expected $dark-colour to equal colours.$grey-shade-80"; }
    `);
  });

  it("enforces token types and basic path integrity", () => {
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
        @if string.length($value) == 0 { @error "Expected #{$label} to be non-empty"; }
        @return $value;
      }

      @function _assert-ends-with($value, $suffix, $label) {
        $_: _assert-non-empty-string($value, $label);
        $len: string.length($value);
        $slen: string.length($suffix);
        @if $len < $slen { @error "Expected #{$label} to end with '#{$suffix}'"; }
        @if string.slice($value, $len - $slen + 1) != $suffix {
          @error "Expected #{$label} to end with '#{$suffix}', got '#{$value}'";
        }
        @return $value;
      }

      // Types: primitives
      $_: _assert-type(theme.$theme-dark-mode, "bool", "$theme-dark-mode");
      $_: _assert-type(theme.$theme-prefix, "string", "$theme-prefix");

      $_: _assert-type(theme.$base-font, "string", "$base-font");
      $_: _assert-type(theme.$heading-font, "string", "$heading-font");
      $_: _assert-type(theme.$code-font, "string", "$code-font");

      // Types: colours
      $_: _assert-type(theme.$body-bg-color, "color", "$body-bg-color");
      $_: _assert-type(theme.$base-font-color, "color", "$base-font-color");
      $_: _assert-type(theme.$code-font-color, "color", "$code-font-color");
      $_: _assert-type(theme.$heading-font-color, "color", "$heading-font-color");

      $_: _assert-type(theme.$primary-colour, "color", "$primary-colour");
      $_: _assert-type(theme.$secondary-colour, "color", "$secondary-colour");
      $_: _assert-type(theme.$tertiary-colour, "color", "$tertiary-colour");

      $_: _assert-type(theme.$success-colour, "color", "$success-colour");
      $_: _assert-type(theme.$info-colour, "color", "$info-colour");
      $_: _assert-type(theme.$warning-colour, "color", "$warning-colour");
      $_: _assert-type(theme.$danger-colour, "color", "$danger-colour");

      $_: _assert-type(theme.$light-colour, "color", "$light-colour");
      $_: _assert-type(theme.$dark-colour, "color", "$dark-colour");

      // Asset/path sanity
      $_: _assert-non-empty-string(theme.$base-font-path, "$base-font-path");

      $_: _assert-ends-with(theme.$base-font-woff2-path, ".woff2", "$base-font-woff2-path");
      $_: _assert-ends-with(theme.$base-font-ttf-path, ".ttf", "$base-font-ttf-path");
      $_: _assert-ends-with(theme.$base-font-italic-woff2-path, ".woff2", "$base-font-italic-woff2-path");
      $_: _assert-ends-with(theme.$base-font-italic-ttf-path, ".ttf", "$base-font-italic-ttf-path");

      $_: _assert-ends-with(theme.$heading-font-woff2-path, ".woff2", "$heading-font-woff2-path");
      $_: _assert-ends-with(theme.$heading-font-ttf-path, ".ttf", "$heading-font-ttf-path");
      $_: _assert-ends-with(theme.$heading-font-italic-woff2-path, ".woff2", "$heading-font-italic-woff2-path");
      $_: _assert-ends-with(theme.$heading-font-italic-ttf-path, ".ttf", "$heading-font-italic-ttf-path");

      $_: _assert-ends-with(theme.$code-font-woff2-path, ".woff2", "$code-font-woff2-path");
      $_: _assert-ends-with(theme.$code-font-ttf-path, ".ttf", "$code-font-ttf-path");
      $_: _assert-ends-with(theme.$code-font-italic-woff2-path, ".woff2", "$code-font-italic-woff2-path");
      $_: _assert-ends-with(theme.$code-font-italic-ttf-path, ".ttf", "$code-font-italic-ttf-path");
    `);
  });

  it("supports consumer overrides via @use ... with (...) and only changes overridden values", () => {
    const header = `
      @use "tokens/colours" as colours;

      // This is the entire point of this file: consumers can override defaults.
      @use "tokens/theme" as theme with (
        $theme-dark-mode: true,
        $theme-prefix: "Fundatio-",
        $base-font: "Merriweather",
        $base-font-path: "/public/fonts",
        $primary-colour: colours.$base-red
      );
    `;

    expectSassAssertionsPass(
      `
      // Overridden values must reflect the consumer config.
      @if theme.$theme-dark-mode != true { @error "Expected override: $theme-dark-mode to be true"; }
      @if theme.$theme-prefix != "Fundatio-" { @error "Expected override: $theme-prefix to be \\"Fundatio-\\""; }
      @if theme.$base-font != "Merriweather" { @error "Expected override: $base-font to be \\"Merriweather\\""; }
      @if theme.$base-font-path != "/public/fonts" { @error "Expected override: $base-font-path to be \\"/public/fonts\\""; }
      @if theme.$primary-colour != colours.$base-red { @error "Expected override: $primary-colour to equal colours.$base-red"; }

      // Non-overridden values must remain at their defaults.
      @if theme.$heading-font != "Montserrat" { @error "Expected $heading-font to remain default \\"Montserrat\\""; }
      @if theme.$code-font != "ui-monospace" { @error "Expected $code-font to remain default \\"ui-monospace\\""; }

      @if theme.$secondary-colour != colours.$base-cyan { @error "Expected $secondary-colour to remain default (base-cyan)"; }
      @if theme.$tertiary-colour != colours.$base-indigo { @error "Expected $tertiary-colour to remain default (base-indigo)"; }

      @if theme.$success-colour != colours.$base-green { @error "Expected $success-colour to remain default (base-green)"; }
      @if theme.$info-colour != colours.$base-cyan { @error "Expected $info-colour to remain default (base-cyan)"; }
      @if theme.$warning-colour != colours.$base-orange { @error "Expected $warning-colour to remain default (base-orange)"; }
      @if theme.$danger-colour != colours.$base-red { @error "Expected $danger-colour to remain default (base-red)"; }

      @if theme.$light-colour != colours.$grey-tint-80 { @error "Expected $light-colour to remain default (grey-tint-80)"; }
      @if theme.$dark-colour != colours.$grey-shade-80 { @error "Expected $dark-colour to remain default (grey-shade-80)"; }
    `,
      header
    );
  });
});
