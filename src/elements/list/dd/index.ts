/**
 * Fundatio Design Foundation: Description Details (`<dd>`) element helpers.
 *
 * @remarks
 * The `<dd>` element provides the description, definition, or value for the
 * preceding term (`<dt>`) within a description list (`<dl>`).
 *
 * Best-practice guidance:
 * - Use `<dd>` only within a `<dl>`.
 * - Pair `<dd>` with an appropriate `<dt>` term.
 * - Use semantic lists for terms/values, not for layout.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<dd>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - pass a structured, typed attribute bag
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dd
 * @see https://html.spec.whatwg.org/multipage/grouping-content.html#the-dd-element
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
 * The semantic tag name for dd.
 *
 * @category Constants
 */
export const DD_TAG = 'dd' as const;

/**
 * A CSS selector targeting dd elements.
 *
 * @category Constants
 */
export const DD_SELECTOR = 'dd';

/**
 * Attribute bag for dd creation/enhancement.
 *
 * @remarks
 * `<dd>` only supports global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type DdAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link DdAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The dd attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: DdAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create a dd element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the dd element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<dd>` element.
 *
 * @example
 * ```ts
 * import { createDd } from "@Vastare/Fundatio/elements/list/dd";
 *
 * const dd = createDd("A sea serpent.", { className: "desc" });
 * ```
 *
 * @category DOM
 */
export function createDd(text?: string, attrs?: DdAttrs): ElementOf<typeof DD_TAG> {
  return createElement(DD_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance dd elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceDds(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for dd.
  void root;
}
