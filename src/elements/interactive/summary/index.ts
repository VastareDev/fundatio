/**
 * Fundatio Design Foundation: Summary element helpers.
 *
 * @remarks
 * The summary element (`<summary>`) provides the visible label for a parent
 * `<details>` disclosure widget. Activating (clicking / pressing Enter) on the
 * `<summary>` toggles the open state of the parent `<details>` element.
 *
 * Best-practice guidance:
 * - Use `<summary>` only as the first child of a `<details>` element.
 * - Use clear, concise text so the disclosure purpose is obvious.
 * - Prefer semantic content inside `<summary>`; avoid overly complex interactive
 *   children inside the summary label.
 *
 * Fundatio notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Fundatio's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<summary>` element
 * - WHATWG HTML: `<details>` content model and summary semantics
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
 * The semantic tag name for summary.
 *
 * @category Constants
 */
export const SUMMARY_TAG = 'summary' as const;

/**
 * A CSS selector targeting summary elements.
 *
 * @category Constants
 */
export const SUMMARY_SELECTOR = 'summary';

/**
 * Attribute bag for summary creation/enhancement.
 *
 * @remarks
 * `<summary>` supports standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type SummaryAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link SummaryAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The summary attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: SummaryAttrs): GlobalAttrs | undefined {
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
 * Create a summary element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the summary.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<summary>` element.
 *
 * @example
 * ```ts
 * import { createSummary } from "@Vastare/Fundatio/elements/interactive/summary";
 *
 * const s = createSummary("More details");
 * ```
 *
 * @category DOM
 */
export function createSummary(text?: string, attrs?: SummaryAttrs): ElementOf<typeof SUMMARY_TAG> {
  return createElement(SUMMARY_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance summary elements within a given root.
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
export function enhanceSummaries(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for summary.
  void root;
}
