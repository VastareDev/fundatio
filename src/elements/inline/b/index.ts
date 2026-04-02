/**
 * Fundatio Design Foundation: B element helpers.
 *
 * @remarks
 * The b element (`<b>`) represents a span of text to which attention is being
 * drawn for utilitarian purposes, without conveying extra importance.
 *
 * Best-practice guidance:
 * - Use `<b>` to draw attention without implying importance.
 * - Use `<strong>` for strong importance and `<em>` for stress emphasis.
 * - Do not use `<b>` purely for styling. Prefer CSS (e.g. `font-weight`) when the
 *   goal is visual bolding rather than semantics.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create inline attention spans in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
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
 * The semantic tag name for "bring attention to" spans.
 *
 * @category Constants
 */
export const B_TAG = 'b' as const;

/**
 * A CSS selector targeting b elements.
 *
 * @category Constants
 */
export const B_SELECTOR = 'b';

/**
 * Attribute bag for b creation/enhancement.
 *
 * @remarks
 * B elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type BAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link BAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The b attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: BAttrs): GlobalAttrs | undefined {
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
 * Create a b element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the b element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<b>` element.
 *
 * @example
 * ```ts
 * import { createB } from "@Vastare/Fundatio/elements/inline/b";
 *
 * document.body.appendChild(createB("Keyword", { className: "keyword" }));
 * ```
 *
 * @category DOM
 */
export function createB(text?: string, attrs?: BAttrs): ElementOf<typeof B_TAG> {
  return createElement(B_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance b elements within a given root.
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
export function enhanceBs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for b.
  void root;
}
