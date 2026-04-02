/**
 * Sol Design Foundation: Cite element helpers.
 *
 * @remarks
 * The cite element (`<cite>`) represents the title of a creative work (e.g. a book,
 * paper, essay, poem, song, film, TV show, game, sculpture, painting, etc.). :contentReference[oaicite:2]{index=2}
 *
 * Best-practice guidance:
 * - Use `<cite>` for the title of the work being referenced, not the author's name
 *   and not purely for styling. :contentReference[oaicite:3]{index=3}
 * - If you want a visible link to a source, use an `<a>` element (and/or surrounding
 *   citation patterns) rather than relying on hidden metadata. (Sol intentionally
 *   does not invent citation-specific behaviors here.)
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create cite inline nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for cite.
 *
 * @category Constants
 */
export const CITE_TAG = 'cite' as const;

/**
 * A CSS selector targeting cite elements.
 *
 * @category Constants
 */
export const CITE_SELECTOR = 'cite';

/**
 * Attribute bag for cite creation/enhancement.
 *
 * @remarks
 * The `<cite>` element uses standard HTML global attributes. :contentReference[oaicite:4]{index=4}
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type CiteAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link CiteAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The cite attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: CiteAttrs): GlobalAttrs | undefined {
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
 * Create a cite element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the cite element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<cite>` element.
 *
 * @example
 * Cite a work title:
 * ```ts
 * import { createCite } from "@lnpg/sol/elements/inline/cite";
 *
 * const c = createCite("The Scream", { className: "work-title" });
 * document.body.appendChild(c);
 * ```
 *
 * @category DOM
 */
export function createCite(text?: string, attrs?: CiteAttrs): ElementOf<typeof CITE_TAG> {
  return createElement(CITE_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance cite elements within a given root.
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
export function enhanceCites(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for cite.
  void root;
}
