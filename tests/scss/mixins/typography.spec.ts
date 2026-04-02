// tests/scss/mixins/typography.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compile Sass that should succeed.
 *
 * Returns compiled CSS so we can assert presence/absence of emitted
 * custom properties (since mixins are meant to generate output).
 */
function expectSassPass(snippet: string): string {
  const header = `
    @use "mixins/typography" as mx;
    @use "functions/typography" as fn;
  `;

  return runSass(
    `
    ${snippet}

    // Always emit something non-var so the pipeline produces output.
    .__test__ { content: "ok"; }
    `,
    header
  );
}

/**
 * Compile Sass that should fail via @error.
 * We match a message fragment for stability.
 */
function expectSassFail(snippet: string, messageIncludes: string): void {
  const header = `
    @use "mixins/typography" as mx;
    @use "functions/typography" as fn;
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
 * Extracts a property value from the compiled CSS.
 * Assumes the property appears once in output (tests control inputs).
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

describe("mixins/typography", () => {
  it("emits CSS variables for a single group (subset keys) using the default naming contract", () => {
    const css = expectSassPass(`
      $groups: fn.typography-groups();
      $g: list.nth($groups, 1);

      $keys: fn.typography-keys($g);
      $k: list.nth($keys, 1);

      :root {
        @include mx.typography-group-vars($g, $keys: ($k,));
      }

      // Probe expected var name for JS-level assertions.
      .__probe__ {
        group: $g;
        key: $k;
        expected: "--Fundatio-typography-#{$g}-#{$k}";
      }
    `);

    const g = unquote(readProp(css, "group"));
    const k = unquote(readProp(css, "key"));
    const expected = unquote(readProp(css, "expected"));

    expect(g).toBeTruthy();
    expect(k).toBeTruthy();

    // Presence check: variable name should exist in emitted CSS.
    expect(css).toContain(`${expected}:`);

    // Sanity: expected name should be consistent with probe group/key.
    expect(expected).toBe(`--Fundatio-typography-${g}-${k}`);
  });

  it("emits variables for all registered groups by default (typography-vars)", () => {
    const css = expectSassPass(`
      :root {
        @include mx.typography-vars();
      }

      // Emit a list of expected var names: first key of each group.
      $groups: fn.typography-groups();

      .__expect__ {
        @for $i from 1 through list.length($groups) {
          $g: list.nth($groups, $i);
          $k: list.nth(fn.typography-keys($g), 1);
          p#{$i}: "--Fundatio-typography-#{$g}-#{$k}";
        }
      }
    `);

    const pMatches = [...css.matchAll(/p(\d+)\s*:\s*(['"]?)(--[^;]+)\2;/g)];
    expect(pMatches.length).toBeGreaterThan(0);

    for (const m of pMatches) {
      const expectedVar = m[3].trim();
      expect(css).toContain(`${expectedVar}:`);
    }
  });

  it("supports selecting groups via string or list (typography-vars)", () => {
    const css = expectSassPass(`
      $groups: fn.typography-groups();
      $g1: list.nth($groups, 1);

      // Deprecated if() function removed: use @if block instead.
      $g2: null;
      @if list.length($groups) > 1 {
        $g2: list.nth($groups, 2);
      }

      :root {
        // String form should be accepted.
        @include mx.typography-vars($groups: $g1);
      }

      // Also remove if() for probe values, keep same output semantics:
      // - g2 becomes "" when null
      // - g2k becomes "" when g2 is null, otherwise first key of g2
      .__probe__ {
        g1: $g1;

        g2: "";
        @if $g2 != null {
          g2: $g2;
        }

        g1k: list.nth(fn.typography-keys($g1), 1);

        g2k: "";
        @if $g2 != null {
          g2k: list.nth(fn.typography-keys($g2), 1);
        }
      }
    `);

    const g1 = unquote(readProp(css, "g1"));
    const g1k = unquote(readProp(css, "g1k"));
    const expectedG1 = `--Fundatio-typography-${g1}-${g1k}`;
    expect(css).toContain(`${expectedG1}:`);

    const g2 = unquote(readProp(css, "g2"));
    const g2k = unquote(readProp(css, "g2k"));

    if (g2 !== "" && g2k !== "") {
      const expectedG2 = `--Fundatio-typography-${g2}-${g2k}`;
      expect(css).not.toContain(`${expectedG2}:`);
    }
  });

  it("supports overridable var prefix and namespace", () => {
    const css = expectSassPass(`
      $g: list.nth(fn.typography-groups(), 1);
      $k: list.nth(fn.typography-keys($g), 1);

      :root {
        @include mx.typography-group-vars(
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

  it("typography-root-vars delegates to typography-vars and emits the same naming scheme", () => {
    const css = expectSassPass(`
      :root { @include mx.typography-root-vars(); }

      $g: list.nth(fn.typography-groups(), 1);
      $k: list.nth(fn.typography-keys($g), 1);
      .__probe__ { expected: "--Fundatio-typography-#{$g}-#{$k}"; }
    `);

    const expected = unquote(readProp(css, "expected"));
    expect(css).toContain(`${expected}:`);
  });

  it("convenience wrappers compile and emit for their intended group keys", () => {
    const css = expectSassPass(`
      $ffk: list.nth(fn.typography-keys("font-families"), 1);
      $fwk: list.nth(fn.typography-keys("font-weights"), 1);
      $fsk: list.nth(fn.typography-keys("font-sizes"), 1);
      $fmtk: list.nth(fn.typography-keys("formatting"), 1);
      $spk: list.nth(fn.typography-keys("spacing"), 1);

      :root {
        @include mx.font-family-vars(($ffk,));
        @include mx.font-weight-vars(($fwk,));
        @include mx.font-size-vars(($fsk,));
        @include mx.typography-format-vars(($fmtk,));
        @include mx.typography-spacing-vars(($spk,));
      }

      .__probe__ {
        v1: "--Fundatio-typography-font-families-#{$ffk}";
        v2: "--Fundatio-typography-font-weights-#{$fwk}";
        v3: "--Fundatio-typography-font-sizes-#{$fsk}";
        v4: "--Fundatio-typography-formatting-#{$fmtk}";
        v5: "--Fundatio-typography-spacing-#{$spk}";
      }
    `);

    for (const prop of ["v1", "v2", "v3", "v4", "v5"] as const) {
      const expected = unquote(readProp(css, prop));
      expect(css).toContain(`${expected}:`);
    }
  });

  it("fails fast when typography-vars receives a non-list/non-string (developer error)", () => {
    expectSassFail(
      `
      :root { @include mx.typography-vars($groups: 123); }
      `,
      "Expected $groups to be a list, string, or null"
    );

    expectSassFail(
      `
      :root { @include mx.typography-vars($groups: true); }
      `,
      "Expected $groups to be a list, string, or null"
    );

    expectSassFail(
      `
      :root { @include mx.typography-vars($groups: ("a": "b")); }
      `,
      "Expected $groups to be a list, string, or null"
    );
  });

  it("fails fast when typography-group-vars receives invalid keys type", () => {
    expectSassFail(
      `
      :root { @include mx.typography-group-vars("font-sizes", $keys: 123); }
      `,
      "Expected $keys to be a list, string, or null"
    );

    expectSassFail(
      `
      :root { @include mx.typography-group-vars("font-sizes", $keys: true); }
      `,
      "Expected $keys to be a list, string, or null"
    );
  });

  it("fails fast when subset keys match nothing (actionable error)", () => {
    expectSassFail(
      `
      :root {
        @include mx.typography-group-vars("font-sizes", $keys: ("__nope__",));
      }
      `,
      "No matching keys emitted for typography group"
    );
  });

  it("fails fast for missing group (delegates to strict function errors)", () => {
    expectSassFail(
      `
      :root { @include mx.typography-group-vars("does-not-exist"); }
      `,
      "Missing key 'does-not-exist'"
    );
  });
});
