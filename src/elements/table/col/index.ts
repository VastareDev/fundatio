/**
 * Fundatio Design Foundation: Col element helpers.
 *
 * @remarks
 * The col element (`<col>`) represents one or more columns in a table, and is
 * used to apply presentation (typically CSS) to columns as a group.
 *
 * Best-practice guidance:
 * - Use `<col>` only inside a `<colgroup>`.
 * - Use `<col>` for column-level styling (widths, background, etc.), not layout hacks.
 * - Don't rely on `<col>` for semantics or accessibility. Use proper table
 *   structure (`<caption>`, `<th>`, `scope`/`headers`) for accessible data tables.
 * - Avoid obsolete presentational attributes; prefer CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<col>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: `<col>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/col
 * - WHATWG HTML: Tables: https://html.spec.whatwg.org/multipage/tables.html
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
 * The semantic tag name for table column definitions.
 *
 * @category Constants
 */
export const COL_TAG = 'col' as const;

/**
 * A CSS selector targeting col elements.
 *
 * @category Constants
 */
export const COL_SELECTOR = 'col';

/**
 * Attribute bag for col creation/enhancement.
 *
 * @remarks
 * `<col>` supports standard HTML global attributes and one primary element
 * attribute: `span`.
 *
 * `span` specifies how many consecutive columns this `<col>` applies to.
 * If omitted, browsers treat it as `1`.
 *
 * Fundatio supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type ColAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Number of consecutive columns this `<col>` element applies to.
   *
   * @remarks
   * Must be a positive integer greater than zero. If omitted, the browser default
   * is `1`.
   */
  span?: number;
};

/**
 * Normalize {@link ColAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The col attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: ColAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, span, attrs: rawAttrs, ...rest } = attrs;

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

  // Only set `span` if provided AND caller didn't already set it via raw attrs.
  if (typeof span === 'number' && !Object.prototype.hasOwnProperty.call(mergedAttrs, 'span')) {
    // Spec constraint: positive integer > 0.
    if (!Number.isInteger(span) || span <= 0) {
      throw new Error('Invalid "span" for <col>: expected a positive integer greater than zero.');
    }
    mergedAttrs.span = span;
  }

  if (Object.keys(mergedAttrs).length > 0) out.attrs = mergedAttrs;

  return out;
}

/**
 * Create a col element (`<col>`) and apply global attributes.
 *
 * @remarks
 * `<col>` is a void element. It does not accept text content or children.
 *
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<col>` element.
 *
 * @example
 * Create a `<col>` that spans 2 columns:
 * ```ts
 * import { createCol } from "@Vastare/Fundatio/elements/table/col";
 *
 * const col = createCol({ span: 2, className: "numeric" });
 * ```
 *
 * @category DOM
 */
export function createCol(attrs?: ColAttrs): ElementOf<typeof COL_TAG> {
  return createVoidElement(COL_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance col elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceCols(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for col.
  void root;
}
