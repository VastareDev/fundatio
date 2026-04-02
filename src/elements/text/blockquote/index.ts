/**
 * Fundatio Design Foundation: Blockquote element helpers.
 *
 * @remarks
 * The blockquote element (`<blockquote>`) represents a section that is quoted
 * from another source.
 *
 * Best-practice guidance:
 * - Use `<blockquote>` for longer, block-level quotations.
 * - Use `<q>` for short, inline quotations.
 * - If you provide a citation URL, set the `cite` attribute, but also consider
 *   providing a visible citation in content (e.g. a link or a `<cite>` element),
 *   since many user agents do not surface `cite` automatically.
 * - Avoid presentational attributes. Use CSS for styling.
 *
 * Element-specific attributes:
 * - `cite`: A URL for the source of the quotation (when available).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create block quotes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
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
 * The semantic tag name for block quotes.
 *
 * @category Constants
 */
export const BLOCKQUOTE_TAG = 'blockquote' as const;

/**
 * A CSS selector targeting blockquote elements.
 *
 * @category Constants
 */
export const BLOCKQUOTE_SELECTOR = 'blockquote';

/**
 * Attribute bag for blockquote creation/enhancement.
 *
 * @remarks
 * Blockquote accepts standard HTML global attributes and one element-specific
 * attribute:
 * - `cite`: A URL pointing to the quoted source (when available).
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria}.
 *
 * Security note:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style}.
 *
 * @category Attributes
 */
export type BlockquoteAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Citation URL for the source of the quote.
   *
   * @remarks
   * This maps to the `cite` attribute. When present, it should be a valid URL.
   * Consider also including a visible citation in the document content.
   */
  cite?: string;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link BlockquoteAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The blockquote attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: BlockquoteAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, cite, ...rest } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  // Map element-specific attribute(s) into the escape hatch.
  if (typeof cite === 'string' && cite.length > 0) {
    mapped.attrs = { ...(rest.attrs ?? {}), cite };
  }

  if (!aria) return mapped;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...mapped, aria: mappedAria } : mapped;
}

/**
 * Create a blockquote element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<blockquote>` typically contains flow content (e.g. paragraphs). This
 * helper supports a simple `text` convenience for cases where plain text is
 * sufficient; consumers can still append richer child nodes afterwards.
 *
 * @param text - Optional text content for the blockquote.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<blockquote>` element.
 *
 * @example
 * ```ts
 * import { createBlockquote } from "@Vastare/Fundatio/elements/text/blockquote";
 *
 * const q = createBlockquote("To be, or not to be...", {
 *   cite: "https://example.com/source",
 *   className: "quote",
 *   aria: { label: "Quotation" }
 * });
 *
 * document.body.appendChild(q);
 * ```
 *
 * @category DOM
 */
export function createBlockquote(
  text?: string,
  attrs?: BlockquoteAttrs,
): ElementOf<typeof BLOCKQUOTE_TAG> {
  return createElement(BLOCKQUOTE_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance blockquote elements within a given root.
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
export function enhanceBlockquotes(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for blockquote.
  void root;
}
