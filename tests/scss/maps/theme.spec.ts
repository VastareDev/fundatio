// tests/scss/maps/theme.spec.ts
import { describe, it, expect } from "vitest";
import { runSass } from "../../utils/testing.ts";

/**
 * Compiles a Sass snippet that performs compile-time assertions via @error.
 * If an assertion fails, Sass compilation fails and the test fails.
 *
 * We assert within Sass to avoid CSS serialization quirks.
 *
 * @since  1.0.0
 * @access Public
 */
function expectSassAssertionsPass(snippet: string): void {
  const header = `
    @use "tokens/theme" as tokens;
    @use "maps/theme" as maps;
  `;

  expect(() => {
    runSass(
      `
      ${snippet}

      // Emit at least one rule so the pipeline always produces CSS output.
      .__sol_map_test__ { content: "ok"; }
    `,
      header
    );
  }).not.toThrow();
}

describe("maps/theme", () => {
  it("exports expected top-level maps", () => {
    expectSassAssertionsPass(`
      @if meta.type-of(maps.$feature-flags) != "map" { @error "Expected $feature-flags to be a map"; }
      @if meta.type-of(maps.$namespace) != "map" { @error "Expected $namespace to be a map"; }
      @if meta.type-of(maps.$font-families) != "map" { @error "Expected $font-families to be a map"; }
      @if meta.type-of(maps.$base-colours) != "map" { @error "Expected $base-colours to be a map"; }
      @if meta.type-of(maps.$brand-colours) != "map" { @error "Expected $brand-colours to be a map"; }
      @if meta.type-of(maps.$state-colours) != "map" { @error "Expected $state-colours to be a map"; }
      @if meta.type-of(maps.$surface-colours) != "map" { @error "Expected $surface-colours to be a map"; }
      @if meta.type-of(maps.$asset-paths) != "map" { @error "Expected $asset-paths to be a map"; }
      @if meta.type-of(maps.$font-sources) != "map" { @error "Expected $font-sources to be a map"; }

      @if meta.type-of(maps.$theme) != "map" { @error "Expected $theme to be a map"; }
    `);
  });

  it("registry contains expected keys in the expected order and references the actual maps", () => {
    expectSassAssertionsPass(`
      $expected: (
        "feature-flags",
        "namespace",
        "font-families",
        "base-colours",
        "brand-colours",
        "state-colours",
        "surface-colours",
        "asset-paths",
        "font-sources"
      );

      $keys: map.keys(maps.$theme);

      @if list.length($keys) != list.length($expected) {
        @error "Expected $theme to have #{list.length($expected)} keys, got #{list.length($keys)}";
      }

      @for $i from 1 through list.length($expected) {
        @if list.nth($keys, $i) != list.nth($expected, $i) {
          @error "Theme registry key order mismatch at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
        }
      }

      @if map.get(maps.$theme, "feature-flags") != maps.$feature-flags { @error "Expected registry 'feature-flags' to reference $feature-flags"; }
      @if map.get(maps.$theme, "namespace") != maps.$namespace { @error "Expected registry 'namespace' to reference $namespace"; }
      @if map.get(maps.$theme, "font-families") != maps.$font-families { @error "Expected registry 'font-families' to reference $font-families"; }
      @if map.get(maps.$theme, "base-colours") != maps.$base-colours { @error "Expected registry 'base-colours' to reference $base-colours"; }
      @if map.get(maps.$theme, "brand-colours") != maps.$brand-colours { @error "Expected registry 'brand-colours' to reference $brand-colours"; }
      @if map.get(maps.$theme, "state-colours") != maps.$state-colours { @error "Expected registry 'state-colours' to reference $state-colours"; }
      @if map.get(maps.$theme, "surface-colours") != maps.$surface-colours { @error "Expected registry 'surface-colours' to reference $surface-colours"; }
      @if map.get(maps.$theme, "asset-paths") != maps.$asset-paths { @error "Expected registry 'asset-paths' to reference $asset-paths"; }
      @if map.get(maps.$theme, "font-sources") != maps.$font-sources { @error "Expected registry 'font-sources' to reference $font-sources"; }
    `);
  });

  it("sub-maps contain the expected keys in the expected order", () => {
    expectSassAssertionsPass(`
      @function _assert-keys($m, $expected, $label) {
        @if meta.type-of($m) != "map" { @error "Expected #{$label} to be a map"; }

        $keys: map.keys($m);

        @if list.length($keys) != list.length($expected) {
          @error "Expected #{$label} to have #{list.length($expected)} keys, got #{list.length($keys)}";
        }

        @for $i from 1 through list.length($expected) {
          @if list.nth($keys, $i) != list.nth($expected, $i) {
            @error "Key order mismatch in #{$label} at index #{$i}: expected '#{list.nth($expected, $i)}' got '#{list.nth($keys, $i)}'";
          }
        }

        @return $m;
      }

      $_: _assert-keys(maps.$feature-flags, ("theme-dark-mode"), "feature-flags");
      $_: _assert-keys(maps.$namespace, ("theme-prefix"), "namespace");
      $_: _assert-keys(maps.$font-families, ("base-font","heading-font","code-font"), "font-families");
      $_: _assert-keys(maps.$base-colours, ("body-bg-color","base-font-color","code-font-color","heading-font-color"), "base-colours");
      $_: _assert-keys(maps.$brand-colours, ("primary-colour","secondary-colour","tertiary-colour"), "brand-colours");
      $_: _assert-keys(maps.$state-colours, ("success-colour","info-colour","warning-colour","danger-colour"), "state-colours");
      $_: _assert-keys(maps.$surface-colours, ("light-colour","dark-colour"), "surface-colours");
      $_: _assert-keys(maps.$asset-paths, ("base-font-path"), "asset-paths");

      $_: _assert-keys(maps.$font-sources, ("base","headings","code"), "font-sources");
      $_: _assert-keys(map.get(maps.$font-sources, "base"), ("woff2","ttf","italic-woff2","italic-ttf"), "font-sources.base");
      $_: _assert-keys(map.get(maps.$font-sources, "headings"), ("woff2","ttf","italic-woff2","italic-ttf"), "font-sources.headings");
      $_: _assert-keys(map.get(maps.$font-sources, "code"), ("woff2","ttf","italic-woff2","italic-ttf"), "font-sources.code");
    `);
  });

  it("every map entry matches the canonical token value exactly", () => {
    expectSassAssertionsPass(`
      @function _eq($a, $b, $label) {
        @if $a != $b { @error "Value mismatch for #{$label}"; }
        @return $a;
      }

      // feature-flags
      $_: _eq(map.get(maps.$feature-flags, "theme-dark-mode"), tokens.$theme-dark-mode, "feature-flags.theme-dark-mode");

      // namespace
      $_: _eq(map.get(maps.$namespace, "theme-prefix"), tokens.$theme-prefix, "namespace.theme-prefix");

      // font-families
      $_: _eq(map.get(maps.$font-families, "base-font"), tokens.$base-font, "font-families.base-font");
      $_: _eq(map.get(maps.$font-families, "heading-font"), tokens.$heading-font, "font-families.heading-font");
      $_: _eq(map.get(maps.$font-families, "code-font"), tokens.$code-font, "font-families.code-font");

      // base-colours
      $_: _eq(map.get(maps.$base-colours, "body-bg-color"), tokens.$body-bg-color, "base-colours.body-bg-color");
      $_: _eq(map.get(maps.$base-colours, "base-font-color"), tokens.$base-font-color, "base-colours.base-font-color");
      $_: _eq(map.get(maps.$base-colours, "code-font-color"), tokens.$code-font-color, "base-colours.code-font-color");
      $_: _eq(map.get(maps.$base-colours, "heading-font-color"), tokens.$heading-font-color, "base-colours.heading-font-color");

      // brand-colours
      $_: _eq(map.get(maps.$brand-colours, "primary-colour"), tokens.$primary-colour, "brand-colours.primary-colour");
      $_: _eq(map.get(maps.$brand-colours, "secondary-colour"), tokens.$secondary-colour, "brand-colours.secondary-colour");
      $_: _eq(map.get(maps.$brand-colours, "tertiary-colour"), tokens.$tertiary-colour, "brand-colours.tertiary-colour");

      // state-colours
      $_: _eq(map.get(maps.$state-colours, "success-colour"), tokens.$success-colour, "state-colours.success-colour");
      $_: _eq(map.get(maps.$state-colours, "info-colour"), tokens.$info-colour, "state-colours.info-colour");
      $_: _eq(map.get(maps.$state-colours, "warning-colour"), tokens.$warning-colour, "state-colours.warning-colour");
      $_: _eq(map.get(maps.$state-colours, "danger-colour"), tokens.$danger-colour, "state-colours.danger-colour");

      // surface-colours
      $_: _eq(map.get(maps.$surface-colours, "light-colour"), tokens.$light-colour, "surface-colours.light-colour");
      $_: _eq(map.get(maps.$surface-colours, "dark-colour"), tokens.$dark-colour, "surface-colours.dark-colour");

      // asset-paths
      $_: _eq(map.get(maps.$asset-paths, "base-font-path"), tokens.$base-font-path, "asset-paths.base-font-path");

      // font-sources (base)
      $_: _eq(map.get(map.get(maps.$font-sources, "base"), "woff2"), tokens.$base-font-woff2-path, "font-sources.base.woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "base"), "ttf"), tokens.$base-font-ttf-path, "font-sources.base.ttf");
      $_: _eq(map.get(map.get(maps.$font-sources, "base"), "italic-woff2"), tokens.$base-font-italic-woff2-path, "font-sources.base.italic-woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "base"), "italic-ttf"), tokens.$base-font-italic-ttf-path, "font-sources.base.italic-ttf");

      // font-sources (headings)
      $_: _eq(map.get(map.get(maps.$font-sources, "headings"), "woff2"), tokens.$heading-font-woff2-path, "font-sources.headings.woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "headings"), "ttf"), tokens.$heading-font-ttf-path, "font-sources.headings.ttf");
      $_: _eq(map.get(map.get(maps.$font-sources, "headings"), "italic-woff2"), tokens.$heading-font-italic-woff2-path, "font-sources.headings.italic-woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "headings"), "italic-ttf"), tokens.$heading-font-italic-ttf-path, "font-sources.headings.italic-ttf");

      // font-sources (code)
      $_: _eq(map.get(map.get(maps.$font-sources, "code"), "woff2"), tokens.$code-font-woff2-path, "font-sources.code.woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "code"), "ttf"), tokens.$code-font-ttf-path, "font-sources.code.ttf");
      $_: _eq(map.get(map.get(maps.$font-sources, "code"), "italic-woff2"), tokens.$code-font-italic-woff2-path, "font-sources.code.italic-woff2");
      $_: _eq(map.get(map.get(maps.$font-sources, "code"), "italic-ttf"), tokens.$code-font-italic-ttf-path, "font-sources.code.italic-ttf");
    `);
  });

  it("all maps: types are correct and integrity rules hold", () => {
    expectSassAssertionsPass(`
        // ---------------------------------------------------------------------
        // Helpers
        // ---------------------------------------------------------------------

        @function _assert-type($value, $expected, $label) {
        $t: meta.type-of($value);

        @if $t != $expected {
            @error "Expected #{$label} to be type '#{$expected}', got '#{$t}'";
        }

        @return $value;
        }

        @function _assert-string-nonempty($value, $label) {
        $_: _assert-type($value, "string", $label);

        @if string.length($value) == 0 {
            @error "Expected #{$label} to be a non-empty string";
        }

        @return $value;
        }

        @function _assert-bool($value, $label) {
        $_: _assert-type($value, "bool", $label);
        @return $value;
        }

        @function _assert-color($value, $label) {
        $_: _assert-type($value, "color", $label);
        @return $value;
        }

        @function _assert-map($value, $label) {
        $_: _assert-type($value, "map", $label);
        @return $value;
        }

        // Keep this TOP-LEVEL. Sass doesn't allow nested @function declarations.
        @function _ends-with($s, $suffix) {
        $ls: string.length($s);
        $lx: string.length($suffix);

        @if $ls < $lx { @return false; }
        @return string.slice($s, $ls - $lx + 1) == $suffix;
        }

        // ---------------------------------------------------------------------
        // Root and top-level map type checks
        // ---------------------------------------------------------------------

        $_: _assert-map(maps.$theme, "$theme");
        $_: _assert-map(maps.$feature-flags, "$feature-flags");
        $_: _assert-map(maps.$namespace, "$namespace");
        $_: _assert-map(maps.$font-families, "$font-families");
        $_: _assert-map(maps.$base-colours, "$base-colours");
        $_: _assert-map(maps.$brand-colours, "$brand-colours");
        $_: _assert-map(maps.$state-colours, "$state-colours");
        $_: _assert-map(maps.$surface-colours, "$surface-colours");
        $_: _assert-map(maps.$asset-paths, "$asset-paths");
        $_: _assert-map(maps.$font-sources, "$font-sources");

        // ---------------------------------------------------------------------
        // Feature flags
        // ---------------------------------------------------------------------

        $_: _assert-bool(map.get(maps.$feature-flags, "theme-dark-mode"), "feature-flags.theme-dark-mode");

        // ---------------------------------------------------------------------
        // Namespace
        // ---------------------------------------------------------------------

        $prefix: map.get(maps.$namespace, "theme-prefix");
        $_: _assert-string-nonempty($prefix, "namespace.theme-prefix");

        @if string.slice($prefix, -1) != "-" {
        @error "Expected namespace.theme-prefix to end with '-' (got '#{$prefix}')";
        }

        // ---------------------------------------------------------------------
        // Font families (single family names, not stacks)
        // ---------------------------------------------------------------------

        $_: _assert-string-nonempty(map.get(maps.$font-families, "base-font"), "font-families.base-font");
        $_: _assert-string-nonempty(map.get(maps.$font-families, "heading-font"), "font-families.heading-font");
        $_: _assert-string-nonempty(map.get(maps.$font-families, "code-font"), "font-families.code-font");

        @function _assert-no-commas($s, $label) {
        @if string.index($s, ",") != null {
            @error "Expected #{$label} to be a single font family name (no commas), got '#{$s}'";
        }
        @return $s;
        }

        $_: _assert-no-commas(map.get(maps.$font-families, "base-font"), "font-families.base-font");
        $_: _assert-no-commas(map.get(maps.$font-families, "heading-font"), "font-families.heading-font");
        $_: _assert-no-commas(map.get(maps.$font-families, "code-font"), "font-families.code-font");

        // ---------------------------------------------------------------------
        // Colour roles
        // ---------------------------------------------------------------------

        $_: _assert-color(map.get(maps.$base-colours, "body-bg-color"), "base-colours.body-bg-color");
        $_: _assert-color(map.get(maps.$base-colours, "base-font-color"), "base-colours.base-font-color");
        $_: _assert-color(map.get(maps.$base-colours, "code-font-color"), "base-colours.code-font-color");
        $_: _assert-color(map.get(maps.$base-colours, "heading-font-color"), "base-colours.heading-font-color");

        $_: _assert-color(map.get(maps.$brand-colours, "primary-colour"), "brand-colours.primary-colour");
        $_: _assert-color(map.get(maps.$brand-colours, "secondary-colour"), "brand-colours.secondary-colour");
        $_: _assert-color(map.get(maps.$brand-colours, "tertiary-colour"), "brand-colours.tertiary-colour");

        $_: _assert-color(map.get(maps.$state-colours, "success-colour"), "state-colours.success-colour");
        $_: _assert-color(map.get(maps.$state-colours, "info-colour"), "state-colours.info-colour");
        $_: _assert-color(map.get(maps.$state-colours, "warning-colour"), "state-colours.warning-colour");
        $_: _assert-color(map.get(maps.$state-colours, "danger-colour"), "state-colours.danger-colour");

        $_: _assert-color(map.get(maps.$surface-colours, "light-colour"), "surface-colours.light-colour");
        $_: _assert-color(map.get(maps.$surface-colours, "dark-colour"), "surface-colours.dark-colour");

        // ---------------------------------------------------------------------
        // Asset paths
        // ---------------------------------------------------------------------

        $font-path: map.get(maps.$asset-paths, "base-font-path");
        $_: _assert-string-nonempty($font-path, "asset-paths.base-font-path");

        $first: string.slice($font-path, 1, 1);

        $is-url: string.index($font-path, "://") != null;
        $is-absolute: $first == "/";
        $is-relative: $first == ".";

        @if not ($is-url or $is-absolute or $is-relative) {
          @error "Expected asset-paths.base-font-path to be absolute (/...), relative (./ or ../), or a URL (://). Got '#{$font-path}'";
        }

        // ---------------------------------------------------------------------
        // Font sources integrity
        // ---------------------------------------------------------------------

        @function _assert-font-source-group($group, $label) {
        $_: _assert-map($group, $label);

        $woff2: map.get($group, "woff2");
        $ttf: map.get($group, "ttf");
        $iwoff2: map.get($group, "italic-woff2");
        $ittf: map.get($group, "italic-ttf");

        $_: _assert-string-nonempty($woff2, "#{$label}.woff2");
        $_: _assert-string-nonempty($ttf, "#{$label}.ttf");
        $_: _assert-string-nonempty($iwoff2, "#{$label}.italic-woff2");
        $_: _assert-string-nonempty($ittf, "#{$label}.italic-ttf");

        @if _ends-with($woff2, ".woff2") != true { @error "Expected #{$label}.woff2 to end with .woff2 (got '#{$woff2}')"; }
        @if _ends-with($ttf, ".ttf") != true { @error "Expected #{$label}.ttf to end with .ttf (got '#{$ttf}')"; }
        @if _ends-with($iwoff2, ".woff2") != true { @error "Expected #{$label}.italic-woff2 to end with .woff2 (got '#{$iwoff2}')"; }
        @if _ends-with($ittf, ".ttf") != true { @error "Expected #{$label}.italic-ttf to end with .ttf (got '#{$ittf}')"; }

        @if $iwoff2 == $woff2 { @error "Expected #{$label}.italic-woff2 to differ from #{$label}.woff2"; }
        @if $ittf == $ttf { @error "Expected #{$label}.italic-ttf to differ from #{$label}.ttf"; }

        @return $group;
        }

        $_: _assert-font-source-group(map.get(maps.$font-sources, "base"), "font-sources.base");
        $_: _assert-font-source-group(map.get(maps.$font-sources, "headings"), "font-sources.headings");
        $_: _assert-font-source-group(map.get(maps.$font-sources, "code"), "font-sources.code");
    `);
  });
});
