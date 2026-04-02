/**
 * Fundatio Design Foundation: S (strikethrough) element helpers.
 *
 * @remarks
 * The s element (`<s>`) represents content that is no longer accurate or no
 * longer relevant. It is a presentational indicator of "this isn't current"
 * rather than an edit-tracking semantic.
 *
 * Best-practice guidance:
 * - Use `<s>` for "no longer relevant/accurate" text (e.g. outdated pricing).
 * - Use `<del>` when you mean "this was removed" (edit history / document diff semantics).
 * - Do not use `<s>` as a substitute for emphasis; use appropriate semantics and CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<s>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
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
 * The semantic tag name for s elements.
 *
 * @category Constants
 */
export const S_TAG = 's' as const;

/**
 * A CSS selector targeting s elements.
 *
 * @category Constants
 */
export const S_SELECTOR = 's';

/**
 * Attribute bag for s creation/enhancement.
 *
 * @remarks
 * The `<s>` element accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type SAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link SAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The s attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: SAttrs): GlobalAttrs | undefined {
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
 * Create an s element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<s>` element.
 *
 * @example
 * ```ts
 * import { createS } from "@Vastare/Fundatio/elements/inline/s";
 *
 * const el = createS("£199", { className: "old-price" });
 * document.body.appendChild(el);
 * ```
 *
 * @category DOM
 */
export function createS(text?: string, attrs?: SAttrs): ElementOf<typeof S_TAG> {
  return createElement(S_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance s elements within a given root.
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
export function enhanceSs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for s.
  void root;
}
