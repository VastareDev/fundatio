# Fundatio

**Version:** 1.0.0  
**Distribution:** NPM  
**Purpose:** Design Foundation / CSS Architecture Layer

Fundatio is a structured Sass design foundation providing a stable, production‑grade token, theme, and variable emission system.

---

## Installation

```bash
npm install fundatio
```

---

## Entry Points

### Core Theme Root

```scss
@use "fundatio/mixins/theme" as theme;

:root {
  @include theme.theme-root-vars();
}
```

### Scoped Theme Example

```scss
[data-theme="dark"] {
  @include theme.theme-root-vars();
}
```

---

## Fonts

### Default Behaviour

Fundatio ships with:

- Base font: **Merriweather**
- Heading font: **Montserrat**
- Default packaged format: **TTF**

### Overriding Font Format

```scss
@use "fundatio/tokens/theme" with (
  $font-package-format: "woff2"
);
```

### Overriding Base Font

```scss
@use "fundatio/tokens/theme" with (
  $base-font: "Custom Serif"
);
```

---

## Versioning

Fundatio follows semantic versioning.

- 1.x.x — stable public API
- 0.x.x — internal evolution

---

## Release

This documentation corresponds to:

**Fundatio v1.0.0**  
Generated: 2026-04-02T21:09:50.423742Z
