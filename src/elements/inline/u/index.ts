/**
 * Sol Design Foundation: U element helpers.
 *
 * @remarks
 * The u element (`<u>`) represents a span of text with an unarticulated,
 * explicitly rendered non-textual annotation.
 *
 * Best-practice guidance:
 * - Do not use `<u>` purely for underlining text. Use CSS (`text-decoration`) for
 *   presentation.
 * - Use `<u>` only when the semantics are appropriate (e.g. marking misspellings
 *   or other non-textual annotations).
 * - Avoid usage where it could be confused with a hyperlink.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create u elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Sol element factories.
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
 * The semantic tag name for unarticulated annotation spans.
 *
 * @category Constants
 */
export const U_TAG = 'u' as const;

/**
 * A CSS selector targeting u elements.
 *
 * @category Constants
 */
export const U_SELECTOR = 'u';

/**
 * Attribute bag for u creation/enhancement.
 *
 * @remarks
 * U elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type UAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link UAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The u attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: UAttrs): GlobalAttrs | undefined {
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
 * Create a u element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the u element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<u>` element.
 *
 * @example
 * ```ts
 * import { createU } from "@lnpg/sol/elements/inline/u";
 *
 * const misspelt = createU("teh", { aria: { label: "Misspelt word" } });
 * ```
 *
 * @category DOM
 */
export function createU(text?: string, attrs?: UAttrs): ElementOf<typeof U_TAG> {
  return createElement(U_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance u elements within a given root.
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
export function enhanceUs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for u.
  void root;
}
