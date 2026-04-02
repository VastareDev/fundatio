/**
 * Sol Design Foundation: Col element helpers.
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
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
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
 * The semantic tag name for table column definitions.
 *
 * @category Constants
 */
export declare const COL_TAG: "col";
/**
 * A CSS selector targeting col elements.
 *
 * @category Constants
 */
export declare const COL_SELECTOR = "col";
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
 * Sol supports a structured ARIA input for common ARIA fields, mapped into
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
 * Create a col element (`<col>`) and apply global attributes.
 *
 * @remarks
 * `<col>` is a void element. It does not accept text content or children.
 *
 * Global attributes are applied via Sol's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<col>` element.
 *
 * @example
 * Create a `<col>` that spans 2 columns:
 * ```ts
 * import { createCol } from "@lnpg/sol/elements/table/col";
 *
 * const col = createCol({ span: 2, className: "numeric" });
 * ```
 *
 * @category DOM
 */
export declare function createCol(attrs?: ColAttrs): ElementOf<typeof COL_TAG>;
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
export declare function enhanceCols(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map