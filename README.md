# @Vastare/Fundatio (v1.0.0)

**Fundatio** is a framework-agnostic design foundation for UI kits and applications.

It ships:

- **CSS** builds (ready to drop into any app)
- **SCSS** source (tokens, functions, mixins, element styles, and adapters)
- **Typed HTML element factories** (safe-ish DOM creation helpers with strong TypeScript typing)
- **Tailwind v4 adapter** (preset + plugin wrapper)

Repo: https://github.com/lnpgdev/Fundatio  
Docs (VitePress site): `npm run docs`  
API docs (TypeDoc markdown): generated into `docs/api/ts`

---

## Table of contents

- [What Fundatio is](#what-Fundatio-is)
- [Install](#install)
- [Entry points](#entry-points)
  - [JavaScript/TypeScript](#javascripttypescript)
  - [Elements API](#elements-api)
  - [Tailwind adapter](#tailwind-adapter)
  - [CSS entry points](#css-entry-points)
  - [SCSS entry points](#scss-entry-points)
- [Quick start](#quick-start)
  - [Use prebuilt CSS](#use-prebuilt-css)
  - [Use SCSS tokens/functions/mixins](#use-scss-tokensfunctionsmixins)
  - [Use element factories](#use-element-factories)
  - [Use Tailwind adapter](#use-tailwind-adapter)
- [Design + security principles](#design--security-principles)
- [Build outputs](#build-outputs)
- [Scripts](#scripts)
- [Production readiness checklist](#production-readiness-checklist)
- [Contributing](#contributing)
- [License](#license)

---

## What Fundatio is

Fundatio aims to be the **lowest-level** design foundation layer:

- **Styles**: tokens + primitives + optional element styling
- **DOM**: typed factories that wrap native elements (no framework assumptions)

Fundatio intentionally does **not** attempt to be:

- a full component library
- a design system website
- a framework binding (React/Vue/etc)

Think of it as: _“a reliable base layer you can import into anything, without regretting it later.”_

---

## Install

```bash
npm i @Vastare/Fundatio
```
