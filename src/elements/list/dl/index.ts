/**
 * Fundatio Design Foundation: Dl element helpers.
 *
 * @remarks
 * The dl element (`<dl>`) represents a description list (a set of name-value groups).
 * It is commonly used with `<dt>` (term/name) and `<dd>` (description/value).
 *
 * Best-practice guidance:
 * - Prefer `<dl>` when you're expressing name-value pairs (not just "a list").
 * - Use `<dt>` / `<dd>` in sensible groupings to keep meaning clear.
 * - Avoid misusing `<dl>` for layout or arbitrary indentation; use CSS instead.
 *
 * Attributes:
 * - `<dl>` has no element-specific attributes in modern HTML.
 * - It accepts standard global attributes (id, class, lang, data-*, aria-*, etc.).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<dl>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for description lists.
 *
 * @category Constants
 */
export const DL_TAG = 'dl' as const;

/**
 * A CSS selector targeting dl elements.
 *
 * @category Constants
 */
export const DL_SELECTOR = 'dl';

/**
 * Attribute bag for dl creation/enhancement.
 *
 * @remarks
 * Dl elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type DlAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link DlAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The dl attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: DlAttrs): GlobalAttrs | undefined {
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
 * Create a dl element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - In real usage, `<dl>` typically contains `<dt>` / `<dd>` children; Fundatio keeps
 *   factories small and safe, so this helper supports optional text as a simple
 *   convenience, not as a replacement for proper `<dt>` / `<dd>` structure.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the dl.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<dl>` element.
 *
 * @example
 * Create and append a dl:
 * ```ts
 * import { createDl } from "@Vastare/Fundatio/elements/list/dl";
 *
 * document.body.appendChild(
 *   createDl(undefined, { className: "meta", id: "product-specs" })
 * );
 * ```
 *
 * @category DOM
 */
export function createDl(text?: string, attrs?: DlAttrs): ElementOf<typeof DL_TAG> {
  return createElement(DL_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance dl elements within a given root.
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
export function enhanceDls(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for dl.
  void root;
}
