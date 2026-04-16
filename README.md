# @vastare/fundatio

**Version:** 1.0.3  
**Distribution:** npm  
**Purpose:** Shared design foundation for Vastare projects

`@vastare/fundatio` is the canonical foundation package for Vastare front-end systems. It provides:

- design tokens and theme primitives
- typography and bundled font contracts
- CSS variable emission mixins
- Bootstrap 5 integration through the Fundatio adapter
- typed DOM element helpers for runtime-enhanced UI work
- a shared baseline for WordPress themes, Vite applications, and other web builds

This package is intended to be consumed as a real upstream dependency. The examples below use the
**actual published package name** and the **1.0.3 release surface**.

---

## Installation

```bash
npm install @vastare/fundatio
```

For a theme or application that compiles Sass directly from source, also ensure you have the
expected peer toolchain in place, typically including:

- `sass`
- `bootstrap`
- `vite` or your build tool of choice
- `postcss` and `autoprefixer` when relevant

---

## Package entry points

### JavaScript / TypeScript root

```ts
import { fundatioVersion, elements, tailwind } from '@vastare/fundatio';

console.log(fundatioVersion);
```

The root entry exposes:

- `fundatioVersion`
- `elements`
- `tailwind`

### CSS entry points

Prebuilt CSS is available when you want the compiled output directly:

```ts
import '@vastare/fundatio/css';
import '@vastare/fundatio/css/core';
import '@vastare/fundatio/css/main';
```

### Sass entry points

Fundatio is primarily designed to be consumed through Sass modules.

```scss
@use '@vastare/fundatio/scss';
@use '@vastare/fundatio/scss/tokens/theme' as theme;
@use '@vastare/fundatio/scss/mixins/theme' as theme-mx;
@use '@vastare/fundatio/scss/mixins/fonts' as font-mx;
```

Useful public Sass entry points include:

- `@vastare/fundatio/scss`
- `@vastare/fundatio/scss/functions`
- `@vastare/fundatio/scss/mixins`
- `@vastare/fundatio/scss/tokens`
- `@vastare/fundatio/scss/maps`
- `@vastare/fundatio/scss/tokens/theme`
- `@vastare/fundatio/scss/adapters/bootstrap/v5`

### Bootstrap 5 adapter

```scss
@use '@vastare/fundatio/scss/adapters/bootstrap/v5' with (
  $vs-bootstrap-baseline: core
);
```

Supported baseline values:

- `none` : Bootstrap only
- `core` : Fundatio core + Bootstrap
- `main` : Fundatio main baseline + Bootstrap

---

## Theme tokens and CSS variable emission

### Emit all theme variables

```scss
@use '@vastare/fundatio/scss/mixins/theme' as theme-mx;

:root {
  @include theme-mx.theme-root-vars();
}
```

### Emit a single group

```scss
@use '@vastare/fundatio/scss/mixins/theme' as theme-mx;

:root {
  @include theme-mx.theme-group-vars('brand-colours');
}
```

### Override theme primitives

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $theme-prefix: 'vastsite-',
  $primary-colour: #233b4e,
  $secondary-colour: #00bcd4,
  $tertiary-colour: #4b3869
);
```

The theme token layer is the consumer override surface. Downstream maps, functions, and mixins read
from it and should not be patched directly unless you are deliberately extending Fundatio itself.

---

## Fonts

### Default font contract

Fundatio ships with these bundled defaults:

- **Base font:** Merriweather
- **Heading font:** Montserrat
- **Code font:** `ui-monospace`
- **Default packaged font format:** `ttf`

### Override the packaged font format

Fundatio no longer relies on bundled fallback source stacks. The active packaged format is
controlled by a single overrideable token.

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $font-package-format: 'woff2'
);
```

That token controls the emitted source extension for the packaged contract.

### Override font families

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $base-font: 'Custom Serif',
  $heading-font: 'Custom Sans'
);
```

### Emit `@font-face` rules

```scss
@use '@vastare/fundatio/scss/mixins/fonts' as font-mx;

@include font-mx.font-group-faces('base');
@include font-mx.font-group-faces('headings');
```

or all groups:

```scss
@use '@vastare/fundatio/scss/mixins/fonts' as font-mx;

@include font-mx.font-faces();
```

### Font asset paths in real builds

This matters, because build tools love pretending asset paths are obvious when they absolutely are
not.

Fundatio emits font URLs using the configurable theme token:

```scss
$base-font-path
```

Default:

```scss
'../assets/fonts'
```

That default is intentionally conservative and works best when the consuming project copies the
Fundatio font assets into its own build output.

#### Recommended approach for Vite / WordPress themes

1. Copy the package font assets into your project-owned public or dist asset directory.
2. Override `$base-font-path` to the path your final CSS should use at runtime.

Example:

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $base-font-path: '../assets/fonts'
);
```

If your build emits CSS somewhere else, set the path accordingly:

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $base-font-path: '/wp-content/themes/vastsite/dist/assets/fonts'
);
```

#### Why this is explicit now

Bundlers such as Vite cannot safely guess your deployment structure for self-hosted font assets
inside a WordPress theme, library consumer app, or multi-stage CI pipeline. Fundatio therefore
treats the font base path as a **consumer-controlled deployment concern** rather than hiding it
behind brittle magic.

That keeps the package predictable across:

- Vite applications
- WordPress themes
- static site builds
- other self-hosted pipelines

---

## Bootstrap adapter notes

Fundatio's Bootstrap adapter exists to provide a stable Bootstrap 5 composition point while still
allowing Fundatio tokens and baselines to participate in the build.

```scss
@use '@vastare/fundatio/scss/adapters/bootstrap/v5' with (
  $vs-bootstrap-baseline: main
);
```

### About Sass deprecation warnings

Bootstrap 5 still depends on legacy Sass import-era patterns internally. Because Bootstrap's
variable configuration model is still based on that pipeline, Fundatio maintains a minimal
compatibility bridge in the adapter.

In practice this means:

- Fundatio keeps its own Sass modules modern where it can
- Bootstrap-originated Sass warnings may still appear until Bootstrap fully modernises upstream
- those upstream warnings are not the same thing as Fundatio having an invalid public API

If you are auditing warnings in CI, separate:

- **Fundatio-owned warnings**
- **Bootstrap upstream warnings**

That distinction saves a lot of pointless suffering.

---

## Real-world Vite + WordPress integration example

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $theme-prefix: 'vastsite-',
  $base-font-path: '../assets/fonts',
  $primary-colour: #233b4e,
  $secondary-colour: #00bcd4,
  $tertiary-colour: #4b3869
);

@use '@vastare/fundatio/scss/adapters/bootstrap/v5' with (
  $vs-bootstrap-baseline: core
);

@use '@vastare/fundatio/scss/mixins/theme' as theme-mx;
@use '@vastare/fundatio/scss/mixins/fonts' as font-mx;

:root {
  @include theme-mx.theme-root-vars();
}

@include font-mx.font-faces();
```

---

## Public API notes

### Version export

```ts
import { fundatioVersion } from '@vastare/fundatio';
```

### Elements namespace

```ts
import { elements } from '@vastare/fundatio';
```

### Tailwind adapter namespace

```ts
import { tailwind } from '@vastare/fundatio';
```

Fundatio's public surface should be treated as intentional. Internal naming leftovers should not be
relied upon for new integrations.

---

## Versioning and release discipline

Fundatio follows semantic versioning.

- `1.x` is the stable public package line
- `1.0.2` is the current release represented by this repository snapshot

For releases, keep these aligned every single time:

- `package.json`
- git tag
- npm publish version
- README examples and metadata

Because breaking your consumers with version drift is a spectacularly boring way to lose trust.

---

## Release metadata

- **Package:** `@vastare/fundatio`
- **Release:** `1.0.2`
- **README target:** production consumer usage
