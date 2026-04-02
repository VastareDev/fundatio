import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

function expectSassAssertionsPass(snippet: string): void {
  const header = `
        @use "functions/fonts" as fn;
    @use "maps/fonts" as font-maps;
  `;

  expect(() => {
    runSass(`${snippet}
.__sol_function_test__ { content: "ok"; }`, header);
  }).not.toThrow();
}

function expectSassAssertionsFail(snippet: string, messageIncludes: string): void {
  const header = `
        @use "functions/fonts" as fn;
    @use "maps/fonts" as font-maps;
  `;

  expect(() => {
    runSass(`${snippet}
.__sol_function_test__ { content: "ok"; }`, header);
  }).toThrow(messageIncludes);
}

describe("functions/fonts", () => {
  it("exposes registry introspection APIs and returns correct types", () => {
    expectSassAssertionsPass(`
      $groups: fn.font-groups();
      @if meta.type-of($groups) != "list" { @error "Expected font-groups() to return a list"; }
      @if $groups != map.keys(font-maps.$fonts) { @error "Expected font-groups() to equal map.keys($fonts)"; }
      @if list.index($groups, "base") == null { @error "Expected font-groups() to include 'base'"; }
      @if list.index($groups, "headings") == null { @error "Expected font-groups() to include 'headings'"; }
      @if list.index($groups, "code") == null { @error "Expected font-groups() to include 'code'"; }
    `);
  });

  it("returns variants and descriptor keys", () => {
    expectSassAssertionsPass(`
      $variants: fn.font-variants("base");
      @if $variants != ("normal", "italic") { @error "Unexpected variants for base group"; }
      $keys: fn.font-descriptors("base", "normal");
      @if $keys != ("family", "display", "style", "weight", "sources") { @error "Unexpected descriptor keys"; }
    `);
  });

  it("returns full maps and descriptor values aligned to registry", () => {
    expectSassAssertionsPass(`
      @if fn.font-group("base") != map.get(font-maps.$fonts, "base") { @error "font-group mismatch"; }
      @if fn.font-variant("base", "normal") != map.get(map.get(font-maps.$fonts, "base"), "normal") { @error "font-variant mismatch"; }
      @if fn.font-descriptor("base", "normal", "family") != map.get(map.get(map.get(font-maps.$fonts, "base"), "normal"), "family") { @error "font-descriptor mismatch"; }
    `);
  });

  it("returns sources map and individual sources; fs() supports the truetype alias", () => {
    expectSassAssertionsPass(`
      $sources: fn.font-sources("base", "normal");
      @if map.has-key($sources, "ttf") == false { @error "Expected sources to contain 'ttf'"; }
      @if fn.font-source("base", "normal", "ttf") != map.get($sources, "ttf") { @error "font-source(ttf) mismatch"; }
      @if fn.fs("base", "normal", "truetype") != map.get($sources, "ttf") { @error "fs(truetype) mismatch"; }
    `);
  });

  it("supports safe lookup via try-font-variant / try-font-source", () => {
    expectSassAssertionsPass(`
      @if fn.try-font-variant("base", "normal") == null { @error "Expected existing variant"; }
      @if fn.try-font-variant("base", "missing") != null { @error "Expected missing variant to return null"; }
      @if fn.try-font-source("base", "normal", "ttf") == null { @error "Expected existing source"; }
      @if fn.try-font-source("base", "normal", "missing") != null { @error "Expected missing source to return null"; }
    `);
  });

  it("supports existence checks", () => {
    expectSassAssertionsPass(`
      @if fn.has-font-group("base") != true { @error "Expected base group to exist"; }
      @if fn.has-font-variant("base", "normal") != true { @error "Expected base/normal to exist"; }
      @if fn.has-font-descriptor("base", "normal", "family") != true { @error "Expected family descriptor to exist"; }
    `);
  });

  it("fails fast on invalid argument types and values", () => {
    expectSassAssertionsFail(`$_: fn.font-group(123);`, "Expected $group to be type 'string'");
    expectSassAssertionsFail(`$_: fn.font-variant("base", " ");`, "Expected $variant to be a non-empty string");
    expectSassAssertionsFail(`$_: fn.font-source("base", "normal", "missing");`, "Missing key 'missing'");
  });
});
