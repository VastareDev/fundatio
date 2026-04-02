/**
 * Fundatio Design Foundation: H4 element helpers.
 *
 * @remarks
 * The `<h4>` element represents a level 4 section heading.
 *
 * Best-practice guidance:
 * - Use headings to communicate structure, not visual styling.
 * - Avoid skipping heading levels in a way that breaks hierarchy (e.g. `h2` → `h4`).
 * - Keep headings descriptive and concise for accessibility.
 * - Prefer CSS for appearance; headings are about semantics.
 *
 * This module:
 * - Creates `<h4>` elements via Fundatio's hardened DOM helpers (no direct DOM calls).
 * - Applies a curated subset of global attributes safely.
 * - Supports a small, typed structured ARIA input mapped into `aria-*`.
 * - Exposes a stable enhancement hook (currently a no-op) for API consistency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Fundatio element factories.
 *
 * @remarks
 * This is a small, typed subset intended to prevent typo-driven ARIA bugs and
 * keep the API practical. Values are mapped into {@link GlobalAttrs.aria}.
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
 * The semantic tag name for `<h4>`.
 *
 * @category Constants
 */
export const H4_TAG = 'h4' as const;

/**
 * A CSS selector targeting `<h4>` elements.
 *
 * @category Constants
 */
export const H4_SELECTOR = 'h4';

/**
 * Attribute bag for `<h4>` creation/enhancement.
 *
 * @remarks
 * `<h4>` supports HTML global attributes only.
 *
 * Fundatio additionally supports a typed, structured ARIA input that is mapped into
 * {@link GlobalAttrs.aria} without modifying the shared DOM helpers.
 *
 * @category Attributes
 */
export type H4Attrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link H4Attrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The `<h4>` attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: H4Attrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  return Object.keys(mappedAria).length > 0 ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create an `<h4>` element with optional text content and global attributes.
 *
 * @remarks
 * - Text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper, which enforces:
 *   - No inline event handler attributes (e.g. `onclick`)
 *   - No raw `style` attribute injection (use the `style` object field)
 *   - No empty attribute names
 *
 * @param text - Optional text content for the heading.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<h4>` element.
 *
 * @example
 * ```ts
 * import { createH4 } from "@Vastare/Fundatio/elements/heading/h4";
 *
 * const h = createH4("Details", { id: "details-heading" });
 * ```
 *
 * @category DOM
 */
export function createH4(text?: string, attrs?: H4Attrs): ElementOf<typeof H4_TAG> {
  return createElement(H4_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance `<h4>` elements within a given root.
 *
 * @remarks
 * Intentionally a no-op in `1.0.0`. This exists to provide a stable, consistent
 * integration hook across element modules.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceH4s(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for h4.
  void root;
}
