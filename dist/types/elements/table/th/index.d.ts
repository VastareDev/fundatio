/**
 * Sol Design Foundation: Th element helpers.
 *
 * @remarks
 * The th element (`<th>`) represents a header cell in a table row (`<tr>`).
 * It is used to label a group of related cells, typically via:
 * - `scope` for simple row/column headers
 * - `headers` for complex tables with multi-level or irregular headings
 *
 * Best-practice guidance:
 * - Prefer native table semantics (use `<th>` for headers, not `role="columnheader"`).
 * - Use `scope` for simple tables (`row`, `col`, `rowgroup`, `colgroup`).
 * - For complex tables, use `id` on `<th>` cells and reference them with
 *   `headers` from the related data cells (and sometimes header cells).
 * - Avoid deprecated presentational attributes and use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<th>` cells in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
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
 * The semantic tag name for th elements.
 *
 * @category Constants
 */
export declare const TH_TAG: "th";
/**
 * A CSS selector targeting th elements.
 *
 * @category Constants
 */
export declare const TH_SELECTOR = "th";
/**
 * Allowed `scope` values for `<th>`.
 *
 * @remarks
 * The HTML spec defines explicit keywords plus an automatic/default state.
 * Sol exposes the common keyword values and allows an explicit `"auto"` value
 * to match the spec's conceptual default state. Consumers control structure;
 * Sol does not attempt to enforce table-model anchoring constraints.
 *
 * @category Attributes
 */
export type ThScope = 'row' | 'col' | 'rowgroup' | 'colgroup' | 'auto';
/**
 * Attribute bag for th creation/enhancement.
 *
 * @remarks
 * Th elements accept standard HTML global attributes, plus:
 * - `abbr`: an alternative label for the header cell (often abbreviated)
 * - `colspan`: number of columns the cell spans
 * - `rowspan`: number of rows the cell spans
 * - `headers`: space-separated IDs of `<th>` elements that apply to this cell
 * - `scope`: indicates the set of cells this header applies to (`row`, `col`, etc.)
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
export type ThAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Alternative label for the header cell.
     *
     * @remarks
     * Useful when the visible header text is long but needs a shorter label in
     * other contexts (e.g. when referenced as a header).
     */
    abbr?: string;
    /**
     * Number of columns the cell spans.
     *
     * @remarks
     * Must be a positive integer to be meaningful. Sol sets the attribute only
     * when you provide a finite value greater than 0.
     */
    colspan?: number;
    /**
     * Number of rows the cell spans.
     *
     * @remarks
     * Must be a positive integer to be meaningful. Sol sets the attribute only
     * when you provide a finite value greater than 0.
     */
    rowspan?: number;
    /**
     * Space-separated IDs of `<th>` elements that apply to this cell.
     *
     * @remarks
     * This is primarily used for complex tables where `scope` is insufficient.
     * Sol does not validate ID existence; consumers control their DOM trees.
     */
    headers?: string;
    /**
     * Indicates which cells the header cell applies to.
     *
     * @remarks
     * Use for simple row/column headers. For complex tables, prefer `headers`.
     */
    scope?: ThScope;
};
/**
 * Create a th element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the header cell.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<th>` element.
 *
 * @example
 * Create a column header cell:
 * ```ts
 * import { createTh } from "@lnpg/sol/elements/table/th";
 *
 * const th = createTh("Price", { scope: "col" });
 * row.appendChild(th);
 * ```
 *
 * @category DOM
 */
export declare function createTh(text?: string, attrs?: ThAttrs): ElementOf<typeof TH_TAG>;
/**
 * Enhance th elements within a given root.
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
export declare function enhanceThs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map