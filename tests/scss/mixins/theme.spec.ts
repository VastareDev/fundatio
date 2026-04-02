import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassPass(snippet: string, headerExtra = ""): string {
  const header = `
    ${headerExtra}
    @use "mixins/theme" as mx;
    @use "functions/theme" as fn;
  `;

  return runSass(
    `
    ${snippet}

    .__test__ { content: "ok"; }
    `,
    header
  );
}

function expectSassFail(snippet: string, messageIncludes: string, headerExtra = ""): void {
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

function readProp(css: string, prop: string): string {
  const re = new RegExp(`${prop}\\s*:\\s*([^;]+);`);
  const m = css.match(re);
  if (!m) throw new Error(`Expected CSS to contain '${prop}: ...;'`);
  return m[1].trim();
}

function unquote(v: string): string {
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
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
        expected: "--Fundatio-theme-#{$g}-#{$k}";
      }
    `);

    const g = unquote(readProp(css, "group"));
    const k = unquote(readProp(css, "key"));
    const expected = unquote(readProp(css, "expected"));

    expect(css).toContain(`${expected}:`);
    expect(expected).toBe(`--Fundatio-theme-${g}-${k}`);
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

      $g2: null;
      @if list.length($groups) > 1 {
        $g2: list.nth($groups, 2);
      }

      :root { @include mx.theme-vars($groups: $g1); }

      .__probe__ {
        g1: $g1;
        g2: "";
        @if $g2 != null { g2: $g2; }
        g1k: list.nth(fn.theme-keys($g1), 1);
        g2k: "";
        @if $g2 != null { g2k: list.nth(fn.theme-keys($g2), 1); }
      }
    `);

    const g1 = unquote(readProp(css, "g1"));
    const g1k = unquote(readProp(css, "g1k"));
    expect(css).toContain(`--Fundatio-theme-${g1}-${g1k}:`);

    const g2 = unquote(readProp(css, "g2"));
    const g2k = unquote(readProp(css, "g2k"));
    if (g2 !== "" && g2k !== "") {
      expect(css).not.toContain(`--Fundatio-theme-${g2}-${g2k}:`);
    }

    expectSassPass(`
      $groups: fn.theme-groups();
      $g1: list.nth($groups, 1);
      $g2: $g1;
      @if list.length($groups) > 1 { $g2: list.nth($groups, 2); }
      :root { @include mx.theme-vars($groups: ($g1, $g2)); }
    `);
  });

  it("supports overriding var prefix and namespace", () => {
    const css = expectSassPass(`
      $g: list.nth(fn.theme-groups(), 1);
      $k: list.nth(fn.theme-keys($g), 1);

      :root {
        @include mx.theme-group-vars($g, $keys: ($k,), $var-prefix: "--x-", $namespace: "t");
      }

      .__probe__ { expected: "--x-t-#{$g}-#{$k}"; }
    `);

    const expected = unquote(readProp(css, "expected"));
    expect(css).toContain(`${expected}:`);
  });

  it("theme-root-vars delegates to theme-vars and emits without throwing", () => {
    const css = expectSassPass(`:root { @include mx.theme-root-vars(); }`);
    expect(css).toContain(":root");
  });

  it("serializes string->string source maps into a CSS src-list for the active packaged format", () => {
    const css = expectSassPass(`
      $sources: fn.theme-value("font-sources", "base");
      $normal: map.get($sources, "normal");

      :root { @include mx.theme-group-vars("font-sources", $keys: ("base",)); }

      .__probe__ {
        format: list.nth(map.keys($normal), 1);
        path: map.get($normal, list.nth(map.keys($normal), 1));
      }
    `);

    const format = unquote(readProp(css, "format"));
    const path = unquote(readProp(css, "path"));
    const expectedCssFormat = format === "ttf" ? "truetype" : format;

    expect(css).toContain(`url('../assets/fonts/${path}')format('${expectedCssFormat}')`);
  });

  it("fails fast when theme-vars receives a non-list/non-string (developer error)", () => {
    expectSassFail(`:root { @include mx.theme-vars($groups: 123); }`, "Expected $groups to be a list, string, or null");
  });

  it("fails fast when theme-group-vars receives invalid keys type", () => {
    expectSassFail(`:root { @include mx.theme-group-vars("base-colours", $keys: 123); }`, "Expected $keys to be a list, string, or null");
  });

  it("fails fast when subset keys match nothing (actionable error)", () => {
    expectSassFail(`:root { @include mx.theme-group-vars("base-colours", $keys: ("does-not-exist",)); }`, "No matching keys emitted");
  });

  it("fails fast for missing group (delegates to strict fn.theme-group errors)", () => {
    expectSassFail(`:root { @include mx.theme-group-vars("missing-group"); }`, "Missing key 'missing-group'");
  });

  it("remains compatible with token overrides (theme reads current registry, not cached values)", () => {
    const css = expectSassPass(
      `
      :root { @include mx.theme-group-vars("font-families", $keys: ("base-font",)); }
      `,
      `@use "tokens/theme" as theme with ($base-font: "Custom Serif");`
    );

    expect(css).toContain("--Fundatio-theme-font-families-base-font:CustomSerif");
  });
});
