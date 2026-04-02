/**
 * Fundatio Design Foundation: Abbreviation (`abbr`) element helpers.
 *
 * @remarks
 * The abbreviation element (`<abbr>`) represents an abbreviation or acronym.
 *
 * Best-practice guidance:
 * - Provide the expanded form in plain text on first use where possible.
 * - Optionally provide an expansion via the `title` attribute.
 *   Spec guidance: if `title` is used on `<abbr>`, it should contain the expansion
 *   of the abbreviation and nothing else.
 * - Do not rely solely on `title` tooltips for accessibility; tooltip exposure
 *   varies across browsers and assistive technologies.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create abbr elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
 * - WHATWG: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-abbr-element
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
 * The semantic tag name for abbreviations.
 *
 * @category Constants
 */
export const ABBR_TAG = 'abbr' as const;

/**
 * A CSS selector targeting abbr elements.
 *
 * @category Constants
 */
export const ABBR_SELECTOR = 'abbr';

/**
 * Attribute bag for abbr creation/enhancement.
 *
 * @remarks
 * Abbr elements accept standard HTML global attributes.
 *
 * For expansions, prefer:
 * - expanding the term in plain text on first use, and/or
 * - using {@link GlobalAttrs.title} to provide an expansion (advisory text).
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type AbbrAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link AbbrAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The abbr attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: AbbrAttrs): GlobalAttrs | undefined {
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
 * Create an abbr element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the abbreviation (e.g. "NASA").
 * @param attrs - Optional attributes to apply (e.g. `title` for expansion).
 * @returns The created `<abbr>` element.
 *
 * @example
 * ```ts
 * import { createAbbr } from "@Vastare/Fundatio/elements/inline/abbr";
 *
 * const el = createAbbr("NASA", { title: "National Aeronautics and Space Administration" });
 * document.body.appendChild(el);
 * ```
 *
 * @category DOM
 */
export function createAbbr(text?: string, attrs?: AbbrAttrs): ElementOf<typeof ABBR_TAG> {
  return createElement(ABBR_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance abbr elements within a given root.
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
export function enhanceAbbrs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for abbr.
  void root;
}
