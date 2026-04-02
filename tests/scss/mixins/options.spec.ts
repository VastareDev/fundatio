// tests/scss/mixins/options.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "mixins/options" as mx;
    @use "functions/options" as fn;
    @use "maps/options" as option-maps;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      .__sol_mixin_test__ { content: "ok"; }
      `,
      header
    );
  }).not.toThrow();
}

/**
 * Compiles a Sass snippet that is expected to throw via @error.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsFail(snippet: string, messageIncludes: string): void {
  const header = `
    @use "mixins/options" as mx;
    @use "functions/options" as fn;
    @use "maps/options" as option-maps;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      .__sol_mixin_test__ { content: "ok"; }
      `,
      header
    );
  }).toThrow(messageIncludes);
}

describe("mixins/options", () => {
  it("emits a single option var for a known key (does not throw)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.option-var("prefix");
      }

      // Contract sanity: registry is a map and contains the key.
      $opts: fn.options();
      @if meta.type-of($opts) != "map" { @error "Expected options() to return a map"; }
      @if map.has-key($opts, "prefix") == false { @error "Expected options registry to include 'prefix'"; }

      $v: fn.option("prefix");
      @if $v == null { @error "Expected option('prefix') to be non-null"; }
    `);
  });

  it("supports overriding the emitted var prefix for option-var (does not throw)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.option-var("prefix", $prefix: "Fundatio");
        @include mx.option-var("prefix", $prefix: null);
        @include mx.option-var("prefix", $prefix: "");
      }
    `);
  });

  it("emits options-vars for all options by default (does not throw)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.options-vars();
      }

      $keys: fn.option-keys();
      @if meta.type-of($keys) != "list" { @error "Expected option-keys() to return list"; }
      @if list.length($keys) < 1 { @error "Expected at least one option key"; }
    `);
  });

  it("supports filtering keys via string or list (developer ergonomics)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.options-vars($keys: "prefix");
        @include mx.options-vars($keys: ("prefix",));
      }
    `);
  });

  it("fails fast when keys is not list/string/null", () => {
    expectSassAssertionsFail(
      `
      :root { @include mx.options-vars($keys: true); }
      `,
      "Expected $keys to be a list, string, or null"
    );
  });

  it("supports options-root wrapper (does not throw)", () => {
    expectSassAssertionsPass(`
      @include mx.options-root();
      @include mx.options-root($keys: "prefix");
      @include mx.options-root($keys: ("prefix",), $prefix: "Fundatio");
    `);
  });

  it("fails fast for missing option key via strict function delegation", () => {
    expectSassAssertionsFail(
      `
      :root { @include mx.option-var("does-not-exist"); }
      `,
      "Missing key 'does-not-exist' in $options"
    );
  });

  it("fails fast when option-var key is not a string", () => {
    expectSassAssertionsFail(
      `
      :root { @include mx.option-var(123); }
      `,
      "Expected $key to be type 'string'"
    );
  });

  it("fails fast when option-var prefix is not string/null", () => {
    expectSassAssertionsFail(
      `
      :root { @include mx.option-var("prefix", $prefix: 123); }
      `,
      "Expected $prefix to be type 'string' (or null)"
    );
  });

  it("fails fast when options-root prefix is not string/null", () => {
    expectSassAssertionsFail(
      `
      @include mx.options-root($prefix: 123);
      `,
      "Expected $prefix to be type 'string' (or null)"
    );
  });

  it("options-vars uses registry prefix when present (does not throw)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.options-vars();
      }

      // If the registry has "prefix", mixin may use it internally.
      @if fn.has-option("prefix") == true {
        $p: fn.option("prefix");
        @if $p != null and meta.type-of($p) == "string" and string.length($p) > 0 {
          // No CSS introspection here; compile success is the test.
        }
      }
    `);
  });

  it("options-vars respects explicit prefix over registry prefix (does not throw)", () => {
    expectSassAssertionsPass(`
      :root {
        @include mx.options-vars($prefix: "explicit");
        @include mx.options-vars($keys: "prefix", $prefix: "explicit");
      }
    `);
  });
});
