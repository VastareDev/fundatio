// tests/scss/mixins/theme.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compile Sass that should succeed.
 *
 * Returns compiled CSS so we can assert that custom properties were emitted
 * and that serialization rules behave as expected.
 */
function expectSassPass(snippet: string, headerExtra = ""): string {
  const header = `
    ${headerExtra}

    @use "mixins/theme" as mx;
    @use "functions/theme" as fn;
  `;

  return runSass(
    `
    ${snippet}

    // Always emit something so the pipeline produces output.
    .__test__ { content: "ok"; }
    `,
    header
  );
}

/**
 * Compile Sass that should fail via @error.
 * We match a message fragment for stability.
 */
function expectSassFail(
  snippet: string,
  messageIncludes: string,
  headerExtra = ""
): void {
  const header = `
    ${headerExtra}

    @use "mixins/theme" as mx;
    @use "functions/theme" as fn;
  `;

  expect(() =>
    runSass(
      `
      ${snippet}

      .__test__ { content: "ok"; }
      `,
      header
    )
  ).toThrow(messageIncludes);
}

/**
 * Reads a property value from compiled CSS.
 * Assumes the property appears once in output (tests control input).
 */
function readProp(css: string, prop: string): string {
  const re = new RegExp(`${prop}\\s*:\\s*([^;]+);`);
  const m = css.match(re);
  if (!m) throw new Error(`Expected CSS to contain '${prop}: ...;'`);
  return m[1].trim();
}

/** Removes surrounding quotes added by Sass for string values. */
function unquote(v: string): string {
  const t = v.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1);
  }
  return t;
}

describe("mixins/theme", () => {
  it("emits CSS variables for a single group (subset keys) using the default naming contract", () => {
    const css = expectSassPass(`
      $g: list.nth(fn.theme-groups(), 1);
      $k: list.nth(fn.theme-keys($g), 1);

      :root { @include mx.theme-group-vars($g, $keys: ($k,)); }

      .__probe__ {
        group: $g;
        key: $k;
        expected: "--sol-theme-#{$g}-#{$k}";
      }
    `);

    const g = unquote(readProp(css, "group"));
    const k = unquote(readProp(css, "key"));
    const expected = unquote(readProp(css, "expected"));

    expect(css).toContain(`${expected}:`);
    expect(expected).toBe(`--sol-theme-${g}-${k}`);
  });

  it("theme-vars emits variables for all registered theme groups without throwing", () => {
    const css = expectSassPass(`
      :root { @include mx.theme-vars(); }

      $groups: fn.theme-groups();
      @if meta.type-of($groups) != "list" or list.length($groups) == 0 {
        @error "Expected fn.theme-groups() to return a non-empty list";
      }
    `);

    expect(css).toContain(":root");
  });

  it("supports selecting groups via string or list (theme-vars)", () => {
    const css = expectSassPass(`
      $groups: fn.theme-groups();
      $g1: list.nth($groups, 1);

      // remove deprecated if()
      $g2: null;
      @if list.length($groups) > 1 {
        $g2: list.nth($groups, 2);
      }

      :root { @include mx.theme-vars($groups: $g1); }

      .__probe__ {
        g1: $g1;

        g2: "";
        @if $g2 != null {
          g2: $g2;
        }

        g1k: list.nth(fn.theme-keys($g1), 1);

        g2k: "";
        @if $g2 != null {
          g2k: list.nth(fn.theme-keys($g2), 1);
        }
      }
    `);

    const g1 = unquote(readProp(css, "g1"));
    const g1k = unquote(readProp(css, "g1k"));
    const expectedG1 = `--sol-theme-${g1}-${g1k}`;
    expect(css).toContain(`${expectedG1}:`);

    const g2 = unquote(readProp(css, "g2"));
    const g2k = unquote(readProp(css, "g2k"));
    if (g2 !== "" && g2k !== "") {
      const expectedG2 = `--sol-theme-${g2}-${g2k}`;
      expect(css).not.toContain(`${expectedG2}:`);
    }

    // List form should compile too.
    expectSassPass(`
      $groups: fn.theme-groups();
      $g1: list.nth($groups, 1);

      $g2: $g1;
      @if list.length($groups) > 1 {
        $g2: list.nth($groups, 2);
      }

      :root { @include mx.theme-vars($groups: ($g1, $g2)); }
    `);
  });

  it("supports overriding var prefix and namespace", () => {
    const css = expectSassPass(`
      $g: list.nth(fn.theme-groups(), 1);
      $k: list.nth(fn.theme-keys($g), 1);

      :root {
        @include mx.theme-group-vars(
          $g,
          $keys: ($k,),
          $var-prefix: "--x-",
          $namespace: "t"
        );
      }

      .__probe__ { expected: "--x-t-#{$g}-#{$k}"; }
    `);

    const expected = unquote(readProp(css, "expected"));
    expect(css).toContain(`${expected}:`);
    expect(expected.startsWith("--x-t-")).toBe(true);
  });

  it("theme-root-vars delegates to theme-vars and emits without throwing", () => {
    const css = expectSassPass(`
      :root { @include mx.theme-root-vars(); }
    `);

    expect(css).toContain(":root");
  });

  it("serializes string->string source maps into a CSS src-list with woff2 primary and ttf fallback", () => {
    const css = expectSassPass(`
      $found-group: null;
      $found-key: null;

      @each $g in fn.theme-groups() {
        $m: fn.theme-group($g);

        @each $k, $v in $m {
          @if meta.type-of($v) == "map" {
            $ok: true;

            @each $kk, $vv in $v {
              @if meta.type-of($kk) != "string" or meta.type-of($vv) != "string" {
                $ok: false;
              }
            }

            @if $ok == true and map.has-key($v, "woff2") and map.has-key($v, "ttf") {
              $found-group: $g;
              $found-key: $k;
            }
          }
        }
      }

      @if $found-group == null or $found-key == null {
        @error "No theme value found that matches a woff2/ttf source map. Add one or adjust this test.";
      }

      :root {
        @include mx.theme-group-vars($found-group, $keys: ($found-key,));
      }

      .__probe__ {
        expected: "--sol-theme-#{$found-group}-#{$found-key}";
      }
    `);

    const varName = unquote(readProp(css, "expected"));
    expect(css).toContain(`${varName}:`);

    const valueMatch = css.match(
      new RegExp(`${varName}\\s*:\\s*([^;]+);`)
    );
    if (!valueMatch) throw new Error(`Expected emitted value for ${varName}`);
    const value = valueMatch[1];

    const woff2Pos = value.indexOf("format('woff2')");
    const ttfPos = value.indexOf("format('ttf')");

    expect(woff2Pos).toBeGreaterThanOrEqual(0);
    expect(ttfPos).toBeGreaterThanOrEqual(0);
    expect(woff2Pos).toBeLessThan(ttfPos);
  });

  it("fails fast when theme-vars receives a non-list/non-string (developer error)", () => {
    expectSassFail(
      `:root { @include mx.theme-vars($groups: 123); }`,
      "Expected $groups to be a list, string, or null"
    );

    expectSassFail(
      `:root { @include mx.theme-vars($groups: true); }`,
      "Expected $groups to be a list, string, or null"
    );

    expectSassFail(
      `:root { @include mx.theme-vars($groups: ("a": "b")); }`,
      "Expected $groups to be a list, string, or null"
    );
  });

  it("fails fast when theme-group-vars receives invalid keys type", () => {
    expectSassFail(
      `:root { @include mx.theme-group-vars("namespace", $keys: 123); }`,
      "Expected $keys to be a list, string, or null"
    );

    expectSassFail(
      `:root { @include mx.theme-group-vars("namespace", $keys: true); }`,
      "Expected $keys to be a list, string, or null"
    );
  });

  it("fails fast when subset keys match nothing (actionable error)", () => {
    expectSassFail(
      `
      $g: list.nth(fn.theme-groups(), 1);
      :root { @include mx.theme-group-vars($g, $keys: ("__nope__",)); }
      `,
      "No matching keys emitted for theme group"
    );
  });

  it("fails fast for missing group (delegates to strict fn.theme-group errors)", () => {
    expectSassFail(
      `:root { @include mx.theme-group-vars("does-not-exist"); }`,
      "Missing key 'does-not-exist'"
    );
  });

  it("remains compatible with token overrides (theme reads current registry, not cached values)", () => {
    const css = expectSassPass(
      `
      $v: fn.try-theme-value("namespace", "theme-prefix", null);

      @if $v == null {
        @error "Expected theme key 'namespace/theme-prefix' to exist for override test";
      }

      @if $v != "__OVERRIDE__" {
        @error "Expected overridden theme-prefix to be visible via functions";
      }

      :root {
        @include mx.theme-group-vars("namespace", $keys: ("theme-prefix",));
      }
      `,
      `
      @use "tokens/theme" with (
        $theme-prefix: "__OVERRIDE__"
      );
      `
    );

    expect(css).toContain("--sol-theme-namespace-theme-prefix:");
    expect(css).toContain("__OVERRIDE__");
  });
});
