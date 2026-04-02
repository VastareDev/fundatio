/**
 * Fundatio Design Foundation: Aside element helpers.
 *
 * @remarks
 * The aside element (`<aside>`) represents content that is tangentially related
 * to the content around it, such as sidebars, callout boxes, pull quotes, or
 * related links.
 *
 * Best-practice guidance:
 * - Use `<aside>` for content related to the surrounding section, but not part of
 *   the main narrative flow.
 * - Avoid using `<aside>` purely for visual layout. Use CSS for layout and choose
 *   semantic elements for meaning.
 * - Prefer native semantics. Only add ARIA roles when needed.
 *
 * Fundatio notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Fundatio's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<aside>` element
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
 * The semantic tag name for aside.
 *
 * @category Constants
 */
export const ASIDE_TAG = 'aside' as const;

/**
 * A CSS selector targeting aside elements.
 *
 * @category Constants
 */
export const ASIDE_SELECTOR = 'aside';

/**
 * Attribute bag for aside creation/enhancement.
 *
 * @remarks
 * Aside elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type AsideAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link AsideAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The aside attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: AsideAttrs): GlobalAttrs | undefined {
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
 * Create an aside element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the aside.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<aside>` element.
 *
 * @example
 * ```ts
 * import { createAside } from "@Vastare/Fundatio/elements/layout/aside";
 *
 * const a = createAside("Related links", { className: "sidebar" });
 * ```
 *
 * @category DOM
 */
export function createAside(text?: string, attrs?: AsideAttrs): ElementOf<typeof ASIDE_TAG> {
  return createElement(ASIDE_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance aside elements within a given root.
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
export function enhanceAsides(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for aside.
  void root;
}
