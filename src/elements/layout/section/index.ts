/**
 * Sol Design Foundation: Section element helpers.
 *
 * @remarks
 * The section element (`<section>`) represents a standalone thematic grouping of
 * content, typically with a heading.
 *
 * Best-practice guidance:
 * - Do not treat `<section>` as a "semantic `<div>`". Use it when the content is a
 *   distinct theme that belongs in the document outline.
 * - Prefer including a heading (`<h1>`-`<h6>`) that describes the section's purpose.
 * - If you just need a generic container with no semantic meaning, use `<div>`.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create sections in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
 * - HTML Standard: https://html.spec.whatwg.org/multipage/sections.html#the-section-element
 * - WHATWG blog (context): https://blog.whatwg.org/is-not-just-a-semantic
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
 * The semantic tag name for section elements.
 *
 * @category Constants
 */
export const SECTION_TAG = 'section' as const;

/**
 * A CSS selector targeting section elements.
 *
 * @category Constants
 */
export const SECTION_SELECTOR = 'section';

/**
 * Attribute bag for section creation/enhancement.
 *
 * @remarks
 * Section elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type SectionAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link SectionAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The section attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: SectionAttrs): GlobalAttrs | undefined {
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
 * Create a section element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the section.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<section>` element.
 *
 * @example
 * ```ts
 * import { createSection } from "@lnpg/sol/elements/layout/section";
 *
 * const s = createSection(undefined, { id: "features" });
 * document.body.appendChild(s);
 * ```
 *
 * @category DOM
 */
export function createSection(text?: string, attrs?: SectionAttrs): ElementOf<typeof SECTION_TAG> {
  return createElement(SECTION_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance section elements within a given root.
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
export function enhanceSections(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for section.
  void root;
}
