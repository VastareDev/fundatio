/**
 * Fundatio Design Foundation: Div element helpers.
 *
 * @remarks
 * The div element (`<div>`) is a non-semantic, generic container.
 *
 * Best-practice guidance:
 * - Prefer semantic elements when available (e.g. `<section>`, `<nav>`, `<article>`).
 * - Use `<div>` as a last resort when no semantic element fits.
 * - Avoid obsolete attributes like `align`; use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create div containers in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * prevents typo-based ARIA bugs (e.g. `lable`).
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
 * The semantic tag name for div containers.
 *
 * @category Constants
 */
export const DIV_TAG = 'div' as const;

/**
 * A CSS selector targeting div elements.
 *
 * @category Constants
 */
export const DIV_SELECTOR = 'div';

/**
 * Attribute bag for div creation/enhancement.
 *
 * @remarks
 * Div elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type DivAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link DivAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The div attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: DivAttrs): GlobalAttrs | undefined {
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
 * Create a div element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the div.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<div>` element.
 *
 * @example
 * Create and append a div:
 * ```ts
 * import { createDiv } from "@Vastare/Fundatio/elements/container/div";
 *
 * document.body.appendChild(
 *   createDiv("Hello.", { className: "box", id: "root" })
 * );
 * ```
 *
 * @category DOM
 */
export function createDiv(text?: string, attrs?: DivAttrs): ElementOf<typeof DIV_TAG> {
  return createElement(DIV_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance div elements within a given root.
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
export function enhanceDivs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for div.
  void root;
}
