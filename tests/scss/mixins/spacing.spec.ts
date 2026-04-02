import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassPass(snippet: string): string {
  return runSass(
    snippet,
    `
    @use "mixins/spacing" as mx;
    `
  );
}

function expectSassFail(snippet: string, messageIncludes: string): void {
  expect(() =>
    runSass(
      snippet,
      `
      @use "mixins/spacing" as mx;
      `
    )
  ).toThrow(messageIncludes);
}

describe("mixins/spacing", () => {
  it("emits a spacing value for a single property", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-prop(margin-top, 4);
      }
    `);

    expect(css).toContain("margin-top");
    expect(css).toMatch(/margin-top:[^;]+;/);
  });

  it("emits a negative spacing value", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-prop-neg(margin-left, 3);
      }
    `);

    expect(css).toContain("margin-left");
    expect(css).toMatch(/margin-left:-/);
  });

  it("emits vertical spacing (top and bottom)", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-y(padding, 2);
      }
    `);

    expect(css).toContain("padding-top");
    expect(css).toContain("padding-bottom");
  });

  it("emits horizontal spacing (left and right)", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-x(margin, 1);
      }
    `);

    expect(css).toContain("margin-left");
    expect(css).toContain("margin-right");
  });

  it("emits shorthand spacing for all sides", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-all(margin, 5);
      }
    `);

    expect(css).toMatch(/margin:[^;]+;/);
  });

  it("emits spacing-list for multiple keys in order", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-list(padding, (1, 2, 3));
      }
    `);

    expect(css).toContain("padding");
    expect(css).toMatch(/padding:(\d|\.|rem)+(\d|\.|rem)+(\d|\.|rem)+;/);
  });

  it("supports spacing-list with a single numeric key", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-list(margin, 4);
      }
    `);

    expect(css).toMatch(/margin:[^;]+;/);
  });

  it("fails fast when property name is not a string", () => {
    expectSassFail(
      `
      .test {
        @include mx.spacing-prop(123, 2);
      }
      `,
      "Expected $property to be a string"
    );
  });

  it("fails fast when spacing key is invalid", () => {
    expectSassFail(
      `
      .test {
        @include mx.spacing-prop(margin, 999);
      }
      `,
      "Missing key"
    );
  });

  it("fails fast when spacing-list keys is invalid type", () => {
    expectSassFail(
      `
      .test {
        @include mx.spacing-list(padding, true);
      }
      `,
      "Expected $keys to be a list or number"
    );
  });

  it("fails fast when spacing-list contains invalid key", () => {
    expectSassFail(
      `
      .test {
        @include mx.spacing-list(padding, (1, 999));
      }
      `,
      "Missing key"
    );
  });

  it("handles spacing key 0 correctly (hard zero)", () => {
    const css = expectSassPass(`
      .test {
        @include mx.spacing-prop(margin, 0);
      }
    `);

    expect(css).toContain("margin:0");
  });
});
