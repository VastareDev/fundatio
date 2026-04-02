// tests/scss/tokens/options.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If a token is wrong, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks and to validate
 * token semantics at compile time (types, keys, invariants).
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "tokens/options" as options;
    @use "tokens/theme" as theme;
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

describe("tokens/options", () => {
  it("exports expected option tokens", () => {
    expectSassAssertionsPass(`
      // Existence checks: referencing the variables is enough to fail compilation
      // if they are missing, but we also type-check them below.
      $_a: options.$vs-prefix;
      $_b: options.$dark-mode;
      $_c: options.$font-path;
    `);
  });

  it("re-exports values directly from theme (no transformation)", () => {
    expectSassAssertionsPass(`
      @if options.$vs-prefix != theme.$theme-prefix {
        @error "Expected $vs-prefix to re-export theme.$theme-prefix exactly";
      }

      @if options.$dark-mode != theme.$theme-dark-mode {
        @error "Expected $dark-mode to re-export theme.$theme-dark-mode exactly";
      }

      @if options.$font-path != theme.$base-font-path {
        @error "Expected $font-path to re-export theme.$base-font-path exactly";
      }
    `);
  });

  it("enforces token types", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(options.$vs-prefix) != "string" {
        @error "Expected $vs-prefix to be type 'string', got '#{meta.type-of(options.$vs-prefix)}'";
      }

      @if meta.type-of(options.$dark-mode) != "bool" {
        @error "Expected $dark-mode to be type 'bool', got '#{meta.type-of(options.$dark-mode)}'";
      }

      @if meta.type-of(options.$font-path) != "string" {
        @error "Expected $font-path to be type 'string', got '#{meta.type-of(options.$font-path)}'";
      }
    `);
  });

  it("enforces basic prefix integrity (safe identifier-ish token)", () => {
    expectSassAssertionsPass(`
      // This is intentionally conservative: we don't over-validate formatting,
      // but we do ensure it's not empty and not whitespace.
      $p: options.$vs-prefix;

      @if string.length($p) == 0 {
        @error "Expected $vs-prefix to be non-empty";
      }

      // Guard against accidental spaces (a classic 'why are my CSS vars broken' scenario).
      @if string.index($p, " ") != null {
        @error "Expected $vs-prefix to not contain spaces";
      }
    `);
  });

  it("enforces font-path integrity (non-empty string, no trailing slash regression)", () => {
    expectSassAssertionsPass(`
      $path: options.$font-path;

      @if string.length($path) == 0 {
        @error "Expected $font-path to be non-empty";
      }

      // Trailing slash isn't inherently wrong, but it often causes double slashes
      // when consumers do '#{$font-path}/file.ttf'. This catches regressions early.
      $last: string.slice($path, -1);

      @if $last == "/" {
        @error "Expected $font-path to not end with '/' (to avoid accidental double slashes)";
      }
    `);
  });
});
