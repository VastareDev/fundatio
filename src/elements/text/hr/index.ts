/**
 * Fundatio Design Foundation: Hr element helpers.
 *
 * @remarks
 * The hr element (`<hr>`) represents a thematic break between paragraph-level
 * elements (e.g. a shift of topic or scene).
 *
 * Best-practice guidance:
 * - Use `<hr>` for semantic separation of content, not for visual decoration.
 * - Avoid obsolete presentational attributes (e.g. `align`, `size`, `width`, `noshade`);
 *   use CSS instead.
 * - Prefer native semantics. Only set `role` when you have a specific, justified reason.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create thematic breaks in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
 *
 * @module
 * @category Elements
 */

import { createVoidElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for thematic breaks.
 *
 * @category Constants
 */
export const HR_TAG = 'hr' as const;

/**
 * A CSS selector targeting hr elements.
 *
 * @category Constants
 */
export const HR_SELECTOR = 'hr';

/**
 * Attribute bag for hr creation/enhancement.
 *
 * @remarks
 * Hr elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type HrAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link HrAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The hr attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: HrAttrs): GlobalAttrs | undefined {
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
 * Create an hr element with optional global attributes.
 *
 * @remarks
 * - `<hr>` is a void element and must not carry text content.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<hr>` element.
 *
 * @example
 * Create and append a thematic break:
 * ```ts
 * import { createHr } from "@Vastare/Fundatio/elements/text/hr";
 *
 * document.body.appendChild(createHr({ className: "divider" }));
 * ```
 *
 * @category DOM
 */
export function createHr(attrs?: HrAttrs): ElementOf<typeof HR_TAG> {
  return createVoidElement(HR_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance hr elements within a given root.
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
export function enhanceHrs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for hr.
  void root;
}
