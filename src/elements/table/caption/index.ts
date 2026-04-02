/**
 * Sol Design Foundation: Caption element helpers.
 *
 * @remarks
 * The caption element (`<caption>`) provides a title (caption) for its parent
 * `<table>`. It is an important accessibility feature because it gives the table
 * an accessible name or description when authored appropriately. :contentReference[oaicite:1]{index=1}
 *
 * Best-practice guidance:
 * - Use `<caption>` to describe the purpose of the table and help users decide
 *   whether to read it. :contentReference[oaicite:2]{index=2}
 * - Place `<caption>` as the first child of the `<table>` in source order. :contentReference[oaicite:3]{index=3}
 * - Keep the caption concise but meaningful. For complex tables, captions can be
 *   supplemented with additional explanatory text near the table (outside the
 *   caption) when necessary. :contentReference[oaicite:4]{index=4}
 * - Avoid deprecated presentational attributes (e.g. legacy `align`) and use CSS instead. :contentReference[oaicite:5]{index=5}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<caption>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for caption elements.
 *
 * @category Constants
 */
export const CAPTION_TAG = 'caption' as const;

/**
 * A CSS selector targeting caption elements.
 *
 * @category Constants
 */
export const CAPTION_SELECTOR = 'caption';

/**
 * Attribute bag for caption creation/enhancement.
 *
 * @remarks
 * Caption elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * Security notes:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style} instead.
 *
 * @category Attributes
 */
export type CaptionAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link CaptionAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The caption attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: CaptionAttrs): GlobalAttrs | undefined {
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
 * Create a caption element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the caption.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<caption>` element.
 *
 * @example
 * Create and prepend a caption to a table:
 * ```ts
 * import { createCaption } from "@lnpg/sol/elements/table/caption";
 *
 * const table = document.createElement("table");
 * table.prepend(createCaption("Quarterly results"));
 * ```
 *
 * @category DOM
 */
export function createCaption(text?: string, attrs?: CaptionAttrs): ElementOf<typeof CAPTION_TAG> {
  return createElement(CAPTION_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance caption elements within a given root.
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
export function enhanceCaptions(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for caption.
  void root;
}
