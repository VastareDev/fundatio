/**
 * Fundatio Design Foundation: H1 element helpers.
 *
 * @remarks
 * The h1 element (`<h1>`) represents the highest-rank section heading.
 *
 * Best-practice guidance:
 * - Use headings to convey document structure, not for visual styling.
 * - Keep heading levels ordered (don't jump from `<h1>` to `<h3>` because you
 *   like the font size). Use CSS for presentation.
 * - Prefer clear, succinct headings that describe the section that follows.
 * - Many accessibility guides recommend a single `<h1>` as the page/document's
 *   primary heading. HTML allows multiple headings, but consistency matters.
 * - Don't rely on default browser heading styles; user-agent styles can change.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<h1>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: Heading elements: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
 * - MDN: Headings and paragraphs: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs
 * - W3C WAI: Headings: https://www.w3.org/WAI/tutorials/page-structure/headings/
 * - WHATWG HTML: Sections / heading content: https://html.spec.whatwg.org/multipage/sections.html
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
 * The semantic tag name for the primary heading element.
 *
 * @category Constants
 */
export const H1_TAG = 'h1' as const;

/**
 * A CSS selector targeting h1 elements.
 *
 * @category Constants
 */
export const H1_SELECTOR = 'h1';

/**
 * Attribute bag for h1 creation/enhancement.
 *
 * @remarks
 * H1 elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type H1Attrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link H1Attrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The h1 attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: H1Attrs): GlobalAttrs | undefined {
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
 * Create an h1 element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the heading.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<h1>` element.
 *
 * @example
 * ```ts
 * import { createH1 } from "@Vastare/Fundatio/elements/heading/h1";
 *
 * document.body.prepend(createH1("Page title", { id: "title" }));
 * ```
 *
 * @category DOM
 */
export function createH1(text?: string, attrs?: H1Attrs): ElementOf<typeof H1_TAG> {
  return createElement(H1_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance h1 elements within a given root.
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
export function enhanceH1s(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for h1.
  void root;
}
