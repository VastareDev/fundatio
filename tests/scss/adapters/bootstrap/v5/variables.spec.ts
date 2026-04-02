import { describe, it, expect } from "vitest";
import { runSass } from "../../../../utils/testing.ts";

/**
 * Utility that compiles Sass containing assertions.
 * If Sass throws, the test fails.
 */
function expectSassAssertionsPass(snippet: string, header?: string): void {
  const defaultHeader = `
    @use "tokens/theme" as theme;
    @use "adapters/bootstrap/v5/variables" as bs;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      .__sol_test_output__ { content: "ok"; }
      `,
      header ?? defaultHeader
    );
  }).not.toThrow();
}

describe("adapters/bootstrap/v5/variables", () => {
  it("compiles successfully", () => {
    expectSassAssertionsPass(`
      // If the adapter loads without errors we're good.
      $_: bs.$primary;
    `);
  });

  it("maps Sol theme colours correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$primary != theme.$primary-colour { @error "primary mismatch"; }
      @if bs.$secondary != theme.$secondary-colour { @error "secondary mismatch"; }
      @if bs.$success != theme.$success-colour { @error "success mismatch"; }
      @if bs.$info != theme.$info-colour { @error "info mismatch"; }
      @if bs.$warning != theme.$warning-colour { @error "warning mismatch"; }
      @if bs.$danger != theme.$danger-colour { @error "danger mismatch"; }
    `);
  });

  it("maps body colours correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$body-bg != theme.$body-bg-color { @error "body bg mismatch"; }
      @if bs.$body-color != theme.$base-font-color { @error "body text mismatch"; }
    `);
  });

  it("maps typography correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$font-family-base != theme.$base-font { @error "base font mismatch"; }
      @if bs.$headings-font-family != theme.$heading-font { @error "heading font mismatch"; }
      @if bs.$code-color != theme.$code-font-color { @error "code color mismatch"; }
    `);
  });

  it("maps forms correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$input-bg != theme.$body-bg-color { @error "input bg mismatch"; }
      @if bs.$input-color != theme.$base-font-color { @error "input color mismatch"; }
    `);
  });

  it("maps tables correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$table-bg != theme.$body-bg-color { @error "table bg mismatch"; }
      @if bs.$table-color != theme.$base-font-color { @error "table color mismatch"; }
    `);
  });

  it("maps links correctly", () => {
    expectSassAssertionsPass(`
      @if bs.$link-color != theme.$primary-colour { @error "link color mismatch"; }
    `);
  });

  it("maps button text colour", () => {
    expectSassAssertionsPass(`
      @if bs.$btn-color != theme.$base-font-color { @error "button color mismatch"; }
    `);
  });

  it("respects dark mode flag", () => {
    expectSassAssertionsPass(`
      @if bs.$enable-dark-mode != theme.$theme-dark-mode {
        @error "dark mode mismatch";
      }
    `);
  });
});
