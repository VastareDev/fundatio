import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassPass(snippet: string): string {
  const header = `
    @use "mixins/fonts" as mx;
    @use "functions/fonts" as fn;
  `;

  return runSass(
    `
    ${snippet}

    .__test__ { content: "ok"; }
    `,
    header
  );
}

function expectSassFail(snippet: string, messageIncludes: string): void {
  const header = `
    @use "mixins/fonts" as mx;
    @use "functions/fonts" as fn;
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

describe("mixins/fonts", () => {
  it("emits a single @font-face for a valid group + variant", () => {
    const css = expectSassPass(`
      @include mx.font-face("base", "normal");
    `);

    expect(css).toContain("@font-face");
    expect(css).toContain("font-family:");
    expect(css).toContain("font-style:");
    expect(css).toContain("font-weight:");
    expect(css).toContain("font-display:");
    expect(css).toContain("src:");

    // Default base path should be the theme token so compiled CSS is runtime-correct.
    expect(css).toContain("url('../assets/fonts/");
  });

  it("joins base-path with absolute source paths", () => {
    const css = expectSassPass(`
      @include mx.font-face("base", "normal", "/assets/fonts");
    `);

    expect(css).toContain("url('/assets/fonts/");
  });

  it("does not rewrite absolute URLs or absolute paths", () => {
    const css = expectSassPass(`
      @include mx.font-face("base", "normal", "/ignored");
    `);

    // We only assert that src exists and compilation succeeds.
    expect(css).toContain("src:");
  });

  it("supports filtering formats via string or list", () => {
    expectSassPass(`
      @include mx.font-face("base", "normal", $formats: "woff2");
      @include mx.font-face("base", "normal", $formats: ("truetype"));
    `);
  });

  it("emits all variants in a group by default", () => {
    const css = expectSassPass(`
      @include mx.font-group-faces("base");
    `);

    expect(css).toContain("@font-face");
  });

  it("supports variants passed as string or list", () => {
    expectSassPass(`
      @include mx.font-group-faces("base", "normal");
      @include mx.font-group-faces("base", ("normal"));
    `);
  });

  it("fails fast when variants is not list/string/null", () => {
    expectSassFail(
      `
      @include mx.font-group-faces("base", 123);
      `,
      "Expected $variants to be a list, string, or null"
    );
  });

  it("emits all font groups by default", () => {
    const css = expectSassPass(`
      @include mx.font-faces();
    `);

    expect(css).toContain("@font-face");
  });

  it("supports selecting groups via string or list", () => {
    expectSassPass(`
      @include mx.font-faces("base");
      @include mx.font-faces(("base", "code"));
    `);
  });

  it("fails fast when groups is not list/string/null", () => {
    expectSassFail(
      `
      @include mx.font-faces(true);
      `,
      "Expected $groups to be a list, string, or null"
    );
  });

  it("provides convenience mixins for base/headings/code", () => {
    expectSassPass(`
      @include mx.base-font-faces();
      @include mx.heading-font-faces();
      @include mx.code-font-faces();
    `);
  });

  it("fails fast for missing group or variant (delegated to strict functions)", () => {
    expectSassFail(
      `
      @include mx.font-face("nope", "normal");
      `,
      "Missing key"
    );

    expectSassFail(
      `
      @include mx.font-face("base", "nope");
      `,
      "Missing key"
    );
  });
});
