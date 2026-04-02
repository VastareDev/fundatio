/**
 * Sol Design Foundation: Thead element helpers.
 *
 * @remarks
 * The thead element (`<thead>`) represents the block of rows that form the
 * column headers (and related header-area rows) for a table.
 *
 * Best-practice guidance:
 * - Use `<thead>` to group header rows, typically using `<th>` cells for headers.
 * - Keep the table structure logical: `<caption>` (optional), then `<colgroup>`
 *   (optional), then `<thead>`, then `<tbody>`/`<tfoot>` as needed.
 * - Avoid deprecated presentational attributes (e.g. `align`) and use CSS instead.
 * - Prefer native table semantics; only use ARIA when you cannot express the
 *   intended structure using proper table markup.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<thead>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for thead elements.
 *
 * @category Constants
 */
export const THEAD_TAG = 'thead' as const;

/**
 * A CSS selector targeting thead elements.
 *
 * @category Constants
 */
export const THEAD_SELECTOR = 'thead';

/**
 * Attribute bag for thead creation/enhancement.
 *
 * @remarks
 * Thead elements accept standard HTML global attributes.
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
export type TheadAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link TheadAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The thead attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TheadAttrs): GlobalAttrs | undefined {
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
 * Create a thead element with global attributes.
 *
 * @remarks
 * - `<thead>` is a structural table element. Sol does not accept a text argument
 *   for this factory. Populate it with `<tr>` and header cells (`<th>`) as needed.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<thead>` element.
 *
 * @example
 * Create and append a thead:
 * ```ts
 * import { createThead } from "@lnpg/sol/elements/table/thead";
 *
 * const thead = createThead({ className: "table-head" });
 * table.appendChild(thead);
 * ```
 *
 * @category DOM
 */
export function createThead(attrs?: TheadAttrs): ElementOf<typeof THEAD_TAG> {
  return createElement(THEAD_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance thead elements within a given root.
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
export function enhanceTheads(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for thead.
  void root;
}
