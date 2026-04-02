/**
 * Fundatio Design Foundation: Tr element helpers.
 *
 * @remarks
 * The tr element (`<tr>`) represents a row of cells within a table section.
 * A row typically contains `<td>` and/or `<th>` elements.
 *
 * Best-practice guidance:
 * - Use tables for data, not layout.
 * - Group rows with `<thead>`, `<tbody>`, and `<tfoot>` for clearer structure.
 * - Use `<th>` for header cells (and `scope`/`headers` where appropriate) for
 *   accessible tables.
 * - Avoid obsolete presentational attributes on table elements (e.g. `align`,
 *   `bgcolor`, `valign`). Use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<tr>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: `<tr>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tr
 * - WHATWG HTML: Tables: https://html.spec.whatwg.org/multipage/tables.html
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
 * The semantic tag name for table rows.
 *
 * @category Constants
 */
export const TR_TAG = 'tr' as const;

/**
 * A CSS selector targeting tr elements.
 *
 * @category Constants
 */
export const TR_SELECTOR = 'tr';

/**
 * Attribute bag for tr creation/enhancement.
 *
 * @remarks
 * `<tr>` accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * Note: legacy presentational attributes historically existed for table rows,
 * but are obsolete. Consumers can still use {@link GlobalAttrs.attrs} as an
 * escape hatch where necessary, subject to Fundatio's security rules in `dom.ts`
 * (blocks inline event handlers and raw `style` attribute strings).
 *
 * @category Attributes
 */
export type TrAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link TrAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The tr attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TrAttrs): GlobalAttrs | undefined {
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
 * Create a tr element with optional text content and global attributes.
 *
 * @remarks
 * - In real usage, `<tr>` should contain `<td>` and/or `<th>` cells (not text).
 * - Optional text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the row (generally discouraged).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<tr>` element.
 *
 * @example
 * ```ts
 * import { createTr } from "@Vastare/Fundatio/elements/table/tr";
 *
 * const row = createTr(undefined, { className: "row" });
 * ```
 *
 * @category DOM
 */
export function createTr(text?: string, attrs?: TrAttrs): ElementOf<typeof TR_TAG> {
  return createElement(TR_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance tr elements within a given root.
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
export function enhanceTrs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for tr.
  void root;
}
