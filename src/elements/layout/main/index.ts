/**
 * Fundatio Design Foundation: Main element helpers.
 *
 * @remarks
 * The main element (`<main>`) represents the dominant content of the document.
 * It is a landmark element that helps assistive technologies and other tooling
 * identify the primary content area.
 *
 * Best-practice guidance:
 * - Use **only one** `<main>` per document.
 * - The content of `<main>` should be unique to the document (avoid repeated UI
 *   like nav, site chrome, copyright, etc.).
 * - Do not place `<main>` as a descendant of `<article>`, `<aside>`, `<footer>`,
 *   `<header>`, or `<nav>`.
 *
 * Attributes:
 * - `<main>` supports **global attributes only**.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create main landmarks in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: Main element (`<main>`)
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Fundatio element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset that covers common cases and
 * prevents typo-based ARIA bugs.
 *
 * It is mapped into {@link GlobalAttrs.aria} for application by `dom.ts`.
 *
 * @category Attributes
 */
export type StructuredAria = {
  /**
   * Accessible label, mapped to `aria-label`.
   */
  label?: string;

  /**
   * ID reference to the labelling element(s), mapped to `aria-labelledby`.
   */
  labelledby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * The semantic tag name for main landmarks.
 *
 * @category Constants
 */
export const MAIN_TAG = 'main' as const;

/**
 * A CSS selector targeting main elements.
 *
 * @category Constants
 */
export const MAIN_SELECTOR = 'main';

/**
 * Attribute bag for main creation/enhancement.
 *
 * @remarks
 * Main elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type MainAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link MainAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The main attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: MainAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  // Only attach `aria` if something was actually defined.
  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create a main element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * This helper does not enforce document-level semantics (e.g. "only one `<main>`")
 * at runtime. That is a document-authoring responsibility.
 *
 * @param text - Optional text content for the main element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<main>` element.
 *
 * @example
 * ```ts
 * import { createMain } from "@Vastare/Fundatio/elements/layout/main";
 *
 * document.body.appendChild(
 *   createMain(undefined, { id: "content", className: "page-main" })
 * );
 * ```
 *
 * @category DOM
 */
export function createMain(text?: string, attrs?: MainAttrs): ElementOf<typeof MAIN_TAG> {
  return createElement(MAIN_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance main elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * What it will never do:
 * - It will not inject styles (CSS remains the source of truth)
 * - It will not introduce framework-specific behavior
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceMains(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for main.
  void root;
}
