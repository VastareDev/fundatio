/**
 * Table element factories.
 *
 * Provides framework-agnostic factory functions for semantic HTML table
 * structures and related elements.
 *
 * These factories:
 * - Create semantic table elements using Fundatio's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve native table semantics and accessibility.
 * - Prevent unsafe attribute injection.
 *
 * Tables in Fundatio are intentionally low-level primitives. They do not attempt
 * to manage layout, styling, or data structures. Consumers remain responsible
 * for building meaningful table structures.
 *
 * @module elements/table
 * @since 1.0.0
 */
/**
 * `<table>` element factory namespace.
 *
 * Represents tabular data arranged in rows and columns.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 */
export * as table from './table';
/**
 * `<colgroup>` element factory namespace.
 *
 * Groups one or more `<col>` elements for shared column styling and
 * structural definition.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
 */
export * as colgroup from './colgroup';
/**
 * `<col>` element factory namespace.
 *
 * Defines column-level properties within a table.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
 */
export * as col from './col';
/**
 * `<thead>` element factory namespace.
 *
 * Groups header rows that label table columns.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
 */
export * as thead from './thead';
/**
 * `<tbody>` element factory namespace.
 *
 * Groups the primary body rows of a table.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
 */
export * as tbody from './tbody';
/**
 * `<tfoot>` element factory namespace.
 *
 * Groups footer rows containing summaries or totals.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
 */
export * as tfoot from './tfoot';
/**
 * `<tr>` element factory namespace.
 *
 * Represents a table row.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
 */
export * as tr from './tr';
/**
 * `<th>` element factory namespace.
 *
 * Represents a header cell that labels a row or column.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
 */
export * as th from './th';
/**
 * `<td>` element factory namespace.
 *
 * Represents a standard table data cell.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
 */
export * as td from './td';
/**
 * `<caption>` element factory namespace.
 *
 * Provides a title or description for a table.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
 */
export * as caption from './caption';
//# sourceMappingURL=index.d.ts.map