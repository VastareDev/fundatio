import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassAssertionsPass(snippet: string, header?: string): void {
  const defaultHeader = `
        @use "tokens/theme" as theme;
    @use "tokens/colours" as colours;
  `;

  expect(() => {
    runSass(`${snippet}
.__sol_token_test__ { content: "ok"; }`, header ?? defaultHeader);
  }).not.toThrow();
}

describe("tokens/theme", () => {
  it("matches default primitive values exactly", () => {
    expectSassAssertionsPass(`
      @if theme.$theme-dark-mode != false { @error "Expected $theme-dark-mode default to be false"; }
      @if theme.$theme-prefix != "vs-" { @error "Expected $theme-prefix default to be 'vs-'"; }
      @if theme.$base-font != "Merriweather" { @error "Expected $base-font default to be 'Merriweather'"; }
      @if theme.$heading-font != "Montserrat" { @error "Expected $heading-font default to be 'Montserrat'"; }
      @if theme.$code-font != "ui-monospace" { @error "Expected $code-font default to be 'ui-monospace'"; }
      @if theme.$font-package-format != "ttf" { @error "Expected $font-package-format default to be 'ttf'"; }
      @if theme.$base-font-path != "../assets/fonts" { @error "Expected $base-font-path default to be '../assets/fonts'"; }
      @if theme.$base-font-normal-stem != "merriweather/Merriweather-Variable-Font" { @error "Expected base normal stem to match"; }
      @if theme.$base-font-italic-stem != "merriweather/Merriweather-Variable-Italic-Font" { @error "Expected base italic stem to match"; }
      @if theme.$heading-font-normal-stem != "montserrat/Montserrat-Variable-Font" { @error "Expected heading normal stem to match"; }
      @if theme.$heading-font-italic-stem != "montserrat/Montserrat-Variable-Italic-Font" { @error "Expected heading italic stem to match"; }
      @if theme.$code-font-normal-stem != "montserrat/Montserrat-Variable-Font" { @error "Expected code normal stem to match"; }
      @if theme.$code-font-italic-stem != "montserrat/Montserrat-Variable-Italic-Font" { @error "Expected code italic stem to match"; }
    `);
  });

  it("locks default colour roles to canonical colour tokens", () => {
    expectSassAssertionsPass(`
      @if theme.$body-bg-color != colours.$grey-tint-80 { @error "Expected $body-bg-color to equal colours.$grey-tint-80"; }
      @if theme.$base-font-color != colours.$grey-shade-80 { @error "Expected $base-font-color to equal colours.$grey-shade-80"; }
      @if theme.$code-font-color != colours.$grey-shade-80 { @error "Expected $code-font-color to equal colours.$grey-shade-80"; }
      @if theme.$heading-font-color != colours.$grey-shade-80 { @error "Expected $heading-font-color to equal colours.$grey-shade-80"; }
      @if theme.$primary-colour != colours.$base-blue { @error "Expected $primary-colour to equal colours.$base-blue"; }
      @if theme.$secondary-colour != colours.$base-cyan { @error "Expected $secondary-colour to equal colours.$base-cyan"; }
      @if theme.$tertiary-colour != colours.$base-indigo { @error "Expected $tertiary-colour to equal colours.$base-indigo"; }
    `);
  });

  it("enforces token types and basic path integrity", () => {
    expectSassAssertionsPass(`
      @function _assert-type($value, $expected, $label) {
        @if meta.type-of($value) != $expected { @error "Expected #{$label} to be type '#{$expected}', got '#{meta.type-of($value)}'"; }
        @return $value;
      }
      $_: _assert-type(theme.$font-package-format, "string", "$font-package-format");
      $_: _assert-type(theme.$base-font-normal-stem, "string", "$base-font-normal-stem");
      @if string.index(theme.$base-font-normal-stem, "/") == null { @error "Expected base font stem to include a directory separator"; }
    `);
  });

  it("supports consumer overrides via @use ... with (...) and only changes overridden values", () => {
    expectSassAssertionsPass(`
      @if theme.$base-font != "Custom Serif" { @error "Expected override for $base-font"; }
      @if theme.$font-package-format != "woff2" { @error "Expected override for $font-package-format"; }
      @if theme.$heading-font != "Montserrat" { @error "Expected $heading-font to remain default"; }
    `, `
      @use "tokens/colours" as colours;
      @use "tokens/theme" as theme with (
        $base-font: "Custom Serif",
        $font-package-format: "woff2"
      );
    `);
  });
});
