/**
 * Fundatio Design Foundation: Td element helpers.
 *
 * @remarks
 * The td element (`<td>`) represents a data cell in a table row (`<tr>`).
 *
 * Best-practice guidance:
 * - Use `<td>` for data cells and `<th>` for header cells.
 * - Provide a `<caption>` and properly marked header cells for accessible tables.
 * - Prefer simple tables. For complex tables with multi-level headers, use
 *   the `headers` attribute to associate a `<td>` with one or more `<th>` IDs.
 * - Avoid obsolete presentational attributes (e.g. `align`, `bgcolor`, `valign`).
 *   Use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<td>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: `<td>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/td
 * - WHATWG HTML: Tables: https://html.spec.whatwg.org/multipage/tables.html
 * - W3C WAI: Tables (headers/id technique): https://www.w3.org/WAI/tutorials/tables/multi-level/
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
 * The semantic tag name for table data cells.
 *
 * @category Constants
 */
export const TD_TAG = 'td' as const;

/**
 * A CSS selector targeting td elements.
 *
 * @category Constants
 */
export const TD_SELECTOR = 'td';

/**
 * Attribute bag for td creation/enhancement.
 *
 * @remarks
 * In addition to global attributes, `<td>` participates in the table model via:
 * - `colspan`: number of columns spanned (positive integer)
 * - `rowspan`: number of rows spanned (positive integer)
 * - `headers`: space-separated list of `<th id="...">` references for complex tables
 *
 * Fundatio supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type TdAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Number of columns this cell spans.
   *
   * @remarks
   * Must be a positive integer greater than zero.
   */
  colspan?: number;

  /**
   * Number of rows this cell spans.
   *
   * @remarks
   * Must be a positive integer greater than zero.
   */
  rowspan?: number;

  /**
   * Space-separated list of header cell IDs (`<th id="...">`) that apply to this cell.
   *
   * @remarks
   * This is typically only necessary for complex tables.
   */
  headers?: string;
};

/**
 * Normalize {@link TdAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The td attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TdAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, colspan, rowspan, headers, attrs: rawAttrs, ...rest } = attrs;

  const out: GlobalAttrs = { ...rest };

  // Map structured ARIA, only if something is actually defined.
  if (aria) {
    const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

    if (Object.keys(mappedAria).length > 0) out.aria = mappedAria;
  }

  // Preserve caller escape hatch, but allow Fundatio-typed fields to fill gaps.
  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = { ...(rawAttrs ?? {}) };

  const hasOwn = (k: string) => Object.prototype.hasOwnProperty.call(mergedAttrs, k);

  if (typeof colspan === 'number' && !hasOwn('colspan')) {
    if (!Number.isInteger(colspan) || colspan <= 0) {
      throw new Error('Invalid "colspan" for <td>: expected a positive integer greater than zero.');
    }
    mergedAttrs.colspan = colspan;
  }

  if (typeof rowspan === 'number' && !hasOwn('rowspan')) {
    if (!Number.isInteger(rowspan) || rowspan <= 0) {
      throw new Error('Invalid "rowspan" for <td>: expected a positive integer greater than zero.');
    }
    mergedAttrs.rowspan = rowspan;
  }

  if (typeof headers === 'string' && !hasOwn('headers')) {
    const trimmed = headers.trim();
    if (trimmed.length === 0) {
      throw new Error('Invalid "headers" for <td>: expected a non-empty string.');
    }
    mergedAttrs.headers = trimmed;
  }

  if (Object.keys(mergedAttrs).length > 0) out.attrs = mergedAttrs;

  return out;
}

/**
 * Create a td element with optional text content and global attributes.
 *
 * @remarks
 * - In real usage, `<td>` contains text and/or phrasing content, but should never
 *   be built via `innerHTML` from untrusted data.
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the td.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<td>` element.
 *
 * @example
 * ```ts
 * import { createTd } from "@Vastare/Fundatio/elements/table/td";
 *
 * const cell = createTd("42", { colspan: 2 });
 * ```
 *
 * @category DOM
 */
export function createTd(text?: string, attrs?: TdAttrs): ElementOf<typeof TD_TAG> {
  return createElement(TD_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance td elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceTds(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for td.
  void root;
}
