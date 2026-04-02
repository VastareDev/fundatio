/**
 * Sol Design Foundation: Tbody element helpers.
 *
 * @remarks
 * The tbody element (`<tbody>`) represents a block of rows that make up the main
 * body of a table's data.
 *
 * Best-practice guidance:
 * - Use tables for data, not layout.
 * - Group rows meaningfully with `<thead>`, `<tbody>`, and `<tfoot>`.
 * - Prefer semantic headers via `<th>` (with appropriate `scope`/`headers`)
 *   and provide a `<caption>` for accessible tables.
 * - Avoid obsolete presentational attributes (e.g. `align`, `valign`, `char`,
 *   `charoff`). Use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<tbody>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: `<tbody>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/tbody
 * - WHATWG HTML: Tables: https://html.spec.whatwg.org/multipage/tables.html
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
 * The semantic tag name for table body sections.
 *
 * @category Constants
 */
export declare const TBODY_TAG: "tbody";
/**
 * A CSS selector targeting tbody elements.
 *
 * @category Constants
 */
export declare const TBODY_SELECTOR = "tbody";
/**
 * Attribute bag for tbody creation/enhancement.
 *
 * @remarks
 * `<tbody>` accepts standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * Note: some legacy presentational attributes existed historically for table
 * sections, but are obsolete. Consumers can still use {@link GlobalAttrs.attrs}
 * as an escape hatch where necessary, subject to Sol's security rules in
 * `dom.ts` (blocks inline event handlers and raw `style` attribute strings).
 *
 * @category Attributes
 */
export type TbodyAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a tbody element with optional text content and global attributes.
 *
 * @remarks
 * - In real usage, `<tbody>` should contain `<tr>` rows (not text).
 * - Optional text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the tbody (generally discouraged).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<tbody>` element.
 *
 * @example
 * ```ts
 * import { createTbody } from "@lnpg/sol/elements/table/tbody";
 *
 * const tbody = createTbody(undefined, { className: "data-body" });
 * ```
 *
 * @category DOM
 */
export declare function createTbody(text?: string, attrs?: TbodyAttrs): ElementOf<typeof TBODY_TAG>;
/**
 * Enhance tbody elements within a given root.
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
export declare function enhanceTbodies(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map