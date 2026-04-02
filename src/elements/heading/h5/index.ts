/**
 * Sol Design Foundation: H5 element helpers.
 *
 * @remarks
 * The h5 element (`<h5>`) represents a fifth-rank section heading.
 *
 * Best-practice guidance:
 * - Use headings to communicate document structure, not visual styling.
 * - Keep heading levels ordered (don't jump from `<h2>` to `<h5>` because you
 *   like the font size). Use CSS for presentation.
 * - Ensure headings accurately describe the section content that follows.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<h5>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: Heading elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
 * - W3C WAI: Headings: https://www.w3.org/WAI/tutorials/page-structure/headings/
 * - WHATWG HTML: Sections / heading content: https://html.spec.whatwg.org/multipage/sections.html
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
 * The semantic tag name for fifth-level headings.
 *
 * @category Constants
 */
export const H5_TAG = 'h5' as const;

/**
 * A CSS selector targeting h5 elements.
 *
 * @category Constants
 */
export const H5_SELECTOR = 'h5';

/**
 * Attribute bag for h5 creation/enhancement.
 *
 * @remarks
 * H5 elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type H5Attrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link H5Attrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The h5 attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: H5Attrs): GlobalAttrs | undefined {
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
 * Create an h5 element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the heading.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<h5>` element.
 *
 * @example
 * ```ts
 * import { createH5 } from "@lnpg/sol/elements/heading/h5";
 *
 * const h = createH5("Subsection heading");
 * ```
 *
 * @category DOM
 */
export function createH5(text?: string, attrs?: H5Attrs): ElementOf<typeof H5_TAG> {
  return createElement(H5_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance h5 elements within a given root.
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
export function enhanceH5s(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for h5.
  void root;
}
