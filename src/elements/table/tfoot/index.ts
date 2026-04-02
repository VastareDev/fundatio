/**
 * Fundatio Design Foundation: Tfoot element helpers.
 *
 * @remarks
 * The tfoot element (`<tfoot>`) encapsulates a set of table rows (`<tr>`) that
 * comprise the footer of a table, typically containing column summaries such as
 * totals or other aggregate values. :contentReference[oaicite:1]{index=1}
 *
 * Best-practice guidance:
 * - Use `<tfoot>` for footer rows (summaries/totals), and keep the table's
 *   structure logical with `<thead>` for headers and `<tbody>` for body rows.
 * - Many guides recommend placing `<tfoot>` after `<tbody>` for readability. :contentReference[oaicite:2]{index=2}
 * - Avoid deprecated presentational attributes and use CSS instead.
 * - Prefer native table semantics; only use ARIA when you cannot express the
 *   intended structure using proper table markup.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<tfoot>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for tfoot elements.
 *
 * @category Constants
 */
export const TFOOT_TAG = 'tfoot' as const;

/**
 * A CSS selector targeting tfoot elements.
 *
 * @category Constants
 */
export const TFOOT_SELECTOR = 'tfoot';

/**
 * Attribute bag for tfoot creation/enhancement.
 *
 * @remarks
 * Tfoot elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * Security notes:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style} instead.
 *
 * @category Attributes
 */
export type TfootAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link TfootAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The tfoot attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TfootAttrs): GlobalAttrs | undefined {
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
 * Create a tfoot element with global attributes.
 *
 * @remarks
 * - `<tfoot>` is a structural table element. Fundatio does not accept a text argument
 *   for this factory. Populate it with `<tr>` (and cells) as needed.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<tfoot>` element.
 *
 * @example
 * Create and append a tfoot:
 * ```ts
 * import { createTfoot } from "@Vastare/Fundatio/elements/table/tfoot";
 *
 * const tfoot = createTfoot({ className: "table-foot" });
 * table.appendChild(tfoot);
 * ```
 *
 * @category DOM
 */
export function createTfoot(attrs?: TfootAttrs): ElementOf<typeof TFOOT_TAG> {
  return createElement(TFOOT_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance tfoot elements within a given root.
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
export function enhanceTfoots(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for tfoot.
  void root;
}
