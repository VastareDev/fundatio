/**
 * Sol Design Foundation: Table element helpers.
 *
 * @remarks
 * The table element (`<table>`) represents tabular data with more than one
 * dimension (rows and columns).
 *
 * Best-practice guidance:
 * - Use tables for data, not for layout.
 * - Provide a clear `<caption>` describing the table's purpose.
 * - Use `<thead>`, `<tbody>`, and `<tfoot>` to group table content meaningfully.
 * - Mark header cells with `<th>` (not `<td>`), and use `scope`/`headers` where
 *   appropriate for accessibility, especially in more complex tables.
 * - Avoid obsolete presentational attributes (e.g. `border`, `cellpadding`,
 *   `cellspacing`, `align`, `bgcolor`). Use CSS instead.
 * - If additional long-form description is needed, consider `aria-describedby`
 *   pointing to explanatory text outside the table.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create table elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: `<table>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 * - WHATWG: Table model: https://html.spec.whatwg.org/multipage/tables.html
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
 * The semantic tag name for HTML tables.
 *
 * @category Constants
 */
export declare const TABLE_TAG: "table";
/**
 * A CSS selector targeting table elements.
 *
 * @category Constants
 */
export declare const TABLE_SELECTOR = "table";
/**
 * Attribute bag for table creation/enhancement.
 *
 * @remarks
 * Table elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * Note: table-specific presentational attributes historically existed but are
 * obsolete in modern HTML. Consumers can still use {@link GlobalAttrs.attrs}
 * as an escape hatch where necessary, subject to Sol's security rules in
 * `dom.ts` (blocks inline event handlers and raw `style` attribute strings).
 *
 * @category Attributes
 */
export type TableAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a table element with optional text content and global attributes.
 *
 * @remarks
 * - Table content is typically structured with child elements (`<caption>`,
 *   `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`). This helper does not build
 *   table structure, it only creates the `<table>` element.
 * - Optional text content is assigned via `textContent` (never `innerHTML`).
 *   In real usage, prefer building actual table child elements rather than
 *   relying on text content.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the table (generally discouraged).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<table>` element.
 *
 * @example
 * Create a table and append it:
 * ```ts
 * import { createTable } from "@lnpg/sol/elements/table/table";
 *
 * const table = createTable(undefined, { className: "data-table" });
 * document.body.appendChild(table);
 * ```
 *
 * @category DOM
 */
export declare function createTable(text?: string, attrs?: TableAttrs): ElementOf<typeof TABLE_TAG>;
/**
 * Enhance table elements within a given root.
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
export declare function enhanceTables(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map