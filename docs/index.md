# @vastare/fundatio

Fundatio is the shared design foundation package for Vastare projects.

## Install

```bash
npm install @vastare/fundatio
```

## Core usage

```scss
@use '@vastare/fundatio/scss/mixins/theme' as theme-mx;

:root {
  @include theme-mx.theme-root-vars();
}
```

## Fonts

Fundatio ships with Merriweather for body copy and Montserrat for headings. Override the deployment
path when your consuming build copies fonts into its own output.

```scss
@use '@vastare/fundatio/scss/tokens/theme' with (
  $base-font-path: '../assets/fonts'
);
```

## Bootstrap adapter

```scss
@use '@vastare/fundatio/scss/adapters/bootstrap/v5' with (
  $vs-bootstrap-baseline: core
);
```

## Version

This docs snapshot targets **1.0.1**.
